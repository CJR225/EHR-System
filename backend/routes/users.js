var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/Student"); // user model added
var Verify = require("./verify"); // verfication
const bcrypt = require("bcrypt");
/* GET users listing. */
// verification is added to all get requests
router.get(
  "/",
  Verify.verifyOrdinaryUser,
  Verify.verifyAdmin,
  function (req, res, next) {
    User.find({}, function (err, users) {
      if (err) {
        throw err;
      }
      res.json(users);
    });
  }
);

// 3- register a new user on end poitn register, info is sent as a json object
router.post("/register", async function (req, res) {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    function (err, user) {
      if (err) return res.status(500).json({ err: err });
      passport.authenticate("local")(req, res, function () {
        var token = Verify.getToken(user);

        return res
          .status(200)
          .header("x-access-token", token)
          .header("access-control-expose-headers", "x-access-token")
          .json({ status: "Registration Successful !" });
      });
    }
  );
});
// 4- user login
router.post("/login", (req, res, next) => {
  //req.body will have username and password

  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log("no user");
      return res.status(401).json({ err: info });
    }
    req.logIn(user, function (err) {
      if (err) return res.status(500).json({ err: "Could not log in user" });

      console.log("User in users: ", user);
      User.findOne({ username: user.username }, function (err, dbUser) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        console.log("DB user:", dbUser);
        var token = Verify.getToken(dbUser);
        res.status(200);
        res.send(token);
        //res.header("Auth", token);
      });
    });
  })(req, res, next);
});

// 5- implementing logout
router.get("/logout", function (req, res) {
  req.logout();
  res.status(200).json({
    status: "Bye!",
  });
});

module.exports = router;