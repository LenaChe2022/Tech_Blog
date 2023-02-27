# Tech_Blog

## Description

My motivation was to to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well.

My app builded completely from scratch, and follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)

## Installation

To run this app follow steps:
* clone the repo to your computer;
* for using mysql in this app, enter yor uername and password in `.env.EXAMPLE` file and rename it to `.env`
* to install all nesessary packages (MySQL2 package, Inquirer package,console.table package) enter in CLI: `npm install`
* to create Database open the db folder in your CLI and enter the following to run mySql:
* `mysql -u root -p`
* then enter your SQL password
* enter `sourse schema.sql` in mysql CLI to create working DataBase and chose working DataBase by entering `USE techblog_db;`; After creating the DataBase you may quit MySQL in your Command line using comand `quit` and come back to your CLI.
* Run `npm run seed` or `node seeds/seed.js` to seed data to the DataBase.
* The application will be invoked by using the following command in the Command line: `node server.js` or `npm run start`. You will see "App listening on port 3001!". The server listening on http://localhost:3001/api/
* In the end of work do not forget to stop server listening by using comand "control"+"C" of your keyboard in CLI.

## Usage

Use this app as a blog to create new posts and add your comments to other post.


## Credits

N/A


## License
  
  ![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
  (https://opensource.org/licenses/MIT)

## Tests

N/A

## Questions

My GitHub profile: https://github.com/LenaChe2022

With additional questions contact me by email:
lenache2022@gmail.com
