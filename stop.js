let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesSpan = document.getElementById('minutes');
const secondsSpan = document.getElementById('seconds');
const millisecondsSpan = document.getElementById('milliseconds');
const lapsContainer = document.getElementById('laps');

function startStopwatch() {
    startTime = new Date().getTime();
    tInterval = setInterval(updateStopwatch, 10);
    startStopBtn.textContent = 'Stop';
    running = true;
}

function stopStopwatch() {
    clearInterval(tInterval);
    startStopBtn.textContent = 'Start';
    running = false;
}

function updateStopwatch() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);

    minutesSpan.textContent = (minutes < 10) ? "0" + minutes : minutes;
    secondsSpan.textContent = (seconds < 10) ? "0" + seconds : seconds;
    millisecondsSpan.textContent = (milliseconds < 10) ? "0" + milliseconds : milliseconds;
}

function lapTime() {
    if (running) {
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapCounter++}: ${minutesSpan.textContent}:${secondsSpan.textContent}:${millisecondsSpan.textContent}`;
        lapsContainer.appendChild(lapItem);
    }
}

function resetStopwatch() {
    clearInterval(tInterval);
    startStopBtn.textContent = 'Start';
    minutesSpan.textContent = '00';
    secondsSpan.textContent = '00';
    millisecondsSpan.textContent = '00';
    lapsContainer.innerHTML = '';
    running = false;
    lapCounter = 1;
}

startStopBtn.addEventListener('click', () => {
    if (!running) {
        startStopwatch();
    } else {
        stopStopwatch();
    }
});

lapBtn.addEventListener('click', lapTime);
resetBtn.addEventListener('click', resetStopwatch);
