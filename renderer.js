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
