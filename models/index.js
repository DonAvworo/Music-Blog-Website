const User = require('./User');             // import User model from models/User.js  (models/index.js)
const Category = require('./Category');     // import Category model from models/Category.js  (models/index.js)
const Post = require('./Post');             // import Post model from models/Post.js  (models/index.js)

Category.hasMany(Post, {                    // define relationship between Category and Post models this means that a Category can have many Posts
  foreignKey: 'category_id',                // define foreign key for Category model
  sourceKey: 'id'                           // define source key for Post model
});

Post.belongsTo(Category, {                  // define relationship between Post and Category models. this means that a Post model can only belong to a Category model and not vice versa
  foreignKey: 'category_id',                // define foreign key for Post model
  onDelete: 'CASCADE',                      // if Category is deleted, delete all associated Post records
});

User.hasMany(Post, {                        // define relationship between User and Post models this means that a User can have many Posts
  foreignKey: 'user_id',                    // define foreign key for User model
  onDelete: 'CASCADE',                      // if User is deleted, delete all associated Post records
});

Post.belongsTo(User, {                      // define relationship between Post and User models  this means that a Post model can only belong to a User model and not vice versa 
  foreignKey: 'user_id',                    // define foreign key for Post model
}); 









module.exports = { User, Post, Category }; // export User, Post, Category models to be used in other files (models/index.js)
