// ============================================================
// REVERSE LINKED LIST — The Pointer Flip
// ============================================================
export const reverseLinkedList = {
  id: 'reverse-linked-list',
  patternId: 'linked-lists',
  title: 'Reverse Linked List',
  subtitle: 'The Pointer Flip',
  type: 'reverse-linked-list',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Reverse the direction of all the next pointers in the linked list.',
    why: 'By maintaining three pointers (prev, curr, next), we can systematically flip each pointer to point to the previous node without losing the rest of the list.',
    when: 'When you need to reverse a sequence or a path.',
    properties: [
      'Iterative approach uses O(1) space.',
      'Recursive approach uses O(N) space on the call stack.',
      'Always save the `next` node before changing `curr.next`.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Reverse the linked list".',
      '"Reverse a sub-list".',
      'Swapping node connections.',
    ],
    inputs: ['Linked List'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial State',
      explanation: 'We start with prev = null and curr = head (node 1).',
      state: {
        nodes: [1, 2, 3, 4], prev: null, curr: 0, next: null, action: 'prev = null, curr = 1.',
      },
    },
    {
      id: 1,
      title: 'Save Next',
      explanation: 'Save `next = curr.next` (node 2) so we don\'t lose the rest of the list.',
      state: {
        nodes: [1, 2, 3, 4], prev: null, curr: 0, next: 1, action: 'next = 2.',
      },
    },
    {
      id: 2,
      title: 'Flip Pointer',
      explanation: 'Flip `curr.next = prev`. Node 1 now points to null.',
      state: {
        nodes: [1, 2, 3, 4], prev: null, curr: 0, next: 1, action: '1 -> null.',
      },
    },
    {
      id: 3,
      title: 'Move Pointers',
      explanation: 'Move `prev = curr` and `curr = next`. Now prev is node 1, curr is node 2.',
      state: {
        nodes: [1, 2, 3, 4], prev: 0, curr: 1, next: null, action: 'prev = 1, curr = 2.',
      },
    },
    {
      id: 4,
      title: 'Repeat',
      explanation: 'Save next (3), flip pointer (2 -> 1), move prev (2), curr (3).',
      state: {
        nodes: [1, 2, 3, 4], prev: 1, curr: 2, next: 2, action: '2 -> 1.',
      },
    },
    {
      id: 5,
      title: 'Finish',
      explanation: 'When curr becomes null, prev points to the new head.',
      state: {
        nodes: [1, 2, 3, 4], prev: 3, curr: null, next: null, action: 'Done! New head is 4.', found: true,
      },
    },
  ],

  javaCode: `public class ReverseLinkedList {
    public ListNode reverseList(ListNode head) {
        ListNode prev = null;
        ListNode curr = head;

        while (curr != null) {
            ListNode nextTemp = curr.next; // 1. Save next
            curr.next = prev;              // 2. Flip pointer
            prev = curr;                   // 3. Move prev
            curr = nextTemp;               // 4. Move curr
        }
        return prev;
    }
}`,

  javaExplanation: [
    { line: 'ListNode nextTemp = curr.next;', note: 'Crucial: Save the next node before breaking the link.' },
    { line: 'curr.next = prev;', note: 'Reverse the pointer direction.' },
    { line: 'prev = curr;', note: 'Advance the prev pointer.' },
    { line: 'curr = nextTemp;', note: 'Advance the curr pointer.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We iterate through the list exactly once. Only three pointers are used.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use a Stack. Push all nodes onto a stack, then pop and rebuild the list.',
  },

  commonMistakes: [
    { title: 'Losing the rest of the list', detail: 'If you don\'t save `next` before doing `curr.next = prev`, you lose the reference to the rest of the list.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/' },
    { level: 'Medium', title: 'Reverse Linked List II', url: 'https://leetcode.com/problems/reverse-linked-list-ii/' },
  ],

  quickRevision: [
    'Save next.',
    'Flip pointer.',
    'Move prev.',
    'Move curr.',
  ],
};

