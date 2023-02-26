const { User } = require('../models');

const userdata = [
    {
        name: "Sal",
        password: "pas12345"
      },
      {
        name: "Lernantino",
        password: "pas12345"
      },
      {
        name: "Amiko",
        password: "pas12345"
      },
];

const seedUser = () => User.bulkCreate(userdata);

module.exports = seedUser;
