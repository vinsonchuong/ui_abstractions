//= require underscore
(function() {
  'use strict';
  var exports = this; _ = exports._;

  function longestArray() {
    return _.max(arguments, function(array) {
      return array.length;
    });
  }

  _.mixin({
    flip: function(fn) {
      return function() {
        return fn.apply(this, _.toArray(arguments).reverse());
      };
    },

    lookup: function(keys) {
      return _.reduce(keys, function(lookup, key) {
        lookup[key] = true;
        return lookup;
      }, {});
    },

    namespace: function(obj, path) {
      return _.reduce(path.split('.'), function(obj, key) {
        if (!_.has(obj, key)) {
          obj[key] = {}
        }
        return obj[key];
      }, obj)
    },

    override: function(context, fns) {
      _.each(fns, function(fn, key) {
        context[key] = _.wrap(context[key], fn);
      });
      return context;
    },

    nestedEach: function() {
      var lists = _.initial(arguments), fn = _.last(arguments),
          iterate = _.partial(_.partial, _.each),
          wrap = _.partial(_.partial, _.partial);
      _.reduceRight(lists, function(memo, list) {
        return _.compose(iterate(list), wrap(memo));
      }, fn)();
    },

    longestCommonSubsequence: function(x, y) {
      var table = {};
      _.nestedEach(x, y, function(x_i, i, x, y_j, j, y) {
        table[[i, j]] = x_i === y_j ?
          (table[[i - 1, j - 1]] || []).concat(x_i) :
          longestArray(table[[i, j - 1]] || [], table[[i - 1, j]] || []);
      });
      return table[[x.length - 1, y.length - 1]];
    }
  });
}).call(this);
