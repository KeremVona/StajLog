import { prisma } from "#/utils/prisma";
import { Prisma, type User } from "@prisma/client";

export const getUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { email: email } });
    if (user) {
      return user;
    }

    return 0;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2018") {
        throw new Error("User with this email not found.");
      }
    }
    console.error("Unexpected error getting user:", error);
    throw new Error("Internal server error while getting user.");
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (user) {
      return user;
    }

    return 0;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2018") {
        throw new Error("User with this id not found.");
      }
    }
    console.error("Unexpected error getting user:", error);
    throw new Error("Internal server error while getting user.");
  }
};

export const makeUser = async (email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        passwordHash: password,
      },
    });

    return user;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new Error("A user with this email already exists.");
      }
    }
    console.error("Unexpected error during user registering:", error);
    throw new Error("Internal server error while registering user.");
  }
};

export const updateUser = async (
  id: number,
  data: Prisma.UserUpdateInput,
): Promise<User> => {
  try {
    return await prisma.user.update({
      where: { id },
      data,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2018") {
        throw new Error("User with this id not found.");
      }
    }
    console.error("Unexpected error updating user:", error);
    throw new Error("Internal server error while updating user.");
  }
};

export const deleteUser = async (id: number): Promise<User> => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2018") {
        throw new Error("User with this id not found.");
      }
    }
    console.error("Unexpected error deleting user:", error);
    throw new Error("Internal server error while deleting user.");
  }
};
