/**
 * Created by peterwilkins on 04/12/2015.
 */

$(function () {

    var cookieValues = getChristmasGameCookie()
    if (cookieValues){
        $('#form').prepend("Welcome back!")
        $('#userName').val(cookieValues[0])
        $('#userEmail').val(cookieValues[1])
    }

    $('form').submit(function (e) {
        e.preventDefault();
        userName = $('#userName').val()
        userEmail = $('#userEmail').val()
        if (!userName) {
            $('#userName').after(
                '<div class="err" id="err1">' +
                'Required field' +
                '</div>');
            $('#err1').slideDown('slow');
            console.log('field1 is empty');
        }
        else {
            $("#err1").slideUp('slow');
        }
        // to be fixed by Pete
        var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (!testEmail.test(userEmail)) {
            $('#userEmail').after(
                '<div class="err" id="err2">' +
                'Valid email required' +
                '</div>');
            $('#err2').slideDown('slow');
            console.log('email is invalid');
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
