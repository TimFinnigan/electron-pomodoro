let minutes = 25;
let seconds = 0;
let timerInterval;
let isRunning = false;

const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const toggleButton = document.getElementById('toggle');
const resetButton = document.getElementById('reset');

function updateDisplay() {
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    alert('Pomodoro Complete!');
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
        toggleButton.innerHTML = '<i class="fas fa-play"></i>'; // Play icon
    } else {
        startTimer();
        toggleButton.innerHTML = '<i class="fas fa-pause"></i>'; // Pause icon
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    minutes = 25;
    seconds = 0;
    toggleButton.innerHTML = '<i class="fas fa-play"></i>'; // Reset to play icon
    updateDisplay();
});

updateDisplay();
