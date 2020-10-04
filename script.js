let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choices: ["<script>", "<link>", "<head>", "<section>"],
        answer: "<script>"
    },
    {
        question: "How do you create a function in JavaScript?",
        choices: ["function = myFunction()", "function myFunction()", "function:myFunction()", "function + myFunction()"],
        answer: "function myFunction()"
    },
    {
        question: "Which is the correct syntax to create an object?",
        choices: ["obj: = ()", "obj = []", "var obj = {}", "obj {}"],
        answer: "var obj = {}"
    },
    {
        question: "How do you call a function named 'myFunction'?",
        choices: ["myFunction()", "call myFunction()", "call = myFunction()", "call function myFunction()"],
        answer: "myFunction()"
    },
    {
        question: "How to write an 'if statement' in JavaScript?",
        choices: ["if = (a === b)", "if (a === b) {}", "if boolean = (a === b) {}", "if this (a === b)"],
        answer: "if (a === b) {}"
    }
];

var questionEl = document.getElementById("question");
var optionListEl = document.getElementById("option-list");
var questionResultEl = document.getElementById("question-result");
var timerEl = document.getElementById("timer");
let highScoresEl = document.getElementById("highscores");



var questionIndex = 0;
var correctCount = 0;
let time = 60;
let intervalId;

function endGame() {
    clearInterval(intervalId);
    let body = document.body;
    body.innerHTML = `Game Over!  You scored ${correctCount}`;
    setTimeout(showHighScore, 2);
};

function showHighScore() {
    let highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    };

    let name = document.getElementById("name");
    let users = {
        name: name,
        score: correctCount
    };

    highScores.push(users);
    localStorage.setItem("scores", JSON.stringify(highScores));

    highScores.sort((a, b) => {
        return b.score - a.score;
    });

    let contentUl = document.createElement("ul");

      for (let i = 0; i < highScores.length; i++){
        let contentLi = document.createElement("li");
        contentLi.textContent = `Name: ${highScores[i].name} Score: ${highScores[i].score}`;
        contentUl.appendChild(contentLi);
    };

   document.body.appendChild(contentUl);

};

function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endGame();
    }
};


function renderQuestion() {

    if (time == 0) {
        updateTime();
        return;
    };

    intervalId = setInterval(updateTime, 1000);

    questionEl.textContent = questions[questionIndex].question;
    let choices = questions[questionIndex].choices;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {
        let questionListItem = document.createElement("li");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    };
};

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        time = 0;
    };
    renderQuestion();
};

function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        let userAnswer = event.target.textContent;
        if (userAnswer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct!"
            correctCount++;
            
        } else {
            questionResultEl.textContent = "Wrong!";
            time--;
        };
    }
    setTimeout(nextQuestion, 2000);

};


renderQuestion();
optionListEl.addEventListener("click", checkAnswer);
