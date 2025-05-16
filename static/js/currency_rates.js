document.addEventListener('DOMContentLoaded', function () {
    const ratesTable = document.getElementById('rates-table');
    const effectiveDateElement = document.getElementById('effective-date');

    const fromSelect = document.getElementById('from-currency');
    const toSelect = document.getElementById('to-currency');
    const amountInput = document.getElementById('amount');
    const convertedAmount = document.getElementById('converted-amount');

    let currencyRates = {};

    fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Błąd podczas pobierania danych z NBP');
            }
            return response.json();
        })
        .then(data => {
            const table = data[0];
            const rates = table.rates;
            const effectiveDate = table.effectiveDate;

            // Dodaj PLN do kursów (jest bazową walutą)
            currencyRates['PLN'] = 1.0;

            // Przechowaj kursy
            rates.forEach(rate => {
                currencyRates[rate.code] = rate.mid;
            });

            // Ustaw datę publikacji
            if (effectiveDateElement) {
                effectiveDateElement.textContent = effectiveDate;
            }

            // Tabela kursów
            rates.forEach(rate => {
                const row = document.createElement('tr');

                const currencyCell = document.createElement('td');
                currencyCell.textContent = rate.currency;
                row.appendChild(currencyCell);

                const codeCell = document.createElement('td');
                codeCell.textContent = rate.code;
                row.appendChild(codeCell);

                const valueCell = document.createElement('td');
                valueCell.textContent = rate.mid.toFixed(4) + ' zł';
                row.appendChild(valueCell);

                ratesTable.appendChild(row);
            });

            // Wypełnij selecty walut
            populateCurrencySelects(Object.keys(currencyRates));

            // Przelicz na starcie
            convertCurrency();
        })
        .catch(error => {
            console.error('Wystąpił błąd:', error);
            const errorRow = document.createElement('tr');
            const errorCell = document.createElement('td');
            errorCell.setAttribute('colspan', '3');
            errorCell.textContent = 'Nie udało się pobrać danych z NBP.';
            errorRow.appendChild(errorCell);
            ratesTable.appendChild(errorRow);
        });

    function populateCurrencySelects(codes) {
        fromSelect.innerHTML = '';
        toSelect.innerHTML = '';

        codes.forEach(code => {
            const option1 = document.createElement('option');
            option1.value = code;
            option1.textContent = code;
            fromSelect.appendChild(option1);

            const option2 = document.createElement('option');
            option2.value = code;
            option2.textContent = code;
            toSelect.appendChild(option2);
        });

        // Domyślne wartości
        fromSelect.value = 'EUR';
        toSelect.value = 'PLN';
    }

    function convertCurrency() {
        const amount = parseFloat(amountInput.value);
        const from = fromSelect.value;
        const to = toSelect.value;

        if (isNaN(amount) || !currencyRates[from] || !currencyRates[to]) {
            convertedAmount.value = '';
            return;
        }

        const result = (amount * currencyRates[from]) / currencyRates[to];
        convertedAmount.value = result.toFixed(2) + ' ' + to.toLowerCase();
    }

    // Nasłuchiwanie zmian
    amountInput.addEventListener('input', convertCurrency);
    fromSelect.addEventListener('change', convertCurrency);
    toSelect.addEventListener('change', convertCurrency);
});
