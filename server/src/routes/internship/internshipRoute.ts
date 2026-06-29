import {
  deleteInternshipHandler,
  editInternshipHandler,
  getInternshipHandler,
  getInternshipsHandler,
  makeInternshipHandler,
} from "#/controllers/internship/internshipController.js";
import authorize from "#/middlewares/auth/authorization.js";
import express from "express";

const router = express.Router();

router.get("/", authorize, getInternshipsHandler);
router.get("/:id", authorize, getInternshipHandler);
router.post("/", authorize, makeInternshipHandler);
router.put("/:id", authorize, editInternshipHandler as any);
router.delete("/:id", authorize, deleteInternshipHandler);

export default router;
