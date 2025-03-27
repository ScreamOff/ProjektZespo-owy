document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.thumbnail');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const close = document.querySelector('.close');

    // Zmienna przechowująca aktualny poziom powiększenia
    let scale = 1;
    let currentIndex = -1; // Indeks obecnie wyświetlanego obrazu

    // Kliknięcie na miniaturę obrazu
    images.forEach((img, index) => {
        img.addEventListener('click', function () {
            lightbox.classList.add('visible');  // Pokazuje lightbox
            lightboxImg.src = this.src; // Ustawia obrazek w lightboxie
            currentIndex = index; // Ustawia indeks bieżącego obrazu
            scale = 1; // Resetuje skalowanie
            lightboxImg.style.transform = `scale(${scale})`; // Resetuje transformację
            lightboxImg.style.transition = 'transform 0.2s ease'; // Płynne przejście
        });
    });

    // Kliknięcie w przycisk zamknięcia
    close.addEventListener('click', function () {
        lightbox.classList.remove('visible');  // Ukrywa lightbox
    });

    // Kliknięcie na obszar poza obrazem, aby zamknąć lightbox
    lightbox.addEventListener('click', function (event) {
        if (event.target !== lightboxImg) {
            lightbox.classList.remove('visible');  // Ukrywa lightbox
        }
    });

    // Funkcja powiększania obrazu za pomocą scrolla
    lightboxImg.addEventListener('wheel', function (event) {
        event.preventDefault();  // Zatrzymuje domyślne zachowanie scrolla (np. przewijanie strony)

        const zoomFactor = 0.1;  // Szybkość powiększania

        // Zwiększenie lub zmniejszenie skali na podstawie kierunku scrolla
        if (event.deltaY < 0) {
            scale += zoomFactor;  // Powiększanie
        } else {
            scale -= zoomFactor;  // Zmniejszanie
        }

        // Ograniczenie powiększenia, aby obraz nie stał się zbyt duży ani zbyt mały
        scale = Math.min(Math.max(scale, 1), 3);  // Zakres od 1x do 3x

        // Zastosowanie skalowania
        lightboxImg.style.transform = `scale(${scale})`;
    });

    // Przewijanie obrazów za pomocą strzałek w lewo i w prawo
    document.addEventListener('keydown', function (event) {
        if (lightbox.classList.contains('visible')) {
            if (event.key === 'ArrowRight') {
                // Strzałka w prawo
                currentIndex = (currentIndex + 1) % images.length; // Przechodzi do następnego obrazu
            } else if (event.key === 'ArrowLeft') {
                // Strzałka w lewo
                currentIndex = (currentIndex - 1 + images.length) % images.length; // Przechodzi do poprzedniego obrazu
            }

            // Zmieniamy obraz w lightboxie
            lightboxImg.src = images[currentIndex].src;
        }
    });
});
