//= require spec_helper
//= require models/model
describe('Model', function() {
  var model;
  beforeEach(function() {
    model = new Model({foo: 1, bar: 2});
  });

  it('has the given attributes', function() {
    expect(model.foo).toEqual(1);
    expect(model.bar).toEqual(2);

    model.foo = 'new value';
    expect(model.foo).toEqual('new value');
  });

  it('enumerates only its attributes', function() {
    expect(_.keys(model)).toEqual(['foo', 'bar']);
  });

  describe('#bind', function() {
    var target;
    beforeEach(function() {
      model.bind(target = {});
    });

    describe('when an attribute is updated', function() {
      describe('and the target does not already have the updated value', function() {
        beforeEach(function() {
          model.foo = 'new value';
        });

        it('updates the target', function() {
          expect(target.foo).toEqual('new value');
        });
      });

      describe('and the target already has the updated value', function() {
        var setSpy;
        beforeEach(function() {
          Object.defineProperty(target, 'foo', {
            get: function() { return 'new value'; },
            set: setSpy = jasmine.createSpy('set')
          });
          model.foo = 'new value';
        });

        it('does not update the target', function() {
          expect(setSpy).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('#unbind', function() {
    var target;
    beforeEach(function() {
      target = new Model({});
      model.bind(target);
      model.unbind(target);
    });

    it('stops further change propagation', function() {
      model.foo = 'new value';
      expect(target.foo).not.toEqual('new value');
    });
  });

  describe('#notify', function() {
    beforeEach(function() {
      spyOn(model, 'notify');
    });

    describe('when an attribute is updated', function() {
      beforeEach(function() {
        model.foo = 'new value';
      });

      it('is called', function() {
        expect(model.notify).toHaveBeenCalled();
      });
    });
  });

  describe('when constructed given a model instance', function() {
    var boundModel;
    beforeEach(function() {
      boundModel = new Model(model);
    });

    it('has the attributes of the given model', function() {
      expect(_.keys(model)).toEqual(['foo', 'bar']);
      expect(model.foo).toEqual(1);
      expect(model.bar).toEqual(2);
    });

    describe('when its attributes are updated', function() {
      beforeEach(function() {
        boundModel.foo = 'new value';
      });

      it('updates the given model', function() {
        expect(model.foo).toBe('new value');
      });
    });

    describe("when the given model's attributes are updated", function() {
      beforeEach(function() {
        model.bar = 'new value';
      });

      it('updates', function() {
        expect(boundModel.bar).toBe('new value');
      });
    });
  });

  describe('when a chain of models is constructed', function() {
    var model2, model3;
    beforeEach(function() {
      model2 = new Model(model);
      model3 = new Model(model2);

      spyOn(model, 'notify').andCallThrough();
      spyOn(model2, 'notify').andCallThrough();
      spyOn(model3, 'notify').andCallThrough();
    });

    it('propagates changes correctly', function() {
      model.foo = 'from 1';
      expect(model.foo).toBe('from 1');
      expect(model2.foo).toBe('from 1');
      expect(model3.foo).toBe('from 1');
      expect(model.notify).toHaveBeenCalledWith('foo', 'from 1');
      expect(model2.notify).toHaveBeenCalledWith('foo', 'from 1');
      expect(model3.notify).toHaveBeenCalledWith('foo', 'from 1');

      model.notify.reset();
      model2.notify.reset();
      model3.notify.reset();

      model2.foo = 'from 2'
      expect(model.foo).toBe('from 2');
      expect(model2.foo).toBe('from 2');
      expect(model3.foo).toBe('from 2');
      expect(model.notify).toHaveBeenCalledWith('foo', 'from 2');
      expect(model2.notify).toHaveBeenCalledWith('foo', 'from 2');
      expect(model3.notify).toHaveBeenCalledWith('foo', 'from 2');

      model.notify.reset();
      model2.notify.reset();
      model3.notify.reset();

      model3.foo = 'from 3'
      expect(model.foo).toBe('from 3');
      expect(model2.foo).toBe('from 3');
      expect(model3.foo).toBe('from 3');
      expect(model.notify).toHaveBeenCalledWith('foo', 'from 3');
      expect(model2.notify).toHaveBeenCalledWith('foo', 'from 3');
      expect(model3.notify).toHaveBeenCalledWith('foo', 'from 3');
    });
  });

  describe('when constructed given arbitrary JSON', function() {
    beforeEach(function() {
      model = new Model({foo: {bar: 1, baz: [{a: 1}, {a: 2}]}});
    });

    it('wraps the objects and arrays', function() {
      expect(model.foo).toEqual(jasmine.any(Model));
      expect(model.foo.baz).toEqual(jasmine.any(Collection));
    });
  });
});
