const express = require("express");
const router = express.Router();
const { Patient } = require("../models");

router.get("/byId/:id", async (req,res) => {
    const id = req.params.id;
    
});

module.exports = router;