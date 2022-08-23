const { Model, DataTypes } = require('sequelize');    // import sequelize library from node_modules folder and assign to Model and DataTypes variables
const bcrypt = require('bcrypt');                     // import bcrypt library from node_modules folder and assign to bcrypt variable
const sequelize = require('../config/connection');    // import sequelize variable from config/connection.js file

class User extends Model { }                          // create new User model and extend Model class 

User.init(                          // define User model
  {
    id: {                           // define id column
      type: DataTypes.INTEGER,      // set type of id column to INTEGER 
      allowNull: false,             // set id column to NOT NULL
      primaryKey: true,             // set id column to be the primary key
      autoIncrement: true,          // set id column to auto increment
    },
    name: {                         // define name column    
      type: DataTypes.STRING,       // set type of name column to STRING
      allowNull: false,             // set name column to NOT NULL  (cannot be null)
      unique: true,                 // set name column to be unique (cannot have duplicate names)
      required: true,               // set name column to be required (cannot be blank)
    },
    email: {                        // define email column
      type: DataTypes.STRING,       // set type of email column to STRING
      unique: true,                 // set email column to be unique (cannot have duplicate emails)
      required: true,               // set email column to be required (cannot be blank)
      allowNull: false,             // set email column to NOT NULL (cannot be null)
      unique: true,                 // set email column to be unique (cannot have duplicate emails)
      
      validate: {                   // define email column validation
        isEmail: true,              // set email column to be an email (validate that it is an email)
      },
    },
    password: {                     // define password column
      type: DataTypes.STRING,       // set type of password column to STRING
      allowNull: false,             // set password column to NOT NULL (cannot be null)
      
      validate: {                   // define password column validation     
        len: [8],                   // set password column to have a minimum length of 8 (validate that the password is at least 8 characters long)
      },
    },
  },
  {
    hooks: {                                                                  // define hooks for User model. hooks are functions that are run before or after certain events
      beforeCreate: async (newUserData) => {                                  // define beforeCreate hook for User model. this is a function that is run before a new user is created
        newUserData.password = await bcrypt.hash(newUserData.password, 10);   // hash the new user's password and assign it to the password column (bcrypt is used to hash the password)
        return newUserData;                                                   // return the new user's data to be used in other files (models/index.js)
      },
      beforeUpdate: async (updatedUserData) => {                              // define beforeUpdate hook for User model. this is a function that is run before a user is updated
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10); // hash the updated user's password and assign it to the password column (bcrypt is used to hash the password)
        return updatedUserData;                                               // return the updated user's data to be used in other files (models/index.js)
      },
    },
    sequelize,                                                                // pass in sequelize variable. This is used to connect to the database
    timestamps: false,                                                        // disable timestamps (createdAt and updatedAt) that Sequelize adds by default
    freezeTableName: true,                                                    // prevent sequelize from pluralizing table names (adds s to the end of the table name)
    underscored: true,                                                        // allow sequelize to use underscores in table names (useful for working with MySQL) instead of camel case (useful for working with PostgreSQL)
    modelName: 'user',                                                        // set model name to user and use it in other files (models/index.js)
  }
);

module.exports = User;                                                        // export User model to be used in other files (models/index.js)
