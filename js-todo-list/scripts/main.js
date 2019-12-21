let toDoList = [];

function listTodos() { //shows current list
    console.log("**********");
    toDoList.forEach(function (todo, i) {
        console.log(i + ": " + todo);
    });
    console.log("**********");
}

function newTodo() { //adds new todo to list
    let newToDo = prompt("Add a Todo item");
    toDoList.push(newToDo);
    console.log(newToDo + " added to list");
}

function deleteTodo() { //deletes todo from list
    let deleteIndex = prompt("Which index do you want to delete");
    let deleteName = toDoList.splice(deleteIndex, 1);
    console.log(deleteName + " removed from list");
}

window.setTimeout(function () { //allows the HTML instructions to load before the prompt
    let userAction = prompt("What would you like to do");
    while (userAction !== "quit") { //reprompts the user until "quit" is selected
        if (userAction === "list") { //calls listTodos function
            listTodos();
        } else if (userAction === "new") { //calls newTodo function
            newTodo();
        } else if (userAction === "delete") { //calls deleteTodo function
            deleteTodo();
        }
        userAction = prompt("What would you like to do");
    }
    console.log("OK, you quit the app.");
}, 500);
