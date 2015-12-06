/**
 * Created by peterwilkins on 05/12/2015.
 */
$(function() {
    var ticks = 0;
    var mins = 0;
    var clock;

    $('#start').click(function () {
        console.log("start clock");
        clock = setInterval(function () {
            $('#seconds').text(ticks++);
            if (ticks === 60) {
                $('#minutes').text(++mins);
                ticks = 0;
            }
        }, 10);
    });

    $('#stop').click(function () {
        console.log("stop clock");
        clearInterval(clock);
    });
    $('#reset').click(function () {
        console.log("reset clock");
        clearInterval(clock);
        $('#seconds').text(ticks = 0);
        $('#minutes').text(mins = 0);
    });
});
