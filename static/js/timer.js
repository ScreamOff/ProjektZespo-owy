let timer = 0;
let interval = null;
let isRunning = false;
const alarmSound = document.getElementById("alarm-sound");
const defaultTime = 0;  // Domyślny czas (10 min)

function updateDisplay() {
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    let timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

    document.getElementById("timer-display").innerText = timeString;
    document.title = ` ${timeString}`;
}

function addTime(seconds) {
    timer += seconds;
    updateDisplay();
}

function toggleTimer() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        document.getElementById("start-pause").innerText = "▶";
    } else {
        interval = setInterval(() => {
            if (timer > 0) {
                timer--;
                updateDisplay();
            } else {
                clearInterval(interval);
                isRunning = false;
                alarmSound.play();
            }
        }, 1000);
        isRunning = true;
        document.getElementById("start-pause").innerText = "⏸";
    }
}

function resetTimer() {
    clearInterval(interval);
    timer = defaultTime;
    isRunning = false;
    updateDisplay();
    document.getElementById("start-pause").innerText = "▶";
}

updateDisplay();
