function loadTasks() {
  const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
  storedTasks.forEach(taskText => addTask(taskText, false)); 
}

document.addEventListener('DOMContentLoaded', () => {
});

