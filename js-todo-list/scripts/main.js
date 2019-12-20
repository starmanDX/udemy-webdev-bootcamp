let toDoList = [];

window.setTimeout(function () {  //allows the HTML to load before the prompt
    let userAction = prompt("What would you like to do");
    while (userAction !== "quit") { //reprompts the user until "quit" is selected
        if (userAction === "list") { //shows the toDoList array
            console.log(toDoList);
        } else if (userAction === "new") { //asks user for new todo item, and adds it to the toDoList array
            let newToDo = prompt("Add a Todo item");
            toDoList.push(newToDo);

        }
        userAction = prompt("What would you like to do");
    }
    console.log("OK, You quit the app.");
}, 500);
