document.addEventListener('DOMContentLoaded', function () {
    let timer;
    let remainingTime = 0;
    let isRunning = false;

    const startButton = document.getElementById('start-timer');
    const resetButton = document.getElementById('reset-timer');
    const countdownDisplay = document.getElementById('countdown');

    startButton.addEventListener('click', function () {
        if (!isRunning) {
            let minutes = parseInt(document.getElementById('minutes').value) || 0;
            let seconds = parseInt(document.getElementById('seconds').value) || 0;

            if (remainingTime === 0) {
                remainingTime = minutes * 60 + seconds;
            }

            startCountdown();
        } else {
            pauseCountdown();
        }
    });

    resetButton.addEventListener('click', function () {
        resetCountdown();
    });

    function startCountdown() {
        isRunning = true;
        startButton.textContent = "Pauza";
        resetButton.disabled = false;

        timer = setInterval(function () {
            if (remainingTime <= 0) {
                clearInterval(timer);
                alert("Czas minął!");
                resetCountdown();
                return;
            }
            remainingTime--;
            updateCountdownDisplay();
        }, 1000);
    }

    function pauseCountdown() {
        clearInterval(timer);
        isRunning = false;
        startButton.textContent = "Start";
    }

    function resetCountdown() {
        clearInterval(timer);
        remainingTime = 0;
        isRunning = false;
        startButton.textContent = "Start";
        resetButton.disabled = true;
        updateCountdownDisplay();
    }

    function updateCountdownDisplay() {
        let min = Math.floor(remainingTime / 60);
        let sec = remainingTime % 60;
        countdownDisplay.textContent =
            String(min).padStart(2, '0') + ":" + String(sec).padStart(2, '0');
    }

    updateCountdownDisplay(); // Wyświetlamy domyślną wartość
});
