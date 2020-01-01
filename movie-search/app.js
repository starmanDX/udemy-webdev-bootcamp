const express = require('express');
const app = express();
const request = require('request');
const hostname = "127.0.0.1";
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("search");
})

app.get("/results", (req,res) => {
    let query = req.query.search;
    let url = `http://omdbapi.com/?s=${query}&apikey=thewdb`;
    request(url, (error, response, body) => {
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        } else {
            res.send(error)
        }
    })
});

app.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
});