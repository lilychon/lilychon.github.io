var viewH = document.querySelector("#viewH");
var viewT = document.querySelector("#viewT");
var start = document.querySelector("#start");
var timer = document.querySelector("#timer");
var content = document.querySelector("#content");

var test = false;
var score = 0;
var timerInterval;
// const lastQuestion = questions.length - 1;
var currentQuestion = 0;
var secondsLeft = 75;

function display_start() {
  var h1El = document.createElement("h1");
  h1El.textContent = "Coding Quiz Challenge";
  content.append(h1El);

  var h3El = document.createElement("h3");
  h3El.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!";
  content.append(h3El);

  var buttonEl = document.createElement("button");
  buttonEl.textContent = "Start Quiz";
  content.append(buttonEl);

  buttonEl.addEventListener("click", function () {
    content.removeChild(h1El);
    content.removeChild(h3El);
    content.removeChild(buttonEl);
    startQuiz();
    setTime();
  });
}

function setTime() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timer.textContent = secondsLeft;

    if (secondsLeft === 0) {
      clearInterval(timerInterval);
    }

  }, 1000);
}

function startQuiz() {
  content.innerHTML = "";
  var h2El = document.createElement("h2");
  h2El.setAttribute("class", "question");
  h2El.setAttribute("question-index", currentQuestion);
  h2El.textContent = questions[currentQuestion].title;
  content.append(h2El);

  for (var j = 0; j < questions[currentQuestion].choices.length; j++) {
    var buttonEl = document.createElement("button");
    buttonEl.setAttribute("id", "buttons");
    buttonEl.setAttribute("choice-index", j);
    buttonEl.textContent = j + 1 + ". " + questions[currentQuestion].choices[j];
    content.append(buttonEl);

    buttonEl.addEventListener("click", function (event) {
      var btnChoice = event.target;
      var h2Question = document.querySelector(".question");
      var choiceIndex = parseInt(btnChoice.getAttribute("choice-index"));
      var question = questions[h2Question.getAttribute("question-index")];
      if (choiceIndex === question.answer) {
        var hrEl = document.createElement("hr")
        var pEl = document.createElement("p");
        pEl.textContent = "Correct!";
        content.append(hrEl);
        content.append(pEl);
        score++
      } else {
        var hrEl = document.createElement("hr")
        var pEl = document.createElement("p");
        pEl.textContent = "Wrong!";
        content.append(hrEl);
        content.append(pEl);
        // score--
        secondsLeft -= 10
      }
      currentQuestion++
      if (currentQuestion > questions.length - 1) {
        showResult();
        // clearInterval(timerInterval);
      } else {
        setTimeout(startQuiz, 1000);
      }
    })
  }
}

function stopTime() {
  if (test) { }
  secondsLeft = 0;
  clearInterval(timerInterval);
}

function showResult() {
  content.innerHTML = "";
  stopTime();

  viewT.setAttribute("style", "visibility: hidden;");

  var h2El = document.createElement("h2");
  h2El.textContent = "All Done!";

  var yourScore = document.createElement("p");
  yourScore.textContent = " Your score is " + score;

  var par = document.createElement("p");

  var initialsLabel = document.createElement("label");
  initialsLabel.setAttribute("for", "userInitials");
  initialsLabel.textContent = "Enter Initials:   ";

  var initialsInput = document.createElement("input");
  initialsInput.setAttribute("id", "userInitials");
  initialsInput.setAttribute("name", "userInitials");
  initialsInput.setAttribute("minlength", "20");
  initialsInput.setAttribute("maxlength", "20");
  initialsInput.setAttribute("size", "20");

  var submit = document.createElement("button");
  submit.setAttribute("class", "submitBtn");
  submit.textContent = "Submit";

  content.appendChild(h2El);
  content.appendChild(yourScore);
  content.appendChild(initialsLabel);
  content.appendChild(initialsInput);
  content.appendChild(par);
  content.appendChild(submit);

  submit.addEventListener("click", function () {
    // let thisScore = [ { name: initialsInput.value, score: score } ];

    var highScore = JSON.parse(localStorage.getItem("highScore"));
    if (!highScore) {
      highScore = {}
    }
    var myScoreStr = JSON.stringify(highScore);
    localStorage.setItem('highScore', myScoreStr);
    showHighScores();
  });
}

function showHighScores() {
  content.innerHTML = "";
  timer.setAttribute("style", "visibility: hidden;");

  var highScore = JSON.parse(localStorage.getItem("highScore"));

  var heading = document.createElement("h2");
  heading.setAttribute("id", "main-heading");
  heading.textContent = "Top 5 High Scores";

  content.appendChild(heading);
  

  if ( highScore !== null ) {
    // highScore.sort((a,b) => (a.score < b.score) ? 1: -1);

    var numScores2Display = 5;
    if ( highScore.length < 5 ) { 
      numScores2Display = highScore.length; 
    }

    for (var i = 0; i < numScores2Display; i++) {
      var s = highScore[i];

      var p = document.createElement("p");
      p.textContent = initialsInput + " " + score + " ( " + s.type + " )";
      p.textContent = "SCORE HERE"
      content.appendChild(p);
    }
  } else {
    var p = document.createElement("p");
    p.textContent =  "Your Initials Here!"
    content.appendChild(p);
  }


  // creates button to start the game
  var clear = document.createElement("button");
  clear.setAttribute("id", "clear");
  clear.setAttribute("class", "clearBtn");
  clear.textContent = "Clear!";

  content.appendChild(clear);

  clear.addEventListener("click", function() {
    localStorage.clear();
    p.innerHTML = ""
  });
}

viewH.addEventListener("click", function() {
  showHighScores();
})

display_start();