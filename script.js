// HTML ELEMENT
// -----------------------------------------------------------------------
const question = document.getElementById("question");
const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");
const button4 = document.getElementById("btn4");
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
var currentQuestion = "";
var questions = [
    {
        question: "Why are we here?",
        answer: [
            { text: "Love", answer: false },
            { text: "The others are wrong", answer: true },
            { text: "Family", answer: false },
            { text: "Fame", answer: false },
        ],
    },
    {
        question: "Whats better cats or dogs?",
        answer: [
            { text: "Puppies", answer: false },
            { text: "Dogs", answer: false },
            { text: "Old Puppers", answer: false },
            { text: "All of the above.", answer: true },
        ],
    },
    {
        question: "Why are we here?",
        answer: [
            { text: "Love", answer: false },
            { text: "The others are wrong", answer: true },
            { text: "Family", answer: false },
            { text: "Fame", answer: false },
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
    var el = eventObj.target;

    if (el.tagName === "BUTTON") {
        if (el.innerText == correctAnswer) {
            talliedScore = talliedScore + 10;
            score.innerText = talliedScore;
            console.log("You are correct");
            round++;
            checkEnd();
        } else {
            round++;
            checkEnd();
        }
    }
}

function checkEnd() {
    if (round < questions.length) {
        startQuiz();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    removeAllChildren();
    question.innerText = "Finished";
}

function startTimer() {
    var timeLeft = 60;
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == 0) {
            clearTimeout(timerId);
            endQuiz();
        } else {
            time.innerHTML = timeLeft;
            timeLeft--;
        }
    }
}

function removeAllChildren() {
    while (buttons.firstChild) {
        buttons.removeChild(buttons.firstChild);
    }
}

function startQuiz() {
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
startQuiz();
startTimer();
// startQuiz(round);