// ============================================================
// MERGE TWO SORTED LISTS — The Zipper
// ============================================================
export const mergeTwoLists = {
  id: 'merge-two-lists',
  patternId: 'linked-lists',
  title: 'Merge Two Sorted Lists',
  subtitle: 'The Zipper',
  type: 'merge-two-lists',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Merge two sorted linked lists into one sorted list by splicing them together.',
    why: 'By using a dummy node and a tail pointer, we can easily build the new list without worrying about edge cases for the head node.',
    when: 'When you need to combine two sorted sequences.',
    properties: [
      'Uses a dummy node to simplify logic.',
      'Compare the current nodes of both lists.',
      'Attach the smaller node to the tail and advance.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Merge two sorted lists".',
      '"Merge sorted arrays (linked list version)".',
    ],
    inputs: ['Two sorted Linked Lists'],
    constraints: ['O(N + M) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Setup',
      explanation: 'List 1: 1 -> 3. List 2: 2 -> 4. We create a dummy node and a tail pointer pointing to it.',
      state: {
        list1: [1, 3], list2: [2, 4], p1: 0, p2: 0, result: ['D'], action: 'Dummy node created.',
      },
    },
    {
      id: 1,
      title: 'Compare 1 and 2',
      explanation: '1 is smaller than 2. Attach 1 to the result, move p1.',
      state: {
        list1: [1, 3], list2: [2, 4], p1: 1, p2: 0, result: ['D', 1], action: 'Attach 1.',
      },
    },
    {
      id: 2,
      title: 'Compare 3 and 2',
      explanation: '2 is smaller than 3. Attach 2 to the result, move p2.',
      state: {
        list1: [1, 3], list2: [2, 4], p1: 1, p2: 1, result: ['D', 1, 2], action: 'Attach 2.',
      },
    },
    {
      id: 3,
      title: 'Compare 3 and 4',
      explanation: '3 is smaller. Attach 3.',
      state: {
        list1: [1, 3], list2: [2, 4], p1: 2, p2: 1, result: ['D', 1, 2, 3], action: 'Attach 3.',
      },
    },
    {
      id: 4,
      title: 'Finish',
      explanation: 'List 1 is empty. Attach the rest of List 2 (4).',
      state: {
        list1: [1, 3], list2: [2, 4], p1: 2, p2: 2, result: ['D', 1, 2, 3, 4], action: 'Attach 4. Done.', found: true,
      },
    },
  ],

  javaCode: `public class MergeTwoLists {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val <= list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        // Attach the remaining nodes
        if (list1 != null) tail.next = list1;
        if (list2 != null) tail.next = list2;

        return dummy.next;
    }
}`,

  javaExplanation: [
    { line: 'ListNode dummy = new ListNode(0);', note: 'Dummy node acts as a placeholder for the start of the new list.' },
    { line: 'if (list1.val <= list2.val)', note: 'Compare the current heads.' },
    { line: 'if (list1 != null) tail.next = list1;', note: 'Attach the leftover nodes directly, as they are already sorted.' },
  ],

  complexity: {
    time: 'O(N + M)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We traverse both lists once. The new list reuses the existing nodes.',
  },

  bruteForce: {
    time: 'O((N+M) log(N+M))',
    space: 'O(N+M)',
    note: 'Put all nodes into an array, sort it, and rebuild the list.',
  },

  commonMistakes: [
    { title: 'Forgetting the leftovers', detail: 'Once one list is empty, you must attach the remaining nodes of the other list.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
  ],

  quickRevision: [
    'Use a dummy node.',
    'Compare heads, attach smaller.',
    'Attach leftovers at the end.',
  ],
};

