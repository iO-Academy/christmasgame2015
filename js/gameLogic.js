var $gameBoxDiv = $('#mazeContainer');
var $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone');
var $messageDisplayBox = $('#message');
var $finishBox = $('someHTMLEntityNotDecided');
var levelNumber = 1;
var congratulationsMessage = '<p>Some html shit about congrats</p>';
var $startSafeZone = $('#startArea');
var gameover = 2;
var genericError = "Sorry there is a problem, please try again later";
var attemptsCount;

/**
 * loads next level, checks level number is valid
 * if first level also loads game visuals
 * Displays generic error is load fails
 * @number levelNumber
 */
function loadLevel(levelNumber) {
    if (levelNumber > 0 && levelNumber <= 5) {
        if (levelNumber === 1) {
            $('#game').load('templates/gameVisual.html', function( response, status) {
                if ( status == "error" ) {
                    $messageDisplayBox.replaceWith(genericError);
                }
            })
        }
        $gameBoxDiv.load('templates/level' + levelNumber + '.php',
            function( response, status) {
                if ( status == "error" ) {
                    $messageDisplayBox.replaceWith(genericError);
                }
                attemptsCount = 0;
                resetClock()
            })
    } else {
        $messageDisplayBox.replaceWith('<p> Sorry, level does not exist. </p>')
    }
}
/**
 * starts a clock, add one to attempts counter, stops listening to click in start safe zone, listening for death event
 */
function startGame() {
//Start Clock
    startClock();
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount);
    //disable start zone
    $startSafeZone.off('click');
    $('.die').on('death', function () {
        gameDeath()
    })
}

/**
 * animates display message box to a larger box,
 * currently only called on game complete
 */
function animateDisplayMessageBox() {
    $messageDisplayBox.animate({
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
function finishGame() {
    alert("You have completed level 'levelNumber'");
    //change message box to display level congrats
    $messageDisplayBox.replaceWith(congratulationsMessage);
    //stops the clock
    stopClock();
    //disable death
    $('.die').off('mouseover');
    $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        }, // put data here from ajax into endOfGame
        function (data) {
            if (data.success) {
                //success function
                levelNumber++;
                if (levelNumber === gameOver) {
                    $messageDisplayBox.replaceWith('#endOfGame').css({opacity: 0});
                    animateDisplayMessageBox();
                }
                else {
                    loadLevel(levelNumber);
                }
            }
            else {
                $messageDisplayBox.replaceWith(genericError);
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
    $gameBoxDiv.on('death', function() {
        stopClock();
        $startSafeZone.on('click', startGame);
        $messageDisplayBox.replaceWith("You have died! Please try again! Click the start area to start");
        $gameBoxDiv.off('death')
    });
    //triggers start event
    $startSafeZone.click(startGame);
    //triggers finish event
    $finishBox.mouseover(finishGame);
    //triggers death event
    $('.die').mouseover(gameDeath);
    //enables the death eventg
    $gameBoxDiv.on('death', function () {
        gameDeath()
    })
});

