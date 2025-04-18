const units = {
    length: {
        "m": 1,
        "km": 1000,
        "cm": 0.01,
        "mm": 0.001,
        "mile": 1609.34,
        "yard": 0.9144,
        "foot": 0.3048,
        "inch": 0.0254,
        "nautical mile": 1852
    },
    temperature: {
        "°C": [v => v, v => v],
        "°F": [v => (v - 32) * 5/9, v => v * 9/5 + 32],
        "K": [v => v - 273.15, v => v + 273.15]
    },
    mass: {
        "kg": 1,
        "g": 0.001,
        "mg": 0.000001,
        "ton": 1000,
        "lb": 0.453592,
        "oz": 0.0283495
    }
    ,
    volume: {
        ml: 0.001,
        l: 1,
        m3: 1000,
        tsp: 0.00492892,
        tbsp: 0.0147868,
        cup: 0.24,
        pt: 0.473176,
        qt: 0.946353,
        gal: 3.78541
    },
    speed: {
        mps: 1,
        kph: 3.6,
        mph: 2.23694,
        fps: 3.28084,
        knots: 1.94384
    },
    area: {
        sqmm: 0.000001,
        sqcm: 0.0001,
        sqm: 1,
        sqkm: 1000000,
        sqinch: 0.00064516,
        sqft: 0.092903,
        sqyd: 0.836127,
        acre: 4046.86,
        ha: 10000,
        sqmile: 2589988.11
    },
};

let currentCategory = 'length';

function selectCategory(category) {
    currentCategory = category;

    document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="selectCategory('${category}')"]`).classList.add('active');

    populateUnitOptions();
    convertUnits();
}

function populateUnitOptions() {
    const inputSelect = document.getElementById('input-unit');
    const outputSelect = document.getElementById('output-unit');

    inputSelect.innerHTML = '';
    outputSelect.innerHTML = '';

    const categoryUnits = Object.keys(units[currentCategory]);
    categoryUnits.forEach(unit => {
        const inputOption = new Option(unit, unit);
        const outputOption = new Option(unit, unit);
        inputSelect.add(inputOption);
        outputSelect.add(outputOption);
    });

    outputSelect.selectedIndex = 1;
}

function convertUnits() {
    const inputValue = parseFloat(document.getElementById('input-value').value);
    const inputUnit = document.getElementById('input-unit').value;
    const outputUnit = document.getElementById('output-unit').value;

    if (isNaN(inputValue)) {
        document.getElementById('output-value').value = '';
        document.getElementById('output-unit-label').innerText = '';
        return;
    }

    let convertedValue;

    if (currentCategory === 'temperature') {
        const toCelsius = units[currentCategory][inputUnit][0];
        const fromCelsius = units[currentCategory][outputUnit][1];
        convertedValue = fromCelsius(toCelsius(inputValue));
    } else {
        const inputRate = units[currentCategory][inputUnit];
        const outputRate = units[currentCategory][outputUnit];
        convertedValue = inputValue * inputRate / outputRate;
    }

    document.getElementById('output-value').value = convertedValue.toFixed(4);
    document.getElementById('output-unit-label').innerText = outputUnit;
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    selectCategory('length');
});
