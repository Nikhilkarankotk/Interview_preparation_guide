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
      title: 'Initial Call: fact(4)',
      explanation: 'We call factorial(4). The function is pushed onto the call stack and becomes active. WHY: The stack keeps track of where we are in the program. Since it is the first call, the stack has only one frame.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'active' }], currentAction: 'Call fact(4)', result: null, action: 'fact(4) starts.' },
    },
    {
      id: 1,
      title: 'Recursive Call: fact(3)',
      explanation: 'fact(4) needs the result of 3! to compute 4 * 3!. It pauses its execution and calls fact(3). fact(3) is pushed onto the stack. WHY: The current function cannot finish until the smaller subproblem is solved.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'paused' }, { name: 'fact(3)', returnValue: null, status: 'active' }], currentAction: 'Call fact(3)', result: null, action: 'fact(3) starts.' },
    },
    {
      id: 2,
      title: 'Recursive Call: fact(2)',
      explanation: 'fact(3) pauses and calls fact(2) to compute 3 * 2!. fact(2) is pushed onto the stack. The stack is growing deeper.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'paused' }, { name: 'fact(3)', returnValue: null, status: 'paused' }, { name: 'fact(2)', returnValue: null, status: 'active' }], currentAction: 'Call fact(2)', result: null, action: 'fact(2) starts.' },
    },
    {
      id: 3,
      title: 'Recursive Call: fact(1)',
      explanation: 'fact(2) pauses and calls fact(1). fact(1) is pushed onto the stack.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'paused' }, { name: 'fact(3)', returnValue: null, status: 'paused' }, { name: 'fact(2)', returnValue: null, status: 'paused' }, { name: 'fact(1)', returnValue: null, status: 'active' }], currentAction: 'Call fact(1)', result: null, action: 'fact(1) starts.' },
    },
    {
      id: 4,
      title: 'Base Case Hit: Return 1',
      explanation: 'fact(1) hits the base case (n <= 1). It returns 1 immediately. WHY: We cannot break down the problem any further. The recursion stops here and begins to unwind.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'paused' }, { name: 'fact(3)', returnValue: null, status: 'paused' }, { name: 'fact(2)', returnValue: null, status: 'paused' }, { name: 'fact(1)', returnValue: 1, status: 'returning' }], currentAction: 'fact(1) returns 1', result: null, action: 'Base case reached.' },
    },
    {
      id: 5,
      title: 'Unwind: fact(2) Computes',
      explanation: 'fact(1) is popped off the stack. fact(2) resumes and receives the return value 1. It calculates 2 * 1 = 2 and returns 2. WHY: Now that the smaller subproblem is solved, the paused function can finish its own calculation.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'paused' }, { name: 'fact(3)', returnValue: null, status: 'paused' }, { name: 'fact(2)', returnValue: 2, status: 'returning' }], currentAction: 'fact(2) returns 2', result: null, action: 'Unwinding.' },
    },
    {
      id: 6,
      title: 'Unwind: fact(3) Computes',
      explanation: 'fact(2) is popped. fact(3) resumes, receives 2, calculates 3 * 2 = 6, and returns 6.',
      state: { callStack: [{ name: 'fact(4)', returnValue: null, status: 'paused' }, { name: 'fact(3)', returnValue: 6, status: 'returning' }], currentAction: 'fact(3) returns 6', result: null, action: 'Unwinding.' },
    },
    {
      id: 7,
      title: 'Final Result: fact(4) Computes',
      explanation: 'fact(3) is popped. fact(4) resumes, receives 6, calculates 4 * 6 = 24, and returns 24. The stack is now empty.',
      state: { callStack: [], currentAction: 'fact(4) returns 24', result: 24, action: 'Result: 24', found: true },
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
      title: 'Initial Call: fib(3)',
      explanation: 'We call fib(3). The function is pushed onto the stack. It needs to compute fib(2) + fib(1). WHY: Tree recursion branches. The left side (fib(2)) is evaluated completely before the right side (fib(1)).',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'active' }], currentAction: 'Call fib(3)', result: null, action: 'fib(3) branches.' },
    },
    {
      id: 1,
      title: 'Left Branch: fib(2)',
      explanation: 'fib(3) pauses to evaluate the left branch. It calls fib(2). fib(2) is pushed onto the stack.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(2)', returnValue: null, status: 'active' }], currentAction: 'Call fib(2)', result: null, action: 'fib(2) branches.' },
    },
    {
      id: 2,
      title: 'Deep Left: fib(1)',
      explanation: 'fib(2) pauses and calls its left branch, fib(1). fib(1) is pushed onto the stack.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(2)', returnValue: null, status: 'paused' }, { name: 'fib(1)', returnValue: null, status: 'active' }], currentAction: 'Call fib(1)', result: null, action: 'fib(1) base case.' },
    },
    {
      id: 3,
      title: 'Base Case: fib(1) Returns',
      explanation: 'fib(1) hits the base case (n <= 1) and returns 1. It is popped from the stack.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(2)', returnValue: null, status: 'paused' }, { name: 'fib(1)', returnValue: 1, status: 'returning' }], currentAction: 'fib(1) returns 1', result: null, action: 'fib(1) resolved.' },
    },
    {
      id: 4,
      title: 'Deep Right: fib(0)',
      explanation: 'fib(2) resumes and now needs its right branch. It calls fib(0). fib(0) is pushed onto the stack.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(2)', returnValue: null, status: 'paused' }, { name: 'fib(0)', returnValue: null, status: 'active' }], currentAction: 'Call fib(0)', result: null, action: 'fib(0) base case.' },
    },
    {
      id: 5,
      title: 'Base Case: fib(0) Returns',
      explanation: 'fib(0) hits the base case (n <= 1) and returns 0.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(2)', returnValue: null, status: 'paused' }, { name: 'fib(0)', returnValue: 0, status: 'returning' }], currentAction: 'fib(0) returns 0', result: null, action: 'fib(0) resolved.' },
    },
    {
      id: 6,
      title: 'Combine: fib(2) Returns',
      explanation: 'fib(2) has both results (1 and 0). It adds them (1 + 0 = 1) and returns 1. WHY: The combination step merges the results of the left and right branches.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(2)', returnValue: 1, status: 'returning' }], currentAction: 'fib(2) returns 1', result: null, action: 'fib(2) resolved.' },
    },
    {
      id: 7,
      title: 'Right Branch: fib(1)',
      explanation: 'fib(3) has its left result (1). It now evaluates the right branch, calling fib(1).',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(1)', returnValue: null, status: 'active' }], currentAction: 'Call fib(1)', result: null, action: 'fib(1) base case.' },
    },
    {
      id: 8,
      title: 'Base Case: fib(1) Returns',
      explanation: 'fib(1) hits the base case and returns 1.',
      state: { callStack: [{ name: 'fib(3)', returnValue: null, status: 'paused' }, { name: 'fib(1)', returnValue: 1, status: 'returning' }], currentAction: 'fib(1) returns 1', result: null, action: 'Right branch resolved.' },
    },
    {
      id: 9,
      title: 'Final Combine',
      explanation: 'fib(3) now has both results (1 and 1). It adds them (1 + 1 = 2) and returns 2. The stack is empty.',
      state: { callStack: [], currentAction: 'fib(3) returns 2', result: 2, action: 'Result: 2', found: true },
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
      title: 'Initial Call: bs(0,4)',
      explanation: 'We search for 8 in [1, 3, 5, 7, 9]. Left=0, Right=4. Mid = (0 + 4) / 2 = 2. The value at index 2 is 5. WHY: Binary search splits the problem in half by checking the middle element.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'active' }], currentAction: 'Check mid=2 (5 < 8)', result: null, action: 'Mid is 5. Go right.' },
    },
    {
      id: 1,
      title: 'Divide: Go Right',
      explanation: 'Target 8 is greater than 5. We discard the left half [1, 3, 5] and recurse on the right half. The new search space is Left=3, Right=4.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'active' }], currentAction: 'Call bs(3,4)', result: null, action: 'Recurse on right half.' },
    },
    {
      id: 2,
      title: 'Check Mid: bs(3,4)',
      explanation: 'In the new range [3, 4], Mid = (3 + 4) / 2 = 3. The value at index 3 is 7. Target 8 is greater than 7.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'active' }], currentAction: 'Check mid=3 (7 < 8)', result: null, action: 'Mid is 7. Go right.' },
    },
    {
      id: 3,
      title: 'Divide Again: Go Right',
      explanation: 'We discard the left half of this range and recurse on the right. The new search space is Left=4, Right=4.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,4)', returnValue: null, status: 'active' }], currentAction: 'Call bs(4,4)', result: null, action: 'Recurse on right.' },
    },
    {
      id: 4,
      title: 'Check Mid: bs(4,4)',
      explanation: 'In the range [4, 4], Mid = 4. The value at index 4 is 9. Target 8 is less than 9. We must go left.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,4)', returnValue: null, status: 'active' }], currentAction: 'Check mid=4 (9 > 8)', result: null, action: 'Mid is 9. Go left.' },
    },
    {
      id: 5,
      title: 'Divide Again: Go Left',
      explanation: 'We recurse on the left. The new search space becomes Left=4, Right=3.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,3)', returnValue: null, status: 'active' }], currentAction: 'Call bs(4,3)', result: null, action: 'Invalid range.' },
    },
    {
      id: 6,
      title: 'Base Case: Not Found',
      explanation: 'Left (4) is greater than Right (3). This means the search space is empty. The target is not in the array. We return -1. WHY: The base case `left > right` signals that we have exhausted all possible halves.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,3)', returnValue: -1, status: 'returning' }], currentAction: 'Return -1', result: null, action: 'Not found.' },
    },
    {
      id: 7,
      title: 'Unwind Stack',
      explanation: 'The -1 propagates up the call stack. Each paused function simply returns the -1 it received from its child.',
      state: { callStack: [{ name: 'bs(0,4)', returnValue: null, status: 'paused' }, { name: 'bs(3,4)', returnValue: null, status: 'paused' }, { name: 'bs(4,4)', returnValue: -1, status: 'returning' }], currentAction: 'Unwinding -1', result: null, action: 'Returning -1.' },
    },
    {
      id: 8,
      title: 'Final Result',
      explanation: 'The initial call bs(0,4) returns -1. The algorithm concludes that 8 is not in the array.',
      state: { callStack: [], currentAction: 'Return -1', result: -1, action: 'Final result: -1', found: true },
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