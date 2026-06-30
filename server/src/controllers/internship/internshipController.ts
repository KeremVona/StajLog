import type {
  EditInternshipBody,
  InternsipParams,
  MakeInternshipBody,
} from "#/interfaces/internship/Internship.js";
import {
  deleteInternship,
  editInternship,
  getInternshipById,
  getInternships,
  makeInternship,
} from "#/services/internship/internshipService.js";
import { type RequestHandler } from "express";

export const getInternshipsHandler: RequestHandler = async (req, res) => {
  console.log("start");
  try {
    const userId = req.user?.id;

    console.log("userId:", userId);
    console.log("user", req.user);

    if (!userId) {
      res.status(401).send("Unauthorized");
      return;
    }

    const internships = await getInternships(userId);

    return res.status(200).send(internships);
  } catch (error) {
    console.error("Server error - getInternshipsHandler", error);
    return res.status(500).send("Server error");
  }
};

export const getInternshipHandler: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).send("Unauthorized");
      return;
    }

    const internship = await getInternshipById(Number(id), userId);

    return res.status(200).send(internship);
  } catch (error) {
    console.error("Server error - getInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};

export const makeInternshipHandler: RequestHandler<
  {},
  any,
  MakeInternshipBody
> = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).send("User not found");

    const internship = await makeInternship({ ...req.body, userId });

    return res.send(internship);
  } catch (error) {
    console.error("Server error - makeInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};

export const editInternshipHandler: RequestHandler<
  InternsipParams, // Params
  any, // Response body
  EditInternshipBody // Request body
> = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).send("User not found");

    const internship = await editInternship(Number(id), userId, req.body);

    return res.status(200).send(internship);
  } catch (error) {
    console.error("Server error - editInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};

export const deleteInternshipHandler: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).send("User not found");

    await deleteInternship(Number(id));

    return res.status(200).send("Deletion successful");
  } catch (error) {
    console.error("Server error - deleteInternshipHandler", error);
    return res.status(500).send("Server error");
  }
};
