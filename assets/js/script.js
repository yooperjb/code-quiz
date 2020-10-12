var questions = [
    { q: "What does API stand for?", options: ["Application Persistence Index", "Application Programming Interface", "American Petroleum Institute", "Array Processing Index"], a: 1 },
    { q: "A very useful tool used during development and debugging for printing content to the debugger is:", options: ["JavaScript", "for loops", "console.log", "gitbash"], a: 2 },
    { q: "Commonly used data types do NOT include:", options: ["strings", "booleans", "numbers", "alerts"], a: 3 },
    { q: "Arrays in JavaScript can be used to store:", options: ["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], a: 3 },
    { q: "Inside which HTML element do we put the JavaScript:", options: ["<script>", "<js>", "<scripting>", "<javascript>"], a: 0 },
    { q: "Where is the correct place to insert a JavaScript:", options: ["The <head> section", "The <body> section", "The <main> section", "Both the <body> and <head>"], a: 3 },
    { q: "How do you write 'Hello World' in an alert box:", options: ["msg('Hello World')", "alertBox('Hello World')", "msgBox('Hello World')", "alert('Hello World')"], a: 3 },
    { q: "How do you call a function named 'myFunction':", options: ["call function myFunction()", "myFunction()", "call myFunction()", "my.function"], a: 1 },
    { q: "What is the proper way to write an IF statement in JavaScript:", options: ["if i = 5 then", "if i == 5 then", "If (i === 5)", "if i=5"], a: 2 },
    { q: "How can you write a JavaScript comment:", options: ["<!-- This is a comment -->", "'This is a comment", "//This is a comment", "*This is a comment"], a: 2 }
];

//let highScores = [];

var timerEl = document.querySelector(".timer");
var questionEl = document.querySelector(".question");
var optionsEl = document.querySelector(".options");
var highScoresListEl = document.querySelector(".high-scores");
var outcomeEl = document.querySelector(".outcome");
var scoreEl = document.querySelector(".score");
var initialsEl = document.querySelector("#initials");
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
        
        console.log("Question Num= " +questionNum);
        // when timer reaches zero end quiz
        if (timer <= 0 || questionNum === questions.length) {
            clearInterval(timeInterval);
            //timerEl.textContent = "";
            endQuiz();
        }
    }, 1000);

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
            //console.log("Option: " + questions[num].options[i]);
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
    scoreEl.textContent = "Your final score is " + score;
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
        scoreEl.style.display = "none";

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