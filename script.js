let totalTasks = 0;
let completedTasks = 0;

/* Load Tasks When Page Opens */
window.onload = function () {

    loadTasks();

    updateStats();

    loadTheme();
};

/* Enter Key Support */
document
    .getElementById("taskInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            addTask();
        }
});

/* Dark Mode Toggle */
document
    .getElementById("darkModeBtn")
    .addEventListener("click", function() {

        document.body.classList.toggle("dark-mode");

        /* Save Theme */
        if (document.body.classList.contains("dark-mode")) {

            localStorage.setItem("theme", "dark");

        } else {

            localStorage.setItem("theme", "light");
        }
});

/* Load Saved Theme */
function loadTheme() {

    if (
        localStorage.getItem("theme") === "dark"
    ) {

        document.body.classList.add("dark-mode");
    }
}

/* Add Task */
function addTask() {

    let taskInput =
        document.getElementById("taskInput");

    let dueDateInput =
        document.getElementById("dueDateInput");

    let taskText =
        taskInput.value.trim();

    let dueDate =
        dueDateInput.value;

    let errorMessage =
        document.getElementById("errorMessage");

    /* Validation */
    if (taskText === "") {

        errorMessage.innerText =
            "Please enter a task";

        return;
    }

    errorMessage.innerText = "";

    totalTasks++;

    createTaskElement(
        taskText,
        false,
        dueDate
    );

    taskInput.value = "";

    dueDateInput.value = "";

    updateStats();

    saveTasks();
}

/* Create Task Card */
function createTaskElement(
    taskText,
    isCompleted,
    dueDate
) {

    let li =
        document.createElement("li");

    /* Left Side Container */
    let taskLeft =
        document.createElement("div");

    taskLeft.classList.add("task-left");

    /* Checkbox */
    let checkbox =
        document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = isCompleted;

    /* Task Text */
    let span =
        document.createElement("span");

    span.innerText = taskText;

    /* Due Date */
    let dueDateSpan =
        document.createElement("small");

    dueDateSpan.classList.add("due-date");

    if (dueDate !== "") {

        dueDateSpan.innerText =
            "Due: " + dueDate;
    }

    /* Completed Style */
    if (isCompleted) {

        span.classList.add("completed");

        completedTasks++;
    }

    /* Checkbox Change */
    checkbox.onchange = function () {

        if (checkbox.checked) {

            span.classList.add("completed");

            completedTasks++;

        } else {

            span.classList.remove("completed");

            completedTasks--;
        }

        updateStats();

        saveTasks();
    };

    /* Edit Button */
    let editBtn =
        document.createElement("button");

    editBtn.innerText = "Edit";

    editBtn.onclick = function () {

        let updatedTask =
            prompt(
                "Edit your task:",
                taskText
            );

        if (
            updatedTask !== null &&
            updatedTask.trim() !== ""
        ) {

            taskText = updatedTask;

            span.innerText = updatedTask;

            saveTasks();
        }
    };

    /* Delete Button */
    let deleteBtn =
        document.createElement("button");

    deleteBtn.innerText = "Delete";

    deleteBtn.onclick = function () {

        if (checkbox.checked) {

            completedTasks--;
        }

        totalTasks--;

        li.remove();

        updateStats();

        saveTasks();
    };

    /* Add Elements */
    taskLeft.appendChild(checkbox);

    taskLeft.appendChild(span);

    taskLeft.appendChild(dueDateSpan);

    li.appendChild(taskLeft);

    li.appendChild(editBtn);

    li.appendChild(deleteBtn);

    /* Add To List */
    document
        .getElementById("taskList")
        .appendChild(li);
}

/* Update Statistics */
function updateStats() {

    let stats =
        document.getElementById("stats");

    if (totalTasks === 0) {

        stats.innerText =
            "No tasks added yet";

        return;
    }

    let pendingTasks =
        totalTasks - completedTasks;

    let efficiency =
        Math.round(
            (completedTasks / totalTasks) * 100
        );

    stats.innerText =
        "Total Tasks: " + totalTasks +
        " | Completed: " + completedTasks +
        " | Pending: " + pendingTasks +
        " | Efficiency: " + efficiency + "%";
}

/* Save Tasks */
function saveTasks() {

    let tasks = [];

    let taskItems =
        document.querySelectorAll("#taskList li");

    taskItems.forEach(function(item) {

        let text =
            item.querySelector("span").innerText;

        let completed =
            item.querySelector("input").checked;

        let dueDateElement =
            item.querySelector(".due-date");

        let dueDate = "";

        if (dueDateElement) {

            dueDate =
                dueDateElement.innerText.replace(
                    "Due: ",
                    ""
                );
        }

        tasks.push({

            text: text,

            completed: completed,

            dueDate: dueDate
        });
    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* Load Tasks */
function loadTasks() {

    let savedTasks =
        localStorage.getItem("tasks");

    if (savedTasks === null) {

        return;
    }

    let tasks =
        JSON.parse(savedTasks);

    tasks.forEach(function(task) {

        totalTasks++;

        createTaskElement(

            task.text,

            task.completed,

            task.dueDate
        );
    });
}

/* Filter Tasks */
function filterTasks(type) {

    let tasks =
        document.querySelectorAll("#taskList li");

    tasks.forEach(function(task) {

        let checkbox =
            task.querySelector("input");

        if (type === "all") {

            task.style.display = "flex";

        } else if (
            type === "completed"
        ) {

            task.style.display =
                checkbox.checked
                ? "flex"
                : "none";

        } else if (
            type === "pending"
        ) {

            task.style.display =
                !checkbox.checked
                ? "flex"
                : "none";
        }
    });
}
