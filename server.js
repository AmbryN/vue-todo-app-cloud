const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')

mongoose.promise = global.Promise

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(__dirname + "/dist"))

mongoose.connect(process.env.MONGO_URI)

// Models and passport config
require('./models/User')
require('./config/passport')

// ROUTES
const routes = require('./routes')

// AUTH API
const auth = routes.auth;
app.post('/register', routes.user.createNewUser)
app.post('/login', routes.user.loginUser)

// TODOS API
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Acces-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
});

app.get('/api/todos', auth.required, routes.todos.getTodos)
app.post('/api/todos', auth.required, routes.todos.addTodo)
app.put('/api/todos/:id', auth.required, routes.todos.updateTodo)
// Define the header for the options method, which is called before every delete
app.options('/api/todos/:id', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    next()
})
app.delete('/api/todos/done', auth.required, routes.todos.removeDoneTodos)
app.delete('/api/todos/:id', auth.required, routes.todos.removeTodo)

app.use(errorhandler())
let PORT = process.env.PORT || 5000
app.listen(PORT)
console.log("Server running on:"+PORT)