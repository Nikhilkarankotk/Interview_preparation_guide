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
      title: 'Initialize Segment Tree Array',
      explanation: 'Input array: [1, 3, 5]. We create a tree array of size 4*N = 12. We initialize all values to 0. WHY: A Segment Tree is a binary tree stored in a flat array. We use 4*N space to safely accommodate all nodes, including the leaves and the internal nodes, without worrying about index out of bounds.',
      state: { array: [1, 3, 5], tree: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Tree array of size 12 initialized to 0s.' },
    },
    {
      id: 1,
      title: 'Build: Recursively Split Range',
      explanation: 'We start at the root (node 1), which covers the range [0, 2]. The midpoint is 1. We recursively build the left child (node 2, range [0, 1]) and the right child (node 3, range [2, 2]). WHY: The tree is built using a divide-and-conquer approach. Each node represents the sum of a specific segment of the input array.',
      state: { array: [1, 3, 5], tree: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Root covers [0,2]. Split into [0,1] and [2,2].' },
    },
    {
      id: 2,
      title: 'Build: Leaf Nodes',
      explanation: 'We reach the leaves. Node 4 covers [0, 0] and gets the value 1. Node 5 covers [1, 1] and gets the value 3. Node 3 covers [2, 2] and gets the value 5. WHY: Leaf nodes represent individual elements of the array. There is no further splitting possible.',
      state: { array: [1, 3, 5], tree: [0, 0, 0, 0, 1, 3, 5, 0, 0, 0, 0, 0], currentIdx: 4, action: 'Leaf nodes populated: tree[4]=1, tree[5]=3, tree[3]=5.' },
    },
    {
      id: 3,
      title: 'Build: Internal Nodes (Post-Order)',
      explanation: 'We compute the internal nodes bottom-up. Node 2 is the sum of its children (node 4 and node 5): 1 + 3 = 4. Node 1 (the root) is the sum of its children (node 2 and node 3): 4 + 5 = 9. WHY: The parent node always stores the sum of its two children. This is the core invariant of the Segment Tree.',
      state: { array: [1, 3, 5], tree: [0, 9, 4, 5, 1, 3, 5, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Root updated: tree[2]=4, tree[1]=9.' },
    },
    {
      id: 4,
      title: 'Query: Full Range (0, 2)',
      explanation: 'We query the sum from index 0 to 2. We start at the root (node 1, range [0, 2]). The query range completely covers the node\'s range. We return the node\'s value (9) immediately. WHY: If a node\'s range is fully inside the query range, its sum is part of the answer.',
      state: { array: [1, 3, 5], tree: [0, 9, 4, 5, 1, 3, 5, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Full overlap at root. Return 9.' },
    },
    {
      id: 5,
      title: 'Query: Partial Range (0, 1) - Left',
      explanation: 'We query the sum from 0 to 1. At the root, the range is partially covered. We recurse left (node 2, range [0, 1]). The left child is fully covered, so we return its value (4).',
      state: { array: [1, 3, 5], tree: [0, 9, 4, 5, 1, 3, 5, 0, 0, 0, 0, 0], currentIdx: 2, action: 'Left child (node 2) fully covered. Return 4.' },
    },
    {
      id: 6,
      title: 'Query: Partial Range (0, 1) - Right',
      explanation: 'We also recurse right from the root to node 3 (range [2, 2]). The query range [0, 1] does NOT overlap with node 3\'s range. We return 0. WHY: If there is no overlap, the node contributes nothing to the sum.',
      state: { array: [1, 3, 5], tree: [0, 9, 4, 5, 1, 3, 5, 0, 0, 0, 0, 0], currentIdx: 3, action: 'Right child (node 3) no overlap. Return 0.' },
    },
    {
      id: 7,
      title: 'Query: Combine Results',
      explanation: 'The total sum is the sum of the left and right recursive calls: 4 + 0 = 4. We return 4.',
      state: { array: [1, 3, 5], tree: [0, 9, 4, 5, 1, 3, 5, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Sum = 4 + 0 = 4.' },
    },
    {
      id: 8,
      title: 'Update: Set Index 1 to 10',
      explanation: 'We want to update the value at index 1 from 3 to 10. We traverse down to the leaf node 5 (range [1, 1]). We update its value to 10. WHY: Updates must start at the leaf level to change the underlying data.',
      state: { array: [1, 3, 5], tree: [0, 9, 4, 5, 1, 10, 5, 0, 0, 0, 0, 0], currentIdx: 5, action: 'Leaf node 5 updated to 10.' },
    },
    {
      id: 9,
      title: 'Update: Propagate Upwards',
      explanation: 'We recalculate the parent nodes back up to the root. Node 2 becomes 1 + 10 = 11. The root (node 1) becomes 11 + 5 = 16. WHY: Since the leaf value changed, all ancestor nodes that include this leaf in their range must also be updated to reflect the new sum.',
      state: { array: [1, 3, 5], tree: [0, 16, 11, 5, 1, 10, 5, 0, 0, 0, 0, 0], currentIdx: 1, action: 'Propagated up: tree[2]=11, tree[1]=16.' },
    },
    {
      id: 10,
      title: 'Query After Update (0, 1)',
      explanation: 'We query the sum from 0 to 1 again. The left child (node 2) now holds the value 11. The right child (node 3) is out of range (returns 0). The sum is 11.',
      state: { array: [1, 3, 5], tree: [0, 16, 11, 5, 1, 10, 5, 0, 0, 0, 0, 0], currentIdx: 2, action: 'Query(0,1) returns 11.', found: true },
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
      'The value at index i covers the range i - (i & -i) to i.',
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
      title: 'Initialize BIT Array',
      explanation: 'Input array (1-based for simplicity): [3, 2, -1, 6, 5]. We create a BIT array of size N+1 = 6, initialized to 0. WHY: Fenwick Tree is always 1-indexed. The index 0 is left unused to allow for clean bitwise arithmetic.',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 0, 0, 0, 0, 0], currentIdx: 1, action: 'BIT array of size 6 initialized to 0s.' },
    },
    {
      id: 1,
      title: 'Update Index 1 (Value 3)',
      explanation: 'We add 3 to BIT[1]. We compute the next index: 1 + (1 & -1) = 1 + 1 = 2. We add 3 to BIT[2]. WHY: (1 & -1) isolates the lowest set bit. Adding it to the current index navigates up the tree.',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 3, 0, 0, 0], currentIdx: 1, action: 'Update 1: bit[1]+=3, bit[2]+=3.' },
    },
    {
      id: 2,
      title: 'Update Index 1 (Continue)',
      explanation: 'Next index from 2 is 2 + (2 & -2) = 2 + 2 = 4. We add 3 to BIT[4]. Next index from 4 is 4 + (4 & -4) = 4 + 4 = 8 (out of bounds). We stop. WHY: Each update propagates upwards through the tree, modifying all nodes that cover this index.',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 3, 0, 3, 0], currentIdx: 1, action: 'Update 1: bit[4]+=3. Stop.' },
    },
    {
      id: 3,
      title: 'Update Index 2 (Value 2)',
      explanation: 'We add 2 to BIT[2]. Next index: 2 + (2 & -2) = 4. We add 2 to BIT[4]. Next index from 4 is 8 (stop). WHY: Index 2 is covered by BIT[2] and BIT[4].',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 5, 0, 5, 0], currentIdx: 2, action: 'Update 2: bit[2]+=2, bit[4]+=2.' },
    },
    {
      id: 4,
      title: 'Update Index 3 (Value -1)',
      explanation: 'We add -1 to BIT[3]. Next index: 3 + (3 & -3) = 3 + 1 = 4. We add -1 to BIT[4]. Next index from 4 is 8 (stop).',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 5, -1, 4, 0], currentIdx: 3, action: 'Update 3: bit[3]+=-1, bit[4]+=-1.' },
    },
    {
      id: 5,
      title: 'Query Prefix Sum (1 to 3)',
      explanation: 'We want the sum of the first 3 elements. Start at i=3. Sum += BIT[3] (-1). Next index: 3 - (3 & -3) = 3 - 1 = 2. Sum += BIT[2] (5). Next index: 2 - (2 & -2) = 2 - 2 = 0. Stop. WHY: Querying subtracts the lowest set bit to navigate down the tree, summing the relevant nodes.',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 5, -1, 4, 0], currentIdx: 3, action: 'Query(3): bit[3]=-1, bit[2]=5. Sum = 4.' },
    },
    {
      id: 6,
      title: 'Query Prefix Sum (1 to 5)',
      explanation: 'We want the sum of the first 5 elements. Start at i=5. Sum += BIT[5] (0). Next index: 5 - (5 & -5) = 5 - 1 = 4. Sum += BIT[4] (4). Next index: 4 - 4 = 0. Stop. The total sum is 0 + 4 = 4. WHY: BIT[5] covers just index 5 (value 0). BIT[4] covers indices 1 to 4 (sum = 4).',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 5, -1, 4, 0], currentIdx: 5, action: 'Query(5): bit[5]=0, bit[4]=4. Sum = 4.' },
    },
    {
      id: 7,
      title: 'Final BIT State',
      explanation: 'The BIT array is fully populated and reflects the prefix sums of the original array. The queries have returned the correct results.',
      state: { array: [3, 2, -1, 6, 5], bit: [0, 3, 5, -1, 4, 0], currentIdx: 5, action: 'BIT ready for queries.', found: true },
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
      'HashMap stores key -> node.',
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
      title: 'Initialize Capacity and Sentinels',
      explanation: 'Capacity = 2. We create a HashMap and a Doubly Linked List with two dummy nodes: Head and Tail. WHY: Sentinel nodes (dummy Head and Tail) eliminate edge cases. We never have to check if the list is empty or if we are inserting/removing at the boundaries.',
      state: { map: {}, list: ['Head', 'Tail'], capacity: 2, action: 'Init with dummy Head and Tail.' },
    },
    {
      id: 1,
      title: 'Put(1, 1)',
      explanation: 'We create a new node with key=1, value=1. We add it to the HashMap and insert it right after the Head (Most Recently Used position). List: Head <-> 1 <-> Tail.',
      state: { map: {1: 1}, list: ['Head', '1', 'Tail'], capacity: 2, action: 'Put key 1. Node added after Head.' },
    },
    {
      id: 2,
      title: 'Put(2, 2)',
      explanation: 'We create a new node with key=2, value=2. We add it to the HashMap and insert it after the Head. The current MRU is 2, and 1 is pushed down. List: Head <-> 2 <-> 1 <-> Tail.',
      state: { map: {1: 1, 2: 2}, list: ['Head', '2', '1', 'Tail'], capacity: 2, action: 'Put key 2. Added after Head.' },
    },
    {
      id: 3,
      title: 'Get(1)',
      explanation: 'We look up key 1 in the HashMap. It exists. We return its value (1). We also move node 1 to the Head to mark it as Most Recently Used. List becomes: Head <-> 1 <-> 2 <-> Tail. WHY: In an LRU cache, accessing an item makes it the most recently used.',
      state: { map: {1: 1, 2: 2}, list: ['Head', '1', '2', 'Tail'], capacity: 2, action: 'Get key 1. Moved to front.' },
    },
    {
      id: 4,
      title: 'Put(3, 3) - Cache Full',
      explanation: 'We want to add key 3. The cache is full (size 2). We must evict the Least Recently Used node. The LRU node is the one right before the Tail (node 2). We remove node 2 from both the HashMap and the Linked List.',
      state: { map: {1: 1}, list: ['Head', '1', 'Tail'], capacity: 2, action: 'Evicted key 2 (LRU).' },
    },
    {
      id: 5,
      title: 'Put(3, 3) - Add New Node',
      explanation: 'Now there is space. We create the node for key 3 and insert it after the Head. List: Head <-> 3 <-> 1 <-> Tail.',
      state: { map: {1: 1, 3: 3}, list: ['Head', '3', '1', 'Tail'], capacity: 2, action: 'Put key 3. Added after Head.' },
    },
    {
      id: 6,
      title: 'Get(2)',
      explanation: 'We look up key 2. It was evicted, so it is not in the HashMap. We return -1. WHY: The eviction policy removed the least recently used item when the cache exceeded its capacity.',
      state: { map: {1: 1, 3: 3}, list: ['Head', '3', '1', 'Tail'], capacity: 2, action: 'Get key 2. Return -1 (not found).' },
    },
    {
      id: 7,
      title: 'Put(1, 10) - Update Existing',
      explanation: 'We want to put key 1 with a new value (10). Key 1 already exists. We update its value in the HashMap and move its node to the Head. List: Head <-> 1 <-> 3 <-> Tail.',
      state: { map: {1: 10, 3: 3}, list: ['Head', '1', '3', 'Tail'], capacity: 2, action: 'Update key 1 to 10. Moved to front.' },
    },
    {
      id: 8,
      title: 'Get(3)',
      explanation: 'We look up key 3. It exists. We return 3. We move it to the Head. List: Head <-> 3 <-> 1 <-> Tail.',
      state: { map: {1: 10, 3: 3}, list: ['Head', '3', '1', 'Tail'], capacity: 2, action: 'Get key 3. Moved to front.' },
    },
    {
      id: 9,
      title: 'Final State',
      explanation: 'The cache operations are complete. The internal structures (HashMap and Linked List) are in sync and reflect the correct LRU ordering.',
      state: { map: {1: 10, 3: 3}, list: ['Head', '3', '1', 'Tail'], capacity: 2, action: 'Final state.', found: true },
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