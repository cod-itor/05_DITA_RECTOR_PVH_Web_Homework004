const button = document.getElementById("add-task");
const dialog = document.getElementById("dialog");
const closeModal = document.getElementById("close-modal");
const taskInput = document.getElementById("task-input");
const highPriority = document.getElementById("high-priority")


button.addEventListener("click" , () => {
    dialog.showModal();
})
closeModal.addEventListener("click" , () => {
    dialog.close();
} )


highPriority.addEventListener("click" , () => {
    
}
)