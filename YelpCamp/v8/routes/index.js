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
    res.render("register");
});

//REGISTER POST ROUTE
router.post("/register", (req, res) => {
    let newUser = new user({username: req.body.username});
    user.register(newUser, req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render("register");
        } else {
            passport.authenticate("local")(req, req, () => {
                res.redirect("/campgrounds");
            })
        }
    })
});

//LOGIN ROUTE
router.get("/login", (req, res) => {
    res.render("login");
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
    res.redirect("/campgrounds");
});


//MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router