$(function() {
    var sayInterval;
    var prevNum = 1;

    function startSay() {
        sayInterval = setInterval(function() {
            var randomNum = parseInt(5 * Math.random());
            if (randomNum == prevNum) {
                randomNum = parseInt(5 * Math.random());
            } else {
                prevNum = randomNum;
            }
            // console.log(randomNum)
            $(".say-img .industry-say-item").eq(randomNum).addClass("industry-say-animation").removeClass("industry-say-off").siblings().removeClass("industry-say-animation").addClass("industry-say-off")
        }, 3500);
    }
    startSay();
    $(".say-img .industry-say-item").hover(function() {
        clearInterval(sayInterval);
        $(this).addClass("industry-say-animation").removeClass("industry-say-off").siblings().removeClass("industry-say-animation").addClass("industry-say-off")
    }, function() {
        startSay();
    })
});