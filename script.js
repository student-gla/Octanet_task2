// Get the task input field and add task button
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const filterSelect = document.getElementById('filter-select');
const taskList = document.getElementById('task-list');

// Load tasks from local storage
loadTasks();

// Add event listener to the add task button
addTaskBtn.addEventListener('click', addTask);

// Add event listener to the clear all button
clearAllBtn.addEventListener('click', clearAllTasks);

// Add event listener to the filter select
filterSelect.addEventListener('change', filterTasks);

// Add event listener to the task list to toggle completed tasks
taskList.addEventListener('click', toggleCompleted);

// Add event listener to the task list to edit tasks
taskList.addEventListener('dblclick', editTask);

// Add event listener to the task list to delete tasks
taskList.addEventListener('contextmenu', deleteTask);

// Function to add a new task to the list
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const task = document.createElement('li');
        task.textContent = taskText;
        taskList.appendChild(task);
        taskInput.value = '';
        saveTasks();
    }
}

// Function to clear all tasks
function clearAllTasks() {
    taskList.innerHTML = '';
    saveTasks();
}

// Function to filter tasks by completion status
function filterTasks() {
    const filterValue = filterSelect.value;
    const tasks = taskList.children;
    for (const task of tasks) {
        if (filterValue === 'all') {
            task.style.display = 'block';
        } else if (filterValue === 'completed' && task.classList.contains('completed')) {
            task.style.display = 'block';
        } else if (filterValue === 'incomplete' && !task.classList.contains('completed')) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    }
}

// Function to toggle completed tasks
function toggleCompleted(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
        saveTasks();
    }
}

// Function to edit tasks
function editTask(event) {
    if (event.target.tagName === 'LI') {
        const task = event.target;
        const taskText = task.textContent;
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.value = taskText;
        task.innerHTML = '';
        task.appendChild(inputField);
        task.classList.add('editing');
        inputField.focus();
        inputField.addEventListener('blur', () => {
            task.textContent = inputField.value;
            task.classList.remove('editing');
            saveTasks();
        });
    }
}

// Function to delete tasks
function deleteTask(event) {
    if (event.target.tagName === 'LI') {
        event.preventDefault();
        const task = event.target;
        taskList.removeChild(task);
        saveTasks();
    }
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = taskList.children;
    const taskArray = [];
    for (const task of tasks) {
        taskArray.push({
            text: task.textContent,
            completed: task.classList.contains('completed')
        });
    }
    localStorage.setItem('tasks', JSON.stringify(taskArray));
}

// Function to load tasks from local storage
function loadTasks() {
    const taskArray = JSON.parse(localStorage.getItem('tasks'));
    if (taskArray) {
        for (const task of taskArray) {
            const taskElement = document.createElement('li');
            taskElement.textContent = task.text;
            if (task.completed) {
                taskElement.classList.add('completed');
            }
            taskList.appendChild(taskElement);
        }
    }
}