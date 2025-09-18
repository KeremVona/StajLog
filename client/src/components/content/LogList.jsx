import React from "react";
import { truncateText } from "../../utils/helpers.js";

function LogList({ logs, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Gün
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sade İçerik
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Yapay Zeka İçerik
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Son Güncelleme
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              İşlemler
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {logs.map((log) => (
            <tr key={log.id}>
              <td className="px-6 py-4 whitespace-nowrap">{log.day_number}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {truncateText(log.raw_content, 50)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {log.ai_content ? (
                  <span className="text-green-500">✔ Müsait</span>
                ) : (
                  <span className="text-gray-400">✖</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(log.updated_at).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
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
  );
}

export default LogList;
