const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    const { workArea } = screen.getPrimaryDisplay(); // Get screen dimensions
    const cornerX = workArea.x + workArea.width - 300; // Adjust for top-right corner
    const cornerY = workArea.y; // Top-right corner Y coordinate

    mainWindow = new BrowserWindow({
        width: 200,
        height: 300, // Increased height to accommodate the circular timer
        resizable: false,
        alwaysOnTop: true,
        transparent: true, // Makes the background transparent
        frame: false, // Hides the frame for a cleaner look
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js')
        }
    });

    // Position window to top-right corner of the screen
    mainWindow.setBounds({
        x: cornerX,
        y: cornerY,
        width: 200,
        height: 300
    });

    mainWindow.loadFile('index.html');
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
