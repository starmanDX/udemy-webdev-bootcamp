function init() {
    function completeTodo() {
        $("ul").on("click", "li", function () {
            $(this).toggleClass("completed")
        });
    }
    completeTodo();

    function deleteTodo() {
        $("ul").on("click", "li span", function (e) {
            $(this).parent().fadeOut(500, function () {
                $(this).remove();
            });
            e.stopPropagation();
        });
    }
    deleteTodo();

    function addTodo() {
        $("input").on("keypress", function (e) {
            if (e.which === 13) {
                $("ul").append('<li><span><i class="far fa-trash-alt"></i></span> ' + $(this).val() + '</li>');
                $(this).val("");
            };
        });
    }
    addTodo();

    function toggleInput() {
        $(".fas").on("click", function () {
            $("input").fadeToggle();
            $(this).toggleClass("fa-plus")
            $(this).toggleClass("fa-minus")
        });
    }
    toggleInput();
}

init();
