import { useState, useEffect } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

const LogsToPdf = ({ logs }) => {
  // const [logs, setLogs] = useState([]);

  /*useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:5000/api/content", {
        headers: {
          Authorization: `Bearer  ${token}`,
        },
      })
      .then((res) => setLogs(res.data))
      .catch((err) => console.error(err));
  }, []);*/

  const generatePDF = () => {
    const doc = new jsPDF();
    let y = 10;

    logs.forEach((log, index) => {
      // Split text if it's too long
      const splitText = doc.splitTextToSize(log.generated_content, 180);
      doc.text(splitText, 10, y);
      y += splitText.length * 10;

      if (y > 280) {
        doc.addPage();
        y = 10;
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
