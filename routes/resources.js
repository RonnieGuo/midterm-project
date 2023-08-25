const express = require('express');
const router = express.Router();
const { comment } = require('../db/queries/users');

router.post("/:id/comment", (req, res) => {
    console.log("helllo----", req.body)
    const text = req.body.comment;
    const resourceId = req.params.id;
    const userId = req.session.user_id;
    const rating = req.body.rating;
    comment(userId, resourceId, text, rating).then(() => {
      res.redirect(`/resources/${resourceId}`);
    });
  });

module.exports = router;
