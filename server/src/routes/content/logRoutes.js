import express from "express";
import authorization from "../../middleware/authorization.js";
import {
  getAllLogsHandler,
  postLogHandler,
  updateLogHandler,
  deleteLogHandler,
} from "../../controllers/content/logController.js";

const router = express.Router();

router.get("/", authorization, getAllLogsHandler);
router.post("/", authorization, postLogHandler);
router.put("/:id", authorization, updateLogHandler);
router.delete("/:id", authorization, deleteLogHandler);

export default router;
