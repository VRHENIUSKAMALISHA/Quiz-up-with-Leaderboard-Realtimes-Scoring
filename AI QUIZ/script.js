const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Paris", "Rome", "Madrid"], answer: "Paris" },
    { question: "Which language runs in browser?", options: ["Python", "C", "JavaScript", "Java"], answer: "JavaScript" },
    { question: "2 + 2 = ?", options: ["3", "4", "5", "6"], answer: "4" },
    { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
    { question: "Who is known as the Father of Computers?", options: ["Albert Einstein", "Charles Babbage", "Isaac Newton", "Alan Turing"], answer: "Charles Babbage" },
    { question: "Which is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"], answer: "Pacific Ocean" },
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Machine Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
    { question: "Which company developed JavaScript?", options: ["Microsoft", "Google", "Netscape", "Apple"], answer: "Netscape" },
    { question: "Which gas do plants absorb?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    { question: "What is the square root of 64?", options: ["6", "7", "8", "9"], answer: "8" },
    { question: "Which country is famous for the Eiffel Tower?", options: ["Italy", "Germany", "France", "Spain"], answer: "France" },
    { question: "Which device is used to input text into a computer?", options: ["Monitor", "Keyboard", "Mouse", "Printer"], answer: "Keyboard" },
    { question: "Which is the fastest land animal?", options: ["Lion", "Tiger", "Cheetah", "Horse"], answer: "Cheetah" },
    { question: "Which programming language is known for styling web pages?", options: ["HTML", "CSS", "Python", "C++"], answer: "CSS" },
    { question: "Which is the smallest prime number?", options: ["0", "1", "2", "3"], answer: "2" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 10;
let timer;
let username = "";

function startQuiz() {
    username = document.getElementById("username").value.trim();
    if (!username) return alert("Enter your name");

    document.getElementById("startScreen").classList.add("hidden");
    document.getElementById("quizScreen").classList.remove("hidden");

    loadQuestion();
}

function loadQuestion() {
    clearInterval(timer);
    timeLeft = 10;
    startTimer();

    let q = questions[currentQuestion];
    document.getElementById("question").innerText = q.question;

    let optionsHTML = "";
    q.options.forEach(opt => {
        optionsHTML += `<button onclick="checkAnswer('${opt}')">${opt}</button>`;
    });

    document.getElementById("options").innerHTML = optionsHTML;
}
function checkAnswer(selected) {
    let correct = questions[currentQuestion].answer;
    let buttons = document.querySelectorAll("#options button");

    buttons.forEach(btn => {
        if (btn.innerText === correct) {
            btn.classList.add("correct"); // green
        }
        if (btn.innerText === selected && selected !== correct) {
            btn.classList.add("wrong"); // red
        }
        btn.disabled = true;
    });

    if (selected === correct) {
        score += 10;
        document.getElementById("score").innerText = score;
    }

    setTimeout(() => {
        nextQuestion();
    }, 1000);
}
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function startTimer() {
    document.getElementById("time").innerText = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").innerText = timeLeft;

        if (timeLeft === 0) {
            nextQuestion();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);

    document.getElementById("quizScreen").classList.add("hidden");
    document.getElementById("resultScreen").classList.remove("hidden");

    document.getElementById("finalScore").innerText = score;

    saveScore();
    loadLeaderboard();

    document.getElementById("leaderboardSection").classList.remove("hidden");
}

function saveScore() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

    leaderboard.push({ name: username, score: score });

    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);

    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}

function loadLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let list = document.getElementById("leaderboardList");

    list.innerHTML = "";

    leaderboard.forEach(player => {
        let li = document.createElement("li");
        li.innerText = `${player.name} - ${player.score}`;
        list.appendChild(li);
    });
}

// Load leaderboard on page load
window.onload = loadLeaderboard;