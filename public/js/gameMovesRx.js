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

var source = Rx.Observable.fromEvent(window.document, 'keyup');

function isKey (keyCode){
  return function(event){
    return event.keyCode === keyCode;
  };
}


source.filter(isKey(FIRE)).subscribe(fire);
source.filter(isKey(JUMP)).subscribe(jump);
source.filter(isKey(CROUCH)).subscribe(crouch);
source.filter(isKey(LEFT)).subscribe(goLeft);
source.filter(isKey(RIGHT)).subscribe(goRight);
