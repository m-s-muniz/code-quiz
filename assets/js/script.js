
// variables to to set default values
var time = 75;
var timerId;
var currentQuestionIndex = 0;

// variables to reference DOM elements....................................
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#start-button");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");


//create a function to start the Quiz
function startQuiz() {
    // hide start screen
    titleScreen.setAttribute("class", "hide");
  
    // un-hide questions section
    quizScreen.setAttribute("class", "show");
  
    // start timer
    timerId = setInterval(timer, 1000);
  
    // show starting time
    timeEl.textContent = time;
  
    getQuestion();
  }

    // create a function that will decress the time by 1 second
  function timer() {
    // update time
    time--;
    timeEl.textContent = time;
  
    // check if user ran out of time
    if (time <= 0) {
      quizEnd();
    }
  }
    // function to get questions
    
  function getQuestion() {
    // get current question object from array
    var currentQuestion = questions[currentQuestionIndex];
  
    // update title with current question
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
  
    // clear out any old question choices
    choicesEl.innerHTML = "";
  
    // loop thru all quiz questions
    currentQuestion.choices.forEach(function(choice, i) {
      // create new button for each choice
      var choiceBtn = document.createElement("button");
      choiceBtn.setAttribute("class", "choice");
      choiceBtn.setAttribute("value", choice);
  
      choiceBtn.textContent = i + 1 + ". " + choice;
  
    // attach click event listener to each choice
      choiceBtn.onclick = questionClick;
  
    // display on the page
      choicesEl.appendChild(choiceBtn);
    });
  }

    // click on question answer to either generate new question or end quiz if final question, and deduct time for answering wrong
    function questionClick() {
        // check if user guessed wrong
        if (this.value !== questions[currentQuestionIndex].answer) {
         // subtract time if answer is wrong
          time -= 10;
      
          if (time < 0) {
            time = 0;
          }
      
         // refresh new time on display
          timeEl.textContent = time;
      
          feedbackEl.textContent = "Wrong!";
        } else {
    
          feedbackEl.textContent = "Correct!";
        }
      
        // display right/wrong feedback on page for a second
        feedbackEl.setAttribute("class", "feedback");
        setTimeout(function() {
          feedbackEl.setAttribute("class", "feedback hide");
        }, 1000);
      
        // get next question
        currentQuestionIndex++;
      
        // check to see if there are any more questions
        if (currentQuestionIndex === questions.length) {
          quizEnd();
        } else {
          getQuestion();
        }
      }
    


   // user clicks button to start quiz
    startBtn.onclick = startQuiz;
  


