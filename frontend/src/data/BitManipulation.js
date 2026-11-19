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
      title: 'Initialize XOR Result',
      explanation: 'We start with a running result of 0. The input array is [4, 1, 2, 1, 2]. WHY: 0 is the identity element for XOR. Any number XORed with 0 remains unchanged (x ^ 0 = x). This gives us a clean slate to start accumulating the XOR sum.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 0, result: 0, action: 'Start XOR = 0.' },
    },
    {
      id: 1,
      title: 'Process 4',
      explanation: 'We XOR the current result (0) with the first element (4). 0 ^ 4 = 4. In binary: 000 ^ 100 = 100. The running result is now 4.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 1, result: 4, action: '0 ^ 4 = 4.' },
    },
    {
      id: 2,
      title: 'Process 1',
      explanation: 'We XOR the current result (4) with the next element (1). 4 ^ 1 = 5. In binary: 100 ^ 001 = 101. The running result is now 5.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 2, result: 5, action: '4 ^ 1 = 5.' },
    },
    {
      id: 3,
      title: 'Process 2',
      explanation: 'We XOR the current result (5) with the next element (2). 5 ^ 2 = 7. In binary: 101 ^ 010 = 111. The running result is now 7.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 3, result: 7, action: '5 ^ 2 = 7.' },
    },
    {
      id: 4,
      title: 'Process 1 (Cancellation)',
      explanation: 'We XOR the current result (7) with the next element (1). 7 ^ 1 = 6. In binary: 111 ^ 001 = 110. WHY: Notice that the 1-bit from the previous step is now canceled out (1 ^ 1 = 0). The first instance of the duplicate "1" is neutralized.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 4, result: 6, action: '7 ^ 1 = 6. (1 cancels out)' },
    },
    {
      id: 5,
      title: 'Process 2 (Cancellation)',
      explanation: 'We XOR the current result (6) with the final element (2). 6 ^ 2 = 4. In binary: 110 ^ 010 = 100. WHY: The second instance of the duplicate "2" is neutralized. All duplicates have been canceled out.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 5, result: 4, action: '6 ^ 2 = 4. Result is 4!' },
    },
    {
      id: 6,
      title: 'Return Final Result',
      explanation: 'The array is fully processed. The only remaining value in our running result is 4, which is the unique element that appeared exactly once. We return 4.',
      state: { array: [4, 1, 2, 1, 2], currentIdx: 5, result: 4, action: 'Done. Single number is 4.', found: true },
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
    why: 'The operation n = n & (n - 1) clears the lowest set bit (the rightmost 1) in O(1) time. By repeating this until n becomes 0, we can count the 1s efficiently.',
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
      title: 'Initialize Count',
      explanation: 'N = 11. In binary, 11 is 1011. We initialize our count to 0. WHY: We will repeatedly strip away the rightmost 1-bit until the number becomes 0.',
      state: { num: 11, binary: '1011', count: 0, action: 'Start with N=11 (1011).' },
    },
    {
      id: 1,
      title: 'Calculate N - 1',
      explanation: 'N - 1 = 10. In binary, 10 is 1010. WHY: Subtracting 1 from a number flips the lowest set bit (1) to 0, and all the 0s to its right become 1s.',
      state: { num: 10, binary: '1010', count: 0, action: 'N - 1 = 10 (1010).' },
    },
    {
      id: 2,
      title: 'AND Operation (Clear 1st Bit)',
      explanation: 'We perform N & (N-1). 11 & 10 = 1011 & 1010 = 1010 (10). We update N to 10 and increment count to 1. WHY: The AND operation clears the lowest set bit because we just flipped it to 0, and the rest of the bits remain unchanged.',
      state: { num: 10, binary: '1010', count: 1, action: '11 & 10 = 10. Count = 1.' },
    },
    {
      id: 3,
      title: 'Calculate N - 1',
      explanation: 'Now N = 10 (1010). N - 1 = 9. In binary, 9 is 1001. The lowest set bit (the 1 in the 2s place) is flipped to 0, and the 0s to its right become 1s.',
      state: { num: 9, binary: '1001', count: 1, action: '10 - 1 = 9 (1001).' },
    },
    {
      id: 4,
      title: 'AND Operation (Clear 2nd Bit)',
      explanation: 'We perform N & (N-1). 10 & 9 = 1010 & 1001 = 1000 (8). We update N to 8 and increment count to 2.',
      state: { num: 8, binary: '1000', count: 2, action: '10 & 9 = 8. Count = 2.' },
    },
    {
      id: 5,
      title: 'Calculate N - 1',
      explanation: 'Now N = 8 (1000). N - 1 = 7. In binary, 7 is 0111. The only set bit is cleared, and all 0s to the right become 1s.',
      state: { num: 7, binary: '0111', count: 2, action: '8 - 1 = 7 (0111).' },
    },
    {
      id: 6,
      title: 'AND Operation (Clear Final Bit)',
      explanation: 'We perform N & (N-1). 8 & 7 = 1000 & 0111 = 0000 (0). We update N to 0 and increment count to 3.',
      state: { num: 0, binary: '0000', count: 3, action: '8 & 7 = 0. Count = 3.' },
    },
    {
      id: 7,
      title: 'Loop Terminates',
      explanation: 'N is now 0. The while loop terminates. We return the count, which is 3. All set bits have been successfully cleared and counted.',
      state: { num: 0, binary: '0000', count: 3, action: 'Done. Total 1 bits = 3.', found: true },
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
    why: 'Instead of recalculating bits for each number, we can use Dynamic Programming. The number of 1s in i is equal to the number of 1s in i >> 1 (i divided by 2) plus (i & 1) (the last bit).',
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
      title: 'Initialize DP Array',
      explanation: 'N = 5. We create a DP array of size 6 (indices 0 to 5) filled with 0s. WHY: `dp[i]` will store the number of 1-bits for the integer `i`. We know `dp[0] = 0` because the number 0 has zero 1-bits.',
      state: { dp: [0, 0, 0, 0, 0, 0], currentIdx: 0, action: 'Init DP array. dp[0]=0.' },
    },
    {
      id: 1,
      title: 'Calculate i = 1',
      explanation: 'Number is 1 (binary 001). `1 >> 1` (right shift) gives 0. `dp[0]` is 0. The last bit is `1 & 1 = 1`. So, `dp[1] = dp[0] + 1 = 1`. WHY: The number 1 is just the number 0 shifted left with a 1 appended.',
      state: { dp: [0, 1, 0, 0, 0, 0], currentIdx: 1, action: 'dp[1] = dp[0] + 1 = 1.' },
    },
    {
      id: 2,
      title: 'Calculate i = 2',
      explanation: 'Number is 2 (binary 010). `2 >> 1` gives 1. `dp[1]` is 1. The last bit is `2 & 1 = 0`. So, `dp[2] = dp[1] + 0 = 1`. WHY: 2 is just 1 shifted left, so it has the exact same number of 1-bits as 1.',
      state: { dp: [0, 1, 1, 0, 0, 0], currentIdx: 2, action: 'dp[2] = dp[1] + 0 = 1.' },
    },
    {
      id: 3,
      title: 'Calculate i = 3',
      explanation: 'Number is 3 (binary 011). `3 >> 1` gives 1. `dp[1]` is 1. The last bit is `3 & 1 = 1`. So, `dp[3] = dp[1] + 1 = 2`. WHY: 3 is 1 shifted left, plus a 1-bit at the end.',
      state: { dp: [0, 1, 1, 2, 0, 0], currentIdx: 3, action: 'dp[3] = dp[1] + 1 = 2.' },
    },
    {
      id: 4,
      title: 'Calculate i = 4',
      explanation: 'Number is 4 (binary 100). `4 >> 1` gives 2. `dp[2]` is 1. The last bit is `4 & 1 = 0`. So, `dp[4] = dp[2] + 0 = 1`. WHY: 4 is 2 shifted left.',
      state: { dp: [0, 1, 1, 2, 1, 0], currentIdx: 4, action: 'dp[4] = dp[2] + 0 = 1.' },
    },
    {
      id: 5,
      title: 'Calculate i = 5',
      explanation: 'Number is 5 (binary 101). `5 >> 1` gives 2. `dp[2]` is 1. The last bit is `5 & 1 = 1`. So, `dp[5] = dp[2] + 1 = 2`. WHY: 5 is 2 shifted left, plus a 1-bit at the end.',
      state: { dp: [0, 1, 1, 2, 1, 2], currentIdx: 5, action: 'dp[5] = dp[2] + 1 = 2.' },
    },
    {
      id: 6,
      title: 'Return Final Array',
      explanation: 'We have processed all numbers from 0 to N=5. The DP array is fully populated. We return the array [0, 1, 1, 2, 1, 2], which represents the number of 1-bits for each number.',
      state: { dp: [0, 1, 1, 2, 1, 2], currentIdx: 5, action: 'Done. Result: [0, 1, 1, 2, 1, 2].', found: true },
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