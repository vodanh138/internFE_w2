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
        const container = document.createElement('div');
        container.className = "item_con";
        const rm_btn = document.createElement('button');
        rm_btn.className = "rm_btn";
        rm_btn.innerHTML = "<span style='color:red'>&#10006;</span>";
        rm_btn.addEventListener('click', () => deletee(todo.id));
        container.appendChild(rm_btn);
        const li = document.createElement('div');
        if (todo.completed) {
            li.className = 'com_item';
        }
        else {
            li.className = 'uncom_item';
        }
        li.innerHTML = "<p>" + todo.content + "</p>";
        li.addEventListener('click', () => confirm(li, todo.id));
        container.appendChild(li);
        todoList.appendChild(container);
    });
}
function confirm(li, id) {
    if (!li.confirm) {
        li.confirm = true;
        const no_btn = document.createElement('button');
        const yes_btn = document.createElement('button');
        const ad_btn = document.createElement('button');
        no_btn.className = "no_btn";
        yes_btn.className = "yes_btn";
        ad_btn.className = "ad_btn";
        no_btn.innerHTML = "<span style='color:red'>&#10006;</span>";
        yes_btn.innerHTML = "<span style='color:green'>&#10004;</span>";
        ad_btn.innerHTML = '<i class="fas fa-sync-alt"></i>';
        li.innerHTML += '<p style = "margin-left: 4%;color:white;">Confirm?</p>';
        yes_btn.addEventListener('click', () => toggleTodoCompletion(li, id));
        no_btn.addEventListener('click', () => renderTodos());
        ad_btn.addEventListener('click', () => adjusttodo(li, id));
        li.appendChild(yes_btn);
        li.appendChild(no_btn);
        li.appendChild(ad_btn);
    }
}
function adjusttodo(li, id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        li.innerHTML = '';
        const input = document.createElement('input');
        input.type = 'text';
        input.value = todo.content;
        input.className = 'edit-input';
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const newContent = input.value.trim();
                if (newContent) {
                    todo.content = newContent;
                    renderTodos();
                }
            }
        });
        const save_btn = document.createElement('button');
        save_btn.innerHTML = "<span style='color:green'>&#10004;</span>";
        save_btn.className = 'save_btn';
        const cancel_btn = document.createElement('button');
        cancel_btn.innerHTML = "<span style='color:red'>&#10006;</span>";
        cancel_btn.className = 'cancel_btn';
        save_btn.addEventListener('click', () => {
            const newContent = input.value.trim();
            if (newContent) {
                todo.content = newContent;
                renderTodos();
            }
        });
        cancel_btn.addEventListener('click', () => renderTodos());
        li.appendChild(input);
        li.appendChild(save_btn);
        li.appendChild(cancel_btn);
    }
}
function deletee(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
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
