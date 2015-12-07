function validateEmail(userEmail) {
    var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if (!testEmail.test(userEmail)) {
        return false
    }
    return true
}

function validateName(userName) {
    var testName = /[A-z\.\s\-]/
    if (!testName.test(userName)) {
        return false
    }
    return true
}

function validate(userName, userEmail) {
    var result = true
    $('.err').remove()
    if (userName.length == 0) {
        $('#userName').after(
            '<div class="err" id="err1">' +
            'Required field' +
            '</div>');
        $('#err1').slideDown('slow');
        result = false
    }

    if (userName.length > 100) {
        $('#userName').after(
            '<div class="err" id="err3">' +
            'Max length is 100' +
            '</div>');
        $('#err3').slideDown('slow');
        result = false
    }
    if(userName.length > 0 && !validateName(userName)) {
        $('#userName').after(
            '<div class="err" id="err4">' +
            'Letters, fullstops and _ only' +
            '</div>');
        $('#err4').slideDown('slow');
        result = false
    }

    if (!validateEmail(userEmail)) {
        $('#userEmail').after(
            '<div class="err" id="err2">' +
            'Valid email required' +
            '</div>');
        $('#err2').slideDown('slow');
        result = false
    }

    return result
}