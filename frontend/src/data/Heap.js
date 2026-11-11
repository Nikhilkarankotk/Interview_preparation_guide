// ============================================================
// TOP K ELEMENTS — The VIP Club
// ============================================================
export const topKElements = {
  id: 'top-k-elements',
  patternId: 'heap',
  title: 'Top K Elements',
  subtitle: 'The VIP Club',
  type: 'top-k-elements',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Use a Min-Heap of size K to keep track of the K largest elements seen so far.',
    why: 'If you want the K largest elements, the smallest of those K elements is the "weakest link". A Min-Heap keeps this weakest link at the root so you can easily kick it out when a bigger element arrives.',
    when: 'Finding the Kth largest/smallest element, or the top K frequent elements.',
    properties: [
      'Heap size never exceeds K.',
      'Min-Heap for K largest elements.',
      'Max-Heap for K smallest elements.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Kth largest element".',
      '"Top K frequent elements".',
      '"K closest points to origin".',
    ],
    inputs: ['Array of numbers', 'Integer K'],
    constraints: ['O(N log K) time', 'O(K) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Add First Elements',
      explanation: 'Array: [3, 2, 1, 5, 6, 4]. K = 2. We want the 2nd largest. We push 3 and 2 into our Min-Heap.',
      state: {
        array: [3, 2, 1, 5, 6, 4], k: 2, heap: [2, 3], currentIdx: 1, result: 0, action: 'Heap size is 2. Min is 2.',
      },
    },
    {
      id: 1,
      title: 'Next is Smaller',
      explanation: 'Next is 1. It is smaller than the root (2). We ignore it because we only care about the largest elements.',
      state: {
        array: [3, 2, 1, 5, 6, 4], k: 2, heap: [2, 3], currentIdx: 2, result: 0, action: '1 < 2. Ignore.',
      },
    },
    {
      id: 2,
      title: 'Bigger Element Arrives',
      explanation: 'Next is 5. 5 > 2. We pop the 2 (weakest link) and push 5. Heap becomes [3, 5]. Root is now 3.',
      state: {
        array: [3, 2, 1, 5, 6, 4], k: 2, heap: [3, 5], currentIdx: 3, result: 0, action: 'Pop 2, Push 5. Min is 3.',
      },
    },
    {
      id: 3,
      title: 'New Max Arrives',
      explanation: 'Next is 6. 6 > 3. Pop 3, push 6. Heap becomes [5, 6]. Root is 5.',
      state: {
        array: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6], currentIdx: 4, result: 0, action: 'Pop 3, Push 6. Min is 5.',
      },
    },
    {
      id: 4,
      title: 'Final Answer',
      explanation: 'Next is 4. 4 < 5. Ignore. End of array. The root of the heap (5) is the 2nd largest element!',
      state: {
        array: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6], currentIdx: 5, result: 5, action: '2nd largest is 5.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class KthLargest {
    public int findKthLargest(int[] nums, int k) {
        // Min-heap of size K
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        
        for (int num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll(); // Remove the smallest element
            }
        }
        return minHeap.peek(); // The root is the Kth largest
    }
}`,

  javaExplanation: [
    { line: 'PriorityQueue<Integer> minHeap = new PriorityQueue<>();', note: 'Java\'s PriorityQueue is a Min-Heap by default.' },
    { line: 'minHeap.offer(num);', note: 'Add the current number to the heap.' },
    { line: 'if (minHeap.size() > k)', note: 'If the heap grows larger than K, remove the smallest element.' },
    { line: 'return minHeap.peek();', note: 'The root of the Min-Heap is the Kth largest element.' },
  ],

  complexity: {
    time: 'O(N log K)',
    space: 'O(K)',
    aux: 'O(K)',
    explanation: 'We process N elements, and inserting/deleting from a heap of size K takes O(log K) time.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(1)',
    note: 'Sort the entire array and pick the Kth element. Slow for massive datasets.',
  },

  commonMistakes: [
    { title: 'Using a Max-Heap', detail: 'If you use a Max-Heap, you can\'t easily remove the smallest elements. A Min-Heap is required to keep the K largest.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
    { level: 'Medium', title: 'Top K Frequent Elements', url: 'https://leetcode.com/problems/top-k-frequent-elements/' },
    { level: 'Medium', title: 'K Closest Points to Origin', url: 'https://leetcode.com/problems/k-closest-points-to-origin/' },
  ],

  quickRevision: [
    'Use a Min-Heap for K largest.',
    'Push element to heap.',
    'If heap size > K, pop the root.',
    'Root is the answer.',
  ],
};

// ============================================================
// MERGE K SORTED LISTS — The Relay Race
// ============================================================
export const mergeKLists = {
  id: 'merge-k-lists',
  patternId: 'heap',
  title: 'Merge K Sorted Lists',
  subtitle: 'The Relay Race',
  type: 'merge-k-lists',
  difficulty: 'Hard',

  coreConcept: {
    what: 'Use a Min-Heap to efficiently merge K sorted linked lists.',
    why: 'At any point, the next smallest element must be the current head of one of the K lists. A Min-Heap stores all K heads, allowing us to extract the global minimum in O(log K) time.',
    when: 'Merging K sorted arrays or linked lists.',
    properties: [
      'Heap stores the current head nodes of each list.',
      'Heap size is at most K.',
      'Extract min, add to result, then push the next node from that list.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Merge K sorted lists".',
      '"Smallest range covering elements from K lists".',
      'Multiple sorted inputs.',
    ],
    inputs: ['Array of Linked Lists'],
    constraints: ['O(N log K) time', 'O(K) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Heap',
      explanation: 'We have 3 lists: [1->4], [1->3], [2->6]. We put the head of each list into the Min-Heap.',
      state: {
        lists: [[1, 4], [1, 3], [2, 6]], heap: [1, 1, 2], result: [], action: 'Push heads: 1, 1, 2.',
      },
    },
    {
      id: 1,
      title: 'Extract Min',
      explanation: 'Pop the smallest (1 from List 1). Add to result. Push its next node (4) to the heap.',
      state: {
        lists: [[1, 4], [1, 3], [2, 6]], heap: [1, 2, 4], result: [1], action: 'Pop 1 (L1). Push 4.',
      },
    },
    {
      id: 2,
      title: 'Extract Min Again',
      explanation: 'Pop 1 (from List 2). Add to result. Push its next node (3) to the heap.',
      state: {
        lists: [[1, 4], [1, 3], [2, 6]], heap: [2, 3, 4], result: [1, 1], action: 'Pop 1 (L2). Push 3.',
      },
    },
    {
      id: 3,
      title: 'Continue Merging',
      explanation: 'Pop 2. Push 6. Pop 3. Pop 4. Pop 6. The result is fully sorted.',
      state: {
        lists: [[1, 4], [1, 3], [2, 6]], heap: [], result: [1, 1, 2, 3, 4, 6], action: 'Merged all!', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class MergeKSortedLists {
    public ListNode mergeKLists(ListNode[] lists) {
        if (lists == null || lists.length == 0) return null;

        // Min-heap comparing the values of the ListNodes
        PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);

        // Add the head of each list to the heap
        for (ListNode head : lists) {
            if (head != null) minHeap.offer(head);
        }

        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (!minHeap.isEmpty()) {
            ListNode smallestNode = minHeap.poll();
            tail.next = smallestNode;
            tail = tail.next;

            // If this list has more nodes, add the next one to the heap
            if (smallestNode.next != null) {
                minHeap.offer(smallestNode.next);
            }
        }
        return dummy.next;
    }
}`,

  javaExplanation: [
    { line: 'PriorityQueue<ListNode> minHeap = new PriorityQueue<>((a, b) -> a.val - b.val);', note: 'We must provide a custom comparator so the heap sorts by node value.' },
    { line: 'if (head != null) minHeap.offer(head);', note: 'Add the first node of every list into the heap.' },
    { line: 'ListNode smallestNode = minHeap.poll();', note: 'Extract the smallest node among all current heads.' },
    { line: 'if (smallestNode.next != null) minHeap.offer(smallestNode.next);', note: 'Push the next node from the same list back into the heap.' },
  ],

  complexity: {
    time: 'O(N log K)',
    space: 'O(K)',
    aux: 'O(K)',
    explanation: 'N is the total number of nodes. Each node is pushed and popped once, taking O(log K) time. The heap holds at most K nodes.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(N)',
    note: 'Collect all nodes into an array, sort them, and rebuild the linked list.',
  },

  commonMistakes: [
    { title: 'Forgetting the Comparator', detail: 'PriorityQueue cannot compare ListNodes by default. You must pass a comparator `(a,b) -> a.val - b.val`.' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
    { level: 'Hard', title: 'Smallest Range Covering Elements from K Lists', url: 'https://leetcode.com/problems/smallest-range-covering-elements-from-k-lists/' },
  ],

  quickRevision: [
    'Min-Heap of ListNode heads.',
    'Custom comparator by val.',
    'Pop min, add to result.',
    'Push the next node from that list.',
  ],
};

