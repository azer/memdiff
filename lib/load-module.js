var vm          = require("vm"),
    fs          = require("fs"),
    path        = require("path"),
    expect      = require('chai').expect,
    requireLike = require("require-like"),
    bdd         = require("./bdd"),
    mocks       = {};

module.exports = loadModule;

function it(module){
  return function self(title, fn){
    var fullTitle = fn.title = (self.caller.title && (self.caller.title + ' ') || '') + title;
    bdd.it(module, fullTitle, fn);
  };
}

function loadModule(filename){
  var context = newContext(filename);
  vm.runInNewContext(read(filename), context, filename);
  return context.module.exports;
};

function mockRequire(relative){
  var relativeRequire = requireLike(relative);

  return function(module){
    return mocks[module] || relativeRequire(module);
  };
}

function newContext(filename){
  var exports = {},
      module  = { exports: exports };

  return {
    __filename    : filename,
    __dirname     : path.dirname(filename),
    process       : process,
    console       : console,
    Buffer        : Buffer,
    setTimeout    : setTimeout,
    clearTimeout  : clearTimeout,
    setInterval   : setInterval,
    clearInterval : clearInterval,

    exports       : exports,
    require       : mockRequire(filename),
    module        : module,

    expect        : expect,
    describe      : bdd.describe,
    it            : it(module)
  };
}

function read(filename){
  if(!/\.js$/.test(filename))
    filename += '.js';

  return fs.readFileSync(filename);
}
