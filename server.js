const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(process.cwd() + '/public'));

app.use(bodyParser.urlencoded({ extended: false }));

const exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const routes = require("./controllers/burgers_controller.js");
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port);