var assert = require('assert');

var BitSet = require('../');

describe('BitSet.js', function() {
  var s;
  beforeEach(function() {
    s = new BitSet(1024);
  });

  it('should add values to the set', function() {
    s.add(1, 'hello');
    s.add(2, 'world');
    s.add(0, '@');

    assert(s.check(0));
    assert(s.check(1));
    assert(s.check(2));
    assert(s.list[0].value, '@');
    assert(s.list[1].value, 'hello');
    assert(s.list[2].value, 'world');
  });

  it('should remove values from the set', function() {
    s.add(1, 'hello');
    s.add(2, 'world');
    s.add(0, '@');

    s.remove(1);

    assert(s.check(0));
    assert(!s.check(1));
    assert(s.check(2));
    assert(s.list[0].value, '@');
    assert(s.list[1].value, 'world');
  });

  it('should form union with other set', function() {
    s.add(1, '1');
    s.add(3, '3');
    s.add(5, '5');
    s.add(8, '8');

    var other = new BitSet(1024);
    other.add(-1, '-1');
    other.add(0, '0');
    other.add(2, '2');
    other.add(3, '3');
    other.add(4, '4');
    other.add(6, '6');

    s.union(other);
    assert.deepEqual(s.list.map(function(item) {
      return item.value;
    }), [
      '-1', '0', '1', '2', '3', '4', '5', '6', '8'
    ]);
  });
});
