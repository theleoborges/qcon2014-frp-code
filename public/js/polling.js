function renderPoll(poll) {
  console.log( "Rendering poll id: ", poll.id );
  $('#countdown').html("");
  $('#question-text').html(poll.question);
  console.log( "updating graph with: " , _.values(poll.results) );

  updateGraph(_.values(poll.results));
}

function countdownAndDo(n, task) {
  if( n > 0 ){
    console.log( "Countdown: ", n );
    $('#countdown').html("A new question will be available in " + n +
                         " secs. In the meantime check out the results from our previous poll.");
    setTimeout(function(){
      countdownAndDo(n - 1, task);
    } ,1000);
  } else {
    console.log( "All done." );
    task();
  }
}


function resultsObservable () {
  return Rx.Observable.create(function(observer){
    $.get( "/polls/current/results", function(data) {
      observer.onNext(data);
      observer.onCompleted();
      return function () {
        console.log('disposed');
      };
    });
  });
}

function resultsConnectable () {
  var obs = Rx.Observable
        .interval(2000)
        .flatMap(resultsObservable)
        .publish()
        .refCount();
  var obs1 = obs.skip(1);
  return Rx.Observable.zipArray(obs, obs1);
}


function resultsBuffer () {
  return Rx.Observable
    .interval(2000)
    .flatMap(resultsObservable)
    .bufferWithCount(2, 1);
}



function start (){
  var token = resultsConnectable()
        .subscribe(function(response){
          var current =  response[0];
          var upcoming = response[1];

          if( current.id === upcoming.id ){
            renderPoll(current);
          } else {
            token.dispose();
            countdownAndDo(10, start);
          }
        });
  return token;
}


function start1 (){
  var token = resultsBuffer()
        .subscribe(function(response){
          var current =  response[0];
          var upcoming = response[1];

          if( current.id === upcoming.id ){
            renderPoll(current);
          } else {
            token.dispose();
            countdownAndDo(10, start);
          }
        });
  return token;
}
