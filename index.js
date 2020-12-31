var express = require('express');
var todoController = require('./controllers/todoController');

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

todoController(app);

app.listen(process.env.PORT || 3000, () => console.log(`Listening on port ${port}`));
console.log("Port 3000 is listning");