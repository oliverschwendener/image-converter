import { ConversionOptions } from "./ConversionOptions";
import { convertImage } from "./convertImage";
import { ensureFolderExists } from "./ensureFolderExists";
import { getFilesPathsFromFolderPath } from "./getFilesPathsFromFolderPath";
import { getDestinationFilePathFromSourceFilePath } from "./getDestinationFilePathFromSourceFilePath";
import { handleConversionPromiseResults } from "./handleConversionPromiseResults";

export const convertImages = async ({
    sourceFolderPath,
    destinationFolderPath,
    fitInto,
}: ConversionOptions): Promise<void> => {
    await ensureFolderExists(destinationFolderPath);

    const sourceFilePaths = await getFilesPathsFromFolderPath(sourceFolderPath);

    const promises = sourceFilePaths.map((sourceFilePath) =>
        convertImage({
            sourceFilePath,
            destinationFilePath: getDestinationFilePathFromSourceFilePath(sourceFilePath, destinationFolderPath),
            fitInto,
        }),
    );

    const promiseResults = await Promise.allSettled(promises);

    handleConversionPromiseResults(promiseResults);
};
