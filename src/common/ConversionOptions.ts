export type ConversionOptions = {
    sourceFolderPath: string;
    destinationFolderPath: string;
    shouldResize: boolean;
    fitInto: number;
    quality: number;
    format: "JPEG" | "PNG";
};
