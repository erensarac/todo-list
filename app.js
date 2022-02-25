console.log("Hello World!")
const toDoContainer = document.querySelector("#todo-container")
const button = document.querySelector("#create-todo-btn")

document.addEventListener("DOMContentLoaded", getLS)

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Months Array
let day = new Date().getDate()
let month = months[new Date().getMonth()]
let year = new Date().getFullYear()

button.addEventListener("click", ()=> { // Create todo item
    const todoInput = document.querySelector("#todo-input")

    if(todoInput.value == ""){
        alert("Please fill input for todo!")
    } else {
        let liElement = document.createElement("li")
        let pElement = document.createElement("p")
        let completeIcon = document.createElement("I")
        let deleteIcon = document.createElement("I")
        let dateText = document.createElement("span")
        
        toDoContainer.appendChild(liElement)
        liElement.appendChild(completeIcon)
        liElement.appendChild(deleteIcon)
        liElement.appendChild(pElement)
        liElement.appendChild(dateText)

        liElement.classList.add("todolist-item")
        pElement.classList.add("todo-text")
        completeIcon.classList.add("checkbox", "icons", "ri-checkbox-blank-circle-line")
        deleteIcon.classList.add("delete", "icons", "ri-close-line")
        completeIcon.setAttribute("id", "complete-btn")
        deleteIcon.setAttribute("id", "delete-btn")

        pElement.textContent = todoInput.value
        dateText.textContent = `Created on ${day} ${month} ${year}`
        
        saveLS(todoInput.value)
        todoInput.value = ""

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
                    e.classList.remove("ri-checkbox-blank-circle-line")
                    e.classList.add("ri-checkbox-circle-fill")
                    isClicked = true
                } else {
                    e.classList.remove("ri-checkbox-circle-fill")
                    e.classList.add("ri-checkbox-blank-circle-line")
                    isClicked = false
                }
            })
        })
    }
})

function saveLS(todo) {     // Save Local Storage
    let todos
    if (localStorage.getItem("todos") === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))
}

function getLS(todo) {  // Get Local Storage
    let todos
    if (localStorage.getItem("todos") === null){
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach((todo)=> { // Create todo item for localStorage
        let liElement = document.createElement("li")
        let pElement = document.createElement("p")
        let completeIcon = document.createElement("I")
        let deleteIcon = document.createElement("I")
        let dateText = document.createElement("span")

        toDoContainer.appendChild(liElement)
        liElement.appendChild(completeIcon)
        liElement.appendChild(deleteIcon)
        liElement.appendChild(pElement)
        liElement.appendChild(dateText)

        liElement.classList.add("todolist-item")
        pElement.classList.add("todo-text")

        completeIcon.setAttribute("id", "complete-btn")
        completeIcon.classList.add("checkbox", "icons", "ri-checkbox-blank-circle-line")

        deleteIcon.setAttribute("id", "delete-btn")
        deleteIcon.classList.add("delete", "icons", "ri-close-line")

        pElement.textContent = todo 
        dateText.textContent = `Created on ${day} ${month} ${year}`
    })
}
