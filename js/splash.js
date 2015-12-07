$(function () {

    var cookieValues = getChristmasGameCookie()
    if (cookieValues){
        $('#form').prepend("<p id='welcomeBack'>Welcome back!</p>")
        $('#userName').val(cookieValues[0])
        $('#userEmail').val(cookieValues[1])
    }

    $('form').submit(function (e) {
        e.preventDefault();
        userName = $('#userName').val()
        userEmail = $('#userEmail').val()
        $('.err').remove()
        if (userName.length == 0) {
            $('#userName').after(
                '<div class="err" id="err1">' +
                'Required field' +
                '</div>');
            $('#err1').slideDown('slow');
        }


        if (userName.length > 100) {
            $('#userName').after(
                '<div class="err" id="err3">' +
                'Max length is 100' +
                '</div>');
            $('#err3').slideDown('slow');
        }

        if (!validateEmail(userEmail)) {
            $('#userEmail').after(
                '<div class="err" id="err2">' +
                'Valid email required' +
                '</div>');
            $('#err2').slideDown('slow');
        }
        else {
            $("#err2").slideUp('slow');
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
