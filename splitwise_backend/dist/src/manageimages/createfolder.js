import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "node:url";
export const createFolderSync = () => {
    const __filename = fileURLToPath(import.meta.url);
    const dirPath = path.join(path.resolve(path.dirname(__filename), ".."), "public/images");
    try {
        fs.mkdirSync(dirPath, { recursive: true });
    }
    catch (error) {
        console.error(`Error creating directory: ${error.message}`);
    }
};
