const express   = require("express"),
    campground  = require("../models/campground"),
    comment     = require("../models/comment"),
    router      = express.Router({mergeParams: true});

//COMMMENTS NEW
router.get("/new", isLoggedIn, (req,res) => {
    campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

//COMMENTS CREATE
router.post("/comments", isLoggedIn, (req,res) => {
    campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            comment.create(req.body.comment, (err, comment) => {
                if(err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

//MIDDLEWARE
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router