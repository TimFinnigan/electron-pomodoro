let minutes = 25;
let seconds = 0;
let timerInterval;
let isRunning = false;

const progressBar = document.querySelector('.progress-bar');
const timerText = document.querySelector('.timer-text');
const toggleButton = document.getElementById('toggle');
const resetButton = document.getElementById('reset');

function updateProgressBar() {
    const totalSeconds = 25 * 60; // Total time in seconds (25 minutes)
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const percentage = (elapsedSeconds / totalSeconds) * 100;
    progressBar.style.background = `conic-gradient(
        #ff3e3e ${percentage}%, 
        #333333 ${percentage}% 100%
    )`;
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
    isRunning = false;
    minutes = 25;
    seconds = 0;
    toggleButton.innerHTML = '<i class="fas fa-play"></i>';
    updateDisplay();
});

updateDisplay();
