import { format } from "date-fns";
import todo from "./todos.js";

export default class project {
    constructor(title = "Unnamed",
                description = "No description.",
                id = crypto.randomUUID(),
                todos = [],
                creationDate = format(new Date(), "MM/dd/yyyy"))
    {
        this.id = id;
        this.title = title;
        this.description = description;
        this.todos = todos
        .filter((todoData) => todoData !== null)
        .map((todoData) => new todo(
            todoData.id,
            todoData.title,
            todoData.description,
            todoData.dueDate,
            todoData.priority,
            todoData.notes,
            todoData.checklist,
            todoData.completed
        ));
        this.creationDate = creationDate;
    };

    addTodo(todoObject) {
        this.todos.push(todoObject);
    };

    removeTodo(id) {
        const todoIndex = this.todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) this.todos.splice(todoIndex, 1);
    };

    completeTodo(id) {
        const todo = this.todos.find((todo) => todo.id === id);

        if (!todo) return;
  
        todo.toggleComplete();
    };

    editTodo(id, title, description, dueDate, priority, notes, checklist, completed) {
        const todo = this.todos.find((todo) => todo.id === id);
        
        if (!todo) return;

        const updates = {
            title,
            description,
            dueDate,
            priority,
            notes,
            checklist,
            completed
        };

        Object.entries(updates).forEach(([key, value]) => {
            if (value !== undefined) {
                todo[key] = value;
            };
        });
    };

    getTodo(id) {
        const todo = this.todos.find((todo) => todo.id === id);
        
        if (!todo) return;
            
        return todo;
    };
};