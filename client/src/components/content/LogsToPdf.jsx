import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const LogsToPdf = ({ logs, studentName, internshipPeriod }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // ======================
    // COVER PAGE
    // ======================
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

    // Add page break after cover
    doc.addPage();

    // ======================
    // TABLE OF CONTENTS
    // ======================
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

      // Placeholder page numbers (we’ll fill after logs)
      tocEntries.push({
        title,
        page: doc.internal.getCurrentPageInfo().pageNumber,
      });
      doc.text("...", 180, tocY); // just dots until we backfill
      tocY += 10;

      if (tocY > 270) {
        doc.addPage();
        tocY = 20;
      }
    });

    // Add page break after TOC
    doc.addPage();

    // ======================
    // LOGS SECTION
    // ======================
    let y = 20;
    logs.forEach((log, index) => {
      const title =
        log.title && log.title.trim() !== ""
          ? log.title
          : `Internship Day ${log.day_number || index + 1}`;

      // Save TOC page number
      tocEntries[index].page = doc.internal.getCurrentPageInfo().pageNumber;

      // Title
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += 10;

      // Date
      if (log.made_at) {
        doc.setFontSize(10);
        doc.text(`Date: ${new Date(log.made_at).toLocaleDateString()}`, 10, y);
        y += 10;
      }

      // Content
      if (log.generated_content) {
        const splitText = doc.splitTextToSize(log.generated_content, 180);
        doc.setFontSize(12);
        doc.text(splitText, 10, y);
        y += splitText.length * 8;
      }

      // Page break
      /*if (y > 260 && index !== logs.length - 1) {
        doc.addPage();
        y = 20;
      } else {
        y += 10;
      }*/
      doc.addPage();
    });

    // ======================
    // FOOTERS WITH PAGE NUMBERS
    // ======================
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(10);
      doc.text(`Page ${i} of ${totalPages}`, 200 - 20, 290, { align: "right" });
    }

    // ======================
    // SAVE FILE
    // ======================
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
