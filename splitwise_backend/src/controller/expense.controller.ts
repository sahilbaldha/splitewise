import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";


export const createExpense = async (req: Request, res: Response) => {
  try {

    const {
      description,
      price,
      group_id,
      userIds,
      note,
      paid_by_id,
      method,
      subcategory_id,
    } = req.body;

    const newExpenseWithUsers = await prisma.expense.create({
      data: {
        description,
        price,
        group_id,
        paid_by_id,
        note,
        method,
        subcategory_id,
        users: {
          connect: userIds.map((id: string) => ({ id })),
        },
      },
      select: {
        users: {
          select: {
            name: true,
            id: true,
          },
        },
      },
    });

    res.status(200).json({ message: newExpenseWithUsers });
  } catch (err:any) {
     console.log(err)
  }
};