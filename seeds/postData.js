const { Post } = require('../models');

const postdata = [
    {
        title: "My first post",
        content: "To maintain an evenly balanced design, Bulma provides a very useful control container with which you can wrap the form controls.",
        // user_id: 1
      },
    
];

const seedPost = () => Post.bulkCreate(postdata);

module.exports = seedPost;
