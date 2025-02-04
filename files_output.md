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
    background: transparent !important; /* Ensure full transparency */
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
    
    /* Ensure full transparency inside the ring */
    mask: radial-gradient(circle, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 1) 43%);
    -webkit-mask: radial-gradient(circle, rgba(0, 0, 0, 0) 42%, rgba(0, 0, 0, 1) 43%);
}

/* Inner hole for the progress bar (force transparency) */
.progress-bar::after {
    content: '';
    width: 100px; /* Creates a fully transparent inner hole */
    height: 100px;
    background: transparent !important; /* Ensure complete transparency */
    position: absolute;
    border-radius: 50%;
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
