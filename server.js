var express = require('express');
var handlebars = require('express-handlebars');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cookie and Session declared
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.use(cookieParser());
app.use(session({
    secret: "my_secret",
	resave: false,
 	saveUninitialized: false,
  }));

// setup for handlebars view engine
app.engine('handlebars', 
    handlebars({defaultLayout: 'home'}));
app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Routing
var routes = require('./routes/index');
app.use('/', routes);

//initializing session
app.use(function(res,req,next){
	req.locals.session = [];
	req.locals.session = req.session;
});

app.use((req, res) => {
	res.type('text/html');
	res.status(404);
	res.send("<b>404 - Not Found</b>");
});

app.listen(3000, function(){
    console.log('http://localhost:3000');
});
