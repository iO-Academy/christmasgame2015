$(function () {

    var level = 1;
    $(document).on('success', function () {
        $(document).trigger('stop');
        // Post result to backend
        $.post('api/index.php', {
            'action': 'saveLevel',
            'level': level,
            'attempts': attemptsCount,
            'time': ticks
        });
        //todo if successful post - load next level here
    });
    $('#finish').mouseover(function () {
        $(document).trigger('success');
    });

})