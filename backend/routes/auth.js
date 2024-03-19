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
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;

