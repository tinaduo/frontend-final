document.addEventListener(
    "DOMContentLoaded", function () {
        const holes = document.querySelectorAll(".hole");
        const startButton = document.getElementById("startButton");
        const endButton = document.getElementById("endButton");
        const scoreDisplay = document.getElementById("score");
        const timerDisplay = document.getElementById("timer");

        let timer;
        let score = 0;
        let countdown;
        let moleInterval;

        // initial state to game over
        let gameOver = true;

        function comeout() {
            holes.forEach(hole => {
                hole.classList.remove('mole');
                hole.removeEventListener(
                    'click', handleMoleClick);
            });

            let random = holes[Math.floor(Math.random() * 9)];

            random.classList.add('mole');
            random.addEventListener('click', handleMoleClick);
        }

        function handleMoleClick() {
            if (!gameOver) {
                score++;
                scoreDisplay.textContent = `Score: ${score}`;
            }
            this.classList.remove('mole');
        }

        function startGame() {
            if (!gameOver) {
                // prevents starting game again if already in progress
                return;
            }

            gameOver = false;
            score = 0;
            scoreDisplay.textContent = `Score: ${score}`;
            timer = 15;
            timerDisplay.textContent = `Time: ${timer}s`;

            startButton.style.display = 'none';
            endButton.style.display = 'inline';

            countdown = setInterval(() => {
                timer--;
                timerDisplay.textContent = `Time: ${timer}s`;

                if (timer <= 0) {
                    clearInterval(countdown);
                    clearInterval(moleInterval);
                    gameOver = true;
                    alert(`Game Over!\nYour final score: ${score}`);
                    startButton.style.display = 'inline';
                    endButton.style.display = 'none';
                } else if (timer <= 5) {
                    clearInterval(moleInterval);
                    moleInterval = setInterval(() => {
                        if (!gameOver) comeout();
                    }, 400);
                }
            }, 1000);

            moleInterval = setInterval(() => {
                if (!gameOver) comeout();
            }, 1000);

            console.log("Game started");
        }

        function endGame() {
            clearInterval(countdown);
            clearInterval(moleInterval);
            gameOver = true;
            alert(`Game Ended!\nYour final score: ${score}`);
            score = 0;
            timer = 15;
            scoreDisplay.textContent = `Score: ${score}`;
            timerDisplay.textContent = `Time: ${timer}s`;
            startButton.style.display = 'inline';
            endButton.style.display = 'none';
        }

        startButton.addEventListener("click", startGame);
        endButton.addEventListener("click", endGame);
    });
