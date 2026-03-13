import "dotenv/config";
import express from "express";
import { router } from "./router/auth.router.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { create_router } from "./router/create.router.js";
import { createFolderSync } from "./manageimages/createfolder.js";
import path from "node:path";
import { fileURLToPath } from "node:url";
const app = express();

const corsOptions = {
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
};

app.use(cors(corsOptions));

app.use(cookieParser());

app.use(express.json());

const dirPath = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), "."),
  "public/images",
);
app.use("/images", express.static(dirPath));

createFolderSync();

app.use("/user", router);
app.use("/create", create_router);
app.listen(5000, () => {
  console.log("server is runnig port 5000");
});
