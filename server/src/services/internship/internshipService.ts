import type {
  MakeInternshipBody,
  EditInternshipBody,
} from "#/interfaces/internship/Internship.js";
import { prisma } from "#/utils/prisma";
import { Prisma } from "@prisma/client";

export const getInternships = async () => {
  try {
    const internships = await prisma.internship.findMany();
    if (internships.length > 0) return internships;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Internships were not found.");
      }
    }
    console.error("Unexpected error getting internships:", error);
    throw new Error("Internal server error while getting internships.");
  }
};

export const getInternshipById = async (internshipId: number) => {
  try {
    const internship = await prisma.internship.findFirst({
      where: { id: internshipId },
    });
    if (internship) return internship;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Internship were not found.");
      }
    }
    console.error("Unexpected error getting internship:", error);
    throw new Error("Internal server error while getting internship.");
  }
};

export const makeInternship = async (
  makeInternshipBody: MakeInternshipBody,
) => {
  try {
    const internship = await prisma.internship.create({
      data: {
        companyAddress: makeInternshipBody.companyAddress,
        companyName: makeInternshipBody.companyName,
        companySector: makeInternshipBody.companySector,
        companyPhone: makeInternshipBody.companyPhone,
        companyWebAddress: makeInternshipBody.companyWebAddress,
        startDate: makeInternshipBody.startDate,
        endDate: makeInternshipBody.endDate,
        userId: makeInternshipBody.userId,
      },
    });

    return internship;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Internship were not found.");
      }
    }
    console.error("Unexpected error getting internship:", error);
    throw new Error("Internal server error while getting internship.");
  }
};

export const editInternship = async (
  internshipId: number,
  editInternshipBody: EditInternshipBody,
) => {
  try {
    const internship = await prisma.internship.update({
      where: { id: internshipId },
      data: {
        companyAddress: editInternshipBody.companyAddress,
        companyName: editInternshipBody.companyName,
        companySector: editInternshipBody.companySector,
        companyPhone: editInternshipBody.companyPhone,
        companyWebAddress: editInternshipBody.companyWebAddress,
        startDate: editInternshipBody.startDate,
        endDate: editInternshipBody.endDate,
      },
    });

    return internship;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Internship were not found.");
      }
    }
    console.error("Unexpected error getting internship:", error);
    throw new Error("Internal server error while getting internship.");
  }
};

export const deleteInternship = async (internshipId: number) => {
  try {
    await prisma.internship.delete({ where: { id: internshipId } });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        throw new Error("Internship were not found.");
      }
    }
    console.error("Unexpected error getting internship:", error);
    throw new Error("Internal server error while getting internship.");
  }
};
