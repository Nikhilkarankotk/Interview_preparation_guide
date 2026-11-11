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
      title: 'Enqueue Task A',
      explanation: 'Queue is empty. We add A to the back.',
      state: {
        queue: ['A'], front: 0, back: 0, action: 'Enqueue A.',
      },
    },
    {
      id: 1,
      title: 'Enqueue Task B',
      explanation: 'We add B to the back. A is still at the front.',
      state: {
        queue: ['A', 'B'], front: 0, back: 1, action: 'Enqueue B.',
      },
    },
    {
      id: 2,
      title: 'Dequeue',
      explanation: 'We process the front element (A). It leaves the queue.',
      state: {
        queue: ['B'], front: 0, back: 0, action: 'Dequeue A.',
      },
    },
    {
      id: 3,
      title: 'Enqueue Task C',
      explanation: 'We add C to the back. Queue is now [B, C].',
      state: {
        queue: ['B', 'C'], front: 0, back: 1, action: 'Enqueue C.',
      },
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
      title: 'Process 1',
      explanation: 'Window size = 3. First element is 1. Deque stores its index [0].',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [0], currentIdx: 0, action: 'Push index 0 (value 1).',
      },
    },
    {
      id: 1,
      title: 'Process 3',
      explanation: 'Value 3 > 1. Remove 1 from the back. Push index 1. Deque: [1].',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1], currentIdx: 1, action: '3 > 1. Pop 0. Push index 1.',
      },
    },
    {
      id: 2,
      title: 'Process -1',
      explanation: 'Value -1 is smaller than 3. Keep it. Deque: [1, 2]. Window is full (size 3). Max is at front: 3.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1, 2], currentIdx: 2, action: 'Push index 2. Max is 3.',
      },
    },
    {
      id: 3,
      title: 'Process -3',
      explanation: 'Value -3 is smaller. Keep it. Deque: [1, 2, 3]. The index 0 is out of window, but it was already popped.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [1, 2, 3], currentIdx: 3, action: 'Push index 3. Max is 3.',
      },
    },
    {
      id: 4,
      title: 'Process 5',
      explanation: 'Value 5 is bigger than everything. Pop indices 3, 2, 1. Push index 4. Deque: [4]. Max becomes 5.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], deque: [4], currentIdx: 4, action: 'Pop all smaller. Push 4. Max is 5.',
      },
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
      'Tracks `head` (front) and `tail` (back).',
      'Uses modulo `% capacity` to wrap around.',
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
      title: 'Enqueue 1',
      explanation: 'Capacity = 3. Head = 0, Tail = 0. Insert 1 at Tail. Tail becomes 1.',
      state: {
        queue: [1, null, null], head: 0, tail: 1, action: 'Enqueue 1.',
      },
    },
    {
      id: 1,
      title: 'Enqueue 2',
      explanation: 'Insert 2 at Tail (index 1). Tail becomes 2.',
      state: {
        queue: [1, 2, null], head: 0, tail: 2, action: 'Enqueue 2.',
      },
    },
    {
      id: 2,
      title: 'Enqueue 3',
      explanation: 'Insert 3 at Tail (index 2). Tail wraps around to (2 + 1) % 3 = 0.',
      state: {
        queue: [1, 2, 3], head: 0, tail: 0, action: 'Enqueue 3. Tail wraps to 0.',
      },
    },
    {
      id: 3,
      title: 'Dequeue',
      explanation: 'Remove element at Head (1). Head becomes (0 + 1) % 3 = 1.',
      state: {
        queue: [null, 2, 3], head: 1, tail: 0, action: 'Dequeue 1.',
      },
    },
    {
      id: 4,
      title: 'Enqueue 4',
      explanation: 'Insert 4 at Tail (index 0). Tail becomes 1.',
      state: {
        queue: [4, 2, 3], head: 1, tail: 1, action: 'Enqueue 4 in the reusable space.',
      },
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