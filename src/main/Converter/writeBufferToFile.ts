import { writeFile } from "fs";

export const writeBufferToFile = async (buffer: Buffer, filePath: string): Promise<void> =>
    new Promise((resolve, reject) => writeFile(filePath, buffer, (error) => (error ? reject(error) : resolve())));
