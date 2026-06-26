import type { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface UserPayload extends JwtPayload {
      id: number;
      fullName: string;
    }

    interface Request {
      user?: UserPayload;
    }
  }
}
