//Creates Vehicle constructor object model
function Vehicle(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.isRunning = false;
};

//Creates turnOn, turnOff, and honk methods for all Vehicle object models
Vehicle.prototype = {
    turnOn: ()=>{
        this.isRunning = true;
    },
    turnOff: ()=>{
        this.isRunning = false;
    },
    honk: ()=>{
        if(this.isRunning) {
            return console.log("BEEP!");
        } 
        else return console.log("BEEP! (It can still honk when it's not running... DUH!)");
    }
};

//Creates a new ford Vehicle object
var ford = new Vehicle("ford", "mustang", 1965);

//Tests the new ford Vehicle object's methods
ford.turnOn();
ford.honk()
ford.turnOff();
ford.honk();