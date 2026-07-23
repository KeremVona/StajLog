import { buildTemplateContext } from "#/utils/documentSanitizer.js";
import { DocxGeneratorService } from "#/utils/docxGenerator.js";
import { PdfConverterService } from "#/utils/pdfConverter.js";
import { prisma } from "#/utils/prisma.js";
import type { RequestHandler } from "express";
import path from "path";

export const exportInternshipLogHandler: RequestHandler<
  { id: string },
  any,
  any
> = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).send("Unauthorized");
      return;
    }
    const format = (req.query.format as string)?.toLowerCase() || "docx";
    const useImprovedText = req.query.useImproved !== "false";

    // 1. Fetch complete relational dataset
    const internship = await prisma.internship.findUnique({
      where: { id: Number(id) },
      include: {
        user: { include: { university: true } },
        logs: {
          where: { status: "COMPLETED" },
          orderBy: { logDate: "asc" },
        },
      },
    });

    if (!internship) {
      return res.status(404).json({ error: "Internship record not found" });
    }

    // 2. Build template context object
    const context = buildTemplateContext(
      internship.user,
      internship.user.university,
      internship,
      internship.logs,
      useImprovedText,
    );

    // 3. Generate initial DOCX buffer
    const templatePath = path.join(__dirname, "../../x.doc");
    const docxBuffer = DocxGeneratorService.generateDocx(templatePath, context);

    const baseFilename = `${internship.companyName.replace(/\s+/g, "_")}_Logs`;

    // 4. Branch logic based on target format
    if (format === "pdf") {
      const pdfBuffer = await PdfConverterService.convertDocxToPdf(docxBuffer);

      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(baseFilename)}.pdf"`,
      );
      return res.send(pdfBuffer);
    } else {
      // Default: DOCX
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      );
      res.setHeader(
        "Content-Disposition",
        `attachment; filename="${encodeURIComponent(baseFilename)}.docx"`,
      );
      return res.send(docxBuffer);
    }
  } catch (error) {
    console.error("Export handler error:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate and export document" });
  }
};
