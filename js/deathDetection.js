$(function(){
    /**
     * //TODO .die class needs to be applied to all imgs which will induce a death
     * //TODO set $gameBoxDiv to mirror html
     * //TODO set $messageDisplayBox to mirror html
     * //TODO set commiserationsMessageDisplayBox html
     *
     * 'death' custom event is used to trigger counter reset, and adds one to the attempts counter
     *
     * "pause" event = trigger to pause timer
     * "addOneToAttempts" event = trigger to ad one to attempts counter
     *
     */

    var $gameBoxDiv = ('enterGameBoxHTMLEntity')
    var $messageDisplayBox = $('MDBdiv')
    var commiserationsMessageAndInstructions = '<div>Failure HTML Here</div>'

    /**
     * custom trigger on mouse over divs for die behaviours
     */

    $('.die').mouseover(function() {
        $gameBoxDiv.trigger('death')
    })

    /**
     * Provides pop up and changes the message box contents.
     *
     * comment out/delete as required
     *
     * 'death' is the custom event
     *
     * 'pause' is the custom trigger for pausing the counter
     *
     * 'addOneToAttempts' is the custom trigger for adding one to the attempts counter
     *
     */

    $gameBoxDiv.on('death', function(){
        alert("You have died! Please try again! Click the start area to start")
        $messageDisplayBox.replaceWith("'commiserationsMessageAndInstructions'")
        $gameBoxDiv.trigger('stop')
        $gameBoxDiv.trigger('restartLevel')
    })

})