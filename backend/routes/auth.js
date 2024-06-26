//Christopher Rocco
//Senior Capstone - SER492
//5-08-24

const express = require("express");
const router = express.Router();
const passport = require('passport');


//This route is used for signup for STUDENTS
router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message }); // Username already taken
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'User created successfully' });
        });
    })(req, res, next);
});


//This route is used for signup for INSTRUCTORS
//needs to be manually put into postman with body credential information --> students are the only ones allowed to register on frontend
router.post('/signup-instructor', (req, res, next) => {
    passport.authenticate('local-instructor-signup', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message }); // Username already taken
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'User created successfully' });
        });
    })(req, res, next);
});

//This route is used to check user role trying to sign in, passing that role information in response to frontend --> used for student or instructor
router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: info.message }); // Username does not exist or Incorrect password
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            
            if (user.role === 'student') {
                return res.status(200).json({ message: 'Login successful', role: user.role, sectionId: user.section_id });
            } else {
                return res.status(200).json({ message: 'Login successful', role: user.role });
            }
        });
    })(req, res, next);
});


//Logout route is important as if a user does not logout before switching accounts, permissions can be still there
//Ex. instructor is logged in but does not logout and tries to sign back in as student --> instructor order view will still be present
router.get("/logout", (req, res) => {
    req.logout(()=>{});
    res.send({ message: "Logout successful" });
  });
  




module.exports = router;

