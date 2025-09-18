import React from "react";

const LogCard = ({ log, onEdit, onDelete }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Day {log.day_number}</h3>
      <p className="text-gray-700 mb-4 truncate">{log.raw_content}</p>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onEdit(log)}
          className="text-sm text-blue-500 hover:underline"
        >
          View/Edit
        </button>
        <button
          onClick={() => onDelete(log.id)}
          className="text-sm text-red-500 hover:underline"
        >
          Delete
        </button>
        <button className="text-sm text-purple-500 hover:underline">
          Improve with AI
        </button>
      </div>
    </div>
  );
};

export default LogCard;
