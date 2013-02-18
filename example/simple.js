require('./bdd');

function LeakingClass(){}

var leaks = [];

describe('LeakingClass', function(){

  it('is leaking', function(){
    leaks.push(new LeakingClass());
  });


  it('is not leaking', function(){
    new LeakingClass;
  });

});
