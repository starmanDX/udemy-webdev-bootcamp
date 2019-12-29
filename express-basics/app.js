const express = require('express');
const app = express();
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;

app.get("/", function(req, res) {
  res.send("Hi there, welcome to my assignment!");
});

app.get("/speak/:animal", function(req, res) {
  var sounds = {
    pig: "Oink",
    cow: "Moo",
    dog: "Woof Woof!",
    cat: "I hate you human",
    goldfish: "..."
}
var animal = req.params.animal.toLowerCase();
var sound = sounds[animal];
if(!sound) {
    res.send("That animal doesn't exist in our database, sorry."); 
} else {
    res.send("The " + animal + " says '" + sound + "'"); 
}
});

app.get("/repeat/:phrase/:multiplier", function(req, res) {
  let phraseToRepeat = req.params.phrase + " ";
  let phraseMult = Number(req.params.multiplier)
  res.send(phraseToRepeat.repeat(phraseMult));
});

app.get("*", function(req, res) {
  res.send("Sorry, page not found.");
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});