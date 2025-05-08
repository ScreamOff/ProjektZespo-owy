document.addEventListener('DOMContentLoaded', () => {
    const testArea = document.getElementById('testArea');
    const resultText = document.getElementById('resultText');

    let startTime, timeout, waitingForClick = false, inTest = false;

    testArea.addEventListener('click', () => {
        if (!inTest) {
            // Start test
            resultText.textContent = '';
            testArea.className = 'waiting';
            testArea.textContent = 'Czekaj na zmianę koloru...';
            inTest = true;

            const delay = Math.random() * 3000 + 2000; // 2–5s

            timeout = setTimeout(() => {
                testArea.className = 'ready';
                testArea.textContent = 'Kliknij teraz!';
                startTime = Date.now();
                waitingForClick = true;
            }, delay);
        } else if (waitingForClick && testArea.classList.contains('ready')) {
            // Valid click
            const reactionTime = Date.now() - startTime;
            resultText.textContent = `Twój czas reakcji: ${reactionTime} ms`;
            testArea.className = 'waiting';
            testArea.textContent = 'Kliknij tutaj, aby spróbować ponownie.';
            waitingForClick = false;
            inTest = false;
        } else if (!waitingForClick && testArea.classList.contains('waiting')) {
            // Click too soon
            clearTimeout(timeout);
            testArea.className = 'tooSoon';
            testArea.textContent = 'Za wcześnie! Kliknij, aby spróbować ponownie.';
            resultText.textContent = '';
            inTest = false;
        }
    });
});
