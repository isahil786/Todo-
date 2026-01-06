const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TodoModel = require("./Model/Todo");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Todo Backend is live 🚀");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

app.get("/get", async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/add", async (req, res) => {
  try {
    const todo = await TodoModel.create({
      task: req.body.task,
      done: false
    });
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id);
    todo.done = !todo.done;
    await todo.save();
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const todo = await TodoModel.findByIdAndDelete(req.params.id);
    res.json(todo);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(port, () => {
  console.log("Server running on port", port);
});
