const router = require("express").Router();
const Article = require("../models/Article");

router.get("", (req, res) => {
  console.log("Get request for all articles received...");
  Article.find({})
    .sort({ createdAt: "desc" })
    .then(function (results) {
      return res.send(results);
    });
});

router.post("", (req, res) => {
  console.log(`Post request received...`);
  console.log(req.body);
  const article = new Article(req.body);
  article.save().then((article) => {
    return res.send(article);
  });
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(`get request for article ${id} received...`);

  Article.findById(id).then((article) => {
    if (!article) {
      const error = new Error("Article not found");
      next(error);
    } else {
      return res.send(article);
    }
  });
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(`Update request for article ${id} received...`);

  Article.findByIdAndUpdate(id, req.body).then((article) => {
    if (!article) {
      const error = new Error("Article not found");
      next(error);
    } else {
      return res.send(article);
    }
  });
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id;
  console.log(`Delete request for article ${id} received...`);

  Article.findByIdAndDelete(id)
    .then((article) => {
      if (!article) {
        const error = new Error("Article not found");
        next(error);
      } else {
        return res.send(article);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        error: err,
      });
    });
});

module.exports = router;
