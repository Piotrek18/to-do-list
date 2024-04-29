import Task from "./task";
import Project from "./project";

function newTaskDialog(selectedProject) { //selected project do wyjebania jc
    
    if(!selectedProject) {
        alert("Please select a project first.");
        return
    }
    
    const taskDialog = document.createElement("div");
    taskDialog.id = "taskDialog";

    const titleInputField = document.createElement("input");
    titleInputField.type = "text";
    titleInputField.id = "taskTitle";
    titleInputField.placeholder = "enter task title";

    const descInputField = document.createElement("input");
    descInputField.type = "text";
    descInputField.id = "taskDescription";
    descInputField.placeholder = "description";

    const dateInput = document.createElement("input");
    dateInput.type = "date";
    dateInput.id = "dueDate";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.id = "submitBtn";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.id = "cancelBtn";

    taskDialog.appendChild(titleInputField);
    taskDialog.appendChild(descInputField);
    taskDialog.appendChild(dateInput);
    taskDialog.appendChild(submitBtn);
    taskDialog.appendChild(cancelBtn);

    function closeDialog(){
        taskDialog.remove();
    }

    submitBtn.onclick = function() {
        const title = titleInputField.value;
        const description = descInputField.value;
        const date = dateInput.value;

        const newTask = new Task(title, description, date);
        selectedProject.addTaskToProject(newTask);

        console.log("New Task Created: ", newTask);
        console.log("new task added to project", selectedProject);


        const taskDiv = document.createElement("div");
        taskDiv.textContent = `Title: ${newTask.title}, Description: ${newTask.description}, Date: ${newTask.date}`;

        const taskContainer = document.getElementById("taskContainer");
        taskContainer.appendChild(taskDiv);

        closeDialog();
    }

    cancelBtn.onclick = function() {
        closeDialog();
    }

    document.body.appendChild(taskDialog);

}

export {newTaskDialog};