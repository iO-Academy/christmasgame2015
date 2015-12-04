/**
 * Created by peterwilkins on 04/12/2015.
 */

$(function () {

    $('#target').submit(function (e) {
        e.preventDefault();

        if (!$('#userName').val()) {
            $("#err1").alert('close');
            $('#userName').after(
                '<div class="alert alert-danger alert-dismissable err" id="err1">' +
                '<button type="button" class="close" ' +
                'data-dismiss="alert" aria-hidden="true">' +
                '&times;' +
                '</button>' +
                'Required field' +
                '</div>');
            $('#err1').slideDown('slow');
            console.log('field1 is empty');
        }
        else {
            $("#err1").slideUp('close');
        }
        var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (!testEmail.test($('#email').val())) {
            $("#err2").alert('close');
            $('#email').after(
                '<div class="alert alert-danger alert-dismissable err" id="err3">' +
                '<button type="button" class="close" ' +
                'data-dismiss="alert" aria-hidden="true">' +
                '&times;' +
                '</button>' +
                'Valid email required' +
                '</div>');
            $('#err2').slideDown('slow');
            console.log('email is invalid');
        }
        else {
            $("#err2").slideUp('close');
        }
    });

})
