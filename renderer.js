let minutes = 25;
let seconds = 0;
let timerInterval;
let isRunning = false;

const progressFill = document.querySelector('.progress-fill'); // Progress fill element
const timerText = document.getElementById('timer-text'); // Timer text element
const toggleButton = document.getElementById('toggle'); // Play/Pause button
const resetButton = document.getElementById('reset'); // Reset button

// Set initial opacity value explicitly
timerText.style.opacity = '1';

// Function to toggle timer visibility
timerText.addEventListener('click', () => {
    timerText.style.opacity = timerText.style.opacity === '1' ? '0' : '1';
});

function updateProgressBar() {
    const totalSeconds = 25 * 60; // Total time in seconds (25 minutes)
    const elapsedSeconds = totalSeconds - (minutes * 60 + seconds);
    const percentage = (elapsedSeconds / totalSeconds) * 100;
    
    // Update the progress fill
    progressFill.style.background = `conic-gradient(
        #1f7073 ${percentage.toFixed(2)}%, 
        #333333 ${percentage.toFixed(2)}% 100%
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

                    // Hide play/pause button when timer completes
                    toggleButton.style.display = 'none';

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

// Toggle play/pause button
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

// Reset button event listener (Auto-starts timer)
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = true; // Set to running immediately
    minutes = 25;
    seconds = 0;
    toggleButton.innerHTML = '<i class="fas fa-pause"></i>'; // Start immediately, so show "pause" icon
    
    // Show play/pause button again when reset
    toggleButton.style.display = 'block';

    updateDisplay();
    startTimer(); // Auto-start the timer
});

updateDisplay();
