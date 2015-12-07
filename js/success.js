$(function () {

    var level = 1;
    $(document).on('success', function () {
        $(document).trigger('stop');
        // todo disable death

        // todo show success message

        // Post result to backend
        $.post('api/index.php', {
            'action': 'saveLevel',
            'level': level,
            'attempts': attemptsCount,
            'time': ticks
        });
        //todo if post is successful - load next level
    });
    $('#finish').mouseover(function () {
        $(document).trigger('success');
    });

})