import React, { useState } from "react";
import toast from "react-hot-toast";

function AddLogForm({ onAddLog, logs }) {
  const [day, setDay] = useState("");
  const [rawContent, setRawContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!day || !rawContent) {
      toast.error("Day and content are required.");
      return;
    }
    // Prevent duplicate days
    const dayExists = logs.some((log) => log.day === parseInt(day, 10));
    if (dayExists) {
      toast.error(`A log for Day ${day} already exists.`);
      return;
    }
    onAddLog({ day: parseInt(day, 10), raw_content: rawContent });
    setDay("");
    setRawContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">Add a New Log</h3>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder="Day #"
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="flex-shrink-0 w-24 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          placeholder="What did you work on today?"
          value={rawContent}
          onChange={(e) => setRawContent(e.target.value)}
          className="flex-grow border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="mt-4 flex space-x-2">
        <button
          type="submit"
          className="bg-green-500 text-white font-bold py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
        >
          Save
        </button>
        <button
          type="button"
          onClick={() =>
            onAddLog({
              day: parseInt(day, 10),
              raw_content: rawContent,
              enhance: true,
            })
          }
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Save & Enhance
        </button>
      </div>
    </form>
  );
}

export default AddLogForm;
