import express from "express";
import authorization from "../../middleware/authorization.js";
import {
  getAllLogsHandler,
  postLogHandler,
} from "../../controllers/content/logController.js";

const router = express.Router();

router.get("/", getAllLogsHandler);
router.post("/", authorization, postLogHandler);

export default router;
