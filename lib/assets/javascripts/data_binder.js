//= require underscore
//= require underscore_extensions
//= require models/dom_proxy
(function() {
  'use strict';
  var exports = this;

  function DataBinder(model, element) {
    var self = this;

    function bind(model, element) {
      _.each(element.children, function(childElement) {
        var identifier = childElement.dataset.bind;
        if (identifier) {
          if (childElement.tagName === 'DIV') {
            new DomProxy(model[identifier], childElement);
            bind(model[identifier], childElement);
          } else {
            new DomProxy(model, childElement);
          }
        }
      });
    }

    function initialize() {
      bind(model, element);
    }

    initialize();
    return self;
  }

  exports.DataBinder = DataBinder;
}).call(this);
