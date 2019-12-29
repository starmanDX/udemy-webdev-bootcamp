const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

app.get("/", function(req, res) {
  res.send("Hi there!");
});

app.get("/bye", function(req, res) {
  res.send("Goodbye!");
});

app.get("/dog", function(req, res) {
  res.send("WOOF!");
  console.log("SOMEONE MADE A REQUEST TO /DOG")
});