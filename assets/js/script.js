var questionNum = 0;
var letterEquiv = ['A', 'B', 'C', 'D']
var startButton = document.querySelector("#start-btn");
var questionEl = document.querySelector("#question");
var introText = document.querySelector("#intro-text");
var questionBox = document.querySelector("#quiz-questions");

var questions = [
    {
        question: "What is NOT a commonly used data type?",
        answers: ["Boolean", "String", "Console", "Integers"],
        correct: "Console"
    },
    {
        question: "What Javascript method is used to select an element by its attribute?",
        answers: [".getAttribute()", ".setAttribute()", ".getSelector()", ".querySelector()"],
        correct: ".querySelector()"
    },
    {
        question: "What is NOT a commonly used data type?",
        answers: ["Boolean", "String", "Console", "Integers"],
        correct: "Console"
    },
    {
        question: "What is NOT a commonly used data type?",
        answers: ["Boolean", "String", "Console", "Integers"],
        correct: "Console"
    },
    {
        question: "What is NOT a commonly used data type?",
        answers: ["Boolean", "String", "Console", "Integers"],
        correct: "Console"
    }
]

var startQuiz = function() {
    introText.remove();
    startButton.remove();
    questionEl.setAttribute("style", "text-align: left;");

    loadQuestion();
}

var loadQuestion = function () {
    if (questionBox.hasChildNodes()) {
        console.log("inside if statement")
        questionEl.textContent = questions[questionNum].question;
        for (var i = 0; i < 4; i++) {
            var targetAnswer = document.querySelector("button[data-answer-number='" + i + "']");
            targetAnswer.setAttribute("data-answer", questions[questionNum].answers[i]);
            targetAnswer.textContent = letterEquiv[i] + ". " + questions[questionNum].answers[i];
        }
    } else {
        console.log("called")
        questionEl.textContent = questions[questionNum].question;
        for (var i = 0; i < 4; i++) {
            var questionButton = document.createElement("button");
            questionButton.setAttribute("data-answer", questions[questionNum].answers[i]);
            questionButton.setAttribute("data-answer-number", i);
            questionButton.textContent = letterEquiv[i] + ". " + questions[questionNum].answers[i];
            questionBox.appendChild(questionButton);
        }
    }

    questionNum++;
}

startButton.addEventListener("click", startQuiz);

questionBox.addEventListener("click", function (event) {
    var element = event.target;

    if (element.matches("button")) {
        loadQuestion();
    }
});