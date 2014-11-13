var test = require('tape');

var EventEmitter = require('events').EventEmitter;
var ee = new EventEmitter();

global.document = {};
global.document.addEventListener = function(type, fn) {
  ee.on(type, fn);
};

global.window = {};
global.window.navigator = {};
global.window.navigator.userAgent = "";

var keyifyer = require('../');
var keyify = keyifyer.keyify;


test('keyify', function(t) {
  t.plan(5);
  keyifyer.preventDefaultFor('<space>');

  var x = keyify(function(k) {
    t.equals(k.wasPressed('A'), true);
    t.equals(k.wasPressed('<tab>'), true);
    t.equals(k.isPressed('<tab>'), false);
    return 333;
  });

  ee.emit('keydown', {
    keyCode: 65
  });

  ee.emit('keydown', {
    keyCode: 9
  });

  ee.emit('keyup', {
    keyCode: 9
  });

  ee.emit('keydown', {
    keyCode: 32,
    preventDefault: function() {
      t.pass('preventDefault was called');
    }
  });


  var r = x();

  t.equals(r, 333);
});
