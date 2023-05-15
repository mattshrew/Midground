window.addEventListener("DOMContentLoaded", function() {
    let play_quiz = document.getElementById("play_quiz");
    play_quiz.addEventListener("click", function() { if (quiz_active == false) startQuiz() });
});


const security_awareness_info = [
    {
        name: "Privacy",
        info: ["Privacy is important. Your PII (personally identifiable information) is constantly being stored by organizations, either to improve your online experience or sell your data to third parties. To see how your PII is being used, read the organization’s privacy policy. Businesses/websites that collect or use personal information are legally required to have and post a privacy policy. Privacy policies should disclose how the organization uses your PII, cookies, logging, and tracking. Be sure to thoroughly read this before agreeing to the terms and conditions."],    
    },
    {
        name: "Password/Credential Management",
        info: ["Passwords are a form of authentication used to prove that a user owns an account. Attackers are constantly attempting to uncover users’ passwords by guessing, stuffing, using phishing attacks, or infecting devices with malware. Read the sections on securing devices and phishing for more information. To prevent attackers from guessing and brute-forcing (using a computer to try every combination), make sure to have very strong passwords. Make longer passwords and use lowercase letters, uppercase letters, and symbols to exponentially increase the number of possible combinations. For example, a random password of 8 lowercase letters would take less than a week for a computer to crack. In comparison, a 12-character password containing lowercase letters, uppercase letters, and symbols would take the same computer 19 billion years to uncover. Finally, do not use the same password for multiple accounts. If attackers manage to uncover just one of these, all of your other accounts will be compromised."],    
    },
    {
        name: "Multi-Factor Authentication",
        info: ["MFA (multi-factor authentication) is a more secure way of protecting your account. MFA involves using multiple authentication factors to prove your identity: knowledge (something you know), possession (something you have), and inherence (something you are). For example, patterns, passwords, and PINs are evidence based on knowledge. Authentication by possession includes phones and keys, while evidence based on inherence comprises fingerprint and retinal scans. MFA means using pieces of information from multiple distinct factors and prevents 100% of attacks from automated bots, greatly reducing the chance of unauthorized access to your account."],    
    },
    {
        name: "Encryption",
        info: ["Encryption is scrambling data to make it unreadable from everyone but the receiver (who has the “secret key”). This enables computers to share confidential information over open networks. There are 2 types of encryption: symmetric and asymmetric encryption.",
        "In symmetric encryption, the same key is used to encrypt and decrypt the message. The Caesar Cipher is a famous example of symmetric encryption. In asymmetric encryption (also known as public key encryption), a pair of mathematically related keys are used to encrypt and decrypt the message. First, the receiver generates a private key (never shared) and a corresponding public key, by multiplying 2 extremely large prime numbers. Then, the receiver sends the public key to the sender. The sender encrypts the message using the public key and a nearly irreversible mathematical operation. The sender now safely sends the encrypted message to the receiver, who decrypts it with their private key. This is much more secure, as the private key (used to decrypt the message) is never shared and cannot be intercepted.",
        "However, this type of encryption is much slower, due to the complexity of the keys and the mathematical operation. Some messaging apps avoid this problem by using the TLS protocol. Here’s the process: First, the client performs a TCP handshake with the server. It sends a request to the server (containing the TLS protocol version and the desired encryption techniques). The server responds with a digital certificate (issued by a certificate authority—a trusted organization that issues digital certificates to websites) containing the public key. After verifying the certificate, the client encrypts a pre-master key with the server’s public key. The server uses its private key to decrypt the pre-master key, which is then used to compute the shared key. The client and server can now use symmetrical encryption, without fear of attackers uncovering the shared key. This is much faster than public key encryption, and is often used in secure email sending and uploading files.",
        "HTTPS is a secure way of sending data between a web server and browser. It is a secure version of the Hypertext Transfer Protocol (HTTP) and is used on most websites. This protocol uses public key encryption and the TLS handshake. NEVER submit personal information on unsecured websites."],    
    },
    {
        name: "Sharing Accounts/Devices",
        info: ["Sharing accounts and devices is very common. Make sure that all users can be trusted and understand how to be digitally secure. Use strong and different passwords to avoid brute-force and stuffing attacks. When sharing devices, it can be difficult to trace the source of cybersecurity problems. In fact, insider threats are responsible for 60% of data breaches in the workplace. Try to use separate accounts and manage permissions for each (do not give administrative powers to untrustworthy people)."],    
    },
    {
        name: "Securing Devices",
        info: ["To secure your devices, use strong passwords. Consider getting a password manager to generate and securely store your passwords. VPN connections can establish more secure connections to the internet and protect your data traffic from outsiders via encryption. Be especially careful when downloading content from the internet. Malware can exist in EXE, SCR, VBS, RTF, XLS, ZIP, and even DOC, PDF, and JPEG files. When connecting to public WiFi, confirm that you are connecting to the actual network, and not a rogue access point (an unauthorized access point installed on a network that can intercept and change the data flowing through the network). On mobile devices, always use a screen lock to ensure your device’s security. This requires you to enter a PIN, pattern, or password upon waking or turning on the device."],    
    },
    {
        name: "Phishing",
        info: ["Phishing attacks are extremely common and happen to everyone. Phishing is an attempt to trick a user into divulging private information. Typically, these attacks are sent via email or SMS, from a fake website/company. Attackers try to fool users by using misspellings, different characters, and subdomains to pretend to be an official website/company. They ask for personal information (through email reply or a fake copy of the official website). To keep yourself safe, never click suspicious links, images, or download attachments. If you are unsure, check the website/company’s official contact information. Contact them to see if the email is real."],    
    },
    {
        name: "Ransomware",
        info: ["Ransomware is a type of computer malware that holds the computer hostage. This type of program encrypts the user’s data and blocks access to many applications. The program asks the user to pay a ransom in some specified amount of time, in exchange for their computer back. To avoid this, follow the suggestions to secure your device above. It is also very important to back up your important files. Consider using the 3-2-1 backup strategy. This involves keeping 3 copies of the original file, 2 copies in different media forms, and 1 copy off-site for emergencies. However, if this does happen, do not rush to pay the ransom. Some ransomware programs do not keep their word, and others may mark you down for easy reinfection. First, take a picture of the ransomware message. Quarantine the affected system, as the program may move to other systems on the network. Try a decryption tool to retrieve your files and disconnect your backups (many advanced ransomware programs go after your backups). Change all your passwords and contact law enforcement."],    
    },
    {
        name: "Viruses",
        info: ["Viruses are self-replicating pieces of computer malware. These programs copy themselves into other files and sometimes other devices. They may hide in the code of a legitimate program. Viruses disrupt systems, steal and delete data, and cause major operational issues. Signs of viruses include pop-up windows, slower processing speeds, self-starting and executing programs, missing files, and system crashes."],    
    },
    {
        name: "Clickbait",
        info: ["Clickbait is a piece of text or an image designed to attract the attention of the viewer and entice them to click the link. A useful trick is to hover over a link or image to see its real address. Examine the URL’s domain before clicking to see if it is safe to visit."],    
    },
    {
        name: "Social Media",
        info: ["To keep social media accounts secure, follow the suggestions for creating a strong password above. Whenever possible, use MFA (multi-factor authentication). To keep your data safe, make sure that your posts do not contain any direct, indirect, or linked PII. On public accounts, attackers can easily uncover your name, age, gender, and even your general location. Be cautious of messages (especially downloads or links) from strangers, or even hacked accounts of friends. Call your friends if you believe that their account may have been compromised."],    
    }
];


