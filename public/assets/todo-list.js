$(document).ready(function() {

    $('form').on('submit', function() {

        var item = $('form input');
        var dt = new Date();
        var time = dt.toLocaleString();

        if (item.val().trim() != "") {
            var todo = { item: item.val().trim(), createdTime: time };

            $.ajax({
                type: 'POST',
                url: '/todo',
                data: todo,
                success: function(data) {
                    location.reload();
                }
            });
        }

        return false;

    });

    $('li p').on('click', function() {
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
            type: 'DELETE',
            url: '/todo/' + item,
            success: function(data) {
                location.reload();
            }
        });
    });

});