// ============================================================
// REMOVE NTH NODE — The Gap
// ============================================================
export const removeNthNode = {
  id: 'remove-nth-node',
  patternId: 'linked-lists',
  title: 'Remove Nth Node From End',
  subtitle: 'The Gap',
  type: 'remove-nth-node',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Use two pointers with a gap of N to find the node to remove.',
    why: 'If you maintain a gap of N between two pointers, when the fast pointer reaches the end, the slow pointer will be exactly N steps behind.',
    when: 'Finding or removing a node based on its distance from the end.',
    properties: [
      'Uses a dummy node to handle edge cases (like removing the head).',
      'The fast pointer moves N+1 steps ahead.',
      'Both pointers then move simultaneously.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Remove the Nth node from the end".',
      '"Find the Nth to last node".',
    ],
    inputs: ['Linked List', 'Integer N'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize',
      explanation: 'List: 1 -> 2 -> 3 -> 4 -> 5. N = 2. Create a dummy node pointing to 1. Fast and Slow start at dummy.',
      state: {
        nodes: [1, 2, 3, 4, 5], slow: 'D', fast: 'D', n: 2, action: 'Start at dummy.',
      },
    },
    {
      id: 1,
      title: 'Create Gap',
      explanation: 'Move Fast N+1 (3) steps ahead. Fast is now at node 2.',
      state: {
        nodes: [1, 2, 3, 4, 5], slow: 'D', fast: 1, n: 2, action: 'Fast moved to 2.',
      },
    },
    {
      id: 2,
      title: 'Move Together',
      explanation: 'Move both pointers until Fast reaches the end (null). Slow will be at node 3.',
      state: {
        nodes: [1, 2, 3, 4, 5], slow: 2, fast: 'null', n: 2, action: 'Slow is at 3.',
      },
    },
    {
      id: 3,
      title: 'Remove Node',
      explanation: 'Slow is right before the target (node 4). Skip it: `slow.next = slow.next.next`.',
      state: {
        nodes: [1, 2, 3, 5], slow: 2, fast: 'null', n: 2, action: 'Removed 4.', found: true,
      },
    },
  ],

  javaCode: `public class RemoveNthNode {
    public ListNode removeNthFromEnd(ListNode head, int n) {
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode fast = dummy;
        ListNode slow = dummy;

        // Move fast n+1 steps ahead
        for (int i = 0; i <= n; i++) {
            fast = fast.next;
        }

        // Move both until fast hits the end
        while (fast != null) {
            fast = fast.next;
            slow = slow.next;
        }

        // Remove the target node
        slow.next = slow.next.next;

        return dummy.next;
    }
}`,

  javaExplanation: [
    { line: 'ListNode dummy = new ListNode(0); dummy.next = head;', note: 'Dummy node prevents errors if we need to remove the original head.' },
    { line: 'for (int i = 0; i <= n; i++) fast = fast.next;', note: 'Create a gap of exactly N+1 nodes.' },
    { line: 'slow.next = slow.next.next;', note: 'Skip over the target node to remove it.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'One pass through the list.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'Find the length first, then traverse to (length - n) to remove.',
  },

  commonMistakes: [
    { title: 'Moving fast by N instead of N+1', detail: 'You need slow to stop BEFORE the node to remove, so you can skip it. N+1 creates this exact gap.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
  ],

  quickRevision: [
    'Use dummy node.',
    'Move fast N+1 steps.',
    'Move both until fast is null.',
    'slow.next = slow.next.next.',
  ],
};

export const linkedListsSubPatterns = [reverseLinkedList, mergeTwoLists, removeNthNode];

export const linkedListsOverview = {
  id: 'linked-lists',
  title: 'Linked Lists',
  subtitle: 'Pointer manipulation and sequence building',
  introduction: 'A Linked List is a linear data structure where elements are not stored in contiguous memory locations. Instead, each node contains a value and a reference (pointer) to the next node. This makes insertions and deletions O(1) if you have the pointer, but access is O(N).',
  coreConcept: {
    what: 'A chain of nodes connected by pointers.',
    why: 'Unlike arrays, linked lists can grow and shrink dynamically without reallocating memory.',
    when: 'When you need fast insertions/deletions at the ends, or when memory is fragmented.',
  },
  whenToUse: [
    'The problem explicitly mentions a Linked List.',
    'You need to reverse or rearrange nodes.',
    'You need to merge multiple sorted sequences.',
  ],
  recognitionClues: [
    '"Reverse linked list"',
    '"Merge sorted lists"',
    '"Cycle in a linked list"',
  ],
  importantProperties: [
    'Nodes contain `val` and `next`.',
    'Dummy nodes simplify edge cases.',
    'O(1) space solutions are possible and expected.',
  ],
  comparison: [
    { aspect: 'Reverse', when: 'Flip pointers', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Merge', when: 'Combine sorted lists', time: 'O(N+M)', space: 'O(1)' },
    { aspect: 'Remove Nth', when: 'Distance from end', time: 'O(N)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Losing the rest of the list', detail: 'Always save `next` before changing a pointer.' },
    { title: 'NullPointerException', detail: 'Always check `if (node != null)` before accessing `node.next`.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Reverse Linked List', url: 'https://leetcode.com/problems/reverse-linked-list/' },
    { level: 'Easy', title: 'Merge Two Sorted Lists', url: 'https://leetcode.com/problems/merge-two-sorted-lists/' },
    { level: 'Medium', title: 'Remove Nth Node From End of List', url: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/' },
    { level: 'Medium', title: 'Linked List Cycle II', url: 'https://leetcode.com/problems/linked-list-cycle-ii/' },
  ],
};