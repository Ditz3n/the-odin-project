import project from "./project.js";

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
        projects.push(projectObject);
        saveProjects();
    };
    const deleteProject = (id) => {
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
        addProject(new project("Default project", "This is a default project."));
    };
        
    return { getAllProjects, getProject, addProject, deleteProject, editProject };
})();

export default storage;