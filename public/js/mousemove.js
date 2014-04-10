function mouseXYBehavior(){
  var behavior = new Rx.BehaviorSubject([0,0]);
  $(window.document).mousemove(function(event){
    behavior.onNext([event.clientX, event.clientY]);
  });
  return behavior;
}

var xyBehavior = mouseXYBehavior();
xyBehavior.subscribe(function(xy){
  $('h1').html('(' + xy[0] + ',' + xy[1] + ')');
});

console.log( xyBehavior.value );
