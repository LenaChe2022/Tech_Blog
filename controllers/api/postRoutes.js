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
router.delete('/:postId', async (req, res) => {
  try {
    const deletePost = await Post.destroy({
      where: {
        id: req.params.postId,
        // user_id: req.session.user_id,
      },
    });

    if (deletePost) {
      res.status(200).json({ message: 'Post Deleted!' });
      // return;
    } else {

    res.status(400).json({ message: 'No post found with this id!' });
    }
  } catch (err) {
    res.status(400).json(err);
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
          // attributes: ["content", "user_id", "date_created"],
          include: [User],
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
          // attributes: ["content", "user_id", "date_created"],
          include: [User],
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

//TODO: update post - done
router.put('/:postId', async (req, res) => {
  try {
    const updatedPost = await Post.update(
      {
        title: req.body.title,
        content: req.body.content,
      },
      {
        where: { id: req.params.postId},
      }
    );
    
    if (updatedPost[0]) {
      res.status(200).json({ message: "Post updated" });
    } else {
      res.status(400).json({ message: "Insufficient data" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
