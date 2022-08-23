const Sequelize = require('sequelize');     // import sequelize library from node_modules folder and assign to Sequelize variable
require('dotenv').config();                 // import dotenv library from node_modules folder and use to access environment variables stored in .env file

const sequelize = new Sequelize(            // create new sequelize object and assign to sequelize variable  (sequelised is used to connect to database)
  process.env.DB_NAME,                      // database name stored in .env (environment variable)
  process.env.DB_USER,                      // database user stored in .env (environment variable)
  process.env.DB_PASSWORD,                  // database password stored in .env (environment variable)
  {
    host: 'localhost',                      // host name of database  (localhost is the default)
    dialect: 'mysql',                       // database type (mysql is the default)
    port: 3306,                             // port number of database (3306 is the default)
  }
);

module.exports = sequelize;                 // export sequelize variable to be used in other files
