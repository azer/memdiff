var memwatch = require('memwatch');

module.exports = diff;

function diff(options, callback){
  var start = +(new Date),
      hd    = new memwatch.HeapDiff;

  typeof options == 'function' && (
    options = { loop: options }
  );

  options.duration || ( options.duration = 5 ); // seconds
  options.interval || ( options.interval = 2.5 ); // seconds
  options.times    || ( options.times = 99 );

  (function loop(t){
    if(+(new Date) >= start + options.duration * 1000){
      options.destroy && options.destroy();
      callback(hd.end().change);
      return;
    }

    var i = options.times;
    while( i -- ){
      (options.loop || options.fn)();
    }

    setTimeout(loop, options.interval * 1000, t+1);

  })(0);
};
