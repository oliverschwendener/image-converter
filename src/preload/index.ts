import type { ContextBridge } from "@common/ContextBridge";
import type { ConversionOptions } from "@common/ConversionOptions";
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("ContextBridge", <ContextBridge>{
    onNativeThemeChanged: (callback: () => void) => ipcRenderer.on("nativeThemeChanged", callback),
    themeShouldUseDarkColors: () => ipcRenderer.sendSync("themeShouldUseDarkColors"),
    selectFolder: () => ipcRenderer.invoke("selectFolder"),
    convertImages: (conversionOptions: ConversionOptions) => ipcRenderer.invoke("convertImages", { conversionOptions }),
});
