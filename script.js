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

  

    function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim input

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    // Create list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remove";
    removeBtn.className = 'remove-btn';

    // Remove task on button click
    removeBtn.onclick = () => {
      taskList.removeChild(li);
    };

    // Append button to list item, then list item to task list
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // Clear input field
    taskInput.value = "";
  }

  // Add task on button click
  addButton.addEventListener('click', addTask);

  // Add task on Enter key press
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });
});
