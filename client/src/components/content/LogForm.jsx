import React, { useState, useEffect } from "react";
import axios from "axios";

// This is now a standalone component that can be imported
const LogForm = () => {
  // State for form inputs
  const [dayNumber, setDayNumber] = useState("");
  const [log, setLog] = useState("");

  // State for validation errors
  const [dayError, setDayError] = useState("");
  const [logError, setLogError] = useState("");

  // State to track form validity for button enabling
  const [isFormValid, setIsFormValid] = useState(false);

  // Character limit for the log textarea
  const CHAR_LIMIT = 2000;

  // UseEffect to run validation whenever 'day' or 'log' state changes
  useEffect(() => {
    // Basic day validation: must be a number greater than or equal to 1
    const isDayValid =
      dayNumber !== "" && !isNaN(dayNumber) && Number(dayNumber) >= 1;
    setDayError(isDayValid ? "" : "Day must be a number ≥ 1");

    // Basic log validation: cannot be empty and must be within the character limit
    const isLogValid = log.trim() !== "" && log.length <= CHAR_LIMIT;
    setLogError(
      isLogValid
        ? ""
        : log.trim() === ""
        ? "Log cannot be empty."
        : `Log must not exceed ${CHAR_LIMIT} characters. (${log.length}/${CHAR_LIMIT})`
    );

    // Update the form validity state
    setIsFormValid(isDayValid && isLogValid);
  }, [dayNumber, log]);

  // Handle changes to the day input
  const handleDayChange = (e) => {
    const value = e.target.value;
    // Allow empty string or numbers to be typed, validation will handle the rest
    if (value === "" || !isNaN(value)) {
      setDayNumber(value);
    }
  };

  // Handle changes to the log textarea
  const handleLogChange = (e) => {
    const value = e.target.value;
    // Update the log state as the user types
    setLog(value);
  };

  // Handle Save button click
  const handleSave = async () => {
    if (isFormValid) {
      // Logic for saving the log (e.g., sending to an API or local state)
      // This is a placeholder for your actual saving logic
      // In a real app, you would replace alert() with a modal or notification

      const token = localStorage.getItem("token");

      try {
        const result = await axios.post(
          "http://localhost:5000/api/content",
          {
            dayNumber,
            log,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("Error posting log ", err.message);
      }
      alert("Log saved successfully!");
      console.log("Day:", dayNumber);
      console.log("Log:", log);
      // After saving, you might want to reset the form
      handleReset();
    }
  };

  // Handle Reset button click
  const handleReset = () => {
    setDayNumber("");
    setLog("");
    setDayError("");
    setLogError("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Staj Defteri
        </h1>

        <div className="mb-4">
          <label
            htmlFor="day-number"
            className="block text-gray-700 font-medium mb-2"
          >
            Gün Numarası
          </label>
          <input
            id="day-number"
            type="text" // Using type="text" to allow custom validation
            value={dayNumber}
            onChange={handleDayChange}
            className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="e.g., 10"
          />
          {dayError && <p className="mt-1 text-red-500 text-sm">{dayError}</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="log-text"
            className="block text-gray-700 font-medium mb-2"
          >
            Bugün ne yaptım
          </label>
          <textarea
            id="log-text"
            value={log}
            onChange={handleLogChange}
            className="w-full h-40 px-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            placeholder="Describe your daily activities..."
          ></textarea>
          <div className="flex justify-between items-center mt-2">
            <p
              className={`text-sm ${
                log.length > CHAR_LIMIT ? "text-red-500" : "text-gray-500"
              }`}
            >
              Harf sayısı: {log.length} / {CHAR_LIMIT}
            </p>
          </div>
          {logError && <p className="mt-1 text-red-500 text-sm">{logError}</p>}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors"
          >
            Sıfırla
          </button>
          <button
            onClick={handleSave}
            disabled={!isFormValid}
            className={`px-6 py-2 rounded-lg text-white font-semibold transition-colors
              ${
                isFormValid
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-400 cursor-not-allowed"
              }`}
          >
            Kayıtı Kaydet
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogForm;
