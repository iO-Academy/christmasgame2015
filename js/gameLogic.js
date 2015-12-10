var genericError = '<div class="message"><h4>Oops!</h4><h5>Please try reloading the page</h5><div class="button"><input type="button" value="Quit Game" class="quit messageButton"></div></div>'
var congratulationsMessage = '<div class="message"><h4>You did it!</h4><h5>Click the Start area to continue playing.</h5><div class="button"><input type="button" value="Quit Game" class="quit messageButton"></div></div>'
var smallInstructions = '<div class="message"><h4>To see the Instructions</h4><h5>Click the Open button</h5><div class="button">' +
    '<input type="button" value="Open" class="messageButton" onclick="bigInstruct()"></div></div>'
var bigInstructions = '<div class="message bigMessage"><div class="messageContent"<h2>Instructions</h2>' +
    '<h3>Follow the path with your mouse cursor to make it to the safe zone.</h3>' +
    '<h3>Try to complete it as fast as possible with as few attempts as possible.</h3>' +
    '<h3>Hide the instructions and click Start to begin.</h3> <input type="button" value="Hide Instructions" onclick="smallInstruct()" class="messageButton"> </div></div>'
var lastLevel = 1, attemptsCount = 0, playing = false, finished = false, $startSafeZone
var levelNumber = 1, $gameDiv, $gameBoxDiv, $messageDisplayBox, $finishBox
var attemptsCount = 0

/**
 * checks if level number is valid or sets error message
 * if first level, loads gameVisuals, sets variables and registers event handlers
 * Displays generic error is load fails
 * @number levelNumber
 */
function loadLevel(levelNumber) {

    if (levelNumber > 0 && levelNumber <= lastLevel) {
        $('#splashbackground').hide()
        $('#loadingImage').show()
        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.php', function (response, status) {
                $('#loadingImage').hide()
                if (status == "error") {
                    $messageDisplayBox.html(genericError)
                } else {
                    resetClock()
                    $startSafeZone = $('#startArea')
                    $gameBoxDiv = $('#mazeContainer')
                    //disable right click on maze container
                    $gameBoxDiv.on("contextmenu", function () {
                        return false;
                    })
                    $finishBox = $('#finishArea')
                    $gameDiv = $('#game')
                    $messageDisplayBox = $('#message')
                    $presentOne = $('#present_1_single')
                    $road = $('#road')
                    $shifty = $('.shifty')
                    //enable start event
                    $startSafeZone.click(function () {
                        if (!playing && !finished)
                            startLevel()
                    })
                    //enable the death event
                    $gameBoxDiv.on('mouseover', '.boundary', function () {
                        if (playing) {
                            gameDeath()
                        }
                    })
                    //enable finish event
                    $finishBox.mouseover(function () {
                        if (playing) {
                            finishLevel()
                        }
                    })
                    $(".messageButton[value='Open']").click(function() {
                        bigInstruct()
                    })
                    $(".messageButton[value='Hide Instructions']").click(function() {
                        smallInstruct()
                    })
                    $(".messageButton[value='Restart']").click(function() {
                        loadLevel(1)
                    })
                    $(".messageButton[value='Quit Game']").click(function() {
                        quitGame()
                    })
                }
            })
        } else {
            $gameBoxDiv.load('templates/level' + levelNumber + '.php',
                function (response, status) {
                    if (status == 'error') {
                        $messageDisplayBox.html(genericError)
                    }
                    attemptsCount = 0
                    resetClock()
                })
        }
    } else {
        window.location.reload(false)
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
        'cursor': 'url("img/cursor.gif"), auto'
    })
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
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        },
        function (data) {
            if ('success' in data && data.success) {
                if (levelNumber === lastLevel) {
                    $messageDisplayBox.html(congratulationsMessage)
                }
                else {
                    loadLevel(++levelNumber)
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
 * stops clock, doesn't reset
 * enables the safezone click event
 * replaces the message in the display box
 * disables the death event
 */
function gameDeath() {
    stopClock()
    $gameBoxDiv.css('cursor', 'not-allowed')
    playing = false
<<<<<<< HEAD
    $messageDisplayBox.html('<div class="message"><h4>Uh-oh, you touched the sides!</h4><h5>Click start to try again</h5>' +
        '<div class="button"><input type="button" value="Quit Game" class="messageButton" onclick="quitGame()"></div></div>')
=======
    $messageDisplayBox.html('You have died! Please try again! Click on the start area to start')
    $gameBoxDiv.off('death')
>>>>>>> a9a8ca681b9a03aba2ca6a314ec05b20e2cd456e
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
            $('.messageContent').fadeIn(500)
        })
}

/**
 * Fades current message content,
 * animates the pop out of the large instruction popup to a smaller size,
 * loads in the small instructions content.
 */
function smallInstruct() {
    $('.messageContent').fadeOut(500, function () {
        $('#message').html(bigInstructions).animate({
                width: "215px",
                height: "160px"
            },
            function() {
                $('#message').html(smallInstructions)
            })
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
            $('.messageContent').fadeIn(500)
        })
}

/**
 * Fades current message content,
 * animates the pop out of the large instruction popup to a smaller size,
 * loads in the small instructions content.
 */
function smallInstruct() {
    $('.messageContent').fadeOut(500, function () {
        $('#message').html(bigInstructions).animate({
                width: "215px",
                height: "160px"
            },
            function() {
                $('#message').html(smallInstructions)
            })
    })

}


/**
 * Quits the game by reloading  the window
 */
function quitGame() {
    window.location.reload(false)
}
