import type {
  AuthInternshipRequest,
  AuthRequest,
  AuthRequest2,
  EditInternshipBody,
  InternsipParams,
} from "#/interfaces/internship/Internship.js";
import {
  deleteInternship,
  editInternship,
  getInternshipById,
  getInternships,
  makeInternship,
} from "#/services/internship/internshipService.js";
import { type Request, type Response } from "express";

export const getInternshipsHandler = async (req: Request, res: Response) => {
  try {
    const internships = await getInternships();

    return res.status(200).send(internships);
  } catch (error) {
    console.error("Server error - getInternshipsHandler", error);
    return res.status(500).send("Server error");
  }
};

export const getInternshipHandler = async (
  req: Request<InternsipParams>,
  res: Response,
) => {
  try {
    const { internshipId } = req.params;
    const internship = await getInternshipById(internshipId);

    return internship;
  } catch (error) {
    console.error("Server error - getInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};

export const makeInternshipHandler = async (
  req: Request<AuthInternshipRequest>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).send("User not found");

    const internship = await makeInternship({ ...req.body, userId });

    return internship;
  } catch (error) {
    console.error("Server error - makeInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};

export const editInternshipHandler = async (
  req: AuthRequest<InternsipParams, EditInternshipBody>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { internshipId } = req.params;

    if (!userId) return res.status(401).send("User not found");

    const internship = await editInternship(
      Number(internshipId),
      userId,
      req.body,
    );

    return res.status(200).send(internship);
  } catch (error) {
    console.error("Server error - editInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};

export const deleteInternshipHandler = async (
  req: AuthRequest2<InternsipParams>,
  res: Response,
) => {
  try {
    const userId = req.user?.id;
    const { internshipId } = req.params;

    if (!userId) return res.status(401).send("User not found");

    await deleteInternship(Number(internshipId));

    return res.status(200);
  } catch (error) {
    console.error("Server error - deleteInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};
