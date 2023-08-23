/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const { getUserWithEmail } = require('../db/queries/users');
const router = express.Router();
const { addUser } = require('../db/queries/users');
const { addResource } = require('../db/queries/users');
const { getUserResources } = require('../db/queries/users');
const { comment } = require('../db/queries/users');
const { like, getUser, updateUser } = require('../db/queries/users');

//homepage
router.get('/', (req, res) => {
  res.render('users');
});

//login page
router.get('/login', (req, res) => {
  res.render("login");
  // res.status(200).send("ok");
});

//registration page
router.get('/register', (req, res) => {
  res.render('register');
});

//login user
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  getUserWithEmail(email).then((user) => {
    if (!user) {
      return res.send({ error: "no user with that id" });
    }
    req.session.userId = user.id;
    res.status(200).send("ok");
    // res.redirect('/resources');
  });
});

//logout
router.post('/logout', (req, res) => {
  res.redirect('/');
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
      // userID: generateRandomString(),
    }
    //function to add data to database
    addUser(newUser)
    .then(() => {
      // req.session.email = newUser.email;
      // req.session.user_id = id;
      // res.render('/resources');
      res.status(200).send("ok");
    })
  // }
});

//New Resource page
router.get('/resources/new', (req, res) => {
  // res.status(200).send("ok");
  res.render('create_resource');
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
    res.status(200).send("ok");
  // res.redirect('/resources');
  });
});

//search route
router.get('/resources/search', (req, res) => {
  let query = req.query.query;
  query = query.split(' ');
  search(query)
  .then(() => {
    res.render('resources');
  })
})

// //resources route to view all resources
// router.get('/resources', (req, res) => {

// })

//view one resource
router.get('/resources/:id', (req, res) => {
  const resourceId = req.params.id;
  getUserResources(resourceId)
  .then(() => {
    res.render('main', { resource: resource, comments: comments });
  })
});

//add comment
router.post('/resources/:id/comment', (req, res) => {
  const text = req.body.comment;
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  const rating = req.body.rating;
  comment(userId, resourceId, text, rating)
  .then(() => {
    res.redirect('back');
  })
});
// **********************note sure if likes route is correct**********************************
//add like
router.post('/resources/:id/like', (req, res) => {
  if (!req.session.user_id) {
    const message = 'Please login to like posts';
    res.json({message});
  } else {
    const userId = req.session.user_id;
    const resourceId = req.body.resource_id;
    like(userId, resourceId)
    .then(() => {
      res.redirect('back');
    })
  }
});

//user profile page
router.get('/users/:id', (req, res) => {
  const currentUser = {
    id: req.session.user_id,
    user_id: req.params.id
  }
  getUser(currentUser)
  .then(() => {
    res.status(200).send("ok");
    // res.render('profile', {};)
  })
})

//user update profile page
router.post('/users/:id/update', (req, res) => {
  const updatedUserInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    id: req.session.user_id
  }
  updateUser(updatedUserInfo)
  .then(() => {
    res.status(200).send("ok");
    // res.render('profile', {})
  });

})

module.exports = router;
