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
  
  // plays the music and replaces by a stop button
  playUserMusic = () => {
    userMusicIsPlaying = true;
    playMusic(soundsPlayer, partitionUser, timeoutTempo);
    if (document.contains(document.getElementById('btn-play'))) {
      removeButton('#btn-play');
      createStopButton();
    }
  }

  // highlights the current playing bar
highlightCol = (index) => {
    notesCols.forEach(col => col.classList.remove("notes-col-highlighted"));
    notesCols[index].classList.add("notes-col-highlighted");
  }



  

