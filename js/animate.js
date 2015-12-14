function animatePresents() {
    if(ticks == 0 || ticks%2 == 0) {
        $presentOne.animate({left: "-=26"}, 1000, 'linear')
        $shifty.animate({left: "+=6"}, 1000, 'linear')
    }
    else {
        $presentOne.animate({left: "+=26"}, 1000, 'linear')
        $shifty.animate({left: "-=6"}, 1000, 'linear')
    }
}

function resetPresents() {
    $presentOne.attr('style', '')
    $shifty.attr('style', '')
}
