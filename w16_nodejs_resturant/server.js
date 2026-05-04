const express = require('express');
const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

// MENU DATA
const menu = [
    { id: 1, name: "Paneer Tikka", price: 250, desc: "Grilled paneer with spices", img: "https://source.unsplash.com/400x300/?paneer" },
    { id: 2, name: "Biryani", price: 300, desc: "Aromatic rice dish with rich flavors", img: "https://source.unsplash.com/400x300/?biryani" },
    { id: 3, name: "Pasta", price: 200, desc: "Creamy Italian pasta", img: "https://source.unsplash.com/400x300/?pasta" },
    { id: 4, name: "Noodles", price: 180, desc: "Spicy Chinese noodles", img: "https://source.unsplash.com/400x300/?noodles" }
];

// ROUTES
app.get('/', (req, res) => res.render('index'));
app.get('/menu', (req, res) => res.render('menu', { menu }));

app.get('/menu/:id', (req, res) => {
    const item = menu.find(m => m.id == req.params.id);
    res.render('detail', { item, menu });
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));