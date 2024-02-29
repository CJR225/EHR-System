var bCrypt = require('bcryptjs');
module.exports = function(passport, student) {
    Student = student;
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(function(student, done) {
        done(null, student.user_id);
    }),
    passport.deserializeUser(function (user_id, done) {
        Student.findByPk(user_id).then(function (student) {
            if (student) {
                done(null, student.get());
            } else {
                done(student.errors, null);
            }
        });
}),
    passport.use('local-signup', new LocalStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback 
        },
        function(req, username, password, done) {
            var generateHash = function(password) {
                return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            };
            if (Student == null) {
                console.log("is null");
            }
            Student.findOne({
                where: {
                   username : username
                }
            }).then(function(student) {
                if (student)
                {
                    return done(null, false, {
                        message: 'That username is already taken'
                    });
                } else
                {
                    var studentPassword = generateHash(password);
                    var data =
                        {
                            username: username,
                            password: studentPassword,
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
            // by default, local strategy uses username and password, we will override with email 
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback 
        },
        function(req, username, password, done) {
            var Student = student;
            var isValidPassword = function(userpass, password) {
                return bCrypt.compareSync(password, userpass);
            }
            Student.findOne({
                where: {
                    username: username
                }
            }).then(function(student) {
                if (!student) {
                    return done(null, false, {
                        message: 'username does not exist'
                    });
                }
                if (!isValidPassword(student.password, password)) {
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });
                }
                var studentinfo = student.get();
                return done(null, studentinfo);
            }).catch(function(err) {
                console.log("Error:", err);
                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });
            });
        }
    ));
}