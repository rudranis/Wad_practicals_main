const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Employee = require('./models/Employee');

const app = express();
const PORT = 3000;

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/employeeDB')
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

/* ROUTES */

// View all employees
app.get('/', async (req, res) => {
    const employees = await Employee.find();
    res.render('index', { employees });
});

// Add page
app.get('/add', (req, res) => {
    res.render('add');
});

// Add employee
app.post('/add', async (req, res) => {
    const { name, department, designation, salary, joiningDate } = req.body;

    await Employee.create({
        name,
        department,
        designation,
        salary,
        joiningDate
    });

    res.redirect('/');
});

// Edit page
app.get('/edit/:id', async (req, res) => {
    const emp = await Employee.findById(req.params.id);
    res.render('edit', { emp });
});

// Update employee
app.post('/update/:id', async (req, res) => {
    await Employee.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/');
});

// Delete employee
app.get('/delete/:id', async (req, res) => {
    await Employee.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});