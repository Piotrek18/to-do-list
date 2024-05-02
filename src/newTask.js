import Task from "./task";
import { saveProjectsToLocalStorage, } from "./storage";

function renderTasks(project, taskContainer, projects) {
    taskContainer.innerHTML = "";
    project.tasks.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("taskItem");

        const taskTitle = document.createElement("p");
        taskTitle.textContent = `Title: ${task.title}`;

        const taskDescription = document.createElement("p");
        taskDescription.textContent = `Description: ${task.description}`;

        const taskDate = document.createElement("p");
        taskDate.textContent = `Date: ${task.date}`;

        const deleteTaskBtn = document.createElement("button");
        deleteTaskBtn.textContent = "Delete Task";
        deleteTaskBtn.classList.add("deleteTaskBtn");
        deleteTaskBtn.addEventListener("click", () => {
            deleteTask(taskDiv, task, project, projects);
        });

        taskDiv.appendChild(taskTitle);
        taskDiv.appendChild(taskDescription);
        taskDiv.appendChild(taskDate);
        taskDiv.appendChild(deleteTaskBtn);
        taskContainer.appendChild(taskDiv);
    });
}

function newTaskDialog(project, taskContainer, projects) {  
    const taskDialog = document.createElement("div");
    taskDialog.id = "taskDialog";

    const titleInputField = document.createElement("input");
    titleInputField.type = "text";
    titleInputField.id = "taskTitle";
    titleInputField.placeholder = "enter task title";

    const descInputField = document.createElement("textarea");
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
        project.addTaskToProject(newTask);
        saveProjectsToLocalStorage(projects);
        renderTasks(project, taskContainer, projects);
        closeDialog();
        return newTask;
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

export { newTaskDialog, renderTasks };
