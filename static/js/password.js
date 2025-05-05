    document.getElementById('generate-btn').addEventListener('click', async () => {
    const length = document.getElementById('length').value;
    const uppercase = document.getElementById('uppercase').checked;
    const lowercase = document.getElementById('lowercase').checked;
    const digits = document.getElementById('digits').checked;
    const special = document.getElementById('special').checked;

    const response = await fetch('/password_generator/generate-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ length, uppercase, lowercase, digits, special })
    });

    const resultSection = document.getElementById('result-section');
    const resultInput = document.getElementById('generated-password');
    const errorMessage = document.getElementById('error-message');

    if (response.ok) {
        const data = await response.json();
        resultInput.value = data.password;
        resultSection.style.display = 'flex';
        errorMessage.textContent = '';
    } else {
        const error = await response.json();
        errorMessage.textContent = error.error;
        resultSection.style.display = 'none';
    }
});

document.getElementById('copy-btn').addEventListener('click', () => {
    const passwordField = document.getElementById('generated-password');
    passwordField.select();
    document.execCommand('copy');
});
