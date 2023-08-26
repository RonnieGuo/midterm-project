const express = require("express");
const router = express.Router();

const {
  getUserWithEmail,
  addUser,
  getUserResources,
  addResource,
  searchResources,
  comment,
  like,
  getUser,
  getResourceById,
  getComments,
} = require("../db/queries/users");

const generateRandomString = function () {
  const id = parseInt(Math.random() * (100 - 50 + 1), 10) + 50;
  return id;
};

router.get("/homepage", async (req, res) => {
  const user = await getUser(req.session.user_id);
  res.render("homepage", { user });
});

//login user
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  getUserWithEmail(email, password).then((user) => {
    if (!user) {
      return res.send("Please check the email and password or register!");
    }
    req.session.user_id = user.id;
    res.redirect("/resources");
  });
});

//register new user
router.post("/register", (req, res) => {
  // if (!req.body.email || !req.body.password) {
  //   res.status(400).send("Please enter a valid email and password!");
  // } else if (emailExists(req.body.email)) {
  //   return res.status(400).send('This email id already registered. Please <a href= "/login" >Login</a>!');
  // } else {
  const newUser = {
    userEmail: req.body.email,
    userPassword: req.body.password,
    userID: generateRandomString(),
  };
  //function to add data to database
  addUser(newUser).then(() => {
    req.session.email = newUser.userEmail;
    req.session.user_id = newUser.userID;
    console.log(newUser);
    res.redirect("/users/login");
  });
  // }
});

//resources route to view all resources
router.get("/resources", async (req, res) => {
  if (!req.session.user_id) {
    res.send("Please <a href='/users/login'>Login</a> to view your resources");
    return;
  }
  const user = await getUser(req.session.user_id);
  getUserResources(req.session.user_id).then((results) => {
    console.log("resourceresults", user);
    res.render("resources", { results, user });
  });
});

//New Resource page
router.get("/resources/new", async (req, res) => {
  if (!req.session.user_id) {
    res.send("Please <a href='/users/login'>Login</a> to create resources");
    return;
  }
  const user = await getUser(req.session.user_id);
  res.render("create_resource", { user });
});

//view one resource
router.get("/resources/:id", async (req, res) => {
  const resourceId = req.params.id;
  const userId = req.session.user_id;
  let comments = await getComments(resourceId);
  const user = await getUser(userId);
  getResourceById(resourceId).then((results) => {
    res.render("main", {
      resource: results[0],
      userId,
      comments,
      results,
      user,
    });
  });
});

router.post("/resources/new", (req, res) => {
  const newResource = {
    title: req.body.title,
    description: req.body.description,
    url: req.body.url,
    category: req.body.category,
  };
  const user = req.session.user_id;
  // function to create new resource
  addResource(newResource, user).then(() => {
    res.redirect("/resources");
  });
});

//search route
router.get("/resources/search", (req, res) => {
  let query = req.query.text;
  searchResources(query).then((results) => {
    res.render("resources", { user: {}, results });
  });
});

//add comment
router.post("/resources/:id/comment", (req, res) => {
  console.log("helllo----");
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
