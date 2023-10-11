import { describe, expect, it } from "vitest";
import { ImageSize } from "./ImageSize";
import { fitImageSizeInto } from "./fitImageSizeInto";

describe("ImageFitter", () => {
    const testFitImageSizeInto = ({
        aspectRatio,
        expected,
        fitInto,
    }: {
        aspectRatio: number;
        expected: ImageSize;
        fitInto: number;
    }) => {
        expect(fitImageSizeInto({ aspectRatio, fitInto })).toEqual(expected);
    };

    it("should return 800x800 when trying to fit a 1:1 image into 800", () =>
        testFitImageSizeInto({
            aspectRatio: 1 / 1,
            expected: {
                width: 800,
                height: 800,
            },
            fitInto: 800,
        }));

    it("should return 400x800 when trying to fit a 1:2 image into 800", () =>
        testFitImageSizeInto({
            aspectRatio: 1 / 2,
            expected: {
                width: 400,
                height: 800,
            },
            fitInto: 800,
        }));

    it("should return 800x400 when trying to fit a 2:1 image into 800", () =>
        testFitImageSizeInto({
            aspectRatio: 2 / 1,
            expected: {
                width: 800,
                height: 400,
            },
            fitInto: 800,
        }));

    it("should return 800x533 when trying to fit a 3:2 image into 800", () =>
        testFitImageSizeInto({
            aspectRatio: 3 / 2,
            expected: {
                width: 800,
                height: 533,
            },
            fitInto: 800,
        }));
});
