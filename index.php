<html>
	<head>
		<link href='https://fonts.googleapis.com/css?family=Roboto:400,700' rel='stylesheet' type='text/css'>
		<link type="text/css" href="css/layout.css" rel="stylesheet" media="all">
		<link type="text/css" href="css/splash.css" rel="stylesheet" media="all">
		<script src="https://code.jquery.com/jquery-1.9.1.min.js"></script>
        <script src="js/cookies.js"></script>
        <script src="js/validate.js"></script>
		<script src="js/clock.js" type="text/javascript"></script>
		<script src="js/splash.js"></script>

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
			document.getElementById('game').innerHTML = '<p class="touchDevice"> Error! This game is for use on a device without a touchscreen</p>'
		}
	</script>
</html>
