var randomNumber =  Math.floor (Math.random() * 4);

var clickCount = 0;

var count = 0;

var level = 1;

var buttonColours = ["red", "blue", "green", "yellow"];

var randomChosenColour = buttonColours[randomNumber];

var userClickedPattern = [];

var gamePattern = [];


$(document).keydown(function(){
    if (count === 0) {
        randomNumber = Math.floor (Math.random() * 4);
        $("h1").text("Level " + level);
        setTimeout(function () {
            $("#" + buttonColours[randomNumber]).fadeOut(150).fadeIn(150);
            var audio = new Audio("sounds/" + buttonColours[randomNumber] + ".mp3");
            gamePattern.push(buttonColours[randomNumber]);
            audio.play();
        }, 500);
    }
    count += 1;
});

$(".btn").click(function (event) {
    var userChosenColour = event.currentTarget.id;
    playSound(userChosenColour);
    animatePress(userChosenColour);
    userClickedPattern.push(userChosenColour);
    checkAnswer();
});


function nextSequence () {
    randomNumber = Math.floor (Math.random() * 4);
    gamePattern.push(buttonColours[randomNumber]);
    setTimeout (function () {
        $("#" + buttonColours[randomNumber]).fadeOut(150).fadeIn(150);
        var audio = new Audio("sounds/" + buttonColours[randomNumber] + ".mp3");
        audio.play();
    }, 1000);
    
};

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
}

function checkAnswer () {
    if (userClickedPattern[clickCount] === gamePattern[clickCount]) {
        if (clickCount+1 === gamePattern.length) {
            nextLevel();
            softReset();
            nextSequence();
        } else {
            clickCount +=1;
        }
    } else {
        reset();
        $("h1").text("You Lost, Retry Pressing Any Key");
        $("body").addClass("game-over");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
    }
}

function nextLevel() {
    level += 1;
    $("h1").text("Level " + level);
}

function reset() {
    userClickedPattern = [];
    gamePattern = [];
    clickCount = 0;
    count = 0;
    level = 1;
}

function softReset() {
    userClickedPattern = [];
    clickCount = 0;
}