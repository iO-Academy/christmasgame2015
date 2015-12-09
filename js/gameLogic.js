//todo create events for popout expand instructions, and a close method
//Start Clock
var $gameDiv
var $gameBoxDiv
var $messageDisplayBox
var $finishBox
var levelNumber = 1
var completedLevelMessage = "<div id='success' class='popUp'><span class='messageTitle'>You did it!</span><br><br><br><span class='subtitle'>Click the 'Start' area to continue playing.</span><br><div class='buttons'><input type='button' class='quit' value='Quit' class='quit popBut'></div></div>"
var $startSafeZone
var lastLevel = 2
var genericError = "Sorry there is a problem, please try reloading the page"
var attemptsCount = 0

var smallInstructions = "<div id='smallInstructions' class='popUp instructions'><br><br><br><br><span class='messageTitle'>Instructions</span><br><br><div class='buttons'><input type='button' value='Open' class='expand popBut'></div></div>"
/**
 * loads next level, checks level number is valid
 * if first level also loads game visuals
 * Displays generic error is load fails
 * @param number levelNumber
 */
function loadLevel(levelNumber) {

    if (levelNumber > 0 && levelNumber <= lastLevel) {

        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.php', function (response, status) {
                $messageDisplayBox = $('#message')
                if (status == "error") {
                    console.log(status)
                    $messageDisplayBox.html(genericError)
                }
                $messageDisplayBox.html(smallInstructions)
            })
        } else {
            $gameBoxDiv.load('templates/level' + levelNumber + '.php',
                function (response, status) {
                    if (status == "error") {
                        $messageDisplayBox.html(genericError)
                    }
                    $messageDisplayBox.html(smallInstructions)
                    attemptsCount = 0
                    resetClock()
                })
        }

    } else {
        window.reload()
    }
}
/**
 * starts a clock, add one to attempts counter, stops listening to click in start safe zone, listening for death event
 */
function startLevel() {
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
 * stops clock, posts data to api, loads the next level or End of game message box
 */
function finishLevel() {
    //change message box to display level congrats (for more than one level)
    //$messageDisplayBox.html(completedLevelMessage)
    //stops the clock
    $messageDisplayBox.html('<div id="endOfGame" class="message bigMessage"> <h2>Congratulations!!</h2> <h3>You finished the game!</h3> <h3>You completed it in a time of: <!-- --></h3> <h3>It took you a total of <!-- --> attempts!</h3> <h3>Your results have been submitted, to play again click Restart!</h3> <input type="button" value="Restart" class="loadLevel messageButton"> <input type="button" value="Quit Game" class="quit messageButton"></div>')
    stopClock()
    //disable death
    $('.die').off('death')
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        }, // put data here from ajax into endOfGame
        function (data) {

            if ('success' in data && data.success) {
                //success function
                levelNumber++
                if (levelNumber === lastLevel) {
                    $messageDisplayBox.html("<div id='endOfGame' class='popBig'><span class='bigTitle'>Congratulations!!</span><br><br><span class='bigSubtitle'>You finished the game!</span><br><br><div>Your time: " + seconds2time(ticks) + "</div><div>Number of attempts: " + attemptsCount + "</div></div><br><br>Your results have been submitted, to play again click 'Restart'!<div class='buttons'><input type='button' value='Restart' class='loadLevel popBut'><input type='button' class='quit' value='Quit' class='quit popBut'></div></div>")
                }
                else {
                    loadLevel(levelNumber)
                }
            }
            else {
                $messageDisplayBox.html(genericError)
            }
        }
    ).fail(function () {
        $messageDisplayBox.html(genericError)
    })
}
/**
 * stop the clock, enable start button, displays message, todo turns off death
 */
function gameDeath() {
    $messageDisplayBox = $('#message')
    stopClock();
    $startSafeZone.on('click', startLevel);
    $messageDisplayBox.html('<div id="died" class="message"> <h4>Uh-oh, you touched the sides!</h4> <h5>Click start to' +
        ' try again</h5> <input type="button" value="Quit Game" class="quit messageButton"> </div>')
    $gameBoxDiv.off('death')
}
$(function () {
    $gameDiv = $('#game')
    $gameBoxDiv = $('#mazeContainer')
    $startSafeZone = $('#startArea')
    $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone')
    $finishBox = $('someHTMLEntityNotDecided')
    $quit = $('.quit')
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
        $messageDisplayBox.html("You have died! Please try again! Click the start area to start")
        $gameBoxDiv.off('death')
    })

    //triggers start event
    $startSafeZone.click(function () {
        startLevel()
    })
    //triggers finish event
    $finishBox.mouseover(function () {
        finishLevel()
    })

    //enables the death event
    $gameBoxDiv.on('death', function () {
        gameDeath()
    })

    //triggers replay/quit to registration page
    $quit.click(function () {
        $('#game').load('templates/splash.html')
    })
})
