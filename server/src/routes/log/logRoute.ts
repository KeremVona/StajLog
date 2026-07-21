import {
  deleteLogHandler,
  editLogHandler,
  getLogHandler,
  getLogsHandler,
  improveLogHandler,
  makeLogHandler,
} from "#/controllers/log/logController.js";
import authorize from "#/middlewares/auth/authorization.js";
import express from "express";

const router = express.Router();

router.get("/", authorize, getLogsHandler);
router.get("/:id", authorize, getLogHandler);
router.post("/", authorize, makeLogHandler);
router.put("/:id", authorize, editLogHandler as any);
router.delete("/:id", authorize, deleteLogHandler);
router.post("/:id", authorize, improveLogHandler);

export default router;
