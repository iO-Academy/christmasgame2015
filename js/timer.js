var ticks = 0
var clock

/**
 * converts and formats seconds to hh:mm:ss string
 * @number seconds
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
    minutes = (minutes < 10) ? "0" + minutes : String(minutes);
    time += minutes + ":";
    time += (seconds < 10) ? "0" + seconds : String(seconds);
    return time;
}

function startClock() {
    clock = setInterval(function () {
        if(ticks == 0 || ticks%2 == 0) {
            $presentOne.animate({left: "-=26"}, 1000, 'linear')
            $shifty.animate({left: "+=6"}, 1000, 'linear')
        }
        else {
            $presentOne.animate({left: "+=26"}, 1000, 'linear')
            $shifty.animate({left: "-=6"}, 1000, 'linear')
        }
        document.getElementById('seconds').innerHTML = seconds2time(++ticks);
    }, 1000);
}

function stopClock() {
    clearInterval(clock);
}

function resetClock() {
    clearInterval(clock);
    ticks = 0;
    document.getElementById('seconds').innerHTML = "00:00";
}



