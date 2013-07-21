//= require spec_helper
//= require underscore
//= require underscore_extensions
//= require jquery
//= require examples/todo/jQuery

describe('Todo', function() {
  function itImplementsTheExample(implementation) {
    var namespace = 'UiAbstractions.Examples.Todo'

    describe(implementation, function() {
      var view;
      beforeEach(function() {
        view = new _.namespace(window, namespace)[implementation]({
          el: $('<div />').appendTo($('#jasmine_content'))
        });
      });

      afterEach(function() {
        view.remove();
      });

      describe('adding tasks', function() {
        beforeEach(function() {
          $('.title').val('Task 1');
          $('.add').click();

          $('.title').val('Task 2');
          $('.add').click();
        });

        function taskTitles() {
          return $('.task .title').map(function() { return $(this).text(); }).toArray();
        }

        it('adds the tasks to the list', function() {
          expect(taskTitles()).toEqual(['Task 1', 'Task 2']);
        });

        describe('deleting tasks', function() {
          beforeEach(function() {
            $('.task:contains("Task 1") .delete').click();
          });

          it('removes the task from the list', function() {
            expect(taskTitles()).toEqual(['Task 2']);
          });
        });
      });
    });
  }

  itImplementsTheExample('jQuery');
  itImplementsTheExample('Backbone');
});
