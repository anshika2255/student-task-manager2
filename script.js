let totalTasks = 0;
let completedTasks = 0;

/* Load saved tasks when page opens */
window.onload = function () {
    loadTasks();
};

/* Add task when Enter key is pressed */
document.getElementById("taskInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        addTask();
    }

});

function addTask() {

    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value.trim();

    let errorMessage = document.getElementById("errorMessage");

    /* Validation */
    if (taskText === "") {

        errorMessage.innerText = "Please enter a task";

        return;
    }

    errorMessage.innerText = "";

    totalTasks++;

    createTaskElement(taskText, false);

    taskInput.value = "";

    updateStats();

    saveTasks();
}

/* Create Task */
function createTaskElement(taskText, isCompleted) {

    let li = document.createElement("li");

    /* Checkbox */
    let checkbox = document.createElement("input");

    checkbox.type = "checkbox";

    checkbox.checked = isCompleted;

    /* Task Text */
    let span = document.createElement("span");

    span.innerText = taskText;

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

    /* Delete Button */
    let deleteBtn = document.createElement("button");

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

    /* Add elements to list */
    li.appendChild(checkbox);

    li.appendChild(span);

    li.appendChild(deleteBtn);

    document.getElementById("taskList").appendChild(li);
}

/* Update Statistics */
function updateStats() {

    let stats = document.getElementById("stats");

    if (totalTasks === 0) {

        stats.innerText = "No tasks added yet";

        return;
    }

    let pendingTasks = totalTasks - completedTasks;

    let efficiency = Math.round(
        (completedTasks / totalTasks) * 100
    );

    stats.innerText =
        "Total Tasks: " + totalTasks +
        " | Completed: " + completedTasks +
        " | Pending: " + pendingTasks +
        " | Efficiency: " + efficiency + "%";
}

/* Save tasks in localStorage */
function saveTasks() {

    let tasks = [];

    let taskItems = document.querySelectorAll("#taskList li");

    taskItems.forEach(function(item) {

        let text = item.querySelector("span").innerText;

        let completed =
            item.querySelector("input").checked;

        tasks.push({
            text: text,
            completed: completed
        });

    });

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

/* Load tasks from localStorage */
function loadTasks() {

    let savedTasks =
        localStorage.getItem("tasks");

    if (savedTasks === null) {
        return;
    }

    let tasks = JSON.parse(savedTasks);

    tasks.forEach(function(task) {

        totalTasks++;

        createTaskElement(
            task.text,
            task.completed
        );

    });

    updateStats();
}
