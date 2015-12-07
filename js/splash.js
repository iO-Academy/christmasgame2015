/**
 * Created by peterwilkins on 04/12/2015.
 */

$(function () {

    var cookieValues = getChristmasGameCookie()
    if (cookieValues){
        var firstName = ""
        if(cookieValues[0].length < 13) {
           firstName = cookieValues[0]
        }
        $('#form').prepend("<p id='welcomeBack'>Welcome back " + firstName + "!</p>")
        $('#userName').val(cookieValues[0])
        $('#userEmail').val(cookieValues[1])
    }

    $('form').submit(function (e) {
        e.preventDefault();
        userName = $('#userName').val()
        userEmail = $('#userEmail').val()
        $('#err2, #err1, #err3').remove()
        if (userName.length == 0) {
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

        if (userName.length > 100) {
            $('#userName').after(
                '<div class="err" id="err3">' +
                'Max length is 100' +
                '</div>');
            $('#err3').slideDown('slow');
            console.log('field1 is empty');
        }
        else {
            $("#err3").slideUp('slow');
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
