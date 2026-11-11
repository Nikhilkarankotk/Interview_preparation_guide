// ============================================================
// SEGMENT TREE — Range Sum Query - Mutable
// ============================================================
export const segmentTree = {
  id: 'segment-tree',
  patternId: 'advanced-ds',
  title: 'Segment Tree',
  subtitle: 'Range Queries & Updates',
  type: 'segment-tree',
  difficulty: 'Hard',

  coreConcept: {
    what: 'A tree data structure used for storing information about intervals or segments.',
    why: 'It allows you to query the sum (or min/max) of a range in O(log N) time, and update an element in O(log N) time. A standard array takes O(N) for updates or queries.',
    when: 'When you need to perform both range queries AND point updates efficiently.',
    properties: [
      'Built as a binary tree, typically stored in an array of size 4*N.',
      'Each node represents the sum of a specific range.',
      'Leaves represent individual elements.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Range Sum Query - Mutable".',
      '"Range Minimum Query" with updates.',
      '"Find the sum between indices L and R" repeatedly.',
    ],
    inputs: ['Array of numbers', 'Queries (Update, Range Sum)'],
    constraints: ['O(log N) time per query/update', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Build the Tree',
      explanation: 'Array: [1, 3, 5]. Tree array initialized. Leaf nodes 3, 4, 5 represent 1, 3, 5. Internal nodes 1 and 2 represent sums. Root (node 1) = 9.',
      state: {
        tree: [0, 9, 4, 5, 1, 3, 0, 0, 0, 0], currentIdx: 1, action: 'Built Segment Tree array.',
      },
    },
    {
      id: 1,
      title: 'Query Sum (0, 2)',
      explanation: 'We want the sum of the whole array. We start at the root (node 1, range 0-2). The range matches exactly, so we return 9.',
      state: {
        tree: [0, 9, 4, 5, 1, 3, 0, 0, 0, 0], currentIdx: 1, action: 'Root covers 0-2. Return 9.',
      },
    },
    {
      id: 2,
      title: 'Update Element 1',
      explanation: 'Update index 1 (value 3) to 10. We update the leaf (node 4) to 10, then update its parents up to the root. Node 2 becomes 1+10=11, Root becomes 11+5=16.',
      state: {
        tree: [0, 16, 11, 5, 1, 10, 0, 0, 0, 0], currentIdx: 4, action: 'Update index 1 to 10. Propagate up.',
      },
    },
    {
      id: 3,
      title: 'Query Sum (0, 1)',
      explanation: 'Query sum from 0 to 1. We traverse the tree, splitting the query until we find matching nodes. Node 4 (index 1) is 10, Node 2 (left child of root) is 11. Sum is 11.',
      state: {
        tree: [0, 16, 11, 5, 1, 10, 0, 0, 0, 0], currentIdx: 2, action: 'Query sum(0,1) returns 11.', found: true,
      },
    },
  ],

  javaCode: `class SegmentTree {
    int[] tree;
    int n;

    public SegmentTree(int[] nums) {
        n = nums.length;
        tree = new int[4 * n];
        buildTree(nums, 1, 0, n - 1);
    }

    private void buildTree(int[] nums, int node, int start, int end) {
        if (start == end) {
            tree[node] = nums[start];
        } else {
            int mid = start + (end - start) / 2;
            buildTree(nums, 2 * node, start, mid);
            buildTree(nums, 2 * node + 1, mid + 1, end);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    public void update(int idx, int val) {
        updateTree(1, 0, n - 1, idx, val);
    }

    private void updateTree(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = start + (end - start) / 2;
            if (idx <= mid) updateTree(2 * node, start, mid, idx, val);
            else updateTree(2 * node + 1, mid + 1, end, idx, val);
            tree[node] = tree[2 * node] + tree[2 * node + 1];
        }
    }

    public int query(int L, int R) {
        return queryTree(1, 0, n - 1, L, R);
    }

    private int queryTree(int node, int start, int end, int L, int R) {
        if (R < start || L > end) return 0; // Out of range
        if (L <= start && end <= R) return tree[node]; // Fully covered
        
        int mid = start + (end - start) / 2;
        int leftSum = queryTree(2 * node, start, mid, L, R);
        int rightSum = queryTree(2 * node + 1, mid + 1, end, L, R);
        return leftSum + rightSum;
    }
}`,

  javaExplanation: [
    { line: 'int[] tree = new int[4 * n];', note: 'We allocate 4*N space to safely fit the binary tree in an array.' },
    { line: 'tree[node] = tree[2 * node] + tree[2 * node + 1];', note: 'The parent node is the sum of its left and right children.' },
    { line: 'if (R < start || L > end) return 0;', note: 'If the current range doesn\'t overlap with the query, return 0.' },
  ],

  complexity: {
    time: 'O(log N) per query/update',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'The tree height is log N. We visit at most 4 nodes per level.',
  },

  bruteForce: {
    time: 'O(N) per query, O(1) per update',
    space: 'O(1)',
    note: 'Just use an array. Good for updates, terrible for range queries.',
  },

  commonMistakes: [
    { title: 'Array size too small', detail: 'You must allocate `4 * n` for the tree array, otherwise you will get an OutOfBounds exception.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Range Sum Query - Mutable', url: 'https://leetcode.com/problems/range-sum-query-mutable/' },
    { level: 'Hard', title: 'Count of Smaller Numbers After Self', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
  ],

  quickRevision: [
    'Array size 4*N.',
    'Build: post-order traversal.',
    'Query: 3 cases (no overlap, full overlap, partial).',
    'Update: leaf up to root.',
  ],
};

// ============================================================
// FENWICK TREE (BIT) — Binary Indexed Tree
// ============================================================
export const fenwickTree = {
  id: 'fenwick-tree',
  patternId: 'advanced-ds',
  title: 'Fenwick Tree (BIT)',
  subtitle: 'Binary Indexed Tree',
  type: 'fenwick-tree',
  difficulty: 'Hard',

  coreConcept: {
    what: 'A data structure that provides efficient methods for calculation and manipulation of the prefix sums of a table of values.',
    why: 'It uses the binary representation of indices to calculate prefix sums in O(log N) time, using only O(N) space. It is much easier to code than a Segment Tree.',
    when: 'When you need point updates and prefix sum queries, and want code that is faster and shorter than a Segment Tree.',
    properties: [
      'Uses a 1-based indexing array.',
      'The value at index `i` covers the range `i - (i & -i)` to `i`.',
      'Faster and uses less memory than a Segment Tree.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Range Sum Query" with updates.',
      'Counting inversions.',
    ],
    inputs: ['Array of numbers', 'Point Updates, Prefix Queries'],
    constraints: ['O(log N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Init BIT',
      explanation: 'Array: [3, 2, -1, 6, 5, 4, -3, 3, 7, 2, 3]. We create a BIT array of size N+1 (1-based).',
      state: {
        bit: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Init BIT array.',
      },
    },
    {
      id: 1,
      title: 'Update Index 1 (value 3)',
      explanation: 'Add 3 to BIT[1]. Next index is 1 + (1 & -1) = 2. Add 3 to BIT[2]. Next index is 2 + (2 & -2) = 4...',
      state: {
        bit: [0, 3, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0], currentIdx: 1, action: 'Update index 1. Propagate to 2, 4, 8.',
      },
    },
    {
      id: 2,
      title: 'Prefix Sum Query',
      explanation: 'Query sum of first 5 elements. Sum = BIT[5] + BIT[4]. BIT[5] is 0, BIT[4] is 3. So sum = 3.',
      state: {
        bit: [0, 3, 3, 0, 3, 0, 0, 0, 3, 0, 0, 0], currentIdx: 5, action: 'Query prefix(5) = BIT[5] + BIT[4].',
      },
    },
  ],

  javaCode: `class FenwickTree {
    int[] bit;
    int n;

    public FenwickTree(int[] nums) {
        n = nums.length;
        bit = new int[n + 1];
        for (int i = 0; i < n; i++) {
            update(i + 1, nums[i]); // 1-based indexing
        }
    }

    // Adds delta to index i
    public void update(int i, int delta) {
        while (i <= n) {
            bit[i] += delta;
            i += (i & -i);
        }
    }

    // Returns sum of first i elements
    public int query(int i) {
        int sum = 0;
        while (i > 0) {
            sum += bit[i];
            i -= (i & -i);
        }
        return sum;
    }
}`,

  javaExplanation: [
    { line: 'i += (i & -i);', note: 'The magic of BIT: this isolates the lowest set bit and adds it to move to the next node.' },
    { line: 'i -= (i & -i);', note: 'For querying, we subtract the lowest set bit to jump to the parent node.' },
  ],

  complexity: {
    time: 'O(log N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'The number of iterations depends on the number of set bits in the binary representation of N, which is at most log N.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use a prefix sum array. O(1) query, but O(N) update.',
  },

  commonMistakes: [
    { title: '0-based indexing', detail: 'BIT requires 1-based indexing. If your array is 0-based, you must shift indices by 1.' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Count of Smaller Numbers After Self', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
    { level: 'Hard', title: 'Reverse Pairs', url: 'https://leetcode.com/problems/reverse-pairs/' },
  ],

  quickRevision: [
    '1-based index.',
    'Update: i += (i & -i).',
    'Query: i -= (i & -i).',
    'Size N+1.',
  ],
};

// ============================================================
// LRU CACHE — Hash Map + Doubly Linked List
// ============================================================
export const lruCache = {
  id: 'lru-cache',
  patternId: 'advanced-ds',
  title: 'LRU Cache',
  subtitle: 'Hash Map + Doubly Linked List',
  type: 'lru-cache',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Design a data structure that follows the Least Recently Used (LRU) cache eviction policy. It must support get and put in O(1) time.',
    why: 'A standard Hash Map gives O(1) access but no ordering. A Linked List gives ordering but O(N) access. Combining them gives O(1) access and O(1) eviction.',
    when: 'Designing caches, memory management, or any problem requiring O(1) get and put with eviction.',
    properties: [
      'HashMap stores `key -> node`.',
      'Doubly Linked List maintains usage order (Head = Most Recent, Tail = Least Recent).',
      'On access, move the node to the Head.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Design an LRU Cache".',
      '"Evict the least recently used item".',
      'O(1) time complexity for all operations.',
    ],
    inputs: ['Capacity K', 'Operations (get, put)'],
    constraints: ['O(1) time per operation', 'O(K) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Init Capacity=2',
      explanation: 'We have an empty map and an empty list with Dummy Head and Tail.',
      state: {
        map: {}, list: ['Head', 'Tail'], action: 'Init Cache.',
      },
    },
    {
      id: 1,
      title: 'Put(1, 1)',
      explanation: 'Add node 1 to the map. Add it to the front of the list.',
      state: {
        map: {1: 1}, list: ['Head', '1', 'Tail'], action: 'Put key 1.',
      },
    },
    {
      id: 2,
      title: 'Put(2, 2)',
      explanation: 'Add node 2 to the map. Add it to the front. List: Head -> 2 -> 1 -> Tail.',
      state: {
        map: {1: 1, 2: 2}, list: ['Head', '2', '1', 'Tail'], action: 'Put key 2.',
      },
    },
    {
      id: 3,
      title: 'Get(1)',
      explanation: 'Key 1 exists! Move it to the front. List: Head -> 1 -> 2 -> Tail.',
      state: {
        map: {1: 1, 2: 2}, list: ['Head', '1', '2', 'Tail'], action: 'Get key 1. Moved to front.',
      },
    },
    {
      id: 4,
      title: 'Put(3, 3)',
      explanation: 'Capacity is 2. Evict the least recently used (Tail, which is 2). Add 3 to the front. List: Head -> 3 -> 1 -> Tail.',
      state: {
        map: {1: 1, 3: 3}, list: ['Head', '3', '1', 'Tail'], action: 'Put key 3. Evicted 2.',
      },
    },
  ],

  javaCode: `import java.util.*;

class LRUCache {
    class Node {
        int key, value;
        Node prev, next;
        Node(int k, int v) { key = k; value = v; }
    }

    private Map<Integer, Node> map;
    private Node head, tail;
    private int capacity;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node(0, 0);
        tail = new Node(0, 0);
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        if (!map.containsKey(key)) return -1;
        Node node = map.get(key);
        remove(node);
        insert(node);
        return node.value;
    }

    public void put(int key, int value) {
        if (map.containsKey(key)) {
            remove(map.get(key));
        }
        if (map.size() == capacity) {
            remove(tail.prev);
        }
        insert(new Node(key, value));
    }

    private void remove(Node node) {
        map.remove(node.key);
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void insert(Node node) {
        map.put(node.key, node);
        node.next = head.next;
        node.next.prev = node;
        head.next = node;
        node.prev = head;
    }
}`,

  javaExplanation: [
    { line: 'head.next = tail; tail.prev = head;', note: 'Sentinel nodes make edge cases (like empty list) much easier to handle.' },
    { line: 'remove(tail.prev);', note: 'Evict the least recently used node, which is right before the tail.' },
    { line: 'insert(node);', note: 'Always insert new or accessed nodes right after the head.' },
  ],

  complexity: {
    time: 'O(1)',
    space: 'O(Capacity)',
    aux: 'O(Capacity)',
    explanation: 'HashMap lookups are O(1). Adding/removing from a doubly linked list is O(1).',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use an ArrayList to store the keys in order. Searching and removing takes O(N).',
  },

  commonMistakes: [
    { title: 'Forgetting to remove from map', detail: 'When evicting a node, you must remove it from the HashMap as well as the Linked List.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/' },
    { level: 'Hard', title: 'LFU Cache', url: 'https://leetcode.com/problems/lfu-cache/' },
  ],

  quickRevision: [
    'HashMap + Doubly Linked List.',
    'Head = Most Recent, Tail = Least Recent.',
    'Get: move to head.',
    'Put: if full, remove tail.prev.',
  ],
};

export const advancedDSSubPatterns = [segmentTree, fenwickTree, lruCache];

export const advancedDSOverview = {
  id: 'advanced-ds',
  title: 'Advanced Data Structures',
  subtitle: 'Segment Trees, Fenwick Trees, and LRU Cache',
  introduction: 'Advanced Data Structures solve specific optimization problems that basic structures (arrays, stacks, queues) cannot handle efficiently. These are frequently tested in top-tier technical interviews (FAANG).',
  coreConcept: {
    what: 'Specialized structures for range queries, fast prefix sums, and caching.',
    why: 'They optimize specific operations to O(log N) or O(1) that would otherwise take O(N) time.',
    when: 'Range queries with updates (Segment/Fenwick) or O(1) caching (LRU).',
  },
  whenToUse: [
    'You need both range queries and point updates.',
    'You need to count inversions or find prefix sums dynamically.',
    'You need to design a cache with O(1) eviction.',
  ],
  recognitionClues: [
    '"Range Sum Query - Mutable"',
    '"Design LRU Cache"',
    '"Count inversions"',
  ],
  importantProperties: [
    'Segment Tree: 4*N array, O(log N) updates/queries.',
    'Fenwick Tree: N+1 array, uses bitwise math.',
    'LRU Cache: HashMap + Doubly Linked List.',
  ],
  comparison: [
    { aspect: 'Segment Tree', when: 'Range Query + Update', time: 'O(log N)', space: 'O(4N)' },
    { aspect: 'Fenwick Tree', when: 'Prefix Sum + Update', time: 'O(log N)', space: 'O(N)' },
    { aspect: 'LRU Cache', when: 'O(1) Cache', time: 'O(1)', space: 'O(Capacity)' },
  ],
  commonMistakes: [
    { title: 'Using Segment Tree when Fenwick Tree is enough', detail: 'Fenwick trees are much easier to code and faster in practice for simple prefix sums.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Range Sum Query - Mutable', url: 'https://leetcode.com/problems/range-sum-query-mutable/' },
    { level: 'Medium', title: 'LRU Cache', url: 'https://leetcode.com/problems/lru-cache/' },
    { level: 'Hard', title: 'Reverse Pairs', url: 'https://leetcode.com/problems/reverse-pairs/' },
  ],
};