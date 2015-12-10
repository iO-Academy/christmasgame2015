<!--[if lte IE 8 ]>    <html class="ie8" lang="en"> <![endif]-->
<!--[if (gt IE 8)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->
<head>
        <link href='https://fonts.googleapis.com/css?family=Roboto:400,100,700' rel='stylesheet' type='text/css'>
        <link type="text/css" href="css/splash.css" rel="stylesheet" media="all">
        <link type="text/css" href="css/popup.css" rel="stylesheet" media="all">
        <link type="text/css" href="css/layout.css" rel="stylesheet" media="all">
        <link type="text/css" href="css/boundary.css" rel="stylesheet" media="all">
        <link type="text/css" href="css/level1Images.css" rel="stylesheet" media="all">
        <script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="js/animate.js" type="text/javascript"></script>
        <script src="js/timer.js" type="text/javascript"></script>
        <script src="js/gameLogic.js" type="text/javascript"></script>
        <script src="js/cookies.js" type="text/javascript"></script>
        <script src="js/validate.js" type="text/javascript"></script>
        <script src="js/splash.js" type="text/javascript"></script>
        <title>Mayden Christmas Game 2015</title>
    </head>
    <body>
        <div id="game">
            <?php include("templates/splash.html") ?>
        </div>
    </body>
    <script>
        //validating that the device is not touch screen
        var isTouchDevice = 'ontouchstart' in document.getElementById('game')
        if (isTouchDevice) {
            document.getElementById('game').innerHTML = '<h1>This game is for use on a device without a touchscreen.</h1>'
        }
    </script>
<div id="preloaded-images1" class="preloadImgs"></div>
<div id="preloaded-images2" class="preloadImgs"></div>
<div id="preloaded-images3" class="preloadImgs"></div>
<div id="preloaded-images4" class="preloadImgs"></div>
<div id="preloaded-images5" class="preloadImgs"></div>
<div id="preloaded-images6" class="preloadImgs"></div>
<div id="preloaded-images7" class="preloadImgs"></div>
<div id="preloaded-images8" class="preloadImgs"></div>
<div id="preloaded-images9" class="preloadImgs"></div>
<div id="preloaded-images10" class="preloadImgs"></div>
<div id="preloaded-images11" class="preloadImgs"></div>
<div id="preloaded-images12" class="preloadImgs"></div>
<div id="loadingImage"></div>
</html>
