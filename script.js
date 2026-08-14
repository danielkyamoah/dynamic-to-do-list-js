document.addEventListener('DOMContentLoaded', function () {
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');
  const addButton = document.getElementById('add-task-btn');

  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(function (item) {
      if (item && typeof item === 'object' && 'text' in item) {
        addTask(item.text, false, !!item.completed, item.time || null);
      } else {
        addTask(item, false, false, null);
      }
    });
  }

  const saveCurrentTasks = () => {
    const tasks = [];
    Array.from(taskList.children).forEach(function (li) {
      const textSpan = li.querySelector('.task-text');
      const checkbox = li.querySelector('.task-checkbox');
      const timeSpan = li.querySelector('.task-time');

      if (textSpan && checkbox) {
        tasks.push({
          text: textSpan.textContent,
          completed: checkbox.checked,
          time: timeSpan ? timeSpan.textContent : null
        });
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  function addTask(taskTextParam, save = true, completed = false, time = null) {
    const taskText = typeof taskTextParam === 'string' ? taskTextParam : taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const timeToUse = time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const li = document.createElement('li');
    li.classList.add('task-item');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = completed;
    const timeSpan = document.createElement('span');
    timeSpan.textContent = timeToUse;
    timeSpan.className = 'task-time';
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    textSpan.className = 'task-text';
    if (checkbox.checked) textSpan.classList.add('completed');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        textSpan.classList.add('completed');
      } else {
        textSpan.classList.remove('completed')
      }
      saveCurrentTasks();
    });

    const removeBtn = document.createElement('button');
    removeBtn.textContent = "remove";
    removeBtn.className = 'remove-btn';

    removeBtn.onclick = () => {
      taskList.removeChild(li);
      saveCurrentTasks();
    };

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(timeSpan);
    li.appendChild(removeBtn);

    taskList.appendChild(li);

    if (save) {
      const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      currentTasks.push({ text: taskText, completed: completed, time: timeToUse });
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
