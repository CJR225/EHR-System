const express = require("express");

const app = express();

const db = require("./models");

//use this template below for insert/delete/select of a table
const { Student } = require("./models");

app.get("/select", (req, res) => {
  Student.findAll()
    .then((students) => {
      res.send(students);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/insert", (req, res) => {
  Student.create({
    username: "test3",
    password: "test3",
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send("insert");
});

app.get("/delete", (req, res) => {
    User.destroy({where: {id: 10}})
  res.send("delete");
});

db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log("Connected to Backend");
  });
});
