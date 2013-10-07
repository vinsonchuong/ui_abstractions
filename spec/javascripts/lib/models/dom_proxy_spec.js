//= require spec_helper
//= require models/dom_proxy
describe('DomProxy', function() {
  describe('for simple elements', function() {
    function itProxies(elementHtml, options) {
      describe('when proxying ' + elementHtml, function() {
        var domProxy, model, $element;
        beforeEach(function() {
          $element = $(elementHtml)
          model = new Model({identifier: options.initialValue});
          domProxy = new DomProxy(model, $element[0]);
        });

        it('initializes its DOM element', function() {
          expect(options.get($element)).toEqual(options.initialValue);
        });

        describe('when the model is updated', function() {
          beforeEach(function() {
            model.identifier = options.changedValue;
          });

          it('updates its DOM element', function() {
            expect(options.get($element)).toEqual(options.changedValue);
          });
        });

        if (options.set) {
          describe('when the DOM element is updated', function() {
            beforeEach(function() {
              options.set($element, options.changedValue);
            });

            it('updates the model', function() {
              expect(model.identifier).toEqual(options.changedValue);
            });
          });
        }
      });
    }

    itProxies('<textarea data-bind="identifier"></textarea>', {
      get: function($element) { return $element.val(); },
      set: function($element, value) { $element.val(value).simulate('change'); },
      initialValue: 'initial text',
      changedValue: 'updated text'
    });

    itProxies('<input type="text" data-bind="identifier"/>', {
      get: function($element) { return $element.val(); },
      set: function($element, value) { $element.val(value).simulate('change'); },
      initialValue: 'initial text',
      changedValue: 'updated text'
    });

    itProxies('<input type="checkbox" data-bind="identifier"/>', {
      get: function($element) { return $element.prop('checked'); },
      set: function($element, value) { $element.prop('checked', value).simulate('change'); },
      initialValue: false,
      changedValue: true
    });

    itProxies('<span data-bind="identifier"></span>', {
      get: function($element) { return $element.text(); },
      initialValue: 'initial text',
      changedValue: 'updated text'
    });
  });

  describe('for container elements', function() {
    function itProxies(elementHtml) {
      describe('when proxying ' + elementHtml, function() {
        var domProxy, model, $element;
        beforeEach(function() {
          model = new Model({foo: true, bar: false, baz: 'text'});
          $element = $(elementHtml)
          domProxy = new DomProxy(model, $element[0]);
        });

        it('updates its DOM element', function() {
          expect($element).toHaveClass('foo');
          expect($element).not.toHaveClass('bar');
          expect($element).not.toHaveClass('baz');
        });

        describe('when the model is updated', function() {
          beforeEach(function() {
            model.bar = true;
          });

          it('updates its DOM element', function() {
            expect($element).toHaveClass('foo');
            expect($element).toHaveClass('bar');
            expect($element).not.toHaveClass('baz');
          });
        });
      });
    }

    itProxies('<div></div>');
    itProxies('<article></article>');
    itProxies('<section></section>');
    itProxies('<aside></aside>');
    itProxies('<hgroup></hgroup>');
    itProxies('<nav></nav>');
    itProxies('<header></header>');
    itProxies('<footer></footer>');
    itProxies('<figure></figure>');
    itProxies('<figcaption></figcaption>');
  });

  describe('for list elements', function() {
  });
});
