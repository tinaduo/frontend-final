//FUNCTION FOR THE BEATS
playBeat = (soundsArr, partitionArr) => {
  partitionArr.forEach((s, i) => {
    if (s) {
      soundsArr[i].currentTime = 0;
      soundsArr[i].play();
    }
  });
}

playMusic = (soundsArr, partition, tempo) => {
  let counter = 0;
  musicPlaying = setInterval(function () {
    playBeat(soundsArr, partition[counter]);
    highlightCol(counter);
    counter++;
    if (counter === partition.length) {
      counter = 0;
      if (roundIsStarted) giveFeedbackToPlayer();
    }
  }, tempo);
}

playUserMusic = () => {
  userMusicIsPlaying = true;
  playMusic(soundsPlayer, partitionUser, timeoutTempo);
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
  playButton.setAttribute('class', 'btn-control');
  playButton.setAttribute('onclick', 'playUserMusic()');
  playButton.innerText = 'Play';
}

// creates a stop button
createStopButton = () => {
  let stopButton = document.createElement('button');
  userMusicControls.appendChild(stopButton);
  stopButton.setAttribute('id', 'btn-stop');
  stopButton.setAttribute('class', 'btn-control');
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
  notesCols.forEach(col => col.classList.remove("notes-col-highlighted"));
  notesCols[index].classList.add("notes-col-highlighted");
}




// BROKENNNNNNNN
createStartButton = () => {
  let startButton = document.createElement('button');
  startButton.setAttribute('onclick', 'playRound()');
  startButton.setAttribute('class', 'btn-control');
  startButton.setAttribute('id', 'btn-start-round');
  startButton.innerText = 'Start The Round';
  return startButton;
}

removeButton = (query) => {
  let buttonToRemove = document.querySelector(query);
  userMusicControls.removeChild(buttonToRemove);
}

removeStartButton = () => {
  let startButton = document.getElementById('btn-start-round');
  let timeSpan = document.getElementById('time-span');
  startOrListenButton.removeChild(startButton);
  createListenButton();
  return timeSpan;
}

listenToTheDJ = (measures) => {
  let listenButton = document.getElementById('listen-button');
  startOrListenButton.removeChild(listenButton)
  playDJ(soundsDJ, partitionDJ, timeoutTempo, measures);
  setTimeout(function () {
    if (!document.contains(document.getElementById('btn-start-round'))) createListenButton();
  }, timeoutTempo * measures);
}

playDJ = (soundsArr, partition, tempo, measures) => {
  let counter = 0;
  let countTimes = 0;
  stopPlaying();
  djPlaying = setInterval(function () {

    playBeat(soundsArr, partition[counter]);
    counter++;
    countTimes++;
    if (counter === partition.length) counter = 0;
    if (countTimes === measures) clearInterval(djPlaying);
  }, tempo);
}

playRound = () => {
  clearInterval(musicPlaying);
  moveToNextRound();
  clearFeedbackZone();
  roundIsStarted = true;
  let counter = partitionsToPickFrom[roundNb].time;
  let timeSpan = removeStartButton();
  listenToTheDJ(16);
  let roundPlaying = setInterval(function () {
    timeSpan.innerText = `Time: ${counter} sec`;
    counter--;
    if (counter === -1 || currentScore === 100) {
      clearInterval(roundPlaying);
      endCurrentRound(counter + 1);
    }
  }, 1000);
}

replaceListenWithStart = () => {
  const startButton = createStartButton();
  if (document.contains(document.getElementById('listen-button'))) {
    let listenButton = document.getElementById('listen-button');
    startOrListenButton.removeChild(listenButton);
  }
  startOrListenButton.appendChild(startButton);
}