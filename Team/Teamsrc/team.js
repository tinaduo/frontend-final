document.addEventListener('DOMContentLoaded', function() {
    var clickableElements = document.querySelectorAll('.click-me');

    clickableElements.forEach(function(clickable) {
        clickable.addEventListener('click', function(event) {
            event.preventDefault();  
            var audio = this.nextElementSibling; 

            if (audio && audio.tagName === 'AUDIO') {
                if (audio.paused) {
                    console.log('Playing audio:', audio.src);
                    audio.play();
                } else {
                    console.log('Pausing audio:', audio.src);
                    audio.pause();
                }
            } else {
                console.error('Audio element not found or incorrect position');
            }
        });
    });
});
