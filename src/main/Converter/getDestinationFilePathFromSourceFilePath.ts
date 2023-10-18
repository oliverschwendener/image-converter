import { join, parse } from "path";

export const getDestinationFilePathFromSourceFilePath = (inFilePath: string, destinationFolderPath: string): string =>
    join(destinationFolderPath, `${parse(inFilePath).name}.jpg`);
