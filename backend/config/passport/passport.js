const bCrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport, Student) {
    passport.serializeUser(function(student, done) {
        done(null, student.user_id);
    });

    passport.deserializeUser(function (user_id, done) {
        Student.findByPk(user_id).then(function (student) {
            if (student) {
                done(null, student.get());
            } else {
                done(student.errors, null);
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
            }).then(function(student) {
                if (student) {
                    return done(null, false, { message: 'That username is already taken' });
                } else {
                    var studentPassword = generateHash(password);
                    var data = {
                        username: username,
                        password: studentPassword,
                        fname: req.body.fname, // Extract fname from request body
                        lname: req.body.lname, // Extract lname from request body
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
            }).then(function(student) {
                if (!student) {
                    return done(null, false, { message: 'Username does not exist' });
                }
                if (!isValidPassword(student.password, password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                var studentinfo = student.get();
                return done(null, studentinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, { message: 'Something went wrong with your Signin' });
            });
        }
    ));
};