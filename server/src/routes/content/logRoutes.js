import express from "express";
import authorization from "../../middleware/authorization.js";
import {
  getAllLogsHandler,
  postLogHandler,
  updateLogHandler,
} from "../../controllers/content/logController.js";

const router = express.Router();

router.get("/", authorization, getAllLogsHandler);
router.post("/", authorization, postLogHandler);
router.put("/:id", authorization, updateLogHandler);

export default router;
