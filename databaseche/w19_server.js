const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// DB connection
mongoose
  .connect("mongodb://127.0.0.1:27017/student")
  .then(() => console.log("MongoDB Connected"))
  .catch(() => console.log("Error"));

// schema
const Student = mongoose.model("studentmarks", {
  name: String,
  roll: Number,
  WAD: Number,
  CC: Number,
  DSBDA: Number,
  CNS: Number,
  AI: Number,
});

// c) Insert data
app.get("/insert", async (req, res) => {
  await Student.insertMany([
    { name: "A", roll: 1, WAD: 25, CC: 25, DSBDA: 30, CNS: 28, AI: 27 },
    { name: "B", roll: 2, WAD: 20, CC: 22, DSBDA: 15, CNS: 18, AI: 19 },
    { name: "C", roll: 3, WAD: 30, CC: 28, DSBDA: 35, CNS: 32, AI: 31 },
  ]);
  res.send("Inserted");
});

// d) Display all + count
app.get("/all", async (req, res) => {
  let data = await Student.find();
  let count = await Student.countDocuments();

  let html = `<h2>Total: ${count}</h2>
 <table border="1">
 <tr>
 <th>Name</th>
 <th>Roll</th>
 <th>WAD</th>
 <th>DSBDA</th>
 <th>CNS</th>
 <th>CC</th>
 <th>AI</th>
 </tr>`;

  data.forEach((s) => {
    html += `<tr>
   <td>${s.name}</td>
   <td>${s.roll}</td>
   <td>${s.WAD}</td>
   <td>${s.DSBDA}</td>
   <td>${s.CNS}</td>
   <td>${s.CC}</td>
   <td>${s.AI}</td>
  </tr>`;
  });

  html += "</table>";

  res.send(html);
});
// e) DSBDA > 20
app.get("/dsbda", async (req, res) => {
  let data = await Student.find({ DSBDA: { $gt: 20 } });
  res.send(data);
});

// f) Update marks +10
app.get("/update", async (req, res) => {
  await Student.updateMany({}, { $inc: { WAD: 10 } });
  res.send("Updated");
});

// g) >25 in all subjects
app.get("/allpass", async (req, res) => {
  let data = await Student.find({
    WAD: { $gt: 25 },
    CC: { $gt: 25 },
    DSBDA: { $gt: 25 },
    CNS: { $gt: 25 },
    AI: { $gt: 25 },
  });
  res.send(data);
});

// h) <40 in WAD & CNS (example)
app.get("/fail", async (req, res) => {
  let data = await Student.find({
    WAD: { $lt: 40 },
    CNS: { $lt: 40 },
  });
  res.send(data);
});

// i) delete student
app.get("/delete/:name", async (req, res) => {
  await Student.deleteOne({ name: req.params.name });
  res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on 3000"));
