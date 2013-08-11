var memwatch = require('memwatch'),
    iter     = require('iter');

module.exports = diff;

function diff(options, callback){
  var start = +(new Date),
      hd    = new memwatch.HeapDiff,
      elapsed = 0;

  typeof options == 'function' && (
    options = { loop: options }
  );

  options.duration || ( options.duration = 5 ); // seconds
  options.interval || ( options.interval = 2.5 ); // seconds
  options.times    || ( options.times = 99 );

  (function loop(t){

    if(+(new Date) >= start + options.duration * 1000){
      options.destroy && options.destroy();
      callback(hd.end().change, elapsed);
      return;
    }

    var fn = options.loop || options.fn;

    iter(options.times)
      .run(function(next){

        var startTS = Date.now();

        if(fn.length == 1){
          fn(function(){
            elapsed += Date.now() - startTS;
            next();
          });
        } else {
          fn();
          elapsed += Date.now() - startTS;
          next();
        }

      })
      .done(function(){
        setTimeout(loop, options.interval * 1000, t+1);
      });

  })(0);
};
