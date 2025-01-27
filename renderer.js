let minutes = 25;
let seconds = 0;
let timerInterval;
let isRunning = false;

const progressBar = document.querySelector('.progress-bar');
const timerText = document.getElementById('timer-text'); // Timer text element
const toggleButton = document.getElementById('toggle');
const resetButton = document.getElementById('reset');

// Set initial opacity value explicitly
timerText.style.opacity = '1';

// Function to toggle timer visibility
timerText.addEventListener('click', () => {
    if (timerText.style.opacity === '1') {
        timerText.style.opacity = '0'; // Hide timer
    } else {
        timerText.style.opacity = '1'; // Show timer
    }
});

function updateProgressBar() {
    const totalSeconds = 25 * 60; // Total time in seconds (25 minutes)
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const percentage = (elapsedSeconds / totalSeconds) * 100;
    progressBar.style.background = `conic-gradient(
        #1f7073 ${percentage.toFixed(2)}%, 
        #333333 ${percentage.toFixed(2)}% 100%
    )`; /* Smooth gradient fill */
}

function updateDisplay() {
    timerText.textContent = `${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`;
    updateProgressBar();
}

function startTimer() {
    if (!timerInterval) {
        timerInterval = setInterval(() => {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;

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
        toggleButton.innerHTML = '<i class="fas fa-play"></i>'; // Icon-only
    } else {
        startTimer();
        toggleButton.innerHTML = '<i class="fas fa-pause"></i>'; // Icon-only
    }
    isRunning = !isRunning;
});

resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
    minutes = 25;
    seconds = 0;
    toggleButton.innerHTML = '<i class="fas fa-play"></i>'; // Icon-only
    updateDisplay();
});

updateDisplay();
