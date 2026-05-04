const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Song = require('./models/Song');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// DB CONNECT
mongoose.connect('mongodb://127.0.0.1:27017/music')
    .then(() => console.log("MongoDB Connected"));

// HOME (d + k)
app.get('/', async (req, res) => {
    const songs = await Song.find();
    const count = await Song.countDocuments();
    res.render('index', { songs, count });
});

// INSERT 5 SONGS (c)
app.get('/insert', async (req, res) => {
    await Song.insertMany([
        { songname: "Tum Hi Ho", film: "Aashiqui 2", music_director: "Mithoon", singer: "Arijit Singh" },
        { songname: "Kesariya", film: "Brahmastra", music_director: "Pritam", singer: "Arijit Singh" },
        { songname: "Kal Ho Na Ho", film: "KHNH", music_director: "Shankar", singer: "Sonu Nigam" },
        { songname: "Malang", film: "Dhoom 3", music_director: "Pritam", singer: "Shilpa Rao" },
        { songname: "Apna Bana Le", film: "Bhediya", music_director: "Sachin-Jigar", singer: "Arijit Singh" }
    ]);
    res.redirect('/');
});

// e) songs by music director
app.get('/director', async (req, res) => {
    const songs = await Song.find({ music_director: req.query.name });
    res.render('index', { songs, count: songs.length });
});

// f) director + singer
app.get('/director-singer', async (req, res) => {
    const songs = await Song.find({
        music_director: req.query.director,
        singer: req.query.singer
    });
    res.render('index', { songs, count: songs.length });
});

// g) delete
app.get('/delete/:id', async (req, res) => {
    await Song.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

// h) add new song
app.get('/add', (req, res) => res.render('add'));

app.post('/add', async (req, res) => {
    await Song.create(req.body);
    res.redirect('/');
});

// i) singer + film
app.get('/singer-film', async (req, res) => {
    const songs = await Song.find({
        singer: req.query.singer,
        film: req.query.film
    });
    res.render('index', { songs, count: songs.length });
});

// j) update actor/actress
app.get('/update/:id', async (req, res) => {
    await Song.findByIdAndUpdate(req.params.id, {
        actor: "Ranbir Kapoor",
        actress: "Alia Bhatt"
    });
    res.redirect('/');
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));