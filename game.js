alert("Instructions : \n->Press any key to start the game.\n->Press the buttons in the pattern.\n->Good Luck !");


var gamePattern=[];
var userClickedPattern=[];
var buttonColours=["red", "blue", "green", "yellow"];
var level=0;


$(document).on("keydown",nextSequence);
$(".btn").on("click",function (){
    var userChosenColour=$(this).attr('id');
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);

});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      console.log("success");
      if (userClickedPattern.length === gamePattern.length){
        //Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1500);

      }

    } else {
        $("h1").text("Game Over , Press Any Key to Restart");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
          }, 200);
        startOver();
    }
}

function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];

}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++; 
    $("h1").text("Level - "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("."+currentColour).addClass("pressed");
    setTimeout(function() {
        $("."+currentColour).removeClass("pressed");
      }, 100);
}
