import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const API_BASE_URL = "http://localhost:5000/api/content";

function LogEditorModal({ log, onClose, onUpdate }) {
  const [rawContent, setRawContent] = useState(log.raw_content);
  const [aiContent, setAiContent] = useState(
    log.ai_content || log.generated_content
  );
  const [isLoading, setIsLoading] = useState(false);
  const [done, setDone] = useState(true);

  const handleEnhance = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Authentication token not found.");
      setIsLoading(false);
      return;
    }

    try {
      // Make a POST request to the enhancement endpoint
      const response = await axios.post(
        `${API_BASE_URL}/generate`,
        { raw_content: rawContent, day: log.day_number, id: log.id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Get the enhanced text from the response
      const newAiContent = response.data.ai_content;
      setAiContent(newAiContent);
      toast.success("Log enhanced successfully!");

      // Update the parent component's state
      onUpdate({ ...log, raw_content: rawContent, ai_content: newAiContent });
    } catch (error) {
      console.error(
        "Error enhancing log:",
        error.response?.data || error.message
      );
      toast.error("Failed to enhance log with AI.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    onUpdate({ ...log, raw_content: rawContent, ai_content: aiContent });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
        <h3 className="text-2xl font-bold mb-4">Edit Log: Day {log.day}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Raw Content
            </label>
            <textarea
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 h-48"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              AI Content
            </label>
            <div className="mt-1 p-2 bg-gray-50 border border-gray-300 rounded-md h-48 overflow-y-auto">
              {isLoading
                ? "Enhancement in progress..."
                : aiContent || "Not yet enhanced."}
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleEnhance}
            className="py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Enhancing..." : "Enhance with AI"}
          </button>
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Update Log
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogEditorModal;
