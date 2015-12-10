var $gameDiv, $gameBoxDiv, $messageDisplayBox, $finishBox, levelNumber = 1
var congratulationsMessage = '<p>Yay you did it!</p>'
var completedLevelMessage = '<p>Some html about completing level</p>'
var $startSafeZone, lastLevel = 2, attemptsCount = 0, playing = false, finished = false
var genericError = 'Sorry there is a problem, please try reloading the page'


/**
 * checks if level number is valid or sets error message
 * if first level, loads gameVisuals, sets variables and registers event handlers
 * Displays generic error is load fails
 * @number levelNumber
 */
function loadLevel(levelNumber) {

    if (levelNumber > 0 && levelNumber <= lastLevel) {
        $('#splashbackground').hide()
        $('#loadingImage').show();
        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.php', function(response, status) {
                $('#loadingImage').hide();
                    if (status == "error") {
                        console.log(status)
                        $messageDisplayBox.html(genericError)
                    }
                resetClock()
                $startSafeZone = $('#startArea')
                $gameBoxDiv = $('#mazeContainer')

                //disable right click on maze container
                $(document).ready(function() {
                    $gameBoxDiv.on("contextmenu",function(){
                        return false;
                    });
                });
                $finishBox = $('#finishArea')
                $gameDiv = $('#game')
                $messageDisplayBox = $('#message')
                $presentOne = $('#present_1_single')
                $road = $('#road')
                $shifty = $('.shifty')

                //start the game animations

                //$startSafeZone.click( function start() {
                   // $presentOne.animate({left: "83px"}, 1, 'linear', (function() {
                      //  $presentOne.animate({left: "109px"}, 1, 'linear', start)
                    //}))
                 //})

                //enable start event
                $startSafeZone.click( function() {
                    if(!playing && !finished)
                    startLevel()
                })
                //enable the death event
                $gameBoxDiv.on('mouseover', '.boundary', function() {
                    if(playing) {
                        gameDeath()
                    }
                })
                //enable finish event
                $finishBox.mouseover(function() {
                    if(playing) {
                        finishLevel()
                    }
                })
            })
        } else {
            $gameBoxDiv.load('templates/level' + levelNumber + '.php',
                function(response, status) {
                    $('#loadingImage').hide()
                    if (status == 'error') {
                        $messageDisplayBox.html(genericError)
                    }
                    attemptsCount = 0
                    resetClock()
                })
        }
    } else {
        $messageDisplayBox.html('<p> Sorry, level does not exist. </p>')
    }
}
/**
 * starts clock, sets playing to true, add one to attempts counter
 */
function startLevel() {
//Start Clock
    startClock()
    playing = true
    $gameBoxDiv.css({
        'cursor': 'url("img/cursor.gif"), auto'})
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount)
}
/**
 * stops clock, sets playing to false, posts data to api, loads the next level or End of game message box
 */
function finishLevel() {
    //stops the clock
    stopClock()
    playing = false
    finished = true
    //change message box to display level congrats
    $messageDisplayBox.html(completedLevelMessage)
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        },
        function(data) {
            if ('success' in data && data.success) {
                levelNumber++
                if (levelNumber === lastLevel) {
                    $messageDisplayBox.html(congratulationsMessage)
                }
                else {
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
 * stops clock, doesn't reset
 * enables the safezone click event
 * replaces the message in the display box
 * disables the death event
 */

function gameDeath() {
    stopClock()
    $gameBoxDiv.css( 'cursor', 'not-allowed' )
    playing = false
    $messageDisplayBox.html('You have died! Please try again! Click on the start area to start')
}

$(function() {
    $gameDiv = $('#game')
    $gameBoxDiv = $('#mazeContainer')
    $messageDisplayBox = $('#message')
    $startSafeZone = $('#startArea')
    $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone')
    $finishBox = $('someHTMLEntityNotDecided')
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

