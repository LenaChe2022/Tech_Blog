const router = require('express').Router();
const { Comment } = require('../../models');


//create NEW comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    
    if (newComment) {
    res.status(200).json({ message: "Comment added!"});
    } else {
      res.status(404).json({ message: "insafficient data" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//delete one comment
router.delete('/:commentId', async (req, res) => {
  try {
    const deleteComment = await Comment.destroy({
      where: {
        id: req.params.commentId,
      },
    });
    if (deleteComment) {
      res.status(200).json({ message: "Comment Deleted!"});
    } else {
      res.status(404).json({ message: "No comment with this ID"});
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

//get all comments
router.get('/', async (req, res) => {
   try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
   } catch (err) {
    res.status(400).json(err);
   }
});

//update a comment
router.put('/:commentId', async (req, res) => {
  try {
    const updateComment = await Comment.update(
      {
        content: req.body.content,
      },
      {
        where: {
          id: req.params.commentId,
        },
      }
    );
    if (updateComment[0]) {
      res.status(200).json({ message: "Comment Updated" });
    } else {
      res.status(404).json({ message: "Insufficient data" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


module.exports = router;