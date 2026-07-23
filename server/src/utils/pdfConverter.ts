import libre from "libreoffice-convert";
import { promisify } from "util";

const convertAsync = promisify(libre.convert);

export class PdfConverterService {
  /**
   * Converts a DOCX buffer into a PDF buffer using headless LibreOffice.
   *
   * @param docxBuffer The generated .docx binary buffer
   * @returns Buffer containing the rendered PDF
   */
  public static async convertDocxToPdf(docxBuffer: Buffer): Promise<Buffer> {
    try {
      const pdfBuffer = await convertAsync(docxBuffer, ".pdf", undefined);
      return pdfBuffer;
    } catch (error) {
      console.error("LibreOffice PDF conversion error:", error);
      throw new Error("Failed to convert DOCX to PDF");
    }
  }
}
