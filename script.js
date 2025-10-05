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
    li.textContent = taskText;
    li.classList.add('task-item');

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      const updatedTasks = Array.from(taskList.children).map(function (item) {
        return item.firstChild.textContent;
      });
      saveTasks(updatedTasks);
    };

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
