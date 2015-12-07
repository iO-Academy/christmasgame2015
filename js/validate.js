/**
 * validates the users email address using regex
 * @param   String  userEmail    email address provided by user
 * @returns bool                 true if valid email address
 */
function validateEmail(userEmail) {
    var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if (!testEmail.test(userEmail)) {
        return false
    }
    return true
}

/**
 * validates the users name input
 * @param   string userName    name provided by the user
 * @returns bool               true if valid name
 */
function validateName(userName) {
    var testName = /^[a-zA-Z\.\'\s\-]+$/;
    if (!testName.test(userName)) {
        return false
    }
    return true
}

/**
 * validates registration form
 * @param userName     name provided by the user
 * @param userEmail    email address provided by user
 * @returns bool       false if userName's length is 0 or greater than 100, or if validateName/validateEmail fail.
 */
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
    if (userName.length > 0 && !validateName(userName)) {
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