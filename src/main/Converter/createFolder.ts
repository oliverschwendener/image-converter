import { mkdir } from "fs";

export const createFolder = async (folderPath: string): Promise<void> =>
    new Promise((resolve, reject) => mkdir(folderPath, (error) => (error ? reject(error) : resolve())));
