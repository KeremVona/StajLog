import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Navbar from "../components/ui/Navbar";
import LogEditorModal from "../components/content/LogEditorModal";
import AddLogForm from "../components/content/AddLogForm";
import LogGenerator from "../components/content/LogGenerator";

// home2
import Sidebar from "../components/home2/Sidebar";
import Logs from "../components/home2/Logs";
import Dashboard from "../components/home2/Dashboard";
import UserProfile from "../components/home2/UserProfile";

const API_BASE_URL = "http://localhost:5000/api";
const API_URL = "http://localhost:5000/api/content/user";

const Home2 = () => {
  const [logs, setLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [username, setUsername] = useState("");

  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

  const [workDays, setWorkDays] = useState();
  const [userProfile, setUserProfile] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    const handleFetch = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWorkDays(result.data.work_days);
      } catch (err) {
        console.error(err.message);
      }
    };
    handleFetch();

    if (!token) {
      navigate("/login");
    } else {
      fetchLogs();
      const decoded = jwtDecode(token);
      setUsername(decoded.user.username);
    }
  }, [navigate]);

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
      fetchLogs();
    } catch (error) {
      console.error("Error adding log:", error);
    }
  };

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
      setEditingLog(null);
      fetchLogs();
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
    <>
      <Navbar userName={username} />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
        {editingLog ? (
          <LogEditorModal
            log={editingLog}
            onClose={() => setEditingLog(null)}
            onUpdate={handleUpdateLog}
          />
        ) : (
          <Sidebar
            openSidebar={openSidebar}
            setOpenSidebar={setOpenSidebar}
            activeSection={activeSection}
            setActiveSection={setActiveSection}
          />
        )}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {activeSection === "dashboard" && (
            <Dashboard username={username} logs={logs} workDays={workDays} />
          )}
          {activeSection === "orders" && (
            <Logs
              logs={logs}
              onEdit={handleEditLog}
              onDelete={handleDeleteLog}
            />
          )}
          {activeSection === "kayit_ekle" && (
            <AddLogForm onAddLog={handleAddLog} logs={logs} />
          )}
          {activeSection === "disa_aktar" && (
            <LogGenerator
              logs={logs}
              studentName={username}
              internshipPeriod={workDays}
            />
          )}
          {activeSection === "profile" && <UserProfile />}
        </main>
      </div>
    </>
  );
};

export default Home2;
