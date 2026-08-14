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
        addTask(item.text, false, !!item.completed);
      } else {
        addTask(item, false, false);
      }
    });
  }

  const saveCurrentTasks = () => {
    const tasks = [];
    Array.from(taskList.children).forEach(function (li) {
      const textSpan = li.querySelector('.task-text');
      const checkbox = li.querySelector('.task-checkbox');

      if (textSpan && checkbox) {
        tasks.push({
          text: textSpan.textContent,
          completed: checkbox.checked
        });
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  function addTask(taskTextParam, save = true, completed = false) {
    const taskText = typeof taskTextParam === 'string' ? taskTextParam : taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement('li');
    li.classList.add('task-item');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = completed;
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    textSpan.className = 'task-text';
    if (checkbox.checked) textSpan.classList.add('completed');

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        textSpan.classList.add('completed');
      } else {
        textSpan.classList.remove('completed');
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
    li.appendChild(removeBtn);

    taskList.appendChild(li);

    if (save) {
      const currentTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      currentTasks.push({ text: taskText, completed: completed });
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


const saveCurrentTasks = () => {
  const tasks = []
  Array.from(taskList.children).forEach(function (li) {
    const textSpan = li.querySelector('.task-text');
    const checkbox = li.querySelector('.task-checkbox');

    if (textSpan && checkbox) {
      tasks.push({
        text: textSpan.textContent,
        completed: checkbox.checked
      })
    }
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    textSpan.classList.add('completed');
  } else {
    textSpan.classList.remove('completed');
  }

  saveCurrentTasks();
})
