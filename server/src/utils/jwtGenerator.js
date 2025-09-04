import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

function jwtGenerator(user_id, user_name) {
  const payload = {
    user: {
      id: user_id,
      username: user_name,
    },
  };

  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

export default jwtGenerator;
