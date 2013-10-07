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
      var lists = _.initial(arguments);

      _.last(arguments)
    },

    longestCommonSubsequence: function(x, y) {
      var table = {};
      _.each(x, function(x_i, i) {
        _.each(y, function(y_j, j) {
          table[[i, j]] = x_i === y_j ?
            (table[[i - 1, j - 1]] || []).concat(x_i) :
            longestArray(table[[i, j - 1]] || [], table[[i - 1, j]] || []);
        });
      });
      return table[[x.length - 1, y.length - 1]];
    }
  });
}).call(this);
