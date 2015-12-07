function validateEmail(userEmail) {
    var testEmail = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/igm;
    if (!testEmail.test(userEmail)) {
        return false
    }
    return true
}

function validateName(userName) {
    var testName = /[a-zA-Z\.\s\-]/
    if (!testName.test(userName)) {
        return false
    }
    return true
}