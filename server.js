require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");   // 👈 yeh line add karo
const Todo = require("./models/Todo");

const app = express();

app.use(cors());   // 👈 yeh bhi add karo
app.use(express.json());
// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/todoDB")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
  res.send("Todo API Running 🚀");
});

// Add Todo
app.post("/add", async (req, res) => {
  const todo = new Todo({ task: req.body.task });
  await todo.save();
  res.json(todo);
});

// Get All Todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Delete Todo
app.delete("/delete/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted Successfully" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});