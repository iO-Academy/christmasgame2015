$(function () {

    var cookieValues = getChristmasGameCookie()
    if (cookieValues) {
        $('#form').prepend("<p id='welcomeBack'>Welcome back!</p>")
        $('#userName').val(cookieValues[0])
        $('#userEmail').val(cookieValues[1])
    }

    $('form').submit(function (e) {
        e.preventDefault();
        var userName = $('#userName').val()
        var userEmail = $('#userEmail').val()

        if(validate(userName, userEmail)) {
            $.post('api/index.php', {
                'action': 'createUser',
                'userName': userName,
                'userEmail': userEmail
            }, function () {
                // if Success then set cookie and load first level
                setChristmasGameCookie(userName, userEmail);
                LoadLevel(1);
            }).fail(function(){
                $messageDisplayBox.replaceWith(“error : there appears  to be a problem!");
            });
        }
        return false;
    });
})
