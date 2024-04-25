// Standings Div
const prevRoundSpan = document.querySelector("#prevRound");
const roundsSpan = document.querySelector("#round");
const userScoreSpan = document.querySelector("#userScore");
const computerScoreSpan =
    document.querySelector("#compScore");
const winsSpan = document.querySelector("#wins");
const lossesSpan = document.querySelector("#losses");
const drawsSpan = document.querySelector("#draws");

// Message for round results
const roundResults = (outcome, computerChoice) => {
    return outcome
        ? `You WON the computer chose ${computerChoice}`
        : outcome === false
        ? `You LOST the computer chose ${computerChoice}`
        : `Draw the computer chose ${computerChoice}`;
};

// Styling for round results
const updateStyle = (outcome) => {
    outcome
        ? (prevRoundSpan.style.color = "green")
        : outcome === false
        ? (prevRoundSpan.style.color = "crimson")
        : (prevRoundSpan.style.color = "black");
};

// Updates score
const updateText = () => {
    roundsSpan.textContent = round;
    userScoreSpan.textContent = userScore;
    computerScoreSpan.textContent = compScore;
    winsSpan.textContent = wins;
    lossesSpan.textContent = losses;
    drawsSpan.textContent = draws;
};

// Computer Logic
const choices = ["Rock", "Paper", "Scissors"];
const randomNumber = () => Math.floor(Math.random() * 3);
const getComputerChoice = () =>
    choices[randomNumber()].toLowerCase();

// Score
const MAX_POINTS = 5;
let userScore = 0,
    compScore = 0,
    round = 0,
    wins = 0,
    losses = 0,
    draws = 0;

// Buttons
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");

const selectionButtons = document.querySelectorAll(
    ".selection button"
);

selectionButtons.forEach((button) => {
    button.onclick = (e) => {
        round++;
        // disable buttons
        disableButtons(selectionButtons);

        //
        const userChoice = e.target.dataset.value;
        const computerChoice = getComputerChoice();

        const roundOutcome = decideWinner(
            userChoice,
            computerChoice
        );

        // update points
        if (roundOutcome) userScore++;
        else if (roundOutcome === false) compScore++;
        else draws++;

        // update wins and losses
        if (userScore === MAX_POINTS) {
            wins++, (userScore = 0), (compScore = 0);
        } else if (compScore === MAX_POINTS)
            losses++, (userScore = 0), (compScore = 0);

        updateText();
        prevRoundSpan.textContent = roundResults(
            roundOutcome,
            computerChoice
        );
        updateStyle(roundOutcome);
    };
});

const enableButtons = (buttonsArr) => {
    buttonsArr.forEach((button) => {
        button.removeAttribute("disabled");
    });
};

const disableButtons = (buttonsArr) => {
    buttonsArr.forEach((button) => {
        button.setAttribute("disabled", true);
    });
};

// Play round
startButton.onclick = () => {
    if (resetButton.hasAttribute("disabled"))
        resetButton.removeAttribute("disabled");

    startButton.setAttribute("disabled", true);
    enableButtons(selectionButtons);
    roundsSpan.textContent = round;
    startButton.removeAttribute("disabled");
};

// Reset all scores
resetButton.onclick = () => {
    round =
        userScore =
        compScore =
        wins =
        losses =
        draws =
            0;
    updateText();
    prevRoundSpan.textContent = "No rounds played...";
    prevRoundSpan.style.color = "black";
    resetButton.setAttribute("disabled", true);
    disableButtons(selectionButtons);
};

// Game Logic
const rockChoice = (computerChoice) => {
    switch (computerChoice) {
        case "rock":
            return null; // draw
        case "paper":
            return false;
        case "scissors":
            return true;
    }
};

const paperChoice = (computerChoice) => {
    switch (computerChoice) {
        case "rock":
            return true;
        case "paper":
            return null; // draw
        case "scissors":
            return false;
    }
};

const scissorsChoice = (computerChoice) => {
    switch (computerChoice) {
        case "rock":
            return false;
        case "paper":
            return true;
        case "scissors":
            return null; // draw
    }
};

const decideWinner = (userChoice, computerChoice) => {
    switch (userChoice) {
        case "rock":
            return rockChoice(computerChoice);
        case "paper":
            return paperChoice(computerChoice);
        case "scissors":
            return scissorsChoice(computerChoice);
        default:
            return false;
    }
};
