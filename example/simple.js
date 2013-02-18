function SimpleClass(){}

var leaks = [];

describe('SimpleClass', function(){

  it('is leaking', function(){
    leaks.push(new SimpleClass());
  });


  it('is not leaking', function(){
    new SimpleClass;
  });

});
