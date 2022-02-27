const body = document.querySelector("body")
const todoContainer = document.querySelector("#todo-container")
const button = document.querySelector("#create-todo-btn")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Months Array
document.addEventListener("DOMContentLoaded", (todo) => {
    console.log(`todo is loaded ${todo}`);
    let todos
    if (localStorage.getItem("todos") == ""){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    for (let i = 0; i < todos.length; i++){
        createTodo(todos[i].name, todos[i].createdDate)
    }
    check()
})
function check(){
    let checkBtn = document.querySelectorAll(".checkbox")
    checkBtn.forEach(function(e){ 
        let isClicked = false
        e.addEventListener("click", ()=>{
            console.log("Check Todo Button is working.")
            let checkBtn = document.querySelectorAll(".checkbox")
            if (isClicked === false){
                e.classList.remove("ri-checkbox-blank-line")
                e.classList.add("ri-checkbox-fill")
                let parent = e.parentElement
                parent.parentElement.classList.add("completed-todo")
                isClicked = true
            } else {
                e.classList.remove("ri-checkbox-fill")
                e.classList.add("ri-checkbox-blank-line")
                let parent = e.parentElement
                parent.parentElement.classList.remove("completed-todo")
                isClicked = false
            }
        })
    })
}
function createTodo (inputValue, time){
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
button.addEventListener("click", ()=> { 
    const todoInput = document.querySelector("#todo-input").value
    let time = [
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getDate(),
        months[new Date().getMonth()],
        new Date().getFullYear()
    ]
    if (time[1] < 10){ 
        time[1] = "0" + time[1]
    }
    let fullTime = `${time[0]}:${time[1]} • ${time[2]} ${time[3]} ${time[4]}`
    if(todoInput == ""){
        alertMsg("warn", "Please do not leave the input blank, fill the input.")
    } else {
        createTodo(todoInput, fullTime)
        saveLS(todoInput, fullTime)

        const deleteBtn = document.querySelectorAll(".delete")  // Delete Todo Button
        deleteBtn.forEach( (e) => {
            e.addEventListener("click", ()=>{
                console.log("Delete Todo Button is working.")
            })
        })
        check()
        alertMsg("success", "Todo has been successfully created.")
    }
})
function saveLS(todo, time) {
    let todos
    if (localStorage.getItem("todos") === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(
            {
                "name": todo,
                "createdDate": time,
                "isCompleted": false
            }
        )
    localStorage.setItem("todos", JSON.stringify(todos))
}
function alertMsg(alertType, alertMessage){
    if (document.querySelector("#notification") !== null){
        document.querySelector("#notification").remove()
    }
    let alertElement = document.createElement("DIV")
    alertElement.id = "notification"
    body.append(alertElement)
    if (alertType == "success"){
        alertElement.classList.add("alert", "success")
        alertElement.innerText = alertMessage
    } else if (alertType == "danger"){
        alertElement.classList.add("alert", "danger")
        alertElement.innerText = alertMessage
    } else {
        alertElement.classList.add("alert", "warn")
        alertElement.innerText = alertMessage
    }
    setTimeout(()=> {
        alertElement.style.opacity = "1"
    }, 10)
    setTimeout(()=> {
        alertElement.style.opacity = "0"
        alertElement.style.display = "none"
        alertElement.remove()
    }, 3500)
}
