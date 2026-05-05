const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/bookstore")
  .then(() => console.log("MongoDB Connected"));

// schema
const Book = mongoose.model("books", {
  title: String,
  author: String,
  price: Number,
  genre: String,
});

// ADD book
app.get("/add", async (req, res) => {
  await Book.create({
    title: "Book1",
    author: "Author1",
    price: 500,
    genre: "Fiction",
  });
  res.send("Book Added");
});

// VIEW ALL (table format)
app.get("/all", async (req, res) => {
  let data = await Book.find();

  let html = `<h2>Book List</h2>
 <table border="1">
 <tr>
 <th>Title</th>
 <th>Author</th>
 <th>Price</th>
 <th>Genre</th>
 </tr>`;

  data.forEach((b) => {
    html += `<tr>
   <td>${b.title}</td>
   <td>${b.author}</td>
   <td>${b.price}</td>
   <td>${b.genre}</td>
  </tr>`;
  });

  html += "</table>";

  res.send(html);
});

// UPDATE book
app.get("/update/:title", async (req, res) => {
  await Book.updateOne({ title: req.params.title }, { $set: { price: 700 } });
  res.send("Updated");
});

// DELETE book
app.get("/delete/:title", async (req, res) => {
  await Book.deleteOne({ title: req.params.title });
  res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on 3000"));
