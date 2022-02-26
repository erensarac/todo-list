console.log("Hello World!")
const todoContainer = document.querySelector("#todo-container")
const button = document.querySelector("#create-todo-btn")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Months Array
document.addEventListener("DOMContentLoaded", (todo) => {
    let todos
    if (localStorage.getItem("todos") == ""){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach((todo)=> {
        createTodo(todo)
    })
})

function createTodo (inputValue, fullTime){
    const todoInput = document.querySelector("#todo-input")
    let listItem = document.createElement("LI")
    let todoTextContent = document.createElement("DIV")
    let todoControl = document.createElement("DIV")
    let pElement = document.createElement("P")
    let dateText = document.createElement("SPAN")
    let completeIcon = document.createElement("I")
    // let deleteIcon = document.createElement("I")
    todoContainer.appendChild(listItem)
    listItem.append(todoControl,todoTextContent)
    todoTextContent.append(pElement, dateText)
    todoControl.append(completeIcon)
    listItem.classList.add("todolist-item")
    todoTextContent.classList.add("todo-text")
    todoControl.classList.add("todo-control")
    completeIcon.classList.add("checkbox", "icons", "uncompleted", "ri-checkbox-blank-line")
    // deleteIcon.classList.add("delete", "icons", "ri-close-line")
    completeIcon.setAttribute("id", "complete-btn")
    // deleteIcon.setAttribute("id", "delete-btn")
    dateText.textContent = fullTime
    pElement.textContent = inputValue
    todoInput.value = ""
}

button.addEventListener("click", ()=> { // Create todo item
    const todoInput = document.querySelector("#todo-input").value

    let time = [
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getDay(),
        months[new Date().getMonth()],
        new Date().getFullYear()
    ]
    let fullTime = `${time[0]}:${time[1]}, ${time[2]} ${time[3]} ${time[4]}`

    if(todoInput == ""){
        alert("Please fill input for todo!")
    } else {

        createTodo(todoInput, fullTime)
        saveLS(todoInput)

        const deleteBtn = document.querySelectorAll(".delete")  // Delete Todo Button
        deleteBtn.forEach( (e) => {
            e.addEventListener("click", ()=>{
                console.log("Delete Todo Button is working.")
            })
        })

        let checkBtn = document.querySelectorAll(".checkbox")   // Check Todo Button
        checkBtn.forEach(function(e){ 
            let isClicked = false
            e.addEventListener("click", ()=>{
                console.log("Check Todo Button is working.")
                let checkBtn = document.querySelectorAll(".checkbox")
                if (isClicked === false){
                     e.classList.remove("ri-checkbox-blank-line")
                    e.classList.add("ri-checkbox-fill")
                    isClicked = true
                } else {
                    e.classList.remove("ri-checkbox-fill")
                    e.classList.add("ri-checkbox-blank-line")
                    isClicked = false
                }
            })
        })
    }
})

function saveLS(todo) {
    let todos
    if (localStorage.getItem("todos") === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}
