//FUNCTION FOR THE BEATS
playBeat = (soundsArr, sectionArr) => {
  sectionArr.forEach((s, i) => {
    if (s) {
      soundsArr[i].currentTime = 0;
      soundsArr[i].play();
    }
  });
}

playMusic = (soundsArr, section, tempo) => {
  let counter = 0;
  musicPlaying = setInterval(function () {
    playBeat(soundsArr, section[counter]);
    highlightCol(counter);
    counter++;
    if (counter === section.length) {
      counter = 0;
    }
  }, tempo);
}

playUserMusic = () => {
  userMusicIsPlaying = true;
  playMusic(soundsPlayer, sectionUser, timeoutTempo);
  if (document.contains(document.getElementById('btn-play'))) {
    removeButton('#btn-play');
    createStopButton();
  }
}

//FUNCTION FOR PLAY AND STOP BUTTON
createPlayButton = () => {
  let playButton = document.createElement('button');
  userMusicControls.appendChild(playButton);
  playButton.setAttribute('id', 'btn-play');
  playButton.setAttribute('class', 'btnControl');
  playButton.setAttribute('onclick', 'playUserMusic()');
  playButton.innerText = 'Play';
}

createStopButton = () => {
  let stopButton = document.createElement('button');
  userMusicControls.appendChild(stopButton);
  stopButton.setAttribute('id', 'btn-stop');
  stopButton.setAttribute('class', 'btnControl');
  stopButton.setAttribute('onclick', 'stopPlaying()');
  stopButton.innerText = 'Stop';
}

removeButton = (query) => {
  let buttonToRemove = document.querySelector(query);
  userMusicControls.removeChild(buttonToRemove);
}

stopPlaying = () => {
  clearInterval(musicPlaying);
  userMusicIsPlaying = false;
  if (document.contains(document.getElementById('btn-stop'))) {
    removeButton('#btn-stop');
    createPlayButton();
  }
}

// FUNCTION THAT HIGHLIGHTS THE NOTES COLUMN
highlightCol = (index) => {
  notesCols.forEach(col => col.classList.remove("notesColHighlighted"));
  notesCols[index].classList.add("notesColHighlighted");
}
