  var globalKeys = {};
  var preventDefault = {};

  var invertObject = require('invert-hash');
  var vkey = require('vkey');
  var convert = invertObject(vkey);

  document.addEventListener('keydown', function(e) {
    globalKeys[e.keyCode] = true;
    if (preventDefault[e.keyCode] === true) {
      e.preventDefault();
    }
  });

  document.addEventListener('keyup', function(e) {
    globalKeys[e.keyCode] = false;
  });

  var Keyifyer = function Keyifyer() {
    this.reset();

    var that = this;
    document.addEventListener('keydown', function(e) {
      that.pressedKeys[e.keyCode] = true;
    });

  };


  Keyifyer.prototype.wasPressed = function(c) {
    return this.wasPressedKeycode(convert[c]);
  };

  Keyifyer.prototype.wasPressedKeycode = function(i) {
    return (this.pressedKeys[i] === true);
  };

  Keyifyer.prototype.reset = function() {
    this.pressedKeys = {};
  };

  Keyifyer.isPressed = function(c) {
    return this.isPressedKeycode(convert[c]);
  };

  Keyifyer.isPressedKeycode = function(i) {
    return (globalKeys[i] === true);
  };

  Keyifyer.prototype.isPressed = Keyifyer.isPressed;

  Keyifyer.prototype.isPressedKeycode = Keyifyer.isPressedKeycode;

  Keyifyer.preventDefaultFor = function(i) {
    preventDefault[convert[i]] = true;
  };

  Keyifyer.keyify = function(f) {

    var k = new Keyifyer();
    return function() {
      var args = Array.prototype.slice.call(arguments);
      args.unshift(k);

      f.apply(null, args);
      k.reset();
    };
  };

  module.exports = Keyifyer;
