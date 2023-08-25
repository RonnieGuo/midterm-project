
const express = require('express');
const { getUserWithEmail } = require('../db/queries/users');
const router = express.Router();
const { addUser } = require('../db/queries/users');
const { addResource } = require('../db/queries/users');
const { getUserResources } = require('../db/queries/users');
const { comment } = require('../db/queries/users');
const { like, getUser, updateUser, searchResources } = require('../db/queries/users');

const generateRandomString = function () {
  // const id = Math.random().toString(16).substring(2, 8);
  const id = parseInt((Math.random() * (100 - 50 + 1)), 10) + 50;
  return id;
};

//login user
router.post('/login', (req, res) => {
  console.log("hey");
  const email = req.body.email;
  const password = req.body.password;
  getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send({ error: "no user with that id" });
    }
    req.session.user_id = user.id;
    res.redirect('/resources');
  });
});


//register new user
router.post('/register', (req, res) => {
  // if (!req.body.email || !req.body.password) {
  //   res.status(400).send("Please enter a valid email and password!");
  // } else if (emailExists(req.body.email)) {
  //   return res.status(400).send('This email id already registered. Please <a href= "/login" >Login</a>!');
  // } else {
    const newUser = {
      userEmail: req.body.email,
      userPassword: req.body.password,
      userID: generateRandomString(),
    }
    //function to add data to database
    addUser(newUser)
    .then(() => {
      req.session.email = newUser.email;
      req.session.user_id = newUser.userID;
      console.log(newUser);
      res.redirect('/resources');
      // res.render('resources', { user });
      // res.status(200).send("ok");
    })
  // }
});

//resources route to view all resources
router.get('/resources', (req, res) => {
  console.log(req.session);
  // getUserResources((allResources) => {
  //   res.render('resources', { allResources });
  // })
  getUserResources(req.session.user_id)
  .then((results) => {
    res.render('resources', { results, user: {} });
  })
});

//New Resource page
router.get('/resources/new', (req, res) => {
  // res.status(200).send("ok");
  res.render('create_resource', {user: {}});
});


router.post('/resources/new', (req, res) => {
  const newResource = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    category: req.body.category,
  }
  const user = req.session.email;
  // function to create new resource
  addResource(newResource, user)
  .then(() => {
    // res.status(200).send("ok");
  res.redirect('/resources');
  });
});

//search route
router.get('/resources/search', (req, res) => {
  let query = req.query.query;
  query = query.split(' ');
  searchResources(query)
  .then(() => {
    res.render('resources');
  })
})

module.exports = router;
