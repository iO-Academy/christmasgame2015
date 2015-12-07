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


    function loadLevel(levelNumber) {
        //todo load level files
        /*resets time*/
        $gameBoxDiv.trigger('reset')
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

    $gameBoxDiv.on('restartLevel', function(){
        $messageDisplayBox.replaceWith("'instructionsMessageAndInstructions'")
        $startBox.click(function() {
            $gameBoxDiv.trigger('start')
            $gameBoxDiv.trigger('addOneToAttempts')
        })
    })




})