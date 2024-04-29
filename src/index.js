import Project from "./project";
import { newTaskDialog } from "./taskDialog";
import Task from "./task";

let selectedProject = null;

const projects = [];

function deleteProject(projectDiv, project) {
    projectDiv.remove();

    const index = projects.indexOf(project);
    if(index !== -1) {
        projects.splice(index, 1);
    }

}


function createProject(name) {
    const newProject = new Project(name);
    projects.push(newProject);
    const projectDiv = document.createElement("div");
    projectDiv.textContent = name;
    projectDiv.classList.add("project"); //chat

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "delete Project";
    deleteProjectBtn.classList.add("deleteProjectBtn");
    deleteProjectBtn.addEventListener('click', () => {
        deleteProject(projectDiv, newProject);
    })

    const addTaskBtn = document.createElement("button");
    addTaskBtn.textContent = "Add Task";
    addTaskBtn.classList.add("addTaskBtn");

    addTaskBtn.addEventListener("click", () => {
        newTaskDialog(newProject);
    }); //chat

    const deleteTaskBtn = document.createElement("button");
    deleteTaskBtn.textContent = "delete task";
    deleteTaskBtn.classList.add("deleteTaskBtn");
    addTaskBtn.addEventListener("click", () => {
        //remove task code ??
    }); 
    projectDiv.appendChild(deleteProjectBtn);
    projectDiv.appendChild(addTaskBtn);
    projectDiv.appendChild(deleteTaskBtn);

    document.getElementById("projectsContainer").appendChild(projectDiv);
}

function createProjectDialog() {
    // Sprawdzamy, czy istnieje już okno dialogowe, jeśli tak, usuwamy je
    const existingDialog = document.getElementById("customDialog");
    if (existingDialog) {
        existingDialog.remove();
    }

    // Tworzymy elementy HTML dla niestandardowego okna dialogowego
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

    // Dodajemy elementy do niestandardowego okna dialogowego
    customDialog.appendChild(inputField);
    customDialog.appendChild(submitBtn);
    customDialog.appendChild(cancelBtn);

    // Dodajemy niestandardowe okno dialogowe do dokumentu
    document.body.appendChild(customDialog);

    // Dodajemy obsługę kliknięcia przycisku submit
    submitBtn.onclick = function() {
        const projectNameInput = document.getElementById("projectName");
        const projectName = projectNameInput.value;

        if (projectName.trim() === "") {
            alert("Please enter a project name.");
            return;
        }

        // Tworzymy nowy obiekt klasy Project
        const newProject = new Project(projectName);

        createProject(projectName);

        console.log("Utworzono nowy projekt:", newProject);

        // Usuwamy okno dialogowe po zatwierdzeniu
        customDialog.remove();

        // Czyszczymy pole tekstowe po zatwierdzeniu
        projectNameInput.value = "";
    };

    cancelBtn.onclick = function() {
        customDialog.remove();
    };
}

document.getElementById("addProjectBtn").addEventListener("click", createProjectDialog);

document.getElementById("consoleCheckBtn").addEventListener('click', () => {
    console.log(projects);
});