const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const TodoModel = require('./Model/Todo')

const app = express()
const port = process.env.PORT || 3000;

app.use(cors())
app.use(express.json())

mongoose.connect(
  'mongodb+srv://disability:sahil786@asdp.ddmkvib.mongodb.net/test?retryWrites=true&w=majority'
)

app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

app.put('/update/:id', async (req, res) => {
  try {
    const todo = await TodoModel.findById(req.params.id)
    todo.done = !todo.done
    await todo.save()
    res.json(todo)
  } catch (error) {
    res.status(500).json(error)
  }
})

app.delete('/delete/:id', (req, res) => {
  TodoModel.findByIdAndDelete(req.params.id)
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

app.post('/add', (req, res) => {
  TodoModel.create({
    task: req.body.task,
    done: false
  })
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

app.listen(port, () => {
  console.log('Server Running on Port:', port)
})
