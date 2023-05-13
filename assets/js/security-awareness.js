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

const quiz_questions = [
    {
        question: "Do you read a company/website’s privacy policy before agreeing to the terms and conditions?",
        answers: [
            {answer: "Always", score: 5},
            {answer: "Often", score: 4},
            {answer: "Sometimes", score: 3},
            {answer: "Rarely", score: 2},
            {answer: "Never", score: 1}
        ]
    },
    {
        question: "When possible, how often do you use MFA (multiple authentication factors)?",
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
            {answer: "Always", score: 1},
            {answer: "Often", score: 2},
            {answer: "Sometimes", score: 3},
            {answer: "Rarely", score: 4},
            {answer: "Never", score: 5}
        ]
    },
    {
        question: "How many shared accounts do you have?",
        answers: [
            {answer: "4+", score: 1},
            {answer: "3", score: 2},
            {answer: "2", score: 3},
            {answer: "1", score: 4},
            {answer: "0", score: 5}
        ]
    },
    {
        question: "How many shared devices do you have?",
        answers: [
            {answer: "4+", score: 1},
            {answer: "3", score: 2},
            {answer: "2", score: 3},
            {answer: "1", score: 4},
            {answer: "0", score: 5}
        ]
    },
    {
        question: "Do you use a VPN or Password Manager?",
        answers: [
            {answer: "Yes, both", score: 5},
            {answer: "Yes, a VPN", score: 4},
            {answer: "Yes, a password manager", score: 3},
            {answer: "No", score: 2},
            {answer: "Why???", score: 1}
        ]
    },
    {
        question: "How often do you use public WiFi?",
        answers: [
            {answer: "Never", score: 5},
            {answer: "1-3 times / month", score: 4},
            {answer: "4-6 times / month", score: 3},
            {answer: "7-10 times / month", score: 2},
            {answer: "11+ times / month", score: 1}
        ]
    },
    {
        question: "Take this phishing test. How well did you score?",
        answers: [
            {answer: "8-10", score: 5},
            {answer: "6-7", score: 4},
            {answer: "4-5", score: 3},
            {answer: "2-3", score: 2},
            {answer: "0-1", score: 1}
        ]
    },
    {
        question: "Your computer has been held ransom and you can no longer access your files. What is your first action?",
        answers: [
            {answer: "Take a Photo", score: 5},
            {answer: "Alert law enforcement", score: 3},
            {answer: "Try a decryption tool", score: 3},
            {answer: "Quarantine the affected system", score: 4},
            {answer: "Pay the ransom", score: 1}
        ]
    },
    {
        question: "How often do you back up important files?",
        answers: [
            {answer: "Every day", score: 5},
            {answer: "Every week", score: 4},
            {answer: "Every month", score: 3},
            {answer: "Every year", score: 2},
            {answer: "Never", score: 1}
        ]
    },
    {
        question: "Which of the following is NOT indicative of a computer virus?",
        answers: [
            {answer: "Slow performance", score: 0},
            {answer: "Missing files", score: 0},
            {answer: "Pop-up windows", score: 0},
            {answer: "Disk full", score: 5},
            {answer: "System crashes", score: 0}
        ]
    },
    {
        question: "How often do you scan your computer for malware?",
        answers: [
            {answer: "Every day", score: 5},
            {answer: "Every week", score: 5},
            {answer: "Every month", score: 4},
            {answer: "Every year", score: 3},
            {answer: "Never", score: 1}
        ]
    },
    {
        question: "Do you click hyperlinks without knowing their addresses?",
        answers: [
            {answer: "Always", score: 1},
            {answer: "Often", score: 2},
            {answer: "Sometimes", score: 3},
            {answer: "Rarely", score: 4},
            {answer: "Never", score: 5}
        ]
    },
    {
        question: "How many public social media accounts do you have?",
        answers: [
            {answer: "3+", score: 1},
            {answer: "2", score: 2},
            {answer: "1", score: 3},
            {answer: "0", score: 4},
            {answer: "I don't have social media", score: 5}
        ]
    }
];

const suggestions = [
    "Always fully read a company/website's privacy policy before agreeing to their terms and conditions.",
    "Consider using MFA (multiple authentication factors) whenever possible.",
    "To prevent stuffing, do not repeatedly use the same passwords for different accounts. Attackers will often try your credentials for one account on another.",
    "Be careful when sharing accounts. Only share your account credentials with people you trust, and be very careful of giving out adminstrator permissions.",
    "Be careful when sharing devices. Only share your device with people you trust, and be very careful of giving out administrator permissions.",
    "Consider using both a VPN and a password manager. VPNs protect your identity from companies, the government, and attackers, while password managers help you securely generate and store passwords for all your accounts.",
    "Try to avoid using public WiFi without a VPN. Attackers can use public networks to intercept your packets and inject viruses into your computer.",
    "Do not click suspicious links, images, or attachments. If unsure, check the official company/website's contact information and contact them to determine whether the email is legit.",
    "See the section on ransomware below.",
    "Important files should be backed up every week, preferably every day. Try to follow the 3-2-1 rule for backing up files.",
    "'Disk full' is not indicative of a computer virus. However, all of the other options are.",
    "It is recommended that you scan your computer for malware once a week.",
    "Never click a hyperlink without knowing its address. Hover over the link to preview its URL.",
    "Public social media accounts allow easy access to your personal information."
];

