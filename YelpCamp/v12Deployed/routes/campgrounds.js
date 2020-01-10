const express   = require("express"),
    campground  = require("../models/campground"),
    middleware  = require("../middleware"),
    router      = express.Router({
        mergeParams: true
    });

// INDEX ROUTE - show all campgrounds
router.get("/", (req, res) => {
    campground.find({}, (err, allCampgrounds) => {
        if (err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user,
                page: 'campgrounds'
            });
        }
    })
});

//NEW ROUTE - show form to create new campground
router.get("/new", middleware.isLoggedIn, (req, res) => {
    res.render("campgrounds/new");
});

//CREATE ROUTE - add new campground to database
router.post("/", middleware.isLoggedIn, (req, res) => {
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    };
    let newCampground = {
        name: name,
        price: price,
        image: image,
        description: description,
        author: author
    };
    campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully added campground.");
            res.redirect("/campgrounds");
        }
    })
});

//SHOW ROUTE - shows info about one campground
router.get("/:id", (req, res) => {
    campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found.");
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
})

//EDIT ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, (req,res) => {
    campground.findById(req.params.id, (err, foundCampground) => {
        if(err || !foundCampground) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    });
});

//UPDATE ROUTE
router.put("/:id", middleware.checkCampgroundOwnership, (req,res) => {
    campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, updatedCampground) => {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully updated campground.");
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
});

//DESTROY ROUTE
router.delete("/:id", middleware.checkCampgroundOwnership, (req,res) => {
    campground.findByIdAndRemove(req.params.id, (err) => {
        if(err) {
            req.flash("error", "Something went wrong.");
            res.redirect("back");
        } else {
            req.flash("success", "Successfully deleted campground.");
            res.redirect("/campgrounds");
        }
    })
});

module.exports = router;