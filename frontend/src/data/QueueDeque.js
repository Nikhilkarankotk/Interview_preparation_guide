// ============================================================
// BASIC QUEUE — The Ticket Line
// ============================================================
export const basicQueue = {
  id: 'basic-queue',
  patternId: 'queue-deque',
  title: 'Basic Queue',
  subtitle: 'The Ticket Line',
  type: 'basic-queue',
  difficulty: 'Easy',

  coreConcept: {
    what: 'A First-In-First-Out (FIFO) data structure where elements are added at the back (enqueue) and removed from the front (dequeue).',
    why: 'It perfectly models real-world scenarios where order matters, like waiting lines, task scheduling, and Breadth-First Search (BFS).',
    when: 'BFS traversal, processing tasks in order, or caching.',
    properties: [
      'O(1) enqueue and dequeue.',
      'Elements are processed in the exact order they arrive.',
      'Does not allow random access (you cannot access the middle directly).',
    ],
  },

  patternRecognition: {
    clues: [
      '"First come, first served".',
      '"Process tasks in order".',
      '"Level order traversal" (Trees).',
    ],
    inputs: ['Stream of incoming data'],
    constraints: ['O(1) time per operation', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Empty Queue',
      explanation: 'We start with an empty queue. The front and back pointers are set to -1. WHY: A queue uses two pointers to achieve O(1) enqueue (add to back) and dequeue (remove from front) operations. Initializing to -1 indicates the queue has no elements yet.',
      state: { queue: [], front: -1, back: -1, action: 'Queue initialized empty.' },
    },
    {
      id: 1,
      title: 'Enqueue 10',
      explanation: 'We add the value 10. Since the queue was empty, both the front and back pointers now point to the first element at index 0. WHY: The front pointer marks where we will remove elements, and the back pointer marks where we will add them.',
      state: { queue: [10], front: 0, back: 0, action: 'Enqueued 10.' },
    },
    {
      id: 2,
      title: 'Enqueue 20',
      explanation: 'We add the value 20. The back pointer advances to the new element at index 1. The front pointer stays at 0. WHY: The First-In-First-Out (FIFO) property dictates that 10 is still at the front waiting to be processed, while 20 joins the back of the line.',
      state: { queue: [10, 20], front: 0, back: 1, action: 'Enqueued 20.' },
    },
    {
      id: 3,
      title: 'Peek Front',
      explanation: 'We look at the front element without removing it. The front pointer is at index 0, so we see 10. The queue remains unchanged.',
      state: { queue: [10, 20], front: 0, back: 1, action: 'Peek returns 10.' },
    },
    {
      id: 4,
      title: 'Dequeue',
      explanation: 'We remove the front element (10). The front pointer advances to the next element (index 1). The back pointer remains at 1. WHY: We must process elements in the exact order they arrived. 10 has been served, so 20 is now next in line.',
      state: { queue: [20], front: 0, back: 0, action: 'Dequeued 10.' },
    },
    {
      id: 5,
      title: 'Enqueue 30',
      explanation: 'We add the value 30 to the back. The back pointer advances. The queue now holds [20, 30]. The front remains at index 0.',
      state: { queue: [20, 30], front: 0, back: 1, action: 'Enqueued 30.' },
    },
    {
      id: 6,
      title: 'Dequeue',
      explanation: 'We remove the front element (20). The front pointer advances. The queue now holds only [30].',
      state: { queue: [30], front: 0, back: 0, action: 'Dequeued 20.' },
    },
    {
      id: 7,
      title: 'Dequeue Last Element',
      explanation: 'We remove the last element (30). Because the queue is now empty, both the front and back pointers reset to -1.',
      state: { queue: [], front: -1, back: -1, action: 'Dequeued 30.' },
    },
    {
      id: 8,
      title: 'Check Empty',
      explanation: 'The front pointer is -1. The queue is empty. If we called dequeue again, it would return an error or null.',
      state: { queue: [], front: -1, back: -1, action: 'isEmpty returns true.', found: true },
    },
  ],

  javaCode: `import java.util.LinkedList;
import java.util.Queue;

public class BasicQueue {
    public static void main(String[] args) {
        Queue<Integer> queue = new LinkedList<>();
        
        // Enqueue
        queue.offer(10);
        queue.offer(20);
        queue.offer(30);
        
        // Dequeue
        int first = queue.poll(); // returns 10
        
        // Peek (check front without removing)
        int next = queue.peek(); // returns 20
    }
}`,

  javaExplanation: [
    { line: 'Queue<Integer> queue = new LinkedList<>();', note: 'Java\'s LinkedList implements the Queue interface.' },
    { line: 'queue.offer(10);', note: 'Adds to the back of the queue (Enqueue).' },
    { line: 'queue.poll();', note: 'Removes and returns the front element (Dequeue).' },
    { line: 'queue.peek();', note: 'Returns the front element without removing it.' },
  ],

  complexity: {
    time: 'O(1)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Adding and removing from a linked list takes O(1) time.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Using an Array and shifting elements on every removal takes O(N).',
  },

  commonMistakes: [
    { title: 'Using `.add()` instead of `.offer()`', detail: '`.add()` throws an exception if the queue is full. `.offer()` returns false, which is safer.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
    { level: 'Easy', title: 'Number of Recent Calls', url: 'https://leetcode.com/problems/number-of-recent-calls/' },
  ],

  quickRevision: [
    'FIFO (First In, First Out).',
    'offer() to enqueue.',
    'poll() to dequeue.',
    'peek() to look at front.',
  ],
};

// ============================================================
// MONOTONIC DEQUE — Sliding Window Maximum
// ============================================================
export const monotonicDeque = {
  id: 'monotonic-deque',
  patternId: 'queue-deque',
  title: 'Monotonic Deque',
  subtitle: 'The VIP Line',
  type: 'monotonic-deque',
  difficulty: 'Hard',

  coreConcept: {
    what: 'A Deque (double-ended queue) that maintains its elements in monotonic (either increasing or decreasing) order.',
    why: 'It allows us to efficiently find the maximum or minimum element in a sliding window in O(1) time, rather than O(K) time.',
    when: 'Sliding Window Maximum/Minimum, or finding the shortest subarray with a condition.',
    properties: [
      'Uses indices instead of values to track expiration.',
      'Elements are removed from the back if they are smaller than the incoming element.',
      'Elements are removed from the front if they fall out of the window.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Sliding Window Maximum".',
      '"Find the max in every window of size K".',
      '"Shortest Subarray with Sum at Least K".',
    ],
    inputs: ['Array', 'Window size K'],
    constraints: ['O(N) time', 'O(K) space'],
  },

  steps: [
    {
      id: 0,
      title: 'i = 0, Value = 1',
      explanation: 'We process the first element (1). The deque is empty, so we push its index (0). WHY: The deque stores indices, not values. Storing indices allows us to track exactly when an element falls out of the sliding window.',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [0], currentIdx: 0, k: 3, result: [], action: 'Push index 0.' },
    },
    {
      id: 1,
      title: 'i = 1, Value = 3',
      explanation: 'Value 3 is greater than the value at the back of the deque (1). We pop index 0. WHY: 1 is smaller than 3 and appears earlier, so it can never be the maximum of any future window that includes 3. We push index 1. Deque is [1].',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1], currentIdx: 1, k: 3, result: [], action: 'Pop 0. Push index 1.' },
    },
    {
      id: 2,
      title: 'i = 2, Value = -1',
      explanation: 'Value -1 is smaller than the value at the back (3). We simply push its index (2). The deque remains in decreasing order: [1, 2]. The window is now full (size 3), so the maximum is at the front of the deque: value 3.',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1, 2], currentIdx: 2, k: 3, result: [3], action: 'Push index 2. Max is 3.' },
    },
    {
      id: 3,
      title: 'i = 3, Value = -3',
      explanation: 'Value -3 is smaller than the back. We push index 3. Deque is [1, 2, 3]. The front index is 1. The current window is indices 1 to 3. The max is still at the front: 3.',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1, 2, 3], currentIdx: 3, k: 3, result: [3, 3], action: 'Push index 3. Max is 3.' },
    },
    {
      id: 4,
      title: 'i = 4, Value = 5',
      explanation: 'Value 5 is larger than everything currently in the deque. We pop indices 3, 2, and 1. WHY: Since 5 is larger and appears later, all previous elements are obsolete. We push index 4. Deque is [4]. Max becomes 5.',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [4], currentIdx: 4, k: 3, result: [3, 3, 5], action: 'Pop all. Push index 4. Max is 5.' },
    },
    {
      id: 5,
      title: 'i = 5, Value = 3',
      explanation: 'Value 3 is smaller than the back (5). We push index 5. Deque is [4, 5]. The front remains 4, which is the max (5).',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [4, 5], currentIdx: 5, k: 3, result: [3, 3, 5, 5], action: 'Push index 5. Max is 5.' },
    },
    {
      id: 6,
      title: 'i = 6, Value = 6',
      explanation: 'Value 6 is greater than 3 and 5. We pop indices 5 and 4. We push index 6. Deque is [6]. Max becomes 6.',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [6], currentIdx: 6, k: 3, result: [3, 3, 5, 5, 6], action: 'Pop 5, 4. Push index 6. Max is 6.' },
    },
    {
      id: 7,
      title: 'i = 7, Value = 7',
      explanation: 'Value 7 is greater than 6. We pop 6. Push index 7. Deque is [7]. Max becomes 7. The window slides to the end.',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [7], currentIdx: 7, k: 3, result: [3, 3, 5, 5, 6, 7], action: 'Pop 6. Push index 7. Max is 7.' },
    },
    {
      id: 8,
      title: 'Final Result',
      explanation: 'All elements processed. The final result array contains the maximums of all sliding windows: [3, 3, 5, 5, 6, 7].',
      state: { array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [7], currentIdx: 7, k: 3, result: [3, 3, 5, 5, 6, 7], action: 'Done.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class SlidingWindowMax {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int ri = 0;
        
        // Deque stores INDICES
        Deque<Integer> q = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            // 1. Remove out-of-window indices
            while (!q.isEmpty() && q.peek() < i - k + 1) {
                q.poll();
            }
            // 2. Remove smaller elements from the back
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
                q.pollLast();
            }
            // 3. Add current index
            q.offer(i);
            
            // 4. Add to result if window is full
            if (i >= k - 1) {
                result[ri++] = nums[q.peek()];
            }
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'Deque<Integer> q = new ArrayDeque<>();', note: 'A double-ended queue is used to add/remove from both ends in O(1).' },
    { line: 'q.peek() < i - k + 1', note: 'Checks if the front index is outside the current window.' },
    { line: 'nums[q.peekLast()] < nums[i]', note: 'If the new element is larger, the old ones can never be the maximum.' },
    { line: 'result[ri++] = nums[q.peek()];', note: 'The front of the deque is always the maximum of the window.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(K)',
    aux: 'O(K)',
    explanation: 'Each element is added and removed from the deque at most once.',
  },

  bruteForce: {
    time: 'O(N * K)',
    space: 'O(1)',
    note: 'For every window of size K, scan all K elements to find the max.',
  },

  commonMistakes: [
    { title: 'Storing values instead of indices', detail: 'You cannot determine if an element is out of the window without its index.' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
  ],

  quickRevision: [
    'Store indices in the deque.',
    'Pop from front if out of window.',
    'Pop from back if smaller than current.',
    'Front is the max.',
  ],
};

