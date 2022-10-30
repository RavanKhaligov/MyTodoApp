const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const addTodo = document.querySelector(".add-todo");
const listGroup = document.querySelector(".list-group");
const clearAll = document.querySelector(".clear-all");

run();

function run(){
    form.addEventListener("submit",sendTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodos);
    clearAll.addEventListener("click",clearAllTodos);
}
function clearAllTodos(){
    if( confirm("Are you sure?")){
        localStorage.removeItem("todos");
        addTodoToUI();
}
   }
function deleteTodo(index){
    let todos = getTodosFromStorage();
    todos.splice(index,1);
    localStorage.setItem("todos",JSON.stringify(todos));
    addTodoToUI();
}

function loadAllTodos(){
    let todos = getTodosFromStorage();
    todos.forEach(function(todo){
        addTodoToUI(todo);
    });
}
function getTodosFromStorage(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}
function sendTodo(e){
    const sendedTodo = input.value.trim();
    if(sendedTodo === ""){
        alert("Please fill the gap");
    }
    else{
        let todos = getTodosFromStorage();
        todos.push(sendedTodo);
        localStorage.setItem("todos",JSON.stringify(todos));
        addTodoToUI(sendedTodo);   
  
    }
    e.preventDefault();
}

function addTodoToUI(){
    const notify = document.querySelector(".notifyNumber");
    let todos = getTodosFromStorage();
    notify.textContent = `You have ${todos.length} pending tasks`;
    let newli = "";   
    todos.forEach((element,index) => {
        newli += `<li class="list-group-item">
        ${element}
        <i class="fa-solid fa-trash delete-todo" onclick = deleteTodo(${index})></i>  
    </li>`
    });
    listGroup.innerHTML = newli;
    input.value = "";
}
