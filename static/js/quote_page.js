document.addEventListener('DOMContentLoaded', function () {
    const quoteText = document.getElementById('quoteText');
    const quoteBox = document.getElementById('quoteBox');
    const newQuoteBtn = document.getElementById('newQuoteBtn');
    const infoMessage = document.createElement('p');
    const quoteDateElem = document.getElementById("quoteDate");

    infoMessage.id = 'infoMessage';
    infoMessage.style.marginTop = "10px";
    infoMessage.style.color = "LightSteelBlue";
    infoMessage.style.fontSize = "0.9rem";
    quoteBox.insertAdjacentElement('afterend', infoMessage);

    const storageKey = "quoteOfTheDay";
    const quoteDateKey = "quoteDate";

    function formatDate(date) {
        return date.toLocaleDateString('pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    function getTodayKey() {
        const d = new Date();
        return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    }

    function isTodayUsed() {
        const savedDate = localStorage.getItem(quoteDateKey);
        return savedDate === getTodayKey();
    }

    function setTodayUsed(quote) {
        localStorage.setItem(quoteDateKey, getTodayKey());
        localStorage.setItem(storageKey, quote);
    }

    function getSavedQuote() {
        return localStorage.getItem(storageKey);
    }

    function getMidnightTime() {
        const now = new Date();
        const midnight = new Date();
        midnight.setHours(24, 0, 0, 0);
        const diff = midnight - now;
        const h = Math.floor(diff / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        return `${h}h ${m}min`;
    }

    quoteBox.style.display = 'none';
    quoteDateElem.textContent = "";

    newQuoteBtn.addEventListener('click', async function () {
        if (isTodayUsed()) {
            const savedQuote = getSavedQuote();
            quoteText.textContent = `"${savedQuote}"`;
            quoteBox.style.display = 'block';
            quoteDateElem.textContent = "Cytat na " + formatDate(new Date());
            infoMessage.textContent = "Następny cytat możesz wylosować za: " + getMidnightTime();
            return;
        }
        //Aby przetestować wiele cytatów w ciągu jednego dnia wklej kod poniżej zamiast if (isTodayUsed)...}
        // --> pozwala losować cytat wiele razy w ciągu dnia
        // localStorage.removeItem("quoteOfTheDay");
        // localStorage.removeItem("quoteDate");


        try {
            const response = await fetch("/quote_page/quote/random");
            const data = await response.json();
            quoteText.textContent = `"${data.quote}"`;
            quoteBox.style.display = 'block';
            quoteDateElem.textContent = "Cytat na " + formatDate(new Date());
            infoMessage.textContent = "";
            setTodayUsed(data.quote);
        } catch (err) {
            infoMessage.textContent = "Ups! Coś poszło nie tak";
        }
    });
});
