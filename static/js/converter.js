const unitOptions = {
    length: ['m', 'km', 'cm', 'mm'],
    mass: ['kg', 'g', 'mg', 't'],
    temperature: ['C', 'F', 'K'],
    time: ['s', 'min', 'h', 'd']
};

function updateUnits() {
    const category = document.getElementById('category').value;
    const units = unitOptions[category];
    const html = `
        <input type="number" name="value" required placeholder="Wartość">
        <select name="unit_from">
            ${units.map(unit => `<option value="${unit}">${unit}</option>`).join('')}
        </select>
        →
        <select name="unit_to">
            ${units.map(unit => `<option value="${unit}">${unit}</option>`).join('')}
        </select>
    `;
    document.getElementById('conversion-fields').innerHTML = html;
}

document.addEventListener('DOMContentLoaded', updateUnits);
