const soundsPlayer = document.querySelectorAll(".sound");
const soundsDJ = document.querySelectorAll(".sound");
const soundsAmbiance = document.querySelectorAll(".ambiance-sound");
const notes = Array.from(document.querySelectorAll(".note"));
const notesCols = Array.from(document.querySelectorAll(".notes-col"));
const startOrListenButton = document.getElementById('start-or-listen-button');

let partitionsToPickFrom = easyPartitions;
let musicPlaying;
let playerScore = 0;
let roundNb = 0;
let roundIsStarted = false;
let userMusicIsPlaying = false;
let tempo = partitionsToPickFrom[roundNb].tempo; 
let timeoutTempo = 60000 / (tempo * 2);

let partitionDJ = partitionsToPickFrom[roundNb].notes;
let roundDifficulty = partitionsToPickFrom[roundNb].difficulty;
let currentScore = 0;
const feedbackZone = document.getElementById('feedback-zone');
const userMusicControls = document.getElementById('button-play-div');