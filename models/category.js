const { Model, DataTypes } = require('sequelize'); // import sequelize library from node_modules folder and assign to Model and DataTypes variables
const sequelize = require('../config/connection'); // import sequelize variable from config/connection.js file

class Category extends Model { }                   // create new Category model and extend Model class

Category.init(                                     // initialize Category model
  {
    id: {                                          // define id column
      type: DataTypes.INTEGER,                     // set type of id column to INTEGER
      allowNull: false,                            // set id column to NOT NULL
      primaryKey: true,                            // set id column to be the primary key
      autoIncrement: true,                         // set id column to auto increment
    },
    name: {                                        // define name column
      type: DataTypes.STRING,                      // set type of name column to STRING
      allowNull: false,                            // set name column to NOT NULL
    },
  },
  {
    sequelize,                                     // pass in sequelize variable. This is used to connect to the database
    timestamps: false,                             // disable timestamps (createdAt and updatedAt) that Sequelize adds by default
    freezeTableName: true,                         // prevent sequelize from pluralizing table names (adds s to the end of the table name)
    underscored: true,                             // allow sequelize to use underscores in table names (useful for working with MySQL) instead of camel case (useful for working with PostgreSQL)
    modelName: 'category',                         // set model name to category 
  }
);

module.exports = Category;                         // export Category model to be used in other files (models/index.js)
