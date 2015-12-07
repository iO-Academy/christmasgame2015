/**
 * Created by peterwilkins on 04/12/2015.
 */

$(function () {

    $('form').submit(function (e) {
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
            $("#err2").slideUp('slow');
            console.log('I\'m here!')
            $.post('api/index.php', {
                'action': 'createUser',
                'userName': $('#userName').val(),
                'userEmail': $('#userEmail').val()
            }, function (data, dataObj) {
                console.log(data);
                console.log('hiya');
            });
        }

        return false;
    });



})
