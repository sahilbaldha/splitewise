import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";

export const createGroup = async (req: Request, res: Response) => {
  const { groupName, usersIds } = req.body;

  const { userId } = req.user;

  try {
    const existingUsers = await prisma.user.findMany({
      where: {
        id: {
          in: usersIds,
        },
      },
      select: {
        id: true,
      },
    });
    const arrayofIds = existingUsers.map((ele) => ele.id);
    const missingUserIds = usersIds.filter(
      (ele: any) => !arrayofIds.includes(ele),
    );

    if (missingUserIds.length > 0) {
      return res.status(201).json(missingUserIds);
    }

    const newGroupWithUsers = await prisma.group.create({
      data: {
        group_name: groupName,
        members: {
          connect: usersIds.map((id: string) => ({ id })),
        },
        author_id: userId,
      },
      select: {
        members: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return res
      .status(201)
      .json({ message: "Group Create Sucessfully", data: newGroupWithUsers });
  } catch (error) {
    console.error("Failed to create group:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};
