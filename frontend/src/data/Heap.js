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
      title: 'Push 3',
      explanation: 'Array: [3, 2, 1, 5, 6, 4]. K = 2. We want the 2nd largest. We start a Min-Heap. We push 3. Heap is [3]. WHY: A Min-Heap keeps the smallest element of our K-sized group at the root. This "weakest link" is the easiest to replace if we find a bigger number.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [3], currentIdx: 0, result: 0, action: 'Push 3.' },
    },
    {
      id: 1,
      title: 'Push 2',
      explanation: 'Next is 2. We push it. Heap is [2, 3]. The size is now exactly K (2). The root (2) is the smallest of the top 2 numbers we have seen so far.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [2, 3], currentIdx: 1, result: 0, action: 'Push 2. Heap size = K.' },
    },
    {
      id: 2,
      title: 'Push 1 and Evict',
      explanation: 'Next is 1. We push 1. Heap becomes [1, 2, 3]. The size (3) exceeds K. We must remove the smallest element (the root) to maintain a size of 2. We pop 1. Heap becomes [2, 3]. WHY: 1 is too small to be part of the top 2 largest elements.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [2, 3], currentIdx: 2, result: 0, action: 'Push 1, evict 1.' },
    },
    {
      id: 3,
      title: 'Push 5 and Evict',
      explanation: 'Next is 5. We push 5. Heap becomes [2, 3, 5]. Size exceeds K. We pop the root, 2. Heap becomes [3, 5]. WHY: 5 is larger than 2, so 2 is evicted from our VIP club.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [3, 5], currentIdx: 3, result: 0, action: 'Push 5, evict 2.' },
    },
    {
      id: 4,
      title: 'Push 6 and Evict',
      explanation: 'Next is 6. We push 6. Heap becomes [3, 5, 6]. Size exceeds K. We pop the root, 3. Heap becomes [5, 6]. WHY: 6 is larger than 3, so 3 is evicted.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6], currentIdx: 4, result: 0, action: 'Push 6, evict 3.' },
    },
    {
      id: 5,
      title: 'Push 4 and Evict',
      explanation: 'Next is 4. We push 4. Heap becomes [4, 5, 6]. Size exceeds K. We pop the root, 4. Heap becomes [5, 6]. WHY: 4 is smaller than 5, so it cannot enter the top 2.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6], currentIdx: 5, result: 0, action: 'Push 4, evict 4.' },
    },
    {
      id: 6,
      title: 'Final Answer',
      explanation: 'We have processed all numbers. The Min-Heap holds exactly the 2 largest numbers: [5, 6]. The root of the heap is 5, which is the 2nd largest element. WHY: Because the heap only keeps the top K, the smallest in this group is exactly the Kth largest overall.',
      state: { array: [3, 2, 1, 5, 6, 4], k: 2, heap: [5, 6], currentIdx: 6, result: 5, action: 'Return root: 5.', found: true },
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
      title: 'Initialize Heap with Heads',
      explanation: 'We have 3 lists: L1: [1->4], L2: [1->3], L3: [2->6]. We push the head of each list into a Min-Heap. Heap is [1, 1, 2]. WHY: The global minimum must be the smallest among the current heads of the K lists.',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [1, 1, 2], result: [], action: 'Push heads: 1, 1, 2.' },
    },
    {
      id: 1,
      title: 'Pop 1 (L1) & Push Next',
      explanation: 'We pop the smallest element (1 from L1). Add it to the result. We then push L1\'s next node (4) into the heap. Heap becomes [1, 2, 4]. Result is [1].',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [1, 2, 4], result: [1], action: 'Pop 1 (L1). Push 4.' },
    },
    {
      id: 2,
      title: 'Pop 1 (L2) & Push Next',
      explanation: 'We pop the next smallest element (1 from L2). Add to result. We push L2\'s next node (3) into the heap. Heap becomes [2, 3, 4]. Result is [1, 1].',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [2, 3, 4], result: [1, 1], action: 'Pop 1 (L2). Push 3.' },
    },
    {
      id: 3,
      title: 'Pop 2 (L3) & Push Next',
      explanation: 'We pop 2 (from L3). Add to result. We push L3\'s next node (6). Heap becomes [3, 4, 6]. Result is [1, 1, 2].',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [3, 4, 6], result: [1, 1, 2], action: 'Pop 2 (L3). Push 6.' },
    },
    {
      id: 4,
      title: 'Pop 3 (Empty List)',
      explanation: 'We pop 3. Since 3 is the last node in L2, there is no next node to push. Heap becomes [4, 6]. Result is [1, 1, 2, 3].',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [4, 6], result: [1, 1, 2, 3], action: 'Pop 3. No next node.' },
    },
    {
      id: 5,
      title: 'Pop 4 (Empty List)',
      explanation: 'We pop 4. 4 is the last node in L1. No next node to push. Heap becomes [6]. Result is [1, 1, 2, 3, 4].',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [6], result: [1, 1, 2, 3, 4], action: 'Pop 4. No next node.' },
    },
    {
      id: 6,
      title: 'Pop Final Node',
      explanation: 'We pop 6. 6 is the last node in L3. Heap is now empty. Result becomes [1, 1, 2, 3, 4, 6]. WHY: The heap is empty, meaning every node from all K lists has been processed in perfect ascending order.',
      state: { lists: [[1, 4], [1, 3], [2, 6]], heap: [], result: [1, 1, 2, 3, 4, 6], action: 'Pop 6. Done.', found: true },
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
      explanation: 'Stream starts with 1. We add it to the Max-Heap. Max-Heap: [1], Min-Heap: []. The sizes differ by 1. The median is the top of the Max-Heap, which is 1. WHY: The Max-Heap stores the smaller half of the numbers. When there is only one number, it is the median.',
      state: { stream: [1, 2, 3, 4], maxHeap: [1], minHeap: [], median: 1, action: 'Add 1 to Max-Heap.' },
    },
    {
      id: 1,
      title: 'Add 2',
      explanation: 'Add 2 to Max-Heap. Max-Heap becomes [2, 1]. Now we must balance: we push the largest element from the smaller half (2) over to the Min-Heap. Max-Heap: [1], Min-Heap: [2]. The heaps are equal in size. Median is (1+2)/2 = 1.5. WHY: The Max-Heap holds the bottom half, the Min-Heap holds the top half.',
      state: { stream: [1, 2, 3, 4], maxHeap: [1], minHeap: [2], median: 1.5, action: 'Balance heaps. Median 1.5.' },
    },
    {
      id: 2,
      title: 'Add 3',
      explanation: 'Add 3 to Max-Heap. Max-Heap becomes [3, 1]. Push the largest (3) to Min-Heap. Max-Heap: [1], Min-Heap: [2, 3]. Min-Heap is now larger (size 2 vs 1). We must rebalance: push the smallest from the larger half (2) back to Max-Heap. Max-Heap: [2, 1], Min-Heap: [3]. Median is 2.',
      state: { stream: [1, 2, 3, 4], maxHeap: [2, 1], minHeap: [3], median: 2, action: 'Balance. Median 2.' },
    },
    {
      id: 3,
      title: 'Add 4',
      explanation: 'Add 4 to Max-Heap. Max-Heap becomes [4, 2, 1]. Push the largest (4) to Min-Heap. Max-Heap: [2, 1], Min-Heap: [3, 4]. The heaps are equal in size. Median is (2+3)/2 = 2.5.',
      state: { stream: [1, 2, 3, 4], maxHeap: [2, 1], minHeap: [3, 4], median: 2.5, action: 'Median 2.5.', found: true },
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