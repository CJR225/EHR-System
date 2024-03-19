var User = require("../models/Student");
var jwt = require("jsonwebtoken"); // used to create, sign, and verify tokens
const config = require("../config/config.js");

exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey, {
    //sercretkey used here
    expiresIn: 3600, //seconds (1hr)
  });
};
//verify logged in user
exports.verifyOrdinaryUser = function (req, res, next) {
  // check header or url parameters or post parameters for token
  //retrieve token from one of these places
  var token =
    req.body.token || req.query.token || req.headers["x-access-token"];
  // decode token

  if (token) {
    jwt.verify(token, config.secretKey, function (err, decoded) {
      if (err) {
        var err = new Error("You are not authenticated !");
        err.status = 401;
        return next(err);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var err = new Error("No token provided!");
    err.status = 403;
    return next(err);
  }
  console.log("user verified");
};

exports.verifyAdmin = function (req, res, next) {
  console.log(req.decoded);
  if (req.decoded._doc.username == "admin") {
    console.log("admin verified");
    next();
  } else {
    var err = new Error("You are not authorized!");
    err.status = 403;
    return next(err);
  }
};