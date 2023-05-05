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
      res.status(400).json({ message: "insafficient data" })
    }
  } catch (err) {
    res.status(400).json(err);
  }
});



module.exports = router;