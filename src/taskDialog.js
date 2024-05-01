import Task from "./task";
import { saveProjectsToLocalStorage, } from "./storage";
import Project from "./project";

function renderTasks(project, taskContainer, projects) {
    taskContainer.innerHTML = ""; 
    project.tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.textContent = `Title: ${task.title}, Description: ${task.description}, Date: ${task.date}`;

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.textContent = "Delete Task";
        deleteTaskBtn.classList.add("deleteTaskBtn");
        deleteTaskBtn.addEventListener("click", () => {
            deleteTask(taskDiv, task, project,projects);
        });

        taskDiv.appendChild(deleteTaskBtn);
        taskContainer.appendChild(taskDiv);
    });

}

function newTaskDialog(project, taskContainer, projects) {
    if (!project) {
        alert("Please select a project first.");
        return null;
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
        //console.log("Project:", project); 
        //console.log("Type of project:", typeof project); 
        //console.log("Projects:", projects); 
    
        if (typeof project.addTaskToProject === 'function') {
            console.log("addTaskToProject method found for project:", project);
            const title = titleInputField.value;
            const description = descInputField.value;
            const date = dateInput.value;
    
            const newTask = new Task(title, description, date);
            project.addTaskToProject(newTask);

            console.log("New Task Created: ", newTask);
            console.log("New task added to project:", project);
    
            saveProjectsToLocalStorage(projects);

            renderTasks(project, taskContainer, projects);

            closeDialog();
    
            return newTask;
        } else {
            console.log("addTaskToProject method not found for project:", project);
            console.log("Project object:", project);
        }
    }
    

    cancelBtn.onclick = function() {
        closeDialog();
        return null;
    }

    document.body.appendChild(taskDialog);
}

function deleteTask(taskDiv, task, project, projects) {
    taskDiv.remove();

    const index = project.tasks.indexOf(task);
    if (index !== -1) {
        project.removeTask(index);
    }

    saveProjectsToLocalStorage(projects);
}

export { newTaskDialog, renderTasks, deleteTask };
