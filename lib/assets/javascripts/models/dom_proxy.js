//= require underscore
//= require underscore_extensions
//= require models/model
(function() {
  'use strict';
  var exports = this, _ = exports._;

  function getPropertyName(element) {
    return element.tagName === 'SPAN' ? 'textContent' :
           element.type === 'checkbox'? 'checked' :
           'value';
  }

  var containerElements = _.lookup([
    'div', 'article', 'section', 'aside', 'hgroup', 'nav', 'header', 'footer',
    'figure', 'figcaption'
  ]);
  function isContainer(element) {
    return containerElements[element.tagName.toLowerCase()];
  }

  function DomProxy(model, element) {
    var modelIdentifier = element.dataset.bind,
        domIdentifier = getPropertyName(element),
        self = new Model(model);

    self.override('notify', function(parent, key, value) {
      parent.apply(self, _.rest(arguments));
      if (isContainer(element) && _.isBoolean(value)) {
        element.classList[value ? 'add' : 'remove'](key);
      } else if (key === modelIdentifier || element[domIdentifier] === value) {
        element[domIdentifier] = value;
      }
    });

    function initialize() {
      if (_.include(['INPUT', 'TEXTAREA'], element.tagName)) {
        element.addEventListener('change', function() {
          self[modelIdentifier] = element[domIdentifier];
        });
      }

      if (isContainer(element)) {
        _.each(self, function(value, key) {
          if (_.isBoolean(value)) {
            element.classList[value ? 'add' : 'remove'](key);
          }
        });
      } else {
        element[domIdentifier] = self[modelIdentifier];
      }
    }

    initialize();
    return self;
  }

  exports.DomProxy = DomProxy;
}).call(this);
