var $gameBoxDiv = $('#mazeContainer')
var $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone')
var $messageDisplayBox = $('#message')
var $finishBox = $('someHTMLEntityNotDecided')
var levelNumber = 1
var congratulationsMessage = '<p>Some html about congrats</p>'
var completedLevelMessage = '<p>Some html about completing level</p>'
var $startSafeZone = $('#startArea')
var lastLevel = 2
var genericError = "Sorry there is a problem, please try again later"
var attemptsCount

/**
 * loads next level, checks level number is valid
 * if first level also loads game visuals
 * Displays generic error is load fails
 * @param Integer levelNumber
 */
function loadLevel(levelNumber) {
    if (levelNumber > 0 && levelNumber <= lastLevel) {
        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.html', function (response, status) {
                if (status == "error") {
                    $messageDisplayBox.replaceWith(genericError)
                }
            })
        }
        $gameBoxDiv.load('templates/level' + levelNumber + '.php',
            function (response, status) {
                if (status == "error") {
                    $messageDisplayBox.replaceWith(genericError)
                }
                attemptsCount = 0
                resetClock()
            })
    } else {
        $messageDisplayBox.replaceWith('<p> Sorry, level does not exist. </p>')
    }
}
/**
 * starts a clock, add one to attempts counter, stops listening to click in start safe zone, listening for death event
 */
function startLevel() {
//Start Clock
    startClock()
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount)
    //disable start zone
    $startSafeZone.off('click')
    $('.die').on('death', function () {
        gameDeath()
    })
}

/**
 * animates display message box to a larger box,
 * currently only called on game complete
 */
function animateDisplayMessageBox($messageDisplay) {
    $messageDisplay.animate({
        opacity: "100",
        width: "600px",
        height: "400px",
        right: "0px",
        top: "0px"
    })
}
/**
 * stops clock, posts data to api, loads the next level or End of game message box
 */
function finishLevel() {
    //change message box to display level congrats
    $messageDisplayBox.replaceWith(completedLevelMessage)
    //stops the clock
    stopClock()
    //disable death
    $('.die').off('mouseover')
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        }, // put data here from ajax into endOfGame
        function (data) {
            if (data.success) {
                //success function
                levelNumber++
                if (levelNumber === lastLevel) {
                    $messageDisplayBox.replaceWith(congratulationsMessage).css({opacity: 0})
                    animateDisplayMessageBox($messageDisplayBox)
                }
                else {
                    loadLevel(levelNumber)
                }
            }
            else {
                $messageDisplayBox.replaceWith(genericError)
            }
        }
    )
}


$(function () {
    /**
     * triggered on death event
     * stops clock, doesn't reset
     * enables the safezone click event
     * replaces the message in the display box
     * disables the death event
     */

    $gameBoxDiv.on('death', function () {
        stopClock()
        $startSafeZone.on('click', function () {
            startLevel()
        })
        $messageDisplayBox.replaceWith("You have died! Please try again! Click the start area to start")
        $($gameBoxDiv).off('death')
    })

    //triggers start event
    $startSafeZone.click(function () {
        startLevel()
    })
    //triggers finish event
    $finishBox.mouseover(function () {
        finishLevel()
    })
    //triggers death event

    $('.die').mouseover(gameDeath)
    //enables the death eventg
    $gameBoxDiv.on('death', function () {
        gameDeath()
    })
})

