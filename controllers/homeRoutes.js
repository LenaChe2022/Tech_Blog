const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//render the login view
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

// below route will clear the cookie and logout the user
router.get('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});

//render the homepage view
router.get('/', async (req, res) => {
  try {
//ADDED code for setting session when sign in    
    let userId = null;
    console.log(req?.user?.dataValues);
    if (req?.user?.dataValues?.id) {
      userId = req.user.dataValues.id;
      req.session.save(() => {
        req.session.user_id = req.user.dataValues.id;
        req.session.logged_in = true;
      });
    }
    // Get all posts and JOIN with user data
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postsData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts, 
      logged_in: userId ? true : req.session.logged_in,
      user_id: userId ?? req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//Show one post
router.get('/post/:postId', async (req, res) => {
  try {
    const postsData = await Post.findByPk(req.params.postId,
      {include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          include: [User],
        },
      ],
    });

  

    const post = postsData.get({ plain: true });

    console.log(post);

    res.render('post', {
      post,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


//render users dashboard:
router.get('/dashboard', async (req, res) => {

  try {

    // Get all posts and JOIN with user data
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      // where: { user_id: req.session.user_id },
      inclide: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Comment,
          include: [User]
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('dashboard', {
      posts,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
}); 


//render New post view
router.get('/post', async (req, res) => {
  try {
    res.render('newpost', {
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
