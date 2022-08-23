const { Model, DataTypes } = require('sequelize');  // import sequelize library from node_modules folder and assign to Model and DataTypes variables
const sequelize = require('../config/connection');  // import sequelize variable from config/connection.js file

class Popular extends Model { }   // create new Popular model and extend its class 
                                  // the popular model will be used to insert popular posts into the database depending on the number of views
Popular.init(                     // initialize Popular model so that it is ready to be used in other files
  {
    id: {
      type: DataTypes.INTEGER,    // set type of id column to INTEGER 
      allowNull: false,           // set id column to NOT NULL this will prevent the id column from being null (null values are empty strings)
      primaryKey: true,           // set id column to be the primary key. the primary key is used to uniquely identify each record in the database
      autoIncrement: true,        // set id column to auto increment. this will automatically increment the id column every time a new record is added to the database
    },
    title: {                      // define title column which will store the title of the post
      type: DataTypes.STRING,     // set type of title column to STRING meaning it will be a string of characters 
      allowNull: false,           // set title column to NOT NULL this will prevent the title column from being null (null values are empty strings)
    },
    content: {                    // define content column which will store the content of the post
      type: DataTypes.TEXT,       // set type of content column to TEXT meaning it will be a string of characters
      allowNull: false,           // set content column to NOT NULL this will prevent the content column from being null (null values are empty strings)
    },
    image: {                      // define image column which will store the image of the post. this will be the path to the image
      type: DataTypes.TEXT,       // set type of image column to TEXT meaning it will be a string of characters
      allowNull: false,           // set image column to NOT NULL this will prevent the image column from being null (null values are empty strings)
    },
    author_id: {                  // define author_id column which will store the id of the author of the post
      type: DataTypes.INTEGER,    // set type of author_id column to INTEGER meaning it will be a number
      allowNull: false,           // set author_id column to NOT NULL this will prevent the author_id column from being null (null values are empty strings)
      
      references: {               // set author_id column to reference the id column in the author table. this will allow to access the author of the post
        model: 'user',            // set author_id column to reference the user model in the user table
        key: 'id',                // set author_id column to reference the id column in the user table
      }
    },
    category_id: {                // define category_id column which will store the id of the category of the post
      type: DataTypes.INTEGER,    // set type of category_id column to INTEGER meaning it will be a number
      allowNull: false,           // set category_id column to NOT NULL this will prevent the category_id column from being null (null values are empty strings)
      
      references: {               // set category_id column to reference the id column in the category table. this will allow to access the category of the post
        model: 'category',        // set category_id column to reference the category model in the category table
        key: 'id',                // set category_id column to reference the id column in the category table
      }
    }
  },
  {
    sequelize,                    // pass in sequelize variable. This is used to connect to the database
    timestamps: true,             // enable timestamps (createdAt and updatedAt) for the model. this automatically adds created_at and updated_at columns to the table
    freezeTableName: true,        // prevent sequelize from pluralizing table names (adds s to the end of the table name)
    underscored: true,            // allow sequelize to use underscores in table names (useful for working with MySQL) instead of camel case (useful for working with PostgreSQL)
    modelName: 'popular'          // set model name to popular. this is the name of the table in the database
  }
);

module.exports = Popular;         // export Popular model to be used in other files (models/index.js)
