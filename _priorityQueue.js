class MyPriorityQueue {
  constructor(comparator) {
    // this.queue = new ArrayQueue(comparator);
    // this.queue = new LinkedList(comparator);
    this.queue = new Heap(comparator);
  }

  size() {
    return this.queue.size();
  }

  enqueue(item) {
    this.queue.insert(item);
  }

  dequeue() {
    return this.queue.removeRoot();
  }
}

class ArrayQueue {
  constructor(comparator) {
    this.comparator = comparator;
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  insert(item) {
    this.items.push(item);
  }

  removeRoot() {
    this.items.sort((a, b) => -1 * this.comparator(a, b));
    return this.items.pop();
  }
}

class LinkedList {
  constructor(comparator) {
    this.comparator = comparator;
    this.head = null;
    this.length = 0;
  }

  size() {
    return this.length;
  }

  removeRoot() {
    if (!this.head) {
      return null;
    }

    const node = this.head;
    this.head = this.head.next;

    this.length--;

    return node.val;
  }

  insert(item) {
    const node = new Node(item);
    if (!this.head || this.comparator(item, node.val) < 0) {
      node.next = this.head;
      this.head = node;
    } else {
      let currNode = this.head;
      while (currNode.next && this.comparator(item, currNode.next.val) >= 0) {
        currNode = currNode.next;
      }

      node.next = currNode.next;
      currNode.next = node;
    }
    this.length++;
  }
}

class Node {
  constructor(val, prev, next) {
    this.val = val;
    this.prev = prev ?? null;
    this.next = next ?? null;
  }
}

class Heap {
  constructor(comparator, nums) {
    this.comparator = comparator;
    this.nums = nums ?? [];
    this.build();
  }

  size() {
    return this.nums.length;
  }

  build() {
    for (let i = Math.floor(this.nums.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }

  peek() {
    return this.nums[0];
  }

  insert(val) {
    if (this.nums.length === this.sizeLimit) {
      if (!this.shouldSwap(this.nums[0], val)) {
        return;
      } else {
        this.nums[0] = val;
        this.heapifyDown(0);
      }
    } else {
      this.nums.push(val);
      this.heapifyUp(this.nums.length - 1);
    }
  }

  removeRoot() {
    this.swap(0, this.nums.length - 1);
    const item = this.nums.pop();

    this.heapifyDown(0);

    return item;
  }

  heapifyUp(targetIndex) {
    while (targetIndex) {
      const parentIndex = this.getParentIndex(targetIndex);
      if (this.shouldSwap(targetIndex, parentIndex)) {
        this.swap(targetIndex, parentIndex);
        targetIndex = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown(targetIndex) {
    while (targetIndex < this.nums.length) {
      let swapIndex = targetIndex;
      swapIndex = this.getSwapIndex(1, targetIndex, swapIndex);
      swapIndex = this.getSwapIndex(2, targetIndex, swapIndex);

      if (swapIndex === targetIndex) {
        break;
      }

      this.swap(swapIndex, targetIndex);
      targetIndex = swapIndex;
    }
  }

  getSwapIndex(childNum, targetIndex, swapIndex) {
    const childIdx = targetIndex * 2 + childNum;

    return childIdx < this.nums.length
      && this.shouldSwap(childIdx, swapIndex) ? childIdx : swapIndex;
  }

  shouldSwap(childIdx, parentIdx) {
    return this.comparator(this.nums[childIdx], this.nums[parentIdx]) <= 0;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  swap(i, j) {
    const temp = this.nums[i];
    this.nums[i] = this.nums[j];
    this.nums[j] = temp;
  }
}