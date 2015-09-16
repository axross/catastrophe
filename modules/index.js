(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var __url = '';
var __factorCaches = {};
var __middleware = function __middleware(info, done) {
  done();
};

var factorGetters = {
  userAgent: function userAgent() {
    return window.navigator.userAgent;
  },
  language: function language() {
    return window.navigator.language;
  },
  online: function online() {
    if ('onLine' in window.navigator) return window.navigator.onLine;

    return true;
  },
  screenDirection: function screenDirection() {
    return ['portrait', 'landscape'][(screen.width > screen.height) - 0];
  }
};

var getFactor = function getFactor(factor) {
  if (typeof factorGetters[factor] !== 'function') return;

  __factorCaches[factor] = factorGetters[factor]();

  return __factorCaches[factor];
};

var errorHandler = function errorHandler(message, url, lineNumber, columnNumber, err) {
  var info = {
    message: message,
    url: url,
    lineNumber: lineNumber,
    columnNumber: columnNumber,
    err: err
  };

  __middleware(info, function () {
    var stringifiedQueries = querystring.stringify(info);

    new Image(__url + '?' + stringifiedQueries);
  });
};

var attach = function attach(init) {
  if (typeof init.url === 'string') {
    __url = init.url;
  } else {
    throw new Error('');
  }

  if (Array.isArray(init.factors)) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = init.factors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        factor = _step.value;

        getFactor(factor);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  if (typeof init.middleware === 'function') {
    __middleware = init.middleware;
  }

  window.addEventListener('error', errorHandler);
};

exports['default'] = {
  getFactor: getFactor,
  attach: attach
};
module.exports = exports['default'];

},{}]},{},[1]);
