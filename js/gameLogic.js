var genericError = '<div class="message"><h4>Oops!</h4><h5>Please try reloading the page</h5></div>'
var smallInstructions = '<div class="message"><div>' +
    '<input type="button" value="How To Play" class="messageButton centre open"></div></div>'
var bigInstructions = '<div class="message bigMessage"><div class="messageContent"><h2>How To Play</h2>' +
    '<h4>Follow the path with your mouse cursor to make it down the first chimney, through the office and ' +
    'up out of the second chimney as quickly and with as few attempts as possible, avoiding touching the ' +
    'sides and looking out for obstacles.</h4><h4>Close the instructions then click <span>Start</span> to begin!</h4><input type="button" value="Close" class="messageButton hide"> </div></div>'
var lastLevel = 1, playing = false, finished, checkpointPassed = false, $startSafeZone
var levelNumber = 1, $gameDiv, $gameBoxDiv, $messageDisplayBox, $finishBox
var attemptsCount = 0

/**
 * checks if level number is valid or sets error message
 * if first level, loads gameVisuals, sets variables and registers event handlers
 * Displays generic error is load fails
 * @param number levelNumber
 */
function loadLevel(levelNumber) {
    finished = false
    attemptsCount = 0
    if (levelNumber > 0 && levelNumber <= lastLevel) {
        $('#splashbackground').hide()
        $('#loadingImage').show()
        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.php', function(response, status) {
                $messageDisplayBox = $('#message')
                $('#loadingImage').hide()
                if (status == "error") {
                    $messageDisplayBox.html(genericError)
                } else {
                    resetClock()
                    $startSafeZone = $('#startArea')
                    $gameBoxDiv = $('#mazeContainer')
                    //disable right click on maze container
                    $gameBoxDiv.on("contextmenu", function() {
                        return false;
                    })
                    $finishBox = $('#finishArea')
                    $gameDiv = $('#game')
                    $messageDisplayBox.html(smallInstructions)
                    $presentOne = $('#present_1_single')
                    $road = $('#road')
                    $shifty = $('.shifty')
                    //enable start event
                    $startSafeZone.click(function() {
                        if (!playing && !finished)
                            startLevel()
                    })
                    //enable the death event
                    $gameBoxDiv.on('mouseover mouseout', '.boundary', function() {
                        if (playing) {
                            gameDeath()
                        }
                    })
                    // make sure they passed the checkpoint
                    $('#checkpoint').mouseover(function() {
                        checkpointPassed = true
                    })
                    //enable finish event
                    $finishBox.mouseover(function() {
                        if (playing) {
                            finishLevel()
                        }
                    })
                }
                $messageDisplayBox.html(smallInstructions)


                $('.open').click(function() {
                    bigInstruct()
                })
            })
        } else {
            $gameBoxDiv.load('templates/level' + levelNumber + '.php',
                function(response, status) {
                    if (status == 'error') {
                        $messageDisplayBox.html(genericError)
                    }
                    attemptsCount = 0
                    resetClock()
                })
        }
    } else {
        quitGame()
    }
}

/**
 * starts clock, sets playing to true, add one to attempts counter
 */
function startLevel() {
//Start Clock
    resetClock()
    resetPresents()
    startClock()
    $messageDisplayBox.html(smallInstructions)
    playing = true
    $gameBoxDiv.css({
        'cursor': 'url("img/cursor.gif"), auto'
    })
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount)
}
/**
 * stops clock, sets playing to false, posts data to api, loads the next level or End of game message box
 */
function finishLevel() {
    if (checkpointPassed) {
        //stops the clock
        stopClock()
        playing = false
        finished = true
        $.post('api/index.php', {
                'action': 'saveLevel',
                'level': levelNumber,
                'attempts': attemptsCount,
                'time': ticks
            },
            function (data) {
                if ('success' in data && data.success) {
                    if (levelNumber === lastLevel) {

                        $('#message').html('<div class="message bigMessage">' +
                            '<div class="messageContent1"><h2>Congratulations!</h2> <h4>You finished the game in: ' + seconds2time(ticks) + '</h4>' +
                            '<h4>and it took you a total of ' + attemptsCount + ' attempts!</h4>' +
                            '<h4>Your results have been submitted</h4>' +
                            '<div class="buttonBigMessage">' +
                            '<input type="button" value="Play Again!" class="messageButton replay"> </div></div>' +
                            '</div>').animate({
                                width: "690px",
                                height: "360px"
                            },
                            function () {
                                $('.replay').click(function () {
                                    quitGame()
                                })
                                $('.messageContent').fadeIn(500)
                            })
                    }
                    else {
                        loadLevel(++levelNumber)
                    }
                }
                else {
                    $messageDisplayBox.html(genericError)
                }
            },
            'json'
        ).fail(function () {
            $messageDisplayBox.html(genericError)
        })
    } else {
        gameDeath()
    }
}
/**
 * stops clock, doesn't reset
 * enables the safezone click event
 * replaces the message in the display box
 * disables the death event
 */
function gameDeath() {
    stopClock()
    $gameBoxDiv.css('cursor', 'not-allowed')
    playing = false
    $messageDisplayBox.html('<div class="message"><h4>Uh-oh, you touched the sides!</h4><h5>Click <span>start</span> to try again</h5>' +
        '<div class="button"><input type="button" value="How To Play" class="messageButton open"></div></div>')
    $('.open').click(function() {
        bigInstruct()
    })
    $('.quit').click(function() {
        quitGame()
    })
}
/**
 * animates instructions to large format,
 * fades content in.
 */
function bigInstruct() {
    $('#message').html(bigInstructions).animate({
            width: "690px",
            height: "360px"
        },
        function() {
            $('.hide').click(function() {
                smallInstruct()
            })
            $('.messageContent').fadeIn(500)
        })
}
/**
 * Fades current message content,
 * animates the pop out of the large instruction popup to a smaller size,
 * loads in the small instructions content.
 */
function smallInstruct() {
    $('.messageContent').fadeOut(500, function() {
        $('#message').html(bigInstructions).animate({
                width: "215px",
                height: "160px"
            },
            function() {
                $('#message').html(smallInstructions)
                $('.open').click(function() {
                    bigInstruct()
                })
            })
    })
}
/**
 * Quits the game by reloading  the window
 */
function quitGame() {
    window.location.reload(false)
}
