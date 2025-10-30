import express from "express";
import authorization from "../../middleware/authorization.js";
import {
  getProfile,
  postProfile,
} from "../../controllers/content/userProfileController.js";

const router = express.Router();

router.get("/", authorization, getProfile);
router.post("/", authorization, postProfile);

export default router;
