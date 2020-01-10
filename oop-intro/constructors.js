//Creates Dog constructor
function Dog(name, age) {
    this.name = name;
    this.age = age;
    //Creates a function for the Dog model which calls its name value back
    this.bark = function() { 
        console.log(this.name + " just barked!")
    }
}

//Creates new rusty/fido objects from the Dog constructor model
var rusty = new Dog('Rusty', 3);
var fido = new Dog("Fido", 1);

//Displays the Dog model constructed for the provided rusty/fido params
console.log(rusty);
console.log(fido);

//Calls the bark function within the obj, displaying "Rusty/Fido just barked!"
rusty.bark()
fido.bark()