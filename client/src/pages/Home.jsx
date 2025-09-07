import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import LogForm from "../components/content/LogForm";
import Navbar from "../components/ui/Navbar";
import AddLogForm from "../components/content/AddLogForm";
import LogEditorModal from "../components/content/LogEditorModal";
import LogList from "../components/content/LogList";
import LogsToPdf from "../components/content/LogsToPdf";

const API_BASE_URL = "http://localhost:5000/api";

const Home = () => {
  const [logs, setLogs] = useState([]);
  const [formData, setFormData] = useState({ dayNumber: "", rawContent: "" });
  const [hide, setHide] = useState(false);
  const [editingLog, setEditingLog] = useState(null);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  // Authentication Check
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchLogs();
      const decoded = jwtDecode(token);
      setUsername(decoded.user.username);
    }
  }, [navigate]);

  // Fetch Logs
  const fetchLogs = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`${API_BASE_URL}/content`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching logs:", error);
      if (error.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  // Add Log
  const handleAddLog = async (logData) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const id = decoded.user.id;
    try {
      await axios.post(
        `${API_BASE_URL}/content`,
        { ...logData, user_id: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchLogs(); // Refresh the log list
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

  // Edit Log
  const handleEditLog = (log) => {
    setEditingLog(log);
  };

  const handleUpdateLog = async (updatedLog) => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `${API_BASE_URL}/content/${updatedLog.id}`,
        { raw_content: updatedLog.raw_content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingLog(null); // Close the modal
      fetchLogs(); // Refresh the list
    } catch (error) {
      console.error("Error updating log:", error);
    }
  };

  const handleDeleteLog = async (logId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_BASE_URL}/content/${logId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchLogs();
    } catch (error) {
      console.error("Error deleting log:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userName={username} />
      <LogsToPdf logs={logs} studentName={username} />
      <div className="container mx-auto p-4">
        {/* Add New Log Section */}
        <AddLogForm onAddLog={handleAddLog} logs={logs} />
        <h2 className="text-2xl font-bold my-6">Your Internship Logs</h2>
        {/* Log List / Table */}
        <LogList
          logs={logs}
          onEdit={handleEditLog}
          onDelete={handleDeleteLog}
        />
      </div>
      {/* Log Detail / Editor Modal */}
      {editingLog && (
        <LogEditorModal
          log={editingLog}
          onClose={() => setEditingLog(null)}
          onUpdate={handleUpdateLog}
        />
      )}
    </div>
  );
};

export default Home;
