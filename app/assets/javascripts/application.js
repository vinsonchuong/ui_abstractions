//= require underscore
//= require underscore_extensions
//= require jquery
//= require backbone
//= require router

(function() {
  'use strict';
  var exports = this,
      UiAbstractions = _.namespace(exports, 'UiAbstractions');

  UiAbstractions.router = new UiAbstractions.Router();
  Backbone.history.start({root: '/examples', pushState: true});
}).call(this);
