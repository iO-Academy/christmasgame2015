$(function(){
    /**
     * //todo NEXT LEVEL
     * display visuals of level
     *
     * reset timer event
     *
     * reset level attempts
     *
     */
    var $gameBoxDiv = $('#game')
    var $messageDisplayBox = $('#message')
    var $startBox = $('#startBox')

    var counter = 0

    $('.die').mouseover(function() {
        $gameBoxDiv.trigger('death')
    })

    $gameBoxDiv.on('death', function(){
        alert("You have died! Please try again! Click the start area to start")
        $messageDisplayBox.replaceWith("'commiserationsMessageAndInstructions'")
        $gameBoxDiv.trigger('stop')
        counter++
        $gameBoxDiv.trigger('restartLevel')
    })

    /**
     * 'restartLevel' custom event is used to replace messagebox with instructions and prepare the game for the player to try again.
     * 'restartLevel' is handled in deathDetection.js as there is no user restart level control
     *
     *
     * //TODO set vars based on logic and html
     * //TODO test manually
     *

    /**
     * changes the message box contents.
     *
     * 'start' is the custom event to start the timer
     *
     */

    $gameBoxDiv.on('restartLevel', function(){
        $messageDisplayBox.replaceWith("'instructionsMessageAndInstructions'")
        $startBox.click(function() {
            $gameBoxDiv.trigger('start')
            $gameBoxDiv.trigger('addOneToAttempts')
        })
    })




})