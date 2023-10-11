import { nativeImage, type ResizeOptions } from "electron";
import type { FileConversionResult } from "./FileConversionResult";
import { fitImageSizeInto } from "./fitImageSizeInto";
import { writeBufferToFile } from "./writeBufferToFile";

export const convertImage = async ({
    inFilePath,
    outFilePath,
    fitInto,
}: {
    inFilePath: string;
    outFilePath: string;
    fitInto: number;
}): Promise<FileConversionResult> => {
    const currentNativeImage = nativeImage.createFromPath(inFilePath);
    const aspectRatio = currentNativeImage.getAspectRatio();

    const options: ResizeOptions = {
        ...fitImageSizeInto({ aspectRatio, fitInto }),
        ...{ quality: "best" },
    };

    await writeBufferToFile(currentNativeImage.resize(options).toJPEG(100), outFilePath);

    return { inFilePath, outFilePath };
};
