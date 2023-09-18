// HTML ELEMENT
// -----------------------------------------------------------------------
const buttonContainer = document.getElementById("buttons");
const uiContainer = document.getElementById("ui");
const question = document.getElementById("question");
const totalScore = document.getElementById("totalScore");
const time = document.getElementById("timeLeft");

// VARIABLES
// -----------------------------------------------------------------------
let choices = [];
let correctAnswer = "";
let incorrectPrompt = 0;
let round = 0;
let talliedScore = 0;
let timeLeft = 60;
let isQuizEnded = 0;
let testerName = "";

// HELPER FUNCTIONS
// -----------------------------------------------------------------------

// Clears all child elements from the buttonContainer.
function clearButtonContainer() {
    while (buttonContainer.firstChild) {
        buttonContainer.removeChild(buttonContainer.firstChild);
    }
}

// Removes the question result prompt (ex. Correct or Incorrect).
function removeQuizResultPrompt() {
    const resultPrompt = document.querySelector("h3");
    resultPrompt.remove();
}

// LOGIC FUNCTIONS
// -----------------------------------------------------------------------

// Gets the questions and its multiple choice answers.
function getQuestion(num) {
    question.innerText = questions[num].question;
    for (var i = 0; i < questions[num].answer.length; i++) {
        choices.push(questions[num].answer[i].text);

        if (questions[num].answer[i].answer === true) {
            correctAnswer = questions[num].answer[i].text;
        }
    }
}

// Checks users selected answer.
function checkAnswer(eventObj) {
    var clickedButton = eventObj.target;

    if (clickedButton.tagName === "BUTTON") {
        if (incorrectPrompt === 1 && round < questions.length) {
            removeQuizResultPrompt();
            incorrectPrompt = 0;
        }

        const resultMessage = document.createElement("h3");

        if (clickedButton.innerText == correctAnswer) {
            // Correct Notification
            talliedScore = talliedScore + 10;
            totalScore.innerText = talliedScore;
            resultMessage.innerText = "Correct";
            resultMessage.style.color = "green";
        } else {
            // Incorrect Notification
            resultMessage.innerText = "Incorrect";
            resultMessage.style.color = "red";

            timeLeft = timeLeft - 4;
        }
        incorrectPrompt = 1;
        uiContainer.append(resultMessage);
        round++;
        checkEnd();
    }
}

// Checks if the quiz has ended.
function checkEnd() {
    if (round < questions.length) {
        setupQuizQuestion();
    } else {
        endQuiz();
        isQuizEnded++;
    }
}

function endQuiz() {
    clearButtonContainer();
    removeQuizResultPrompt();

    question.innerText = "Finished";

    // End Score
    var endResultMessage = document.createElement("h3");
    endResultMessage.innerText = "Final Score: " + talliedScore;
    uiContainer.append(endResultMessage);

    // Initials input
    var inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.placeholder = "Enter your initials";
    inputElement.className = "initial-input";
    inputElement.maxLength = 2;
    uiContainer.append(inputElement);

    // Submit button
    var submitButton = document.createElement("button");
    submitButton.innerHTML = "Submit";
    submitButton.className = "submit";
    uiContainer.append(submitButton);

    submitButton.addEventListener("click", function (eventObj) {
        checkInput(eventObj);
    });

    displayHighScores();
}

function startTimer() {
    var timer = setInterval(function () {
        timeLeft--;

        if (timeLeft < 0) {
            timeLeft = 0;
        }

        if (round === questions.length) {
            clearInterval(timer);
        }

        time.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            if (isQuizEnded === 0) {
                endQuiz();
            }
        }

        if (timeLeft < 10) {
            time.style.color = "red";
            time.innerText = "0" + timeLeft;
        }
    }, 1000);
}

function updateHighScoreDisplay() {
    var highScoreDisplay = uiContainer.querySelector("#highScore");
    highScoreDisplay.remove();
    var leaderBoardDisplay = uiContainer.querySelector("#scoreBoard");
    leaderBoardDisplay.remove();

    displayHighScores();
}

function setupQuizQuestion() {
    choices = [];
    getQuestion(round);

    clearButtonContainer();

    choices.forEach(function (choice) {
        var btn = document.createElement("button");
        btn.innerText = choice;
        buttonContainer.append(btn);
    });

    buttonContainer.addEventListener("click", checkAnswer);
}

