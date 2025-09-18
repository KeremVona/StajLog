import React, { useState } from "react";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

// A helper function to load the uploaded file as a binary string
const loadFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsBinaryString(file);
  });
};

function LogGenerator({
  logs,
  studentName,
  internshipPeriod,
  enhanceWithAI = true,
}) {
  const [templateFile, setTemplateFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTemplateFile(file);
  };

  const generateAndDownload = async () => {
    if (!templateFile) {
      alert("Lütfen önce bir şablon yükle.");
      return;
    }

    try {
      // 1. Load the uploaded file
      const content = await loadFile(templateFile);
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      // 2. Prepare the data

      const dayLogs = {};
      logs.forEach((log) => {
        dayLogs[`day${log.day_number}_generated_content`] =
          log.generated_content;
      });

      const data = {
        student_name: studentName,
        internship_dates: internshipPeriod,
        // Pass the logs array directly
        logs: logs.map((log) => ({
          day_number: log.day_number,
          generated_content: log.generated_content,
        })),
        ...dayLogs,
      };

      // 3. Set the data
      doc.setData(data);

      // 4. Render the document
      doc.render();

      // 5. Generate the new file and save it
      const out = doc.getZip().generate({
        type: "blob",
        mimeType:
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      saveAs(out, `internship_log_${studentName}.docx`);
      alert("Belge başarıyla üretildi!");
    } catch (error) {
      console.error("Error generating document:", error);
      alert("Bir hata oldu. Lütfen daha fazla detay için konsolu kontrol et.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Staj Defteri Jeneratörü
        </h1>

        <div className="space-y-4">
          <div className="flex flex-col">
            <label
              htmlFor="template-upload"
              className="mb-2 text-sm font-medium text-gray-700"
            >
              Şablon Yükle:
            </label>
            <input
              id="template-upload"
              type="file"
              accept=".docx"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              Öğrenci adı:{" "}
              <strong className="font-semibold text-gray-800">
                {studentName}
              </strong>
            </p>
            <p className="text-sm text-gray-600">
              Staj Süresi:{" "}
              <strong className="font-semibold text-gray-800">
                {internshipPeriod}
              </strong>
            </p>
          </div>
        </div>

        <button
          onClick={generateAndDownload}
          className="w-full px-4 py-3 text-lg font-semibold text-white transition duration-200 ease-in-out bg-blue-600 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Defteri üret
        </button>
      </div>
    </div>
  );
}

export default LogGenerator;
