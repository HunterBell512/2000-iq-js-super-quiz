var clearButton = document.querySelector("#clear");
var quizInfoEl = document.querySelector("#quiz-info");
var maxIndex = localStorage.getItem("index");

var loadScores = function (items) {
    var scoreList = document.createElement("div");
    var crownImg = document.createElement("img");
    scoreList.setAttribute("class", "scores");
    crownImg.setAttribute("src", "./assets/images/crown.svg");
    
    for (var i = 0; i < items.length; i++) {
        var scoreEl = document.createElement("p");
        scoreEl.innerHTML = "Name: " + items[i].name + "<br/>Score: " + items[i].score + "<br/>Time: " + items[i].time;
        if (i == 0) {
            scoreEl.setAttribute("class", "score top-score");
        } else {
            scoreEl.setAttribute("class", "score");
        }
        scoreList.appendChild(scoreEl);
    }
    
    if (maxIndex){
        quizInfoEl.appendChild(crownImg);
        quizInfoEl.appendChild(scoreList);
    } else {
        var msg = document.createElement("h3");
        msg.textContent = "There are currently no scores.";
        quizInfoEl.appendChild(msg);
    }
}

var getTopScores = function () {
    var top = []
    var currentLength = top.length;

    for (var i = -1; i < parseInt(maxIndex); i++) {
        var element = JSON.parse(localStorage.getItem("user" + (i + 1)));
        console.log(element);
        if (top.length == 0) {
            top.push(element);
        } else {
            for (var k = 0; k < currentLength; k++) {
                if (element.score > top[k].score) {
                    top.splice(k, 0, element);
                    break;
                } else if (element.score == top[k].score) {
                    if (element.time > top[k].time || element.time == top[k].time) {
                        top.splice(k, 0, element);
                    } else {
                        top.splice(top.lastIndexOf(top[k].score), 0, element)
                    }
                    break;
                } else if (element.score < top[top.length - 1].score) {
                    top.splice(top.length, 0, element)
                    break;
                }
            }
        }
        currentLength = top.length;
    }

    while (top.length > 5) {
        top.pop();
    }
    return top;
}

var clearScores = function () {
    localStorage.clear();
    location.reload();
}

clearButton.addEventListener("click", clearScores)

var topScores = getTopScores();
loadScores(topScores);