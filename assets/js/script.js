var questions = [
    {q:"What does API stand for?", options:["Application Persistence Index", "Application Programming Interface", "American Petroleum Institute", "Array Processing Index"], a: 1},
    {q:"A very useful tool used during development and debugging for printing content to the debugger is:", options:["JavaScript","for loops","console.log","gitbash"], a:2},
    {q:"Commonly used data types do NOT include:", options:["strings", "booleans", "numbers", "alerts"], a:3},
    {q:"Arrays in JavaScript can be used to store:", options:["Numbers and Strings", "Other arrays", "Booleans", "All of the above"], a:3},
    {q:"Inside which HTML element do we put the JavaScript:", options:["<script>", "<js>", "<scripting>", "<javascript>"], a:0},
    {q:"Where is the correct place to insert a JavaScript:", options:["The <head> section", "The <body> section", "The <main> section","Both the <body> and <head>"],a:3},
    {q:"How do you write 'Hello World' in an alert box:", options:["msg('Hello World')","alertBox('Hello World')","msgBox('Hello World')","alert('Hello World')"],a:3},
    {q:"How do you call a function named 'myFunction':", options:["call function myFunction()", "myFunction()", "call myFunction()", "my.function"], a:1},
    {q:"What is the proper way to write an IF statement in JavaScript:", options:["if i = 5 then", "if i == 5 then", "If (i === 5)", "if i=5"], a:2},
    {q:"How can you write a JavaScript comment:", options:["<!-- This is a comment -->", "'This is a comment", "//This is a comment","*This is a comment"], a:2},

];

var timerEl = document.querySelector(".timer");
var questionEl = document.querySelector(".question");
var optionsEl = document.querySelector(".options");
var outcomeEl = document.querySelector(".outcome");
var scoreEl = document.querySelector(".score");
var initialsEl = document.querySelector("#initials");
let questionNum = 0;
let score = 0;


var countdown = function() {
    // Set Timer duration for quiz
    var timer = 10;

    //use setInterval for countdown timer
    var timeInterval = setInterval(function(){
        timerEl.textContent = "Time: " + timer;
        timer --;

        // if timer === 0 end quiz
        if (timer === 0) {
            clearInterval(timeInterval);
            timerEl.textContent = "";
            endQuiz();
        }
        
    },1000);

        writeQuestion(questionNum);
    
};


var writeQuestion = function(num) {
    // check if num is greater than questions length
    console.log("Num = " + num);
    if (num < questions.length) {
        questionEl.textContent = questions[num].q;
        console.log("Question: " + questions[num].q)
        
        // loop through options
        for (let i = 0; i < questions[num].options.length; i++){
            listItemEl = document.createElement("li");
            
            // set option items attributes 
            listItemEl.className = "list-option";
            listItemEl.setAttribute("option-num", i);
            // append option items to options list
            optionsEl.appendChild(listItemEl).textContent = questions[num].options[i];
            console.log("Option: " + questions[num].options[i]);
        }
    }
    else {
        // If no more questions clear outcome text and run endQuiz function
        outcomeEl.textContent = "";
        endQuiz();
    }
    
  
};

// compare clicked answer with correct answer
var answerCompare = function(optionNum) {
    console.log("OptionNum = " + optionNum);
    // if question answered correctly
    if (parseInt(optionNum) === questions[questionNum].a) {
        outcomeEl.textContent = "Correct!"
        score ++
        questionNum ++;
        optionsEl.textContent = "";
        writeQuestion(questionNum);
    }
    // if question answered incorrectly
    else {
        outcomeEl.textContent = "Incorrect!"
        questionNum ++;
        timer = timer -10
        optionsEl.textContent = "";
        writeQuestion(questionNum);
    }
    
};

var optionHandler = function(event) {
    var targetEl = event.target;
    
    // if question option is clicked on get option-num
    if (targetEl.matches(".list-option")) {
        var optionNum = targetEl.getAttribute("option-num");

       // call answerCompare function with optionNum
        answerCompare(optionNum);
    }
};

var endQuiz = function() {
    // clear quiz contents and display score and initials input
    optionsEl.textContent = "";
    outcomeEl.textContent = "";
    questionEl.textContent = "All Done!";
    scoreEl.textContent = "Your final score is " + score;
    //var inputEl = initialsEl.appendChild("input")
    initialsEl.innerHTML = "Enter Initials";
};


countdown();
optionsEl.addEventListener("click", optionHandler);