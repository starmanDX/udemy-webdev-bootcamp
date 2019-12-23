let score = undefined;
let gameOver = false;

function addPoint() {
    if (!gameOver) {
        score.textContent = Number(score.textContent) + 1;
    }
    if (Number(score.textContent) === Number(playingTo.value)) {
        score.classList.add("winner");
        gameOver = true;
    }
}

function resetGame() {
    p1Score.classList.remove("winner");
    p1Score.textContent = "0";
    p2Score.classList.remove("winner");
    p2Score.textContent = "0";
    gameOver = false;
}

playingTo.addEventListener("change", function () {
    if (Number(playingTo.value) < 1) {
        playingToDisplay.textContent = 1;
        this.value = 1;
        resetGame();
    } else {
        playingToDisplay.textContent = this.value;
        resetGame();
    }
});

p1.addEventListener("click", function () {
    score = p1Score;
    addPoint();
});

p2.addEventListener("click", function () {
    score = p2Score;
    addPoint();
});

reset.addEventListener("click", function () {
    resetGame()
});