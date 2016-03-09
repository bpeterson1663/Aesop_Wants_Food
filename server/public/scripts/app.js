var aesopFoods = ["Apples", "Pears", "Bananas", "Pizza"];
var userGuess;
var currentRequest;
var correct = 0;
var incorrect = 0;

$(document).ready(function(){
  for(var i =0; i < aesopFoods.length; i++){
    $('.foodButtons').append('<button class="'+aesopFoods[i]+'">'+aesopFoods[i]+'</button>');
  }
  //var timer = setInterval(aesopWantsFood, 5000);
  $('.foodButtons').on('click', 'button',function(){
    userGuess = $(this).attr('class');
    console.log("User Guess is : " , userGuess);
    $.ajax({
      type:"GET",
      url:"/food/"+userGuess,
      success: function(data){
        console.log("Data returned: " , data);
        feedAesopFood(data);
      }
    });
  });
});

var timer = setInterval(aesopWantsFood, 5000);

function aesopWantsFood(){
  currentRequest = aesopFoods[randomNumber(0, aesopFoods.length - 1)];
  console.log(currentRequest);
  $('.aesopWants span').text(currentRequest);
}

function feedAesopFood(food){
  if(food == currentRequest){
    correct++;

  } else {
    incorrect++;
  }
  //console.log("Correct: " , correct);
  //console.log("Incorrect: " , incorrect);
  $('.inCorrect span').text(incorrect);
  $('.correct span').text(correct);
  aesopWantsFood();
  clearInterval(timer);
  timer = setInterval(aesopWantsFood, 5000);
}

var randomNumber = function(min,max){
  return Math.floor(Math.random() * (1 + max - min) + min);
};
