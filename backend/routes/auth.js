const express = require("express");
const router = express.Router();
const passport = require('passport');

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

// Modify the authentication logic to include section_id in the response
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
            // Include section_id in the response if user is a student
            if (user.role === 'student') {
                return res.status(200).json({ message: 'Login successful', role: user.role, sectionId: user.section_id });
            } else {
                return res.status(200).json({ message: 'Login successful', role: user.role });
            }
        });
    })(req, res, next);
});



router.get("/logout", (req, res) => {
    req.logout(()=>{}); // This line should be present with a callback function if required
    res.send({ message: "Logout successful" });
  });
  




module.exports = router;

