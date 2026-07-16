import type { LogParams, MakeLogBody } from "#/interfaces/log/Log.js";
import {
  deleteLog,
  getLogById,
  getLogs,
  makeLog,
  updateLog,
} from "#/services/log/logService.js";
import { type RequestHandler } from "express";

export const getLogsHandler: RequestHandler = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      res.status(401).send("Unauthorized");
      return;
    }

    const logs = await getLogs();

    return res.status(200).send(logs);
  } catch (error) {
    console.error("Server error - getLogsHandler", error);
    return res.status(500).send("Server error");
  }
};

export const getLogHandler: RequestHandler<{ id: string }> = async (
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

    const log = await getLogById(Number(id));

    return res.status(200).send(log);
  } catch (error) {
    console.error("Server error - getLogHandler", error);
    return res.status(500).send("Server error");
  }
};

export const makeLogHandler: RequestHandler<{}, any, MakeLogBody> = async (
  req,
  res,
) => {
  try {
    const userId = req.user?.id;

    if (!userId) return res.status(401).send("User not found");

    const log = await makeLog({ ...req.body });

    return res.send(log);
  } catch (error) {
    console.error("Server error - makeLogHandler", error);
    return res.status(500).send("Server error");
  }
};

export const editLogHandler: RequestHandler<
  LogParams, // Params
  any, // Response body
  MakeLogBody // Request body
> = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).send("User not found");

    const log = await updateLog(Number(id), req.body);

    return res.status(200).send(log);
  } catch (error) {
    console.error("Server error - editLogHandler", error);
    return res.status(500).send("Server error");
  }
};

export const deleteLogHandler: RequestHandler<{ id: string }> = async (
  req,
  res,
) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    if (!userId) return res.status(401).send("User not found");

    await deleteLog(Number(id));

    return res.status(200).send("Deletion successful");
  } catch (error) {
    console.error("Server error - deleteLogHandler", error);
    return res.status(500).send("Server error");
  }
};
