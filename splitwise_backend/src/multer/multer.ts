import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "node:url";
import type { Request } from "express";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req: Request, file, cb) {
    // Points to: your_project/public/images
    const dirPath = path.join(__dirname, "..", "public/images");
    cb(null, dirPath);
  },
    filename: function (req, file, cb) {
    // Append the original extension to the new filename
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

export const upload = multer({ storage: storage });
