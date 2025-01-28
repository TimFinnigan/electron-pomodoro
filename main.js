const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    const { workArea } = screen.getPrimaryDisplay();
    const cornerX = workArea.x + workArea.width - 200;
    const cornerY = workArea.y;

    mainWindow = new BrowserWindow({
        width: 200,
        height: 300,
        resizable: false,
        alwaysOnTop: true,
        transparent: true, // Ensures full transparency
        frame: false,
        hasShadow: false, // Prevents OS-level window shadow (mainly macOS)
        backgroundColor: "#00000000", // Ensures no white space/background
        webPreferences: {
            preload: path.join(__dirname, "renderer.js"),
        },
        fullscreenable: false,
    });

    mainWindow.setBounds({
        x: cornerX,
        y: cornerY,
        width: 200,
        height: 300,
    });

    // Ensure the window size exactly matches content dimensions
    mainWindow.once("ready-to-show", () => {
        mainWindow.setBounds({ x: cornerX, y: cornerY, width: 200, height: 300 });
    });

    mainWindow.loadFile("index.html");
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
