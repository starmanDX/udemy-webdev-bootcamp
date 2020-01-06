const express   = require("express"),
    campground  = require("../models/campground"),
    router      = express.Router({
        mergeParams: true
    });

// INDEX ROUTE - show all campgrounds
router.get("/", (req, res) => {
    campground.find({}, (err, allCampgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {
                campgrounds: allCampgrounds,
                currentUser: req.user
            });
        }
    })
});

//NEW ROUTE - show form to create new campground
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

//CREATE ROUTE - add new campground to database
router.post("/", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name,
        image: image,
        description: description
    };
    campground.create(newCampground, (err, newlyCreated) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});

//SHOW ROUTE - shows info about one campground
router.get("/:id", (req, res) => {
    campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/show", {
                campground: foundCampground
            });
        }
    });
})

module.exports = router;