import { FileConversionResult } from "./FileConversionResult";

export const handleConversionPromiseResults = (promiseResults: PromiseSettledResult<FileConversionResult>[]) => {
    for (const promiseResult of promiseResults) {
        if (promiseResult.status === "fulfilled") {
            const { inFilePath, outFilePath } = promiseResult.value;
            console.log(`${inFilePath} successfully converted to ${outFilePath}`);
        }

        if (promiseResult.status === "rejected") {
            console.log(`Failed to convert: ${promiseResult.reason}`);
        }
    }
};
