const choices = ["rock", "paper", "scissors"];

const buttons = document.querySelectorAll(".btn button");
const playerImg = document.querySelector(".player img");
const computerImg = document.querySelector(".computer img");
const resultDisplay = document.getElementById("game-result");
const playerHearts = document.querySelectorAll("#player-hearts svg");
const computerHearts = document.querySelectorAll("#computer-hearts svg");

let playerLives = 3;
let computerLives = 3;

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return "It's a Tie!";
    } else if (
        (playerChoice === "rock" && computerChoice === "scissors") ||
        (playerChoice === "paper" && computerChoice === "rock") ||
        (playerChoice === "scissors" && computerChoice === "paper")
    ) {
        return "Player Wins!";
    } else {
        return "Computer Wins!";
    }
}

function updateHearts(loser) {
    if (loser === "player" && playerLives > 0) {
        playerLives--;
        const heartParts = playerHearts[playerLives].querySelectorAll("g");
        heartParts.forEach(part => part.setAttribute("fill", "#808080")); 
    } else if (loser === "computer" && computerLives > 0) {
        computerLives--;
        const heartParts = computerHearts[computerLives].querySelectorAll("g");
        heartParts.forEach(part => part.setAttribute("fill", "#808080")); 
    }
}

function resetGame() {
    if (playerLives === 0 || computerLives === 0) return; 

    playerImg.src = "image/rock.png";
    computerImg.src = "image/rock.png";
    resultDisplay.textContent = "Waiting for your move...";
    resultDisplay.classList.add("animated");
    resultDisplay.classList.remove("static");
}

function playGame(playerChoice) {
    if (playerLives === 0 || computerLives === 0) return; 

    const computerChoice = getComputerChoice();

    playerImg.classList.add("bouncing");
    computerImg.classList.add("bouncing-computer");

    resultDisplay.textContent = "Waiting for your move...";
    resultDisplay.classList.add("animated");
    resultDisplay.classList.remove("static");
    resultDisplay.style.color = "black";

    setTimeout(() => {
        playerImg.src = `image/${playerChoice}.png`;
        computerImg.src = `image/${computerChoice}.png`;

        playerImg.classList.remove("bouncing");
        computerImg.classList.remove("bouncing-computer");

        let result = determineWinner(playerChoice, computerChoice);
        resultDisplay.textContent = result;

        resultDisplay.classList.remove("animated");
        resultDisplay.classList.add("static");

        if (result === "Player Wins!") {
            resultDisplay.style.color = "#3d2c2e"; 
            updateHearts("computer");
        } else if (result === "Computer Wins!") {
            resultDisplay.style.color = "#2a2a2a"; 
            updateHearts("player");
        } else {
            resultDisplay.style.color = "#1c0d0d"; 
        }

        setTimeout(resetGame, 5000);
    }, 900);
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        if (playerLives > 0 && computerLives > 0) {
            const playerChoice = button.textContent.trim().toLowerCase();
            playGame(playerChoice);
        }
    });
});
