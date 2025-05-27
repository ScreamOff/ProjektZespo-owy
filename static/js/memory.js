let cards = [];
let firstCard = null;
let lockBoard = false;
let score = 0;
let timer = 0;
let intervalId = null;

const tickSound = new Audio("/static/audio/tick.mp3");
const winSound = new Audio("/static/audio/win.mp3");
tickSound.volume = 0.3;
winSound.volume = 0.5;


const grid = document.getElementById("memoryGrid");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const finalTime = document.getElementById("finalTime");
const finalScore = document.getElementById("finalScore");
const gameOverScreen = document.getElementById("gameOver");

async function loadCards() {
    const res = await fetch("/memory/cards");
    const data = await res.json();
    if (Array.isArray(data)) {
        return data;
    } else {
        alert("Błąd ładowania kart.");
        return [];
    }
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function startTimer() {
    timer = 0;
    intervalId = setInterval(() => {
        timer++;
        timerDisplay.textContent = `${timer} s`;
        document.title = `${timer}s • Memory`;
    }, 1000);
}

function stopTimer() {
    clearInterval(intervalId);
    document.title = "Memory";
}

async function startGame() {
    const difficulty = parseInt(document.getElementById("difficulty").value);
    const availableCards = await loadCards();

    if (availableCards.length < difficulty) {
        alert("Za mało obrazków w folderze static/cards");
        return;
    }

    stopTimer();
    gameOverScreen.style.display = "none";
    grid.innerHTML = "";
    grid.className = "memory-grid";  // reset
    grid.classList.add(`grid-${difficulty}`);
    score = 0;
    scoreDisplay.textContent = score;

    let selected = shuffle(availableCards).slice(0, difficulty);
    let gameCards = shuffle([...selected, ...selected]);

    cards = gameCards.map((img, index) => {
        const card = document.createElement("div");
        card.className = "memory-card";
        card.dataset.name = img;
        card.dataset.index = index;

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front"></div>
                <div class="card-back">
                    <img src="/static/cards/${img}" alt="">
                </div>
            </div>
        `;

        card.addEventListener("click", onCardClick);
        grid.appendChild(card);
        return card;
    });

    startTimer();
}

function onCardClick(e) {
    const card = e.currentTarget;
    if (lockBoard || card.classList.contains("matched") || card === firstCard) return;

    card.classList.add("flipped");
    tickSound.currentTime = 0;
    tickSound.play();

    if (!firstCard) {
        firstCard = card;
        return;
    }

    lockBoard = true;

    const isMatch = firstCard.dataset.name === card.dataset.name;
    if (isMatch) {
        firstCard.classList.add("matched");
        card.classList.add("matched");
        score += 2;
        scoreDisplay.textContent = score;
        resetTurn();
        checkWin();
    } else {
        score -= 1;
        scoreDisplay.textContent = score;
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            card.classList.remove("flipped");
            resetTurn();
        }, 800);
    }
}


function resetTurn() {
    [firstCard, lockBoard] = [null, false];
}

function checkWin() {
    if (cards.every(card => card.classList.contains("matched"))) {
        stopTimer();
        winSound.play();

        finalTime.textContent = `${timer} s`;
        finalScore.textContent = score;
        gameOverScreen.style.display = "block";

        sendScore().then(() => {
            fetchAndDisplayScores();
        });
    }
}



async function sendScore() {
    const difficulty = document.getElementById("difficulty").value;
    const body = {
        time: timer,
        score: score,
        difficulty: difficulty
    };

    try {
        await fetch("/memory/score", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
    } catch (err) {
        console.error("Błąd przy zapisie wyniku:", err);
    }
}

async function fetchAndDisplayScores() {
    try {
        const res = await fetch("/memory/scores");
        const data = await res.json();

        const scoreList = document.getElementById("scoreList");
        const bestList = document.getElementById("bestList");
        if (!scoreList || !bestList) return;

        scoreList.innerHTML = "";
        bestList.innerHTML = "";


        //ostatnie gry
        data.slice(0, 5).forEach(score => {
             const item = document.createElement("div");
             item.className = "score-item";
             item.innerText = `Poziom: ${mapLevel(score.difficulty)} | Czas: ${score.time}s | Punkty: ${score.score}`;
             scoreList.appendChild(item);
        });


        //najlepsze wyniki
        const bestByLevel = { 4: null, 6: null, 8: null };
        data.forEach(score => {
            const d = parseInt(score.difficulty);
            if (!bestByLevel[d] || score.score > bestByLevel[d].score) {
                bestByLevel[d] = score;
            }
        });

        [8, 6, 4].forEach(level => {
            const score = bestByLevel[level];
            if (score) {
                const item = document.createElement("div");
                item.className = "score-item";
                item.innerText = `Poziom: ${mapLevel(level)} | Czas: ${score.time}s | Punkty: ${score.score}`;
                bestList.appendChild(item);
            }
        });
    } catch (err) {
        console.error("Nie udało się załadować wyników:", err);
    }
}

function mapLevel(level) {
    switch (parseInt(level)) {
        case 4: return "Łatwy";
        case 6: return "Średni";
        case 8: return "Trudny";
        default: return level;
    }
}

window.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayScores();
});


