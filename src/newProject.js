import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage } from "./storage";
import Project from "./project";
import { newTaskDialog, renderTasks } from "./newTask";

let projects = [];

projects = loadProjectsFromLocalStorage();
renderProjects();

function renderProjects() {
    const projectsContainer = document.getElementById("projectsContainer");
    projectsContainer.innerHTML = ""; 

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.textContent = project.title;
        projectDiv.classList.add("project");

        const taskContainer = document.createElement("div");
        taskContainer.classList.add("taskContainer");
        project.element = taskContainer;

        const deleteProjectBtn = document.createElement("button");
        deleteProjectBtn.textContent = "delete Project";
        deleteProjectBtn.classList.add("deleteProjectBtn");
        deleteProjectBtn.addEventListener('click', () => {
            deleteProject(projectDiv, project);
        });

        const addTaskBtn = document.createElement("button");
        addTaskBtn.textContent = "Add Task";
        addTaskBtn.classList.add("addTaskBtn");

        addTaskBtn.addEventListener("click", () => {
            const newTask = newTaskDialog(project, taskContainer, projects);
            if (newTask) {
                project.addTaskToProject(newTask); 
                renderTasks(project, taskContainer, projects); 
            }
        });

        renderTasks(project, taskContainer, projects);

        projectDiv.appendChild(taskContainer);
        projectDiv.appendChild(addTaskBtn);
        projectDiv.appendChild(deleteProjectBtn);

        projectsContainer.appendChild(projectDiv);

        
    });
}

function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    renderProjects();

    saveProjectsToLocalStorage(projects);
}

function deleteProject(projectDiv, project) {
    projectDiv.remove();

    const index = projects.indexOf(project);
    if(index !== -1) {
        projects.splice(index, 1);
    }

    renderProjects();

    saveProjectsToLocalStorage(projects);

}

function createProjectDialog() {

    const existingDialog = document.getElementById("customDialog");
    if (existingDialog) {
        existingDialog.remove();
    }

    const customDialog = document.createElement("div");
    customDialog.id = "customDialog";

    const inputField = document.createElement("input");
    inputField.type = "text";
    inputField.id = "projectName";
    inputField.placeholder = "Enter project name";

    const submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit";
    submitBtn.id = "submitBtn";

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.id = "cancelBtn";

    customDialog.appendChild(inputField);
    customDialog.appendChild(submitBtn);
    customDialog.appendChild(cancelBtn);

    document.body.appendChild(customDialog);

    submitBtn.onclick = function() {
        const projectNameInput = document.getElementById("projectName");
        const projectName = projectNameInput.value;

        if (projectName.trim() === "") {
            alert("Please enter a project name.");
            return;
        }

        createProject(projectName);

        console.log("Utworzono nowy projekt:", projectName);

        customDialog.remove();

        projectNameInput.value = "";
    };

    cancelBtn.onclick = function() {
        customDialog.remove();
    };
}

export {createProjectDialog, renderProjects };