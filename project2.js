// Selecting elements
let display = document.getElementById('display');
let startBtn = document.getElementById('start');
let pauseBtn = document.getElementById('pause');
let resetBtn = document.getElementById('reset');
let lapBtn = document.getElementById('lap');
let laps = document.getElementById('laps');

// Variables for time calculation
let startTime = 0;
let elapsedTime = 0;
let timerInterval;

// Format time in HH:MM:SS
function formatTime(ms) {
    let totalSeconds = Math.floor(ms / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Add leading zero if needed
function pad(unit) {
    return unit < 10 ? '0' + unit : unit;
}

// Start button click
startBtn.addEventListener('click', () => {
    if (!timerInterval) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 100);
    }
});

// Pause button click
pauseBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

// Reset button click
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = '';
});

// Lap button click
lapBtn.addEventListener('click', () => {
    if (elapsedTime > 0) {
        let li = document.createElement('li');
        li.textContent = formatTime(elapsedTime);
        laps.appendChild(li);
    }
});
