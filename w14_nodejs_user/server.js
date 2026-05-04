const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static('views'));

// API route to read JSON file
app.get('/api/users', (req, res) => {

    fs.readFile(path.join(__dirname, 'users.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading file" });
        }

        res.json(JSON.parse(data));
    });

});

// Load HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});