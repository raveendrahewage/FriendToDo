var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

mongoose.connect('mongodb+srv://rv:*iamRV97%23@todo.ghypx.mongodb.net/todo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
var todoSchema = new mongoose.Schema({
    username: String,
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
// var itemOne = Todo({ item: 'Hello world' }).save((err) => {
//     if (err) console.log(err);;
//     console.log('Item saved!');
// });

// var data = [{ item: 'get milk' }, { item: 'walk dog' }, { item: 'kick some coding ass' }];
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {

    app.use(session({ secret: 'ssshhhhh', saveUninitialized: true, resave: true }));

    app.get('/', (req, res) => {
        res.render("login");
    });

    app.get('/todo', (req, res) => {
        Todo.find({ username: req.session.username }, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data, username: req.session.username });
        });
        // res.render('todo', { todos: data });
    });

    app.post('/todo', urlencodedParser, (req, res) => {
        var newTodo = Todo({ username: req.session.username, item: req.body.item }).save((err, data) => {
            if (err) console.log(err);;
            res.json(data);
        });

        // data.push(req.body);
        // res.json(data);
    });

    app.post('/', urlencodedParser, (req, res) => {
        req.session.username = req.body.username;
        Todo.find(req.body, (err, data) => {
            if (err) throw err;
            res.render('todo', { todos: data, username: req.session.username });
        });

        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', (req, res) => {
        Todo.find({ username: req.session.username, item: req.params.item.replace(/\-/g, " ").trim() }).deleteOne((err, data) => {
            if (err) throw err;
            res.json(data);
        });
        // data = data.filter((todo) => {
        //     return !req.params.item.includes(todo.item.replace(/ /g, "-"));
        // });
        // res.json(data);
    });
};