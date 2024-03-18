const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require("path");
//const Sequelize = require("sequelize");
const config = require("./config/config.json");

/*
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    dialect: 'mysql',
});
*/

const { Sequelize } = require("sequelize-cockroachdb");

const sequelize = new Sequelize("postgresql://chris:rK1Mf1yjFs6lU9gj_XqHTw@pure-spaniel-13637.7tt.aws-us-east-1.cockroachlabs.cloud:26257/EHR?sslmode=verify-full");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

const AuthRouter = require('./routes/auth.js');
app.use('/auth', AuthRouter);

var initModels = require("./models/init-models.js");
var models = initModels(sequelize);
//var models = require("./models");
//Routes 
//var authRoute = require('./routes/auth.js')(app,passport);
//load passport strategies 
require('./config/passport/passport.js')(passport, models.Student);

console.log(models.sequelize);
sequelize.sync().then(() => {
    console.log('Nice! Database looks fine');
}).catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
});

app.listen(3001, (err) => {
    if (!err)
        console.log("Site is live");
    else 
        console.log(err);
});