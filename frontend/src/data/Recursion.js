// ============================================================
// LINEAR RECURSION — Factorial
// ============================================================
export const linearRecursion = {
  id: 'linear-recursion',
  patternId: 'recursion',
  title: 'Linear Recursion',
  subtitle: 'The Call Stack',
  type: 'linear-recursion',
  difficulty: 'Easy',

  coreConcept: {
    what: 'A function that calls itself exactly once per execution, creating a single chain of calls.',
    why: 'It is the simplest form of recursion and perfectly models the call stack (LIFO). Each call waits for the next one to finish.',
    when: 'Calculating factorials, traversing a linked list, or any problem with a clear "do this, then move to the next" structure.',
    properties: [
      'Base case stops the recursion.',
      'Recursive case moves closer to the base case.',
      'Space complexity is O(N) due to the call stack.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Calculate the factorial".',
      '"Sum of first N numbers".',
      'A problem that can be reduced by 1 step at a time.',
    ],
    inputs: ['Integer N'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial Call',
      explanation: 'We call factorial(3). The function is pushed onto the call stack.',
      state: {
        callStack: [{ name: 'fact(3)', returnValue: null, status: 'active' }], currentAction: 'Call fact(3)', result: null, action: 'fact(3) starts.',
      },
    },
    {
      id: 1,
      title: 'Recursive Call',
      explanation: 'fact(3) needs fact(2). So it pauses, and fact(2) is pushed onto the stack.',
      state: {
        callStack: [
          { name: 'fact(3)', returnValue: null, status: 'paused' },
          { name: 'fact(2)', returnValue: null, status: 'active' }
        ], currentAction: 'Call fact(2)', result: null, action: 'fact(2) starts.',
      },
    },
    {
      id: 2,
      title: 'Base Case Reached',
      explanation: 'fact(2) calls fact(1). fact(1) hits the base case and returns 1.',
      state: {
        callStack: [
          { name: 'fact(3)', returnValue: null, status: 'paused' },
          { name: 'fact(2)', returnValue: null, status: 'paused' },
          { name: 'fact(1)', returnValue: 1, status: 'returning' }
        ], currentAction: 'fact(1) returns 1', result: null, action: 'Base case reached.',
      },
    },
    {
      id: 3,
      title: 'Unwinding the Stack',
      explanation: 'fact(1) returns 1. fact(2) calculates 2 * 1 = 2 and returns it.',
      state: {
        callStack: [
          { name: 'fact(3)', returnValue: null, status: 'paused' },
          { name: 'fact(2)', returnValue: 2, status: 'returning' },
        ], currentAction: 'fact(2) returns 2', result: null, action: 'Unwinding.',
      },
    },
    {
      id: 4,
      title: 'Final Result',
      explanation: 'fact(2) returns 2. fact(3) calculates 3 * 2 = 6 and returns it. The stack is empty.',
      state: {
        callStack: [], currentAction: 'fact(3) returns 6', result: 6, action: 'Result: 6', found: true,
      },
    },
  ],

  javaCode: `public class Factorial {
    public int factorial(int n) {
        // 1. Base case
        if (n <= 1) {
            return 1;
        }
        // 2. Recursive case
        return n * factorial(n - 1);
    }
}`,

  javaExplanation: [
    { line: 'if (n <= 1) return 1;', note: 'The base case stops the recursion. Without it, we get a StackOverflowError.' },
    { line: 'return n * factorial(n - 1);', note: 'The function calls itself with a smaller input, gradually moving toward the base case.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'We make N recursive calls. The call stack holds N frames.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'An iterative loop would use O(1) space, but recursion is often cleaner to read.',
  },

  commonMistakes: [
    { title: 'Missing Base Case', detail: 'Forgetting the `if (n <= 1)` check will cause infinite recursion and a stack overflow.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Factorial Trailing Zeroes', url: 'https://leetcode.com/problems/factorial-trailing-zeroes/' },
    { level: 'Easy', title: 'Sum of All Odd Length Subarrays', url: 'https://leetcode.com/problems/sum-of-all-odd-length-subarrays/' },
  ],

  quickRevision: [
    'Base case returns immediately.',
    'Recursive case calls self with smaller input.',
    'O(N) time and space.',
  ],
};

// ============================================================
// TREE RECURSION — Fibonacci
// ============================================================
export const treeRecursion = {
  id: 'tree-recursion',
  patternId: 'recursion',
  title: 'Tree Recursion',
  subtitle: 'Branching Paths',
  type: 'tree-recursion',
  difficulty: 'Medium',

  coreConcept: {
    what: 'A function that calls itself multiple times per execution, creating a branching tree of calls.',
    why: 'It models problems where you have multiple choices at each step, like generating subsets, permutations, or calculating sequences.',
    when: 'Fibonacci, binary tree traversals, or any problem with overlapping subproblems (which usually leads to DP).',
    properties: [
      'The call stack grows exponentially.',
      'Often has overlapping subproblems (same calculation repeated).',
      'O(2^N) time complexity if not memoized.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Calculate the Nth Fibonacci number".',
      '"Find all paths".',
      'The function branches into two or more calls.',
    ],
    inputs: ['Integer N'],
    constraints: ['O(2^N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Call fib(3)',
      explanation: 'fib(3) calls fib(2) and fib(1). It pauses to wait for both.',
      state: {
        callStack: [{ name: 'fib(3)', returnValue: null, status: 'active' }], currentAction: 'Call fib(3)', result: null, action: 'fib(3) branches.',
      },
    },
    {
      id: 1,
      title: 'Left Branch',
      explanation: 'fib(2) calls fib(1) and fib(0).',
      state: {
        callStack: [
          { name: 'fib(3)', returnValue: null, status: 'paused' },
          { name: 'fib(2)', returnValue: null, status: 'active' }
        ], currentAction: 'Call fib(2)', result: null, action: 'fib(2) branches.',
      },
    },
    {
      id: 2,
      title: 'Base Cases',
      explanation: 'fib(1) returns 1. fib(0) returns 0. fib(2) adds them: 1 + 0 = 1.',
      state: {
        callStack: [
          { name: 'fib(3)', returnValue: null, status: 'paused' },
          { name: 'fib(2)', returnValue: 1, status: 'returning' }
        ], currentAction: 'fib(2) returns 1', result: null, action: 'fib(2) resolved.',
      },
    },
    {
      id: 3,
      title: 'Right Branch',
      explanation: 'fib(3) now calls fib(1) on the right side. It returns 1.',
      state: {
        callStack: [
          { name: 'fib(3)', returnValue: null, status: 'paused' },
          { name: 'fib(1)', returnValue: 1, status: 'returning' }
        ], currentAction: 'fib(1) returns 1', result: null, action: 'Right branch resolved.',
      },
    },
    {
      id: 4,
      title: 'Combine',
      explanation: 'fib(3) adds the results: 1 + 1 = 2.',
      state: {
        callStack: [], currentAction: 'fib(3) returns 2', result: 2, action: 'Result: 2', found: true,
      },
    },
  ],

  javaCode: `public class Fibonacci {
    public int fib(int n) {
        if (n <= 1) return n;
        return fib(n - 1) + fib(n - 2);
    }
}`,

  javaExplanation: [
    { line: 'if (n <= 1) return n;', note: 'Base cases: fib(0) = 0, fib(1) = 1.' },
    { line: 'return fib(n - 1) + fib(n - 2);', note: 'The function calls itself twice, creating a binary tree of calls.' },
  ],

  complexity: {
    time: 'O(2^N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'The recursion tree has 2^N nodes. The call stack depth is N.',
  },

  bruteForce: {
    time: 'O(2^N)',
    space: 'O(N)',
    note: 'Memoization (DP) reduces time to O(N) by caching results.',
  },

  commonMistakes: [
    { title: 'Not using Memoization', detail: 'If N is large (e.g., 40), the naive recursion will timeout because it recalculates the same subproblems repeatedly.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/' },
    { level: 'Medium', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/' },
  ],

  quickRevision: [
    'Multiple recursive calls.',
    'Can be optimized with DP.',
    'O(2^N) time.',
  ],
};

// ============================================================
// DIVIDE & CONQUER — Binary Search
// ============================================================
export const divideAndConquer = {
  id: 'divide-and-conquer',
  patternId: 'recursion',
  title: 'Divide & Conquer',
  subtitle: 'Divide, Solve, Combine',
  type: 'divide-and-conquer',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Divide the problem into smaller, independent subproblems, solve them recursively, and combine their results.',
    why: 'It drastically reduces time complexity (like O(N) to O(log N) for Binary Search or O(N²) to O(N log N) for Merge Sort).',
    when: 'Binary Search, Merge Sort, Quick Sort, or when a problem can be split into independent chunks.',
    properties: [
      'The subproblems are independent of each other.',
      'Requires a combine step (which might be trivial).',
      'O(log N) or O(N log N) time.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Sorted array".',
      '"Split the array in half".',
      'The problem can be solved by combining solutions to smaller parts.',
    ],
    inputs: ['Sorted Array', 'Tree'],
    constraints: ['O(log N) or O(N log N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial Call',
      explanation: 'Search for 7 in [1, 3, 5, 7, 9]. Left=0, Right=4. Mid=2 (value 5).',
      state: {
        callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'active' }], currentAction: 'Check mid=2 (5 < 7)', result: null, action: 'Mid is 5. Go right.',
      },
    },
    {
      id: 1,
      title: 'Divide',
      explanation: 'Target 7 is greater than 5. We discard the left half and recurse on the right half [7, 9]. Left=3, Right=4.',
      state: {
        callStack: [
          { name: 'bs(0,4)', returnValue: null, status: 'paused' },
          { name: 'bs(3,4)', returnValue: null, status: 'active' }
        ], currentAction: 'Call bs(3,4)', result: null, action: 'Recurse on right half.',
      },
    },
    {
      id: 2,
      title: 'Base Case Found',
      explanation: 'Mid=3 (value 7). Target matches! Return index 3.',
      state: {
        callStack: [
          { name: 'bs(0,4)', returnValue: null, status: 'paused' },
          { name: 'bs(3,4)', returnValue: 3, status: 'returning' }
        ], currentAction: 'Found 7 at index 3', result: null, action: 'Found target.',
      },
    },
    {
      id: 3,
      title: 'Combine',
      explanation: 'The result bubbles up. bs(0,4) returns 3.',
      state: {
        callStack: [], currentAction: 'Return 3', result: 3, action: 'Final result: 3', found: true,
      },
    },
  ],

  javaCode: `public class BinarySearch {
    public int search(int[] nums, int target) {
        return binarySearch(nums, 0, nums.length - 1, target);
    }

    private int binarySearch(int[] nums, int left, int right, int target) {
        if (left > right) return -1; // Base case: not found
        
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) {
            return binarySearch(nums, mid + 1, right, target);
        } else {
            return binarySearch(nums, left, mid - 1, target);
        }
    }
}`,

  javaExplanation: [
    { line: 'if (left > right) return -1;', note: 'Base case: the search space is empty, target not found.' },
    { line: 'int mid = left + (right - left) / 2;', note: 'Find the middle point to divide the space.' },
    { line: 'return binarySearch(...)', note: 'Conquer the correct half recursively.' },
  ],

  complexity: {
    time: 'O(log N)',
    space: 'O(log N)',
    aux: 'O(log N)',
    explanation: 'The search space halves at each step. The call stack depth is log N.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'Linear search, which checks every element.',
  },

  commonMistakes: [
    { title: 'Using `mid` instead of `mid+1` / `mid-1`', detail: 'If you recurse with the same boundaries, you will cause an infinite loop.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/' },
    { level: 'Medium', title: 'Merge Sort', url: 'https://leetcode.com/problems/sort-an-array/' },
  ],

  quickRevision: [
    'Divide problem into halves.',
    'Solve each half recursively.',
    'Combine results.',
  ],
};

