const taskList = document.getElementById("task-list");
const dialog = document.getElementById("dialog");
const deleteModal = document.getElementById("delete-modal");
const editModal = document.getElementById("edit-modal");

let tasks = [
  { name: "Java Homework", priority: "High", status: "Progress" },
  { name: "Web Design", priority: "Medium", status: "To Do" },
  { name: "Database Assignment", priority: "Low", status: "Done" }
];

let deleteIndex = null;
let editIndex = null;
let selectedPriority = "";
let selectedStatus = "";
let editPriority = "";
let editStatus = "";

const priorityColors = {
  High: "#e7000a",
  Medium: "#f1b40c",
  Low: "#21a741"
};

function renderTasks() {
  document.querySelectorAll(".task-row").forEach(el => el.remove());

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];
    const priorityColor = priorityColors[task.priority];

    const row = document.createElement("section");
    row.className = "task-row bg-white pt-6 pl-5 pr-5 pb-6 rounded-2xl flex justify-between";
    row.innerHTML = `
      <p>${task.name}</p>
      <section class="flex justify-between w-100">
        <p style="color:${priorityColor}; font-weight:bold;">${task.priority}</p>
        <p>${task.status}</p>
        <div class="flex gap-3">
          <i class="fa-solid fa-pen-to-square text-2xl cursor-pointer" style="color:#3d1fff;" data-index="${i}"></i>
          <i class="fa-solid fa-trash text-2xl cursor-pointer" style="color:#fa0c0c;" data-index="${i}"></i>
        </div>
      </section>
    `;

    taskList.appendChild(row);

    const editIcon = row.querySelectorAll("i")[0];
    const trashIcon = row.querySelectorAll("i")[1];

    editIcon.addEventListener("click", function() { openEditModal(i); });
    trashIcon.addEventListener("click", function() { openDeleteModal(i); });
  }
}

function openDeleteModal(index) {
  deleteIndex = index;
  deleteModal.showModal();
}

function openEditModal(index) {
  editIndex = index;
  const task = tasks[index];

  document.getElementById("edit-input").value = task.name;
  editPriority = task.priority;
  editStatus = task.status;

  resetButtons("#edit-modal .priority-btn");
  resetButtons("#edit-modal .status-btn");

  const priorityBtns = document.querySelectorAll("#edit-modal .priority-btn");
  for (let i = 0; i < priorityBtns.length; i++) {
    if (priorityBtns[i].textContent.trim() === task.priority) {
      activatePriorityBtn(priorityBtns[i]);
    }
  }

  const statusBtns = document.querySelectorAll("#edit-modal .status-btn");
  for (let i = 0; i < statusBtns.length; i++) {
    if (statusBtns[i].textContent.trim() === task.status) {
      activateStatusBtn(statusBtns[i]);
    }
  }

  editModal.showModal();
}

function resetButtons(selector) {
  const btns = document.querySelectorAll(selector);
  for (let i = 0; i < btns.length; i++) {
    btns[i].style.backgroundColor = "";
    btns[i].style.color = "";
  }
}

function activatePriorityBtn(btn) {
  const label = btn.textContent.trim();
  btn.style.backgroundColor = priorityColors[label];
  btn.style.color = "#fff";
}

function activateStatusBtn(btn) {
  btn.style.backgroundColor = "#22d3ee";
  btn.style.color = "#fff";
}

const dialogPriorityBtns = document.querySelectorAll("#dialog .priority-btn");
for (let i = 0; i < dialogPriorityBtns.length; i++) {
  dialogPriorityBtns[i].addEventListener("click", function() {
    resetButtons("#dialog .priority-btn");
    activatePriorityBtn(this);
    selectedPriority = this.textContent.trim();
  });
}

const dialogStatusBtns = document.querySelectorAll("#dialog .status-btn");
for (let i = 0; i < dialogStatusBtns.length; i++) {
  dialogStatusBtns[i].addEventListener("click", function() {
    resetButtons("#dialog .status-btn");
    activateStatusBtn(this);
    selectedStatus = this.textContent.trim();
  });
}

const editPriorityBtns = document.querySelectorAll("#edit-modal .priority-btn");
for (let i = 0; i < editPriorityBtns.length; i++) {
  editPriorityBtns[i].addEventListener("click", function() {
    resetButtons("#edit-modal .priority-btn");
    activatePriorityBtn(this);
    editPriority = this.textContent.trim();
  });
}

const editStatusBtns = document.querySelectorAll("#edit-modal .status-btn");
for (let i = 0; i < editStatusBtns.length; i++) {
  editStatusBtns[i].addEventListener("click", function() {
    resetButtons("#edit-modal .status-btn");
    activateStatusBtn(this);
    editStatus = this.textContent.trim();
  });
}

document.getElementById("add-task").addEventListener("click", function() {
  document.getElementById("add-input").value = "";
  selectedPriority = "";
  selectedStatus = "";
  resetButtons("#dialog .priority-btn");
  resetButtons("#dialog .status-btn");
  dialog.showModal();
});

document.getElementById("close-modal").addEventListener("click", function() {
  dialog.close();
});

document.getElementById("submit-form").addEventListener("click", function() {
  const name = document.getElementById("add-input").value.trim();

  if (name === "") {
    alert("Please enter a task name.");
    return;
  }

  const priority = selectedPriority !== "" ? selectedPriority : "Medium";
  const status = selectedStatus !== "" ? selectedStatus : "To Do";

  tasks.unshift({ name: name, priority: priority, status: status });
  renderTasks();
  dialog.close();
});

document.getElementById("confirm-delete").addEventListener("click", function() {
  tasks.splice(deleteIndex, 1);
  deleteIndex = null;
  renderTasks();
  deleteModal.close();
});

document.getElementById("cancel-delete").addEventListener("click", function() {
  deleteModal.close();
});

document.getElementById("close-edit-modal").addEventListener("click", function() {
  editModal.close();
});

document.getElementById("cancel-form").addEventListener("click", function() {
  editModal.close();
});

document.getElementById("submit-edit-form").addEventListener("click", function() {
  const name = document.getElementById("edit-input").value.trim();

  if (name === "") {
    alert("Please enter a task name.");
    return;
  }

  if (editPriority === "") {
    alert("Please select a priority.");
    return;
  }

  if (editStatus === "") {
    alert("Please select a status.");
    return;
  }

  tasks[editIndex] = { name: name, priority: editPriority, status: editStatus };
  editIndex = null;
  renderTasks();
  editModal.close();
});

renderTasks();