function init() {
    function completeTodo() {
        $("ul").on("click", "li", function () {
            $(this).toggleClass("completed")
        });
    }
    completeTodo();

    function deleteTodo() {
        $("ul").on("click", ".fa-trash-alt", function (e) {
            e.stopPropagation();
            alert("clicked x")
            //$(this).parent().remove()
        });
    }
    deleteTodo();

    function showTrash() {
        $("li").on("mouseenter", function () {
            $(this).children(".fa-trash-alt").animate({
                width: "toggle"
            })
        })
    }
    showTrash();

    function hideTrash() {
        $("li").on("mouseleave", function () {
            $(this).children(".fa-trash-alt").animate({
                width: "toggle"
            })
        })
    }
    hideTrash();

    function addTodo() {
        $("input").on("keypress", function (e) {
            if (e.which == 13) {
                $("ul").append('<li><i class="fas fa-trash-alt"></i> ' + $(this).val() + '</li>');
            };
        });
    }
    addTodo();  
}

init();

