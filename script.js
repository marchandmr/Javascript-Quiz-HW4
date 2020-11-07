// VARIABLES -----------------------------------------------
var timerEl = document.querySelector("#timer"); // timer
var quizEl = document.querySelector("#quiz");   // area in which questions will be wrote
var choicesEl = document.querySelector("#choices"); // buttons to answer questions will be appended here
var startEl = document.querySelector("#start"); // button to start quiz
var scoreEl = document.querySelector("#score"); // keeps the score
var score = 0;
var questionCount = 0;
var correct;
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

startEl.addEventListener("click", startTimer); // when the startEl is clicked it will start timer which also runs the initialize function

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


function initialize() {

  if (questionCount === questions.length) {
    gameOver();
  }
  else {

    var thisQuestion = questions[questionCount]; // displays the current question
    var forQuestion = questions[questionCount].question; //displays choices
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

function compare(event) { // function to check if the answer is right or wrong


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
function gameOver() { //displays runs when the timer runs out or all questions are answered
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

  submit.addEventListener("click", saveInit);


}

function saveInit() { // saves initials in local storage
  var x = document.getElementById("initials").value;
  localStorage.setItem("initials", JSON.stringify(x))
  console.log(x);
  scores();
}



function scores() { // saves scores in local storage and displays score and initals
  quizEl.innerHTML = " ";
  choicesEl.innerHTML = " ";
  localStorage.setItem('score', JSON.stringify(score));
  var get = localStorage.getItem('score');
  var getInit = localStorage.getItem('initials');
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


