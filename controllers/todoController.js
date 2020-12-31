var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

try {
    mongoose.connect('mongodb+srv://rv:*iamRV97%23@todo.ghypx.mongodb.net/todo?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
} catch (err) {
    next(err);
}

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

    app.get('/', async(req, res) => {
        try {
            res.render("login");
        } catch (err) {
            next(err);
        }
    });

    app.get('/todo', (req, res) => {
        Todo.find({ username: req.session.username }, async(err, data) => {
            try {
                res.render('todo', { todos: data, username: req.session.username });
            } catch (err) {
                next(err);
            }
        });
        // res.render('todo', { todos: data });
    });

    app.post('/todo', urlencodedParser, async(req, res) => {
        var newTodo = Todo({ username: req.session.username, item: req.body.item }).save((err, data) => {
            try {
                res.json(data);
            } catch (err) {
                next(err);
            }
        });
        // data.push(req.body);
        // res.json(data);
    });

    app.post('/', urlencodedParser, async(req, res) => {
        req.session.username = req.body.username;
        Todo.find(req.body, (err, data) => {
            try {
                res.render('todo', { todos: data, username: req.session.username });
            } catch (err) {
                next(err);
            }
        });
        // data.push(req.body);
        // res.json(data);
    });

    app.delete('/todo/:item', async(req, res) => {
        Todo.find({ username: req.session.username, item: req.params.item.replace(/\-/g, " ").trim() }).deleteOne((err, data) => {
            try {
                res.json(data);
            } catch (err) {
                next(err);
            }
        });
        // data = data.filter((todo) => {
        //     return !req.params.item.includes(todo.item.replace(/ /g, "-"));
        // });
        // res.json(data);
    });
};