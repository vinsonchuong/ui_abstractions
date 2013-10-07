//= require spec_helper
//= require collections/collection
describe('Collection', function() {
  var collection;
  beforeEach(function() {
    collection = new Collection(['f', 'g', 'h']);
  });

  it('has the given elements', function() {
    expect(collection).toEqual(['f', 'g', 'h']);
  });

  it('behaves like an array', function() {
    expect(collection.length).toEqual(3);

    expect(collection.push('i')).toEqual(4);
    expect(collection).toEqual(['f', 'g', 'h', 'i']);
    expect(collection.length).toEqual(4);

    expect(collection.pop()).toEqual('i');
    expect(collection).toEqual(['f', 'g', 'h']);
    expect(collection.length).toEqual(3);

    expect(collection.reverse()).toBe(collection);
    expect(collection).toEqual(['h', 'g', 'f']);
    collection.reverse();

    expect(collection.unshift('e')).toEqual(4);
    expect(collection).toEqual(['e', 'f', 'g', 'h']);
    expect(collection.length).toEqual(4);

    expect(collection.shift()).toEqual('e');
    expect(collection).toEqual(['f', 'g', 'h']);
    expect(collection.length).toEqual(3);

    expect(collection.splice(0, 3, 'a', 'b', 'c')).toEqual(['f', 'g', 'h']);
    expect(collection).toEqual(['a', 'b', 'c']);
    expect(collection.length).toEqual(3);

    expect(collection.concat(['d', 'e'])).toEqual(['a', 'b', 'c', 'd', 'e']);
    expect(collection.join()).toEqual('a,b,c');
    expect(collection.slice(1, 2)).toEqual(['b']);
    expect(collection.toString()).toEqual('a,b,c');
    expect(collection.indexOf('a')).toEqual(0);
    expect(collection.lastIndexOf('a')).toEqual(0);

    collection.forEach(function(value, i) {
      collection[i] = value + value;
    })
    expect(collection).toEqual(['aa', 'bb', 'cc']);
    _.each(['every', 'some', 'filter', 'map', 'reduce', 'reduceRight'], function(method) {
      expect(collection[method]).toEqual(jasmine.any(Function));
    });
  });
});
