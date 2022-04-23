const body = document.querySelector("body")
const todoContainer = document.querySelector("#todo-container")
const totalTodoCount = document.querySelector("#total-todo-count")
const completedTodoCount = document.querySelector("#completed-todo-count")
const button = document.querySelector("#create-todo-btn")
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]; // Months Array
const silmebuton = document.querySelector(".deletebox")

const FORM = document.querySelector('#todo-create-form');

let todos

// Buton ile olusturulan
FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const { todo_id, todo_created_date } = idAndTime();
    const formInput = document.querySelector("#todo-input").value;
    CREATE_TODO(todo_id, formInput, todo_created_date, false);
    SAVE_LOCAL_STORAGE(todo_id, formInput, todo_created_date, false);
    ALERT_MESSAGE("success", "Todo has been created.")
    TODO_COUNTER();
})

// Sayfa yuklendikten sonra
document.addEventListener("DOMContentLoaded", () => {
    todos = JSON.parse(localStorage.getItem("todos"))
    for (let i = 0; i < todos.length; i++) {
        CREATE_TODO(todos[i].id, todos[i].todo, todos[i].created_date, todos[i].is_completed)
    }
    CHECK_TODO()
    TODO_COUNTER()
    // PAGE_TITLE()
})

// function PAGE_TITLE() {
//     setInterval(() => {
//         document.querySelector("#title").innerHTML = GET_FULL_TIME();
//     }, 1000);
//     setInterval(() => {
//         document.querySelector("#title").innerHTML = "Todo List"
//     }, 5000);
// }

// SIK KULLANILAN ANLIK ZAMAN EDINME FONKSIYONU
function GET_FULL_TIME() {
    let seconds = new Date().getSeconds()
    let hours = new Date().getHours()
    let minutes = new Date().getMinutes()
    let date = new Date().getDate()
    let month = months[new Date().getMonth()]
    let year = new Date().getFullYear()

    let getTime = [
        seconds,
        hours,
        minutes,
        date,
        month,
        year
    ]
    let title = `${date} ${month} ${hours}:${minutes}`
    return title;
}

// SIK KULLANILAN ID OLUSTURMA FONKSIYONU
function CREATE_ID() {
    let id = 0
    id++
    return id
}

// Return ile kullanimi
function idAndTime() {
    let time = [
        new Date().getSeconds(),
        new Date().getHours(),
        new Date().getMinutes(),
        new Date().getDate(),
        months[new Date().getMonth()],
        new Date().getFullYear()
    ]
    if (time[1] < 10) { time[1] = "0" + time[1] }
    if (time[2] < 10) { time[2] = "0" + time[2] }
    let currentTime = `${time[3]} ${time[4]} ${time[5]} ${time[1]}:${time[2]}`
    let id = `${time[3]}${new Date().getMonth()}${time[1]}${time[2]}${time[0]}${time[5]}`

    return { todo_id: id, todo_created_date: currentTime };
}

function CREATE_TODO(todoID, inputValue, time, isCompleted) {
    const todoInput = document.querySelector("#todo-input")
    let todoItem = document.createElement("LI")
    todoItem.setAttribute("id", todoID)
    todoItem.classList.add("todo-items")
    let checkBox = document.createElement("DIV")
    checkBox.classList.add("checkbox")
    let completeIcon = document.createElement("I")
    completeIcon.setAttribute("id", "complete-btn")
    if (isCompleted == true) {
        completeIcon.classList.add("ri-checkbox-circle-fill");
        todoItem.classList.add("completed");
    } else {
        completeIcon.classList.add("ri-checkbox-blank-circle-line");
        todoItem.classList.remove("completed");
    }
    let deleteBox = document.createElement("DIV")
    let deleteBtn = document.createElement("DIV")
    let todoEl = document.createElement("DIV")
    let text = document.createElement("P")
    let createdDate = document.createElement("SPAN")
    text.innerHTML = inputValue
    deleteBtn.innerHTML = "DELETE"
    createdDate.innerHTML = `Created on ${time}`
    todoEl.classList.add("todo")
    deleteBox.classList.add("deletebox")
    deleteBtn.classList.add("delete", "button")
    createdDate.classList.add("todo-created-date")
    text.classList.add("todo-name")
    todoItem.append(checkBox, todoEl, deleteBox)
    checkBox.append(completeIcon)
    todoEl.append(text, createdDate)
    deleteBox.append(deleteBtn)
    todoContainer.append(todoItem)
    todoInput.value = ""
    DELETE_TODO();
}

