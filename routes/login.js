
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

router.get('/homepage', (req, res) => {
  res.render('homepage', { user:{} });
});

//login user
router.post('/login', (req, res) => {
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
  // getUserResources((allResources) => {
  //   res.render('resources', { allResources });
  // })
  getUserResources(req.session.user_id)
  .then((results) => {
    console.log(req.session.user_id);
    res.render('resources', { results, user: {} });
  })
});

//view one resource
router.get("/resources/:id", (req, res) => {
  const resourceId = req.params.id;
  let resource ="";
  let comments="";
  getUserResources(resourceId).then((results) => {
    results.forEach(element => {
      resource = element;
      comments = element.comments_count;
      console.log('element', element);
      // res.render("main", {resource, comments, results, user: {} });
    })
    // console.log('results', results[0].comments_count);
    // let resource = results[0];
    // let comments = results[0].comments_count;
    res.render("main", {resource: resource, comments: comments, user: {} });
  });
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
  const user = req.session.user_id;
  // function to create new resource
  addResource(newResource, user)
  .then((result) => {
    // res.status(200).send("ok");
  res.redirect('/resources');
  });
});

//search route
router.get('/resources/search', (req, res) => {
  let query = req.query.text;
  searchResources(query)
  .then((results) => {
    res.render('resources', {user:{}, results});
  })
});

//add comment
router.post("/resources/:id/comment", (req, res) => {
  const text = req.body.comment;
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  const rating = req.body.rating;
  comment(userId, resourceId, text, rating).then(() => {
    res.redirect("back");
  });
});
module.exports = router;
