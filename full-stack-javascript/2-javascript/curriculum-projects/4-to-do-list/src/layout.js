import project from "./project.js";
import storage from "./storage.js";

export default class layout {
    contentContainer = document.querySelector("#content");
    activeProjectId = null;
    
    drawLayout() {
        const activeProject = this.renderSidebar();
        this.renderTodoList(activeProject.todos);
    };

    renderSidebar() {
        const sidebarContainer = document.createElement("div");
        sidebarContainer.id = "sidebar";
        sidebarContainer.innerHTML =
        `<button id="all-tasks-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M520-600v-240h320v240H520ZM120-440v-400h320v400H120Zm400 320v-400h320v400H520Zm-400 0v-240h320v240H120Zm80-400h160v-240H200v240Zm400 320h160v-240H600v240Zm0-480h160v-80H600v80ZM200-200h160v-80H200v80Zm160-320Zm240-160Zm0 240ZM360-280Z"/></svg>
                <span>All tasks</span>
            </button>
            <h2 id="my-projects-txt">My projects</h2>
            <div id="projects"></div>
            <button id="new-project-btn">
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M440-280h80v-160h160v-80H520v-160h-80v160H280v80h160v160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                <span>New Project</span>
            </button>`;

        sidebarContainer.querySelector("#all-tasks-btn").addEventListener("click", () => {
            console.log("All tasks button clicked!");

            sidebarContainer.querySelector("#all-tasks-btn").classList.add("active");

            
            // Clear active state off every project
            document.querySelectorAll("#projects > div").forEach((div) => {
                div.dataset.active = false;
            });
            this.activeProjectId = null;

            let allTodos = [];

            const projects = storage.getAllProjects();
            projects.forEach((project) => {
                project.todos.forEach((todo) => {
                    allTodos.push(todo);
                });
            });

            this.renderTodoList(allTodos);
        });

        this.contentContainer.appendChild(sidebarContainer);

        this.createDialogElements();

        return this.renderSidebarProjects();
    };
    createDialogElements() {

        const createProjectDialog = document.createElement("dialog");
        createProjectDialog.open = false;
        createProjectDialog.id = "create-project-dialog";
        createProjectDialog.innerHTML =
        `<form id="create-project-form">
            <div>
                <h1>Create Project</h1>
                <p>Create a new project by filling out the fields.</p>
            </div>
            <div>
                <div>
                    <label for="form-project-title">Title</label>
                    <input id="form-project-title" type="text" placeholder="My project">
                </div>
                <div>
                <label for="form-project-description">Description</label>
                <input id="form-project-description" type="text" placeholder="My project description.">
                </div>
            </div>
            <div>
                <button type="submit">Add project</button>
            </div>
        </form>`

        this.contentContainer.appendChild(createProjectDialog)

        document.querySelector("#new-project-btn").addEventListener("click", () => {
            createProjectDialog.showModal();
        })  

        createProjectDialog.querySelector("#create-project-form")
        .addEventListener("submit", (event) => {
            event.preventDefault();

            const title = createProjectDialog.querySelector("#create-project-form #form-project-title").value;
            const description = createProjectDialog.querySelector("#create-project-form #form-project-description").value;
            
            if (title === "" && description === "") {
                const newProject = new project()
                storage.addProject(newProject);
                this.activeProjectId = newProject.id;
            } else if (title === "" & description !== "") {
                const newProject = new project(undefined, description)
                storage.addProject(newProject);
                this.activeProjectId = newProject.id;
            } else if (title !== "" & description === "") {
                const newProject = new project(title, undefined)
                storage.addProject(newProject);
                this.activeProjectId = newProject.id;
            } else {
                const newProject = new project(title, description)
                storage.addProject(newProject);
                this.activeProjectId = newProject.id;
            };
            
            createProjectDialog.close();
            const newActiveProject = this.renderSidebarProjects();
            if (newActiveProject) this.renderTodoList(newActiveProject.todos);
        });
    };

