//= require spec_helper
//= require underscore_extensions
describe('underscore_extensions', function() {
  describe('_.lookup', function() {
    it('converts an array of strings into a lookup map', function() {
      expect(_.lookup(['a', 'b', 'c'])).toEqual({a: true, b: true, c: true});
    });
  });

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

  describe('_.override', function() {
    var object, overrides, parentMethod1, parentMethod2, childMethod1;
    beforeEach(function() {
      object = {
        method1: parentMethod1 = jasmine.createSpy('parent#method1'),
        method2: parentMethod2 = jasmine.createSpy('parent#method2')
      };
      overrides = {
        method1: childMethod1 = jasmine.createSpy('child#method1')
      };
      _.override(object, overrides);
    });

    it('wraps each overriden method', function() {
      object.method1();
      expect(childMethod1).toHaveBeenCalledWith(parentMethod1);
    });

    it('does not modify non-overriden methods', function() {
      object.method2();
      expect(parentMethod2).toHaveBeenCalled();
    });
  });

  describe('_.nestedEach', function() {
    it('is the same as nested calls to _.each', function() {
      var result = [];
      _.nestedEach(['a', 'b'], ['x', 'y'], function(x, i, y, j) {
        result.push([x, i, y, j]);
      })
      expect(result).toEqual([
        ['a', 0, 'x', 0],
        ['a', 0, 'y', 1],
        ['b', 1, 'x', 0],
        ['b', 1, 'y', 1]
      ]);
    });
  });

  describe('_.longestCommonSubsequence', function() {
    var lcs = _.longestCommonSubsequence;
    it('computes the longest common subsequence for two arrays', function() {
      expect(lcs([1, 2, 3], [1, 2, 3])).toEqual([1, 2, 3]);
      expect(lcs([2, 3], [1, 2, 3])).toEqual([2, 3]);
      expect(lcs([1, 2, 3], [2, 3])).toEqual([2, 3]);
      expect(lcs([1], [2, 3])).toEqual([]);
      expect(lcs([2], [1, 2, 3])).toEqual([2]);

      expect(lcs([2, 1, 3], [1, 2, 3])).toEqual([1, 3]);
      expect(lcs([2, 3, 1], [1, 2, 3])).toEqual([2, 3]);
    });
  });
});
