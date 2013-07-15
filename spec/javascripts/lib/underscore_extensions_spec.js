//= require spec_helper
//= require underscore_extensions

describe('underscore_extensions', function() {
  describe('_.namespace', function() {
    var exports, result;

    describe('when the namespace is not defined', function() {
      beforeEach(function() {
        exports = {};
        _.namespace(exports, 'first.second.third').key = 'value';
      });

      it('creates a namespace', function() {
        expect(exports.first.second.third.key).toEqual('value');
      });
    });

    describe('when the namespace is already defined', function() {
      beforeEach(function() {
        exports = {
          first: {
            a: 1,
            second: {
              b: 2
            }
          }
        };
        _.namespace(exports, 'first.second.third').key = 'value';
      });

      it('does not override the existing namespaces', function() {
        expect(exports.first.a).toEqual(1);
        expect(exports.first.second.b).toEqual(2);
        expect(exports.first.second.third.key).toEqual('value');
      });
    })
  });
});
