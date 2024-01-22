// Final, optimized solution
// O(1) time complexity
// O(n) space complexity
// Time to complete: 27:37 min (originally 12:20 but missed a few edge cases. A bit too rushed!) + 11:09 to optimize array into linked list
// Patterns: Preprocessing
// Notes w.r.t. solution: Optimized by swapping array for linked list
/**
 * @param {string} compressedString
 */
var StringIterator = function (compressedString) {
  this.charCounts = null;

  let lastChar = compressedString[0];
  let currentCount = '';
  let currNode = null;
  for (let i = 1; i < compressedString.length; i++) {
    if (!isNaN(parseInt(compressedString[i]))) {
      currentCount += compressedString[i];
    }

    if (isNaN(parseInt(compressedString[i])) || i === compressedString.length - 1) {
      const newNode = {
        val: lastChar,
        count: parseInt(currentCount),
        next: null
      };

      if (!currNode) {
        this.charCounts = newNode;
        currNode = this.charCounts;
      } else {
        currNode.next = newNode;
        currNode = newNode;
      }

      currentCount = '';
      lastChar = compressedString[i];
    }
  }
};

/**
* @return {character}
*/
StringIterator.prototype.next = function () {
  if (this.hasNext()) {
    let char = this.charCounts.val;
    this.charCounts.count--;

    if (this.charCounts.count === 0) {
      this.charCounts = this.charCounts.next;
    }

    return char;
  } else {
    return ' ';
  }
};

/**
* @return {boolean}
*/
StringIterator.prototype.hasNext = function () {
  return !!this.charCounts;
};

// /**
// * Your StringIterator object will be instantiated and called as such:
// * var obj = new StringIterator(compressedString)
// * var param_1 = obj.next()
// * var param_2 = obj.hasNext()
// */

// // First, inefficient solution
// // O(n) time complexity
// // O(n) space complexity
// // Time to complete: 27:37 min (originally 12:20 but missed a few edge cases. A bit too rushed!)
// // Patterns: Preprocessing
// // Notes w.r.t. solution:

// /**
//  * @param {string} compressedString
//  */
// var StringIterator = function (compressedString) {
//   this.charCounts = [];

//   let i = 1;
//   let lastChar = compressedString[0];
//   let currentCount = '';
//   while (i < compressedString.length) {
//     if (!isNaN(parseInt(compressedString[i]))) {
//       currentCount += compressedString[i];
//     } else {
//       this.charCounts.push([lastChar, parseInt(currentCount)]);
//       currentCount = '';
//       lastChar = compressedString[i];
//     }
//     i++;
//   }
//   this.charCounts.push([lastChar, parseInt(currentCount)]);
// };

// /**
// * @return {character}
// */
// StringIterator.prototype.next = function () {
//   if (this.hasNext()) {
//     let char = this.charCounts[0][0];
//     this.charCounts[0][1] = this.charCounts[0][1] - 1;

//     if (this.charCounts[0][1] === 0) {
//       this.charCounts.shift();
//     }

//     return char;
//   } else {
//     return ' ';
//   }
// };

// /**
// * @return {boolean}
// */
// StringIterator.prototype.hasNext = function () {
//   return this.charCounts.length;
// };

// /**
// * Your StringIterator object will be instantiated and called as such:
// * var obj = new StringIterator(compressedString)
// * var param_1 = obj.next()
// * var param_2 = obj.hasNext()
// */