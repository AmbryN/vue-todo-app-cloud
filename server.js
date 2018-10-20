const express = require('express')
const logger = require('morgan')
const bodyParser = require('body-parser')
const errorhandler = require('errorhandler')
const serveStatic = require('serve-static')

const routes = require('./routes')

let app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(serveStatic(__dirname + "/dist"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Acces-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    next();
});

app.get('/api/todos', routes.todos.getTodos)
app.post('/api/todos', routes.todos.addTodo)
app.put('/api/todos/:id', routes.todos.updateTodo)
// Define the header for the options method, which is called before every delete
app.options('/api/todos/:id', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type');
    next()
})
app.delete('/api/todos/done', routes.todos.removeDoneTodos)
app.delete('/api/todos/:id', routes.todos.removeTodo)

app.use(errorhandler())
app.listen(process.env.PORT || 5000)