var questionNum = 0;
var correctAnswers = 0;
var timeLeft = 75;
var quizEnded = false;
var userIndex;
var letterEquiv = ['A', 'B', 'C', 'D']
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#quiz-prompt");
var introText = document.querySelector("#intro-text");
var questionBox = document.querySelector("#quiz-questions");
var quizContainer = document.querySelector("#quiz-container");
var timer = document.querySelector("#timer");

if (localStorage.getItem("index")) {
    userIndex = parseInt(localStorage.getItem("index"));
    userIndex++;
} else {
    userIndex = 0;
}

var questions = [
    {
        question: "What is NOT a Javascript data type?",
        answers: ["Boolean", "String", "Console", "Integers"],
        correct: "Console"
    },
    {
        question: "What Javascript method is used to select an element by its attribute?",
        answers: [".getAttribute()", ".setAttribute()", ".getSelector()", ".querySelector()"],
        correct: ".querySelector()"
    },
    {
        question: "Javascript is a ______-side language?",
        answers: ["Server", "Client", "Both", "Neither"],
        correct: "Both"
    },
    {
        question: "Which method is used to write an alert to the window?",
        answers: ["alert()", "sendAlert()", "prompt()", "message()"],
        correct: "alert()"
    },
    {
        question: "What best describes the '= = =' operator?",
        answers: ["set equal to", "strict equality", "equal to", "greater than"],
        correct: "strict equality"
    }
]

var startQuiz = function () {
    introText.remove();
    startButton.remove();
    questionEl.setAttribute("style", "text-align: left;");
    timer.textContent = timeLeft;

    countdown();
    loadQuestion();
}

var countdown = function () {
    var startTimer = setInterval(function() {
        if (timeLeft > 1 && !quizEnded) {
            --timeLeft;
            timer.textContent = timeLeft;
        } else if (quizEnded) {
            clearInterval(startTimer);
        } else {
            --timeLeft;
            timer.textContent = timeLeft;
            clearInterval(startTimer);
            endQuiz();
        }
    }, 1000)
}

var endQuiz = function () {
    quizEnded = true;

    questionBox.remove();
    if (timeLeft > 1) {
        questionEl.innerHTML = "You finished the quiz with " + correctAnswers + " correct answers and " + timeLeft + " seconds remaining.<br/>Make sure to log your highscore!"
    } else {
        questionEl.innerHTML = "You finished the quiz with " + correctAnswers + " correct answers and " + timeLeft + " second remaining.<br/>Make sure to log your highscore!"
    }

    var formEl = document.createElement("form");
    var nameInputEl = document.createElement("input");
    var submitButton = document.createElement("button");
    submitButton.setAttribute("type", "button");
    submitButton.textContent = "Submit";
    nameInputEl.setAttribute("type", "text");
    nameInputEl.setAttribute("placeholder", "Enter Your Name");
    
    formEl.appendChild(nameInputEl);
    formEl.appendChild(submitButton);
    quizContainer.appendChild(formEl);

    submitButton.addEventListener("click", function (event) {
        if (nameInputEl.value == "") {
            return;
        } else {
            submitScore(nameInputEl.value, correctAnswers, timeLeft);
        }
    }, false);
}

var shuffleAnswers = function (list) {
    var current = list.length,  randomIndex;
  
    while (current != 0) {
      randomIndex = Math.floor(Math.random() * current);
      current--;
      [list[current], list[randomIndex]] = [
        list[randomIndex], list[current]];
    }
  
    return list;
}

var loadQuestion = function () {
    var shuffledAnswers = shuffleAnswers(questions[questionNum].answers);
    if (questionBox.hasChildNodes()) {
        questionEl.textContent = questions[questionNum].question;
        for (var i = 0; i < 4; i++) {
            var targetAnswer = document.querySelector("button[data-answer-number='" + i + "']");
            targetAnswer.setAttribute("data-answer", shuffledAnswers[i]);
            targetAnswer.textContent = letterEquiv[i] + ". " + shuffledAnswers[i];
        }
    } else {
        questionEl.textContent = questions[questionNum].question;
        for (var i = 0; i < 4; i++) {
            var questionButton = document.createElement("button");
            questionButton.setAttribute("data-answer", questions[questionNum].answers[i]);
            questionButton.setAttribute("data-answer-number", i);
            questionButton.textContent = letterEquiv[i] + ". " + questions[questionNum].answers[i];
            questionBox.appendChild(questionButton);
        }
    }
}

var checkAnswer = function (selected) {
    if (selected.getAttribute("data-answer") == questions[questionNum].correct) {
        correctAnswers++;
    } else {
        timeLeft -= 15;
        if (timeLeft > 0) {
            timer.textContent = timeLeft;
        } else {
            timeLeft = 0;
            timer.textContent = timeLeft;
        } 
    }
}

var submitScore = function (name, score, time) {
    var userData = {
        name: name,
        score: score,
        time: time
    }
    localStorage.setItem("index", userIndex);
    localStorage.setItem("user" + userIndex, JSON.stringify(userData));
    window.location.href="./scores.html"
}

startButton.addEventListener("click", startQuiz);

questionBox.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
        checkAnswer(element);
        questionNum++;
        console.log(correctAnswers);
        if (questionNum < questions.length) {
            loadQuestion();
        } else {
            endQuiz();
        }
    }
});