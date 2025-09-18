import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Navbar from "../components/ui/Navbar";

const API_BASE_URL = "http://localhost:5000/api";

const Home2 = () => {
  const [logs, setLogs] = useState([]);
  const [editingLog, setEditingLog] = useState(null);
  const [username, setUsername] = useState("");

  const [openSidebar, setOpenSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");

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

  return (
    <>
      <Navbar userName={username} />
      <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-lg transition-all duration-300 ease-in-out fixed md:static inset-y-0 left-0 z-50 ${
            openSidebar ? "w-64" : "w-20 md:w-64 hidden md:block"
          }`}
        >
          <div className="p-4 flex items-center justify-between border-b">
            {(openSidebar || window.innerWidth >= 768) && (
              <h1 className="text-xl font-bold text-green-600 transition-opacity duration-300">
                E-Commerce
              </h1>
            )}
            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="md:hidden p-2 rounded-full hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Nav */}
          <nav className="py-4">
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    setActiveSection("dashboard");
                    setOpenSidebar(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                    activeSection === "dashboard" ? "bg-gray-100" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0l-2-2m2 2V4a1 1 0 00-1 1z"
                    />
                  </svg>
                  {(openSidebar || window.innerWidth >= 768) && (
                    <span className="text-gray-700">Dashboard</span>
                  )}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection("orders");
                    setOpenSidebar(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                    activeSection === "orders" ? "bg-gray-100" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                  {(openSidebar || window.innerWidth >= 768) && (
                    <span className="text-gray-700">Orders</span>
                  )}
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setActiveSection("profile");
                    setOpenSidebar(false);
                  }}
                  className={`flex items-center space-x-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors ${
                    activeSection === "profile" ? "bg-gray-100" : ""
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {(openSidebar || window.innerWidth >= 768) && (
                    <span className="text-gray-700">Profile</span>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex justify-between items-center mb-4">
            <h1 className="text-xl font-bold text-gray-800">E-Commerce</h1>
            <button
              onClick={() => setOpenSidebar(!openSidebar)}
              className="p-2 rounded-full hover:bg-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>

          {/* Dashboard Section */}
          {activeSection === "dashboard" && (
            <div className="space-y-6">
              <header>
                <h1 className="text-2xl font-bold text-gray-800">
                  Hoşgeldin, {username}!
                </h1>
                <p className="text-gray-600">Stajın nasıl gidiyor?</p>
              </header>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Toplam kayıtlar
                  </h2>
                  <p className="text-2xl font-bold text-green-600">
                    {logs.length}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Pending Orders
                  </h2>
                  <p className="text-2xl font-bold text-yellow-600">3</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <h2 className="text-lg font-semibold text-gray-700">
                    Total Spent
                  </h2>
                  <p className="text-2xl font-bold text-blue-600">$500.00</p>
                </div>
              </div>
            </div>
          )}

          {/* Orders Section */}
          {activeSection === "orders" && (
            <div className="space-y-6">
              <header>
                <h1 className="text-2xl font-bold text-gray-800">
                  Your Orders
                </h1>
                <p className="text-gray-600">
                  View and manage your recent orders.
                </p>
              </header>
              <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Order ID
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        #ORD12345
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        2023-10-10
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
                        Completed
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        $100.00
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        #ORD67890
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        2023-10-05
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-yellow-600">
                        Pending
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                        $50.00
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === "profile" && (
            <div className="space-y-6">
              <header>
                <h1 className="text-2xl font-bold text-gray-800">
                  Your Profile
                </h1>
                <p className="text-gray-600">
                  Update your personal information and settings.
                </p>
              </header>
              <div className="bg-white p-4 rounded-lg shadow-md">
                <form className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      placeholder="John Doe"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="john.doe@example.com"
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Home2;
