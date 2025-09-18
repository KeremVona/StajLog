import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AddLogForm from "../components/content/AddLogForm";
import LogEditorModal from "../components/content/LogEditorModal";
import Header from "../components/dashboard/Header";
import Sidebar from "../components/dashboard/Sidebar";
import ActionBar from "../components/dashboard/ActionBar";
import LogCard from "../components/dashboard/LogCard";

const API_BASE_URL = "http://localhost:5000/api";

const Dashboard = () => {
  const [logs, setLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddLogModalOpen, setAddLogModalOpen] = useState(false);
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
      setAddLogModalOpen(false); // Close modal on success
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

  const filteredLogs = logs.filter(
    (log) =>
      log.raw_content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      String(log.day_number).includes(searchTerm)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar logCount={logs.length} internshipDays={logs.length} />
      <div className="flex-1 flex flex-col">
        <Header username={username} />
        <main className="flex-1 p-6">
          <ActionBar
            onAddLog={() => setAddLogModalOpen(true)}
            logs={logs}
            studentName={username}
            onSearch={setSearchTerm}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLogs.map((log) => (
              <LogCard
                key={log.id}
                log={log}
                onEdit={handleEditLog}
                onDelete={handleDeleteLog}
              />
            ))}
          </div>
        </main>
      </div>

      {isAddLogModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Add New Log</h2>
            <AddLogForm onAddLog={handleAddLog} logs={logs} />
            <button
              onClick={() => setAddLogModalOpen(false)}
              className="mt-4 text-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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

export default Dashboard;
