var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {
  //works
  app.get("/user/wardrobes/:userId", function(req, res) {
    db.Wardrobe.findAll({
      where: {
        UserId: req.params.userId
      }
    }).then(function(dbItems) {
      console.log(dbItems);
      res.json(dbItems);
    })
  });
  //works
  // Get rotue for retrieving a single post
  app.get("/user/wardrobe/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.Wardrobe.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbInfo) {
      console.log(dbInfo);
      res.json(dbInfo);
    });
  });
  //works
  // POST route for saving a new post
  app.post("/user/wardrobe/:userId", function(req, res) {
    db.Wardrobe.create({
          UserId: req.params.userId,
          gender: req.body.gender,
          name: req.body.name,
          }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};