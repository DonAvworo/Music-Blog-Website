const router = require('express').Router();         // import express router
const userRoutes = require('./user-routes');        // import user routes
const postPostRoutes = require('./post-routes');    // import post routes

router.use('/user', userRoutes);                // use user routes in the router object (router is the express router)
router.use('/post', postPostRoutes);            // use post routes  in the router object (router is the express router)

module.exports = router;                        // export router to server.js