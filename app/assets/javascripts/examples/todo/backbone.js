//= require backbone
//= require underscore
//= require underscore_extensions
//= require handlebars.runtime
//= require templates/todo/index
//= require templates/todo/show

(function() {
  'use strict';
  var exports = this;

  function Backbone(options) {
    var self = new exports.Backbone.View(options);

    function addTask(e) {
      e.preventDefault();
      var title = self.$('.task_input .title').val();
      if (title) {
        self.collection.add({title: title});
      }
    }

    function deleteTask(e) {
      e.preventDefault();
      var cid = self.$(e.target).closest('.task').data('cid');
      self.collection.remove(cid);
    }

    function render() {
      self.$el.html(JST['templates/todo/index']({
        tasks: self.collection.map(function(task) {
          return _.extend({cid: task.cid}, task.toJSON());
        })
      }));
    }

    function initialize() {
      self.collection = new exports.Backbone.Collection();
      self.listenTo(self.collection, 'add remove', render);
      self.delegateEvents({
        'submit .task_input': addTask,
        'click .task .delete': deleteTask
      });
      render();
    }

    initialize(options);
    return self;
  }

  _.namespace(exports, 'UiAbstractions.Examples.Todo').Backbone = Backbone;
}).call(this);
