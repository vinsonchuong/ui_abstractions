//= require spec_helper
//= require jquery_simulate_extensions
describe('jquery_simulate_extensions', function() {
  it('allows "change" events to be simulated', function() {
    var $element = $('<input type="text"/>');

    var onSpy = jasmine.createSpy('on');
    $element.on('change', onSpy);

    var eventListenerSpy = jasmine.createSpy('addEventListener');
    $element[0].addEventListener('change', eventListenerSpy);

    $element.simulate('change');
    expect(onSpy).toHaveBeenCalled();
    expect(eventListenerSpy).toHaveBeenCalled();
  });
});
