import type { ConversionOptions } from "./ConversionOptions";
import type { SelectFolderResult } from "./SelectFolderResult";

export type ContextBridge = {
    onNativeThemeChanged: (callback: () => void) => void;
    themeShouldUseDarkColors: () => boolean;
    selectFolder: () => Promise<SelectFolderResult>;
    convertImages: (conversionOptions: ConversionOptions) => Promise<void>;
};
