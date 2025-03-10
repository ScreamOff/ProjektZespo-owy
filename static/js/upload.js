document.addEventListener('DOMContentLoaded', function () {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('file-input');
    const fileNameDisplay = document.getElementById('file-name');
    const uploadLabel = document.getElementById('upload-label');

    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.classList.add('dragover');
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.classList.remove('dragover');
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('dragover');
        const files = event.dataTransfer.files;
        fileInput.files = files; // Update the file input with dropped files
        handleFiles(files);
    });

    fileInput.addEventListener('change', () => {
        const files = fileInput.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        fileNameDisplay.innerHTML = files.length
    ? `<ul>${Array.from(files).map(file => `<li>${file.name}</li>`).join('')}</ul>`
    : 'Nie wybrano plików';

    }

});