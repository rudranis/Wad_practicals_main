const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// DB Connect
mongoose.connect('mongodb://127.0.0.1:27017/bookstore')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* ROUTES */

// View all books
app.get('/', async (req, res) => {
    const books = await Book.find();
    res.render('index', { books });
});

// Add page
app.get('/add', (req, res) => {
    res.render('add');
});

// Add book
app.post('/add', async (req, res) => {
    await Book.create(req.body);
    res.redirect('/');
});

// Edit page
app.get('/edit/:id', async (req, res) => {
    const book = await Book.findById(req.params.id);
    res.render('edit', { book });
});

// Update book
app.post('/update/:id', async (req, res) => {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Delete book
app.get('/delete/:id', async (req, res) => {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});