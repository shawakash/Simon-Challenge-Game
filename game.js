var gamePattern=[];
var userClickedPattern=[];
var buttonColours =["red", "blue", "green", "yellow"];
var level=0;
var started=false;


$(document).keypress(function(){
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function startOver(){
    level=0;
    started=false;
    gamePattern=[];
}

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");
        
        if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
            nextSequence();
        }, 1000);

        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("#level-title").text("Game Over, Press Any Key To Restart");
        
        console.log("wrong");
        startOver();
    }
    
}

function nextSequence(){
    userClickedPattern=[];
    
    level++;
    $("#level-title").text("Level " + level);
    
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
}

function playSound(name){
    var buttonSound=new Audio("sounds/" + name + ".mp3");
    buttonSound.play();
    
}

function animatePress(currentColor){
    $("." + currentColor).addClass("pressed");
    setTimeout(function(){
        $("." + currentColor).removeClass("pressed");
    },100);
    
}









