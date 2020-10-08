
let viewHighScores = document.getElementById("highscores-page");

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

};

viewHighScores.addEventListener("click", showHighScore);``