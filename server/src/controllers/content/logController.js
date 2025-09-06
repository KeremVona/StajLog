import pool from "../../db.js";
import { generate } from "../../utils/generate.js";

// GET, POST, PUT, DELETE

export const getAllLogsHandler = async (req, res) => {
  try {
    const respone = await pool.query("SELECT * FROM logs");

    res.status(200).send(respone.rows);
  } catch (err) {
    console.log("Server error", err.message);
    res.status(500).send("Server error");
  }
};

export const postLogHandler = async (req, res) => {
  // newLog.day_number, newLog.raw_content
  const { day, raw_content, user_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO logs (day_number, raw_content, user_id) VALUES ($1, $2, $3)",
      [day, raw_content, user_id]
    );
    // console.log("User inserted with ID: ", res.rows[0].id);
    res.send(result);
  } catch (err) {
    console.log("Server error", err.message);
    res.status(500).send("Server error");
  }
};

export const updateLogHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { raw_content } = req.body;

  try {
    const log = await pool.query(
      "SELECT * FROM logs WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    /*if (!log.rows.length) {
      return res.status(404).json({ message: "Log not found." });
    }*/

    const updatedLog = await pool.query(
      "UPDATE logs SET raw_content = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [raw_content || log.rows[0].raw_content, id]
    );

    console.log("updatedLog ", updatedLog);

    console.log(`Log ${id} updated for user ${userId}`);
    res.status(200).json(updatedLog.rows[0]);
  } catch (err) {
    console.log("Server error", err.message);
    res.status(500);
  }
};

export const deleteLogHandler = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const result = await pool.query(
      "DELETE FROM logs WHERE id = $1 AND user_id = $2 RETURNING *",
      [id, userId]
    );

    if (result.rows.length === 0) {
      // No rows deleted → log not found for this user
      return res.status(404).json({ message: "Log not found." });
    }

    console.log(`Log ${id} deleted for user ${userId}`);
    res.status(204).send(); // No content
  } catch (err) {
    console.error("Error deleting log:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const generateHandler = async (req, res) => {
  const { raw_content, day, id } = req.body;
  const userId = req.user.id;

  if (!raw_content) {
    return res
      .status(400)
      .json({ message: "Raw content is required for enhancement." });
  }

  try {
    // 1. Generate AI-enhanced content
    const generatedText = await generate(raw_content);

    // 2. Insert into DB
    const result = await pool.query(
      `UPDATE logs 
       SET raw_content = $1, generated_content = $2, updated_at = NOW()
       WHERE id = $3 AND user_id = $4 RETURNING *`,
      [raw_content, generatedText, id, userId]
    );

    // 3. Return the saved log
    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("AI enhancement error:", err.message);
    return res.status(500).json({ message: "AI enhancement failed." });
  }
};
