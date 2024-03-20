const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require("path");
//const Sequelize = require("sequelize");
const { Sequelize } = require("sequelize-cockroachdb");
const config = require("./config/config.json");



require('dotenv').config()

/*
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    dialect: 'mysql',
});
*/

const sequelize = new Sequelize(process.env.DATABASE_URL);
console.log(process.env.DATABASE_URL);
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

const PatientRouter = require('./routes/patientRouters.js');
app.use('/patients', PatientRouter);

var initModels = require("./models/init-models.js");
const { env } = require('process');
var models = initModels(sequelize);
const Patient = models.Patient;

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

