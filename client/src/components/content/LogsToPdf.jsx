import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const LogsToPdf = ({ logs, studentName, internshipPeriod }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Internship Report", 105, 40, { align: "center" });

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text(`Student: ${studentName || "Your Name"}`, 105, 70, {
      align: "center",
    });
    doc.text(
      `Internship Period: ${internshipPeriod || "Not specified"}`,
      105,
      85,
      { align: "center" }
    );

    doc.text(`Total Days: ${logs.length}`, 105, 100, { align: "center" });

    doc.addPage();

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Table of Contents", 105, 20, { align: "center" });

    let tocY = 40;
    const tocEntries = [];

    logs.forEach((log, index) => {
      const title =
        log.title && log.title.trim() !== ""
          ? log.title
          : `Internship Day ${log.day_number || index + 1}`;

      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(`${title}`, 20, tocY);

      tocEntries.push({
        title,
        page: doc.internal.getCurrentPageInfo().pageNumber,
      });
      doc.text("...", 180, tocY);
      tocY += 10;

      if (tocY > 270) {
        doc.addPage();
        tocY = 20;
      }
    });

    doc.addPage();

    // Log section
    let y = 20;
    logs.forEach((log, index) => {
      const title =
        log.title && log.title.trim() !== ""
          ? log.title
          : `Internship Day ${log.day_number || index + 1}`;

      tocEntries[index].page = doc.internal.getCurrentPageInfo().pageNumber;

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += 10;

      if (log.made_at) {
        doc.setFontSize(10);
        doc.text(`Date: ${new Date(log.made_at).toLocaleDateString()}`, 10, y);
        y += 10;
      }

      if (log.generated_content) {
        const splitText = doc.splitTextToSize(log.generated_content, 180);
        doc.setFontSize(12);
        doc.text(splitText, 10, y);
        y += splitText.length * 8;
      }

      doc.addPage();
    });

    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, 200 - 20, 290, { align: "right" });
    }

    const fileName = `Internship_Report_${studentName || "Student"}.pdf`;
    doc.save(fileName);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Varsayılan PDF dosya</h1>

      <button
        onClick={generatePDF}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
      >
        Export to PDF
      </button>
    </div>
  );
};

export default LogsToPdf;
