import React from "react";

const Sidebar = ({ logCount, internshipDays }) => {
  return (
    <aside className="w-64 bg-white p-4 shadow-md">
      <h2 className="text-lg font-bold mb-4">Quick Stats</h2>
      <div className="space-y-2">
        <p>
          Total Logs: <span className="font-semibold">{logCount}</span>
        </p>
        <p>
          Internship Days:{" "}
          <span className="font-semibold">{internshipDays}</span>
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