function CHECK_TODO() {
    checkBtn = document.querySelectorAll(".checkbox")
    console.log("Fonksiyon calisiyor");
    checkBtn.forEach((e) => {
        console.log(`e degeri = ${e}`);
        e.addEventListener("click", () => {
            console.log("Click eventi calisiyor");
            todoID = e.parentElement.id
            let todos, index
            if (localStorage.getItem("todos") === null) { todos = [] }
            else { todos = JSON.parse(localStorage.getItem("todos")) }
            index = todos.findIndex(i => i.id === todoID)
            console.log(`Kontrol edilen todo indeks = ${index}`);
            if (todos[index].is_completed === false) {
                e.firstChild.classList.add("ri-checkbox-circle-fill")
                e.firstChild.classList.remove("ri-checkbox-blank-circle-line")
                e.parentElement.classList.add("completed")
                todos[index].is_completed = true
            } else {
                e.firstChild.classList.add("ri-checkbox-blank-circle-line")
                e.firstChild.classList.remove("ri-checkbox-circle-fill")
                e.parentElement.classList.remove("completed")
                todos[index].is_completed = false
            }
            console.log("bosluk");
            localStorage.setItem("todos", JSON.stringify(todos))
            TODO_COUNTER()
        })
    })
}

function SAVE_LOCAL_STORAGE(id, todo, created_date, is_completed) {
    if (localStorage.getItem("todos") === null) { todos = [] }
    else { todos = JSON.parse(localStorage.getItem("todos")) }
    todos.push({ id, todo, created_date, is_completed })
    localStorage.setItem("todos", JSON.stringify(todos))
}

function DELETE_TODO() {
    let deleteBtn = document.querySelectorAll(".deletebox")
    deleteBtn.forEach(e => {
        e.addEventListener("click", () => {
            let todoID
            todoID = e.parentElement.id
            if (localStorage.getItem("todos") === null) { todos = [] }
            else { todos = JSON.parse(localStorage.getItem("todos")) }
            todos.splice(todos.findIndex(todo => todo.id == todoID), 1);
            e.parentElement.remove()
            ALERT_MESSAGE("danger", "Todo has been deleted.")
            localStorage.setItem("todos", JSON.stringify(todos))
            TODO_COUNTER()
        })
    })
}
// function DELETE_TODO() {
//     let deleteBtn = document.querySelectorAll(".deletebox")
//     deleteBtn.forEach(e => {
//         e.addEventListener("click", ()=>{
//             let todos, todoID
//             todoID = e.parentElement.id
//             if (localStorage.getItem("todos") === null){todos = []} 
//             else {todos = JSON.parse(localStorage.getItem("todos"))}
//             todos.splice(todos.findIndex(todo => todo.id == todoID), 1);
//             e.parentElement.remove()
//             ALERT_MESSAGE("danger", "Todo has been deleted.")
//             localStorage.setItem("todos", JSON.stringify(todos))
//             TODO_COUNTER()
//         })
//     })
// }

function DELETE_ALL_TODO() {
    let allTodoItems = document.querySelectorAll(".todo-item")
    for (let i = 0; i < allTodoItems.length; i++) {
        allTodoItems[i].style.opacity = "0"
        setTimeout(() => {
            allTodoItems[i].remove()
        }, 1000)
    }
    localStorage.removeItem("todos")
    ALERT_MESSAGE("danger", "All todos has been clear.")
}

function TODO_COUNTER() {
    const completed_todo = document.querySelectorAll(".completed")
    if (localStorage.getItem("todos") === null) { todos = [] }
    else { todos = JSON.parse(localStorage.getItem("todos")) }
    totalTodoCount.textContent = todos.length
    completedTodoCount.textContent = completed_todo.length
}

function ALERT_MESSAGE(type, msg) {
    if (document.querySelector("#notification") !== null) {
        document.querySelector("#notification").remove()
    }
    let divElement = document.createElement("DIV")
    body.append(divElement)
    divElement.id = "notification"
    divElement.classList.add("alert", `${type}`)
    divElement.innerText = msg
    divElement.style.opacity = "1"
    setTimeout(() => {
        divElement.style.opacity = "0"
        divElement.style.display = "none"
        divElement.remove()
    }, 2500)
}
