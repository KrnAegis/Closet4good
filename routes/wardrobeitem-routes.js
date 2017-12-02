var db = require("../models");
var transUpdate = require("../transaction.js");

// Routes
// =============================================================
module.exports = function(app) {

  //works
  app.get("/user/wardrobeitems/:wardrobeId", function(req, res){
    db.WardrobeItem.findAll({
      where: {
        WardrobeId: req.params.wardrobeId
      }
    }).then(function(dbItems){
      console.log(dbItems);
      res.json(dbItems);
    });
  });
  //works
  app.post("/user/wardrobeitems/save/:wardrobeId", function(req, res){
    // insert transaction business here
      db.WardrobeItem.create({
          WardrobeId: req.params.wardrobeId,
          category: req.body.category,
          subcategory: req.body.subcategory,
          count: req.body.count
      }).then(function(dbItem) {
      res.json(dbItem);
  });
});

  app.post("/user/buildWardrobe", function(req, res){
    transUpdate(db.WardrobeItem, [], req.body.updates, [])
    .then(function(t){
       console.log("Success!");
       console.log(t);
     })
    .catch(function(err){
       console.log("Error");
       console.log(err);
     });
  });

  app.post("/user/wardrobeitemsave/:itemId", 
    function(req, res){
    // insert transaction business here
      db.WardrobeItem.update({
        count: req.body.count
      }, {
        where: {
          id: req.params.itemId
        }
      }).then(function(dbItem) {
        res.json(dbItem);
       }); 
    });

  //works
  app.get("/user/wardrobeitem/:id", function(req, res) {
    // 2. Add a join here to include the Author who wrote the Post
    db.WardrobeItem.findOne({
      where: {
        //wardrobeitems joined by user_id
        id: req.params.id
      }
    }).then(function(dbItem) {
      console.log(dbItem);
      res.json(dbItem);
    });
  });


  // DELETE route for deleting posts
  app.delete("/user/wardrobeitem/:id", function(req, res) {
    db.WardrobeItem.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbItem) {
      res.json(dbItem);
    });
  });

  // PUT route for updating posts
  app.put("/user/wardrobeitem", function(req, res) {
    db.WardrobeItem.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbItem) {
        res.json(dbItem);
      });
  });
};