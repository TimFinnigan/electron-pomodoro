// /Users/timfinnigan/Documents/GitHub/electron-pomodoro/renderer.js

let minutes = 25;
let seconds = 0;
let timerInterval;
let isRunning = false;

const progressFill = document.querySelector('.progress-fill');
const timerText = document.getElementById('timer-text');
const toggleButton = document.getElementById('toggle');
const resetButton = document.getElementById('reset');
const infoButton = document.getElementById('info-btn');  // Info button
const logContainer = document.getElementById('pomodoro-log'); // Log container
const logList = document.getElementById('log-list'); // Log list

timerText.style.opacity = '1';

// Toggle timer visibility
timerText.addEventListener('click', () => {
    timerText.style.opacity = timerText.style.opacity === '1' ? '0' : '1';
});

function updateProgressBar() {
    const totalSeconds = 25 * 60;
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const percentage = (elapsedSeconds / totalSeconds) * 100;

    progressFill.style.background = `conic-gradient(
        #1f7073 ${percentage.toFixed(2)}%, 
        #333333 ${percentage.toFixed(2)}% 100%
    )`;
}

function updateDisplay() {
    timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    updateProgressBar();
}

function logPomodoro() {
    const now = new Date();
    const timestamp = now.toLocaleString();

    let pomodoroHistory = JSON.parse(localStorage.getItem('pomodoroHistory')) || [];
    pomodoroHistory.unshift(timestamp); // Add new entry to the top
    localStorage.setItem('pomodoroHistory', JSON.stringify(pomodoroHistory));

    updateLogDisplay();
}

function updateLogDisplay() {
    logList.innerHTML = "";
    let pomodoroHistory = JSON.parse(localStorage.getItem('pomodoroHistory')) || [];

    pomodoroHistory.forEach(entry => {
        const listItem = document.createElement("li");
        listItem.textContent = entry;
        logList.appendChild(listItem);
    });
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;

                    toggleButton.style.display = 'none';

                    logPomodoro(); // Save completed session

                    const now = new Date();
                    let hours = now.getHours();
                    const minutes = now.getMinutes().toString().padStart(2, '0');
                    const amPm = hours >= 12 ? 'PM' : 'AM';
                    hours = hours % 12 || 12;

                    alert(`Pomodoro Complete!\nCurrent Time: ${hours}:${minutes} ${amPm}`);
                } else {
                    minutes--;
                    seconds = 59;
                }
            } else {
                seconds--;
            }
            updateDisplay();
        }, 1000);
    }
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

toggleButton.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
        toggleButton.innerHTML = '<i class="fas fa-play"></i>';
    } else {
        startTimer();
        toggleButton.innerHTML = '<i class="fas fa-pause"></i>';
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = true;
    minutes = 25;
    seconds = 0;
    toggleButton.innerHTML = '<i class="fas fa-pause"></i>';
    toggleButton.style.display = 'block';

    updateDisplay();
    startTimer();
});

// Toggle log visibility
infoButton.addEventListener('click', () => {
    logContainer.classList.toggle('visible');
});

updateDisplay();
updateLogDisplay();


---

// /Users/timfinnigan/Documents/GitHub/electron-pomodoro/index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pomodoro Timer</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="node_modules/@fortawesome/fontawesome-free/css/all.min.css">
</head>
<body>
  <div class="container" id="timer-container">
    <!-- Info Button -->
    <button id="info-btn"><i class="fas fa-info-circle"></i></button>  

    <div class="progress-bar">
      <div class="progress-fill"></div>
      <div class="timer-text" id="timer-text">25:00</div>
    </div>

    <div class="controls">
      <button id="toggle"><i class="fas fa-play"></i></button>
      <button id="reset"><i class="fas fa-redo"></i></button>
    </div>

    <!-- Pomodoro Log -->
    <div id="pomodoro-log">
      <h3>Completed</h3>
      <ul id="log-list"></ul>
    </div>
  </div>

  <script src="renderer.js"></script>
</body>
</html>


---

// /Users/timfinnigan/Documents/GitHub/electron-pomodoro/README.md

# Electron Pomodoro Timer

