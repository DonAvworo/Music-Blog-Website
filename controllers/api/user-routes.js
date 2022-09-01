const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

// CREATE a new user
router.post('/signup', async (req, res) => {

  console.log('req.body: ', req.body);
  const userData = await User.findOne({ where: { email: req.body.email } });
  if (userData) {
    console.log('New already exists :-(');
    res
      .status(400)
      .json({ message: 'User already exists' });

    return;
  }

  try {

    const newUser = await User.create(req.body);

    console.log('New User Created: ', req.body);

    // Saving Sessions
    req.session.save(() => {
      console.log('Saving Session for New User: ', newUser.id);
      req.session.logged_in = true;
      req.session.user_id = newUser.id;

      res.status(200).json(newUser);
    });

  } catch (err) {
    console.warn('Error creating new user: ', err);
    res.status(400).json(err);
  }
});



//Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const userData = await User.findOne({
      where: { email },
    });
    if (!userData) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      res.status(400).json({ message: 'Invalid Credentials' });
      return;
    }
    // Saving Sessions
    req.session.save(() => {
      console.log('Saving Session for New User: ', newUser.id);
      req.session.logged_in = true;
      req.session.user_id = newUser.id;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
})

//Logout
router.get('/logout', (req, res) => {
  req.session.destroy();  // destroy the session
  res.status(200).json({ message: 'Logged out successfully' });
})

//UPDATE a user
router.put('/updateUser', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.password === req.body.password) {
      await User.updateOne({ $set: req.body });
      res.status(200).json('user updated');
    } else {
      res.status(403).json('User Info does not match');
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//Delete a user
router.delete('/deleteUser', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.password === req.body.password) {
      await User.deleteOne({ _id: req.params.id });
      res.status(200).json('user deleted');
    } else {
      res.status(403).json('User Info does not match');
    }
  } catch (error) {
    res.status(500).json(error)
  }
})

//get All users
router.get('/searchUsers', async (req, res) => {
  try {
    const users = await Post.find();
    res.status(200).json(users);

  } catch (error) {
    res.status(500).json(error);
  }
})
//Get user by id
router.get('/userName', async (req, res) => {
  try {
    const user = await Post.findById(req.params.id);
    res.status(200).json(user);

  } catch (error) {
    res.status(500).json(error);
  }
})


module.exports = router;