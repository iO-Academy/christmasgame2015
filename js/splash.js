$(function () {

    $("#splashbackground").each(function () {
        console.log('fish')
        var randomTopPosition = Math.floor(Math.random() * 100).toString();
        var randomLeftPosition = Math.floor(Math.random() * 100).toString();
        for (var i = 0; i < 3; i++) {
            snow = document.createElement('snow');
            snow.setAttribute('style', 'width:29px; height:29px; top:' + randomTopPosition + '; left:' + randomLeftPosition + '; z-index: 999;');
            wrapper = document.getElementById('splashbackground');
            wrapper.appendChild(snow);
        }
    });

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

        if (validate(userName, userEmail)) {
            $.post('api/index.php', {
                'action': 'createUser',
                'userName': userName,
                'userEmail': userEmail
            }, function (data) {
                // if Success then set cookie and load first level
                if ('success' in data && data.success) {
                    setChristmasGameCookie(userName, userEmail);
                    loadLevel(1);
                } else {
                    $('#form').after("<div id='connectionError'>Error: Please refresh the page and try again.</div>");
                }

            }).fail(function () {
                $messageDisplayBox.replaceWith("Error: There appears to be a problem!");
            });
        }
    });
})
