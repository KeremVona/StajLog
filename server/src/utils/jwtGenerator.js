import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env", quiet: true });

function jwtGenerator(user_id, user_name) {
  const payload = {
    user: {
      id: user_id,
      username: user_name,
    },
  };

  console.log(user_id, user_name);

  return jwt.sign(payload, process.env.Secret, { expiresIn: "1h" });
}

export default jwtGenerator;
