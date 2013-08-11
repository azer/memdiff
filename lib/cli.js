var diff = require('./index');
var style = require('styled');
var format = require('new-format');

module.exports = cli;

function cli(input, options){
  var tests    = diff.loadModule(input),
      keys     = Object.keys(tests);

  (function next(i){

    if(i >= keys.length){
      process.stdout.write('\n\n');
      return;
    }

    if(options.pattern && !(new RegExp(options.pattern)).test(keys[i])){
      return next(i+1);
    }

    var params = {
      fn       : tests[keys[i]],
      duration : options.duration,
      times    : options.times,
      interval : options.interval
    };

    diff(params, function(result, elapsed){
      show(i + 1, keys[i], result.size, elapsed);
      setTimeout(next, 200, i+1);
    });

  }(0));

}

function show (index, title, mem, elapsed) {
  var nmem = parseInt(mem);

  process.stdout.write(format('\n\n    {index}. {title}\n       Mem: {mem} Time: {elapsed}', {
    index: index,
    title: style('bold', title),
    mem: style(nmem < 50 ? nmem < 0 ? 'green' : 'cyan' : 'red', mem),
    elapsed: style(elapsed < 250 ? 'cyan' : 'red', elapsed + 'ms'),
  }));
}
