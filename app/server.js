const express = require('express');
const app = express();
const PORT = 3000;

let tasks = [];

app.use(express.json());

// Welcome API
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Node.js DevOps POC"
    });
});

// View Tasks
app.get("/tasks", (req, res) => {
    res.json(tasks);
});

// Add Task
app.post("/tasks", (req, res) => {

    const { task } = req.body;

    if (!task) {
        return res.status(400).json({
            message: "Task is required"
        });
    }

    tasks.push({
        id: tasks.length + 1,
        task
    });

    res.status(201).json({
        message: "Task added successfully"
    });

});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});