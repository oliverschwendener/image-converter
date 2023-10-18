import type { ConversionOptions } from "@common/ConversionOptions";
import { nativeImage } from "electron";
import type { FileConversionResult } from "./FileConversionResult";
import { fitImageSizeInto } from "./fitImageSizeInto";
import { writeBufferToFile } from "./writeBufferToFile";

export const convertImage = async ({
    sourceFilePath,
    destinationFilePath,
    shouldResize,
    quality,
    fitInto,
    format,
}: {
    sourceFilePath: string;
    destinationFilePath: string;
    shouldResize: boolean;
    quality: number;
    fitInto: number;
    format: ConversionOptions["format"];
}): Promise<FileConversionResult> => {
    let currentNativeImage = nativeImage.createFromPath(sourceFilePath);
    const aspectRatio = currentNativeImage.getAspectRatio();

    if (shouldResize) {
        currentNativeImage = currentNativeImage.resize({
            ...fitImageSizeInto({ aspectRatio, fitInto }),
            ...{ quality: "best" },
        });
    }

    if (quality < 0 || quality > 100) {
        console.error("Invalid quality provided: ${quality}. Using 100");
        quality = 100;
    }

    const buffer = format === "JPEG" ? currentNativeImage.toJPEG(quality) : currentNativeImage.toPNG();

    await writeBufferToFile(buffer, destinationFilePath);

    return { sourceFilePath, destinationFilePath };
};