// ============================================================
// TWO HEAPS — The Balance (Median Finder)
// ============================================================
export const twoHeaps = {
  id: 'two-heaps',
  patternId: 'heap',
  title: 'Two Heaps',
  subtitle: 'The Balance',
  type: 'two-heaps',
  difficulty: 'Hard',

  coreConcept: {
    what: 'Use two heaps: a Max-Heap for the smaller half of the data, and a Min-Heap for the larger half.',
    why: 'This allows you to find the median of a stream of numbers in O(1) time. The median is either the top of one heap, or the average of both tops.',
    when: 'Finding the median of a data stream, or problems where you need to balance two halves.',
    properties: [
      'Max-Heap stores the smaller half.',
      'Min-Heap stores the larger half.',
      'The sizes differ by at most 1.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find median from data stream".',
      '"Sliding window median".',
      '"Balance two sides".',
    ],
    inputs: ['Stream of numbers'],
    constraints: ['O(log N) add, O(1) findMedian'],
  },

  steps: [
    {
      id: 0,
      title: 'Add 1',
      explanation: 'Add 1 to Max-Heap. Max-Heap: [1], Min-Heap: [].',
      state: {
        stream: [1, 2, 3, 4], maxHeap: [1], minHeap: [], median: 1, action: 'Add 1 to Max-Heap.',
      },
    },
    {
      id: 1,
      title: 'Add 2',
      explanation: 'Add 2 to Max-Heap. Max-Heap: [2, 1]. Rebalance: move top (2) to Min-Heap. Max: [1], Min: [2]. Median is (1+2)/2 = 1.5.',
      state: {
        stream: [1, 2, 3, 4], maxHeap: [1], minHeap: [2], median: 1.5, action: 'Balance heaps. Median 1.5.',
      },
    },
    {
      id: 2,
      title: 'Add 3',
      explanation: 'Add 3 to Max-Heap. Max: [3, 1]. Rebalance: move top (3) to Min-Heap. Max: [1], Min: [2, 3]. Move top (2) back to Max. Max: [2, 1], Min: [3]. Median is 2.',
      state: {
        stream: [1, 2, 3, 4], maxHeap: [2, 1], minHeap: [3], median: 2, action: 'Balance. Median 2.',
      },
    },
    {
      id: 3,
      title: 'Add 4',
      explanation: 'Add 4 to Max-Heap. Max: [4, 2, 1]. Rebalance: move 4 to Min. Max: [2, 1], Min: [3, 4]. Median is (2+3)/2 = 2.5.',
      state: {
        stream: [1, 2, 3, 4], maxHeap: [2, 1], minHeap: [3, 4], median: 2.5, action: 'Median 2.5.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class MedianFinder {
    // Max-heap for the smaller half
    private PriorityQueue<Integer> maxHeap;
    // Min-heap for the larger half
    private PriorityQueue<Integer> minHeap;

    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }

    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll()); // Move largest of small half to large half

        // Rebalance if minHeap is bigger
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }

    public double findMedian() {
        if (maxHeap.size() == minHeap.size()) {
            return (maxHeap.peek() + minHeap.peek()) / 2.0;
        }
        return maxHeap.peek();
    }
}`,

  javaExplanation: [
    { line: 'maxHeap = new PriorityQueue<>(Collections.reverseOrder());', note: 'Java uses a Min-Heap by default. `reverseOrder()` turns it into a Max-Heap.' },
    { line: 'minHeap.offer(maxHeap.poll());', note: 'Always push the new number to Max-Heap, then move the largest element to Min-Heap to maintain order.' },
    { line: 'if (minHeap.size() > maxHeap.size())', note: 'We keep Max-Heap the same size or 1 element larger than Min-Heap.' },
    { line: 'return (maxHeap.peek() + minHeap.peek()) / 2.0;', note: 'If sizes are equal, the median is the average of the two roots.' },
  ],

  complexity: {
    time: 'O(log N) add, O(1) find',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Adding to a heap is O(log N). Finding the median is just peeking at the roots, which is O(1).',
  },

  bruteForce: {
    time: 'O(N log N) add, O(1) find',
    space: 'O(N)',
    note: 'Use an ArrayList and sort it every time `findMedian` is called.',
  },

  commonMistakes: [
    { title: 'Forgetting to rebalance', detail: 'If you don\'t ensure `maxHeap.size() >= minHeap.size()`, `maxHeap.peek()` might fail.' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
    { level: 'Hard', title: 'Sliding Window Median', url: 'https://leetcode.com/problems/sliding-window-median/' },
  ],

  quickRevision: [
    'Max-Heap for smaller half.',
    'Min-Heap for larger half.',
    'Balance sizes to differ by at most 1.',
    'Median is root, or average of roots.',
  ],
};

export const heapSubPatterns = [topKElements, mergeKLists, twoHeaps];

export const heapOverview = {
  id: 'heap',
  title: 'Heaps & Priority Queues',
  subtitle: 'Maintain order and access the min/max in O(1) time',
  introduction: 'A Heap (often called a Priority Queue) is a specialized tree-based data structure that satisfies the heap property. In a Min-Heap, the parent is always smaller than its children, meaning the minimum element is always at the root. It is essential for problems requiring fast access to extreme values.',
  coreConcept: {
    what: 'A complete binary tree where the root is always the minimum (Min-Heap) or maximum (Max-Heap) element.',
    why: 'It allows O(1) access to the extreme value, and O(log N) insertion/deletion.',
    when: 'Top K problems, merging K sorted sequences, finding running medians.',
  },
  whenToUse: [
    'You need to repeatedly find the min or max element.',
    'You need to maintain the Top K elements.',
    'You need to merge K sorted lists.',
  ],
  recognitionClues: [
    '"Kth largest / smallest"',
    '"Top K frequent"',
    '"Merge K sorted"',
    '"Median of a stream"',
  ],
  importantProperties: [
    'Min-Heap: Root is the smallest.',
    'Max-Heap: Root is the largest.',
    'Insertion and deletion are O(log N).',
    'Peeking at the root is O(1).',
  ],
  comparison: [
    { aspect: 'Top K', when: 'K largest/smallest', time: 'O(N log K)', space: 'O(K)' },
    { aspect: 'Merge K', when: 'Multiple sorted lists', time: 'O(N log K)', space: 'O(K)' },
    { aspect: 'Two Heaps', when: 'Running median', time: 'O(log N) add', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Using a Max-Heap for Top K Largest', detail: 'You must use a Min-Heap of size K to keep the largest elements. A Max-Heap would force you to store all N elements.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
    { level: 'Hard', title: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
    { level: 'Hard', title: 'Find Median from Data Stream', url: 'https://leetcode.com/problems/find-median-from-data-stream/' },
  ],
};