export const recursionSubPatterns = [linearRecursion, treeRecursion, divideAndConquer];

export const recursionOverview = {
  id: 'recursion',
  title: 'Recursion',
  subtitle: 'Solving problems by breaking them down',
  introduction: 'Recursion is a technique where a function calls itself to solve smaller instances of the same problem. It relies on the call stack to remember previous states. Every recursive function must have a base case and a recursive case.',
  coreConcept: {
    what: 'A function calling itself to solve subproblems.',
    why: 'It provides an elegant way to solve complex, self-similar problems like tree traversals, sorting, and combinatorics.',
    when: 'When a problem can be broken down into identical, smaller subproblems.',
  },
  whenToUse: [
    'Trees and graphs (DFS).',
    'Divide and conquer algorithms (Merge Sort, Quick Sort).',
    'Backtracking (Subsets, Permutations).',
  ],
  recognitionClues: [
    '"Calculate the Nth...".',
    '"Traverse the tree".',
    '"Find all combinations".',
  ],
  importantProperties: [
    'Base case: stops the recursion.',
    'Recursive case: calls itself with smaller input.',
    'Space complexity is O(N) due to the call stack.',
  ],
  comparison: [
    { aspect: 'Linear', when: 'Factorial, Linked List', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Tree', when: 'Fibonacci, DFS', time: 'O(2^N)', space: 'O(N)' },
    { aspect: 'Divide & Conquer', when: 'Binary Search, Merge Sort', time: 'O(log N) or O(N log N)', space: 'O(log N)' },
  ],
  commonMistakes: [
    { title: 'Missing Base Case', detail: 'Leads to infinite recursion and StackOverflowError.' },
    { title: 'Not Moving Towards Base Case', detail: 'If the recursive call doesn\'t reduce the input size, it will never hit the base case.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/' },
    { level: 'Easy', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/' },
    { level: 'Medium', title: 'Merge Sort', url: 'https://leetcode.com/problems/sort-an-array/' },
  ],
};