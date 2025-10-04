document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const addButton = document.getElementById('add-task-btn');

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false));
  }

  function addTask(taskText, save = true) {
    if (!taskText.trim()) {
      alert('Please enter a task.');
      return;
    }

    const li = document.createElement('li');
    li.textContent = taskText;

    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = function () {
      taskList.removeChild(li);
      const updatedTasks = Array.from(taskList.children).map(item => item.firstChild.textContent);
      saveTasks(updatedTasks);
    };

    li.appendChild(removeBtn);
    taskList.appendChild(li);

    if (save) {
      const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      currentTasks.push(taskText);
      saveTasks(currentTasks);
    }

    taskInput.value = '';
  }

  addButton.addEventListener('click', () => {
    addTask(taskInput.value);
  });

  taskInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      addTask(taskInput.value);
    }
  });

  loadTasks();
});
