$(function () {

    var cookieValues = getChristmasGameCookie()
    if (cookieValues){
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
                'userEmail': userEmail,
            }, function () {
                setChristmasGameCookie(userName, userEmail);
            });
        }

        return false;
    });



})
