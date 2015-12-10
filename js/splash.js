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
    var preloads = '<div id="loadingImage"><img src="img/ajax-loader.gif"></div><div id="preloaded-images"><img src="img/level_bg.png" width="1" height="1"><img src="img/cursor.gif" width="1" height="1"><img src="img/present_1_single.png" width="1" height="1"> <img src="img/presents_1_gap.png" width="1" height="1"><img src="img/presents_2_bottom.png" width="1" height="1"><img src="img/presents_2_middle.png" width="1" height="1"><img src="img/presents_2_top.png" width="1" height="1"><img src="img/logo_1.png" width="1" height="1"><img src="img/logo_2.png" width="1" height="1"><img src="img/right-border.png" width="1" height="1"><img src="img/tree.png" width="1" height="1"><img src="img/cursor.gif" width="1" height="1"><img src="img/ajax-loader.gif"></div>'
    $("body").append(preloads);
    $("#preloaded-images>img").load($(this).attr('src'))
})
