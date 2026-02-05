// Task Manager Application
class TaskManager {
    constructor() {
        this.tasks = [];
        this.storageKey = 'taskManagerTasks';
        this.currentFilter = 'all'; // 'all', 'pending', 'completed'
        this.initElements();
        this.loadTheme();
        this.attachEventListeners();
        this.loadTasks();
        this.render();
    }

    /**
     * Initialize DOM elements
     */
    initElements() {
        this.form = document.getElementById('taskForm');
        this.input = document.getElementById('taskInput');
        this.tasksList = document.getElementById('tasksList');
        this.tasksContainer = document.getElementById('tasksContainer');
        this.emptyState = document.getElementById('emptyState');
        this.formError = document.getElementById('formError');
        this.totalCountEl = document.getElementById('totalCount');
        this.completedCountEl = document.getElementById('completedCount');
        this.clearCompletedBtn = document.getElementById('clearCompletedBtn');
        this.filterAllBtn = document.getElementById('filterAll');
        this.filterPendingBtn = document.getElementById('filterPending');
        this.filterCompletedBtn = document.getElementById('filterCompleted');
        this.themeToggle = document.getElementById('themeToggle');
        this.themeState = document.getElementById('themeState');
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleAddTask(e));
        this.clearCompletedBtn.addEventListener('click', () => this.clearCompleted());
        this.input.addEventListener('input', () => this.clearError());

        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        // Filter button listeners
        this.filterAllBtn.addEventListener('click', () => this.setFilter('all'));
        this.filterPendingBtn.addEventListener('click', () => this.setFilter('pending'));
        this.filterCompletedBtn.addEventListener('click', () => this.setFilter('completed'));

        // Keyboard navigation: Arrow keys and Escape for accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.input.blur();
            }
        });
    }

    /**
     * Handle adding a new task
     */
    handleAddTask(e) {
        e.preventDefault();
        const taskText = this.input.value.trim();

        if (!taskText) {
            this.showError('Please enter a task description');
            this.input.focus();
            return;
        }

        if (taskText.length > 200) {
            this.showError('Task description cannot exceed 200 characters');
            return;
        }

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString(),
        };

        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        this.input.value = '';
        this.input.focus();
        this.clearError();
    }

    /**
     * Toggle task completion status
     */
    toggleTask(id) {
        const task = this.tasks.find((t) => t.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    /**
     * Delete a task
     */
    deleteTask(id) {
        this.tasks = this.tasks.filter((t) => t.id !== id);
        this.saveTasks();
        this.render();
    }

    /**
     * Clear all completed tasks
     */
    clearCompleted() {
        const completedCount = this.tasks.filter((t) => t.completed).length;
        
        if (completedCount === 0) {
            return;
        }

        if (confirm(`Delete ${completedCount} completed task(s)?`)) {
            this.tasks = this.tasks.filter((t) => !t.completed);
            this.saveTasks();
            this.render();
        }
    }

    /**
     * Save tasks to localStorage
     */
    saveTasks() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.tasks));
        } catch (error) {
            console.error('Failed to save tasks:', error);
            this.showError('Unable to save tasks. Please try again.');
        }
    }

    /**
     * Load tasks from localStorage
     */
    loadTasks() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            this.tasks = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load tasks:', error);
            this.tasks = [];
        }
    }

    /**
     * Show error message
     */
    showError(message) {
        this.formError.textContent = message;
        this.formError.classList.add('show');
    }

    /**
     * Clear error message
     */
    clearError() {
        this.formError.textContent = '';
        this.formError.classList.remove('show');
    }

    /**
     * Set the current filter
     */
    setFilter(filter) {
        this.currentFilter = filter;
        this.updateFilterButtons();
        this.render();
    }

    /**
     * Update filter button states
     */
    updateFilterButtons() {
        const buttons = {
            all: this.filterAllBtn,
            pending: this.filterPendingBtn,
            completed: this.filterCompletedBtn,
        };

        Object.entries(buttons).forEach(([key, btn]) => {
            if (key === this.currentFilter) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    /**
     * Load saved theme preference or use system preference
     */
    loadTheme() {
        try {
            const stored = localStorage.getItem('sageTheme');
            if (stored) {
                this.applyTheme(stored);
                return;
            }
        } catch (e) {
            // ignore
        }

        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.applyTheme(prefersDark ? 'dark' : 'light');
    }

    /**
     * Apply theme and persist preference
     */
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        try {
            localStorage.setItem('sageTheme', theme);
        } catch (e) {
            // ignore
        }

        if (this.themeToggle) {
            const pressed = theme === 'dark';
            this.themeToggle.setAttribute('aria-pressed', pressed ? 'true' : 'false');
        }

        // Update state label
        if (this.themeState) {
            this.themeState.textContent = theme === 'dark' ? 'On' : 'Off';
        }
    }

    /**
     * Toggle between light and dark themes
     */
    toggleTheme() {
        const current = document.body.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        this.applyTheme(next);
    }

    /**
     * Get filtered tasks based on current filter
     */
    getFilteredTasks() {
        switch (this.currentFilter) {
            case 'pending':
                return this.tasks.filter((t) => !t.completed);
            case 'completed':
                return this.tasks.filter((t) => t.completed);
            case 'all':
            default:
                return this.tasks;
        }
    }

    /**
     * Update statistics
     */
    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter((t) => t.completed).length;

        this.totalCountEl.textContent = total;
        this.completedCountEl.textContent = completed;

        // Update clear completed button state
        this.clearCompletedBtn.disabled = completed === 0;
    }

    /**
     * Render tasks to the DOM
     */
    render() {
        this.tasksList.innerHTML = '';
        const filteredTasks = this.getFilteredTasks();

        if (this.tasks.length === 0) {
            this.emptyState.style.display = 'block';
            this.emptyState.querySelector('.empty-message').textContent = 'No tasks yet. Add one to get started!';
            this.tasksList.style.display = 'none';
        } else if (filteredTasks.length === 0) {
            this.emptyState.style.display = 'block';
            const filterText = {
                pending: 'No pending tasks',
                completed: 'No completed tasks',
                all: 'No tasks',
            };
            this.emptyState.querySelector('.empty-message').textContent = filterText[this.currentFilter];
            this.tasksList.style.display = 'none';
        } else {
            this.emptyState.style.display = 'none';
            this.tasksList.style.display = 'flex';

            filteredTasks.forEach((task) => {
                const li = this.createTaskElement(task);
                this.tasksList.appendChild(li);
            });
        }

        this.updateStats();
    }

    /**
     * Create a task list item element
     */
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-task-id', task.id);

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.setAttribute('aria-label', `Mark "${task.text}" as ${task.completed ? 'incomplete' : 'complete'}`);
        checkbox.addEventListener('change', () => this.toggleTask(task.id));

        const textSpan = document.createElement('span');
        textSpan.className = 'task-text';
        textSpan.textContent = task.text;
        textSpan.setAttribute('title', task.text);

        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-button';
        deleteBtn.innerHTML = '×';
        deleteBtn.setAttribute('aria-label', `Delete task: "${task.text}"`);
        deleteBtn.addEventListener('click', () => this.deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(deleteBtn);

        return li;
    }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new TaskManager();
});

// Handle service worker for offline support (optional enhancement)
if ('serviceWorker' in navigator) {
    // Service worker registration can be added here for PWA support
}