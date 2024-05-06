//Christopher Rocco
//Senior Capstone - SER492
//5-08-24

const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const cors = require('cors');
const path = require("path");
const config = require("./config/config.json");
require('dotenv').config()

//This commented code is for usage of mysql workbench database - credentials are put in /config/config.json
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

//these are the corresponding /backslash routes for data pulling
//EX. http:/localhost:3001/auth/signup ---> can use for testing in postman given body info 
//the other pre route is /patients used for everything else

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

const labValuesRouter = require('./routes/labValuesRouter.js');
app.use('/patients', labValuesRouter);

const instructorRouter = require('./routes/instructorRouter.js');
app.use('/patients', instructorRouter);

const notesRouter = require('./routes/notesRouter.js');
app.use('/patients', notesRouter);

const adlRouter = require('./routes/ADL-Router.js');
app.use('/patients', adlRouter);

//initModels within /models is important as sequelize-auto has this predefined for easier use
var initModels = require("./models/init-models.js");
const { env } = require('process');
var models = initModels(sequelize);
const Patient = models.Patient;
//this is where the models for student/instructor are passed into the passport file, can add more roles later on through here if needed for authentication
require('./config/passport/passport.js')(passport, models.Student, models.Instructor);

console.log(models.sequelize);
sequelize.sync().then(() => {
    console.log('Nice! Database looks fine');
}).catch((err) => {
    console.log(err, "Something went wrong with the Database Update!");
});
//The server port for this app is 3001 ---> remember for routing for frontend
app.listen(3001, (err) => {
    if (!err)
        console.log("Site is live");
    else 
        console.log(err);
});

