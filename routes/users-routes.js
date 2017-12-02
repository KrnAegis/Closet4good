var db = require("../models");

module.exports = function(app) {
  //not working atm
    app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });
    //works
  app.get("/users/:userid", function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.userid
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });
  //works
  app.post("/users/user", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

};