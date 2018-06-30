// Declaring UI Variables
const form      = document.querySelector('#task-form');
const taskList  = document.querySelector('.collection');
const clearBtn  = document.querySelector('.clear-tasks');
const filter    = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load All Event Listeners
loadEventListeners();

// Load All Event Listeners
function loadEventListeners() {
  // DOM Load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add Task Event
  form.addEventListener('submit', addTask);
  // Remove Task Event
  taskList.addEventListener('click', removeTask);
  // Clear Task Event
  clearBtn.addEventListener('click', clearTasks);
  // Filter Tasks Event
  filter.addEventListener('keyup', filterTasks);
}
// Get Tasks From LocalStorage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks' === null)) {
    tasks = [];
  }
  else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task) {
    // Create LI Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node And Append To List Item
    li.appendChild(document.createTextNode(task));
    // Create New Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append The Link To The List Item
    li.appendChild(link);

    // Append The List Item To The Unordered List
    taskList.appendChild(li);
  });
}
// Add Task Function
function addTask(event) {
  if (taskInput.value === '') {
    alert('Add a Task');
  } 
  else {
    // Create LI Element
    const li = document.createElement('li');
    // Add Class
    li.className = 'collection-item';
    // Create Text Node And Append To List Item
    li.appendChild(document.createTextNode(taskInput.value));
    // Create New Link Element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content';
    // Add Icon HTML
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append The Link To The List Item
    li.appendChild(link);

    // Append The List Item To The Unordered List
    taskList.appendChild(li);
    // Append Value In LocalStorage
    storeTaskInLocalStorage(taskInput.value);
    // Clear The Input
    taskInput.value = '';
  }
  event.preventDefault();
}
// Store Task In LocalStorage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
  tasks = [];
  }
  else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove Task Function
function removeTask(event) {
  if (event.target.parentElement.classList.contains('delete-item')) {
    event.target.parentElement.parentElement.remove();
    // Remove Task From LocalStorage
    removeTaskFromLocalStorage(event.target.parentElement.parentElement);
  }
}
// Remove Task From LocalStorage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
  tasks = [];
  }
  else {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1)
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Clear Tasks
function clearTasks() {
  // taskList.innerHTML = '';
  // Recommended =>
  while (taskList.firstChild != null) {
    taskList.removeChild(taskList.firstChild);
    removeTaskFromLocalStorage(taskList.firstChild);
  }
  // localStorage.clear();
}
// Filter Tasks
function filterTasks(event) {
  const text = event.target.value.toLowerCase();
  document.querySelectorAll('.collection-item').forEach(function(task) {
  const item = task.firstChild.textContent;

  if (item.toLocaleLowerCase().indexOf(text) != -1) {
    task.style.display = 'block';
  } 
  else {
    task.style.display = 'none';
  }
  });
}