let timer;
let elapsedTime = 0; // in milliseconds
let isRunning = false;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const lapBtn = document.getElementById("lap-btn");
const lapList = document.getElementById("lap-list");

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    const milliseconds = String(ms % 1000).padStart(3, "0");
    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateTime() {
    elapsedTime += 10;
    timeDisplay.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", () => {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTime, 10);
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

pauseBtn.addEventListener("click", () => {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    }
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    timeDisplay.textContent = "00:00:00.000";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapList.innerHTML = "";
});

lapBtn.addEventListener("click", () => {
    const lapTime = document.createElement("li");
    lapTime.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(elapsedTime)}`;
    lapList.appendChild(lapTime);
});
