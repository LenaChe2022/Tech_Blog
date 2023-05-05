const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create NEW post
router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//DELETE one post
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all posts
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["content", "user_id", "date_created"],
          // include: [User],
        },
      ],
    });
    if (postData) {
      res.status(200).json(postData); 
      
    } else {
      res.status(400).json({message: "No post data found"})
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//TODO: find one post
router.get('/:postId', async (req,res) => {
   try {
    const postData = await Post.findAll({
      where: {
        id: req.params.postId,

      },
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          attributes: ["content", "user_id", "date_created"],
        },  
      ], 
    });
    if (postData) {
      res.status(200).json(postData); 
      
       } else {
        res.status(400).json({message: "No post data found"})
       }
    } catch (err) {
      res.status(400);json(err);
    } 
});

//TODO: update post

module.exports = router;
