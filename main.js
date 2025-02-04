// main.js
const { app, BrowserWindow, screen, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    const { workArea } = screen.getPrimaryDisplay();
    
    const offset = 10;
    const cornerX = workArea.x + workArea.width - 200 - offset;
    const cornerY = workArea.y + offset;

    mainWindow = new BrowserWindow({
        width: 200,
        height: 300,
        resizable: false,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        hasShadow: false,
        backgroundColor: "#00000000",
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        fullscreenable: false,
    });

    mainWindow.loadFile("index.html");

    mainWindow.setBounds({
        x: cornerX,
        y: cornerY,
        width: 200,
        height: 300,
    });

    mainWindow.setVisibleOnAllWorkspaces(true, {
        visibleOnFullScreen: true,
    });
});

// Handle window movement
ipcMain.on('move-window', (event, { deltaX, deltaY }) => {
    if (mainWindow) {
        const bounds = mainWindow.getBounds();
        mainWindow.setBounds({
            x: bounds.x + deltaX,
            y: bounds.y + deltaY,
            width: bounds.width,
            height: bounds.height
        });
    }
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
