//References
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let videoContainer = document.getElementById("video-container");
let videoSource = document.getElementById("AIVideo").src;
let scoreContainer = document.querySelector(".score-container");
let submit = document.getElementById("submit-button");
let userScore = document.getElementById("user-score");
let Result = document.getElementById("result");
let Alert = document.getElementById("alert");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 61;
let countdown;

//Questions and Options array

const quizArray = [
  {
    id: "0",
    question: "What feature does Einstein GPT for Sales offer?",
    options: ["Generate knowledge articles from past case notes",
               "Deliver AI-powered customer insights in Slack.",
                "Auto-generate sales tasks like composing emails and scheduling meetings."],
    correct: "Auto-generate sales tasks like composing emails and scheduling meetings.",
  },
  {
    id: "1",
    question: "Which Einstein GPT function helps in increasing customer satisfaction through personalized service interactions?",
    options: ["Einstein GPT for Sales.",
               "Einstein GPT for Service.",
                "Einstein GPT for Marketing."],
    correct: "Einstein GPT for Service.",
  },
  {
    id: "2",
    question: "Which of the following languages can the Einstein GPT for Developers' AI chat assistant cater to?",
    options: ["JavaScript",
               "Python",
                "Apex"],
    correct: "Apex",
  },
  {
    id: "3",
    question: "Approximately how many AI-powered predictions does the current Einstein technology deliver per day across the Customer 360?",
    options: ["100 billion",
               "200 billion",
                "500 billion"],
    correct: "200 billion",
  },
  {
    id: "4",
    question: "What is Einstein Studio?",
    options: ["A place where all the Einstein components can be accessed.",
               "An app in Salesforce to create new Einstein solutions.",
                "A “Bring your own model” solution that enables easy use of AI models."],
    correct: "A “Bring your own model” solution that enables easy use of AI models.",
  },
  {
    id: "5",
    question: "Which is not a principle of building Ethical GPT?",
    options: ["Transparent",
               "Sustainable",
                "Replication"],
    correct: "Replication",
  },
];

//Submit Quiz
submit.addEventListener("click", () => {
  //entering in database 
  fetch("http://localhost:8080/api/marksEntry", {
     
  // Adding method type
  method: "POST",
  
  // Adding body or contents to send
  body: JSON.stringify({
      email: document.getElementById("email").value,
      name: document.getElementById("name").value,
      company: document.getElementById("company").value,
      score: scoreCount
  }),
  
  // Adding headers to the request
  headers: {
      "Content-type": "application/json; charset=UTF-8"
  }
  })

  // Converting to JSON
  .then(response => response.json())

  // Displaying results to console
  .then(json => console.log(json));

  //setting start form fields to null
  document.getElementById("email").value = "";
  document.getElementById("name").value = "";
  document.getElementById("company").value = "";
  Alert.innerHTML = "";


  startScreen.classList.remove("hide");
  scoreContainer.classList.add("hide");
 
});

//Next Button
nextBtn.addEventListener(
  "click",
  (displayNext = () => {
    //increment questionCount
    questionCount += 1;
    //if last question
    if (questionCount == quizArray.length) {
      //hide question container and display score
      videoContainer.classList.add("hide");
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      document.getElementById("AIVideo").src = "";
      
      //user score
      userScore.innerHTML =
          "Your score is " + scoreCount + " out of " + questionCount;
      if(scoreCount>3){
        Result.innerHTML = "Congratulations, You are eligible for free SWAG!"
      }
      else{
        Result.innerHTML = "Sorry, Better luck next time!"
      }
    } else {
      //display questionCount
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      //display quiz
      quizDisplay(questionCount);
      count = 61;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

//Timer
const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

//Display quiz
const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  //Hide other cards
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });
  //display current question card
  quizCards[questionCount].classList.remove("hide");
  document.getElementById("AIVideo").src = `./Videos/Question${questionCount+1}.mp4`;
};

//Quiz Creation
function quizCreator() {
  // //randomly sort questions
  // quizArray.sort(() => Math.random() - 0.5);
  //generate quiz
  for (let i of quizArray) {
    //randomly sort options
    // i.options.sort(() => Math.random() - 0.5);
    //quiz card creation
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    //question number
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    //question
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    //options
    div.innerHTML += `
    <div><button class="option-div" onclick="checker(this)">${i.options[0]}</button></div>
     <div><button class="option-div" onclick="checker(this)">${i.options[1]}</button></div>
      <div><button class="option-div" onclick="checker(this)">${i.options[2]}</button></div>
    `;
    quizContainer.appendChild(div);
  }
}

//Checker Function to check if option is correct or not
function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  //if user clicked answer == correct option stored in object
  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    //For marking the correct option
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  //clear interval(stop timer)
  clearInterval(countdown);
  //disable all options
  options.forEach((element) => {
    element.disabled = true;
  });
}

//initial setup
function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 61;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

//to check if email already exist
function auth() {
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let company = document.getElementById("company").value;


  fetch("http://localhost:8080/api/marksList")
  .then((data)=>{
    return data.json()
  })
  .then((object)=>{
    console.log(email);
    console.log(object);

    let boolVal=true;

    if(name == "" || company == "" || email ==""){
      boolVal = false;
      Alert.innerHTML = "Please fill all the details."
    }

    for (let i = 0; i < object.length; i++) {
      console.log(object[i].email_id);
      if(object[i].email_id === email){
        boolVal=false;
        Alert.innerHTML = "It seems you have already used this e-mail."
        break;
      }
    }

    checkData(boolVal);
  });
}

function checkData(checkVal){
  if(checkVal) {
  startScreen.classList.add("hide");
  videoContainer.classList.remove("hide");
  displayContainer.classList.remove("hide");
  initial();
  }
}

//when user click on start button
startButton.addEventListener("click", () => {
  let val= auth();
});

//hide quiz and display start screen
window.onload = () => {
  startScreen.classList.remove("hide");
  videoContainer.classList.add("hide");
  displayContainer.classList.add("hide");
};
