// HTML ELEMENT
// -----------------------------------------------------------------------
const question = document.getElementById("question");
// const button1 = document.getElementById("btn1");
// const button2 = document.getElementById("btn2");
// const button3 = document.getElementById("btn3");
// const button4 = document.getElementById("btn4");
const score = document.getElementById("totalScore");
const time = document.getElementById("timeLeft");
const display = document.getElementById("ui");

const buttons = document.getElementById("buttons");

// VARIABLES
// -----------------------------------------------------------------------
var talliedScore = 0;
var round = 0;
var choices = [];
var correctAnswer = "";
var timeLeft = 60;
// var currentQuestion = "";
var questions = [
    {
        question: "Which of the following is not a front-end technology?",
        answer: [
            { text: "HTML", answer: false },
            { text: "CSS", answer: false },
            { text: "JavaScript", answer: false },
            { text: "SQL", answer: true },
        ],
    },
    {
        question:
            "The purpose of the Front-end framework in Full stack development is ____.",
        answer: [
            { text: "To provide the client-side interface", answer: true },
            { text: "To manage database", answer: false },
            { text: "To reduce the server load", answer: false },
            { text: "To send http requests", answer: false },
        ],
    },
    {
        question: "What is a Front-end framework?",
        answer: [
            {
                text: "A development platform for developing user-interface for software applications",
                answer: true,
            },
            {
                text: "A database to store and manage the data of an application",
                answer: false,
            },
            {
                text: "A development platform for writing server-side logic",
                answer: false,
            },
            { text: "None of the above", answer: false },
        ],
    },
    {
        question: "What does the term Full Stack Development refer to?",
        answer: [
            {
                text: "Development that involves stack data structures",
                answer: false,
            },
            {
                text: "Development that involves front-end and back-end programming",
                answer: true,
            },
            {
                text: "Development that involves only backend programming",
                answer: false,
            },
            { text: "None of the above", answer: false },
        ],
    },
    {
        question: "What is Git?",
        answer: [
            { text: "Framework", answer: false },
            { text: "Version control system", answer: true },
            { text: "Database", answer: false },
            { text: "Package manager", answer: false },
        ],
    },
];

// FUNCTIONS
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
        if (clickedButton.innerText == correctAnswer) {
            talliedScore = talliedScore + 10;
            score.innerText = talliedScore;
            round++;
            checkEnd();
        } else {
            // Wrong Notification
            const wrong = document.createElement("h3");
            wrong.innerText = "Incorrect";
            buttons.append(wrong);

            timeLeft = timeLeft - 4;
            round++;
            checkEnd();
        }
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

    question.innerText = "Finished";
    var endResult = document.createElement("h3");
    endResult.innerText = "Final Score: " + talliedScore;
    buttons.append(endResult);
}

function startTimer() {
    // var timeLeft = 60;
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(timerId);
            time.innerText = "0";
            endQuiz();
        } else if (round === questions.length) {
            time.innerText = timeLeft;
            clearTimeout(timerId);
        } else {
            time.innerHTML = timeLeft;
            timeLeft--;
        }

        if (timeLeft < 10) {
            time.style.color = "red";
        }
    }
}

function removeAllChildren() {
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
}

function beginQuiz() {
    question.innerHTML = "Press the button to start the quiz.";

    // Start Button
    var startButton = document.createElement("button");
    startButton.innerText = "Start";
    display.append(startButton);

    startButton.addEventListener("click", startQuiz);
}

function startQuiz() {
    var startButton = display.querySelector("button");
    startButton.remove();
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

// function endQuiz() {
//     display.innerHTML = "<h1>Quiz Over</h1>";
// }

// RUN PROGRAM
// -----------------------------------------------------------------------
beginQuiz();
// startTimer();
// startQuiz();

// startQuiz(round);
