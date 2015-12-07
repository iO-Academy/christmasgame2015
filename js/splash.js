/**
 * Created by peterwilkins on 04/12/2015.
 */

$(function () {

    $('#submit').submit(function (e) {
        e.preventDefault();
        if (!$('#userName').val()) {
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
        var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (!testEmail.test($('#email').val())) {
            $('#userEmail').after(
                '<div class="err" id="err2">' +
                'Valid email required' +
                '</div>');
            $('#err2').slideDown('slow');
            console.log('email is invalid');
        }
        else {
            $("#err2").slideUp('slow');
            $.post('../api/index.php', {
                action: 'createUser',
                userName: $('#userName').val(),
                userEmail: $('#userEmail').val()
            }, function (data) {
                console.log(data);
            });
        }


        return false;
    });

})
