const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static('views'));

// API to get products
app.get('/api/products', (req, res) => {

    fs.readFile(path.join(__dirname, 'products.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: "Error reading products" });
        }

        res.json(JSON.parse(data));
    });

});

// Load homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});