const STORAGE_KEY = 'kanban_tasks_v1';

const INITIAL_TASKS = [
    {
        id: '1',
        title: 'Design UI Wireframes',
        description: 'Create responsive wireframes for the Kanban board using Figma.',
        priority: 'High',
        status: 'Todo',
        dueDate: '2026-11-05',
        createdAt: new Date().toISOString(),
    },
    {
        id: '2',
        title: 'Setup React Project with Vite',
        description: 'Initialize Vite with React, Tailwind CSS v4, and Lucide Icons.',
        priority: 'Medium',
        status: 'In Progress',
        dueDate: '2026-11-02',
        createdAt: new Date().toISOString(),
    },
    {
        id: '3',
        title: 'Read Documentation',
        description: 'Review state persistence patterns with LocalStorage.',
        priority: 'Low',
        status: 'Completed',
        dueDate: '2026-10-30',
        createdAt: new Date().toISOString(),
    },
];

export const loadTasksFromStorage = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : INITIAL_TASKS;
    } catch (error) {
        console.error('Failed to load tasks from local storage:', error);
        return INITIAL_TASKS;
    }
};

export const saveTasksToStorage = (tasks) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save tasks to local storage:', error);
    }
};