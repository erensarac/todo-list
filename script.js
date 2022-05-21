const todo_container = document.querySelector("#todo-container");
const todoContainer = document.querySelector("#todo-container");
const button = document.querySelector("#create-todo-btn");
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];
const FORM = document.querySelector('#create-form');
const INPUT = document.querySelector('#todo-input');
let todos;

// Page Loaded Function
document.addEventListener("DOMContentLoaded", () => {
    todos = JSON.parse(localStorage.getItem("todos"));
    for (let i = 0; i < todos.length; i++) {
        CREATE_TODO(
            todos[i].todo_id,
            todos[i].todo_message,
            todos[i].created_date,
            todos[i].is_completed,
            todos[i].status
        );
    }
    COMPLETE_TODO()
    // CHANGE_COLOR()
});

// Form Submit Function
FORM.addEventListener("submit", (e) => {
    e.preventDefault();
    const todo_created_date = `${FULL_TIME().date} ${FULL_TIME().month_name}`;
    const todo_id = CREATE_ID();
    console.log(todo_id);
    const todo_message = INPUT.value;
    CREATE_TODO(todo_id, todo_message, todo_created_date);
    SAVE_LOCAL_STORAGE(todo_id, todo_message, todo_created_date, false);
    COMPLETE_TODO();
    INPUT.value = null;
});

// Create Todo Function
function CREATE_TODO(todoID, todoTitle, createdDate, todoIsCompleted) {
    /* Todo is Completed ? */
    let todoStatus;
    if (todoIsCompleted == true) {
        todoStatus = 'completed';
    }
    /* Default Todo Element Stracture */
    todo_container.innerHTML +=
        `<li id="${todoID}" class="todo-items ${todoStatus}">
        <div class="checkbox">
            <i class="ri-check-line"></i>
        </div>
        <div class="todo-msg">
            <p>${todoTitle}</p>
        </div>
         <div class="todo-date">
            <p>${createdDate}</p>
        </div>

     </li>`
}

// Todo Complete Function
function COMPLETE_TODO() {
    let completeButton = document.querySelectorAll(".todo-items")
    completeButton.forEach((e) => {
        e.addEventListener("click", () => {
            /* Find Todo Index Number*/
            let todos, index
            if (localStorage.getItem("todos") === null) { todos = [] }
            else { todos = JSON.parse(localStorage.getItem("todos")) }
            index = todos.findIndex(i => i.todo_id === e.id)
            /* Todo Completed Status */
            switch (todos[index].is_completed) {
                case true:
                    console.log(1);
                    e.classList.toggle("completed");
                    todos[index].is_completed = false
                    break;
                case false:
                    console.log(2);
                    e.classList.toggle("completed");
                    todos[index].is_completed = true
                    break;
                default:
                    console.log('Have Problem 404');
                    break;
            }
            /* Save todos Array to localStorage */
            localStorage.setItem("todos", JSON.stringify(todos))

        })
    })
}

// LocalStorage Save Function
function SAVE_LOCAL_STORAGE(todo_id, todo_message, created_date, is_completed) {
    console.log(`lokale kayit edilen id ${todo_id}`);
    if (localStorage.getItem("todos") === null) { todos = [] }
    else { todos = JSON.parse(localStorage.getItem("todos")) }
    todo_status = "default";
    todos.push({
        todo_id,
        todo_message,
        created_date,
        is_completed,
        todo_status
    })
    localStorage.setItem("todos", JSON.stringify(todos))
}


// Get Full Time Function
function FULL_TIME() {
    const time = {
        seconds: new Date().getSeconds(),
        hours: new Date().getHours(),
        minutes: new Date().getMinutes(),
        date: new Date().getDate(),
        month: new Date().getMonth(),
        month_name: months[new Date().getMonth()],
        year: new Date().getFullYear()
    }
    return time;
}

// Create Todo ID Function
function CREATE_ID() {
    const todoID = `${FULL_TIME().date}${FULL_TIME().month}${FULL_TIME().hours}${FULL_TIME().minutes}${FULL_TIME().seconds}${FULL_TIME().year}`
    return todoID;
}

/* Scroll to up */
const scrollToUp = document.querySelector('#scroll-to-up')
scrollToUp.addEventListener('click', () => { window.scrollTo(0, 0) });
window.onscroll = function () {
    window.innerHeight
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        scrollToUp.style.opacity = '1';
    } else {
        scrollToUp.style.opacity = '0';
    }
}
