$(document).ready(function() {
    $('form').on('submit', function() {

        var item = $('form input');
        if (item.val().trim() != "") {
            var todo = { username: item.val().trim() };

            $.ajax({
                type: 'POST',
                url: '/',
                data: todo,
                success: function(data) {
                    window.location = "/todo";
                }
            });
        }

        return false;

    });
});