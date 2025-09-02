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
      [newLog.day_number, newLog.raw_content]
    );
    // console.log("User inserted with ID: ", res.rows[0].id);
    res.send(result);
  } catch (err) {
    console.log("Server error", err.message);
    res.status(500).send("Server error");
  }
};
