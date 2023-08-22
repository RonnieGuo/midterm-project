/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

//homepage
router.get('/', (req, res) => {
  res.render('users');
});

//login page
router.get('/login', (req, res) => {
  res.redirect('/login');
});

//registration page
router.get('/register', (req, res) => {
  res.redirect('/register');
});

//login user
router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!bcrypt.compareSync(password, user.password)) {
    return res.send({ error: "error" });
  }
  req.session.userId = user.id;
  //********************** add fn to log the user */
  res.send({
    user: {
      name: user.name,
      email: user.email,
      id: user.id,
    },
  });
});

//logout
router.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
});

//register new user
router.post("/register", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send("Please enter a valid email and password!");
  } else if (emailExists(req.body.email)) {
    return res.status(400).send('This email id already registered. Please <a href= "/login" >Login</a>!');
  } else {
    const userEmail = req.body.email;
    const userPassword = req.body.password;
    const userID = generateRandomString();
    // **add a function to add data to database**
    req.session.user_id = userID;
    res.redirect("/resources");
  }
});

//New Resource page
router.get('/resources/new', (req, res) => {
  res.render('new_resource');
});

router.post('resources/new', (req, res) => {
  const newResource = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    category: req.body.category,
  }
  //***********************add fn to create new resource */
  res.redirect('/resources');
});

//search route
router.get('/resources/search', (req, res) => {

})

//resources route to view all resources
router.get('/resources', (req, res) => {

})

//view one resource
router.get('/resources/:id', (req, res) => {

})
//add comment

//add rating

//add like

//user profile page

//user update profile page

// ..
module.exports = router;
