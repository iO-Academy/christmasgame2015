$(function(){

    /**
     * vars to be set later after game logic/html/css has been created
     *
     * //TODO set vars based on logic and html
     * //TODO test manually
     *
     * @type {*|jQuery|HTMLElement}
     */

    var $finish = $('.#finishHTMLElement')
    var $levelNumber = $('.#hiddenHTMLLevelElement')
    var $messageDisplayBox = $('MDBdiv')
    var congratulationsMessage = '<div>Success HTML Here</div>'

    /**
     * custom trigger on mouseover the finish area
     */

    $finish.mouseover(function() {
        $finish.trigger('completedLevel')
    })

    /**
     * Provides pop up and changes the message box contents.
     *
     * comment out/delete as required
     *
     * 'completedLevel' is the custom event
     *
     */
    $finish.on('completedLevel', function(){
        alert("You have completed level '$levelNumber'")
        $messageDisplayBox.replaceWith("'congratulationsMessage'");
        })

})