
const express = require('express');
const router = express.Router();

const {
  getUsers,
  getUserWithEmail,
  getUserWithId,
  addUser,
  getUserResources,
  addResource,
  searchResources,
  comment,
  like,
  getUser,
  updateUser,
  getResourceById,
  getComments,
} = require('../db/queries/users');

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
  getUserWithEmail(email, password).then((user) => {
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

//New Resource page
router.get('/resources/new', (req, res) => {
  // res.status(200).send("ok");
  res.render('create_resource', {user: {}});
});

//view one resource
router.get("/resources/:id", async (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  // console.log(userId,'userid');
  // let resource ="";
  // let comments="";
  let comments = await getComments(resourceId);
  // console.log('comments--', comments)
  getResourceById(resourceId).then((results) => {
    // results.forEach(element => {
    //   resource = element;
    //   comments = element.comments_count;
      // console.log('results----', results);
      // console.log('comments--', comments1);
      res.render("main", {resource: results[0], userId, comments, results, user: {} });
    // console.log('results', results[0].comments_count);
    // let resource = results[0];
    // let comments = results[0].comments_count;
    // res.render("main", {results, resource: resource, comments: comments, user: {} });
  });
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
  console.log("helllo----")
  const text = req.body.comment;
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  const rating = req.body.rating;
  comment(userId, resourceId, text, rating).then(() => {
    res.redirect("back");
  });
});


//add like
router.post("/resources/:id/like", (req, res) => {
  if (!req.session.user_id) {
    const message = "Please login to like posts";
    res.json({ message });
  } else {
    const userId = req.session.user_id;
    const resourceId = req.body.resource_id;
    like(userId, resourceId).then(() => {
      res.redirect("back");
    });
  }
});

module.exports = router;
