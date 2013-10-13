//= require underscore
//= require underscore_extensions
(function() {
  'use strict';
  var exports = this, _ = exports._;

  function define(obj, name, value) {
    Object.defineProperty(obj, name, {value: value, writable: true});
  }

  function Collection(attributes) {
    var self = this,
        array = [];

    function synchronizeLength() {
      _.each(_.range(self.length, array.length), function(i) {
        Object.defineProperty(self, i, {
          get: function() { return array[i]; },
          set: function(newValue) { array[i] = newValue; },
          configurable: true,
          enumerable: true
        });
      });
      _.each(_.range(array.length, self.length), function(i) {
        delete self[i];
      });
      self.length = array.length;
    }

    function mutate(mutator) {
      var previousArray = _.clone(array),
          result = mutator.apply(array, _.rest(arguments)),
          remaining = _.intersection(array, previousArray),
          lcs = _.longestCommonSubsequence(previousArray, remaining);
      synchronizeLength();
      self.notify({
        removed: _.map(_.difference(previousArray, remaining), function(val) {
          return {
            value: val,
            from: _.indexOf(previousArray, val)
          };
        }),
        added: _.map(_.difference(array, remaining), function(val) {
          return {
            value: val,
            to: _.indexOf(array, val)
          };
        }),
        moved: _.map(_.difference(remaining, lcs), function(val) {
          return {
            value: val,
            from: _.indexOf(previousArray, val),
            to: _.indexOf(array, val)
          };
        })
      });
      return _.contains([array.sort, array.reverse], mutator) ? self : result;
    }

    define(self, 'define', _.partial(define, self));

    self.define('notify', function(changes) {
    });

    _.each(
      ['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'],
      function(name) {
        self.define(name, _.wrap(array[name], mutate));
      }
    );

    _.each(
      [
        'concat', 'join', 'slice', 'toSource', 'toString', 'indexOf',
        'lastIndexOf', 'forEach', 'every', 'some', 'filter', 'map', 'reduce',
        'reduceRight'
      ],
      function(name) {
        self.define(name, _.bind(array[name], array));
      }
    );

    function initialize() {
      _.each(attributes, function(value, i) {
        array.push(
          value instanceof Model && value ||
          value instanceof Collection && value ||
          _.isArray(value) && new Collection(value) ||
          _.isObject(value) && new Model(value) ||
          value
        );

      });
      self.define('length', 0);
      synchronizeLength();
    }

    initialize();
    return self;
  }

  exports.Collection = Collection;
}).call(this);