// ============================================================
// CIRCULAR QUEUE — Ring Buffer
// ============================================================
export const circularQueue = {
  id: 'circular-queue',
  patternId: 'queue-deque',
  title: 'Circular Queue',
  subtitle: 'Ring Buffer',
  type: 'circular-queue',
  difficulty: 'Medium',

  coreConcept: {
    what: 'A fixed-size queue that connects the end back to the beginning, reusing empty space.',
    why: 'In a standard array-based queue, removing elements from the front leaves useless gaps. A circular queue wraps around using modular arithmetic to reuse those gaps.',
    when: 'Embedded systems, buffering streams, or any situation with a fixed amount of memory.',
    properties: [
      'Uses a fixed-size array.',
      'Tracks head (front) and tail (back).',
      'Uses modulo % capacity to wrap around.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Design a Circular Queue".',
      '"Fixed-size queue".',
      'Memory is limited.',
    ],
    inputs: ['Capacity K', 'Operations'],
    constraints: ['O(1) time per operation', 'O(K) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Circular Queue',
      explanation: 'We create an array of fixed capacity 3. Both the head and tail start at 0, and the size is 0. WHY: By tracking the size explicitly, we can easily distinguish between a full queue and an empty queue. (In a naive implementation where head == tail, it is impossible to tell if it is empty or full without a size or boolean flag).',
      state: { queue: [null, null, null], head: 0, tail: 0, size: 0, capacity: 3, action: 'Initialized empty queue.' },
    },
    {
      id: 1,
      title: 'Enqueue 10',
      explanation: 'We place 10 at the tail index (0). The tail advances to (0 + 1) % 3 = 1. The size becomes 1.',
      state: { queue: [10, null, null], head: 0, tail: 1, size: 1, capacity: 3, action: 'Enqueued 10.' },
    },
    {
      id: 2,
      title: 'Enqueue 20',
      explanation: 'We place 20 at the tail index (1). The tail advances to (1 + 1) % 3 = 2. The size becomes 2.',
      state: { queue: [10, 20, null], head: 0, tail: 2, size: 2, capacity: 3, action: 'Enqueued 20.' },
    },
    {
      id: 3,
      title: 'Enqueue 30',
      explanation: 'We place 30 at the tail index (2). The tail advances to (2 + 1) % 3 = 0 (wraps around!). The size becomes 3. WHY: The modulo operator allows the queue to use the empty spaces at the beginning of the array.',
      state: { queue: [10, 20, 30], head: 0, tail: 0, size: 3, capacity: 3, action: 'Enqueued 30. Tail wraps to 0.' },
    },
    {
      id: 4,
      title: 'Check isFull',
      explanation: 'The size (3) equals the capacity (3). The queue is full. We cannot enqueue any more elements until we dequeue to free up space.',
      state: { queue: [10, 20, 30], head: 0, tail: 0, size: 3, capacity: 3, action: 'isFull returns true.' },
    },
    {
      id: 5,
      title: 'Dequeue',
      explanation: 'We remove the element at the head (index 0). The head advances to (0 + 1) % 3 = 1. The size becomes 2. The slot at index 0 is now free.',
      state: { queue: [null, 20, 30], head: 1, tail: 0, size: 2, capacity: 3, action: 'Dequeued 10.' },
    },
    {
      id: 6,
      title: 'Enqueue 40',
      explanation: 'We place 40 at the tail index (0). This reuses the space freed by the dequeue. The tail advances to (0 + 1) % 3 = 1. The size becomes 3. WHY: The ring buffer maximizes memory efficiency by wrapping around.',
      state: { queue: [40, 20, 30], head: 1, tail: 1, size: 3, capacity: 3, action: 'Enqueued 40.' },
    },
    {
      id: 7,
      title: 'Check Front and Rear',
      explanation: 'The Front is the element at the head (index 1) = 20. The Rear is the element at (tail - 1 + 3) % 3 = index 0 = 40.',
      state: { queue: [40, 20, 30], head: 1, tail: 1, size: 3, capacity: 3, action: 'Front = 20, Rear = 40.' },
    },
    {
      id: 8,
      title: 'Dequeue',
      explanation: 'We remove the element at the head (index 1). The head advances to 2. The size becomes 2.',
      state: { queue: [40, null, 30], head: 2, tail: 1, size: 2, capacity: 3, action: 'Dequeued 20.' },
    },
    {
      id: 9,
      title: 'Dequeue',
      explanation: 'We remove the element at the head (index 2). The head advances to (2 + 1) % 3 = 0. The size becomes 1.',
      state: { queue: [40, null, null], head: 0, tail: 1, size: 1, capacity: 3, action: 'Dequeued 30.' },
    },
    {
      id: 10,
      title: 'Dequeue Last Element',
      explanation: 'We remove the element at the head (index 0). The head advances to 1. The size becomes 0. The queue is now empty, but note that head and tail are both at 1.',
      state: { queue: [null, null, null], head: 1, tail: 1, size: 0, capacity: 3, action: 'Dequeued 40.', found: true },
    },
  ],

  javaCode: `class MyCircularQueue {
    private int[] data;
    private int head;
    private int tail;
    private int size;
    private int capacity;

    public MyCircularQueue(int k) {
        data = new int[k];
        head = 0;
        tail = 0;
        size = 0;
        capacity = k;
    }
    
    public boolean enQueue(int value) {
        if (isFull()) return false;
        data[tail] = value;
        tail = (tail + 1) % capacity;
        size++;
        return true;
    }
    
    public boolean deQueue() {
        if (isEmpty()) return false;
        head = (head + 1) % capacity;
        size--;
        return true;
    }
    
    public int Front() { return isEmpty() ? -1 : data[head]; }
    public int Rear() { return isEmpty() ? -1 : data[(tail - 1 + capacity) % capacity]; }
    public boolean isEmpty() { return size == 0; }
    public boolean isFull() { return size == capacity; }
}`,

  javaExplanation: [
    { line: 'tail = (tail + 1) % capacity;', note: 'The modulo operator wraps the tail back to 0 when it reaches the end.' },
    { line: 'head = (head + 1) % capacity;', note: 'The head also wraps around when dequeueing.' },
    { line: 'data[(tail - 1 + capacity) % capacity]', note: 'To get the rear, we look one step before the tail, wrapping around if necessary.' },
  ],

  complexity: {
    time: 'O(1)',
    space: 'O(K)',
    aux: 'O(K)',
    explanation: 'Array access is O(1). We pre-allocate the array of size K.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Using a dynamic array (like ArrayList) and shifting elements, but that defeats the purpose of a fixed queue.',
  },

  commonMistakes: [
    { title: 'Overwriting data when full', detail: 'Always check `isFull()` before enqueueing, otherwise you will overwrite the head element.' },
    { title: 'Not handling empty state', detail: 'If size is 0, `front` and `rear` should return -1.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Design Circular Queue', url: 'https://leetcode.com/problems/design-circular-queue/' },
    { level: 'Medium', title: 'Design Circular Deque', url: 'https://leetcode.com/problems/design-circular-deque/' },
  ],

  quickRevision: [
    'Array of size K.',
    'Use `% capacity` for wrap-around.',
    'Track size to distinguish full vs empty.',
  ],
};

