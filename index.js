var express         = require("express"),
    app             = express(),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose'),
    morgan       	  = require('morgan'),
    passport 		    = require('passport'),
	  flash    		    = require('connect-flash'),
	  cookieParser 	  = require('cookie-parser'),
	  session      	  = require('express-session'),
    bodyParser      = require('body-parser'),
    port            = process.env.PORT || 8080;


var swagger = require('./config/swaggerConfig')(app);

// Connection to DB
mongoose.connect('mongodb://localhost/casla', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'lancha-dante' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var models   = require('./models/includingModels')(app, mongoose);


// routes ======================================================================
require('./config/routes.js')(express,app, passport); // load our routes and pass in our app and fully configured passport
// require('./config/jugadorRoutes')(express,app);

// Start server
app.listen(3000, function() {
  console.log("Node server running on "+port);
});
