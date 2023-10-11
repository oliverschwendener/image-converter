import { createFolder } from "./createFolder";
import { folderExists } from "./folderExists";

export const ensureFolderExists = async (folderPath: string): Promise<void> => {
    if (await folderExists(folderPath)) {
        return;
    }

    await createFolder(folderPath);
};
