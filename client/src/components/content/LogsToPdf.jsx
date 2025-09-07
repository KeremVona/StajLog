import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

/*
Can you add a cover page (with student name, internship period, total days) before the logs?
*/

const LogsToPdf = ({ logs }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 20;

    console.log("logs ", logs);

    logs.forEach((log, index) => {
      // Title or fallback to "Internship Day X"
      const title =
        log.title && log.title.trim() !== ""
          ? log.title
          : `Internship Day ${log.day_number || index + 1}`;

      // Add Title
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(title, 10, y);
      y += 10;

      // Add Date if exists
      if (log.made_at) {
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.text(`Date: ${new Date(log.made_at).toLocaleDateString()}`, 10, y);
        y += 10;
      }

      // Add Generated Content
      if (log.generated_content) {
        const splitText = doc.splitTextToSize(log.generated_content, 180);
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(splitText, 10, y);
        y += splitText.length * 8;
      }

      // Page handling
      if (y > 260 && index !== logs.length - 1) {
        doc.addPage();
        y = 20;
      } else {
        y += 10; // spacing before next log
      }
    });

    doc.save("logs.pdf");
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Logs</h1>

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
