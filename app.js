var express = require('express');
var app     = express();
var path    = require('path');
var _       = require('lodash');
require('lodash-contrib');

var pollIds       = [1,2,3,4];
var pollQuestions = ["Which is the best music style?"
                     ,"Which instrument do you like best?"
                     ,"Who's the biggest Rock 'n Roll Legend?"
                     ,"How many software engineers does it take to learn FRP?"];


function randomVotes() {
  return Math.floor(Math.random()*(33-0+1)+0);
}

var pollResults = _(_.zip(pollIds, pollQuestions))
      .mapcat(function(idQuestion){
        var id       = idQuestion[0];
        var question = idQuestion[1];
        return _(5).range().map(function(n){
          return {
            id: id,
            question: question,
            results: {
              a: randomVotes(),
              b: randomVotes(),
              c: randomVotes()
            }
          };
        }).value();
      }).value();


function currentResults() {
  pollResults = _(_.rest(pollResults)).concat(_.first(pollResults)).value();
  return pollResults[0];
}



app.get('/polls/current/results', function(req, res){
  res.send(currentResults());
});

app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);
