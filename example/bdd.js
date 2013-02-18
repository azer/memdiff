var diff = require('../lib');

it = function it(title, fn){
  var fullTitle = (it.caller.title && (it.caller.title + ' ') || '') + title;

  diff(fn, function(result){
    console.log('%s: %s', fullTitle, result.size);
  });

};

describe = function describe(title, fn){
  fn.title = (describe.caller.title && (describe.caller.title + ' ') || '') + title;
  fn.desc = true;
  fn();
};
