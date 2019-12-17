var age = prompt("How old are you?")

if(age < 18) {
    alert("Sorry, you are not old enough to enter the venue");
}
else if(age < 21) {
    alert("You can enter, but cannot drink");
}
else {
    alert("You can enter and drink")
}