
window.addEventListener("DOMContentLoaded", function() {
    let play_quiz = document.getElementById("play_quiz");
    play_quiz.addEventListener("click", function() { if (quiz_active == false) startQuiz() });
});


var security_awareness_info = [
    {
        name: "Password/Credential Management",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Sharing Accounts/Devices",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Securing Devices",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Phishing",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Viruses",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Ransomware",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Viruses",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Clickbait",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    },
    {
        name: "Social Media",
        info: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",    
    }
];

function buildInfoBlocks() {
    let section = document.getElementById("info__container");
    for (const obj of security_awareness_info) {
        let collapsible = document.createElement("div"); collapsible.classList.add("info__collapsible");
            let button = document.createElement("button"); button.classList.add("info__button"); button.innerHTML = obj.name;
            let content_container = document.createElement("div"); content_container.classList.add("info__content");
                let content_info = document.createElement("p"); content_info.innerHTML = obj.info;
                content_container.appendChild(content_info);
            collapsible.appendChild(button);
            collapsible.appendChild(content_container);

        section.appendChild(collapsible);
        button.addEventListener("click", function() {
            this.classList.toggle("info--active");
            let content = this.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
                content.style.padding = "0 1rem";
            } else {
                content.style.maxHeight = content.scrollHeight*2 + "px";
                content.style.padding = "1rem";
            }
        });
    }
}

var quiz_questions = [
    {
        question: "Do you use the same password for many different accounts?",
        answers: [
            {answer: "Always", score: 5},
            {answer: "Often", score: 4},
            {answer: "Sometimes", score: 3},
            {answer: "Rarely", score: 2},
            {answer: "Never", score: 1}
        ]
    },
    {
        question: "Do you use the same password for many different accounts?",
        answers: [
            {answer: "Always", score: 5},
            {answer: "Often", score: 4},
            {answer: "Sometimes", score: 3},
            {answer: "Rarely", score: 2},
            {answer: "Never", score: 1}
        ]
    },
    {
        question: "Do you use the same password for many different accounts?",
        answers: [
            {answer: "Always", score: 5},
            {answer: "Often", score: 4},
            {answer: "Sometimes", score: 3},
            {answer: "Rarely", score: 2},
            {answer: "Never", score: 1}
        ]
    }
];

var question_index;
var quiz_active = false;
var score;

function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
} 

function startQuiz() {
    console.log("start");
    question_index = 0;
    quiz_active = true;
    score = 0;
    displayQuestion();
}

async function displayQuestion() {
    console.log("question");
    let info = quiz_questions[question_index];
    document.getElementById("quiz__question").innerHTML = `${question_index + 1}.&nbsp;&nbsp;${info.question}`;
    let answers = document.getElementById("quiz__answers");
    for (let i = 0; i < info.answers.length; i++) {
        let answer = document.createElement("li"); answer.classList.add("quiz__answers--choice"); answer.id = `quiz__answers--${i}`; answer.innerHTML = info.answers[i].answer;
        answers.appendChild(answer);
        answer.addEventListener("click", function() { nextQuestion(this) });
    }
    let quiz = document.getElementById("quiz__container"); quiz.classList.remove("fade");
}

async function nextQuestion(answer) {
    console.log("next");
    let quiz = document.getElementById("quiz__container");
    let answers = document.getElementById("quiz__answers"); let answers_children = answers.children;
    let info = quiz_questions[question_index];
    for (let i = 0; i < answers.length; i++) {
        answers_children[i].classList.remove("quiz__answers--choice"); answers_children[i].classList.add("quiz__answers--inactive");
    }
    answer.classList.remove("quiz__answers--inactive"); answer.classList.add("quiz__answers--active");
    score += info.answers[Number(answer.id.slice(-1))].score;
    question_index ++;

    await sleep(1000);
    quiz.classList.add("fade");

    answers.remove();

    if (question_index >= quiz_questions.length) {
        endQuiz(); 
        return;
    }

    let new_answers = document.createElement("ul"); new_answers.id = "quiz__answers";
    quiz.appendChild(new_answers);

    displayQuestion();
}

function endQuiz() {
    console.log('end');
    console.log(score);
    document.getElementById("quiz__question").innerHTML = "THE END";
    game_active = false;
}