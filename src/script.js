document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];
  const stored = JSON.parse(localStorage.getItem("taskList"));
  stored.forEach(rendertask);
  document
    .getElementById("addTask")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const newTask = document.getElementById("task").value.trim();
      if (newTask === "") {
        return;
      }
      const obj = {
        task: newTask,
        id: Date.now(),
        completed: false,
      };
      tasks.push(obj);
      addToLocalStorage();
      rendertask(obj);
      console.log(tasks);
      document.getElementById("task").value = "";
    });

  function rendertask(item) {
    let li = document.createElement("li");
    li.setAttribute("data-id", item.id);
    li.innerHTML = `
    <p>${item.task}</p>
    <button>delete task</button> `;
    document.querySelector("ul").appendChild(li);

    /*li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation;
      tasks = tasks.filter((t) => t.id != item.id);
      li.remove();
      addToLocalStorage();
    });*/
  }

  document.getElementById("taskList").addEventListener("click", (e) => {
    const li = e.target.closest("li");
    if (e.target.tagName === "BUTTON") {
      let id = li.getAttribute("data-id");
      tasks = tasks.filter((t) => t.id != id);
      li.remove();
      addToLocalStorage();
    }
    li.classList.toggle("completed");
  });

  function addToLocalStorage() {
    localStorage.setItem("taskList", JSON.stringify(tasks));
  }
});
