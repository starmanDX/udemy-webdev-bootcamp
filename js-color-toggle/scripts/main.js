/* My method - 
let buttonClick = document.querySelector("button");
buttonClick.addEventListener("click", function() {
    if (document.body.style.backgroundColor !== "purple") {
    document.body.style.backgroundColor = "purple";
    } else {
        document.body.style.backgroundColor = "white"
    }
});*/

let buttonClick = document.querySelector("button");
buttonClick.addEventListener("click", function() {
    document.body.classList.toggle("purple");
});