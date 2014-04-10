// Criar um observable a partir de um valor simples

Rx.Observable.returnValue(42)
  .map(function(value){ return value * 2; })
  .subscribe(function(value){
    console.log( value );
  });

// 84


// Criando observables com valores de um array

Rx.Observable.fromArray([10, 20, 30])
  .map(function(value){ return value * 2; })
  .reduce(function(acc, value){ return acc + value; })
  .subscribe(function(value){
    console.log( value );
  });

// 120


// Combinando Observables

function projectRange(n){
  return Rx.Observable.fromArray(_.range(n));
}

Rx.Observable.fromArray([1, 2, 3])
  .flatMap(projectRange)
  .subscribe(function(value){
    console.log( value );
  });

// [0]
// [0, 1]
// [0, 1, 2]
