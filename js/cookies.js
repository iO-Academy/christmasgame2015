/**
 * set a christamsGame cookie
 * @param userName
 * @param userEmail
 */
function setChristmasGameCookie(userName, userEmail) {
    var d = new Date()
    d.setTime(d.getTime() + (365*24*60*60*1000))
    var expires = "expires="+d.toUTCString()
    document.cookie = "christmasGameUser=" + userName + "," + userEmail + ";" + expires
}

/**
 * get a cookie with a christmasGameUser name
 * @returns mixed
 */
function getChristmasGameCookie() {
    var cookie = document.cookie.split(';')
    var cookieName = cookie[0].split('=')
    if (cookieName[0] == "christmasGameUser") {
        var user = cookieName[1].split(',')
        if (
            user.length == 2 &&
            validateName(user[0]) &&
            validateEmail(user[1])
        ) {
            return user
        }

    }
    return false
}