This is a lightweight and customizable **Pomodoro Timer** built using **Electron**, **HTML**, **CSS**, and **JavaScript**. The timer follows the Pomodoro Technique, where users work for a focused 25-minute session, followed by short breaks. This app is designed to always stay on top of your other applications, keeping your productivity in check!

---

## Features

- **25-Minute Pomodoro Timer**:
  - Displays a countdown from 25 minutes (or 1500 seconds).
  - Notifies the user when the timer completes.

- **Play, Pause, and Reset**:
  - Start or pause the timer with a toggle button.
  - Reset the timer to 25 minutes with a reset button.

- **Progress Bar**:
  - Visually represents the remaining time in the form of a circular progress bar.

- **Customizable Styling**:
  - Clean and modern interface styled with CSS, including drag-and-drop functionality for repositioning.

- **Electron Integration**:
  - The timer runs as a desktop app, staying always on top of other windows.
  - Non-resizable and focused user interface.

---

## Project Structure

```
/electron-pomodoro
├── renderer.js         # JavaScript for timer functionality
├── index.html          # HTML structure of the timer
├── main.js             # Electron's main process script
├── style.css           # CSS styles for the timer
├── .gitignore          # Git ignore file
├── package.json        # Node.js project metadata
├── package-lock.json   # Dependency lock file
└── file_summaries.json # Summaries of project files (generated by a script)
```

---

## Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/electron-pomodoro.git
   cd electron-pomodoro
   ```

2. **Install Dependencies**:
   Ensure you have **Node.js** and **npm** installed, then run:
   ```bash
   npm install
   ```

3. **Run the Application**:
   ```bash
   npm start
   ```

---

## Usage

1. Launch the application using `npm start` or by running the executable (if built).
2. Use the **Play/Pause** button to toggle the timer.
3. Use the **Reset** button to reset the timer to 25 minutes.
4. Watch the circular progress bar for a visual representation of the remaining time.
5. When the timer completes, an alert notifies you and displays the current time.

---

## File Descriptions

### 1. `renderer.js`
This file implements the core functionality of the Pomodoro Timer:
- **Timer Logic**:
  - Handles countdown logic for 25 minutes.
  - Pauses and resumes the timer when toggled.
  - Resets the timer when the reset button is clicked.
- **UI Interactions**:
  - Updates the progress bar to reflect remaining time.
  - Toggles the visibility of timer text when clicked.
- **Alert on Completion**:
  - Displays an alert notifying the user when the timer completes.

---

### 2. `index.html`
This file provides the basic structure of the Pomodoro Timer:
- Includes a **timer display**, **Play/Pause button**, and a **Reset button**.
- Links to the external CSS (`style.css`) and JavaScript (`renderer.js`).

---

### 3. `main.js`
This is the Electron **main process script**:
- Creates a desktop app window using Electron's `BrowserWindow` API.
- Configures the window to:
  - Be always on top.
  - Be non-resizable and non-fullscreenable.
  - Load the `index.html` file.
  - Quit the app when all windows are closed (except on macOS).

---

### 4. `style.css`
This file styles the timer and its elements:
- **Body**:
  - Full viewport height, flex layout, centered content.
- **Container**:
  - Semi-transparent black background with a shadow, draggable.
- **Progress Bar**:
  - Circular progress bar with gradient effects and a centered timer.
- **Timer Text**:
  - Bold, clickable, and positioned above the circular hole.
- **Buttons**:
  - Styled with gradients, hover effects, and responsive transitions.

---

## Customization

### Modify Timer Duration
To change the Pomodoro duration, update the timer initialization in `renderer.js`:
```javascript
const pomodoroTime = 1500; // Default: 25 minutes
```
Replace `1500` with the desired time in seconds (e.g., `1800` for 30 minutes).

### Style Customization
Edit `style.css` to update the theme, fonts, or button styles.

---

## Future Enhancements

- **Custom Timer Settings**:
  - Allow users to set custom durations for work sessions and breaks.
- **Break Notifications**:
  - Notify users when it’s time for a break or to resume work.
- **Statistics Tracking**:
  - Log completed Pomodoro sessions for productivity tracking.



---

// /Users/timfinnigan/Documents/GitHub/electron-pomodoro/main.js

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
        transparent: true, // Ensures transparency
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


---

// /Users/timfinnigan/Documents/GitHub/electron-pomodoro/style.css

/* Reset styles */
html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: transparent; /* Full transparency */
}

/* Timer container */
.container {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 15px;
    box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.8); /* Slight shadow for depth */
    background: rgba(18, 18, 18, 0.9); /* Slightly transparent black */
    padding: 20px;
    position: relative;
    transition: background 0.3s ease-in-out;
    -webkit-app-region: drag; /* Allow dragging */
}

/* Outer ring - static background */
.progress-bar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    position: relative;
    background: #333333; /* Static background color */
    display: flex;
    justify-content: center;
    align-items: center;
}

/* Progress fill - correctly masked */
.progress-fill {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    
    /* Conic-gradient for progress */
    background: conic-gradient(#1f7073 0%, #333333 0%);
    
    /* Clip to only appear inside the ring */
    mask: radial-gradient(circle, transparent 42%, black 43%);
    -webkit-mask: radial-gradient(circle, transparent 42%, black 43%);
}

/* Inner hole for the progress bar */
.progress-bar::after {
    content: '';
    width: 100px; /* Creates a transparent inner hole */
    height: 100px;
    background: rgba(18, 18, 18, 0.9); /* Matches the container background */
    border-radius: 50%;
    position: absolute;
    z-index: 2;
}

/* Timer text inside the progress bar */
.timer-text {
    font-size: 24px;
    font-weight: bold;
    color: #d1f0ef;
    position: absolute;
    z-index: 3; /* Ensure it's above the hole */
    opacity: 1; /* Visible by default */
    transition: opacity 0.3s ease-in-out;
    cursor: pointer; /* Indicate that the text is clickable */
    -webkit-app-region: no-drag; /* Make the timer text interactive */
}

/* Control buttons */
.controls {
    display: flex;
    gap: 15px;
    margin-top: 15px;
    -webkit-app-region: no-drag; /* Exclude controls from dragging */
}

/* Style for control buttons */
.controls button {
    font-size: 16px;
    background: #2e595b;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

/* Hover effect for control buttons */
.controls button:hover {
    transform: scale(1.1);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

/* Reset button gradient */
#reset {
    background: linear-gradient(45deg, #1f7073, #2e595b);
}

/* Reset button hover effect */
#reset:hover {
    background: linear-gradient(45deg, #3e8285, #2e595b);
}

/* Info Button */
#info-btn {
    position: absolute;
    top: 12px; /* Slightly adjusted margin */
    right: 12px;
    background: none;
    border: none;
    color: #1f7073; /* Matching theme color */
    font-size: 16px; /* Slightly smaller */
    cursor: pointer;
    transition: opacity 0.3s ease-in-out, transform 0.2s;
    -webkit-app-region: no-drag; /* Ensure it's clickable */
}

#info-btn:hover {
    opacity: 0.8;
    transform: scale(1.1);
    color: #3e8285; /* Subtle hover color matching theme */
}

/* Pomodoro Log */
#pomodoro-log {
    display: none;
    position: absolute;
    top: 50%; /* Adjusted to not take up the full screen */
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    max-height: 150px; /* Added max height */
    background: rgba(0, 0, 0, 0.9);
    border-radius: 10px;
    padding: 15px;
    color: white;
    font-size: 14px;
    overflow-y: auto; /* Enables scrolling */
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.7);
    z-index: 9999; /* Ensures it's always above the timer */
    -webkit-app-region: no-drag;
}

/* Make sure header is always visible */
#pomodoro-log h3 {
    text-align: center;
    margin-bottom: 5px;
    font-size: 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    padding-bottom: 5px;
    position: sticky;
    top: 0;
    background: rgba(0, 0, 0, 0.9);
}

/* Log List */
#log-list {
    list-style: none;
    padding: 0;
    margin: 0;
    max-height: 120px; /* Ensures only a few entries are shown at a time */
    overflow-y: auto; /* Enables scrolling */
}

/* Log List Items */
#log-list li {
    padding: 5px;
    font-size: 14px;
    color: #b8e0df;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    text-align: center;
}

/* Ensure the log stays above the timer */
#pomodoro-log.visible {
    display: block;
}


---
