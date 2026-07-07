import type { MakeLogBody } from "#/interfaces/log/Log.js";
import { prisma } from "#/utils/prisma";
import { Prisma } from "@prisma/client";

export const getLogs = async () => {
  try {
    const logs = await prisma.internshipLog.findMany();
    if (logs.length > 0) return logs;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Logs were not found.");
      }
    }
    console.error("Unexpected error getting logs:", error);
    throw new Error("Internal server error while getting logs.");
  }
};

export const getLogById = async (
  logId: number,
) => {
  try {
    const log = await prisma.internshipLog.findFirst({
      where: { id: logId },
    });
    if (log) return log;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Log were not found.");
      }
    }
    console.error("Unexpected error getting log:", error);
    throw new Error("Internal server error while getting log.");
  }
};

export const makeLog = async (makeLogBody: MakeLogBody) => {
  try {
    const log = await prisma.internshipLog.create({
      data: {
        ...makeLogBody,
        logDate: new Date(makeLogBody.logDate),
      },
    });

    return log;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        throw new Error("Invalid Internship ID: The associated internship does not exist.");
      }
    }
    console.error("Unexpected error making log:", error);
    throw new Error("Internal server error while making log.");
  }
};

export const updateLog = async (id: number, data: Partial<MakeLogBody>) => {
  try {
    const updatePayload: Prisma.InternshipLogUpdateInput = {};

    if (data.content !== undefined) {
      updatePayload.content = data.content;
    }

    if (data.status !== undefined) {
      updatePayload.status = data.status;
    }

    if (data.logDate !== undefined) {
      updatePayload.logDate = new Date(data.logDate);
    }

    const updatedLog = await prisma.internshipLog.update({
      where: { id: id },
      data: updatePayload,
    });

    return updatedLog;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new Error("Log not found.");
    }
    throw error;
  }
};

export const deleteLog = async (id: number) => {
  try {
    const deletedLog = await prisma.internshipLog.delete({
      where: { id },
    });
    return deletedLog;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2025") {
      throw new Error("Log not found, it may have already been deleted.");
    }
    throw new Error("Error deleting log.");
  }
};
