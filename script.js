// Task array
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
function addTask() {

    const taskInput = document.getElementById("taskInput");
    const stats = document.getElementById("stats");

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const task = {
        text: taskText,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    renderTasks();

    taskInput.value = "";
}

// Render Tasks
function renderTasks(filter = "all") {

    const taskList = document.getElementById("taskList");

    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (filter === "completed") {

        filteredTasks = tasks.filter(
            task => task.completed
        );

    } else if (filter === "pending") {

        filteredTasks = tasks.filter(
            task => !task.completed
        );
    }

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");

        // Left Side
        const leftDiv = document.createElement("div");

        leftDiv.classList.add("task-left");

        // Checkbox
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";

        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {

            task.completed = checkbox.checked;

            saveTasks();

            renderTasks(filter);
        });

        // Task Text
        const span = document.createElement("span");

        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        // Delete Button
        const deleteBtn = document.createElement("button");

        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = () => {

            tasks.splice(index, 1);

            saveTasks();

            renderTasks(filter);
        };

        leftDiv.appendChild(checkbox);

        leftDiv.appendChild(span);

        li.appendChild(leftDiv);

        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    updateStats();
}

// Update Stats
function updateStats() {

    const stats = document.getElementById("stats");

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    const pending = total - completed;

    const efficiency =
        total === 0
        ? 0
        : Math.round((completed / total) * 100);

    stats.innerHTML = `
        Total Tasks: ${total} |
        Completed: ${completed} |
        Pending: ${pending} |
        Efficiency: ${efficiency}%
    `;
}

// Save Tasks
function saveTasks() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

// Filter Tasks
function filterTasks(type) {

    renderTasks(type);
}

// DARK MODE
const darkModeBtn =
    document.getElementById("darkModeBtn");

darkModeBtn.addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

    if (
        document.body.classList.contains(
            "dark-mode"
        )
    ) {

        darkModeBtn.innerHTML =
            "☀️ Light Mode";

    } else {

        darkModeBtn.innerHTML =
            "🌙 Dark Mode";
    }
});

// Initial Render
renderTasks();
