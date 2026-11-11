// ============================================================
// ARRAY TRAVERSAL — Find Max Element
// ============================================================
export const arrayTraversal = {
  id: 'array-traversal',
  patternId: 'arrays',
  title: 'Array Traversal',
  subtitle: 'Find the Maximum',
  type: 'array-traversal',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Iterate through the array once, keeping track of the maximum value seen so far.',
    why: 'It establishes the foundation for all array problems. Instead of comparing every pair (O(N²)), we maintain a running maximum (O(N)).',
    when: 'Finding the largest/smallest element, or when you need to process every element exactly once.',
    properties: [
      'Single pass through the array.',
      'O(1) auxiliary space.',
      'Requires updating the max when a larger element is found.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find the maximum/minimum element".',
      '"Return the largest number".',
    ],
    inputs: ['Array of numbers'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial State',
      explanation: 'Array: [3, 1, 4, 1, 5, 9, 2]. We start by assuming the first element (3) is the maximum.',
      state: {
        array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 0, maxIdx: 0, action: 'Assume max is 3.',
      },
    },
    {
      id: 1,
      title: 'Compare 1',
      explanation: 'Current is 1. 1 < 3. Max remains 3.',
      state: {
        array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 1, maxIdx: 0, action: '1 < 3. Max is still 3.',
      },
    },
    {
      id: 2,
      title: 'New Maximum',
      explanation: 'Current is 4. 4 > 3. We update the max to 4.',
      state: {
        array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 2, maxIdx: 2, action: '4 > 3. New max is 4.',
      },
    },
    {
      id: 3,
      title: 'Continue Scan',
      explanation: 'We skip 1, then find 5. Update max to 5.',
      state: {
        array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 4, maxIdx: 4, action: '5 > 4. New max is 5.',
      },
    },
    {
      id: 4,
      title: 'Final Maximum',
      explanation: 'Current is 9. 9 > 5. Update max to 9. End of array.',
      state: {
        array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 5, maxIdx: 5, action: '9 > 5. Max is 9.', found: true,
      },
    },
  ],

  javaCode: `public class MaxElement {
    public int findMax(int[] nums) {
        if (nums == null || nums.length == 0) return -1;
        
        int max = nums[0];
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] > max) {
                max = nums[i];
            }
        }
        return max;
    }
}`,

  javaExplanation: [
    { line: 'int max = nums[0];', note: 'Initialize max with the first element to handle negative numbers.' },
    { line: 'for (int i = 1; i < nums.length; i++)', note: 'Start loop from index 1, since we already checked index 0.' },
    { line: 'if (nums[i] > max)', note: 'Compare current element with running max.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We iterate through the array once, using only one variable.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(1)',
    note: 'Sort the array and pick the last element. Slower than O(N).',
  },

  commonMistakes: [
    { title: 'Initializing max to 0', detail: 'If the array contains all negative numbers, max will incorrectly remain 0. Initialize to `nums[0]` or `Integer.MIN_VALUE`.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Largest Element in an Array', url: 'https://leetcode.com/problems/largest-number/' },
  ],

  quickRevision: [
    'max = nums[0]',
    'Loop from 1 to N.',
    'If nums[i] > max, update max.',
  ],
};

