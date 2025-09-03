import { useState, useEffect } from "react";
import axios from "axios";
import LogForm from "../components/content/LogForm";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({ dayNumber: "", rawContent: "" });
  const [hide, setHide] = useState(false);

  const handleGetAll = async () => {
    const token = localStorage.getItem("token");

    try {
      const result = await axios.get("http://localhost:5000/api/content", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs(result.data);
    } catch (err) {
      console.error("Error getting logs ", err.message);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    try {
      const result = await axios.post(
        "http://localhost:5000/api/content",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Error posting log ", err.message);
    }
  };
  return (
    <>
      <button onClick={handleGetAll} className="block p-2 bg-gray-400">
        Get all
      </button>

      <button onClick={() => setHide(!hide)} className="block p-2 bg-gray-400">
        Enter log
      </button>

      {hide && <LogForm />}
      <div className="space-y-4">
        {logs.map((log) => (
          <div
            key={log.id}
            className="bg-white shadow-md rounded-2xl p-4 border border-gray-200"
          >
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Day {log.day_number}
            </h2>
            <textarea
              value={log.raw_content}
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows={4}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
