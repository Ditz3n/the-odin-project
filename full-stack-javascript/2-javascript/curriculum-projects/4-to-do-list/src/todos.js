import { format, add } from "date-fns";

export default class todo {
    constructor(id = crypto.randomUUID(),
                title = "Default",
                description = "This is a default todo task.", 
                dueDate = format(add(new Date(), {days: 5}), "MM/dd/yyyy"), 
                priority = "medium", 
                notes =  [
                    { id: crypto.randomUUID(), text: "This is a default note."}
                ],
                checklist = [
                    { id: crypto.randomUUID(), text: "Do this...", checked: false },
                    { id: crypto.randomUUID(), text: "Do that...", checked: false },
                ],
                completed = false) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.notes = notes;
        this.checklist = checklist;
        this.completed = completed;
    };

    // Notes
    addNotesItem(text) {
        if (text === "") return false;
        this.notes.push({id: crypto.randomUUID(), text: text});
    };
    removeNotesItem(id) {
        const noteIndex = this.notes.findIndex((item) => item.id === id);
        if (noteIndex !== -1) this.notes.splice(noteIndex, 1);
    };

    // Checklist
    addChecklistItem(text) {
        if (text === "") return false;
        this.checklist.push({id: crypto.randomUUID(), text: text, checked: false});
    };
    removeChecklistItem(id) {
        const checklistItemIndex = this.checklist.findIndex((item) => item.id === id);
        if (checklistItemIndex !== -1) this.checklist.splice(checklistItemIndex, 1);
    };
    toggleChecklistItem(id) {
        const checklistItem = this.checklist.find((item) => item.id === id);
        
        if (!checklistItem) return; 
        
        checklistItem.checked = !checklistItem.checked;
    };

    // General
    toggleComplete() {
        this.completed = !this.completed;
    };
};