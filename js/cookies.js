/**
 * set a christamsGame cookie
 * @param String userName    name inputted by the user
 * @param String userEmail   email inputted by the user
 */
function setChristmasGameCookie(userName, userEmail) {
    var d = new Date()
    d.setTime(d.getTime() + (365*24*60*60*1000))
    var expires = "expires="+d.toUTCString()
    document.cookie = "christmasGameUser=" + userName + "," + userEmail + ";" + expires
}

/**
 * get a cookie with a christmasGameUser name
 * @returns mixed array with user's name and email values
 */
function getChristmasGameCookie() {
    var cookies = document.cookie.split(';')
    var result = false
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split('=')
        if (cookie[0] == "christmasGameUser" || cookie[0] == " christmasGameUser") {
            var user = cookie[1].split(',')
            if (
                user.length == 2 &&
                validateName(user[0]) &&
                validateEmail(user[1])
            ) {
                result = user
            }
        }
    }
    return result
}