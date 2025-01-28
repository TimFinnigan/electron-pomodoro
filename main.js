const { app, BrowserWindow, screen } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
    // Ensure the app appears in the Dock on macOS
    if (process.platform === 'darwin') {
        app.dock.show();
    }

    // Get the screen dimensions and calculate the position for the window
    const { workArea } = screen.getPrimaryDisplay();
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

    // Set the window's position in the top-right corner
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

    // Load the HTML file for the app
    mainWindow.loadFile('index.html');
});

// Handle app closing behavior
app.on('window-all-closed', () => {
    // macOS-specific behavior: Keep the app running until the user quits explicitly
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// macOS: Reopen the app when its dock icon is clicked, and there are no open windows
app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
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
            fullscreenable: false,
        });

        mainWindow.loadFile('index.html');
    }
});
