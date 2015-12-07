$(function(){



    $level = $_POST['level'];
    $attempts = $_POST['attempts'];
    $time = $_POST['time'];
    $user = $_SESSION['id'];
    $try = $_SESSION['attempts'];


    $(document).on('success', function () {
    $(document).trigger('stop');
    // Post result to backend
    $.post('api/index.php', {
        'action': 'saveLevel',
        'user': $('#userName').val(),
        'userEmail': $('#userEmail').val()
    }, function (data, dataObj) {
        console.log(data);
        console.log('hiya');
    });

});

$('#finish').mouseover(function () {
    $(document).trigger('success');
    console.log("success!");
});

})