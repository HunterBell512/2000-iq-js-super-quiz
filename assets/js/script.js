var questionNum = 0;
var correctAnswers = 0;
var letterEquiv = ['A', 'B', 'C', 'D']
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#quiz-prompt");
var introText = document.querySelector("#intro-text");
var questionBox = document.querySelector("#quiz-questions");

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

var startQuiz = function() {
    introText.remove();
    startButton.remove();
    questionEl.setAttribute("style", "text-align: left;");

    loadQuestion();
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

var checkAnswer = function (selected) {
    if (selected.getAttribute("data-answer") == questions[questionNum].correct) {
        correctAnswers++;
    }
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
        }
    }
});