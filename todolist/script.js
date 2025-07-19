document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------
    // 1. DOM ELEMENT REFERENCES
    // ----------------------------
    const todoInput = document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
    const todoList = document.getElementById("todo-list");

    // ----------------------------
    // 2. INITIALIZE TASK ARRAY
    // ----------------------------
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render all previously saved tasks on page load
    tasks.forEach((task) => renderTask(task));

    // ----------------------------
    // 3. ADD TASK EVENT
    // ----------------------------
    addTaskButton.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (taskText === "") return; // Don't add empty tasks

        const newTask = {
            id: Date.now(),         // Unique ID using timestamp
            text: taskText,
            completed: false,
        };

        tasks.push(newTask);         // Add to array
        saveTasks();                 // Save to localStorage
        renderTask(newTask);         // Render on the page

        todoInput.value = "";        // Clear input box
        console.log(tasks);          // For debugging
    });

    // ----------------------------
    // 4. RENDER TASK FUNCTION
    // ----------------------------
    function renderTask(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);

        // If completed, add CSS class
        if (task.completed) li.classList.add("completed");

        // Add task HTML (text + delete button)
        li.innerHTML = `
            <span>${task.text}</span>
            <button class="delete-btn">Delete</button>
        `;

        // --- Toggle completion when list item is clicked (not the button)
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed; // Flip status
            li.classList.toggle('completed');
            saveTasks();
        });

        // --- Delete button functionality
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent the click from toggling
            tasks = tasks.filter(t => t.id !== task.id); // Remove from array
            li.remove();         // Remove from DOM
            saveTasks();         // Save updated list
        });

        // Add the <li> to the <ul>
        todoList.appendChild(li);
    }

    // ----------------------------
    // 5. SAVE TASKS TO LOCAL STORAGE
    // ----------------------------
    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
