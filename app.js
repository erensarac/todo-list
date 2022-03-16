// Global Variables
const body = document.querySelector("body")
const todoContainer = document.querySelector("#todo-container")
const button = document.querySelector("#create-todo-btn")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Months Array

// Dom Content Loaded
document.addEventListener("DOMContentLoaded", (todo) => {
    let todos
    if (localStorage.getItem("todos") === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
        for (let i = 0; i < todos.length; i++){
            CREATE_TODO(todos[i].id, todos[i].name, todos[i].createdDate, todos[i].isCompleted)
        }
    } CHECK_TODO() // Fonksiyonu bir kere calistirmali.
})

// Create Todo Button Onclick 
button.addEventListener("click", ()=> { 
    let time = [
        new Date().getSeconds(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getDate(),
        months[new Date().getMonth()],
        new Date().getFullYear()
    ]
    if (time[1] < 10) {time[1] = "0" + time[1]}
    if (time[2] < 10) {time[2] = "0" + time[2]}
    let fullTime = `${time[1]}:${time[2]} - ${time[3]} ${time[4]} ${time[5]}`
    
    const todoInput = document.querySelector("#todo-input").value
    if (todoInput == ""){
        ALERT_MESSAGE("warn", "Please do not leave the input blank, fill the input.")
    } else {
        let id = `${time[3]}${new Date().getMonth()}${time[1]}${time[2]}${time[0]}${time[5]}`
        console.log(id)
        CREATE_TODO(id, todoInput, fullTime, false)
        SAVE_LOCAL_STORAGE(id, todoInput, fullTime, false)
        ALERT_MESSAGE("success", "Todo has been successfully created.")
    }
})

// Create Todo Function
function CREATE_TODO(todoID, inputValue, time, isCompleted){
    const todoInput = document.querySelector("#todo-input")
    let todoItem = document.createElement("LI")
    todoItem.setAttribute("id", todoID)
    todoItem.classList.add("todo-item")
    let checkBox = document.createElement("DIV")
    checkBox.classList.add("checkbox")
    let completeIcon = document.createElement("I")
    completeIcon.setAttribute("id", "complete-btn")
    if (isCompleted == true){
        completeIcon.classList.add("ri-checkbox-fill");
        todoItem.classList.add("completed");
    } else {
        completeIcon.classList.add("ri-checkbox-blank-line");
        todoItem.classList.remove("completed");
    }
    let deleteBox = document.createElement("DIV")
    deleteBox.classList.add("deletebox")
    let deleteBtn = document.createElement("DIV")
    deleteBtn.classList.add("delete", "button")
    deleteBtn.innerHTML = "DELETE"
    let todoEl = document.createElement("DIV")
    todoEl.classList.add("todo")
    let text = document.createElement("P")
    text.innerHTML = inputValue
    let createdDate = document.createElement("SPAN")
    createdDate.innerHTML = time
    todoInput.value = ""
    todoContainer.append(todoItem)
    todoItem.append(checkBox, todoEl, deleteBox)
    checkBox.append(completeIcon)
    todoEl.append(text, createdDate)
    deleteBox.append(deleteBtn)
}

// Todo Mark Completed 
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

// Save Todo Items to Local Storage
function SAVE_LOCAL_STORAGE(id, msg, time, truefalse) {
    let todos
    if (localStorage.getItem("todos") === null){todos = []} 
    else {todos = JSON.parse(localStorage.getItem("todos"))}
    todos.push({
        "id": id,
        "name": msg,
        "createdDate": time,
        "isCompleted": truefalse
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}

// Delete All Todo Items
function DELETE_ALL_TODO(){
    let allTodoItems = document.querySelectorAll(".todo-item")
    for (let i = 0; i < allTodoItems.length; i++){
        allTodoItems[i].style.opacity = "0"
        setTimeout(()=> {
            allTodoItems[i].remove()
        }, 400)
    }
    ALERT_MESSAGE("danger", "All todos has been clear.")
    localStorage.removeItem("todos")
}

// Alert with type and message
function ALERT_MESSAGE(type, msg){
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
