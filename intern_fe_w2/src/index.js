"use strict";
let todos = [];
let todoId = 0;
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
function addTodo() {
    const content = todoInput.value.trim();
    if (content) {
        const newTodo = {
            id: todoId++,
            content,
            completed: false,
            confirm: false,
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
}
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('div');
        if (todo.completed) {
            li.className = 'com_item';
        }
        else {
            li.className = 'uncom_item';
        }
        li.innerHTML = "<p>" + todo.content + "</p>";
        //li.addEventListener('click', () => toggleTodoCompletion(todo.id));
        li.addEventListener('click', () => confirm(li, todo.id));
        todoList.appendChild(li);
    });
}
function confirm(li, id) {
    if (!li.confirm) {
        li.confirm = true;
        const inner = li.innerHTML;
        const no_btn = document.createElement('button');
        const yes_btn = document.createElement('button');
        no_btn.innerHTML = "<span style='color:red'>&#10006;</span>";
        yes_btn.innerHTML = "<span style='color:green'>&#10004;</span>";
        li.innerHTML += '<p style = "margin-left: 4%;color:white;">Confirm?</p>';
        yes_btn.addEventListener('click', () => toggleTodoCompletion(li, id));
        no_btn.addEventListener('click', () => renderTodos());
        li.appendChild(yes_btn);
        li.appendChild(no_btn);
    }
}
function toggleTodoCompletion(li, id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}
addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