    renderSidebarProjects() {
        const projects = storage.getAllProjects();
        const projectsContainer = document.querySelector("#projects");
        projectsContainer.textContent = "";

        let activeProject;
        let first = true;

        projects.forEach((project) => {
            const projectContainer = document.createElement("div");

            projectContainer.id = project.id;

            if (project.id === this.activeProjectId) {
                projectContainer.dataset.active = true;
                activeProject = project;
            } else {
                projectContainer.dataset.active = false;
            }

            projectContainer.innerHTML = 
            `<div>
                <h3>${project.title}</h3>
                 <p>${project.description}</p>
            </div>
             <div class="project-action-button">
                 <button id="edit-project-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg>
                 </button>
                 <button id="delete-project-btn">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                 </button>
             </div>`;

            projectContainer.addEventListener("click", () => {
                console.log(`Project ${project.id} clicked!`);

                document.querySelector("#all-tasks-btn").classList.remove("active");

                const activeProject = projectsContainer.querySelector("[data-active='true']");

                if (activeProject) activeProject.dataset.active = false;

                projectContainer.dataset.active = true;

                this.activeProjectId = project.id;

                this.renderTodoList(project.todos);
            });

            const buttons = projectContainer.querySelectorAll("button");

            let active = true;
            let enterHandler = null;

            buttons.forEach((button) => {
            button.addEventListener("click", () => {
                event.stopPropagation();

                switch (button.id) {
                    case "edit-project-btn":

                        // Enter editing mode
                        if (active) {
                            const infoContainer =
                                projectContainer.querySelector("div:nth-child(1)");

                            infoContainer.textContent = "";
                            projectContainer.dataset.editing = true;

                            const titleInput = document.createElement("input");
                            titleInput.id = "project-title-input";
                            titleInput.type = "text";
                            titleInput.value = project.title;
                            titleInput.placeholder = "Project title";

                            const descriptionInput = document.createElement("input");
                            descriptionInput.id = "project-description-input";
                            descriptionInput.type = "text";
                            descriptionInput.value = project.description;
                            descriptionInput.placeholder = "Project description";

                            titleInput.value = project.title;
                            descriptionInput.value = project.description;

                            infoContainer.appendChild(titleInput);
                            infoContainer.appendChild(descriptionInput);

                            const btnsContainer =
                                projectContainer.querySelector("div:nth-child(2)");

                            // Hide delete button
                            btnsContainer.querySelector(
                                "#delete-project-btn"
                            ).style.display = "none";

                            active = false;

                            // Listen for Enter anywhere on the page
                            enterHandler = (event) => {
                                if (event.key === "Enter" && !active) {
                                    button.click();
                                }
                            };

                            document.addEventListener("keydown", enterHandler);

                        // Save project
                        } else {
                            const titleVal =
                                projectContainer.querySelector("input:nth-child(1)").value;

                            const descVal =
                                projectContainer.querySelector("input:nth-child(2)").value;

                            // Remove global Enter listener
                            if (enterHandler) {
                                document.removeEventListener(
                                    "keydown",
                                    enterHandler
                                );

                                enterHandler = null;
                            }

                            storage.editProject(
                                project.id,
                                titleVal,
                                descVal
                            );

                            active = true;
                            projectContainer.dataset.editing = false;

                            this.renderSidebarProjects();
                        }
                        break;


                    case "delete-project-btn":
                        storage.deleteProject(project.id);
                        const newActiveProject = this.renderSidebarProjects();
                        this.renderTodoList(newActiveProject ? newActiveProject.todos : []);
                        break;
                    }
                });
            });

            projectsContainer.appendChild(projectContainer);
            if (first) first = !first;
        })

        // Fallback: activeProjectId no longer matches any existing project
        // (e.g. it was just deleted), or there was no active project set yet.
        if (!activeProject && projects.length > 0) {
            activeProject = projects[0];
            this.activeProjectId = activeProject.id;

            const fallbackContainer = document.getElementById(activeProject.id);
            if (fallbackContainer) fallbackContainer.dataset.active = true;
        }

        return activeProject;
    }

    renderTodoList(todos) {
        if (document.querySelector("#todos-area")) document.querySelector("#todos-area").remove();
        const todoArea = document.createElement("div");
        todoArea.id = "todos-area";

        todos.forEach((todo) => {
            const todoCard = document.createElement("div");
            todoCard.id = todo.id;

            todoCard.innerHTML =
            `<div>
                <h4>${todo.title}</h4>
                <p>${todo.description}</p>  
            </div>
            <div>
                <h5>Checklist</h5>
                <ol>
                    <li>Do this...</li>
                    <li>Do that...</li>
                    <li>Three</li>
                </ol>
            </div>
            <div>
                <h5>Notes</h5>
                <ul>
                    <li>This is a default note.</li>
                    <li>Two</li>
                    <li>Three</li>
                </ul>
            </div>
            <div>
                <p>Priority: ${todo.priority}</p>
                <p>Due: ${todo.dueDate}</p>
                <button class="todo-check-button">
                    <svg class="checked-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="m424-312 282-282-56-56-226 226-114-114-56 56 170 170ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
                    <svg class="unchecked-icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="currentColor"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Z"/></svg>
                </button>
            </div>`;

            const todoCardCheckBtn = todoCard.querySelector(".todo-check-button");
            if (todo.completed) {
                todoCardCheckBtn.dataset.checked = true
            } else {
                todoCardCheckBtn.dataset.checked = false
            };

            todoArea.appendChild(todoCard);
        });

        this.contentContainer.appendChild(todoArea);
    };
};


