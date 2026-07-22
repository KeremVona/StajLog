import fs from "fs";
import path from "path";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import type { LogTemplateContext } from "#/interfaces/document/LogTemplateContext.js";

export class DocxGeneratorService {
  /**
   * Generates a populated .docx file as a Buffer.
   *
   * @param templatePath Path to the raw .docx template file
   * @param context Sanitized data object matching template tags
   * @returns Buffer containing the final generated .docx file
   */
  public static generateDocx(
    templatePath: string,
    context: LogTemplateContext,
  ): Buffer {
    // 1. Read binary template file
    const content = fs.readFileSync(path.resolve(templatePath), "binary");

    // 2. Load zip contents using PizZip
    const zip = new PizZip(content);

    // 3. Initialize Docxtemplater
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true, // Replaces \n with Word line breaks
    });

    // 4. Render document with populated data context
    doc.render(context);

    // 5. Output generated binary Buffer
    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });

    return buf;
  }
}
