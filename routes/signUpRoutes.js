const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const Signup = require("../models/signUp.js");
const router = express.Router();


router.get("/signUp", (req, res) => {
    res.render("signUp");
});

router.post("/signUp", async (req, res) => {
        const signup = new Signup(req.body);
        console.log(req.body);
        await Signup.register(signUp, req.body.password, (err) => {
            if (err) {
                res.status(400).render("signUp");
                console.log(err);
            } else {
                res.redirect("/login");
            }
        });
    });



module.exports = router
