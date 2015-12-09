$("#splashbackground").each(function(){
    console.log('fish')
    var randomTopPosition = Math.floor(Math.random()*100).toString();
    var randomLeftPosition = Math.floor(Math.random()*100).toString();
    for (var i = 0; i < 3; i++) {
        snow = document.createElement('#snow');
        snow.setAttribute('style', 'width:29px; height:29px; top:' + randomTopPosition + '; left:' + randomLeftPosition + '; z-index: 999;');
        wrapper = document.getElementById("#splashbackground");
        wrapper.appendChild(snow);
    }
});
