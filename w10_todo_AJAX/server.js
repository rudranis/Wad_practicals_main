const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('views'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

let todos = [];

// GET
app.get('/todos', (req, res) => {
    res.json(todos);
});

// ADD
app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now(),
        text: req.body.text,
        priority: req.body.priority,
        dueDate: req.body.dueDate
    };
    todos.push(newTodo);
    res.json(newTodo);
});

// UPDATE
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const todo = todos.find(t => t.id === id);

    if (todo) {
        todo.text = req.body.text;
        todo.priority = req.body.priority;
        todo.dueDate = req.body.dueDate;
        res.json(todo);
    } else {
        res.status(404).send("Not found");
    }
});

// DELETE
app.delete('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(t => t.id !== id);
    res.send("Deleted");
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));