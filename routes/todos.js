const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI)

let Todo = mongoose.model('Todo', {
    name: String,
    done: {type: Boolean, default: false}
})

module.exports = {
    getTodos (req, res, next) {
        Todo.find({}, (err, todos) => {
            if (err) return next(err)
            else res.status(200).send(todos)
        })
    },
    addTodo (req, res, next) {
        let newTodo = new Todo(req.body)
        console.log(req.body)
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
        Todo.remove({_id: req.params.id}, (err) => {
            if (err) return next(err)
            else res.status(204).send()
        })
    },
    removeDoneTodos (req, res, next) {
        Todo.remove({done: true}, (err) => {
            if (err) return next(err)
            else res.status(204).send()
        })
    }
}