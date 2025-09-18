import React from "react";
import LogGenerator from "../content/LogGenerator";
import LogsToPdf from "../content/LogsToPdf";

const ActionBar = ({ onAddLog, logs, studentName }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex justify-between items-center">
      <div>
        <button
          onClick={onAddLog}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          + Add New Log
        </button>
      </div>
      <div className="flex items-center space-x-2">
        <LogGenerator logs={logs} studentName={studentName} />
        <LogsToPdf logs={logs} studentName={studentName} />
        <input
          type="text"
          placeholder="Search logs..."
          className="border p-2 rounded-lg"
        />
      </div>
    </div>
  );
};

export default ActionBar;
