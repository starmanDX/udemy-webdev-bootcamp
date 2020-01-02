const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}));

var campgrounds = [{
    name: "Salmon Creek",
    image: "https://live.staticflickr.com/2512/5733464781_8787e851b0_b.jpg"
},
{
    name: "Granite Hill",
    image: "https://www.nps.gov/drto/planyourvisit/images/960pxCampsites.jpg"
},
{
    name: "Mountain Goat's Rest",
    image: "https://cdn.pixabay.com/photo/2017/05/05/16/06/teepees-2287571_960_720.jpg"
},
{
    name: "Salmon Creek",
    image: "https://live.staticflickr.com/2512/5733464781_8787e851b0_b.jpg"
},
{
    name: "Granite Hill",
    image: "https://www.nps.gov/drto/planyourvisit/images/960pxCampsites.jpg"
},
{
    name: "Mountain Goat's Rest",
    image: "https://cdn.pixabay.com/photo/2017/05/05/16/06/teepees-2287571_960_720.jpg"
},
{
    name: "Salmon Creek",
    image: "https://live.staticflickr.com/2512/5733464781_8787e851b0_b.jpg"
},
{
    name: "Granite Hill",
    image: "https://www.nps.gov/drto/planyourvisit/images/960pxCampsites.jpg"
},
{
    name: "Mountain Goat's Rest",
    image: "https://cdn.pixabay.com/photo/2017/05/05/16/06/teepees-2287571_960_720.jpg"
}
]

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    res.render("campgrounds", {
        campgrounds: campgrounds
    });
});

app.post("/campgrounds", (req, res) => {
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name:name, image:image};
    campgrounds.push(newCampground)
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new", (req, res) => {
    res.render("new")
});

app.listen(port, hostname, () => {
    console.log(`Server now running at http://${hostname}:${port}`)
});