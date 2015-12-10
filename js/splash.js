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
            }, function (data) {
                if ('success' in data && data.success) {
                    // if Success then set cookie and load first level
                    setChristmasGameCookie(userName, userEmail);
                    $('#game').addClass('level1')
                    loadLevel(1);
                } else {
                    $('#form').after("<div id='connectionError'>Error: Please refresh the page and try again.</div>");
                }
            }).fail(function(){
                $messageDisplayBox.replaceWith("Error: There appears to be a problem!");
            });
        }
    });
})
