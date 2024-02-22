const express = require("express");
const router = express.Router()

const { Student } = require("./models");

app.get("/select", (req, res) => {
  Student.findAll({where: {user_id: 4 }})
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
    section_id: 1,
  }).catch((err) => {
    if (err) {
      console.log(err);
    }
  });

  res.send("insert");
});

app.get("/delete", (req, res) => {
    Student.destroy({where: {user_id: 1}})
  res.send("delete");
});

module.exports = router