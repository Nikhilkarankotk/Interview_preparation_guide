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
      title: 'The Track',
      explanation: 'Imagine a circular track. The slow runner (tortoise) takes 1 step at a time. The fast runner (hare) takes 2 steps. They start at the same place.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 1}],
        slow: 0, fast: 0, cycleStart: 1,
        action: 'Slow and Fast start at head.',
      },
    },
    {
      id: 1,
      title: 'First Move',
      explanation: 'Slow moves 1 step to node 2. Fast moves 2 steps to node 0. They are getting closer.',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 1}],
        slow: 1, fast: 2, cycleStart: 1,
        action: 'Slow = 1, Fast = 2.',
      },
    },
    {
      id: 2,
      title: 'They Meet!',
      explanation: 'Slow moves to node 0. Fast moves 2 steps: -4, then wraps around to node 2. They are now at the same node (index 2). A cycle is detected!',
      state: {
        nodes: [{id: 0, val: 3, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 0, next: 3}, {id: 3, val: -4, next: 1}],
        slow: 2, fast: 2, cycleStart: 1,
        action: 'Slow == Fast at node 2. Cycle found!', found: true,
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
      title: 'At the Start Line',
      explanation: 'Both runners start at the head (node 1).',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: null}],
        slow: 0, fast: 0,
        action: 'Start at head.',
      },
    },
    {
      id: 1,
      title: 'First Stride',
      explanation: 'Slow moves to 2. Fast moves to 3.',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: null}],
        slow: 1, fast: 2,
        action: 'Slow = 2, Fast = 3.',
      },
    },
    {
      id: 2,
      title: 'Finish Line',
      explanation: 'Slow moves to 3. Fast moves to 5. The fast pointer has reached the end of the list. The slow pointer is at 3, which is exactly the middle!',
      state: {
        nodes: [{id: 0, val: 1, next: 1}, {id: 1, val: 2, next: 2}, {id: 2, val: 3, next: 3}, {id: 3, val: 4, next: 4}, {id: 4, val: 5, next: null}],
        slow: 2, fast: 4,
        action: 'Fast reached the end. Middle is Slow (3).', found: true,
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
      title: 'Set the Gap',
      explanation: 'We want to remove the 2nd node from the end (N=2). We add a Dummy node before head. We move the Fast pointer N+1 steps ahead.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: null}],
        slow: 0, fast: 2,
        action: 'Fast moved 2 steps ahead. Gap is 2.',
      },
    },
    {
      id: 1,
      title: 'Move Together',
      explanation: 'Move both pointers at the same speed until Fast reaches the end.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: null}],
        slow: 1, fast: 3,
        action: 'Slow = 1, Fast = 3.',
      },
    },
    {
      id: 2,
      title: 'Keep Moving',
      explanation: 'They keep moving.',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: null}],
        slow: 2, fast: 4,
        action: 'Slow = 2, Fast = 4.',
      },
    },
    {
      id: 3,
      title: 'Fast Hits the End',
      explanation: 'Fast is at the last node (5). Slow is at node 3. The node to remove is the one right after Slow (node 4).',
      state: {
        nodes: [{id: 0, val: 'D', next: 1}, {id: 1, val: 1, next: 2}, {id: 2, val: 2, next: 3}, {id: 3, val: 3, next: 4}, {id: 4, val: 4, next: 5}, {id: 5, val: 5, next: null}],
        slow: 3, fast: 5,
        action: 'Fast is at the end. Slow is at 3. Remove 4.', found: true,
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