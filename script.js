// VARIABLES -----------------------------------------------
var timerEl = document.querySelector("#timer");
var quizEl = document.querySelector("#quiz");
var choicesEl = document.querySelector("#choices");
var startEl = document.querySelector("#start");
var scoreEl = document.querySelector("#score");
var score = 0;
var questionCount = 0;
var correct;
//var gameOver = questions.length;
var timeLeft = 60;
var initals;


var questions = [
  {
    question: "what is used to style a web page?",
    options: ["html", "css", "Javascript"],
    answer: "css"
  },
  {
    question: "what is used to run something a specific amount of times?",
    options: ["if statement", "else statement", "for loop"],
    answer: "for loop"
  },
  {
    question: "what kind of loop is for conditional statements?",
    options: ["if statement", "for loop", "blanket statement"],
    answer: "if statement"
  },
  {
    question: "what is to end a line of code?",
    options: [";", ",", "/"],
    answer: ";"
  },
  {
    question: "What is not fundemental for Web Development?",
    options: ["html", "potatos", "Javascript"],
    answer: "potatos"
  },
]

startEl.addEventListener("click", startTimer);

// FUNCTIONS -------------------------------------
function startTimer() {

  var timeInterval = setInterval(function () {
    timerEl.textContent = "Time: " + timeLeft;
    timeLeft--;

    if (timeLeft === -1) {
      clearInterval(timeInterval);
      gameOver();
    }

  }, 1000);

  initialize();
}

// Starts quiz and initializes timer
function initialize() {

  if (questionCount === questions.length) {
    gameOver();
  }
  else {
    // Writes questions and answers in the quiz element
    var thisQuestion = questions[questionCount];
    var forQuestion = questions[questionCount].question;
    var ulChoices = document.createElement("ul");
    var choiceOneEl = document.createElement("button");
    var choiceTwoEl = document.createElement("button");
    var choiceThreeEl = document.createElement("button");

    quizEl.innerHTML = "";
    quizEl.innerHTML = thisQuestion;
    quizEl.textContent = forQuestion;
    quizEl.append(ulChoices);


    ulChoices.setAttribute("id", "choices");
    ulChoices.addEventListener("click", compare)
    ulChoices.append(choiceOneEl);
    ulChoices.append(choiceTwoEl);
    ulChoices.append(choiceThreeEl);

    choiceOneEl.setAttribute("id", "optionOne");
    choiceOneEl.textContent = questions[questionCount].options[0]

    choiceTwoEl.setAttribute("id", "optionTwo");
    choiceTwoEl.textContent = questions[questionCount].options[1]

    choiceThreeEl.setAttribute("id", "optionThree");
    choiceThreeEl.textContent = questions[questionCount].options[2]
  }
}

function compare(event) {


  correct = questions[questionCount].answer;

  if (event.target.textContent === correct) {
    alert("Correct!")
    score++;
    console.log(JSON.stringify(score));
    scoreEl.textContent = "Score: " + JSON.stringify(score);
    console.log(score);
    questionCount++
    initialize();

  }
  else if (event.target.textContent !== correct) {
    alert("Wrong!");
    timeLeft -= 10;
    questionCount++;
    initialize();
  }
}
function gameOver() {
  alert("All Done!")
  timeLeft = " ";
  quizEl.innerHTML = "";
  var initials = document.createElement("input");
  initials.setAttribute("id", "initials")
  quizEl.append(initials);
  var submit = document.createElement("button");
  quizEl.append(submit);
  submit.textContent = "SUBMIT";
  var gameOverText = document.createElement("p")
  quizEl.append(gameOverText);
  gameOverText.textContent = "Enter your initals and press submit to save your score";
  // localStorage.setItem('submit', JSON.stringify(submit));
  // initials = localStorage.getItem('submit');

  submit.addEventListener("click", saveInit);
  //submit.addEventListener("click", save)

}

function saveInit() {
  var x = document.getElementById("initials").value;
  localStorage.setItem("initials", JSON.stringify(x))
  console.log(x);
  scores();
}



function scores() {
  quizEl.innerHTML = " ";
  choicesEl.innerHTML = " ";
  localStorage.setItem('score', JSON.stringify(score));
  var get = localStorage.getItem('score');
  var getInit = localStorage.getItem('initials');
  // quizEl.innerHTML = initials, JSON.parse(initials);
  quizEl.innerHTML = JSON.parse(getInit) + " : " + get, JSON.parse(get);
  var listEl = document.createElement("ul");
  listEl.setAttribute("id", "choices");
  quizEl.append(listEl);
  var playAgain = document.createElement("button");
  listEl.append(playAgain);
  playAgain.setAttribute("id", "reset");
  playAgain.innerText = "play again";
  playAgain.addEventListener("click", reset);


}

function reset() {

  location.href = 'https://marchandmr.github.io/Javascript-Quiz-HW4/';



}


