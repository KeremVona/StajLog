import pool from "../../db.js";

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
  const newLog = req.body;
  console.log(newLog);

  try {
    const result = await pool.query(
      "INSERT INTO logs (day_number, raw_content) VALUES ($1, $2)",
      [newLog.dayNumber, newLog.log]
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
  console.log("req.user ", req.user);
  const userId = req.user.id;
  console.log("id ", id);
  console.log("userId, ", userId);
  const { raw_content } = req.body;
  console.log("raw_content ", raw_content);
  console.log("-----------------");

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
