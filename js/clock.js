$(function () {
    var ticks = 0;
    var clock;
    var attemptsCount = 0;

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
        $(document).trigger('startClock');
        console.log("start clock");
    });

    $('#stop').click(function () {
        $(document).trigger('stopClock');
        console.log("stop clock");
    });

    $('#reset').click(function () {
        console.log("reset clock");
        $(document).trigger('resetClock');
    });

    $(document).on('startClock', function () {
        clock = setInterval(function () {
            $('#seconds').text(seconds2time(++ticks));
            //if (ticks === 60) {
            //    $('#minutes').text(++mins);
            //    ticks = 0;
            //}
        }, 1000);
    });


    $(document).on('stopClock', function () {
        clearInterval(clock);
    });

    $(document).on('resetClock', function () {

        clearInterval(clock);
        ticks = 0;
        $('#seconds').text("0:00");
        attemptsCount = 0;
    });

});
