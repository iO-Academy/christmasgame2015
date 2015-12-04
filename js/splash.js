/**
 * Created by peterwilkins on 04/12/2015.
 */

$(function () {

    $('#target').submit(function (e) {
        e.preventDefault();

        var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
        if (!testEmail.test($('#email').val())) {
            $("#err3").alert('close');
            $('#email').after(
                '<div class="alert alert-danger alert-dismissable err" id="err3">' +
                '<button type="button" class="close" ' +
                'data-dismiss="alert" aria-hidden="true">' +
                '&times;' +
                '</button>' +
                'Valid email required' +
                '</div>');
            $('#err7').slideDown('slow');
            console.log('email is invalid');
        }
        else {
            $("#err3").slideUp('close');
        });
    }
}