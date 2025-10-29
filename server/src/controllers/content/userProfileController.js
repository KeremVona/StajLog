import pool from "../../db.js";

/*
work_days, field, student_number, company_name, company_address, start_date, end_date
*/

export const getProfile = async (req, res) => {
  const { id } = req.user.id;
  try {
    const response = await pool.query(
      "SELECT * FROM user_profiles WHERE user_id = $1",
      [id]
    );
    console.log(response.rows[0]);
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.error("Server error", err.message);
    res.status(500).send("Server error");
  }
};

export const postProfile = async (req, res) => {
  const {
    work_days,
    field,
    student_number,
    company_name,
    company_address,
    start_date,
    end_date,
  } = req.body;
  try {
    await pool.query(
      "INSERT INTO profiles (work_days, field, student_number, company_name, company_address, start_date, end_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;",
      [
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
