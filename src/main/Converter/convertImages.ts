import type { ConversionOptions } from "@common/ConversionOptions";
import { convertImage } from "./convertImage";
import { ensureFolderExists } from "./ensureFolderExists";
import { getDestinationFilePathFromSourceFilePath } from "./getDestinationFilePathFromSourceFilePath";
import { getFilesPathsFromFolderPath } from "./getFilesPathsFromFolderPath";
import { handleConversionPromiseResults } from "./handleConversionPromiseResults";

export const convertImages = async ({
    sourceFolderPath,
    destinationFolderPath,
    shouldResize,
    quality,
    fitInto,
    format,
}: ConversionOptions): Promise<void> => {
    await ensureFolderExists(destinationFolderPath);

    const sourceFilePaths = await getFilesPathsFromFolderPath(sourceFolderPath);

    const promises = sourceFilePaths.map((sourceFilePath) =>
        convertImage({
            sourceFilePath,
            destinationFilePath: getDestinationFilePathFromSourceFilePath({
                sourceFilePath,
                destinationFolderPath,
                format,
            }),
            shouldResize,
            quality,
            fitInto,
            format,
        }),
    );

    const promiseResults = await Promise.allSettled(promises);

    handleConversionPromiseResults(promiseResults);
};
