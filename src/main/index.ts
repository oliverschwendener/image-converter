import type { ConversionOptions } from "@common/ConversionOptions";
import type { SelectFolderResult } from "@common/SelectFolderResult";
import { BrowserWindow, app, dialog, ipcMain, nativeTheme, shell } from "electron";
import { join } from "path";
import { convertImages } from "./Converter";

(async () => {
    await app.whenReady();

    const browserWindow = new BrowserWindow({
        width: 350,
        height: 680,
        resizable: false,
        autoHideMenuBar: true,
        webPreferences: {
            preload: join(__dirname, "..", "dist-preload", "index.js"),
        },
    });

    app.isPackaged
        ? browserWindow.loadFile(join(__dirname, "..", "dist-renderer", "index.html"))
        : browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL);

    ipcMain.on("themeShouldUseDarkColors", (event) => (event.returnValue = nativeTheme.shouldUseDarkColors));

    ipcMain.handle("selectFolder", async (): Promise<SelectFolderResult> => {
        const { filePaths } = await dialog.showOpenDialog(browserWindow, { properties: ["openDirectory"] });

        return {
            folderPath: filePaths.length ? filePaths[0] : undefined,
        };
    });

    ipcMain.handle("convertImages", async (_, { conversionOptions }: { conversionOptions: ConversionOptions }) => {
        await convertImages(conversionOptions);

        if (conversionOptions.openFolderAfterConversion) {
            await shell.openPath(conversionOptions.destinationFolderPath);
        }
    });

    nativeTheme.addListener("updated", () => browserWindow.webContents.send("nativeThemeChanged"));
})();
