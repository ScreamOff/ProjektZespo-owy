let lastResult = '';

function addCharacter(character) {
    document.getElementById('expression').value += character;
}

function clearExpression() {
    document.getElementById('expression').value = '';
    document.getElementById('result').textContent = '';
}

function calculateResult() {
    const expression = document.getElementById('expression').value;
    try {
        const result = eval(expression.replace(/Math.sqrt/g, 'Math.sqrt').replace(/Math.pow/g, 'Math.pow').replace(/Math.log10/g, 'Math.log10').replace(/Math.log/g, 'Math.log').replace(/Math.sin/g, 'Math.sin').replace(/Math.cos/g, 'Math.cos').replace(/Math.tan/g, 'Math.tan').replace(/Math.asin/g, 'Math.asin').replace(/Math.acos/g, 'Math.acos').replace(/Math.atan/g, 'Math.atan'));
        lastResult = result; // Save the result for 'ANS' button
        document.getElementById('result').textContent = result;
        document.getElementById('expression').value = '';
    } catch (error) {
        document.getElementById('result').textContent = 'Błąd';
    }
}

function useLastResult() {
    document.getElementById('expression').value += lastResult;
}