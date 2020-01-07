const express   = require("express"),
    passport    = require("passport"),
    user        = require("../models/user"),
    router      = express.Router({mergeParams: true});

//ROOT ROUTE
router.get("/", (req, res) => {
    res.render("landing");
});

//REGISTER ROUTE
router.get("/register", (req, res) => {
    res.render("register", {page: 'register'});
});

//REGISTER POST ROUTE
router.post("/register", (req, res) => {
    let newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, (err, user) => {
        if(err) {
            req.flash("error", err.message + ".");
            res.redirect("back");
        } else {
            passport.authenticate("local")(req, req, () => {
                req.flash("success", "Welcome to YelpCamp, " + user.username + "!");
                res.redirect("/campgrounds");
            })
        }
    })
});

//LOGIN ROUTE
router.get("/login", (req, res) => {
    res.render("login", {page: 'login'});
});

//LOGIN POST ROUTE
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),(req, res) => {
});

//LOGOUT ROUTE
router.get("/logout", (req, res) => {
    req.logout();
    req.flash("success", "Successfully logged out.");
    res.redirect("/campgrounds");
});

module.exports = router