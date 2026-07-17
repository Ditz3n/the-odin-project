import project from "./project.js";
import todo from "./todos.js";

const storage = (() => {
    let projects = [];

    const getAllProjects = () => {
        return projects;
    };
    const getProject = (id) => {
        const projectIndex = projects.findIndex((element) => element.id === id);
        if (projectIndex === -1) return null;
        return projects[projectIndex];
    };
    const addProject = (projectObject) => {
        console.log(`addProject() created a new project!\nid: ${projectObject.id}\ntitle: ${projectObject.title}\ndescription: ${projectObject.description} !`);
        projects.push(projectObject);
        saveProjects();
    };
    const deleteProject = (id) => {
        console.log(`deleteProject() called for: ${(id)} !`);
        const projectIndex = projects.findIndex((element) => element.id === id);
        if (projectIndex !== -1) projects.splice(projectIndex, 1);
        saveProjects();
    };
    const editProject = (id, title, description) => {
        const projectIndex = projects.findIndex((element) => element.id === id);
        if (title !== undefined && projectIndex !== -1) projects[projectIndex].title = title;
        if (description !== undefined && projectIndex !== -1) projects[projectIndex].description = description;
        saveProjects();
    };

    const saveProjects = () => {
        localStorage.setItem("projects", JSON.stringify(projects));
    };

    let localStorageProjects = JSON.parse(localStorage.getItem("projects"));

    if (localStorageProjects !== null && localStorageProjects.length > 0) {
        localStorageProjects.map((projectElement) => {
            addProject(new project(projectElement.title, projectElement.description,
                                   projectElement.id, projectElement.todos,
                                   projectElement.creationDate));
        });

    } else {
        const firstDefaultProject = new project("Default Project #1", "This is a default project.");
        const secondDefaultProject = new project("Default Project #2", "This is another default project.");

        for (let i = 1; i <= 10; i++) firstDefaultProject.addTodo(new todo(undefined, `Default 1.${i}`));
        for (let i = 1; i <= 6; i++) secondDefaultProject.addTodo(new todo(undefined, `Default 2.${i}`));
        
        addProject(firstDefaultProject);
        addProject(secondDefaultProject);
    };
        
    return { getAllProjects, getProject, addProject, deleteProject, editProject };
})();

export default storage;