//import Task from "./task";

export default class Project {
    constructor(title) {
        this.title = title;
        this.tasks = [];
    }

    addTaskToProject(task) {
        this.tasks.push(task);
    }

    removeTask(index) {
        this.tasks.splice(index, 1);
    }

    toJSON() {
        return {
            title: this.title,
            tasks: this.tasks,
        };
    }
}
