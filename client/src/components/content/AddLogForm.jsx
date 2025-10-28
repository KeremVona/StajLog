import React, { useState } from "react";
import toast from "react-hot-toast";

function AddLogForm({ onAddLog, logs }) {
  const [day, setDay] = useState("");
  const [title, setTitle] = useState("");
  const [rawContent, setRawContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (day == "") {
      setDay(logs.length + 1);
    }

    const dayUse = day === "" ? logs.length + 1 : parseInt(day, 10);

    if (!dayUse || !rawContent) {
      toast.error("Day and content are required.");
      return;
    }

    const dayExists = logs.some((log) => log.day === parseInt(day, 10));

    if (dayExists) {
      toast.error(`A log for Day ${day} already exists.`);
      return;
    }

    onAddLog({
      day: dayUse,
      title: title.trim() || null,
      raw_content: rawContent,
    });
    setDay("");
    setTitle("");
    setRawContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6"
    >
      <h3 className="text-xl font-semibold mb-4">Yeni bir kayıt ekle</h3>
      <div className="flex space-x-4">
        <input
          type="number"
          placeholder={logs.length + 1 + ". gün"}
          value={day}
          onChange={(e) => setDay(e.target.value)}
          className="flex-shrink-0 w-24 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="İsteğe bağlı başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <textarea
          placeholder="Bugün ne üzerinde çalıştın?"
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
          Kaydet
        </button>
        <button
          type="button"
          onClick={() =>
            onAddLog({
              day: parseInt(day, 10),
              title: title.trim() || null,
              raw_content: rawContent,
              enhance: true,
            })
          }
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Kaydet ve Geliştir
        </button>
      </div>
    </form>
  );
}

export default AddLogForm;
