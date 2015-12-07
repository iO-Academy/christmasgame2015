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
    /**
     *startGame funcitonality
     */

    /**
     * TODO change this $startBox var to whatever the start element is
     * @type {*|jQuery|HTMLElement}
     */

    var $startBox = $('someHTMLEntityNotDecided')

    $startBox.click(function () {
        //Start Clock
        $gameBoxDiv.trigger('startClock')
        //increase attempt counter by 1
        $('#tally').trigger('addOneToAttempts')
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

    $('#tally').on('addOneToAttempts', function () {
        $('#tally').text(++attemptsCount)
    })

    /**
     * Success functionality
     */

    /**
     * TODO change this $finishBox var to whatever the start element is
     */

    var $finishBox = $('someHTMLEntityNotDecided')
    var $levelNumber = 1
    var congratulationsMessage = $('<p>Some html shit about congrats</p>')





    $finishBox.mouseover(function () {
        //todo remove post test
        alert("You have completed level '$levelNumber'")
        //change message box to display level congrats
        $messageDisplayBox.replaceWith("'congratulationsMessage'")
        //stops the clock
        $gameBoxDiv.trigger('stopClock')
        //disable death
        $('.die').off(mouseover)
        $.post('api/index.php', {
            'action': 'saveLevel',
            'level': $levelNumber,
            'attempts': attemptsCount,
            'time': ticks
        },function(){
            //success function
            $levelNumber ++
            if (gameOver($levelNumber)){
                //show expanded div + gameover congrats ...
            } else {
                loadLevel($levelNumber)
            }
        });

    })


    $('.die').mouseover(function() {
        $gameBoxDiv.trigger('death')
    })

    $gameBoxDiv.on('death', function(){
        alert("You have died! Please try again! Click the start area to start")
        $messageDisplayBox.replaceWith("'commiserationsMessageAndInstructions'")
        $gameBoxDiv.trigger('stop')
        attemptsCount++
        $gameBoxDiv.trigger('restartLevel')
    })
})