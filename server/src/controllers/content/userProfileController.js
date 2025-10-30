import pool from "../../db.js";

/*
work_days, field, student_number, company_name, company_address, start_date, end_date
*/

export const getProfile = async (req, res) => {
  const id = req.user.id;
  try {
    const response = await pool.query(
      "SELECT * FROM user_profiles WHERE user_id = $1",
      [id]
    );
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.error("Server error", err.message);
    res.status(500).send("Server error");
  }
};

export const postProfile = async (req, res) => {
  const {
    user_id,
    work_days,
    field,
    student_number,
    company_name,
    company_address,
    start_date,
    end_date,
  } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO user_profiles (user_id, work_days, field, student_number, company_name, company_address, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *;",
      [
        user_id,
        work_days,
        field,
        student_number,
        company_name,
        company_address,
        start_date,
        end_date,
      ]
    );
    res.json({
      message: "Profile successfully made",
      data: result.rows[0],
    });
  } catch (err) {
    console.error("Server error", err.message);
    res.status(500).send("Server error");
  }
};
