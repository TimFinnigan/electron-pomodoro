const { app, BrowserWindow, screen } = require("electron");
const path = require("path");

let mainWindow;

<<<<<<< HEAD
app.on('ready', () => {
    // Ensure the app appears in the Dock on macOS
    if (process.platform === 'darwin') {
        app.dock.show();
    }

    // Get the screen dimensions and calculate the position for the window
    const { workArea } = screen.getPrimaryDisplay();
    const cornerX = workArea.x + workArea.width - 300; // Adjust for top-right corner
    const cornerY = workArea.y; // Top-right corner Y coordinate
=======
app.on("ready", () => {
    const { workArea } = screen.getPrimaryDisplay();
    const cornerX = workArea.x + workArea.width - 200;
    const cornerY = workArea.y;
>>>>>>> develop

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

    // Set the window's position in the top-right corner
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

<<<<<<< HEAD
    // Load the HTML file for the app
    mainWindow.loadFile('index.html');
});

// Handle app closing behavior
app.on('window-all-closed', () => {
    // macOS-specific behavior: Keep the app running until the user quits explicitly
    if (process.platform !== 'darwin') {
=======
    mainWindow.loadFile("index.html");
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
>>>>>>> develop
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
