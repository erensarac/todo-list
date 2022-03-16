const body = document.querySelector("body")
const todoContainer = document.querySelector("#todo-container")
const button = document.querySelector("#create-todo-btn")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Months Array

document.addEventListener("DOMContentLoaded", (todo) => {
    let todos
    if (localStorage.getItem("todos") === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
        for (let i = 0; i < todos.length; i++){
            createTodo(todos[i].name, todos[i].createdDate, todos[i].isCompleted)
        }
    } CHECK_TODO()
})

button.addEventListener("click", ()=> { 
    const todoInput = document.querySelector("#todo-input").value
    let time = [new Date().getHours(),new Date().getMinutes(),new Date().getDate(),months[new Date().getMonth()],new Date().getFullYear()]
    if (time[1] < 10) {
        time[1] = "0" + time[1]
    }
    let fullTime = `${time[0]}:${time[1]} • ${time[2]} ${time[3]} ${time[4]}`
    if(todoInput == ""){
        alertMsg("warn", "Please do not leave the input blank, fill the input.")
    } else {
        createTodo(todoInput, fullTime)
        saveLS(todoInput, fullTime)
        CHECK_TODO()
        alertMsg("success", "Todo has been successfully created.")
    }
})

function createTodo(inputValue, time, isCompleted){
    const todoInput = document.querySelector("#todo-input")
    let listItem = document.createElement("LI")
    let todoTextContent = document.createElement("DIV")
    let todoControl = document.createElement("DIV")
    let pElement = document.createElement("P")
    let dateText = document.createElement("SPAN")
    let completeIcon = document.createElement("I")
    todoContainer.appendChild(listItem)
    listItem.append(todoControl,todoTextContent)
    todoTextContent.append(pElement, dateText)
    todoControl.append(completeIcon)
    listItem.classList.add("todolist-item")
    todoTextContent.classList.add("todo-text")
    todoControl.classList.add("todo-control")
    completeIcon.classList.add("checkbox", "icons", "uncompleted", "ri-checkbox-blank-line")
    completeIcon.setAttribute("id", "complete-btn")
    dateText.textContent = time
    pElement.textContent = inputValue
    todoInput.value = ""
}

function CHECK_TODO(){
    let checkBtn = document.querySelectorAll(".checkbox")
    checkBtn.forEach(function(e){
        e.addEventListener("click", () => {
            console.log("Check Todo Button is working.")
            todoID = e.parentElement.id
            let todos
            if (localStorage.getItem("todos") === null){todos = []} 
            else {todos = JSON.parse(localStorage.getItem("todos"))}
            index = todos.findIndex(x => x.id === todoID)
            if (todos[index].isCompleted === false){
                e.firstChild.classList.remove("ri-checkbox-blank-line")
                e.firstChild.classList.add("ri-checkbox-fill")
                e.parentElement.classList.add("completed")
                todos[index].isCompleted = true
            } else {
                e.firstChild.classList.remove("ri-checkbox-fill")
                e.firstChild.classList.add("ri-checkbox-blank-line")
                e.parentElement.classList.remove("completed")
                todos[index].isCompleted = false
            }
            localStorage.setItem("todos", JSON.stringify(todos))
        })
    })
}

function saveLS(todo, time) {
    let todos
    if (localStorage.getItem("todos") === null){todos = []} 
    else {todos = JSON.parse(localStorage.getItem("todos"))}
    todos.push({
        "name": todo,
        "createdDate": time,
        "isCompleted": false
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

function deleteAllTodo(){
    let allTodoItems = document.querySelectorAll(".todolist-item")
    for (let i = 0; i < allTodoItems.length; i++){
        allTodoItems[i].remove()
    }
    localStorage.removeItem("todos")
    alertMsg("danger", "All todos has been clear.")
}

function alertMsg(type, msg){
    if (document.querySelector("#notification") !== null){ 
          document.querySelector("#notification").remove()
    }
    let e = document.createElement("DIV")
    e.id = "notification"
    body.append(e)
    e.classList.add("alert", `${type}`)
    e.innerText = msg 
    e.style.opacity = "1"
    setTimeout(()=> {
        e.style.opacity = "0"
        e.style.display = "none"
        e.remove()
    }, 3500)
}
