let options = [];
let segmentColors = [];
let currentAngle = 0;
let spinning = false;
let resultEl = null;
let lastSegmentIndex = -1;
const history = [];

const tickSound = new Audio("/static/audio/tick.mp3");
const dingSound = new Audio("/static/audio/ding.mp3");
tickSound.volume = 0.3;
dingSound.volume = 0.5;

document.addEventListener("DOMContentLoaded", () => {
    resultEl = document.getElementById("resultDisplay");
    drawEmptyWheel();
});

function createWheel() {
    const input = document.getElementById("optionsInput").value;
    options = input.split(",").map(opt => opt.trim()).filter(opt => opt !== "");

    if (options.length < 2) {
        alert("Podaj co najmniej 2 opcje.");
        return;
    }

    currentAngle = 0;
    resultEl.textContent = "";
    segmentColors = options.map(() => getRandomColor());
    drawWheel();
}

function getRandomColor() {
    const colors = [
        "#e91e63", "#2196f3", "#4caf50", "#ff9800",
        "#9c27b0", "#f44336", "#3f51b5", "#00bcd4",
        "#795548", "#009688", "#ffc107", "#607d8b"
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

function drawEmptyWheel() {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#222";
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 200, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = "#888";
    ctx.font = "20px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Wpisz opcje i stwórz koło", canvas.width / 2, canvas.height / 2);
}

function drawWheel() {
    const canvas = document.getElementById("wheelCanvas");
    const ctx = canvas.getContext("2d");
    const numOptions = options.length;
    const arcSize = (2 * Math.PI) / numOptions;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numOptions; i++) {
        const angle = i * arcSize + currentAngle;

        ctx.fillStyle = segmentColors[i];
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, canvas.height / 2);
        ctx.arc(canvas.width / 2, canvas.height / 2, 200, angle, angle + arcSize);
        ctx.closePath();
        ctx.fill();

        ctx.strokeStyle = "#111";
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        ctx.rotate(angle + arcSize / 2);
        ctx.textAlign = "right";
        ctx.fillStyle = "#fff";
        ctx.font = "16px sans-serif";
        ctx.fillText(options[i], 190, 5);
        ctx.restore();
    }

    // Strzałka
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 10, 10);
    ctx.lineTo(canvas.width / 2 + 10, 10);
    ctx.lineTo(canvas.width / 2, 30);
    ctx.fill();
}

function spinWheel() {
    if (spinning || options.length < 2) return;

    spinning = true;
    resultEl.textContent = "";

    const spinTime = 6000;
    const finalRotation = Math.random() * 720 + 1440;
    const finalAngle = (finalRotation * Math.PI) / 180;
    let start = null;

    function animate(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const progress = Math.min(elapsed / spinTime, 1);
        const eased = easeInOutCubic(progress);
        currentAngle = eased * finalAngle;

        drawWheel();

        // Efekt kliknięcia na linii
        const arcSize = (2 * Math.PI) / options.length;
        const offset = Math.PI / 2;
        const normalizedAngle = (2 * Math.PI - ((currentAngle + offset) % (2 * Math.PI))) % (2 * Math.PI);
        const currentIndex = Math.floor(normalizedAngle / arcSize);

        if (currentIndex !== lastSegmentIndex) {
            tickSound.currentTime = 0;
            tickSound.play();
            lastSegmentIndex = currentIndex;
        }

        if (elapsed < spinTime) {
            requestAnimationFrame(animate);
        } else {
            spinning = false;
            showResult();
        }
    }

    requestAnimationFrame(animate);
}

function easeInOutCubic(t) {
    return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function showResult() {
    const numOptions = options.length;
    const arcSize = (2 * Math.PI) / numOptions;
    const offset = Math.PI / 2;
    const normalizedAngle = (2 * Math.PI - ((currentAngle + offset) % (2 * Math.PI))) % (2 * Math.PI);
    const index = Math.floor(normalizedAngle / arcSize);
    const result = options[index];

    dingSound.play();
    resultEl.innerHTML = `<h3>Wylosowano: <span>${result}</span></h3>`;
    updateHistory(result);

    fetch("/wheel/save", {
         method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ result })
});

}

function updateHistory(result) {
    const max = 5;
    history.unshift(result);
    if (history.length > max) history.pop();

    const historyList = document.getElementById("historyList");
    if (historyList) {
        historyList.innerHTML = `<h4>Ostatnie losy:</h4><ul>` +
            history.map(r => `<li>${r}</li>`).join("") +
            `</ul>`;
    }
}