// ============================================================
// KADANE'S ALGORITHM — Max Subarray
// ============================================================
export const kadanesAlgorithm = {
  id: 'kadanes-algorithm',
  patternId: 'arrays',
  title: "Kadane's Algorithm",
  subtitle: 'Maximum Subarray Sum',
  type: 'kadanes-algorithm',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the contiguous subarray within a 1D array of numbers which has the largest sum.',
    why: 'We can compute the maximum subarray sum in O(N) by iterating through the array and keeping a running sum. If the running sum drops below 0, we reset it to 0 because a negative sum will only decrease any future subarray sum.',
    when: 'Maximum subarray, maximum circular subarray, or any problem asking for max sum of a contiguous subarray.',
    properties: [
      'Single pass through the array.',
      'O(1) space.',
      'Handles negative numbers gracefully.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find the contiguous subarray with the largest sum".',
      '"Maximum subarray".',
    ],
    inputs: ['Array of integers (positive and negative)'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Init',
      explanation: 'Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]. We start with maxSum = -2 and currSum = -2.',
      state: {
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 0, currSum: -2, maxSum: -2, action: 'Init with -2.',
      },
    },
    {
      id: 1,
      title: 'Current Sum Turns Negative',
      explanation: 'At index 1, value is 1. currSum becomes -2 + 1 = -1. Since it\'s negative, we reset currSum to 0, then add the current value (1). currSum = 1. maxSum updates to 1.',
      state: {
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 1, currSum: 1, maxSum: 1, action: 'Reset currSum to 0, add 1. maxSum = 1.',
      },
    },
    {
      id: 2,
      title: 'Continue',
      explanation: 'At index 2, value is -3. currSum = 1 - 3 = -2. maxSum stays 1.',
      state: {
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 2, currSum: -2, maxSum: 1, action: 'currSum = -2.',
      },
    },
    {
      id: 3,
      title: 'Reset Again',
      explanation: 'At index 3, value is 4. Since currSum is -2, we reset to 0, then add 4. currSum = 4. maxSum updates to 4.',
      state: {
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 3, currSum: 4, maxSum: 4, action: 'Reset to 0, add 4. maxSum = 4.',
      },
    },
    {
      id: 4,
      title: 'Build Up',
      explanation: 'Values 4, -1, 2, 1 give a sum of 6. maxSum updates to 6.',
      state: {
        array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 6, currSum: 6, maxSum: 6, action: 'Sum 4-1+2+1 = 6. Max is 6.',
      },
    },
  ],

  javaCode: `public class Kadane {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0];
        int currSum = nums[0];

        for (int i = 1; i < nums.length; i++) {
            // Either extend the existing subarray or start a new one
            currSum = Math.max(nums[i], currSum + nums[i]);
            maxSum = Math.max(maxSum, currSum);
        }
        return maxSum;
    }
}`,

  javaExplanation: [
    { line: 'int maxSum = nums[0];', note: 'Initialize with the first element, not 0, to handle all-negative arrays.' },
    { line: 'currSum = Math.max(nums[i], currSum + nums[i]);', note: 'If currSum is negative, it is better to start a new subarray at nums[i].' },
    { line: 'maxSum = Math.max(maxSum, currSum);', note: 'Update the global maximum.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We make a single pass through the array.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Calculate the sum of every subarray and find the max.',
  },

  commonMistakes: [
    { title: 'Initializing maxSum to 0', detail: 'If all numbers are negative, the max sum should be the largest negative number, not 0.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/' },
    { level: 'Medium', title: 'Maximum Sum Circular Subarray', url: 'https://leetcode.com/problems/maximum-sum-circular-subarray/' },
  ],

  quickRevision: [
    'currSum = max(num, currSum + num)',
    'maxSum = max(maxSum, currSum)',
    'Return maxSum.',
  ],
};

