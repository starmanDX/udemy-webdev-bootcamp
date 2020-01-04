const express               = require("express"),
    bodyParser              = require("body-parser"),
    mongoose                = require("mongoose"),
    passport                = require("passport"),
    localStrategy           = require('passport-local'),
    passportLocalMongoose   = require("passport-local-mongoose"),
    app                     = express(),
    user                    = require("./models/user"),
    hostname                = "127.0.0.1",
    port                    = process.env.PORT || 3000;

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/secret-page");
passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require("express-session")({
    secret: "Earthbound is the best game ever.",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

//ROUTES

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret", isLoggedIn, (req, res) => {
    res.render("secret");
});

app.get("/register", (req,res) => {
    res.render("register");
});

app.post("/register", (req,res) => {
    user.register(new user({username: req.body.username}), req.body.password, (err,user) => {
        if(err) {
            console.log(err);
            res.render("register");
        } else {
            passport.authenticate("local")(req,res,() => {
                res.redirect("/secret");
            })
        }
    });
});

app.get("/login", (req,res) => {
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret", 
    failureRedirect: "/login"
}), (req, res) => {
});

app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}`)
})