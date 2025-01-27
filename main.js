const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    const { workArea } = screen.getPrimaryDisplay(); // Get screen dimensions
    const cornerX = workArea.x + workArea.width - 300; // Adjust for top-right corner
    const cornerY = workArea.y; // Top-right corner Y coordinate

    mainWindow = new BrowserWindow({
        width: 200,
        height: 300,
        resizable: false,
        alwaysOnTop: true,
        transparent: true,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js')
        },
        fullscreenable: false, // Prevent fullscreen on double-click
    });

    mainWindow.setBounds({
        x: cornerX,
        y: cornerY,
        width: 200,
        height: 300
    });

    // Ensure the window stays on all virtual desktops
    mainWindow.setVisibleOnAllWorkspaces(true, {
        visibleOnFullScreen: true // Keep it visible even in fullscreen apps
    });

    mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
