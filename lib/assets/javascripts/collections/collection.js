//= require underscore
//= require underscore_extensions
(function() {
  'use strict';
  var exports = this, _ = exports._;

  var mutatorMethods = [
    'pop', 'push', 'reverse', 'shift',
    'sort', 'splice', 'unshift'
  ];
  var accessorMethods = [
    'concat', 'join', 'slice', 'toSource', 'toString',
    'indexOf', 'lastIndexOf'
  ];
  var iterationMethods = [
    'forEach', 'every', 'some', 'filter',
    'map','reduce', 'reduceRight'
  ];

  function define(collection, name, implementation) {
    Object.defineProperty(collection, name, {
      value: implementation,
      configurable: false,
      enumerable: false,
      writable: true
    });
  }

  function Collection(array) {
    var self = this;

    function synchronize() {
      if (self.length === array.length) { return; }

      if (self.length < array.length) {
        _.each(_.range(self.length, array.length), function(i) {
          Object.defineProperty(self, i, {
            get: function() { return array[i]; },
            set: function(newValue) { array[i] = newValue; },
            configurable: true,
            enumerable: true
          });
        });
      } else {
        _.each(_.range(array.length, self.length), function(i) {
          delete self[i];
        });
      }

      self.length = array.length;
    }

    define(self, 'define', _.partial(define, self));

    _.each(Object.getOwnPropertyNames(Array.prototype), function(methodName) {
      define(self, methodName, function() {
        return _.tap(array[methodName].apply(array, arguments), synchronize);
      });
    });

    _.each(['reverse', 'sort'], function(methodName) {
      define(self, methodName, function() {
        array[methodName].apply(array, arguments);
        return self;
      });
    });

    function initialize() {
      array = _.clone(array);
      Object.defineProperty(self, 'length', {value: 0, writable: true});
      synchronize();
    }

    initialize();
    return self;
  }

  exports.Collection = Collection;
}).call(this);
