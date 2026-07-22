import { buildTemplateContext } from "#/utils/documentSanitizer.js";
import { DocxGeneratorService } from "#/utils/docxGenerator.js";
import { prisma } from "#/utils/prisma.js";
import type { RequestHandler } from "express";
import path from "path";

export const exportInternshipDocxHandler: RequestHandler<
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
    const useImprovedText = req.query.useImproved !== "false"; // Default to true

    // 1. Fetch complete relational dataset from database
    const internship = await prisma.internship.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          include: { university: true },
        },
        logs: {
          where: { status: "COMPLETED" },
          orderBy: { logDate: "asc" },
        },
      },
    });

    if (!internship) {
      return res.status(404).json({ error: "Internship not found" });
    }

    // 2. Prepare sanitized context payload
    const context = buildTemplateContext(
      internship.user,
      internship.user.university,
      internship,
      internship.logs,
      useImprovedText,
    );

    // 3. Locate template file path
    const templatePath = path.join(__dirname, "../../templates/x.docx");

    // 4. Generate DOCX binary buffer
    const docxBuffer = DocxGeneratorService.generateDocx(templatePath, context);

    // 5. Configure response headers for browser download
    const filename = `${internship.companyName.replace(/\s+/g, "_")}_Logs.docx`;

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(filename)}"`,
    );

    return res.send(docxBuffer);
  } catch (error) {
    console.error("Docx generation error:", error);
    return res.status(500).json({ error: "Failed to generate document" });
  }
};
