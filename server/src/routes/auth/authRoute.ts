import express from "express";
import {
  registerHandler,
  loginHandler,
  verifyHandler,
  getUserIdHandler,
} from "#/controllers/auth/authController";
import authorize from "#/middlewares/auth/authorization";

const router = express.Router();

router.post("/register", registerHandler);
router.post("/login", loginHandler);
router.post("/verify", authorize, verifyHandler);
router.post("/user-id", authorize, getUserIdHandler);

export default router;
