document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.video-list li a');
    const videoPlayer = document.getElementById('videoPlayer');
    const videoSource = document.getElementById('videoSource');

    links.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const videoUrl = this.href;
            videoSource.src = videoUrl;
            videoPlayer.load();
            videoPlayer.play();
        });
    });
});
