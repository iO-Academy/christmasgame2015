/**
 * Created by peterwilkins on 05/12/2015.
 */
$(function () {
    var ticks = 0;
    var mins = 0;
    var clock;

    $('#start').click(function () {
        $(document).trigger('start');
        console.log("start clock");
    });

    $('#stop').click(function () {
        $(document).trigger('stop');
        console.log("stop clock");
    });

    $('#reset').click(function () {
        console.log("reset clock");
        $(document).trigger('reset');
    });

    $(document).on('start', function () {
        clock = setInterval(function () {
            $('#seconds').text(ticks++);
            if (ticks === 60) {
                $('#minutes').text(++mins);
                ticks = 0;
            }
        }, 10);
    });


    $(document).on('stop', function () {
        clearInterval(clock);
    });

    $(document).on('reset', function () {

        clearInterval(clock);
        $('#seconds').text(ticks = 0);
        $('#minutes').text(mins = 0);
    });
});
