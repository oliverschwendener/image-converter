import { join, parse } from "path";

export const getDestinationFilePathFromSourceFilePath = ({
    sourceFilePath,
    destinationFolderPath,
    format,
}: {
    sourceFilePath: string;
    destinationFolderPath: string;
    format: "JPEG" | "PNG";
}): string => join(destinationFolderPath, `${parse(sourceFilePath).name}.${format.toLowerCase()}`);
