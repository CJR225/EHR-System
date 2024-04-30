//Christopher Rocco
//Senior Capstone - SER492
//5-08-24

const bCrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

module.exports = function (passport, Student, Instructor) {
  passport.serializeUser(function (user, done) {
    console.log("Attempt to serialize:", user);
    done(null, user);
});

  passport.deserializeUser(function (id, done) {
    const userType = id.split("-")[0];
    const actualId = id.split("-")[1];

    if (userType === "student") {
      Student.findByPk(actualId)
        .then(function (student) {
          if (student) {
            done(null, student.get());
          } else {
            done(new Error("Student not found"));
          }
        })
        .catch(function (err) {
          done(err);
        });
    } else if (userType === "instructor") {
      Instructor.findByPk(actualId)
        .then(function (instructor) {
          if (instructor) {
            done(null, instructor.get());
          } else {
            done(new Error("Instructor not found"));
          }
        })
        .catch(function (err) {
          done(err);
        });
    } else {
      done(new Error("Invalid user type"));
    }
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        Student.findOne({
          where: { username: username },
        }).then(function (instructor) {
          if (instructor) {
            return done(null, false, {
              message: "That username is already taken",
            });
          } else {
            var studentPassword = generateHash(password);
            var data = {
              username: username,
              password: studentPassword,
              fname: req.body.fname,
              lname: req.body.lname,
              section_id: req.body.sectionID,
            };
            Student.create(data).then(function (newStudent, created) {
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
    )
  );

  passport.use(
    "local-instructor-signup",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        var generateHash = function (password) {
          return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
        };

        // Access instructor ID from request body
        var instructorId = req.body.instructor_id;

        // Check if the instructor already exists
        Instructor.findOne({
          where: { username: username },
        }).then(function (instructor) {
          if (instructor) {
            // If instructor exists, return error
            return done(null, false, {
              message: "That username is already taken",
            });
          } else {
            // If instructor doesn't exist, create a new one
            var instructorPassword = generateHash(password);
            var data = {
              instructor_id: instructorId, // Use the instructor ID from the request
              username: username,
              password: instructorPassword,
              // You may include other fields here such as fname, lname, etc.
            };
            Instructor.create(data).then(function (newInstructor, created) {
              if (!newInstructor) {
                return done(null, false);
              }
              if (newInstructor) {
                return done(null, newInstructor);
              }
            });
          }
        });
      }
    )
  );

  passport.use(
    "local-signin",
    new LocalStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true,
      },
      function (req, username, password, done) {
        var isValidPassword = function (userpass, password) {
          return bCrypt.compareSync(password, userpass);
        };

        Student.findOne({
          where: { username: username },
        })
          .then(function (student) {
            if (student) {
              // Authenticate as a student
              if (!isValidPassword(student.password, password)) {
                return done(null, false, { message: "Incorrect password." });
              }
              var studentInfo = student.get();
              return done(null, { ...studentInfo, role: "student" }); // Include role in user object
            } else {
              // If username not found in Student table, check Instructor table
              Instructor.findOne({
                where: { username: username },
              })
                .then(function (instructor) {
                  if (!instructor) {
                    return done(null, false, {
                      message: "Username does not exist",
                    });
                  }
                  if (!isValidPassword(instructor.password, password)) {
                    return done(null, false, {
                      message: "Incorrect password.",
                    });
                  }
                  var instructorInfo = instructor.get();
                  return done(null, { ...instructorInfo, role: "instructor" }); // Include role in user object
                })
                .catch(function (err) {
                  console.log("Error:", err);
                  return done(null, false, {
                    message: "Something went wrong with your Signin",
                  });
                });
            }
          })
          .catch(function (err) {
            console.log("Error:", err);
            return done(null, false, {
              message: "Something went wrong with your Signin",
            });
          });
      }
    )
  );
};
