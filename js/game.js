$(function() {

    var time = 0;
    var timer;
    var running = true;

    function clock() {
        time++;
        console.log(time);
    }

    function startClock() {
        timer = setInterval(clock, 1000);
        running = true;
    }

    function stopClock() {
        window.clearInterval(timer);
        running = false;
    }


    $(window).on('keydown', function(e) {
        if (e.which == 80) {
            if (running) {
                stopClock();
            } else {
                startClock();
            }
        }
    });


    startClock();

    $('.on').mouseenter(function() {
        stopClock();

        var data = {
            'action':'saveLevel',
            'level': '5',
            'time': time
        };


        $.ajax({
            type: "POST",
            url: 'api/',
            data: data,
            success: function (data) {
                console.log(data);
            }
        });
    });


});