const soundsPlayer = document.querySelectorAll(".sound");
const soundsDJ = document.querySelectorAll(".sound");
const notes = Array.from(document.querySelectorAll(".note"));
const notesCols = Array.from(document.querySelectorAll(".notesCol"));
let sectionsToPickFrom = sections;
let roundNb = 0;
let userMusicIsPlaying = false;
let tempo = sectionsToPickFrom[roundNb].tempo; 
let timeoutTempo = 60000 / (tempo * 2);

const userMusicControls = document.getElementById('playButton');


// GIVES AUDIO FOR THE NOTE PADS
window.addEventListener("load", () => {
    const pads = document.querySelectorAll(".noteName");
    pads.forEach((pad, index) => {
        pad.addEventListener("click", function () {
            soundsPlayer[index].currentTime = 0;
            soundsPlayer[index].play();
        });
    });
});

window.addEventListener("load", () => {
    notes.forEach(note => {
        note.addEventListener("click", function () {
            note.classList.toggle("highlighted");
            const rowsToggle = note.id.split("-")[1];
            const colsToggle = note.id.split("-")[2];
            sectionUser[rowsToggle][colsToggle] = !sectionUser[rowsToggle][colsToggle];
            if (userMusicIsPlaying === false) playUserMusic();

        });
    });
});

