let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStop');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapsList = document.getElementById('lapsList');

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);
    let milliseconds = Math.floor(time % 1000);

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');
    seconds = String(seconds).padStart(2, '0');
    milliseconds = String(milliseconds).padStart(3, '0');

    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function() {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        isRunning = true;
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.remove('start-btn');
        startStopBtn.classList.add('stop-btn');
    } else {
        clearInterval(timerInterval);
        isRunning = false;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop-btn');
        startStopBtn.classList.add('start-btn');
    }
}

function recordLap() {
    if (isRunning) {
        lapCount++;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formatTime(elapsedTime)}</span>
        `;
        lapsList.insertBefore(lapItem, lapsList.firstChild);
    }
}

function resetTimer() {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    lapCount = 0;
    updateDisplay();
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop-btn');
    startStopBtn.classList.add('start-btn');
    lapsList.innerHTML = '';
}

startStopBtn.addEventListener('click', startTimer);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', resetTimer);

[startStopBtn, lapBtn, resetBtn].forEach(btn => {
    btn.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});