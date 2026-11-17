// ============================================================
// CYCLE DETECTION — Linked List Cycle
// ============================================================
export const cycleDetection = {
  id: 'cycle-detection',
  patternId: 'fast-slow',
  title: 'Cycle Detection',
  subtitle: 'The Tortoise and the Hare',
  type: 'cycle-detection',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Two pointers move at different speeds. The slow pointer moves 1 step, the fast pointer moves 2 steps.',
    why: 'If the linked list has a cycle (a loop), the fast pointer will eventually enter the loop and start lapping the slow pointer. If there is no cycle, the fast pointer will hit the end of the list (null).',
    when: 'When you need to detect if a sequence loops infinitely, or find the start of a loop.',
    properties: [
      'Fast pointer moves twice as fast as slow.',
      'If they meet, there is a cycle.',
      'If fast reaches null, there is no cycle.',
    ],
  },

  patternRecognition: {
    clues: [
      'The problem mentions a "cycle" or "loop".',
      'Linked List with a potential infinite loop.',
      '"Happy Number" (sum of squares eventually loops).',
    ],
    inputs: ['Linked List', 'Array with next pointers', 'Mathematical sequences'],
    constraints: ['Must use O(1) extra space (no Hash Sets)'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: The Corrupted Order Log',
      explanation: 'Scenario: A gift shop\'s order log has a corrupted pointer — one order accidentally links back to an earlier order, creating an infinite loop. We must detect this using O(1) memory (no HashSet, no visited array — the log is streaming in real time). The list is [3, 2, 0, -4, 5, 6], where node 6 (value 6) links back to node 2 (value 0). Slow (tortoise) and Fast (hare) both start at the head (node 0). Fast moves 2x speed — if there is a cycle, the hare will eventually lap the tortoise.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 1}],
        slow: 0, fast: 0, cycleStart: 1,
        action: 'Slow and Fast start at head.',
      },
    },
    {
      id: 1,
      title: 'Both Leave the Starting Line',
      explanation: 'Slow advances 1: 0 → 1 (value 2). Fast advances 2: 0 → 1 → 2 (value 0). The gap between them is 1. Fast is now at the first cycle node (index 2). Notice that we never need to compare against each other before the list enters a cycle — the race only matters inside the loop.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 1}],
        slow: 1, fast: 2, cycleStart: 1,
        action: 'Slow = 1, Fast = 2. Gap = 1.',
      },
    },
    {
      id: 2,
      title: 'Fast Extends the Lead',
      explanation: 'Slow: 1 → 2 (value 0). Fast: 2 → 3 → 4 (values -4 then 5). Gap = 2. Fast is now closing in on the last node of the list — but the "last" node points back to node 1, so Fast will never fall off the end. This is the structural signal of a cycle.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 1}],
        slow: 2, fast: 4, cycleStart: 1,
        action: 'Slow = 2, Fast = 4. Gap = 2.',
      },
    },
    {
      id: 3,
      title: 'Fast Laps Slow',
      explanation: 'Slow: 2 → 3. Fast: 4 → 5 → 1 (wraps around the cycle!). Slow = 3, Fast = 1. This is the counterintuitive moment — Fast is now at a LOWER index than Slow. But in cycle terms, Fast has completed a full lap and is hunting Slow from behind. The gap between them (measured within the cycle) is now 2, and each subsequent step closes it by 1.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 1}],
        slow: 3, fast: 1, cycleStart: 1,
        action: 'Fast wrapped to 1. Gap = 2 (in cycle).',
      },
    },
    {
      id: 4,
      title: 'Closing the Gap',
      explanation: 'Slow: 3 → 4. Fast: 1 → 2 → 3. Slow = 4, Fast = 3. Fast is gaining — each step reduces the gap by 1 (Fast moves 2, Slow moves 1). If the gap was G, after one step it is G-1. This is why they MUST meet: G decreases by exactly 1 per iteration, guaranteed to hit 0 within the cycle.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 1}],
        slow: 4, fast: 3, cycleStart: 1,
        action: 'Slow = 4, Fast = 3. Gap = 1.',
      },
    },
    {
      id: 5,
      title: 'Collision Detected',
      explanation: 'Slow: 4 → 5. Fast: 3 → 4 → 5. Slow == Fast == 5 (value 6). Collision! Cycle confirmed. The entire detection used only two pointer variables — no HashSet, no visited-array, no counter. Time: each pointer took at most N steps. Space: O(1). This is Floyd\'s Cycle Detection Algorithm.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 1}],
        slow: 5, fast: 5, cycleStart: 1,
        action: 'Slow == Fast at node 5. Cycle found!', found: true,
      },
    },
  ],

  javaCode: `class ListNode {
    int val;
    ListNode next;
    ListNode(int x) { val = x; next = null; }
}

public class Solution {
    public boolean hasCycle(ListNode head) {
        if (head == null || head.next == null) return false;
        
        ListNode slow = head;
        ListNode fast = head;
        
        while (fast != null && fast.next != null) {
            slow = slow.next;          // Moves 1 step
            fast = fast.next.next;     // Moves 2 steps
            
            if (slow == fast) {
                return true;           // They met!
            }
        }
        return false;                  // Fast reached the end
    }
}`,

  javaExplanation: [
    { line: 'while (fast != null && fast.next != null)', note: 'Fast checks both itself and the next node to avoid NullPointerException.' },
    { line: 'slow = slow.next;', note: 'Tortoise takes 1 step.' },
    { line: 'fast = fast.next.next;', note: 'Hare takes 2 steps.' },
    { line: 'if (slow == fast)', note: 'If they point to the same node, there is a cycle.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'In the worst case, the fast pointer traverses the list once. We only use two pointers.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use a HashSet to store visited nodes. If you see a node twice, there is a cycle. This uses O(N) memory.',
  },

  commonMistakes: [
    { title: 'Missing the .next null check', detail: 'If you only check `fast != null`, `fast.next.next` will throw a NullPointerException when `fast.next` is null.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/' },
    { level: 'Medium', title: 'Linked List Cycle II', url: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
    { level: 'Easy', title: 'Happy Number', url: 'https://leetcode.com/problems/happy-number/' },
  ],

  quickRevision: [
    'Slow moves 1, Fast moves 2.',
    'Check fast != null && fast.next != null.',
    'If slow == fast, cycle exists.',
  ],
};

// ============================================================
// FIND MIDDLE — Middle of the Linked List
// ============================================================
export const findMiddle = {
  id: 'find-middle',
  patternId: 'fast-slow',
  title: 'Find Middle',
  subtitle: 'The Runner and the Walker',
  type: 'find-middle',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Use two pointers moving at different speeds to find the exact middle of a sequence in one pass.',
    why: 'If the fast pointer runs to the finish line at 2x speed, the slow pointer will be exactly halfway there. It saves you from having to traverse the list twice (once to count, once to find the middle).',
    when: 'When you need to split a linked list, or find the exact center node.',
    properties: [
      'Slow pointer stops at the middle.',
      'For even lengths, it usually returns the second middle node.',
      'One pass only.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find the middle node".',
      '"Split the linked list in half".',
      'Reorder a list (e.g., L0 → Ln → L1 → Ln-1).',
    ],
    inputs: ['Linked List'],
    constraints: ['Must be done in one pass O(N)'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: Split for Merge Sort',
      explanation: 'Scenario: A music streaming service has a playlist of 9 songs [1, 2, 3, 4, 5, 6, 7, 8, 9] that must be split at the midpoint for merge sort. The naive way: count all nodes (1 full pass), then walk to count/2 (a second pass). The fast-slow way: ONE pass. Both Slow and Fast start at the head (node 1). Fast will run 2x — when Fast finishes, Slow will be at the exact middle.',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 6}, {id: 6, val: 7, next: 7}, {id: 7, val: 8, next: 8}, {id: 8, val: 9, next: null}],
        slow: 0, fast: 0,
        action: 'Start at head (node 1).',
      },
    },
    {
      id: 1,
      title: 'First Stride — Fast Doubles Up',
      explanation: 'Slow takes 1 step to node 2. Fast takes 2 steps: node 1 → node 2 → node 3. The invariant begins: Slow is at position i, Fast at position 2i. If Fast stops at position 2k, Slow will be at position k — exactly the middle.',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 6}, {id: 6, val: 7, next: 7}, {id: 7, val: 8, next: 8}, {id: 8, val: 9, next: null}],
        slow: 1, fast: 2,
        action: 'Slow = 2, Fast = 3.',
      },
    },
    {
      id: 2,
      title: 'Second Stride — Halfway for Fast',
      explanation: 'Slow: 2 → 3. Fast: 3 → 4 → 5. Position check: Slow is at index 2 (3rd node), Fast is at index 4 (5th node). The distance between them is still 2 — it stays 2 because Fast gains exactly 1 position per step relative to Slow.',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 6}, {id: 6, val: 7, next: 7}, {id: 7, val: 8, next: 8}, {id: 8, val: 9, next: null}],
        slow: 2, fast: 4,
        action: 'Slow = 3, Fast = 5.',
      },
    },
    {
      id: 3,
      title: 'Third Stride — Fast Near the End',
      explanation: 'Slow: 3 → 4. Fast: 5 → 6 → 7. Fast is now at node 7 (index 6), and the last node is node 9 (index 8). Fast needs one more loop iteration — it can still legally move (fast.next != null). If Fast tried to move 2 more steps now it would reach node 9. One more iteration is possible.',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 6}, {id: 6, val: 7, next: 7}, {id: 7, val: 8, next: 8}, {id: 8, val: 9, next: null}],
        slow: 3, fast: 6,
        action: 'Slow = 4, Fast = 7.',
      },
    },
    {
      id: 4,
      title: 'Fast Reaches the End — Slow Is the Middle',
      explanation: 'Slow: 4 → 5. Fast: 7 → 8 → 9. Fast is now at node 9 — the LAST node. Check loop condition: fast != null ✓, fast.next != null? fast.next = null ✗. Loop exits. Slow is at node 5 (index 4), which is the 5th of 9 nodes — the exact middle. We never counted the list. We never did a second pass. O(N) time, O(1) space.',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: 5}, {id: 5, val: 6, next: 6}, {id: 6, val: 7, next: 7}, {id: 7, val: 8, next: 8}, {id: 8, val: 9, next: null}],
        slow: 4, fast: 8,
        action: 'Fast reached the end. Middle is Slow (5).', found: true,
      },
    },
  ],

  javaCode: `public class Solution {
    public ListNode middleNode(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;

        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        
        return slow;
    }
}`,

  javaExplanation: [
    { line: 'ListNode slow = head; ListNode fast = head;', note: 'Start both at the beginning.' },
    { line: 'while (fast != null && fast.next != null)', note: 'Loop until Fast hits the end. We check fast.next because Fast moves two steps.' },
    { line: 'slow = slow.next;', note: 'Slow advances one node.' },
    { line: 'fast = fast.next.next;', note: 'Fast advances two nodes.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Fast traverses the list in N/2 steps. This is O(N) time and O(1) space.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'Traverse the whole list once to count the length, then traverse again to length/2. This is O(N) time but requires 1.5 passes.',
  },

  commonMistakes: [
    { title: 'Returning fast instead of slow', detail: 'Fast will be null (or the last node). Slow is the one that stopped in the middle.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
    { level: 'Medium', title: 'Reorder List', url: 'https://leetcode.com/problems/reorder-list/' },
    { level: 'Hard', title: 'Sort List', url: 'https://leetcode.com/problems/sort-list/' },
  ],

  quickRevision: [
    'Slow = head, Fast = head.',
    'Loop while fast != null && fast.next != null.',
    'Slow moves 1, Fast moves 2.',
    'Return slow.',
  ],
};

// ============================================================
// NTH FROM END — Remove Nth Node From End of List
// ============================================================
export const nthFromEnd = {
  id: 'nth-from-end',
  patternId: 'fast-slow',
  title: 'Nth From End',
  subtitle: 'The Measuring Tape',
  type: 'nth-from-end',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Create a fixed gap of N nodes between the fast pointer and the slow pointer. Then move both at the same speed.',
    why: 'When the fast pointer hits the end of the list, the slow pointer will be exactly N steps behind, pointing right at the node we want to remove.',
    when: 'When you need to find or remove a node based on its distance from the end.',
    properties: [
      'Both pointers move at the same speed.',
      'The gap between them is exactly N.',
      'Requires a "dummy" node to handle edge cases (like removing the head).',
    ],
  },

  patternRecognition: {
    clues: [
      '"Remove the Nth node from the end".',
      '"Find the Nth to last node".',
      'You don\'t know the total length of the list.',
    ],
    inputs: ['Linked List'],
    constraints: ['Must be done in one pass O(N)'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: Trim the Last N Records',
      explanation: 'Scenario: A backup system stores the most recent 6 checkpoints [1, 2, 3, 4, 5, 6] as a linked list, but the retention policy requires removing the 2nd-from-last checkpoint (node 5). We don\'t know the total length — the list is being rebuilt from a stream. We use a Dummy node (D) in front of head so that even removing the original head works without special-casing. Slow starts at Dummy; Fast moves 2 steps ahead to create the gap. Gap = N = 2 — meaning Slow and Fast will always be exactly 2 nodes apart.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: 6}, {id: 6, val: 6, next: null}],
        slow: 0, fast: 2,
        action: 'Fast moved 2 steps ahead. Gap = 2.',
      },
    },
    {
      id: 1,
      title: 'Move Both — Keep the Tape Fixed',
      explanation: 'Slow: D → 1. Fast: 2 → 3. Gap still 2 (nodes 1 and 2 remain between them). The key insight: whatever distance Fast has left to cover to reach the end, Slow has exactly that many nodes left to reach the N-th-from-end position. We are not measuring distance from head — we are measuring distance from tail.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: 6}, {id: 6, val: 6, next: null}],
        slow: 1, fast: 3,
        action: 'Slow = 1, Fast = 3. Gap = 2.',
      },
    },
    {
      id: 2,
      title: 'Halfway There',
      explanation: 'Slow: 1 → 2. Fast: 3 → 4. Still 2 apart. Fast has traversed 4 of 6 data nodes; 2 remain ahead. When Fast hits the last node, Slow will be exactly 2 nodes before the tail — which is where Slow needs to stop so slow.next is the target.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: 6}, {id: 6, val: 6, next: null}],
        slow: 2, fast: 4,
        action: 'Slow = 2, Fast = 4. Gap = 2.',
      },
    },
    {
      id: 3,
      title: 'One More Step — Slow in Position',
      explanation: 'Slow: 2 → 3. Fast: 4 → 5. Fast is now two nodes from the tail. Slow is at node 3. The node Slow.next points to (node 4) is NOT yet the target — we need Fast to advance one more time so Slow lands on 4 and Slow.next = 5 (the target).',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: 6}, {id: 6, val: 6, next: null}],
        slow: 3, fast: 5,
        action: 'Slow = 3, Fast = 5. Gap = 2.',
      },
    },
    {
      id: 4,
      title: 'Fast Hits the End — Delete the Target',
      explanation: 'Slow: 3 → 4. Fast: 5 → 6 (the last node). Loop exits because fast.next is null. Slow is at node 4 — the node IMMEDIATELY BEFORE the target (node 5). Unlink: slow.next = slow.next.next (skip node 5). Return dummy.next to get the (possibly new) head. One pass, O(N) time, O(1) space.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: 6}, {id: 6, val: 6, next: null}],
        slow: 4, fast: 6,
        action: 'Fast at end. Slow at 4. Remove node 5.', found: true,
      },
    },
  ],

  javaCode: `public class Solution {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        
        ListNode slow = dummy;
        ListNode fast = dummy;
        
        // 1. Advance fast so there are n nodes between slow and fast
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }
        
        // 2. Move both until fast hits the end
        while (fast != null) {
            slow = slow.next;
            fast = fast.next;
        }
        
        // 3. Skip the target node
        slow.next = slow.next.next;
        
        return dummy.next;
    }
}`,

  javaExplanation: [
    { line: 'ListNode dummy = new ListNode(0); dummy.next = head;', note: 'Dummy node acts as a safety net if we need to remove the original head.' },
    { line: 'for (int i = 0; i <= n; i++) fast = fast.next;', note: 'Create a gap of exactly N+1 nodes. We use N+1 so that Slow stops BEFORE the node to delete.' },
    { line: 'while (fast != null)', note: 'Move them together until Fast falls off the end.' },
    { line: 'slow.next = slow.next.next;', note: 'Slow is now right before the target. Skip over the target to delete it.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'The fast pointer traverses the list once. The slow pointer traverses N-K nodes. One pass total.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'Find the total length first (1 pass), then traverse again to length - n (2nd pass).',
  },

  commonMistakes: [
    { title: 'Not using a dummy node', detail: 'If N is equal to the length of the list, you need to remove the head. A dummy node makes this edge case trivial.' },
    { title: 'Moving fast by N instead of N+1', detail: 'If you move it by N, slow will end up ON the node to delete, meaning you can\'t skip it. You need slow to stop one node BEFORE.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
    { level: 'Medium', title: 'Delete the Middle Node of a Linked List', url: 'https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/' },
  ],

  quickRevision: [
    'Use a dummy node.',
    'Move Fast N+1 steps.',
    'Move Slow and Fast together.',
    'Slow is right before the target.',
    'slow.next = slow.next.next.',
  ],
};

export const fastSlowSubPatterns = [cycleDetection, findMiddle, nthFromEnd];

export const fastSlowOverview = {
  id: 'fast-slow',
  title: 'Fast & Slow Pointers',
  subtitle: 'Moving at different speeds to solve linked list and cycle problems',
  introduction: 'Fast & Slow Pointers (often called Floyd\'s Tortoise and Hare) is a technique where two pointers traverse a sequence at different speeds. This allows you to find the middle of a list, detect cycles, or find elements at a specific distance from the end, all in O(N) time and O(1) space.',
  coreConcept: {
    what: 'Two pointers moving in the same direction but at different speeds (e.g., 1 step vs. 2 steps).',
    why: 'It eliminates the need for extra memory (like Hash Maps) or multiple passes. The speed difference creates a mathematical guarantee that they will meet or reveal structure.',
    when: 'Cycle detection, finding the middle, or locating nodes by distance from the end.',
  },
  whenToUse: [
    'The input is a Linked List.',
    'You need to detect a loop or cycle.',
    'You need to find the middle without knowing the length.',
    'You need O(1) space.',
  ],
  recognitionClues: [
    '"Detect a cycle"',
    '"Find the middle node"',
    '"Remove the Nth node from the end"',
    '"Happy Number" (math sequence loop)',
  ],
  importantProperties: [
    'Fast pointer moves 2 steps, Slow pointer moves 1 step.',
    'If a cycle exists, Fast will lap Slow and they will meet.',
    'Fast reaches the end twice as fast as Slow.',
  ],
  comparison: [
    { aspect: 'Cycle Detection', when: 'Find if a loop exists', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Find Middle', when: 'Middle of list', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Nth from End', when: 'Distance from end', time: 'O(N)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Null Pointer Exceptions', detail: 'Always check `fast != null && fast.next != null` before calling `fast.next.next`.' },
    { title: 'Forgetting the Dummy Node', detail: 'When deleting a node, a dummy node prevents errors when the target is the head.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Linked List Cycle', url: 'https://leetcode.com/problems/linked-list-cycle/' },
    { level: 'Easy', title: 'Middle of the Linked List', url: 'https://leetcode.com/problems/middle-of-the-linked-list/' },
    { level: 'Medium', title: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
    { level: 'Medium', title: 'Linked List Cycle II', url: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
  ],
};