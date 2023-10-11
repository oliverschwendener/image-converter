import { ConversionOptions } from "./ConversionOptions";
import { convertImage } from "./convertImage";
import { ensureFolderExists } from "./ensureFolderExists";
import { getFilesPathsFromFolderPath } from "./getFilesPathsFromFolderPath";
import { getOutFilePathFromInFilePath } from "./getOutFilePathFromInFilePath";
import { handleConversionPromiseResults } from "./handleConversionPromiseResults";

export const convertImages = async ({
    sourceFolderPath,
    destinationFolderPath,
    fitInto,
}: ConversionOptions): Promise<void> => {
    await ensureFolderExists(destinationFolderPath);

    const inFilePaths = await getFilesPathsFromFolderPath(sourceFolderPath);

    const promises = inFilePaths.map((inFilePath) =>
        convertImage({
            inFilePath,
            outFilePath: getOutFilePathFromInFilePath(inFilePath, destinationFolderPath),
            fitInto,
        }),
    );

    const promiseResults = await Promise.allSettled(promises);

    handleConversionPromiseResults(promiseResults);
};
