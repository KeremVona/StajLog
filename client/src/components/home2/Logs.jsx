import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { truncateText } from "../../utils/helpers.js";

const API_BASE_URL = "http://localhost:5000/api";

const Logs = ({ logs, onEdit, onDelete }) => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-800">Defter kayıtların</h1>
        <p className="text-gray-600">Defter kayıtlarına bak ve yönet.</p>
      </header>
      <div className="bg-white p-4 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Gün", "Sade İçerik", "Yapay Zeka İçerik", "İşlemler"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {log.day_number}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  {truncateText(log.raw_content, 50)}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-green-600">
                  {log.ai_content ? (
                    <span className="text-green-500">✔ Müsait</span>
                  ) : (
                    <span className="text-gray-400">✖</span>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                  <button
                    onClick={() => onEdit(log)}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    Değiştir/Bak
                  </button>
                  <button
                    onClick={() => onDelete(log.id)}
                    className="ml-2 text-red-600 hover:text-red-900"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Logs;
