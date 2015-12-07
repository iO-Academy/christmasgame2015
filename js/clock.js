$(function () {
    var ticks = 0;
    var clock;

    function seconds2time(seconds) {
        var hours = Math.floor(seconds / 3600);
        var minutes = Math.floor((seconds - (hours * 3600)) / 60);
        var seconds = seconds - (hours * 3600) - (minutes * 60);
        var time = "";

        if (hours != 0) {
            time = hours + ":";
        }

            minutes = (minutes < 10 && time !== "") ? "0" + minutes : String(minutes);
            time += minutes + ":";
        time += (seconds < 10) ? "0" + seconds : String(seconds);

        return time;
    }

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
            $('#seconds').text(seconds2time(++ticks));
            //if (ticks === 60) {
            //    $('#minutes').text(++mins);
            //    ticks = 0;
            //}
        }, 1000);
    });


    $(document).on('stop', function () {
        clearInterval(clock);
    });

    $(document).on('reset', function () {

        clearInterval(clock);
        ticks = 0;
        $('#seconds').text("0:00");
    });

});
