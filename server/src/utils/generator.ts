import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "../../.env", quiet: true });

function jwtGenerator(user_id: number) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  const secret = process.env.Secret;

  if (!secret) {
    throw new Error("Secret not in .env");
  }

  return jwt.sign(payload, secret, { expiresIn: "1h" });
}

export default jwtGenerator;
