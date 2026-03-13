import { prisma } from "../lib/prisma.js";
import type { Request, Response } from "express";


export const createCategory = async (req: Request, res: Response) => {
  const { category_name } = req.body;

  const newcategory = await prisma.category.create({
    data: {
      category_name,
    },
  });

  res.status(200).json({ message: newcategory });
};

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { name, category_id } = req.body;

    const createPath = await prisma.subCategory.create({
      data: {
        name,
        category_id,
      },
    });

    return res.status(201).json({
      message: "SubCategory created successfully!",
      data: createPath,
    });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};