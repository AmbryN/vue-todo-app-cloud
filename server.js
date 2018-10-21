const express = require('express')
const session = require('express-session')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const mongoose = require('mongoose')

mongoose.promise = global.Promise

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(express.static(__dirname + "/dist"))
app.use(session({secret: process.env.SECRET, cookie: {maxAge: 60000}, resave: false, saveUninitialized: false }))

mongoose.connect(process.env.MONGO_URI)

// Models
require('./models/User')
require('./config/passport')

// ROUTES
const routes = require('./routes')

// AUTH
const auth = routes.auth;
app.post('/register', auth.optional, routes.user.createNewUser)
app.post('/login', auth.optional, routes.user.loginUser)
app.get('/users/current', auth.required, routes.user.getLoggedIn)

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
app.listen(process.env.PORT || 5000)
console.log("Server running on:"+process.env.PORT)