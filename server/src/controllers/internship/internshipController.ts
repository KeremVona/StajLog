import type {
  AuthInternshipRequest,
  InternsipParams,
} from "#/interfaces/internship/Internship.js";
import {
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
