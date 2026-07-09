import { getLogById, getLogs } from "#/services/log/logService.js";
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
