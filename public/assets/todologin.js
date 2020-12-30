$(document).ready(function() {
    // $('form input').on('click', function() {
    //     console.log("xxxxx");

    //     var username = $('form input').val();
    //     if (username !== "") {
    //         document.getElementById('loginBtn').disabled = false;
    //     }

    // });

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