function displayHighScores() {
    const highScoreMessage = document.createElement("h3");
    highScoreMessage.innerText = "High Scores";
    highScoreMessage.setAttribute("id", "highScore");
    uiContainer.append(highScoreMessage);

    const scoreBoardElement = document.createElement("p");
    scoreBoardElement.innerText = "";
    scoreBoardElement.setAttribute("id", "scoreBoard");
    uiContainer.append(scoreBoardElement);

    let leaderBoard = getHighScores();
    let position = 1;
    leaderBoard.forEach(function (eventObj) {
        var player =
            " | " +
            position +
            ") " +
            eventObj.name +
            ": " +
            eventObj.score +
            " |  ";
        scoreBoardElement.innerText += player;
        position++;
    });

    establishLocalStorage();
}
// INITIALIZATION FUNCTIONS
// -----------------------------------------------------------------------

// Displays the start screen.
function startScreen() {
    question.innerHTML = "Press the button to start the quiz.";

    // Explanation
    var explanationElement = document.createElement("p");
    explanationElement.innerText =
        "You will have 60 seconds to complete this quiz. Each wrong answer will subtract 4 seconds from your timer.";
    uiContainer.append(explanationElement);

    // Start Button
    const startButtonElement = document.createElement("button");
    startButtonElement.innerText = "Start";
    uiContainer.append(startButtonElement);

    establishLocalStorage();
    displayHighScores();

    startButtonElement.addEventListener("click", startQuiz);
}

function startQuiz() {
    var startButtonElement = uiContainer.querySelector("button");
    var explanationElement = uiContainer.querySelector("p");
    var highScoreDisplayElement = uiContainer.querySelector("h3");
    startButtonElement.remove();
    explanationElement.remove();
    highScoreDisplayElement.remove();
    var leaderBoardDisplayElement = uiContainer.querySelector("#scoreBoard");
    leaderBoardDisplayElement.remove();

    startTimer();
    setupQuizQuestion();
}

// Checks the users initials input for errors.
function checkInput(eventObj) {
    eventObj.preventDefault();
    var inputValueElement = document.querySelector(".initial-input");
    var inputText = inputValueElement.value.trim();

    if (/^[a-zA-Z]{2}$/.test(inputText)) {
        updateHighScores();
    } else {
        alert("You must enter two letters.");
        inputValueElement.innerText = " ";
    }
}

function updateHighScores() {
    let highScoresList = getHighScores();

    var inputValueElement = document.querySelector(".initial-input");
    console.log(inputValueElement);

    testerName = inputValueElement.value;

    console.log("Input value: " + testerName);

    var scoreSheet = getHighScores();

    let index = 0;

    highScoresList.forEach(function (highScoreObj) {
        if (highScoreObj.score < talliedScore) {
            let repName = highScoreObj.name;
            let repScore = highScoreObj.score;
            console.log("Previous name: " + highScoreObj.name);
            highScoreObj.name = testerName;
            console.log("New name: " + highScoreObj.name);
            highScoreObj.score = talliedScore;
            testerName = repName;
            talliedScore = repScore;

            var newScore = {
                name: highScoreObj.name,
                score: highScoreObj.score,
            };
            console.log("New Score: " + JSON.stringify(newScore));

            scoreSheet[index] = newScore;
            localStorage.setItem("highScores", JSON.stringify(scoreSheet));
        }
        index++;
    });

    inputValueElement.value = "";
    updateHighScoreDisplay();
}

// LOCAL STORAGE FUNCTIONS
// -----------------------------------------------------------------------

// Gets high scores from local storage.
function getHighScores() {
    return JSON.parse(localStorage.getItem("highScores")) || [];
}

// Establishes the local storage if there are no high scores stored.
function establishLocalStorage() {
    if (localStorage.getItem("highScores") === null) {
        var highScores = {
            name: "N/A",
            score: 0,
        };

        var highScoresBase = getHighScores();

        for (var i = 0; i < 5; i++) {
            highScoresBase.push(highScores);
        }

        localStorage.setItem("highScores", JSON.stringify(highScoresBase));
    }
}

// RUN PROGRAM
// -----------------------------------------------------------------------
startScreen();
