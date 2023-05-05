const sequelize = require('../config/connection');



//another vertion of seeding usin js files:

const seedUser = require('./userData');
const seedPost = require('./postData')
const seedComment = require('./commentData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();

  await seedComment();

  process.exit(0);
};

seedAll();


//version of seeding using json files:

// const { User, Post, Comment } = require('../models');

// const userData = require('./userData.json');
// const postData = require('./postData.json');
// const commentData = require('./commentData.json');

// const seedDatabase = async () => {
//   await sequelize.sync({ force: true });

//   const users = await User.bulkCreate(userData, {
//     individualHooks: true,
//     returning: true,
//   });

//   for (const post of postData) {
//     await Post.create({
//       ...post,
//       user_id: users[Math.floor(Math.random() * users.length)].id,
//     });
//   }


//   const comment = await Comment.bulkCreate(commentData, {
//     individualHooks: true,
//     returning: true,
//   });

//   process.exit(0);
// };

// seedDatabase();
