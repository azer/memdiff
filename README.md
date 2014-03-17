## memdiff [![Build Status](https://travis-ci.org/azer/memdiff.png)](https://travis-ci.org/azer/memdiff)

BDD style memory leak hunting tool. See [example/simple.js](#example)

![](http://i.cloudup.com/WQHTKzYR5T.png)

## Warning

Memdiff is experimental. I've been noticing some inconsistency but haven't had time for checking out and fixing yet.

## Install

```bash
$ npm install -g memdiff
```

Requires Node v0.8.x

## Usage

```bash
$ memdiff --help
```

<a name="example"></a>
## Example Module

```js
// example/simple.js
function SimpleClass(){}

var leaks = [];

describe('SimpleClass', function(){

  it('is leaking', function(){
    leaks.push(new SimpleClass);
  });


  it('is async and not leaking', function(done){
    new SimpleClass;

    process.nextTick(done);
  });

});
```

<a name="api"></a>
## API

```js
var memdiff = require('memdiff');

function SimpleClass(){}

var leaks = [];

function leaking(){
  leaks.push(new SimpleClass);
}

memdiff(leaking, function(result){ // or memdiff({ fn: leaking, duration: 15, times: 9999, interval: 1 ....
  console.log('leaking: ', result.size);
});
```
