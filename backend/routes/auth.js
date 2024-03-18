const express = require("express");
const router = express.Router();
const passport = require('passport');

router.post('/signup', passport.authenticate('local-signup'), (req, res) => {
    res.status(200).json({ message: 'User created successfully' });
});

router.post('/signin', passport.authenticate('local-signin'), (req, res) => {
    res.status(200).json({ message: 'Login successful' });
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
