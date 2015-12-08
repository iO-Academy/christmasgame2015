var $gameBoxDiv = $('#mazeContainer');
var $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone');
var $messageDisplayBox = $('someHTMLEntityIDNotDecidedForMessage');
var $finishBox = $('someHTMLEntityNotDecided');
var levelNumber = 1;
var congratulationsMessage = '<p>Some html shit about congrats</p>';
var $startSafeZone = $('#startArea');
var gameover = 2;
var genericError = "error, error";
var attemptsCount;

/**
 * ajax request for next level
 *
 * @param levelNumber
 */

//todo validation if file doesnt exist
function loadLevel(levelNumber) {
    if (levelNumber === 1) {
        $('#game').load('templates/gameVisual.html', function( response, status) {
            if ( status == "error" ) {
                $gameBoxDiv.html("<p> On no! There was an error, please refresh the page or summat... </p>");
            }
        })
    }
    $gameBoxDiv.load('templates/level' + levelNumber + '.php',
        function( response, status) {
            if ( status == "error" ) {
                $gameBoxDiv.html("<p> On no! There was an error, please refresh the page or summat... </p>");
            }
            attemptsCount = 0;
            resetClock()
        })
}

function startGame() {
//Start Clock
    startClock();
    //increase attempt counter by 1
    $('#tally').text(++attemptsCount);
    //disable start zone todo move into what ever calls startGame
    $startSafeZone.off('click');

    $('.die').on('death', gameDeath)
}

function finishGame() {
//todo remove post test
    alert("You have completed level 'levelNumber'");
    //change message box to display level congrats
    $messageDisplayBox.replaceWith("'congratulationsMessage'");
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
            //success function
            levelNumber++;
            //todo abstract this animation stuff out
            if (levelNumber === gameover) {
                $messageDisplayBox.replaceWith('#endOfGame').css({opacity: 0});
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
        //todo change this fail to a success callback with if checkoing for bool value of false and do fail shit then
    ).fail(function () {
        //todo dont replpace whole game divs with errorerror
        $('#game').replaceWith(genericError);
    })
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

