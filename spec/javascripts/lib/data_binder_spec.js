//= require spec_helper
//= require data_binder
describe('DataBinder', function() {
  var subject, model, $rootEl, rootEl;
  beforeEach(function() {
    $rootEl = $('<div></div>').appendTo('#jasmine_content');
  });

  afterEach(function() {
    subject = null;
    model = null
    $rootEl.remove();
  });

  describe('<input type="text" data-bind="text" />', function() {
    beforeEach(function() {
      $rootEl.append(
        '<input type="text" value="foo" />' +
        '<input type="text" data-bind="text" />'
      );
      subject = new DataBinder(new Model({text: 'bar'}), $rootEl[0]);
    });

    it('binds correctly', function() {
      expect($rootEl.find('input:eq(0)')).toHaveValue('foo');
      expect($rootEl.find('input:eq(1)')).toHaveValue('bar');
    });
  });

  describe('<span data-bind="text"></span>', function() {
    beforeEach(function() {
      $rootEl.append(
        '<span data-bind="text"></span>' +
        '<span>bar</span>'
      );
      subject = new DataBinder(new Model({text: 'foo'}), $rootEl[0]);
    });

    it('binds correctly', function() {
      expect($rootEl.find('span:eq(0)')).toHaveText('foo');
      expect($rootEl.find('span:eq(1)')).toHaveText('bar');
    });
  });

  describe('div containing inputs and spans', function() {
    beforeEach(function() {
      $rootEl.append(
        '<div data-bind="container">' +
          '<span data-bind="text"></span>' +
          '<input type="text" data-bind="value"/>' +
        '</div>'
      );
      subject = new DataBinder(new Model({
        container: new Model({
          text: 'foo',
          value: 'bar',
          class1: true,
          class2: false,
          class3: true
        }),
      }), $rootEl[0]);
    });

    it('binds correctly', function() {
      var $container = $rootEl.find('[data-bind="container"]');
      expect($container).toHaveClass('class1');
      expect($container).not.toHaveClass('class2');
      expect($container).toHaveClass('class3');

      expect($rootEl.find('[data-bind="text"]')).toHaveText('foo');
      expect($rootEl.find('[data-bind="value"]')).toHaveValue('bar');
    });
  });

  describe('divs containing divs containing inputs and spans', function() {
    beforeEach(function() {
      $rootEl.append(
        '<div data-bind="container1">' +
          '<span data-bind="text"></span>' +
          '<input type="text" data-bind="value"/>' +
        '</div>' +
        '<div data-bind="container2">' +
          '<div data-bind="subcontainer">' +
            '<span data-bind="foo"></span>' +
            '<span data-bind="bar"></span>' +
          '</div>' +
        '</div>'
      );
      subject = new DataBinder(new Model({
        container1: new Model({
          text: 'foo',
          value: 'bar',
          class1: true,
          class2: false
        }),
        container2: new Model({
          subcontainer: new Model({
            class1: true,
            foo: '1',
            bar: '2'
          }),
          class1: false,
          class2: true
        }),
      }), $rootEl[0]);
    });

    it('binds correctly', function() {
      var $container1 = $rootEl.find('[data-bind="container1"]');
      expect($container1).toHaveClass('class1');
      expect($container1).not.toHaveClass('class2');
      expect($rootEl.find('[data-bind="text"]')).toHaveText('foo');
      expect($rootEl.find('[data-bind="value"]')).toHaveValue('bar');

      var $container2 = $rootEl.find('[data-bind="container2"]');
      expect($container2).not.toHaveClass('class1');
      expect($container2).toHaveClass('class2');

      var $subcontainer = $rootEl.find('[data-bind="subcontainer"]');
      expect($subcontainer).toHaveClass('class1');
      expect($rootEl.find('[data-bind="foo"]')).toHaveText('1');
      expect($rootEl.find('[data-bind="bar"]')).toHaveText('2');
    });
  });
});
