const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require("path");
const config = require("./config/config.json");
require('dotenv').config()

//const Sequelize = require("sequelize");
/*
const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    dialect: 'mysql',
});
*/
const { Sequelize } = require("sequelize-cockroachdb");
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

const medRecRouter = require('./routes/medRecRouter.js');
app.use('/patients', medRecRouter);

const demographicsRouter = require('./routes/demographicsRouter.js');
app.use('/patients', demographicsRouter);

const historyRouter = require('./routes/historyRouter.js');
app.use('/patients', historyRouter);

const orderRouter = require('./routes/ordersRouter.js');
app.use('/patients', orderRouter);

const MAR_Router = require('./routes/MAR-Router.js');
app.use('/patients', MAR_Router);

const sectionRouter = require('./routes/sectionRouter.js');
app.use('/patients', sectionRouter);

const IVandLinesRouter = require('./routes/IVandLinesRouter.js');
app.use('/patients', IVandLinesRouter);

const vitalSignsRouter = require('./routes/vitalSignsRouter.js');
app.use('/patients', vitalSignsRouter);

const IOandADLRouter = require('./routes/IOandADL.js');
app.use('/patients', IOandADLRouter);

var initModels = require("./models/init-models.js");
const { env } = require('process');
var models = initModels(sequelize);
const Patient = models.Patient;

require('./config/passport/passport.js')(passport, models.Student, models.Instructor);

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

