//= require underscore
//= require underscore_extensions
//= require collections/collection
(function() {
  'use strict';
  var exports = this, _ = exports._;

  function define(model, name, implementation) {
    Object.defineProperty(model, name, {
      value: implementation,
      configurable: false,
      enumerable: false,
      writable: true
    });
  }

  function Model(attributes) {
    var self = this,
        targets = [];

    define(self, 'define', _.partial(define, self));

    self.define('override', function(name, implementation) {
      self[name] = _.wrap(self[name], implementation);
    });

    self.define('bind', function(target) {
      if (targets.indexOf(target) !== -1) { return; }
      targets.push(target);
    });

    self.define('unbind', function(target) {
      if (targets.indexOf(target) === -1) { return; }
      targets.splice(targets.indexOf(target), 1);
    });

    self.define('notify', function(key, value) {
      _.each(targets, function(target) {
        if (target[key] !== value) {
          target[key] = value;
        }
      });
    })

    function initialize() {
      _.each(attributes, function(value, key) {
        value = value instanceof Model && value ||
                value instanceof Collection && value ||
                _.isArray(value) && new Collection(value) ||
                _.isObject(value) && new Model(value) ||
                value;

        Object.defineProperty(self, key, {
          get: function() { return value; },
          set: function(newValue) { self.notify(key, value = newValue); },
          configurable: false,
          enumerable: true
        });
      });

      if (attributes instanceof Model) {
        attributes.bind(self);
        self.bind(attributes);
      }
    }

    initialize();
    return self;
  }

  exports.Model = Model;
}).call(this);
