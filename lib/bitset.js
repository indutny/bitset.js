'use strict';

var BitField = require('bitfield.js');
var binarySearch = require('binary-search');

function Item(index, value) {
  this.index = index;
  this.value = value;
}

function BitSet(size) {
  this.field = new BitField(size);
  this.list = [];
}
module.exports = BitSet;

function sort(haystack, needle) {
  return haystack.index - needle;
}

BitSet.prototype.add = function add(index, value) {
  if (!this.field.set(index))
    return false;

  var off = binarySearch(this.list, index, sort);
  off = -1 - off;

  var item = new Item(index, value);
  this.list.splice(off, 0, item);

  return true;
};

BitSet.prototype.remove = function remove(index) {
  if (!this.field.check(index))
    return false;

  this.field.clear(index);
  var index = binarySearch(this.list, index, sort);
  this.list.splice(index, 1);

  return true;
};

BitSet.prototype.check = function check(index) {
  return this.field.check(index);
};

BitSet.prototype.union = function union(other) {
  var i = this.list.length - 1;
  var j = other.list.length - 1;
  while (i >= 0 && j >= 0) {
    var a = this.list[i];
    var b = other.list[j];

    if (a.index === b.index) {
      i--;
      j--;
      continue;
    }

    if (a.index > b.index) {
      i--;
      continue;
    }

    this.field.set(b.index);
    this.list.splice(i + 1, 0, b);
    j--;
  }

  while (j >= 0) {
    var b = other.list[j];
    this.field.set(b.index);
    this.list.unshift(b);
    j--;
  }
};

BitSet.prototype.wipe = function wipe() {
  this.field.wipe();
  this.list = [];
};
