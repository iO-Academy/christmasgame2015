var $gameBoxDiv = $('#mazeContainer')
var $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone')
var $messageDisplayBox = $('someHTMLEntityIDNotDecidedForMessage')
var attemptsCount
var $finishBox = $('someHTMLEntityNotDecided')
var levelNumber = 1
var congratulationsMessage = $('<p>Some html shit about congrats</p>')
var $startSafeZone = $('#startArea')
var gameover = 2
var genericError = "error, error"

/**
 * ajax request for next level
 *
 * @param levelNumber
 */
function loadLevel(levelNumber) {
    $('#game').load('templates/level' + levelNumber + '.php',
        function() {
            attemptsCount = 0
            resetClock()
        })
}


function startGame() {
//Start Clock
    startClock();
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount)
    //disable start zone
    $startSafeZone.off('click')

    $('.die').on('death')
}
function finishGame() {
//todo remove post test
    alert("You have completed level 'levelNumber'")
    //change message box to display level congrats
    $messageDisplayBox.replaceWith("'congratulationsMessage'")
    //stops the clock
    stopClock();
    //disable death
    $('.die').off('mouseover')
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        }, // put data here from ajax into endOfGame
        function (data) {
            //success function
            levelNumber++
            if (levelNumber === gameover) {
                $messageDisplayBox.replaceWith('#endOfGame').css({opacity: 0})
                $messageDisplayBox.animate({
                    opacity: "100",
                    width: "600px",
                    height: "400px",
                    right: "0px",
                    top: "0px"
                })
            }
            else {
                loadLevel(levelNumber);
            }
        }
    ).fail(function () {
        $('#game').replaceWith(genericError);
    })
}
function gameDeath() {
    stopClock()
    $startSafeZone.on('click')
    $messageDisplayBox.replaceWith("You have died! Please try again! Click the start area to start")
    $('.die').off('death')
}
$(function () {

    $startSafeZone.click(startGame())

    $finishBox.mouseover(finishGame())
    //triggers death event
    $('.die').mouseover(function () {
        $gameBoxDiv.trigger('death')
    })
    //triggers complete event
    $finishSafeZone.mouseover(function () {
        $gameBoxDiv.trigger('completedLevel')
    })

    $('.die').mouseover(function() {
        $gameBoxDiv.trigger('death')
    })

    $gameBoxDiv.on('death', function () {
        gameDeath()
})

