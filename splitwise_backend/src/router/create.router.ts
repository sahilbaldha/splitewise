import express from "express";
export const create_router = express.Router();

import { authenticateUser } from "../middleware/checktoken.middleware.js";
import { upload } from "../multer/multer.js";

import { createCategory,createSubCategory } from "../controller/category.controller.js";
import { createExpense } from "../controller/expense.controller.js";
import { createGroup } from "../controller/create.controller.js";
create_router.post("/creategroup",authenticateUser,createGroup)
create_router.post("/createcategory",authenticateUser,createCategory)
create_router.post(
  "/createsubcategory", 
  authenticateUser, 
  createSubCategory
);
create_router.post("/createexpense",authenticateUser,createExpense)