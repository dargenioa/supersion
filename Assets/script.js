/* Questions for Tutor
- How to let a user only click one question selection?
Action items:
Clear page when creating play again function.
*/

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
let startQuiz = document.getElementById("startButton");
let questionSection = document.getElementById("question-section");
let titleSection = document.getElementById("title-section");
let initials = document.getElementById("initials");
let finalScore = document.getElementById("final-score");
let submitButton = document.getElementById("submit-button");
let buttonSelection = document.createElement("button");
let highScoresPageView = document.getElementById("highscores-page");
let viewHighScores = document.getElementById("highscores-view");
let playAgainButton = document.getElementById("play-again");


var questionIndex = 0;
var correctCount = 0;
let time = 15;
let intervalId;

function endGame() {
    clearInterval(intervalId);
    highScoresEl.setAttribute("class", "show");
    questionSection.setAttribute("class", "hide");
    finalScore.textContent = `Game Over!  You scored ${correctCount}`;
    //setTimeout(showHighScore, 2);

};

function showHighScore() {
    let highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = [];
    } else {
        highScores = JSON.parse(highScores);
    };

    let name = initials.value.trim();
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

    for (let i = 0; i < highScores.length; i++) {
        let contentLi = document.createElement("li");
        contentLi.textContent = `Initials: ${highScores[i].name} Score: ${highScores[i].score}`;
        contentUl.appendChild(contentLi);
    };

    document.body.appendChild(contentUl);
    console.log("ran the showHighScores functiton");
};


function highScoresPage() {

    document.querySelectorAll('ul').forEach(function(a) {
        a.remove()
      })

    viewHighScores.setAttribute("class", "show");
    questionSection.setAttribute("class", "hide");
    titleSection.setAttribute("class", "hide");
    highScoresEl.setAttribute("class", "hide");

  

    let highScores = localStorage.getItem("scores");

    if (!highScores) {
        highScores = [];
        let showHS = document.getElementById("show-hs");
        showHS.textContent = "No highscores yet to show. Click 'Play Again to get started!"
    } else {
        highScores = JSON.parse(highScores);
    };

    
    highScores.sort((a, b) => {
        return b.score - a.score;
    });


    let contentUl = document.createElement("ul");

    for (let i = 0; i < highScores.length; i++) {
        let contentLi = document.createElement("li");
        contentLi.textContent = `Initials: ${highScores[i].name} Score: ${highScores[i].score}`;
        contentUl.appendChild(contentLi);
    
    };

    
    document.body.appendChild(contentUl);



};


function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time < 0) {
        timerEl.textContent = 0;
        endGame();
    }
};


function renderQuestion() {

    if (time <= 0) {
        updateTime();
        return;
    };

    intervalId = setInterval(updateTime, 1000);

    questionEl.textContent = questions[questionIndex].question;
    let choices = questions[questionIndex].choices;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    for (let i = 0; i < choices.length; i++) {
        let questionListItem = document.createElement("button")
        questionListItem.setAttribute("type", "button");
        questionListItem.setAttribute("class", "btn-block");
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
    if (event.target.matches("button")) {
        let userAnswer = event.target.textContent;
        if (userAnswer === questions[questionIndex].answer) {
            questionResultEl.setAttribute("class", "show");
            questionResultEl.textContent = "Correct!"
            correctCount++;
         } else {
            questionResultEl.setAttribute("class", "show");
            questionResultEl.textContent = "Wrong!";
            time = time - 2;
        };
    }
    setTimeout(nextQuestion, 2000);

}


function startButton() {
    questionSection.setAttribute("class", "show");
    titleSection.setAttribute("class", "hide");

    renderQuestion();

}

function playAgain() {
location.reload();
};

optionListEl.addEventListener("click", checkAnswer);
startQuiz.addEventListener("click", startButton);
submitButton.addEventListener("click", showHighScore, {once:true});
highScoresPageView.addEventListener("click", highScoresPage, {once:true});
playAgainButton.addEventListener("click", playAgain);
