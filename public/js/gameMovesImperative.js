var JUMP    = 38, CROUCH  = 40,
    LEFT    = 37, RIGHT   = 39,
    FIRE    = 32;


function goRight (){
  $('h1').html("Ir para a direita...");
}

function goLeft (){
  $('h1').html("Ir para a esquerda...");
}

function jump (){
  $('h1').html("Pular...");
}

function crouch (){
  $('h1').html("Abaixar...");
}

function fire (){
  $('h1').html("Atirar...");
}

$(window.document).keyup(function(event){
  switch(event.keyCode){
    case JUMP  :
      jump();
      break;
    case CROUCH:
      crouch();
      break;
    case LEFT  :
      goLeft();
      break;
    case RIGHT :
      goRight();
      break;
    case FIRE  :
      fire();
      break;
  };
});
