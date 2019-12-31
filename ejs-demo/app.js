const express = require("express");
const app = express()
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res) {
    res.render("index")
});

app.get("/fallinlovewith/:thing", function(req, res) {
    let thing = req.params.thing;
    res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res) {
    var posts = [
        {title: "Post 1", author: "Suzy"},
        {title: "My adorable pet bunny", author: "Charlie"},
        {title: "Can you believe this pomsky?", author: "Me"}
    ];
    res.render("posts", {posts: posts});
});

app.listen(port, hostname, function() {
    console.log(`Server running at http://${hostname}:${port}/`);
})