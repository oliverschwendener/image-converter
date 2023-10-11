import { join, parse } from "path";

export const getOutFilePathFromInFilePath = (inFilePath: string, destinationFolderPath: string): string =>
    join(destinationFolderPath, `${parse(inFilePath).name}.jpg`);
