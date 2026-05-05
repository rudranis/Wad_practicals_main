const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/employeeDB")
  .then(() => console.log("MongoDB Connected"));

// schema
const Employee = mongoose.model("employees", {
  name: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: String,
});

// ADD employee
app.get("/add", async (req, res) => {
  await Employee.create({
    name: "Ravi",
    department: "IT",
    designation: "Developer",
    salary: 50000,
    joiningDate: "2024-01-01",
  });
  res.send("Employee Added");
});

// VIEW ALL (table format)
app.get("/all", async (req, res) => {
  let data = await Employee.find();

  let html = `<h2>Employee Records</h2>
 <table border="1">
 <tr>
 <th>Name</th>
 <th>Department</th>
 <th>Designation</th>
 <th>Salary</th>
 <th>Joining Date</th>
 </tr>`;

  data.forEach((e) => {
    html += `<tr>
   <td>${e.name}</td>
   <td>${e.department}</td>
   <td>${e.designation}</td>
   <td>${e.salary}</td>
   <td>${e.joiningDate}</td>
  </tr>`;
  });

  html += "</table>";

  res.send(html);
});

// UPDATE employee
app.get("/update/:name", async (req, res) => {
  await Employee.updateOne(
    { name: req.params.name },
    { $set: { salary: 60000 } },
  );
  res.send("Updated");
});

// DELETE employee
app.get("/delete/:name", async (req, res) => {
  await Employee.deleteOne({ name: req.params.name });
  res.send("Deleted");
});

app.listen(3000, () => console.log("Server running on 3000"));