// ============================================================
// ARRAY REVERSAL — Rotate Array
// ============================================================
export const arrayRotation = {
  id: 'array-rotation',
  patternId: 'arrays',
  title: 'Array Rotation',
  subtitle: 'The Three Reversals',
  type: 'array-rotation',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Rotate an array to the right by K steps in O(1) space.',
    why: 'Instead of shifting elements one by one (which takes O(N*K) time), we can reverse the whole array, then reverse the first K elements, and finally reverse the remaining elements.',
    when: 'Array rotation, or any problem requiring in-place permutation.',
    properties: [
      'O(N) time.',
      'O(1) space.',
      'Uses a helper reverse function.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Rotate the array by K steps".',
      '"In-place rotation".',
    ],
    inputs: ['Array', 'Integer K'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Original Array',
      explanation: 'Array: [1, 2, 3, 4, 5, 6, 7]. K = 3. We want to rotate right by 3.',
      state: {
        array: [1, 2, 3, 4, 5, 6, 7], left: 0, right: 6, k: 3, action: 'Original array.',
      },
    },
    {
      id: 1,
      title: 'Reverse Entire Array',
      explanation: 'Reverse all elements from index 0 to 6. Result: [7, 6, 5, 4, 3, 2, 1].',
      state: {
        array: [7, 6, 5, 4, 3, 2, 1], left: 0, right: 6, k: 3, action: 'Reverse all.',
      },
    },
    {
      id: 2,
      title: 'Reverse First K',
      explanation: 'Reverse the first K (3) elements (0 to 2). Result: [5, 6, 7, 4, 3, 2, 1].',
      state: {
        array: [5, 6, 7, 4, 3, 2, 1], left: 0, right: 2, k: 3, action: 'Reverse first 3.',
      },
    },
    {
      id: 3,
      title: 'Reverse Rest',
      explanation: 'Reverse the remaining elements (3 to 6). Result: [5, 6, 7, 1, 2, 3, 4].',
      state: {
        array: [5, 6, 7, 1, 2, 3, 4], left: 3, right: 6, k: 3, action: 'Rotated!', found: true,
      },
    },
  ],

  javaCode: `public class RotateArray {
    public void rotate(int[] nums, int k) {
        k = k % nums.length; // Handle cases where k > n
        
        reverse(nums, 0, nums.length - 1); // Reverse all
        reverse(nums, 0, k - 1);           // Reverse first k
        reverse(nums, k, nums.length - 1); // Reverse rest
    }

    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start] = nums[end];
            nums[end] = temp;
            start++;
            end--;
        }
    }
}`,

  javaExplanation: [
    { line: 'k = k % nums.length;', note: 'If K is larger than the array length, rotating by K is the same as rotating by K % N.' },
    { line: 'reverse(nums, 0, nums.length - 1);', note: 'Step 1: Reverse the whole array.' },
    { line: 'reverse(nums, 0, k - 1);', note: 'Step 2: Reverse the first K elements.' },
    { line: 'reverse(nums, k, nums.length - 1);', note: 'Step 3: Reverse the remaining elements.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Each element is reversed at most twice. We use no extra space.',
  },

  bruteForce: {
    time: 'O(N * K)',
    space: 'O(1)',
    note: 'Rotate by 1 step K times. Or use an extra array (O(N) space).',
  },

  commonMistakes: [
    { title: 'Forgetting the modulo', detail: 'If K = 10 and array length is 7, rotating by 10 is the same as rotating by 3. Always do `k % n`.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Rotate Array', url: 'https://leetcode.com/problems/rotate-array/' },
  ],

  quickRevision: [
    'k % n.',
    'Reverse all.',
    'Reverse first K.',
    'Reverse rest.',
  ],
};

export const arraysSubPatterns = [arrayTraversal, kadanesAlgorithm, arrayRotation];

export const arraysOverview = {
  id: 'arrays',
  title: 'Arrays',
  subtitle: 'The foundation of sequence problems',
  introduction: 'An array is a collection of elements stored in contiguous memory locations. It is the most fundamental data structure in programming. Mastering array traversal, prefix sums, and in-place manipulations is essential for almost every other algorithm.',
  coreConcept: {
    what: 'A fixed-size, ordered collection of elements.',
    why: 'Arrays provide O(1) random access by index, making them extremely fast for lookups.',
    when: 'Almost always, unless you specifically need fast insertions/deletions (Linked Lists) or key-value lookups (Hash Maps).',
  },
  whenToUse: [
    'The input is already an array or list.',
    'You need fast access by index.',
    'You need to iterate through elements in order.',
  ],
  recognitionClues: [
    '"Return an array/list".',
    '"Contiguous subarray".',
    '"Rotate / Reverse".',
  ],
  importantProperties: [
    'O(1) access by index.',
    'O(N) insertion/deletion (requires shifting).',
    'Fixed size (in languages like Java/C++).',
  ],
  comparison: [
    { aspect: 'Traversal', when: 'Find Max/Min', time: 'O(N)', space: 'O(1)' },
    { aspect: "Kadane's", when: 'Max Subarray', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Rotation', when: 'In-place rotate', time: 'O(N)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Off-by-one errors', detail: 'Remember arrays are 0-indexed. The last element is at `arr.length - 1`.' },
    { title: 'Out of Bounds', detail: 'Always check `i < arr.length`.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Largest Element in an Array', url: 'https://leetcode.com/problems/largest-number/' },
    { level: 'Medium', title: 'Maximum Subarray', url: 'https://leetcode.com/problems/maximum-subarray/' },
    { level: 'Medium', title: 'Rotate Array', url: 'https://leetcode.com/problems/rotate-array/' },
    { level: 'Medium', title: 'Product of Array Except Self', url: 'https://leetcode.com/problems/product-of-array-except-self/' },
  ],
};