import React, { useState } from "react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";
import toast from "react-hot-toast";
import axios from "axios";

const LogsWithTemplate = ({
  logs,
  studentName,
  internshipPeriod,
  enhanceWithAI = true,
}) => {
  const [templateFile, setTemplateFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleTemplateUpload = (e) => {
    setTemplateFile(e.target.files[0]);
  };

  const enhanceLog = async (rawContent) => {
    // Example: call your AI endpoint to get subtitle + bullet points
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/generate",
        { raw_content: rawContent },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return res.data.generated_content; // formatted subtitle + bullets
    } catch (err) {
      console.error("AI enhancement error:", err);
      return rawContent; // fallback
    }
  };

  const generateDocx = async () => {
    if (!templateFile) {
      toast.error("Upload a template first.");
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const content = event.target.result;
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, {
          paragraphLoop: true,
          linebreaks: true,
        });

        // Prepare logs for template
        const formattedLogs = logs.map((log) => ({
          day_number: log.day_number,
          log_title: log.title || `Internship Day ${log.day_number}`,
          log_date: log.made_at
            ? new Date(log.made_at).toLocaleDateString()
            : "",
          log_content: log.generated_content || log.raw_content, // just use what's in DB
        }));

        // Set template placeholders
        doc.setData({
          student_name: studentName || "Your Name",
          internship_period: internshipPeriod || "Not specified",
          total_days: logs.length,
          logs: formattedLogs,
          table_of_contents: formattedLogs
            .map(
              (log, idx) =>
                `Internship Day ${log.day_number || idx + 1}: ${
                  log.log_title
                } → Page #`
            )
            .join("\n"),
        });

        // Render template
        doc.render();

        // Generate final docx
        const out = doc.getZip().generate({ type: "blob" });
        saveAs(out, `Internship_Report_${studentName || "Student"}.docx`);
        toast.success("Document generated successfully!");
      } catch (err) {
        console.error("Template rendering error:", err);
        toast.error(
          "Failed to generate document. Check the template placeholders."
        );
      } finally {
        setIsLoading(false);
      }
    };

    reader.readAsArrayBuffer(templateFile);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Export Logs with School Template
      </h1>

      <input
        type="file"
        accept=".docx"
        onChange={handleTemplateUpload}
        className="border p-2 rounded-md"
      />

      <button
        onClick={generateDocx}
        disabled={isLoading}
        className={`mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? "Generating..." : "Generate Document"}
      </button>
    </div>
  );
};

export default LogsWithTemplate;
