function selectColor(color) {
        const colorInput = document.getElementById('color');
        colorInput.value = color;

        // Clear previous selection
        document.querySelectorAll('.color-option').forEach(el => el.classList.remove('selected'));

        // Highlight selected color
        document.querySelector(`.color-option[style*='background-color: ${color}']`).classList.add('selected');

        // Change button color on hover
        const addNoteButton = document.getElementById('add-note-button');
        addNoteButton.style.setProperty('--button-hover-color', color);
    }

    // JavaScript: Przełączanie widoczności treści notatki
    function toggleContent(noteIndex) {
        const content = document.getElementById(`content-${noteIndex}`);
        const title = document.getElementById(`title-${noteIndex}`);
        const isContentVisible = content.style.display === 'block';

        // Zmieniamy widoczność treści
        content.style.display = isContentVisible ? 'none' : 'block';

        // Zmieniamy kolor tytułu po rozwinięciu
        title.style.color = isContentVisible ? '' : 'var(--highlight-color)';
    }

    // JavaScript: Usuwanie notatki
    function deleteNote(noteIndex) {
        fetch(`/notes/delete_note/${noteIndex}`, {
            method: 'POST'
        })
            .then(() => {
                window.location.reload();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    function downloadNoteAsJpg(index) {
        const noteElement = document.getElementById(`note-${index}`);
        html2canvas(noteElement).then(canvas => {
            const link = document.createElement('a');
            link.download = `notatka-${index}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.8);  // 0.8 to jakość obrazu (80%)
            link.click();
        });

    }