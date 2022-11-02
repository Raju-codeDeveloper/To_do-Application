let todoItemsContainer = document.getElementById("todoItemsContainer");
let addToDoButton = document.getElementById("addToDoButton")
let saveTodoButton = document.getElementById("saveTodoButton")

saveTodoButton.onclick = () => {
 localStorage.setItem("todoList", JSON.stringify(todoList))
}
function getTodoListFromLocal(){
  let stringifiedTodoList = localStorage.getItem("todoList")
  let parseList =JSON.parse(stringifiedTodoList)

  if(parseList === null){
    return []
  }
  else{
    return parseList
  }
}

addToDoButton.onclick = () => {
  onAddToDo()
}

function onAddToDo() {
  let todosCount = todoList.length
  todosCount = todosCount + 1;


  let userInputElement = document.getElementById("todoUserInput")
  let userInputValue = userInputElement.value;
  if (userInputValue === "") {
    alert("Enter Valid Input bro!")
    return
  }

  let newTodo = {
    text: userInputValue,
    uniqeNo: todosCount
  };
  todoList.push(newTodo)
  createAndAppendTodo(newTodo)
  userInputElement.value = ""

}
let todoList = getTodoListFromLocal()

function onTodoStatusChange(checkboxId, labelId) {
  let checkboxElement = document.getElementById(checkboxId)
  console.log(checkboxElement.checked)
  let labelElement = document.getElementById(labelId)
  // if (checkboxElement.checked === true) {
  //   labelElement.classList.add("checked")
  // }
  // else {
  //   labelElement.classList.remove("checked")
  // }
  labelElement.classList.toggle("checked")
}


function onDeleteToDo(todoId) {

  let todoElement = document.getElementById(todoId)
  todoItemsContainer.removeChild(todoElement)
}

function createAndAppendTodo(todo) {
  // let ref = todo.uniqeNo
  let checkboxId = "checkbox" + todo.uniqeNo
  let labelId = "label" + todo.uniqeNo
  let todoId = "todo" + todo.uniqeNo
  let todoElement = document.createElement("li");
  todoElement.id = todoId
  todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
  todoItemsContainer.appendChild(todoElement);

  let inputElement = document.createElement("input");
  inputElement.type = "checkbox";
  inputElement.id = checkboxId;
  inputElement.classList.add("checkbox-input");
  todoElement.appendChild(inputElement);

  inputElement.onclick = () => {
    onTodoStatusChange(checkboxId, labelId)
  }

  let labelContainer = document.createElement("div");
  labelContainer.classList.add("label-container", "d-flex", "flex-row");
  todoElement.appendChild(labelContainer);

  let labelElement = document.createElement("label");
  labelElement.setAttribute("for", checkboxId);
  labelElement.setAttribute("id", labelId);

  labelElement.classList.add("checkbox-label");
  labelElement.textContent = todo.text;
  labelContainer.appendChild(labelElement);

  let deleteIconContainer = document.createElement("div");
  deleteIconContainer.classList.add("delete-icon-container");
  labelContainer.appendChild(deleteIconContainer);

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete-icon");
  deleteIcon.onclick = () => {
    onDeleteToDo(todoId)
  }
  deleteIconContainer.appendChild(deleteIcon);


}

for (let todo of todoList) {
  createAndAppendTodo(todo);


}