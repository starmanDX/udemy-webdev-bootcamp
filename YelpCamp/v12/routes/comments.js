const express   = require("express"),
    campground  = require("../models/campground"),
    comment     = require("../models/comment"),
    middleware  = require("../middleware"),
    router      = express.Router({mergeParams: true});

//NEW ROUTE
router.get("/new", middleware.isLoggedIn, (req,res) => {
    campground.findById(req.params.id, (err, campground) => {
        if(err || !campground){
            req.flash("error", "Comment not found.");
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

//CREATE ROUTE
router.post("/", middleware.isLoggedIn, (req,res) => {
    campground.findById(req.params.id, (err, campground) => {
        if(err || !campground){
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            comment.create(req.body.comment, (err, comment) => {
                if(err || !comment) {
                    req.flash("error", "Something went wrong.");
                    res.redirect("back");
                } else {
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment.");
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
});

//EDIT ROUTE
router.get("/:comment_id/edit", middleware.isLoggedIn, middleware.checkCommentOwnership, (req, res) => {
    comment.findById(req.params.comment_id, (err, foundComment) => {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("/campgrounds/" + req.params.id);
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: req.comment});
        }
    });
});

//UPDATE ROUTE
router.put("/:comment_id", middleware.checkCommentOwnership, (req, res) => {
    comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully updated comment.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

//DELETE ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, (req,res) => {
    comment.findByIdAndDelete(req.params.comment_id, (err) => {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted comment.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

module.exports = router