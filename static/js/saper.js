document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const resetButton = document.getElementById('resetButton');
    const easyButton = document.getElementById('easyButton');
    const mediumButton = document.getElementById('mediumButton');
    const hardButton = document.getElementById('hardButton');
    const timerDisplay = document.getElementById('timer');
    const explosionSound = new Audio('/static/audio/saper.mp3');
    const cells = [];
    let isGameOver = false;
    let width, height, bombCount;
    let startTime, timerInterval;

    function createBoard() {
        clearInterval(timerInterval);
        startTimer();

        const bombPositions = new Set();
        while (bombPositions.size < bombCount) {
            bombPositions.add(Math.floor(Math.random() * width * height));
        }

        for (let i = 0; i < width * height; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('data-id', i);
            cell.setAttribute('data-bomb', bombPositions.has(i));
            board.appendChild(cell);
            cells.push(cell);

            cell.addEventListener('click', (e) => {
                if (cell.classList.contains('revealed')) {
                    revealAdjacentCellsIfFlagged(cell);
                } else {
                    revealCell(cell);
                }
            });

            cell.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                addFlag(cell);
            });
        }

        board.style.gridTemplateColumns = `repeat(${width}, 40px)`;
    }

    function resetGame() {
        isGameOver = false;
        cells.length = 0;
        board.innerHTML = '';
        clearInterval(timerInterval);
        timerDisplay.textContent = '0';
        createBoard();
    }

    function addFlag(cell) {
        if (isGameOver || cell.classList.contains('revealed')) return;
        cell.classList.toggle('flag');
        cell.textContent = cell.classList.contains('flag') ? '🚩' : '';
    }

    function revealCell(cell) {
        if (isGameOver || cell.classList.contains('revealed') || cell.classList.contains('flag')) return;
        cell.classList.add('revealed');

        const id = parseInt(cell.getAttribute('data-id'));
        const isBomb = cell.getAttribute('data-bomb') === 'true';

        if (isBomb) {
            cell.classList.add('bomb');
            cell.textContent = '💣';
            gameOver();
        } else {
            const bombsAround = countAdjacentBombs(id);
            if (bombsAround > 0) {
                cell.textContent = bombsAround;
            } else {
                getAdjacentCells(id).forEach(adj => revealCell(cells[adj]));
            }

            checkWin();
        }
    }

    function countAdjacentBombs(id) {
        return getAdjacentCells(id).filter(i => cells[i].getAttribute('data-bomb') === 'true').length;
    }

    function getAdjacentCells(id) {
        const adjacent = [];
        const x = id % width;
        const y = Math.floor(id / width);

        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                if (dx === 0 && dy === 0) continue;
                const nx = x + dx;
                const ny = y + dy;
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    adjacent.push(ny * width + nx);
                }
            }
        }

        return adjacent;
    }

    function revealAdjacentCellsIfFlagged(cell) {
        const id = parseInt(cell.getAttribute('data-id'));
        const bombsAround = countAdjacentBombs(id);
        const flaggedCount = getAdjacentCells(id).filter(i => cells[i].classList.contains('flag')).length;

        if (bombsAround === flaggedCount) {
            getAdjacentCells(id).forEach(adj => {
                const adjacentCell = cells[adj];
                if (!adjacentCell.classList.contains('revealed') && !adjacentCell.classList.contains('flag')) {
                    revealCell(adjacentCell);
                }
            });
        }
    }

    function gameOver() {
        isGameOver = true;
        clearInterval(timerInterval);
        explosionSound.play();
        cells.forEach(cell => {
            if (cell.getAttribute('data-bomb') === 'true') {
                cell.classList.add('bomb', 'revealed');
                cell.textContent = '💣';
            }
        });
        alert("💥 Game Over!");
    }

    function checkWin() {
        const totalSafe = width * height - bombCount;
        const revealed = cells.filter(c => c.classList.contains('revealed')).length;

        if (revealed === totalSafe) {
            clearInterval(timerInterval);
            const timeTaken = Math.floor((Date.now() - startTime) / 1000);
            alert("🎉 You won in " + timeTaken + " seconds!");
        }
    }

    function setDifficulty(level) {
        switch(level) {
            case 'easy':
                width = 8; height = 8; bombCount = 10; break;
            case 'medium':
                width = 12; height = 12; bombCount = 25; break;
            case 'hard':
                width = 16; height = 16; bombCount = 45; break;
        }
        resetGame();
    }

    function startTimer() {
        startTime = Date.now();
        timerInterval = setInterval(() => {
            const seconds = Math.floor((Date.now() - startTime) / 1000);
            timerDisplay.textContent = seconds;
        }, 1000);
    }

    easyButton.addEventListener('click', () => setDifficulty('easy'));
    mediumButton.addEventListener('click', () => setDifficulty('medium'));
    hardButton.addEventListener('click', () => setDifficulty('hard'));
    resetButton.addEventListener('click', resetGame);

    setDifficulty('easy');
});
