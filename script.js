document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const addButton = document.getElementById('add-task-btn');

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(function (taskText) {
      addTask(taskText, false);
    });
  }

  function addTask(taskTextParam, save = true) {
    const taskText = typeof taskTextParam === 'string' ? taskTextParam : taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

   const li = document.createElement('li');
   li.classList.add('task-item')
   const checkbox = document.createElement('input');
   checkbox.type = 'checkbox';
   const textSpan = document.createElement('span');
   textSpan.textContent = taskText;

   checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
      textSpan.classList.add('completed');
    } else {
      textSpan.classList.remove('completed');
    }
   });

   const removeBtn = document.createElement('button');
   removeBtn.textContent = "remove";
   removeBtn.className = 'remove-btn';

   removeBtn.onclick = () => {
    taskList.removeChild(li);
   };

li.appendChild(checkbox);
li.appendChild(textSpan);
li.appendChild(removeBtn);

taskList.appendChild(li);

    if (save) {
      const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      currentTasks.push(taskText);
      saveTasks(currentTasks);
    }

    taskInput.value = "";
  }

  addButton.addEventListener('click', addTask);

  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  loadTasks();
});
