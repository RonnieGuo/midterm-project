/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const {
  getUser,
  updateUser,
} = require("../db/queries/users");

//login page
router.get("/login", async (req, res) => {
  const user = await getUser(req.session.user_id);
  res.render("login", { user });
});

//registration page
router.get("/register", async (req, res) => {
  const user = await getUser(req.session.user_id);
  res.render("register", { user });
});

//logout
router.post("/logout", (req, res) => {
  req.session.user_id = null;
  res.redirect("/homepage");
});

//user profile page
router.get("/profile", (req, res) => {
  if (!req.session.user_id) {
    res.send("Please login to view your profile page");
    return;
  }
  getUser(req.session.user_id).then((user) => {
    console.log("profileuser", user);
    res.render("profile", { user });
  });
});

//user update profile page
router.post("/:id/update", (req, res) => {
  const updatedUserInfo = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    id: req.session.user_id,
  };
  updateUser(updatedUserInfo).then((user) => {
    res.render("profile", { user });
  });
});

module.exports = router;
