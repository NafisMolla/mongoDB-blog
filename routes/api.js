const express = require("express");
const router = express.Router();

const BlogPost = require("../models/BlogPost");

const data = {
  title: "chupapi",
  body: "monanyo",
};

router.get("/api", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log("err", err);
    });
});

router.post("/save", (req, res) => {
  console.log(req.body);
  const data = req.body;

  const newBlogPost = new BlogPost(data);
  //sending data to database
  newBlogPost.save((err) => {
    if (err) {
      res.status(500).json({ msg: "there was an error" });
      return;
    }
  });
});

module.exports = router;
