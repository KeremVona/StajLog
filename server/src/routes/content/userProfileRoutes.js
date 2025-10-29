import express from "express";
import authorization from "../../middleware/authorization.js";
import { getProfile } from "../../controllers/content/userProfileController.js";

const router = express.Router();

router.get("/", authorization, getProfile);

export default router;
