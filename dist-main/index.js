"use strict";
const electron = require("electron");
const path = require("path");
(async () => {
  await electron.app.whenReady();
  const browserWindow = new electron.BrowserWindow({
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "..", "dist-preload", "index.js")
    }
  });
  electron.app.isPackaged ? browserWindow.loadFile(path.join(__dirname, "..", "dist-renderer", "index.html")) : browserWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
  electron.ipcMain.on("themeShouldUseDarkColors", (event) => event.returnValue = electron.nativeTheme.shouldUseDarkColors);
  electron.nativeTheme.addListener("updated", () => browserWindow.webContents.send("nativeThemeChanged"));
})();
//# sourceMappingURL=index.js.map
