
// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");
var db = require("./models");

var htmlRoute = require("./routes/html-routes.js");
var apiRoute = require("./routes/api-routes.js");
var usersRoute = require("./routes/users-routes.js");
var wardrobeRoute = require("./routes/wardrobe-routes.js");
var wardrobeitemRoute = require("./routes/wardrobeitem-routes.js");
// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8880;

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "closets for good", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
htmlRoute(app);
apiRoute(app);
usersRoute(app);
wardrobeRoute(app);
wardrobeitemRoute(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Site up at http://localhost:%s/", PORT);
  });
});
