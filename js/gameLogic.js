$(function () {
    /**
     * Game Logic!!
     */

    /**
     * TODO change this var to represent id on game wrapper div
     */

    var $gameBoxDiv = $('someHTMLEntityIDNotDecided')
    var $startSafeZone = $('someHTMLEntityIDNotDecided#startSafeZone')
    var $finishSafeZone = $('someHTMLEntityIDNotDecided#finishSafeZone')
    var $messageDisplayBox = $('someHTMLEntityIDNotDecidedForMessage')
    var attemptsCount
    var $finishBox = $('someHTMLEntityNotDecided')
    var levelNumber = 1
    var congratulationsMessage = $('<p>Some html shit about congrats</p>')
    var $startBox = $('someHTMLEntityNotDecided')
    var gameover = 2
    var genericError = "error, error"

    /**
     *startGame funcitonality
     */

    /**
     * TODO change this $startBox var to whatever the start element is
     * @type {*|jQuery|HTMLElement}
     */

    $startBox.click(function () {
        //Start Clock
        $gameBoxDiv.trigger('startClock')
        //increase attempt counter by 1
        $('#tally').text(++attemptsCount)
        //disable start zone
        $startSafeZone.off('click')
        //triggers death event
        $('.die').mouseover(function () {
            $gameBoxDiv.trigger('death')
        })
        //triggers complete event
        $finishSafeZone.mouseover(function () {
            $gameBoxDiv.trigger('completedLevel')
        })
    })

    /**
     * Success functionality
     */

    /**
     * TODO change this $finishBox var to whatever the start element is
     */

    $finishBox.mouseover(function () {
        //todo remove post test
        alert("You have completed level 'levelNumber'")
        //change message box to display level congrats
        $messageDisplayBox.replaceWith("'congratulationsMessage'")
        //stops the clock
        $gameBoxDiv.trigger('stopClock')
        //disable death
        $('.die').off('mouseover')
        $.post('api/index.php', {
            'action': 'saveLevel',
            'level': levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        }, // put data here from ajax into endOfGame
            function () {
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
                }).fail(function() {
                    $messageDisplayBox.replaceWith(genericError);
                })
            }
        else
        {
            loadLevel(levelNumber)
        }
    });

})


/**
 * ajax get request for next level and puts result into $gameBoxDiv
 *
 * @param levelNumber
 */


function loadLevel(levelNumber) {
    $.get(('templates/level' + levelNumber + '.html'),
        function (data) {
            $gameBoxDiv.replaceWith(data)
            attemptsCount = 0
            $gameBoxDiv.trigger('resetClock')
        })
}


    $('.die').mouseover(function () {
        $gameBoxDiv.trigger('death')
    })
    /*
    * When the user dies this function is called.
    * It does exactly what it says in the function, if you've got this far and cannot work out what this does then it's
    * even more of a waste of my time explaining it for you.
    * For now, proceed.
    */
    $gameBoxDiv.on('death', function () {
        $gameBoxDiv.trigger('stopClock')
        $startSafeZone.on('click')
        $messageDisplayBox.replaceWith("You have died! Please try again! Click the start area to start")
        $('.die').off('death')
    })
})
