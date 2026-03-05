const button = document.getElementById("add-task");
const dialog = document.getElementById("dialog");
const closeModal = document.getElementById("close-modal");
const taskInput = document.getElementById("task-input");
const highPriority = document.getElementById("high-priority")
const deleteModal = document.getElementById("delete-modal")
const deleteButton = document.getElementById("delete-button")
const deleteConfirmYes = document.getElementById("confirm-delete")
const deleteConfirmNo = document.getElementById("cancel-delete")
const editButton = document.getElementById("edit-button")
const editModal = document.getElementById("edit-modal")
const closeEditModal = document.getElementById("close-edit-modal")
const cancelForm = document.getElementById("cancel-form")

button.addEventListener("click" , () => {
    dialog.showModal();
})
closeModal.addEventListener("click" , () => {
    dialog.close();
})

highPriority.addEventListener("click" , () => {
    
})

deleteButton.addEventListener("click", () =>{
    deleteModal.showModal();
})
deleteConfirmNo.addEventListener("click", () => {
    deleteModal.close();
})
deleteConfirmYes.addEventListener("click", () => {
    deleteModal.close();
})

editButton.addEventListener("click" , () => {
    editModal.showModal();
})
closeEditModal.addEventListener("click", () => {
    editModal.close();
})
cancelForm.addEventListener("click", () => {
    editModal.close();
})