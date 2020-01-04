const express   = require("express"),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    campground  = require("./models/campground"),
    comment     = require("./models/comment"),
    seedDB      = require("./seeds"),
    app         = express(),
    hostname    = "127.0.0.1",
    port        = process.env.PORT || 3000;

mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("mongodb://localhost:27017/yelp_camp_v3")
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({
    extended: true
}));
seedDB();
app.get("/", (req, res) => {
    res.render("landing");
});
// INDEX ROUTE - show all campgrounds
app.get("/campgrounds", (req, res) => {
    campground.find({},(err, allCampgrounds) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: allCampgrounds})
        }
    })
});
//NEW ROUTE - show form to create new campground
app.get("/campgrounds/new", (req, res) => {
    res.render("campgrounds/new")
});
//CREATE ROUTE - add new campground to database
app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampground = {
        name: name,
        image: image,
        description: description
    };
    campground.create(newCampground, (err, newlyCreated) => {
        if(err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds")
        }
    })
});
//SHOW ROUTE - shows info about one campground
app.get("/campgrounds/:id", (req,res) => {
    campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if(err){
            console.log(err);
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
})

//COMMENTS ROUTES
app.get("/campgrounds/:id/comments/new",(req,res) => {
    campground.findById(req.params.id, (err, campground) => {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    })
});

app.post("/campgrounds/:id/comments", (req,res) => {
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
})

app.listen(port, hostname, () => {
    console.log(`Server now running at http://${hostname}:${port}`)
});