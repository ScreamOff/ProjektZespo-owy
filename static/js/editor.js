let gridWidth = 32;
let gridHeight = 32;

function createGrid(width, height) {
    gridWidth = width;
    gridHeight = height;

    const grid = document.getElementById('pixelGrid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${width}, 20px)`;
    grid.style.gridTemplateRows = `repeat(${height}, 20px)`;

    for (let i = 0; i < width * height; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');

       pixel.addEventListener('mousedown', (e) => {
    if (e.button === 0) {
        isMouseDown = true;
        pixel.style.backgroundColor = selectedColor;
        updatePreview();
    }
});

pixel.addEventListener('mouseover', () => {
    if (isMouseDown) {
        pixel.style.backgroundColor = selectedColor;
        updatePreview();
    }
});

        grid.appendChild(pixel);
    }
}

// Zatrzymywanie rysowania po puszczeniu przycisku myszy
document.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Obsługa przycisków palety kolorów
document.querySelectorAll('.color-option').forEach(button => {
    button.addEventListener('click', () => {
        selectedColor = button.dataset.color;
    });
});

// Obsługa wyboru własnego koloru
document.getElementById('customColorPicker').addEventListener('input', (e) => {
    selectedColor = e.target.value;
});

// Obsługa formularza zmiany rozmiaru siatki
document.getElementById('gridSizeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const width = parseInt(document.getElementById('gridWidth').value);
    const height = parseInt(document.getElementById('gridHeight').value);
    createGrid(width, height);
});

// Obsługa przycisku czyszczenia siatki
document.getElementById('clearGridButton').addEventListener('click', () => {
    document.querySelectorAll('.pixel').forEach(pixel => {
        pixel.style.backgroundColor = 'white';
    });
});

// Obsługa przycisku zapisu do PNG
document.getElementById('saveButton').addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = gridWidth;
    canvas.height = gridHeight;

    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach((pixel, index) => {
        const color = window.getComputedStyle(pixel).backgroundColor;
        const x = index % gridWidth;
        const y = Math.floor(index / gridWidth);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    });

    const link = document.createElement('a');
    link.download = 'pixel-art.png';
    link.href = canvas.toDataURL();
    link.click();
});

function updatePreview() {
    const previewCanvas = document.getElementById('previewCanvas');
    const ctx = previewCanvas.getContext('2d');
    previewCanvas.width = gridWidth;
    previewCanvas.height = gridHeight;

    const pixels = document.querySelectorAll('.pixel');

    pixels.forEach((pixel, index) => {
        const color = window.getComputedStyle(pixel).backgroundColor;
        const x = index % gridWidth;
        const y = Math.floor(index / gridWidth);
        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
    });
}


// Inicjalna siatka
createGrid(32, 32);