export const queueDequeSubPatterns = [basicQueue, monotonicDeque, circularQueue];

export const queueDequeOverview = {
  id: 'queue-deque',
  title: 'Queue & Deque',
  subtitle: 'FIFO and double-ended sequences',
  introduction: 'A Queue is a First-In-First-Out (FIFO) data structure, while a Deque (Double-Ended Queue) allows insertion and deletion from both ends. They are fundamental for BFS, sliding window problems, and task scheduling.',
  coreConcept: {
    what: 'Data structures that process elements in a specific order.',
    why: 'Queues preserve order, while Deques allow O(1) access to both ends for optimized windowing.',
    when: 'BFS, caching, sliding window, or scheduling.',
  },
  whenToUse: [
    'You need First-In-First-Out processing.',
    'You need O(1) access to both the front and back of a sequence.',
  ],
  recognitionClues: [
    '"Level order traversal"',
    '"Sliding window maximum"',
    '"First unique character"',
  ],
  importantProperties: [
    'Queue: O(1) enqueue/dequeue.',
    'Deque: O(1) add/remove from both ends.',
    'Circular Queue: Reuses memory with modulo arithmetic.',
  ],
  comparison: [
    { aspect: 'Basic Queue', when: 'FIFO order', time: 'O(1)', space: 'O(N)' },
    { aspect: 'Monotonic Deque', when: 'Window max/min', time: 'O(N)', space: 'O(K)' },
    { aspect: 'Circular Queue', when: 'Fixed memory', time: 'O(1)', space: 'O(K)' },
  ],
  commonMistakes: [
    { title: 'Queue vs Stack', detail: 'Queue is FIFO (remove from front), Stack is LIFO (remove from back).' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Implement Queue using Stacks', url: 'https://leetcode.com/problems/implement-queue-using-stacks/' },
    { level: 'Medium', title: 'Design Circular Queue', url: 'https://leetcode.com/problems/design-circular-queue/' },
    { level: 'Hard', title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
  ],
};