import { readdir } from "fs";
import { join } from "path";

export const getFilesPathsFromFolderPath = async (folderPath: string): Promise<string[]> =>
    new Promise((resolve, reject) =>
        readdir(folderPath, (error, files) => {
            error
                ? reject(error)
                : resolve(files.filter((file) => !file.startsWith(".")).map((file) => join(folderPath, file)));
        }),
    );
