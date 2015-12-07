function setChristmasGameCookie(userName, userEmail) {
    var d = new Date()
    d.setTime(d.getTime() + (365*24*60*60*1000))
    var expires = "expires="+d.toUTCString()
    document.cookie = "christmasGameUser=" + userName + "," + userEmail + ";" + expires
}

function getChristmasGameCookie() {
    var cookie = document.cookie.split(';')
    var cookieName = cookie[0].split('=')
    if (cookieName[0] == "christmasGameUser") {
        var user = cookieName[1].split(',')
        return user
    }
    return false
}