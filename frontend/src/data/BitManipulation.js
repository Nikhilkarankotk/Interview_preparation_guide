// ============================================================
// SINGLE NUMBER — The XOR Trick
// ============================================================
export const singleNumber = {
  id: 'single-number',
  patternId: 'bit-manipulation',
  title: 'Single Number',
  subtitle: 'The XOR Trick',
  type: 'single-number',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Find the unique element in an array where every other element appears exactly twice.',
    why: 'The XOR operator (^) has a magical property: a ^ a = 0, and a ^ 0 = a. If we XOR all elements together, the duplicates cancel out, leaving only the unique number.',
    when: 'Finding a unique element, or when all other elements appear an even number of times.',
    properties: [
      'O(N) time, O(1) space.',
      'Order does not matter (commutative and associative).',
      'Bitwise XOR is the core operation.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find the single number".',
      '"Every element appears twice except for one".',
    ],
    inputs: ['Array of integers'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize XOR',
      explanation: 'We start with a result of 0. Array: [4, 1, 2, 1, 2].',
      state: {
        array: [4, 1, 2, 1, 2], currentIdx: 0, result: 0, action: 'Start XOR = 0.',
      },
    },
    {
      id: 1,
      title: 'XOR 4',
      explanation: '0 ^ 4 = 4.',
      state: {
        array: [4, 1, 2, 1, 2], currentIdx: 1, result: 4, action: '0 ^ 4 = 4.',
      },
    },
    {
      id: 2,
      title: 'XOR 1',
      explanation: '4 ^ 1 = 5.',
      state: {
        array: [4, 1, 2, 1, 2], currentIdx: 2, result: 5, action: '4 ^ 1 = 5.',
      },
    },
    {
      id: 3,
      title: 'XOR 2',
      explanation: '5 ^ 2 = 7.',
      state: {
        array: [4, 1, 2, 1, 2], currentIdx: 3, result: 7, action: '5 ^ 2 = 7.',
      },
    },
    {
      id: 4,
      title: 'XOR 1 (Cancels out)',
      explanation: '7 ^ 1 = 6. (Since 1 ^ 1 = 0, the 1s cancel).',
      state: {
        array: [4, 1, 2, 1, 2], currentIdx: 4, result: 6, action: '7 ^ 1 = 6.',
      },
    },
    {
      id: 5,
      title: 'XOR 2 (Cancels out)',
      explanation: '6 ^ 2 = 4. The final result is 4, which is the single number.',
      state: {
        array: [4, 1, 2, 1, 2], currentIdx: 5, result: 4, action: '6 ^ 2 = 4. Result is 4!', found: true,
      },
    },
  ],

  javaCode: `public class SingleNumber {
    public int singleNumber(int[] nums) {
        int result = 0;
        for (int num : nums) {
            result ^= num;
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'int result = 0;', note: 'Starting with 0 is safe because 0 ^ x = x.' },
    { line: 'result ^= num;', note: 'XOR the current number with the running result.' },
    { line: 'return result;', note: 'Duplicate numbers cancel out (a ^ a = 0), leaving the single number.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We iterate through the array once, using only one variable.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use a Hash Map to count frequencies, then find the one with count 1.',
  },

  commonMistakes: [
    { title: 'Using OR instead of XOR', detail: 'OR (|) does not cancel duplicates. Must use XOR (^).' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Single Number', url: 'https://leetcode.com/problems/single-number/' },
    { level: 'Medium', title: 'Single Number II', url: 'https://leetcode.com/problems/single-number-ii/' },
    { level: 'Medium', title: 'Single Number III', url: 'https://leetcode.com/problems/single-number-iii/' },
  ],

  quickRevision: [
    'a ^ a = 0',
    'a ^ 0 = a',
    'XOR all elements.',
  ],
};

// ============================================================
// NUMBER OF 1 BITS — Brian Kernighan's Algorithm
// ============================================================
export const numberOf1Bits = {
  id: 'number-of-1-bits',
  patternId: 'bit-manipulation',
  title: 'Number of 1 Bits',
  subtitle: "Brian Kernighan's Algorithm",
  type: 'number-of-1-bits',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Count the number of set bits (1s) in a binary representation of a number.',
    why: 'The operation `n = n & (n - 1)` clears the lowest set bit (the rightmost 1) in O(1) time. By repeating this until n becomes 0, we can count the 1s efficiently.',
    when: 'Hamming weight, Hamming distance, or checking if a number is a power of 2.',
    properties: [
      'Time complexity is O(number of 1 bits).',
      'Bitwise AND and subtraction are used.',
      'Faster than checking every bit individually.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Number of 1 bits".',
      '"Hamming weight".',
      '"Count set bits".',
    ],
    inputs: ['Integer'],
    constraints: ['O(1) time (max 32 iterations)', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Binary Init',
      explanation: 'N = 11 (binary 1011). Count = 0.',
      state: {
        num: 11, binary: '1011', count: 0, action: 'Start with N=11 (1011).',
      },
    },
    {
      id: 1,
      title: 'Clear Lowest Bit',
      explanation: 'N & (N-1) = 11 & 10 = 1011 & 1010 = 1010 (10). Count = 1.',
      state: {
        num: 10, binary: '1010', count: 1, action: '11 & 10 = 10. Count = 1.',
      },
    },
    {
      id: 2,
      title: 'Clear Next Bit',
      explanation: 'N & (N-1) = 10 & 9 = 1010 & 1001 = 1000 (8). Count = 2.',
      state: {
        num: 8, binary: '1000', count: 2, action: '10 & 9 = 8. Count = 2.',
      },
    },
    {
      id: 3,
      title: 'Clear Final Bit',
      explanation: 'N & (N-1) = 8 & 7 = 1000 & 0111 = 0000 (0). Count = 3.',
      state: {
        num: 0, binary: '0000', count: 3, action: '8 & 7 = 0. Count = 3. Done!', found: true,
      },
    },
  ],

  javaCode: `public class NumberOf1Bits {
    public int hammingWeight(int n) {
        int count = 0;
        while (n != 0) {
            n = n & (n - 1); // Clears the lowest set bit
            count++;
        }
        return count;
    }
}`,

  javaExplanation: [
    { line: 'while (n != 0)', note: 'Keep looping until all bits are cleared.' },
    { line: 'n = n & (n - 1);', note: 'This magical operation removes the rightmost 1-bit.' },
    { line: 'count++;', note: 'Increment the count for every bit cleared.' },
  ],

  complexity: {
    time: 'O(1)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'At most 32 iterations (for a 32-bit integer).',
  },

  bruteForce: {
    time: 'O(32)',
    space: 'O(1)',
    note: 'Shift bits left/right and check each bit with `n & 1`.',
  },

  commonMistakes: [
    { title: 'Using `n >> 1` instead of `n & (n-1)`', detail: '`n >> 1` shifts bits but takes 32 iterations. `n & (n-1)` takes only as many iterations as there are 1 bits.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/' },
    { level: 'Easy', title: 'Hamming Distance', url: 'https://leetcode.com/problems/hamming-distance/' },
  ],

  quickRevision: [
    'while (n != 0)',
    'n = n & (n - 1)',
    'count++',
  ],
};

// ============================================================
// COUNTING BITS — DP + Bitwise
// ============================================================
export const countingBits = {
  id: 'counting-bits',
  patternId: 'bit-manipulation',
  title: 'Counting Bits',
  subtitle: 'DP + Bitwise',
  type: 'counting-bits',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Count the number of 1s for every number from 0 to N.',
    why: 'Instead of recalculating bits for each number, we can use Dynamic Programming. The number of 1s in `i` is equal to the number of 1s in `i >> 1` (i divided by 2) plus `(i & 1)` (the last bit).',
    when: 'Generating Hamming weights for a range of numbers.',
    properties: [
      'O(N) time.',
      'Uses a DP array.',
      'Leverages the relation between i and i/2.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Count bits for every number up to N".',
      '"Return an array of Hamming weights".',
    ],
    inputs: ['Integer N'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Init Array',
      explanation: 'N = 5. DP array: [0, 0, 0, 0, 0, 0].',
      state: {
        dp: [0, 0, 0, 0, 0, 0], currentIdx: 0, action: 'Init DP array.',
      },
    },
    {
      id: 1,
      title: 'i = 1',
      explanation: '1 >> 1 = 0. 0 has 0 bits. 1 & 1 = 1. Total = 0 + 1 = 1.',
      state: {
        dp: [0, 1, 0, 0, 0, 0], currentIdx: 1, action: 'dp[1] = dp[0] + 1 = 1.',
      },
    },
    {
      id: 2,
      title: 'i = 2',
      explanation: '2 >> 1 = 1. 1 has 1 bit. 2 & 1 = 0. Total = 1 + 0 = 1.',
      state: {
        dp: [0, 1, 1, 0, 0, 0], currentIdx: 2, action: 'dp[2] = dp[1] + 0 = 1.',
      },
    },
    {
      id: 3,
      title: 'i = 3',
      explanation: '3 >> 1 = 1. 1 has 1 bit. 3 & 1 = 1. Total = 1 + 1 = 2.',
      state: {
        dp: [0, 1, 1, 2, 0, 0], currentIdx: 3, action: 'dp[3] = dp[1] + 1 = 2.',
      },
    },
    {
      id: 4,
      title: 'i = 4',
      explanation: '4 >> 1 = 2. 2 has 1 bit. 4 & 1 = 0. Total = 1 + 0 = 1.',
      state: {
        dp: [0, 1, 1, 2, 1, 0], currentIdx: 4, action: 'dp[4] = dp[2] + 0 = 1.',
      },
    },
    {
      id: 5,
      title: 'i = 5',
      explanation: '5 >> 1 = 2. 2 has 1 bit. 5 & 1 = 1. Total = 1 + 1 = 2.',
      state: {
        dp: [0, 1, 1, 2, 1, 2], currentIdx: 5, action: 'dp[5] = dp[2] + 1 = 2.', found: true,
      },
    },
  ],

  javaCode: `public class CountingBits {
    public int[] countBits(int n) {
        int[] dp = new int[n + 1];
        
        for (int i = 1; i <= n; i++) {
            dp[i] = dp[i >> 1] + (i & 1);
        }
        return dp;
    }
}`,

  javaExplanation: [
    { line: 'int[] dp = new int[n + 1];', note: 'Array to store the bit counts.' },
    { line: 'dp[i] = dp[i >> 1] + (i & 1);', note: 'The core DP recurrence: right shift `i` and add the LSB.' },
    { line: '(i & 1)', note: 'Checks if the number is odd (adds 1) or even (adds 0).' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'We compute the answer for each number once using previously computed results.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(N)',
    note: 'For each number, count bits using a loop (shift and check).',
  },

  commonMistakes: [
    { title: 'Using `i / 2` instead of `i >> 1`', detail: 'While `i/2` works mathematically, `i >> 1` is the bitwise equivalent and faster.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/' },
  ],

  quickRevision: [
    'dp[i] = dp[i >> 1] + (i & 1)',
    'Start loop from i = 1.',
    'Return dp array.',
  ],
};

export const bitManipulationSubPatterns = [singleNumber, numberOf1Bits, countingBits];

export const bitManipulationOverview = {
  id: 'bit-manipulation',
  title: 'Bit Manipulation',
  subtitle: 'Manipulate data at the bit level',
  introduction: 'Bit Manipulation is the act of algorithmically manipulating bits or other pieces of data shorter than a word. It is highly efficient and often used to optimize space and time complexity in competitive programming and system-level tasks.',
  coreConcept: {
    what: 'Using bitwise operators (AND, OR, XOR, NOT, shifts) to perform operations.',
    why: 'Bitwise operations are extremely fast (often a single CPU instruction) and can replace complex logic.',
    when: 'Finding unique elements, counting bits, generating subsets, or optimizing space.',
  },
  whenToUse: [
    'The problem involves binary representation.',
    'You need to count or check specific bits.',
    'You need O(1) space where an array might normally be used.',
  ],
  recognitionClues: [
    '"Single number".',
    '"Number of 1 bits / Hamming weight".',
    '"Subsets / Power set".',
  ],
  importantProperties: [
    'XOR (^): a ^ a = 0, a ^ 0 = a.',
    'AND (&): Clears bits (a & 0 = 0).',
    'OR (|): Sets bits (a | 1 = 1).',
    'Left Shift (<<): Multiply by 2.',
    'Right Shift (>>): Divide by 2.',
  ],
  comparison: [
    { aspect: 'Single Number', when: 'Unique element', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Number of 1 Bits', when: 'Count set bits', time: 'O(1)', space: 'O(1)' },
    { aspect: 'Counting Bits', when: 'DP + Bits', time: 'O(N)', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Operator Precedence', detail: 'Bitwise operators have lower precedence than equality checks. Always use parentheses: `(n & 1) == 1`.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Single Number', url: 'https://leetcode.com/problems/single-number/' },
    { level: 'Easy', title: 'Number of 1 Bits', url: 'https://leetcode.com/problems/number-of-1-bits/' },
    { level: 'Easy', title: 'Counting Bits', url: 'https://leetcode.com/problems/counting-bits/' },
    { level: 'Medium', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/' },
  ],
};