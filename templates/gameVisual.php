<!--<img src="assets/mayden_game_3.png">-->
<div id="gameBg">
    <div id="mazeContainer" class="gameLevelVisual">


        <?php include 'level1.php'; ?>
        <div id="startArea"></div>
        <div id="finishArea"></div>
    </div>

    <div id="message" class="gameLevelVisual">
    </div>

    <div id="timer" class="gameLevelVisual">
        <?php include 'includes/clock.html'; ?>
    </div>

    <div id="entryTally" class="gameLevelVisual">
        <p>Attempts:</p>
        <div id="tally">
        00
        </div>
    </div>
</div>