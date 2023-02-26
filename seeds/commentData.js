const { Comment } = require('../models');

const commentdata = [
    {
        // content: "I am agree!",
        // post_id: 1,
        // user_id: 1
      },
];

const seedComment = () => Comment.bulkCreate(commentdata);

module.exports = seedComment;