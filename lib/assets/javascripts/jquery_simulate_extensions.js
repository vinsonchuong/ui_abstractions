//= require underscore
//= require underscore_extensions
//= require jquery
//= require jquery.simulate
(function() {
  'use strict';
  var exports = this, _ = exports._, $ = exports.$;

  _.override($.simulate.prototype, {
    createEvent: function(parent, type) {
      return type === 'change' ?
        new Event('change') :
        parent.apply(this, _.rest(arguments));
    }
  });
}).call(this);
