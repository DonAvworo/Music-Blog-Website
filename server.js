const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const routes = require('./controllers');
const sequelize = require('./config/connection');
const helpers = require('./utils/helpers');


const app = express();
const PORT = process.env.PORT || 3001;

// the const sess is the session object that is used to store the session data
const sess = {                          // session options object for express-session
  secret: 'Super secret secret',        // used to sign the session ID cookie - should be a long random string - secret
  cookie: {},                           // options for the session cookie - see cookie-parser docs for more info
  resave: false,                        // forces the session to be saved back to the session store, even if the session was never modified during the request
  saveUninitialized: true,              // forces a session that is "uninitialized" to be saved to the store
  store: new SequelizeStore({           // sequelize session store - uses the sequelize connection pool to store session data
    db: sequelize,                      // sequelize instance - created in config/connection.js
  }),                                   // options for the session store - see express-session docs for more info
};

app.use(session(sess));

const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);   // register the handlebars engine
app.set('view engine', 'handlebars');   // set the view engine to handlebars

app.use(express.json());                                  // use the express json middleware to parse json data
app.use(express.urlencoded({ extended: true }));          // use the express urlencoded middleware to parse form data
app.use(express.static(path.join(__dirname, 'public')));  // use the express static middleware to serve static files from the public directory

app.use(routes);                                          // use the routes defined in the controllers folder

sequelize.sync({ force: false }).then(() => {             // sync the tables in the database using sequelize and force to drop the tables if they exist
  app.listen(PORT, () => console.log('Now listening'));   // listen on the port defined in the PORT variable
});
