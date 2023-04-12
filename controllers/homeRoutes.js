const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

//render the login view
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
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
    // let userId = null;
    // console.log(req?.user?.dataValues);
    // if (req?.user?.dataValues?.id) {
    //   userId = req.user.dataValues.id;
    //   req.session.save(() => {
    //     req.session.user_id = req.user.dataValues.id;
    //     req.session.logged_in = true;
    //   });
    // }
    // Get all posts and JOIN with user data
    const postsData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'],
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

// TODO include comments
router.get('/post/:id', async (req, res) => {
  try {
    const postsData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
          model: Comment,
          attributes: ['content'],
          include: [User],
        },
      ],
    });

    const post = postsData.get({ plain: true });

    res.render('post', {
      ...post,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



module.exports = router;
