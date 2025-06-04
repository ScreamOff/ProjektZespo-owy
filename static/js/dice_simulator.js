document.addEventListener('DOMContentLoaded', function () {
    const rollBtn = document.getElementById('roll-btn');
    const diceTypeSelect = document.getElementById('dice-type');
    const diceCountInput = document.getElementById('dice-count');
    const diceResults = document.getElementById('dice-results');
    const historyBody = document.getElementById('history-body');
    const diceSound = document.getElementById('dice-sound'); // dodane
    const coinSound = document.getElementById('coin-sound');

    let rollNumber = 1;

    rollBtn.addEventListener('click', () => {
        const diceTypeValue = diceTypeSelect.value;
        const diceCount = parseInt(diceCountInput.value);

        if (diceCount < 1 || diceCount > 6) {
            alert("Liczba kości musi być między 1 a 6");
            return;
        }

        // Odtwarzanie dźwięku
        if (coinSound && diceTypeValue === "coin") {
            coinSound.currentTime = 0;
            coinSound.play().catch(err => console.error("Błąd odtwarzania dźwięku:", err));
        }
        else if (diceSound) {
            diceSound.currentTime = 0;
            diceSound.play().catch(err => console.error("Błąd odtwarzania dźwięku:", err));
        }

        const results = [];

        diceResults.innerHTML = '';

    for (let i = 0; i < diceCount; i++) {
        let result, diceDiv;

        if (diceTypeValue === 'coin') {
            result = Math.random() < 0.5 ? 'Orzeł' : 'Reszka';
            diceDiv = document.createElement('div');
            diceDiv.classList.add('dice', 'coin');
            diceDiv.textContent = result;
        } else {
            const diceType = parseInt(diceTypeValue);
            result = Math.floor(Math.random() * diceType) + 1;
            diceDiv = document.createElement('div');
            diceDiv.classList.add('dice', `d${diceType}`);
            diceDiv.textContent = result;
        }

        results.push(result);
        diceResults.appendChild(diceDiv);
    }

    const numericType = diceTypeValue === 'coin' ? 'Moneta' : `D${diceTypeValue}`;
    addToHistory(rollNumber++, numericType, diceCount, results);
});

    function addToHistory(number, type, count, results) {
        const row = document.createElement('tr');

        const cellNum = document.createElement('td');
        cellNum.textContent = number;
        row.appendChild(cellNum);

        const cellType = document.createElement('td');
        cellType.textContent = `D${type}`;
        row.appendChild(cellType);

        const cellCount = document.createElement('td');
        cellCount.textContent = count;
        row.appendChild(cellCount);

        const cellResults = document.createElement('td');
        cellResults.textContent = results.join(', ');
        row.appendChild(cellResults);

        historyBody.prepend(row);
    }
});
