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
        if (incorrectPrompt === 1) {
            removeResultPrompt();
            incorrectPrompt = 0;
            console.log("After reset" + incorrectPrompt);
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

            console.log("here");

            timeLeft = timeLeft - 4;
            console.log("After Wrong" + incorrectPrompt);
            // round++;
            // checkEnd();
        }
        incorrectPrompt = 1;
        display.append(wrong);
        round++;
        checkEnd();
    }
}

function checkEnd() {
    if (round < questions.length) {
        promptQuiz();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    removeAllChildren();
    removeResultPrompt();

    question.innerText = "Finished";

    // End Score
    var endResult = document.createElement("h3");
    endResult.innerText = "Final Score: " + talliedScore;
    buttons.append(endResult);

    // Initials input
    var input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Enter your initials";
    input.className = "initial-input";
    buttons.append(input);
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
            endQuiz();
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

    displayHighScores();

    startButton.addEventListener("click", startQuiz);
}

function startQuiz() {
    var startButton = display.querySelector("button");
    var explanation = display.querySelector("p");
    startButton.remove();
    explanation.remove();
    startTimer();
    promptQuiz();
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
    display.append(highScore);
}

// RUN PROGRAM
// -----------------------------------------------------------------------
startScreen();
