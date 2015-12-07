$(function () {
    var ticks = 0;
    var clock;

    /**
     * function seconds2time converts seconds to time string for display
     * @param seconds
     * @returns {string}
     */
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

    $(document).on('startClock', function () {
        clock = setInterval(function () {
            $('#seconds').text(seconds2time(++ticks));
        }, 1000);
    });

    $(document).on('stopClock', function () {
        clearInterval(clock);
    });

    $(document).on('resetClock', function () {
        clearInterval(clock);
        ticks = 0;
        $('#seconds').text("0:00");
    });
});
