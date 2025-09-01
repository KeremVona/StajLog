import express from "express";
import validInfo from "../../middleware/validInfo.js";
import authorize from "../../middleware/authorization.js";
import {
  registerHandler,
  loginHandler,
  verifyHandler,
  getUserIdHandler,
} from "../../controllers/authentication/userController.js";

const router = express.Router();

router.post("/register", validInfo, registerHandler);
router.post("/login", validInfo, loginHandler);
router.post("/verify", authorize, verifyHandler);
router.post("/user-id", authorize, getUserIdHandler);

export default router;
