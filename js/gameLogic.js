var $gameBoxDiv = $('#mazeContainer');
var $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone');
var $messageDisplayBox = $('someHTMLEntityIDNotDecidedForMessage');
var $finishBox = $('someHTMLEntityNotDecided');
var levelNumber = 1;
var congratulationsMessage = '<p>Some html shit about congrats</p>';
var $startSafeZone = $('#startArea');
var gameover = 2;
var genericError = "Sorry there is a problem, please try again later";
var attemptsCount;

/**
 * ajax request for next level
 *
 * @param levelNumber
 */

//todo validation if file doesn't exist
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

function startGame() {
//Start Clock
    startClock();
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount);
    //disable start zone
    $startSafeZone.off('click');
    $('.die').on('death', gameDeath)
}

function animateDisplayMessageBox() {
    $messageDisplayBox.animate({
        opacity: "100",
        width: "600px",
        height: "400px",
        right: "0px",
        top: "0px"
    })
}
function finishGame() {
//todo remove, after testing
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
                if (levelNumber === gameover) {
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


function gameDeath() {
    stopClock();
    $startSafeZone.on('click', startGame);
    $messageDisplayBox.replaceWith("You have died! Please try again! Click the start area to start");
    $('.die').off('death')
}
$(function () {

    $startSafeZone.click(startGame);

    $finishBox.mouseover(finishGame);
    //triggers death event
    $('.die').mouseover(gameDeath);
    //triggers complete event
    $finishSafeZone.mouseover(function () {
        $gameBoxDiv.trigger('completedLevel')
    });

    $gameBoxDiv.on('death', function () {
        gameDeath()
    })
});

