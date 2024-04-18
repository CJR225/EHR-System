const bCrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, Student, Instructor) {
    passport.serializeUser(function(instructor, done) {
        done(null, instructor.user_id);
    });

    passport.deserializeUser(function (user_id, done) {
        Student.findByPk(user_id).then(function (instructor) {
            if (instructor) {
                done(null, instructor.get());
            } else {
                done(instructor.errors, null);
            }
        });
    });

    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            
            Student.findOne({
                where: { username: username }
            }).then(function(instructor) {
                if (instructor) {
                    return done(null, false, { message: 'That username is already taken' });
                } else {
                    var studentPassword = generateHash(password);
                    var data = {
                        username: username,
                        password: studentPassword,
                        fname: req.body.fname, 
                        lname: req.body.lname,
                        sectionID: req.body.sectionID,
                    };
                    Student.create(data).then(function(newStudent, created) {
                        if (!newStudent) {
                            return done(null, false);
                        }
                        if (newStudent) {
                            return done(null, newStudent);
                        }
                    });
                }
            });
        }
    ));

    passport.use('local-signin', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            Student.findOne({
                where: { username: username }
            }).then(function(instructor) {
                if (!instructor) {
                    return done(null, false, { message: 'Username does not exist' });
                }
                if (!isValidPassword(instructor.password, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                var instructorinfo = instructor.get();
                return done(null, instructorinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));

    passport.use('signin-instructor', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        function(req, username, password, done) {
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            };

            Instructor.findOne({
                where: { username: username }
            }).then(function(instructor) {
                if (!instructor) {
                    return done(null, false, { message: 'Username does not exist' });
                }
                if (!isValidPassword(instructor.password, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                var instructorinfo = instructor.get();
                return done(null, instructorinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));
};