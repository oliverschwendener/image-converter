import { ImageSize } from "./ImageSize";

export const fitImageSizeInto = ({ aspectRatio, fitInto }: { aspectRatio: number; fitInto: number }): ImageSize => {
    let width = fitInto;
    let height = fitInto;

    if (aspectRatio < 1) {
        width = fitInto * aspectRatio;
    }

    if (aspectRatio > 1) {
        height = fitInto / aspectRatio;
    }

    return {
        width: Math.round(width),
        height: Math.round(height),
    };
};
