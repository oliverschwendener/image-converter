import type { ConversionOptions } from "@common/ConversionOptions";
import { join, parse } from "path";

export const getDestinationFilePathFromSourceFilePath = ({
    sourceFilePath,
    destinationFolderPath,
    format,
}: {
    sourceFilePath: string;
    destinationFolderPath: string;
    format: ConversionOptions["format"];
}): string => join(destinationFolderPath, `${parse(sourceFilePath).name}.${format.toLowerCase()}`);
