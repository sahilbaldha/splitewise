import * as fs from 'fs';
import * as path from 'path';
export const createFolderSync = (folderName) => {
    const dirPath = path.join(__dirname, folderName);
    console.log(dirPath);
    try {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Directory '${dirPath}' created successfully or already exists.`);
    }
    catch (error) {
        console.error(`Error creating directory: ${error.message}`);
    }
};
