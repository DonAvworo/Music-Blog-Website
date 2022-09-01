const { User, Category, Post} = require('../models');

// variables for the seed
const categorySeed = require('./categorySeedData.json');                //import the categorySeed data from the json file   
const userSeed = require('./userSeedData.json');                        //import the userSeed data from the json file
const postSeed = require('./postSeedData.json');                        //import the postSeed data from the json file
const popularSeed= require('./popularSeedData.json');                   //import the popularSeed data from the json file


const sequelize = require('../config/connection');                      //import the connection to be used in the database  

//async function to seed the database using try catch block
async function seed() {                                                 //async function to seed the database
    try {
        await sequelize.sync({ force: true });                          // sync the tables in the database using sequelize and force to drop the tables if they exist
        const categories = await Category.bulkCreate(categorySeed);     // create the categories in the database using the categorySeed data and return the categories
        const users = await User.bulkCreate(userSeed);                  // store the userSeed data in a vriable ()
        const posts = await Post.bulkCreate(postSeed);                  //insert the data from the json file into the database
        const populars = await Popular.bulkCreate(popularSeed);         //insert the data from the json file into the database
    }
    catch (err) {                                                       // if there is an error, console log the error
        console.log(err);
    }

    process.exit(0);                                                   //exit the process after the seed is complete 
}

seed();                                                                //call the seed function to seed the database





