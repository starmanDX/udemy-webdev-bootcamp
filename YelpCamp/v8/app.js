const express   = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    campground  = require("./models/campground"),
    comment     = require("./models/comment"),
    user        = require("./models/user"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    seedDB      = require("./seeds"),
    app         = express(),
    hostname    = "127.0.0.1",
    port        = process.env.PORT || 3000;

const commentRoutes     = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp_v8")
app.use(express.static(__dirname + "/public"))
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}));
//seedDB();

app.use(require('express-session')({
    secret: "Earthbound is the greatest!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next) => {
    res.locals.currentUser = req.user;
    next();
});
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.listen(port, hostname, () => {
    console.log(`Server now running at http://${hostname}:${port}`)
});