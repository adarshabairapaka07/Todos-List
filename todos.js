let todoItemsContainer = document.getElementById("todoItemsContainer");
let addTodoButton = document.getElementById("addTodoButton");
let saveTodoButton = document.getElementById("saveTodoButton");

function getTodoListFromLocalStorage() {
  let stringifiedTodoList = localStorage.getItem("todoList");
  let parsedTodoList = JSON.parse(stringifiedTodoList);
  return parsedTodoList === null ? [] : parsedTodoList;
}

let todoList = getTodoListFromLocalStorage();
let todosCount = todoList.length;


function displayEmptyMessage() {
  if (todoList.length === 0) {
    todoItemsContainer.innerHTML = `<p class="empty-message">No tasks yet! Add something 🚀</p>`;
  } else {
    // Remove the message if any tasks exist
    let messageElement = document.querySelector(".empty-message");
    if (messageElement) {
      messageElement.remove();
    }
  }
}

function onAddTodo() {
  let userInputElement = document.getElementById("todoUserInput");
  let userInputValue = userInputElement.value.trim();

  if (userInputValue === "") {
    alert("Please enter valid text!");
    return;
  }

  todosCount++;
  let newTodo = {
    text: userInputValue,
    uniqueNo: todosCount,
    isChecked: false
  };

  todoList.push(newTodo);
  createAndAppendTodo(newTodo);
  userInputElement.value = "";
  displayEmptyMessage();
}

function onTodoStatusChange(checkboxId, labelId, todoId) {
  let checkboxElement = document.getElementById(checkboxId);
  let labelElement = document.getElementById(labelId);
  labelElement.classList.toggle("checked");

  let todoObjectIndex = todoList.findIndex(eachTodo => "todo" + eachTodo.uniqueNo === todoId);
  let todoObject = todoList[todoObjectIndex];

  todoObject.isChecked = checkboxElement.checked;
}

function onDeleteTodo(todoId) {
  let todoElement = document.getElementById(todoId);
  todoItemsContainer.removeChild(todoElement);

  let deleteElementIndex = todoList.findIndex(eachTodo => "todo" + eachTodo.uniqueNo === todoId);
  todoList.splice(deleteElementIndex, 1);
  displayEmptyMessage();
}

function createAndAppendTodo(todo) {
  let todoId = "todo" + todo.uniqueNo;
  let checkboxId = "checkbox" + todo.uniqueNo;
  let labelId = "label" + todo.uniqueNo;

  let todoElement = document.createElement("li");
  todoElement.classList.add("todo-item-container");
  todoElement.id = todoId;
  todoItemsContainer.appendChild(todoElement);

  let card = document.createElement("div");
  card.classList.add("d-flex", "align-items-center", "justify-content-between", "todo-card");
  todoElement.appendChild(card);

  let leftDiv = document.createElement("div");
  leftDiv.classList.add("d-flex", "align-items-center");
  card.appendChild(leftDiv);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.checked = todo.isChecked;
  inputElement.classList.add("checkbox-input");
  inputElement.onclick = function () {
    onTodoStatusChange(checkboxId, labelId, todoId);
  };
  leftDiv.appendChild(inputElement);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.id = labelId;
  labelElement.classList.add("checkbox-label", "mb-0");
  labelElement.textContent = todo.text;
  if (todo.isChecked) {
    labelElement.classList.add("checked");
  }
  leftDiv.appendChild(labelElement);


  let rightDiv = document.createElement("div");
  rightDiv.classList.add("d-flex", "align-items-center");
  card.appendChild(rightDiv);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fas", "fa-trash", "delete-icon", "ms-3");
  deleteIcon.onclick = function () {
    onDeleteTodo(todoId);
  };
  rightDiv.appendChild(deleteIcon);
}

for (let todo of todoList) {
  createAndAppendTodo(todo);
}
displayEmptyMessage();

// Connect buttons
addTodoButton.onclick = function() {
  onAddTodo();
};

saveTodoButton.onclick = function() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

let themeToggleBtn = document.getElementById("themeToggleBtn");

function applyTheme(theme) {
  document.body.classList.remove("light-mode", "dark-mode");
  document.body.classList.add(theme + "-mode");
  localStorage.setItem("theme", theme);

  let icon = theme === "dark" ? "sun" : "moon";
  themeToggleBtn.innerHTML = `<i class="fas fa-${icon} me-1"></i> Toggle Theme`;
}

// Load saved theme or default to light
let savedTheme = localStorage.getItem("theme") || "light";
applyTheme(savedTheme);

themeToggleBtn.onclick = () => {
  let newTheme = document.body.classList.contains("dark-mode") ? "light" : "dark";
  applyTheme(newTheme);
};

