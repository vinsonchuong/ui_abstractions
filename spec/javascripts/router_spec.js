//= require spec_helper
//= require router
//= require jquery
//= require backbone
//= require underscore
//= require underscore_extensions

describe('UiAbstractions.Router', function() {
  var router;
  beforeEach(function() {
    router = new UiAbstractions.Router();
    Backbone.history.start({silent: true});
    router.navigate('', {trigger: true});
  });

  afterEach(function() {
    router.navigate('', {trigger: true});
    Backbone.history.stop();
  })

  describe(':name/:implementation', function() {
    beforeEach(function() {
      _.namespace(UiAbstractions, 'Examples.Example').Implementation = jasmine.createSpy('example');
      router.navigate('Example/Implementation', {trigger: true});
    });

    it('creates the example', function() {
      expect(UiAbstractions.Examples.Example.Implementation).toHaveBeenCalled();
    });
  });
});
