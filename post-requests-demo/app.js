const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;
let friends = ["Tony", "Miranda", "Justin", "Pierre", "Lily"];

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("home");
});

app.post("/addfriend", function(req,res) {
    let newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

app.get("/friends", function(req,res) {
    res.render("friends", {friends: friends});
});

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
});