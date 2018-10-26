const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI)

const { Schema } = mongoose;

const TodoSchema = new Schema({
    name: {type: String, required: true},
    done: {type: Boolean, default: false},
    userId: {type: String}
})

let Todo = mongoose.model('Todo', TodoSchema)

module.exports = {
    getTodos (req, res, next) {
        Todo.find({userId: req.user._id}, (err, todos) => {
            if (err) return next(err)
            else res.status(200).send(todos)
        })
    },
    addTodo (req, res, next) {
        let newTodo = new Todo(req.body)
        console.log(newTodo)
        newTodo.save((err, todo) => {
            if (err) return next(err)
            else res.status(201).send(todo)
        })
    },
    updateTodo (req, res, next) {
        Todo.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, (err, todo) => {
            if (err) return next(err)
            else res.status(200).send(todo)
        })
    },
    removeTodo (req, res, next) {
        Todo.deleteOne({_id: req.params.id}, (err) => {
            if (err) return next(err)
            else res.status(204).send()
        })
    },
    removeDoneTodos (req, res, next) {
        Todo.deleteMany({done: true}, (err) => {
            if (err) return next(err)
            else res.status(204).send()
        })
    }
}