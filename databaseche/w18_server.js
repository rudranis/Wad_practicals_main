const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/music")
  .then(() => console.log("MongoDB Connected"));

// schema
const Song = mongoose.model("songs", {
  songname: String,
  film: String,
  music_director: String,
  singer: String,
  actor: String,
  actress: String,
});

// c) Insert 5 songs
app.get("/insert", async (req, res) => {
  await Song.insertMany([
    {
      songname: "Tum Hi Ho",
      film: "Aashiqui 2",
      music_director: "Mithoon",
      singer: "Arijit Singh",
    },
    {
      songname: "Kesariya",
      film: "Brahmastra",
      music_director: "Pritam",
      singer: "Arijit Singh",
    },
    {
      songname: "Kal Ho Na Ho",
      film: "KHNH",
      music_director: "Shankar",
      singer: "Sonu Nigam",
    },
    {
      songname: "Malang",
      film: "Dhoom 3",
      music_director: "Pritam",
      singer: "Shilpa Rao",
    },
    {
      songname: "Apna Bana Le",
      film: "Bhediya",
      music_director: "Sachin",
      singer: "Arijit Singh",
    },
  ]);
  res.send("Inserted");
});

// d + k) Display all + count in TABLE
app.get("/all", async (req, res) => {
  let data = await Song.find();
  let count = await Song.countDocuments();

  let html = `<h2>Total Songs: ${count}</h2>
 <table border="1">
 <tr>
 <th>Song</th>
 <th>Film</th>
 <th>Director</th>
 <th>Singer</th>
 <th>Actor</th>
 <th>Actress</th>
 </tr>`;

  data.forEach((s) => {
    html += `<tr>
   <td>${s.songname}</td>
   <td>${s.film}</td>
   <td>${s.music_director}</td>
   <td>${s.singer}</td>
   <td>${s.actor || "-"}</td>
   <td>${s.actress || "-"}</td>
  </tr>`;
  });

  html += "</table>";

  res.send(html);
});

// e) by director
app.get("/director/:name", async (req, res) => {
  let data = await Song.find({ music_director: req.params.name });
  res.send(data);
});

// f) director + singer
app.get("/ds/:d/:s", async (req, res) => {
  let data = await Song.find({
    music_director: req.params.d,
    singer: req.params.s,
  });
  res.send(data);
});

// g) delete
app.get("/delete/:name", async (req, res) => {
  await Song.deleteOne({ songname: req.params.name });
  res.send("Deleted");
});

// h) add new song
app.get("/add", async (req, res) => {
  await Song.create({
    songname: "New Song",
    film: "New Film",
    music_director: "New Dir",
    singer: "New Singer",
  });
  res.send("Added");
});

// i) singer + film
app.get("/sf/:s/:f", async (req, res) => {
  let data = await Song.find({
    singer: req.params.s,
    film: req.params.f,
  });
  res.send(data);
});

// j) update actor actress
app.get("/update/:name", async (req, res) => {
  await Song.updateOne(
    { songname: req.params.name },
    { $set: { actor: "Ranbir", actress: "Alia" } },
  );
  res.send("Updated");
});

app.listen(3000, () => console.log("Server running on 3000"));
