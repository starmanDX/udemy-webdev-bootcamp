const middlewareObj = {},
    campground = require("../models/campground"),
    comment = require("../models/comment");

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        campground.findById(req.params.id, (err, foundCampground) => {
            if(err || !foundCampground){
                req.flash("error", "Campground not found.");
                res.redirect("/campgrounds");
            } else {
                if(foundCampground.author.id.equals(req.user._id) || req.user.isAdmin) {
                    req.campground = foundCampground;
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = (req, res, next) => {
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id, (err, foundComment) => {
            if(err || !foundComment){
                req.flash("error", "Comment not found.");
                res.redirect("/campgrounds");
            } else {
                if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin) {
                    req.comment = foundComment;
                    next();
                } else {
                    req.flash("error", "You don't have permission to do that.");
                    res.redirect("/campgrounds");
                }
            }
        })
    } else {
        req.flash("error", "You need to be logged in to do that.");
        res.redirect("/campgrounds");
    }
};

middlewareObj.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "You need to be logged in to do that.");
    res.redirect("/login");
};

module.exports = middlewareObj