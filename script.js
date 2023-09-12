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

const question = document.getElementById("question");
const button1 = document.getElementById("btn1");
const button2 = document.getElementById("btn2");
const button3 = document.getElementById("btn3");
const button4 = document.getElementById("btn4");
const score = document.getElementById("totalScore");

// VARIABLES
// -----------------------------------------------------------------------
var talliedScore = 0;

// FUNCTIONS
// -----------------------------------------------------------------------
function changeQuestion(questionNumber) {
    question.innerHTML = questions[questionNumber].question;
    button1.innerHTML = questions[questionNumber].answer[0].text;
    button2.innerHTML = questions[questionNumber].answer[1].text;
    button3.innerHTML = questions[questionNumber].answer[2].text;
    button4.innerHTML = questions[questionNumber].answer[3].text;
}

function checkAnswer(buttonNum, questionNum, answerNum) {
    if (questions[questionNum].answer[answerNum].answer === true) {
        buttonNum.style.backgroundColor = "lightgreen";
        score.innerHTML = talliedScore + 5;
    } else {
        buttonNum.style.backgroundColor = "rgb(247, 79, 79)";
    }
}

function promptQuestion(questionIndex) {
    changeQuestion(questionIndex);

    button1.addEventListener("click", function () {
        checkAnswer(button1, questionIndex, 0);
    });

    button2.addEventListener("click", function () {
        checkAnswer(button2, questionIndex, 1);
    });

    button3.addEventListener("click", function () {
        checkAnswer(button3, questionIndex, 2);
    });

    button4.addEventListener("click", function () {
        checkAnswer(button4, questionIndex, 3);
    });
}

function startQuiz(index) {
    promptQuestion(index);
}

// RUN PROGRAM
// -----------------------------------------------------------------------
startQuiz(1);

// -----------------------------------------------------------------------

console.log(questions[1].answer[3].answer);
