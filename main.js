const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    const { workArea } = screen.getPrimaryDisplay(); // Get screen dimensions
    const cornerX = workArea.x; // Top-left corner X coordinate
    const cornerY = workArea.y; // Top-left corner Y coordinate

    mainWindow = new BrowserWindow({
        width: 350,
        height: 250,
        resizable: false, // Disable resizing
        alwaysOnTop: true, // Keep window always on top
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js')
        }
    });

    // Position window to top-left corner of the screen
    mainWindow.setBounds({
        x: cornerX,
        y: cornerY,
        width: 350,
        height: 250
    });

    mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
