$(function () {
    /**
     * Game Logic!!
     */

    /**
     * change this var to represent id on game wrapper div
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
     * change this $startBox var to whatever the start element is
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
     * change this $finishBox var to whatever the start element is
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

    /**
     * //todo NEXT LEVEL
     * display visuals of level
     *
     * reset timer event
     *
     * reset level attempts
     *
     */



    function loadLevel($levelNumber) {
        //todo load level files

        $.get(('templates/level'+$levelNumber+'.html'), function( data ) {
            $gameBoxDiv.html( data );});

        attemptsCount = 0;
        /*resets time*/
        $gameBoxDiv.trigger('resetClock');
    }

    /**
     * 'restartLevel' custom event is used to replace messagebox with instructions and prepare the game for the player to try again.
     * 'restartLevel' is handled in deathDetection.js as there is no user restart level control
     *
     *
     * //TODO set vars based on logic and html
     * //TODO test manually
     *
     *
     */

    var $gameBoxDiv = $('#game')
    var $messageDisplayBox = $('#message')
    var instructionsMessageAndInstructions = '<div>Instructions HTML Here</div>'
    var $startBox = $('.#startBox')

    /**
     * changes the message box contents.
     *
     * 'start' is the custom event to start the timer
     *
     */


})