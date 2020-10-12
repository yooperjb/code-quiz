var timerEl = document.querySelector(".timer");
var questionEl = document.querySelector(".question");
var optionsEl = document.querySelector(".options");
var highScoresListEl = document.querySelector(".high-scores");
var outcomeEl = document.querySelector(".outcome");
var finalScoreEl = document.querySelector(".quiz-score");
var quizCompleteEl = document.querySelector("#quiz-complete");
var highScoreEl = document.querySelector("#high-score");
var goBackBtnEl = document.querySelector("#go-back");
var clearScoreBtnEl = document.querySelector("#clear-scores");
var submitInitialsBtn = document.querySelector("#scoresbtn");

let questionNum = 0;
let score = 0;
// Set Timer duration for quiz
let timer = 90;

var countdown = function () {
    //use setInterval for countdown timer
    var timeInterval = setInterval(function () {
        timerEl.textContent = "Time: " + timer;
        timer--;
        
        console.log("Question Num= " + questionNum);
        // when timer reaches zero or questions end, stop quiz
        if (timer <= 0 || questionNum === questions.length) {
            clearInterval(timeInterval);
            endQuiz();
        }
    }, 1000);
    // As timer decreases write out questions
    writeQuestion(questionNum);
};

var writeQuestion = function (num) {
    // check if num is greater than questions length
    if (num < questions.length) {
        questionEl.textContent = questions[num].q;

        // loop through question options
        for (let i = 0; i < questions[num].options.length; i++) {
            listItemEl = document.createElement("li");

            // set option items attributes 
            listItemEl.className = "list-option";
            listItemEl.setAttribute("option-num", i);
            // append option items to options list
            optionsEl.appendChild(listItemEl).textContent = questions[num].options[i];
        }
    }
    else {
        // If no more questions, clear outcome text and run endQuiz function
        outcomeEl.textContent = "";
        endQuiz();
    }
};

// compare clicked answer with correct answer
var answerCompare = function (optionNum) {
    //console.log("OptionNum = " + optionNum);
    // if question answered correctly
    if (parseInt(optionNum) === questions[questionNum].a) {
        outcomeEl.textContent = "Correct!"
        score++;
        questionNum++;
        optionsEl.textContent = "";
        writeQuestion(questionNum);
    }
    // if question answered incorrectly
    else {
        outcomeEl.textContent = "Incorrect!"
        questionNum++;
        timer = timer - 10
        optionsEl.textContent = "";
        writeQuestion(questionNum);
    }

};

var optionHandler = function (event) {
    var targetEl = event.target;

    // if question option is clicked on get option-num
    if (targetEl.matches(".list-option")) {
        var optionNum = targetEl.getAttribute("option-num");

        // call answerCompare function with optionNum
        answerCompare(optionNum);
    }
};

var endQuiz = function () {
    //display highscore div
    quizCompleteEl.style.display = "block";
    
    // clear quiz contents
    optionsEl.textContent = "";
    outcomeEl.textContent = "";
    questionEl.textContent = "All Done!";

    // display score and save to localStorage
    finalScoreEl.textContent = "Your final score is " + score;
};

var goHome = function () {
    location.href = "./index.html";
}

// Clear Scores from localStorage
var clearScores = function (event) {
    event.preventDefault();
    localStorage.setItem("scores", "");
    highScoresListEl.textContent = "";
}

// when submit button is clicked get initials and save to localStorage
var submitInitials = function(event) {
    event.preventDefault();
    // get values from initials input text box
    var initialsInput = document.querySelector("#initialsInput");
    
    // check initials not three characters alert user
    if (!(initialsInput.value.length === 3)) {
        window.alert("Please Enter Your 3 Initials");
        initialsInput.value = "";
    }
    
    else {
        // get scores from local storage and convert to object. Check if null.
        savedScores = localStorage.getItem("scores");
        if (savedScores){
            savedScores = JSON.parse(savedScores);
        }
        else {
            savedScores = [];
        }

        // add current score to savedScores, convert and set to localStorage
        savedScores.push({name: initialsInput.value, score: score});
        localStorage.setItem("scores", JSON.stringify(savedScores));

        // remove DOM elements
        quizCompleteEl.style.display = "none";
        finalScoreEl.style.display = "none";

        // add DOM elements
        highScoreEl.style.display = "block";
        questionEl.textContent = "High Scores";
        
        // create list elements of High Scores
        for (let i=0; i < savedScores.length; i++) {
            listItemEl = document.createElement("li");
            highScoresListEl.appendChild(listItemEl).textContent = savedScores[i].name + " - " + savedScores[i].score;
        }
    }
};

// run countdown on page load
countdown();

optionsEl.addEventListener("click", optionHandler);
goBackBtnEl.addEventListener("click", goHome);
clearScoreBtnEl.addEventListener("click", clearScores);
submitInitialsBtn.addEventListener("click", submitInitials);