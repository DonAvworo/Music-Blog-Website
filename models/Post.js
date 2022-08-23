const { Model, DataTypes } = require('sequelize');  // import sequelize library from node_modules folder and assign to Model and DataTypes variables
const sequelize = require('../config/connection');  // import sequelize variable from config/connection.js file

class Post extends Model { }                        // create new Post model and extend Model class

Post.init(  
  {
    id: {                                           // define id column
      type: DataTypes.INTEGER,                      // set type of id column to INTEGER
      allowNull: false,                             // set id column to NOT NULL
      primaryKey: true,                             // set id column to be the primary key
      autoIncrement: true,                          // set id column to auto increment
    },
    title: {                                        // define title column
      type: DataTypes.STRING,                       // set type of title column to STRING
      allowNull: false,                             // set title column to NOT NULL
    },
    content: {                                      // define content column
      type: DataTypes.TEXT,                         // set type of content column to TEXT
      allowNull: false,                             // set content column to NOT NULL
    },
    image: {
      type: DataTypes.STRING,                       // set type of image column to STRING
      allowNull: false,                             // set image column to NOT NULL
    },
    author_id: {                                    // define author_id column
      type: DataTypes.INTEGER,                      // set type of author_id column to INTEGER
      allowNull: false,                             // set author_id column to NOT NULL
      
      references: {                                 // define author_id column as a foreign key
        model: 'user',                              // set author_id column to reference user table
        key: 'id',                                  // set author_id column to reference id column in user table
      }
    },
    category_id: {                                  // define category_id column
      type: DataTypes.INTEGER,                      // set type of category_id column to INTEGER
      allowNull: false,                             // set category_id column to NOT NULL
      
      references: {                                 // define category_id column as a foreign key
        model: 'category',                          // set category_id column to reference category table
        key: 'id',                                  // set category_id column to reference id column in category table
      }
    },
    likes: {                                       // define likes column (number of likes) this is a virtual column that is not stored in the database
      type: DataTypes.INTEGER,                     // set type of likes column to INTEGER (number of likes)
      allowNull: false,                            // set likes column to NOT NULL (cannot be null) so that it can be set to 0 if no likes are given initially (0 likes)
      defaultValue: 0,                             // set likes column to have a default value of 0 (0 likes)
    },
    dislikes: {                                     // define dislikes column (number of dislikes) this is a virtual column that is not stored in the database
      type: DataTypes.INTEGER,                      // set type of dislikes column to INTEGER (number of dislikes)
      allowNull: false,                             // set dislikes column to NOT NULL (cannot be null) so that it can be set to 0 if no dislikes are given initially (0 dislikes)
      defaultValue: 0,                              // set dislikes column to have a default value of 0 (0 dislikes)
    },
    comments: {                                     // define comments column (number of comments) this is a virtual column that is not stored in the database
      type: DataTypes.TEXT,                         // set type of comments column to TEXT (number of comments)
      allowNull: false,                             // set comments column to NOT NULL (cannot be null) so that it can be set to 0 if no comments are given initially (0 comments)
      defaultValue: 0,                              // set comments column to have a default value of 0 (0 comments)
    },  
  },
  {
    sequelize,                                      // pass in sequelize variable. This is used to connect to the database
    timestamps: true,                               // enable timestamps (createdAt and updatedAt) that Sequelize adds by default
    freezeTableName: true,                          // prevent sequelize from pluralizing table names (adds s to the end of the table name)
    underscored: true,                              // allow sequelize to use underscores in table names (useful for working with MySQL) instead of camel case (useful for working with PostgreSQL)
    modelName: 'post'                               // set model name to post. this is the name that will be used to reference the model in other files (models/index.js)
  }
);

module.exports = Post;                              // export Post model to be used in other files