var question_index;
var quiz_active = false;
var score;
var responses;

function sleep(ms) {  
    return new Promise(resolve => setTimeout(resolve, ms));  
} 

function startQuiz() {
    question_index = 0;
    quiz_active = true;
    score = 0;
    responses = [];

    document.getElementById("quiz").style.display = "flex";
    document.getElementById("quiz__container").style.maxHeight = "90vh";
    let answers = document.getElementById("quiz__answers");
    if (answers === null) return;
    for (let i = 0; i < 5; i++) {
        let answer = document.createElement("li"); answer.classList.add("quiz__answers--choice"); answer.id = `quiz__answers--${i}`;
        answers.appendChild(answer);
        answer.addEventListener("click", function() { 
            responses.push(Number(answer.id.slice(-1)));
            if (quiz_active) nextQuestion(this);
        });
    }

    displayQuestion();
}

async function displayQuestion() {
    let info = quiz_questions[question_index];
    let question = document.getElementById("quiz__question");
    if (question_index == 7) {
        question.innerHTML = "";
        let phishing_test = document.createElement("a"); phishing_test.href = "https://phishingquiz.withgoogle.com/"; phishing_test.target = "_blank";
        phishing_test.innerHTML =  `${question_index + 1}.&nbsp;&nbsp;${info.question}`;
        question.appendChild(phishing_test);
    } else {
        question.innerHTML = `${question_index + 1}.&nbsp;&nbsp;${info.question}`;
    }
    let answers = document.getElementById("quiz__answers").children;
    for (let i = 0; i < info.answers.length; i++) {
        answers[i].innerHTML = info.answers[i].answer;
    }
    let quiz = document.getElementById("quiz__container"); quiz.classList.remove("fade");
}

async function nextQuestion(answer) {
    let quiz = document.getElementById("quiz__container");
    let answers = document.querySelectorAll(".quiz__answers--choice");
    let info = quiz_questions[question_index];
    
    score += info.answers[Number(answer.id.slice(-1))].score;
    question_index ++;

    Array.from(answers, function(answer_child) {
        answer_child.classList.remove("quiz__answers--choice"); answer_child.classList.add("quiz__answers--inactive");
    });
    answer.classList.remove("quiz__answers--inactive"); answer.classList.add("quiz__answers--active");

    quiz_active = false;
    // await sleep(1000);
    quiz.classList.add("fade");
    // await sleep(1000);
    quiz_active = true;

    Array.from(answers, function(answer_child) {
        answer_child.classList.add("quiz__answers--choice"); answer_child.classList.remove("quiz__answers--inactive");
    });
    answer.classList.remove("quiz__answers--active");

    if (question_index >= quiz_questions.length) {
        endQuiz(); 
        return;
    } else if (question_index ==  8) {
        document.getElementById("quiz__question").firstChild.remove();
    }

    displayQuestion();
}

function endQuiz() {
    let quiz = document.getElementById("quiz__container"); quiz.classList.remove("fade");
    document.getElementById("quiz__answers").remove();
    document.getElementById("quiz__question").innerHTML = `You are ${Math.round(score*100/70)}% digitally secure!`;

    let results = document.createElement("div"); results.id = "quiz__results";
    quiz.appendChild(results);

    let improvements = [];

    if (score == 70) improvements.push("You have no suggestions for improvement. Congratulations!");
    else {
        for (let i = 0; i < quiz_questions.length; i++) {
            if (quiz_questions[i].answers[responses[i]].score != 5) improvements.push(suggestions[i]);
        }
    }

    for (const improvement of improvements) {
        let suggestion = document.createElement("li");
        suggestion.innerHTML = improvement;
        results.appendChild(suggestion);
    }

    // console.log(improvements);

    quiz_active = false;
}


    // document.getElementById("quiz__answers").remove();
    // let answers = document.createElement("ul"); answers.id = "quiz__answers";

    // document.getElementById("quiz__container").remove();
    // let quiz = document.createElement("div"); quiz.id = "quiz__container"; quiz.style.maxHeight = "90vh"; // quiz.appendChild(answers);
    //     let results = document.createElement("div"); results.id = "quiz__results"; results.innerHTML = "SCORE: " + score;
    //     quiz.appendChild(results);
    // document.getElementById("quiz").appendChild(quiz);