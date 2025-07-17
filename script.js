// Dark mode toggle
const toggle = document.getElementById('themeToggle');
toggle.onclick = () => {
  document.body.classList.toggle('dark');
  localStorage.setItem("darkMode", document.body.classList.contains("dark"));
};

// Load saved dark mode
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark");
}

// To-Do List
function addTask() {
  const input = document.getElementById("taskInput");
  const taskText = input.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText;
  li.onclick = () => {
    if (li.classList.contains("done")) {
      li.remove();
    } else {
      li.classList.add("done");
    }
    saveTasks();
  };

  document.getElementById("taskList").appendChild(li);
  saveTasks();
  input.value = "";
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    tasks.push({ text: li.textContent, done: li.classList.contains("done") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const saved = JSON.parse(localStorage.getItem("tasks")) || [];
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  saved.forEach(task => {
    const li = document.createElement("li");
    li.textContent = task.text;
    if (task.done) li.classList.add("done");
    li.onclick = () => {
      if (li.classList.contains("done")) {
        li.remove();
      } else {
        li.classList.add("done");
      }
      saveTasks();
    };
    taskList.appendChild(li);
  });
}

// Pomodoro Timer
let timer;
let timeLeft = 25 * 60;

function startTimer() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      alert("Time's up!");
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function resetTimer() {
  clearInterval(timer);
  timeLeft = 25 * 60;
  updateTimerDisplay();
}

function updateTimerDisplay() {
  const minutes = String(Math.floor(timeLeft / 60)).padStart(2, '0');
  const seconds = String(timeLeft % 60).padStart(2, '0');
  document.getElementById("timerDisplay").textContent = `${minutes}:${seconds}`;
}

// Daily Quote
const quotes = [
  "Stay focused and never give up!",
  "Every day is a chance to grow.",
  "Discipline is the bridge between goals and accomplishment.",
  "Push yourself, because no one else is going to do it for you.",
  "Don’t stop until you’re proud."
];
document.getElementById("quoteText").textContent =
  quotes[new Date().getDate() % quotes.length];

// Init
loadTasks();
updateTimerDisplay();
