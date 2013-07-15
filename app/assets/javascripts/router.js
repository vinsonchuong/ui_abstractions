//= require underscore
//= require underscore_extensions
//= require jquery
//= require backbone
//= require_tree ./examples

(function() {
  'use strict';
  var exports = this,
      UiAbstractions = _.namespace(exports, 'UiAbstractions');

  function Router() {
    var self = new Backbone.Router({
      routes: {
        ':name/:implementation': showImplementation
      }
    });

    function showImplementation(name, implementation) {
      new UiAbstractions.Examples[name][implementation]();
    }

    return self;
  }

  UiAbstractions.Router = Router;
}).call(this);
