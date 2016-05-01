(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
  width: 700,
  height: 500
};


},{}],2:[function(require,module,exports){
module.exports = {
  0: "\\",
  8: "backspace",
  9: "tab",
  12: "num",
  13: "enter",
  16: "shift",
  17: "ctrl",
  18: "alt",
  19: "pause",
  20: "caps",
  27: "esc",
  32: "space",
  33: "pageup",
  34: "pagedown",
  35: "end",
  36: "home",
  37: "left",
  38: "up",
  39: "right",
  40: "down",
  44: "print",
  45: "insert",
  46: "delete",
  48: "0",
  49: "1",
  50: "2",
  51: "3",
  52: "4",
  53: "5",
  54: "6",
  55: "7",
  56: "8",
  57: "9",
  65: "a",
  66: "b",
  67: "c",
  68: "d",
  69: "e",
  70: "f",
  71: "g",
  72: "h",
  73: "i",
  74: "j",
  75: "k",
  76: "l",
  77: "m",
  78: "n",
  79: "o",
  80: "p",
  81: "q",
  82: "r",
  83: "s",
  84: "t",
  85: "u",
  86: "v",
  87: "w",
  88: "x",
  89: "y",
  90: "z",
  91: "cmd",
  92: "cmd",
  93: "cmd",
  96: "num_0",
  97: "num_1",
  98: "num_2",
  99: "num_3",
  100: "num_4",
  101: "num_5",
  102: "num_6",
  103: "num_7",
  104: "num_8",
  105: "num_9",
  106: "num_multiply",
  107: "num_add",
  108: "num_enter",
  109: "num_subtract",
  110: "num_decimal",
  111: "num_divide",
  112: "f1",
  113: "f2",
  114: "f3",
  115: "f4",
  116: "f5",
  117: "f6",
  118: "f7",
  119: "f8",
  120: "f9",
  121: "f10",
  122: "f11",
  123: "f12",
  124: "print",
  144: "num",
  145: "scroll",
  186: ";",
  187: "=",
  188: ",",
  189: "-",
  190: ".",
  191: "/",
  192: "`",
  219: "[",
  220: "\\",
  221: "]",
  222: "\'",
  223: "`",
  224: "cmd",
  225: "alt",
  57392: "ctrl",
  63289: "num",
  59: ";",
  61: "=",
  173: "-"
};


},{}],3:[function(require,module,exports){
var Field;

Field = (function() {
  function Field() {
    return true;
  }

  return Field;

})();

module.exports = new Field();


},{}],4:[function(require,module,exports){
var GameLoop,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

GameLoop = (function(superClass) {
  extend(GameLoop, superClass);

  function GameLoop() {
    this.onUpdate = bind(this.onUpdate, this);
    this.onAnimationFrame = bind(this.onAnimationFrame, this);
    this.ticker = createjs.Ticker;
    this.ticker.framerate = 50;
    this.ticker.timingMode = 'RAF';
    this.keys = require('./keys.coffee');
    this.field = require('./field.coffee');
    this.mode = 'build';
  }

  GameLoop.prototype.pause = function() {
    return this.ticker.removeAllEventListeners();
  };

  GameLoop.prototype.resume = function() {
    return this.ticker.addEventListener('tick', this.onAnimationFrame);
  };

  GameLoop.prototype.onAnimationFrame = function() {
    return true;
  };

  GameLoop.prototype.onUpdate = function() {
    return true;
  };

  return GameLoop;

})(createjs.EventDispatcher);

module.exports = new GameLoop();


},{"./field.coffee":3,"./keys.coffee":5}],5:[function(require,module,exports){
var Keys, keyDictionary,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

keyDictionary = require('./config/keyDictionary.coffee');

Keys = (function() {
  function Keys() {
    this._keyupHandler = bind(this._keyupHandler, this);
    this._keydownHandler = bind(this._keydownHandler, this);
    var code, i, len, name;
    this.keys = {};
    for (name = i = 0, len = keyDictionary.length; i < len; name = ++i) {
      code = keyDictionary[name];
      this.keys[name] = false;
    }
    document.addEventListener('keydown', this._keydownHandler);
    document.addEventListener('keyup', this._keyupHandler);
  }

  Keys.prototype._keydownHandler = function(e) {
    return this.keys[e.keyCode] = true;
  };

  Keys.prototype._keyupHandler = function(e) {
    return this.keys[e.keyCode] = false;
  };

  Keys.prototype.pressed = function(key) {
    return this.keys[key];
  };

  return Keys;

})();

module.exports = new Keys();


},{"./config/keyDictionary.coffee":2}],6:[function(require,module,exports){
var gameLoop, gameSettings;

gameLoop = require('./gameLoop.coffee');

gameSettings = require('./config/gameSettings.coffee');

document.addEventListener('DOMContentLoaded', function() {
  var canvas;
  canvas = document.createElement('canvas');
  canvas.setAttribute('width', gameSettings.width);
  canvas.setAttribute('height', gameSettings.height);
  canvas.setAttribute('style', 'border: solid thin black;display: inline-block;margin: 10px');
  document.body.appendChild(canvas);
  return gameLoop.resume();
});


},{"./config/gameSettings.coffee":1,"./gameLoop.coffee":4}]},{},[6]);
