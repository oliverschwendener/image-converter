import { FileConversionResult } from "./FileConversionResult";

export const handleConversionPromiseResults = (promiseResults: PromiseSettledResult<FileConversionResult>[]) => {
    for (const promiseResult of promiseResults) {
        if (promiseResult.status === "fulfilled") {
            const { sourceFilePath, destinationFilePath } = promiseResult.value;
            console.log(`${sourceFilePath} successfully converted to ${destinationFilePath}`);
        }

        if (promiseResult.status === "rejected") {
            console.log(`Failed to convert: ${promiseResult.reason}`);
        }
    }
};
