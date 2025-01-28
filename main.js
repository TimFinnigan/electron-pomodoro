const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let mainWindow;

app.on("ready", () => {
    const { workArea } = screen.getPrimaryDisplay();
    
    // Adjustments: Keep app in top-right but with a slight offset
    const offset = 10; // Small spacing from the edges
    const cornerX = workArea.x + workArea.width - 200 - offset;
    const cornerY = workArea.y + offset; // Offset from top

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

    // Keep window on all virtual desktops
    mainWindow.setVisibleOnAllWorkspaces(true, {
        visibleOnFullScreen: true, // Keep it visible even in fullscreen apps
    });

    mainWindow.loadFile("index.html");
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
