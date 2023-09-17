// HTML ELEMENT
// -----------------------------------------------------------------------
const buttons = document.getElementById("buttons");
const display = document.getElementById("ui");
const question = document.getElementById("question");
const totalScore = document.getElementById("totalScore");
const time = document.getElementById("timeLeft");

// VARIABLES
// -----------------------------------------------------------------------
var choices = [];
var correctAnswer = "";
var incorrectPrompt = 0;
var round = 0;
var talliedScore = 0;
var timeLeft = 60;

// HELPER FUNCTIONS
// -----------------------------------------------------------------------
function removeAllChildren() {
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
}

function removeResultPrompt() {
    var resultPrompt = document.querySelector("h3");
    resultPrompt.remove();
}

// LOGIC FUNCTIONS
// -----------------------------------------------------------------------
function getQuestion(num) {
    question.innerText = questions[num].question;
    for (var i = 0; i < questions[num].answer.length; i++) {
        choices.push(questions[num].answer[i].text);

        if (questions[num].answer[i].answer === true) {
            correctAnswer = questions[num].answer[i].text;
        }
    }
}

function checkAnswer(eventObj) {
    var clickedButton = eventObj.target;

    if (clickedButton.tagName === "BUTTON") {
        if (incorrectPrompt === 1 && round < questions.length) {
            removeResultPrompt();
            incorrectPrompt = 0;
        }

        var wrong = document.createElement("h3");

        if (clickedButton.innerText == correctAnswer) {
            // Correct Notification
            talliedScore = talliedScore + 10;
            totalScore.innerText = talliedScore;
            wrong.innerText = "Correct";
            wrong.style.color = "green";

            // round++;
            // checkEnd();
        } else {
            // Incorrect Notification
            wrong.innerText = "Incorrect";
            wrong.style.color = "red";

            timeLeft = timeLeft - 4;

            // round++;
            // checkEnd();
        }
        incorrectPrompt = 1;
        display.append(wrong);
        round++;
        checkEnd();
    }
}

var quizEnded = 0;
function checkEnd() {
    if (round < questions.length) {
        promptQuiz();
    } else {
        endQuiz();
        quizEnded++;
    }
}

var testerName = "";
function endQuiz() {
    removeAllChildren();
    removeResultPrompt();

    question.innerText = "Finished";

    // End Score
    var endResult = document.createElement("h3");
    endResult.innerText = "Final Score: " + talliedScore;
    display.append(endResult);

    // Initials input
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your initials";
    input.className = "initial-input";
    display.append(input);

    // Submit button
    var submit = document.createElement("button");
    submit.innerHTML = "Submit";
    submit.className = "submit";
    display.append(submit);

    submit.addEventListener("click", updateHighScores);

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
            if (quizEnded === 0) {
                endQuiz();
            }
        }

        if (timeLeft < 10) {
            time.style.color = "red";
            time.innerText = "0" + timeLeft;
        }
    }, 1000);
}

// INITIALIZATION FUNCTIONS
// -----------------------------------------------------------------------
function startScreen() {
    question.innerHTML = "Press the button to start the quiz.";

    // Explanation
    var explanation = document.createElement("p");
    explanation.innerText =
        "You will have 60 seconds to complete this quiz. Each wrong answer will subtract 4 seconds from your timer.";
    display.append(explanation);

    // Start Button
    var startButton = document.createElement("button");
    startButton.innerText = "Start";
    display.append(startButton);

    establishLocalStorage();
    displayHighScores();

    startButton.addEventListener("click", startQuiz);
}

function startQuiz() {
    var startButton = display.querySelector("button");
    var explanation = display.querySelector("p");
    var highScoreDisplay = display.querySelector("h3");
    startButton.remove();
    explanation.remove();
    highScoreDisplay.remove();
    var leaderBoardDisplay = display.querySelector("#scoreBoard");
    leaderBoardDisplay.remove();

    startTimer();
    promptQuiz();
}

function updateHighScoreDisplay() {
    var highScoreDisplay = display.querySelector("h3");
    highScoreDisplay.remove();
    var leaderBoardDisplay = display.querySelector("#scoreBoard");
    leaderBoardDisplay.remove();

    displayHighScores();
}

function promptQuiz() {
    choices = [];
    getQuestion(round);

    removeAllChildren();

    choices.forEach(function (choice) {
        var btn = document.createElement("button");
        btn.innerText = choice;
        buttons.append(btn);
    });

    buttons.addEventListener("click", checkAnswer);
}

function displayHighScores() {
    var highScore = document.createElement("h3");
    highScore.innerText = "High Scores";
    highScore.className = "highScore";
    display.append(highScore);

    var scoreBoard = document.createElement("p");
    scoreBoard.innerText = "";
    scoreBoard.setAttribute("id", "scoreBoard");
    display.append(scoreBoard);

    leaderBoard = getHighScores();
    var position = 1;
    leaderBoard.forEach(function (eventObj) {
        var player =
            " " +
            position +
            ") " +
            eventObj.name +
            ": " +
            eventObj.score +
            " points ";
        scoreBoard.innerText += player;
        position++;
    });

    establishLocalStorage();
}

//=======================================================================

function getHighScores() {
    return JSON.parse(localStorage.getItem("highScores")) || [];
}

function getHighScoresDisplay() {
    return JSON.stringify(localStorage.getItem("highScores")) || [];
}

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

function updateHighScores(eventObj) {
    eventObj.preventDefault();
    var highScores1 = getHighScores();

    var inputValue = document.querySelector(".initial-input");
    console.log(inputValue);
    testerName = inputValue.value;

    console.log("Input value: " + testerName);

    var thingy = getHighScores();

    var through = 0;

    highScores1.forEach(function (highScoreObj) {
        if (highScoreObj.score < talliedScore) {
            // Saves previous score. Changes score to whats taking its place. Changes old value to score and name so that it can be compared to the next value down the list.

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

            thingy[through] = newScore;
            localStorage.setItem("highScores", JSON.stringify(thingy));
        } else if (highScoreObj.score === talliedScore) {
            // var newScore = {
            //     name: testerName,
            //     score: talliedScore,
            // };
            // thingy.push(newScore);
            // localStorage.setItem("highScores", JSON.stringify(thingy));
        }
        through++;
    });

    updateHighScoreDisplay();
}

//=======================================================================
// RUN PROGRAM
// -----------------------------------------------------------------------
startScreen();
