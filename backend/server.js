var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');
var env = require('dotenv').config();
var exphbs = require('express-handlebars');
app.use(express.urlencoded({
    extended: true
})
);
app.use(express.json());
// For Passport 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret 
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions 
//For Handlebars 
app.set('views', './views');
app.engine('hbs', exphbs.engine({
    extname: '.hbs',
    defaultLayout: false,
    layoutsDir: "views/layouts/"
}));
app.set('view engine', '.hbs');
app.get('/', function(req, res) {
    res.send('Welcome to Passport with Sequelize');
});
//Models 
var models = require("./models");
//Routes 
var authRoute = require('./routes/auth.js')(app,passport);
//load passport strategies 
require('./config/passport/passport.js')(passport, models.student);
//Sync Database 
models.sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});
app.listen(3001, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err);
});