let totalTasks = 0;
let completedTasks = 0;

function addTask() {
  let taskInput = document.getElementById("taskInput");
  let taskText = taskInput.value;

  if (taskText === "") {
    alert("Please enter a task");
    return;
  }

  totalTasks++;

  let li = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  let span = document.createElement("span");
  span.innerText = taskText;

  checkbox.onchange = function () {
    if (checkbox.checked) {
      span.classList.add("completed");
      completedTasks++;
    } else {
      span.classList.remove("completed");
      completedTasks--;
    }
    updateStats();
  };

  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.onclick = function () {
    if (checkbox.checked) {
      completedTasks--;
    }
    totalTasks--;
    li.remove();
    updateStats();
  };

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(deleteBtn);

  document.getElementById("taskList").appendChild(li);

  taskInput.value = "";
  updateStats();
}

function updateStats() {
  let stats = document.getElementById("stats");

  if (totalTasks === 0) {
    stats.innerText = "No tasks added yet";
    return;
  }

  let efficiency = Math.round((completedTasks / totalTasks) * 100);

  stats.innerText =
    "Total Tasks: " + totalTasks +
    " | Completed: " + completedTasks +
    " | Pending: " + (totalTasks - completedTasks) +
    " | Efficiency: " + efficiency + "%";
}