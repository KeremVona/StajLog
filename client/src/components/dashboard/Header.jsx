import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">StajLog</h1>
      <nav className="flex items-center space-x-4">
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Dashboard
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          AI Improve Logs
        </a>
        <a href="#" className="text-gray-600 hover:text-gray-900">
          Settings
        </a>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
        <span className="text-gray-700">Welcome, {username}</span>
      </nav>
    </header>
  );
};

export default Header;
