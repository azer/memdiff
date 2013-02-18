module.exports = {
  describe: describe,
  it: it
};

function describe(title, fn){
  fn.title = (describe.caller.title && (describe.caller.title + ' ') || '') + title;
  fn.desc = true;
  fn();
}

function it(module, title, fn){
  module.exports[ title ] = fn;
}