function buildInfoBlocks() {
    let section = document.getElementById("info__container");
    for (const obj of security_awareness_info) {
        let collapsible = document.createElement("div"); collapsible.classList.add("info__collapsible");
            let button = document.createElement("button"); button.classList.add("info__collapsible--button"); button.innerHTML = obj.name;
            let content_container = document.createElement("div"); content_container.classList.add("info__content");
                for (const info of obj.info) {
                    let content_info = document.createElement("p"); content_info.innerHTML = info;
                    content_container.appendChild(content_info);
                }
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



function expandInfoBlocks() {
    let buttons = document.querySelectorAll(".info__collapsible--button");
    Array.from(buttons, function(button) {
        button.classList.add("info--active");
        let content = button.nextElementSibling;
        content.style.maxHeight = content.scrollHeight*2 + "px";
        content.style.padding = "1rem";
    });
}

function collapseInfoBlocks() {
    let buttons = document.querySelectorAll(".info__collapsible--button");
    Array.from(buttons, function(button) {
        button.classList.remove("info--active");
        let content = button.nextElementSibling;
        content.style.maxHeight = null;
        content.style.padding = "0 1rem";
    });
}


const my_results = {
    name: "MY RESULTS",
    results: ["I am often wary of accepting cookies/terms of service on unfamiliar websites. I only accept necessary cookies and usually skim privacy policies before continuing.",
    "I use Google’s password manager to generate and store my passwords. Because of this, my passwords are all very strong and are rarely repeated across different accounts. I do not use a VPN.",
    "I try to use MFA (multi-factor authentication) as much as possible. On platforms that have an option for 2FA, I have this feature enabled. Attackers must have both my password and my phone to access my account on these websites. I do not regularly scan my computer for malware.",
    "I am very wary of using unsecured websites, and always try to avoid them.",
    "I share Netflix and Disney+ accounts with my cousins. However, I am not sure that they know how to be digitally secure. I do not possess any shared devices.",
    "I am very cautious of downloading content from the internet. If I cannot trust the source, I will not risk downloading malware. All of my devices are password-protected.",
    "My inbox receives a lot of phishing emails, which are all immediately deleted. Most are very easy to discern—with their poorly disguised email addresses, misspelled words, and clickbait-y hyperlinks.",
    "I always hover over hyperlinks before clicking them, and have never experienced a virus or ransomware attack. However, I have never backed up my important files.",
    "All of my social media accounts are private. Strangers cannot see my posts."],
    suggestions: ["Always fully read a company/website's privacy policy before agreeing to their terms and conditions.",
    "Consider using a VPN. VPNs protect your identity from companies, the government, and attackers.",
    "Important files should be backed up every week, preferably every day. Try to follow the 3-2-1 rule for backing up files.",
    "It is recommended that you scan your computer for malware once a week."]
}

function buildMyResults() {
    let section = document.getElementById("results__container");
    let collapsible = document.createElement("div"); collapsible.classList.add("info__collapsible");
        let button = document.createElement("button"); button.classList.add("info__collapsible--button"); button.id = "results__title"; button.innerHTML = my_results.name;
        let content_container = document.createElement("div"); content_container.classList.add("info__content"); content_container.id = "results__content";
            let content_results_title = document.createElement("h2"); content_results_title.innerHTML = "My score: 84%";
                content_container.appendChild(content_results_title);
            let content_results = document.createElement("ul");
                for (const result of my_results.results) {
                    let content_result = document.createElement("li"); content_result.innerHTML = result;
                    content_results.appendChild(content_result);
                }
                content_container.appendChild(content_results);
            content_container.appendChild(document.createElement("br"));
            let content_suggestions_title = document.createElement("h2"); content_suggestions_title.innerHTML = "Suggestions for improvement";
            content_container.appendChild(content_suggestions_title);
            let content_suggestions = document.createElement("ul");
                for (const suggestion of my_results.suggestions) {
                    let content_suggestion = document.createElement("li"); content_suggestion.innerHTML = suggestion;
                    content_suggestions.appendChild(content_suggestion);
                }
                content_container.appendChild(content_suggestions);
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

const quiz_questions = [
    {
        question: "Enter a password of similar complexity to what you would usually use.",
        answers: [
            {answer: "", score: 1},
            {answer: "", score: 2},
            {answer: "", score: 3},
            {answer: "", score: 4},
            {answer: "", score: 5}
        ]
    },
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
        question: "When possible, how often do you use MFA (multi-factor authentication)?",
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
        question: "Which of the following file types can malware exist in?",
        answers: [
            {answer: "EXE", score: 3},
            {answer: "JPEG", score: 3},
            {answer: "DOC", score: 3},
            {answer: "PDF", score: 3},
            {answer: "All of the above", score: 5}
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
    "To prevent attackers from guessing and brute-forcing, make sure to choose a strong password. Make longer passwords with lowercase, uppercase, and special characters.",
    "Always fully read a company/website's privacy policy before agreeing to their terms and conditions.",
    "Consider using MFA (multi-factor authentication) whenever possible.",
    "To prevent stuffing, do not repeatedly use the same passwords for different accounts. Attackers will often try your credentials for one account on another.",
    "Be careful when sharing accounts. Only share your account credentials with people you trust, and be very careful of giving out adminstrator permissions.",
    "Be careful when sharing devices. Only share your device with people you trust, and be very careful of giving out administrator permissions.",
    "Consider using both a VPN and a password manager. VPNs protect your identity from companies, the government, and attackers, while password managers help you securely generate and store passwords for all your accounts.",
    "Try to avoid using public WiFi without a VPN. Attackers can use public networks to intercept your packets and inject viruses into your computer.",
    "Be very careful when downloading files from the internet. Malware can exist in in EXE, SCR, VBS, RTF, XLS, ZIP, and even DOC, PDF, and JPEG files.",
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
    let quiz = document.getElementById("quiz__container"); quiz.style.maxHeight = "90vh"; quiz.style.padding = "8vh 76px";
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
    if (question_index == 9) {
        question.innerHTML = "";
        let phishing_test = document.createElement("a"); phishing_test.href = "https://phishingquiz.withgoogle.com/"; phishing_test.target = "_blank";
        phishing_test.innerHTML =  `${question_index + 1}.&nbsp;&nbsp;${info.question}`;
        question.appendChild(phishing_test);
    } else {
        question.innerHTML = `${question_index + 1}.&nbsp;&nbsp;${info.question}`;
    }
    let answers = document.getElementById("quiz__answers").children;
    if (question_index == 0) {
        document.getElementById("quiz__answers").style.display = "none";
        let form = document.createElement("div"); form.id = "quiz__password";
            let input = document.createElement("input"); input.type = "text"; input.id = "quiz__password--input"; input.autocomplete = "off"; input.maxLength = "41";
            let submit = document.createElement("button"); submit.type = "button"; submit.id = "quiz__password--submit"; submit.onclick = function() { checkPassword() }; submit.innerHTML = "SUBMIT";
            form.appendChild(input);
            form.appendChild(submit);
        document.getElementById("quiz__container").appendChild(form);
    } else {
        for (let i = 0; i < info.answers.length; i++) {
            answers[i].innerHTML = info.answers[i].answer;
        }
    }

    if (question_index == 1) {
        document.getElementById("quiz__password").remove();
        document.getElementById("quiz__answers").style.display = "flex";
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
    await sleep(1000);
    quiz.classList.add("fade");
    await sleep(1000);
    quiz_active = true;

    Array.from(answers, function(answer_child) {
        answer_child.classList.add("quiz__answers--choice"); answer_child.classList.remove("quiz__answers--inactive");
    });
    answer.classList.remove("quiz__answers--active");

    if (question_index >= quiz_questions.length) {
        endQuiz(); 
        return;
    } else if (question_index == 10) {
        document.getElementById("quiz__question").firstChild.remove();
    } 

    displayQuestion();
}

function endQuiz() {
    let quiz = document.getElementById("quiz__container"); quiz.classList.remove("fade");
    document.getElementById("quiz__answers").remove();
    document.getElementById("quiz__question").innerHTML = `You are ${Math.round(score*100/80)}% digitally secure!`;

    let results = document.createElement("div"); results.id = "quiz__results";
    quiz.appendChild(results);

    let improvements = [];

    if (Math.round(score*100/80) != 100) {
        for (let i = 0; i < quiz_questions.length; i++) {
            if (quiz_questions[i].answers[responses[i]].score != 5) improvements.push(suggestions[i]);
        }

        for (const improvement of improvements) {
            let suggestion = document.createElement("li");
            suggestion.innerHTML = improvement;
            results.appendChild(suggestion);
        }
    } else {
        results.innerHMTL = "You have no suggestions for improvement. Congratulations!";
    }

    

    // console.log(improvements);

    quiz_active = false;
}

const characters = [/[a-z]/, /[A-Z]/, /[!-\/:-@[-`{-~]/];
const characters_length = [26, 26, 32];

async function checkPassword() {
    let password = document.getElementById("quiz__password--input").value;
    let base = 0;
    for (let i = 0; i < characters.length; i++) {
        if (characters[i].test(password)) base += characters_length[i];
    }
    let combinations = base ** password.length;
    if (combinations < 320000000) strength = 1;
    else if (combinations < 15000000000) strength = 2;
    else if (combinations < 10e12) strength = 3;
    else if (combinations < 10e15) strength = 4;
    else strength = 5;

    score += strength;
    responses.push(strength - 1);

    quiz_active = false;
    await sleep(1000);
    document.getElementById("quiz__container").classList.add("fade");
    await sleep(1000);
    quiz_active = true;

    question_index ++;
    displayQuestion();
}


    // document.getElementById("quiz__answers").remove();
    // let answers = document.createElement("ul"); answers.id = "quiz__answers";

    // document.getElementById("quiz__container").remove();
    // let quiz = document.createElement("div"); quiz.id = "quiz__container"; quiz.style.maxHeight = "90vh"; // quiz.appendChild(answers);
    //     let results = document.createElement("div"); results.id = "quiz__results"; results.innerHTML = "SCORE: " + score;
    //     quiz.appendChild(results);
    // document.getElementById("quiz").appendChild(quiz);