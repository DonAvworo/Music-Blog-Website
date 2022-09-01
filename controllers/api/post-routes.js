const router = require('express').Router();
const { User, Post } = require('../../models');

//create post 
router.post('/post', async (req, res) => {
  try {
    const savePost = await new Post(req.body);
    const savedPost = await savePost.save()
    res.status(200).json(savedPost);

  } catch (error) {
    res.status(500).json(error);
  }

})
//update post
router.put('/update', async (req, res) => {
  try {
    const update = await Post.findById(req.params.id);
    if (update.userId === req.body.userId) {
      await Post.updateOne({ $set: req.body });
      res.status(200).json('it has been updated');

    } else {
      res.status(403).json('you can only update or delete your post');
    }
  } catch (error) {
    res.status(500).json(error)
  }

})


//delete post 
router.delete('/delete', async (req, res) => {
  try {
    const deletepost = await Post.findById(req.params.id);
    if (deletepost.userId === req.body.userId) {
      await Post.deleteOne()
      res.status(200).json(' post sucessfully deleted')
    } else {
      res.status(403).json("you can only update or delete your post")
    }
  } catch (error) {
    res.status(500).json(error)
  }

})

//like post
router.put('/like', async (req, res) => {
  try {
    const like = await Post.findById(req.params.id);
    await Post.updateOne({ $set: req.body });
    res.status(200).json('like registered');

  } catch (error) {
    res.status(500).json(error)
  }

})

//disLike post
router.put('/dislike', async (req, res) => {
  try {
    const dislike = await Post.findById(req.params.id);
    await Post.updateOne({ $set: req.body });
    res.status(200).json('dis-like registered');

  } catch (error) {
    res.status(500).json(error)
  }

})

//Leave a comment
router.put('/comment', async (req, res) => {
  try {
    const comment = await Post.findById(req.params.id);
    await Post.updateOne({ $set: req.body });
    res.status(200).json('comment registered');

  } catch (error) {
    res.status(500).json(error)
  }

})

//get All posts 
router.get('/search', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json(error);
  }
})

//get posts by title 
router.get('/id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);

  } catch (error) {
    res.status(500).json(error);
  }
})

module.exports = router;
