function playSound(audioId) {
    var audio = document.getElementById(audioId);
    if (audio) {
        audio.play();
    } else {
        console.error("No audio element with id", audioId);
    }
}