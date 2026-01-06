async function fetchTodos() {
  const res = await fetch("/api/todos");
  return res.json();
}

async function renderTodos() {
  const todos = await fetchTodos();
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${todo.task}
      <button onclick="editTask('${todo._id}')">Edit</button>
      <button onclick="deleteTask('${todo._id}')">Delete</button>
    `;
    list.appendChild(li);
  });
}

document.getElementById("addBtn").addEventListener("click", async () => {
  const task = document.getElementById("taskInput").value;
  if (!task) return;

  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task }),
  });

  document.getElementById("taskInput").value = "";
  renderTodos();
});

async function deleteTask(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  renderTodos();
}

async function editTask(id) {
  const newTask = prompt("Edit task:");
  if (!newTask) return;

  await fetch(`/api/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task: newTask }),
  });

  renderTodos();
}

renderTodos();
