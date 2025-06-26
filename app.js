const inputfilled = document.querySelector(".inputfill");
const form = document.querySelector(".form");
const tasks = document.querySelector(".tasks");
const filterr = document.querySelector(".filter");
console.log(filterr);
form.addEventListener("submit", add);
tasks.addEventListener("click", removeitm);
filterr.addEventListener("keyup", searchtask);

// Helper: Get tasks from localStorage
function getTasksFromStorage() {
  let tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

// Helper: Save tasks to localStorage
function saveTasksToStorage(tasksArr) {
  localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

// Render all tasks from array
function renderTasks() {
  tasks.innerHTML = "";
  const tasksArr = getTasksFromStorage();
  tasksArr.forEach(function (taskText) {
    const li = document.createElement("li");
    li.classList = "task";
    li.appendChild(document.createTextNode(taskText));
    let icons = document.createElement("div");
    icons.classList = "icons";
    let reomve = document.createElement("a");
    reomve.classList = "fa fa-trash remove";
    let update = document.createElement("a");
    update.innerHTML = '<i class="fa fa-edit"></i>';
    update.addEventListener("click", function () {
      if (update.innerHTML.includes("fa-edit")) {
        inputfilled.value = li.firstChild.textContent;
        removeTaskFromStorage(li.firstChild.textContent);
        li.remove();
      }
    });
    icons.appendChild(reomve);
    icons.appendChild(update);
    li.appendChild(icons);
    tasks.appendChild(li);
  });
}

// Add task
function add(e) {
  e.preventDefault();
  if (inputfilled.value === "") {
    alert("please enter task");
  } else {
    let tasksArr = getTasksFromStorage();
    tasksArr.push(inputfilled.value);
    saveTasksToStorage(tasksArr);
    renderTasks();
    inputfilled.value = "";
  }
}

// Remove task from storage
function removeTaskFromStorage(taskText) {
  let tasksArr = getTasksFromStorage();
  tasksArr = tasksArr.filter(function (t) {
    return t !== taskText;
  });
  saveTasksToStorage(tasksArr);
}

// Remove item
function removeitm(e) {
  if (e.target.classList.contains("remove")) {
    if (confirm("are you sure")) {
      const li = e.target.parentElement.parentElement;
      const taskText = li.firstChild.textContent;
      removeTaskFromStorage(taskText);
      li.remove();
    }
  }
}

function searchtask(e) {
  const textinput = e.target.value.toLowerCase();
  const taskitems = document.querySelectorAll(".task");
  taskitems.forEach(function (items) {
    const item = items.firstChild.textContent;
    if (item.toLowerCase().indexOf(textinput) !== -1) {
      items.style.display = "flex";
    } else {
      items.style.display = "none";
    }
  });
}

// On page load, render tasks from storage
window.addEventListener("DOMContentLoaded", renderTasks);
