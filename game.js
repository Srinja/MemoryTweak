var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

var flowers=["flower1","flower2","flower3","flower4"];

function nextSequence(){
  level=level+1;
  $("#heading").text("Level "+level);
  var randomPic=Math.floor(Math.random()*4);
  var randomChosenFlower=flowers[randomPic];
  gamePattern.push(randomChosenFlower);
  $("#"+randomChosenFlower).fadeIn(100).fadeOut(100).fadeIn(100);
  var audio=new Audio("sounds/"+randomChosenFlower+".mp3");
  audio.play();

}


function startOver(){
  userClickedPattern=[];
  gamePattern=[];
  level=0;
  started=false;
}

function animatePress(buttonClicked){
  $("#"+buttonClicked).addClass("pressed");
  setTimeout(function(){$("#"+buttonClicked).removeClass("pressed");},100);
}

function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
  if(userClickedPattern.length===gamePattern.length){
    setTimeout(function(){nextSequence();},1000);
    userClickedPattern=[];
  }}else{
    var audio=new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    $("#heading").text("Game Over!🥴");
    setTimeout(function(){$("#heading").text("Press A key To Restart🤗");},1200);
    setTimeout(function(){$("body").removeClass("game-over");},600);

    startOver();

  }
}

$(document).on("keypress",function(){
  if(!started){
    $("#heading").text("Level "+level);
    nextSequence();
    started=true;
  }
});

$(".btn").on("click",function(event){
  var userClickedFlower=event.target.id;
  userClickedPattern.push(userClickedFlower);
  animatePress(userClickedFlower);
  var audio=new Audio("sounds/"+userClickedFlower+".mp3");
  audio.play();
  checkAnswer(userClickedPattern.length-1);
});
