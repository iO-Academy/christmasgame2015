//todo create events for popout expand instructions, and a close method
//Start Clock
var $gameDiv
var $gameBoxDiv
var $messageDisplayBox
var $finishBox
var levelNumber = 1
var completedLevelMessage = '<div class="message"><h4>You did it!</h4><h5>Click the Start area to continue playing.</h5><div class="button"><input type="button" value="Quit Game" class="messageButton" onclick="quitGame()"></div></div>'
var $startSafeZone
var lastLevel = 2
var genericError = '<div class="message"><h4>Oops!</h4><h5>Please try reloading the page</h5><div class="button"><input type="button" value="Quit Game" class="messageButton" onclick="quitGame()"></div></div>'
var attemptsCount = 0
var smallInstructions = '<div class="message"><h4>To see the Instructions</h4><h5>Click the Open button</h5><div class="button">' +
    '<input type="button" value="Open" class="messageButton" onclick="bigInstruct()"></div></div>'
var bigInstructions = '<div class="message bigMessage"><div class="messageContent"><h2>Instructions</h2>' +
    '<h3>Follow the path with your mouse cursor to make it to the safe zone.</h3>' +
    '<h3>Try to complete it as fast as possible with as few attempts as possible.</h3>' +
    '<h3>Hide the instructions and click Start to begin.</h3><div class="button"><input type="button" value="Hide Instructions" onclick="smallInstruct()" class="messageButton"> </div></div></div>'
/**
 * loads next level, checks level number is valid
 * if first level also loads game visuals
 * Displays generic error is load fails
 * @param number levelNumber
 */
function loadLevel(levelNumber) {
    if (levelNumber > 0 && levelNumber <= lastLevel) {
        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.php', function(response, status) {
                $messageDisplayBox = $('#message')
                if (status == "error") {
                    console.log(status)
                    $messageDisplayBox.html(genericError)
                }
                $messageDisplayBox.html(smallInstructions)
            })
        } else {
            $gameBoxDiv.load('templates/level' + levelNumber + '.php',
                function(response, status) {
                    if (status == "error") {
                        $messageDisplayBox.html(genericError)
                    }
                    $messageDisplayBox.html(smallInstructions)
                    attemptsCount = 0
                    resetClock()
                })
        }

    } else {
        window.location.href = ""
    }
}
/**
 * starts a clock, add one to attempts counter, stops listening to click in start safe zone, listening for death event
 */
function startLevel() {
    startClock()
    // adds the small instructions
    $messageDisplayBox.html(smallInstructions)
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount)
    //disable start zone
    $startSafeZone.off('click')
    $('.die').on('death', function() {
        gameDeath()
    })
}

/**
 * stops clock, posts data to api, loads the next level or End of game message box
 */
function finishLevel() {
    //change message box to display level congrats (for more than one level)
    //$messageDisplayBox.html(completedLevelMessage)
    //stops the clock
    stopClock()
    //disable death
    $('.die').off('death')
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        }, // put data here from ajax into endOfGame
        function(data) {

            if ('success' in data && data.success) {
                //success function
                levelNumber++
                if (levelNumber === lastLevel) {
                    $('#message').html('<div class="message bigMessage">' +
                        '<div class="messageContent"><h2>Congratulations!</h2> <h3>You finished the game!</h3>' +
                        '<h3>You completed it in a time of: ' + seconds2time(ticks) + '</h3>' +
                        '<h3>It took you a total of ' + attemptsCount + ' attempts!</h3>' +
                        '<h3>Your results have been submitted, to play again click Restart!</h3>' +
                        '<div class="buttonBigMessage">' +
                        '<input type="button" value="Restart" class="messageButton" onclick="loadLevel(1)"> ' +
                        '<input type="button" value="Quit Game" class="messageButton" onclick="quitGame()"> </div></div>' +
                        '</div>').animate({
                            width: "690px",
                            height: "360px"
                        },
                        function() {
                            $('.messageContent').fadeIn(500)
                        })
                } else {
                    loadLevel(levelNumber)
                }
            }
            else {
                $messageDisplayBox.html(genericError)
            }
        }
    ).fail(function() {
            $messageDisplayBox.html(genericError)
        })
}
/**
 * stop the clock, enable start button, displays message
 */
function gameDeath() {
    $messageDisplayBox = $('#message')
    stopClock();
    $startSafeZone.on('click', startLevel);
    $messageDisplayBox.html('<div class="message"><h4>Uh-oh, you touched the sides!</h4>' +
        '<h5>Click start to try again</h5><div class="button"><input type="button" value="Quit Game" class="messageButton" onclick="quitGame()"></div></div>')
    $gameBoxDiv.off('death')
}
$(function() {
    $gameDiv = $('#game')
    $gameBoxDiv = $('#mazeContainer')
    $startSafeZone = $('#startArea')
    $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone')
    $finishBox = $('someHTMLEntityNotDecided')
     /**
     * triggered on death event
     * stops clock, doesn't reset
     * enables the safezone click event
     * replaces the message in the display box
     * disables the death event
     */
    $gameBoxDiv.on('death', function() {
        stopClock()
        $startSafeZone.on('click', function() {
            startLevel()
        })
        $messageDisplayBox.html("You have died! Please try again! Click the start area to start")
        $gameBoxDiv.off('death')
    })

    //triggers start event
    $startSafeZone.click(function() {
        startLevel()
    })
    //triggers finish event
    $finishBox.mouseover(function() {
        finishLevel()
    })

    //enables the death event
    $gameBoxDiv.on('death', function() {
        gameDeath()
    })

})

function bigInstruct() {
    $('#message').html(bigInstructions).animate({
            width: "690px",
            height: "360px"
        },
        function() {
            $('.messageContent').fadeIn(500)
        })
}

function smallInstruct() {

    $('.messageContent').fadeOut(500, function() {
        $('#message').html(bigInstructions).animate({
                width: "215px",
                height: "160px"
            },
            function() {
                $('#message').html(smallInstructions)
            })
    })

}
function quitGame() {
    window.location.reload(false)
}

