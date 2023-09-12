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
        question: "Why are we here?",
        answer: [
            { text: "Puppies", answer: false },
            { text: "Dogs", answer: true },
            { text: "Old Puppers", answer: false },
            { text: "All of the above.", answer: false },
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

document.addEventListener("DOMContentLoaded", function () {
    const question = document.getElementById("question");
    const button1 = document.getElementById("btn1");
    const button2 = document.getElementById("btn2");
    const button3 = document.getElementById("btn3");
    const button4 = document.getElementById("btn4");

    let questionIndex = 0;
    let score = 0;

    function startQuiz() {
        changeQuestion(0);
    }

    function changeQuestion(questionNumber) {
        question.innerHTML = questions[questionNumber].question;

        button1.innerHTML = questions[questionNumber].answer[0].text;

        button2.innerHTML = questions[questionNumber].answer[1].text;

        button3.innerHTML = questions[questionNumber].answer[2].text;

        button4.innerHTML = questions[questionNumber].answer[3].text;
    }

    startQuiz();
});
