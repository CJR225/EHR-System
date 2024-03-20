const { Sequelize } = require("sequelize-cockroachdb");
require('dotenv').config();

// Initialize Sequelize with your database connection
const sequelize = new Sequelize(process.env.DATABASE_URL);

// Import your model initialization function
const initModels = require("../models/init-models.js");

// Initialize your models
const models = initModels(sequelize);

// Export both the Sequelize instance and the models
module.exports = { sequelize, models };
