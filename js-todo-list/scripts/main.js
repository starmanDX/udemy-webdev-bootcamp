let toDoList = [];
let userAction = prompt("What would you like to do");

window.setTimeout(function () {
    while (userAction !== "quit") {
        if (userAction === "list") {
            console.log(toDoList);
        } else if (userAction === "new") {
            let newToDo = prompt("Add a Todo item");
            toDoList.push(newToDo);

        }
        userAction = prompt("What would you like to do");
    }
    console.log("OK, You quit the app.");
}, 500);