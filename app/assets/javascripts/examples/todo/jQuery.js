//= require underscore
//= require underscore_extensions
//= require handlebars.runtime
//= require templates/todo/index
//= require templates/todo/show

(function() {
  'use strict';
  var exports = this;

  function jQuery(options) {
    var self = this,
        $el = options.el;

    self.remove = function() {
      $el.remove();
    }

    function addTask(e) {
      e.preventDefault();
      var titleField = $el.find('.task_input .title'),
          title = titleField.val();
      if (title) {
        $el.find('.tasks').append(JST['templates/todo/show']({title: title}));
        titleField.val('');
      }
    }

    function removeTask(e) {
      e.preventDefault();
      $el.find(e.currentTarget).closest('.task').remove();
    }

    $el
      .html(JST['templates/todo/index']({}))
      .on('submit', '.task_input', addTask)
      .on('click', '.task .delete', removeTask);

    return self;
  };

  _.namespace(exports, 'UiAbstractions.Examples.Todo').jQuery = jQuery;
}).call(this);
