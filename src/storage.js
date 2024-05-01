import Project from "./project";

function saveProjectsToLocalStorage(projects) {
    localStorage.setItem('projects', JSON.stringify(projects.map(project => project.toJSON())));
}

function loadProjectsFromLocalStorage() {
    const projects = localStorage.getItem('projects');
    return projects ? JSON.parse(projects).map(projectData => {
        const project = new Project(projectData.title);
        project.tasks = projectData.tasks;
        return project;
    }) : [];
}

export { saveProjectsToLocalStorage, loadProjectsFromLocalStorage };
