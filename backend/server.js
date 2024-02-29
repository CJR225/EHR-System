var express = require('express');
var app = express();
var passport = require('passport');
var session = require('express-session');

var exphbs = require('express-handlebars');

var path = require("path");
var Sequelize = require("sequelize");
var config = require("./config/config.json");
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    dialect: 'mysql',
  });
var db = {};

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

var initModels = require("./models/init-models.js");
var models = initModels(sequelize);
//var models = require("./models");
//Routes 
var authRoute = require('./routes/auth.js')(app,passport);
//load passport strategies 
require('./config/passport/passport.js')(passport, models.Student);
//Sync Database 
console.log(models.sequelize);
sequelize.sync().then(function() {
    console.log('Nice! Database looks fine');
}).catch(function(err) {
    console.log(err, "Something went wrong with the Database Update!");
});
app.listen(3001, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err);
});