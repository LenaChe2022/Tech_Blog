const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//create NEW comment
router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    //{
    //   ...req.body,
    //   post_id: req.params.id,
    //   user_id: req.session.user_id,
    // });
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



module.exports = router;