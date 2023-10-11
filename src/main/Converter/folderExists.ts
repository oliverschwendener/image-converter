import { access } from "fs";

export const folderExists = async (folderPath: string): Promise<boolean> =>
    new Promise((resolve) => access(folderPath, (error) => (error ? resolve(false) : resolve(true))));
