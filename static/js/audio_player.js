document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.audio-list li a');
    const audioPlayer = document.getElementById('audioPlayer');
    const audioSource = document.getElementById('audioSource');
    const nowPlaying = document.getElementById('nowPlaying');
    const audioGif = document.getElementById('audioGif');

    const playingGif = "/static/img/audio.gif";
    const pausedImage = "/static/img/pause_img.jpg";

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const audioUrl = this.href;
            const filename = this.textContent;

            audioSource.src = audioUrl;
            audioPlayer.load();
            audioGif.style.display = "block"; // <- pojawia się dopiero po kliknięciu
            audioPlayer.play();

            nowPlaying.textContent = "Teraz gra: " + filename;
        });
    });

    audioPlayer.addEventListener('play', () => {
        audioGif.src = playingGif;
    });

    audioPlayer.addEventListener('pause', () => {
        audioGif.src = pausedImage;
    });

    audioPlayer.addEventListener('ended', () => {
        audioGif.src = pausedImage;
    });
});
