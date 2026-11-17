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
      explanation: 'Array: [3, 1, 4, 1, 5, 9, 2]. We start by assuming the first element (3) is the maximum. WHY: We must initialize our running maximum with a valid element from the array so we have a baseline to compare against. Initializing with 0 would fail if all elements are negative.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 0, maxIdx: 0, action: 'Assume max is 3 (index 0).' },
    },
    {
      id: 1,
      title: 'Compare Index 1',
      explanation: 'Current value is 1. We compare 1 with our current max (3). 1 is not greater than 3. The maximum remains 3.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 1, maxIdx: 0, action: '1 < 3. Max remains at index 0.' },
    },
    {
      id: 2,
      title: 'New Maximum Found',
      explanation: 'Current value is 4. We compare 4 with our current max (3). 4 > 3. We update our maximum to 4. WHY: We have found a new largest element, so the old maximum is no longer relevant.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 2, maxIdx: 2, action: '4 > 3. New max is 4 (index 2).' },
    },
    {
      id: 3,
      title: 'Compare Index 3',
      explanation: 'Current value is 1. 1 is not greater than our current max (4). The maximum remains 4.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 3, maxIdx: 2, action: '1 < 4. Max remains at index 2.' },
    },
    {
      id: 4,
      title: 'New Maximum Found',
      explanation: 'Current value is 5. 5 > 4. We update our maximum to 5.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 4, maxIdx: 4, action: '5 > 4. New max is 5 (index 4).' },
    },
    {
      id: 5,
      title: 'New Maximum Found',
      explanation: 'Current value is 9. 9 > 5. We update our maximum to 9.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 5, maxIdx: 5, action: '9 > 5. New max is 9 (index 5).' },
    },
    {
      id: 6,
      title: 'Final Element',
      explanation: 'Current value is 2. 2 is not greater than 9. The maximum remains 9. The array is fully traversed, so 9 is our final answer.',
      state: { array: [3, 1, 4, 1, 5, 9, 2], currentIdx: 6, maxIdx: 5, action: '2 < 9. Max is 9. Done.', found: true },
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
      title: 'Initial State',
      explanation: 'Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]. We start by assuming the first element (-2) is the maximum. The running sum is also -2. WHY: We initialize with the first element rather than 0 to correctly handle arrays that contain only negative numbers.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 0, currSum: -2, maxSum: -2, action: 'Init with -2.' },
    },
    {
      id: 1,
      title: 'Restart or Extend?',
      explanation: 'Current value is 1. Extending the previous subarray gives (-2 + 1) = -1. Starting a new subarray gives just 1. Since 1 > -1, we restart our subarray at index 1. currSum = 1. maxSum updates to 1. WHY: A negative running sum will only drag down our future sums, so it is better to start fresh.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 1, currSum: 1, maxSum: 1, action: 'Restart subarray. Sum=1.' },
    },
    {
      id: 2,
      title: 'Extend Subarray',
      explanation: 'Current value is -3. Extending gives (1 - 3) = -2. Starting fresh gives -3. Since -2 > -3, we extend the current subarray. currSum = -2. maxSum remains 1.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 2, currSum: -2, maxSum: 1, action: 'Extend subarray. Sum=-2.' },
    },
    {
      id: 3,
      title: 'Restart Subarray',
      explanation: 'Current value is 4. Extending the current negative sum (-2 + 4) = 2. Starting fresh gives 4. Since 4 > 2, we restart again. currSum = 4. maxSum updates to 4. WHY: The previous prefix was negative, so dropping it yields a larger sum.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 3, currSum: 4, maxSum: 4, action: 'Restart. Sum=4.' },
    },
    {
      id: 4,
      title: 'Extend Subarray',
      explanation: 'Current value is -1. Extending gives (4 - 1) = 3. Starting fresh gives -1. Since 3 > -1, we extend. currSum = 3. maxSum remains 4.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 4, currSum: 3, maxSum: 4, action: 'Extend. Sum=3.' },
    },
    {
      id: 5,
      title: 'Extend Subarray',
      explanation: 'Current value is 2. Extending gives (3 + 2) = 5. Starting fresh gives 2. Since 5 > 2, we extend. currSum = 5. maxSum updates to 5.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 5, currSum: 5, maxSum: 5, action: 'Extend. Sum=5. New max!' },
    },
    {
      id: 6,
      title: 'Extend Subarray',
      explanation: 'Current value is 1. Extending gives (5 + 1) = 6. Starting fresh gives 1. Since 6 > 1, we extend. currSum = 6. maxSum updates to 6.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 6, currSum: 6, maxSum: 6, action: 'Extend. Sum=6. New max!' },
    },
    {
      id: 7,
      title: 'Extend Subarray',
      explanation: 'Current value is -5. Extending gives (6 - 5) = 1. Starting fresh gives -5. Since 1 > -5, we extend. currSum = 1. maxSum remains 6.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 7, currSum: 1, maxSum: 6, action: 'Extend. Sum=1.' },
    },
    {
      id: 8,
      title: 'Final Element',
      explanation: 'Current value is 4. Extending gives (1 + 4) = 5. Starting fresh gives 4. Since 5 > 4, we extend. currSum = 5. maxSum remains 6. The array is fully processed, so the maximum subarray sum is 6.',
      state: { array: [-2, 1, -3, 4, -1, 2, 1, -5, 4], currentIdx: 8, currSum: 5, maxSum: 6, action: 'Extend. Sum=5. Max remains 6.', found: true },
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
      explanation: 'Array: [1, 2, 3, 4, 5, 6, 7]. K = 3. We want to rotate right by 3 steps. WHY: Shifting elements one by one takes O(N*K) time. The reversal trick achieves O(N) time and O(1) space.',
      state: { array: [1, 2, 3, 4, 5, 6, 7], left: 0, right: 6, k: 3, action: 'Original array.' },
    },
    {
      id: 1,
      title: 'Reverse Entire Array (Swap 1)',
      explanation: 'We use two pointers (left=0, right=6). We swap the elements at these pointers: 1 and 7. The array becomes [7, 2, 3, 4, 5, 6, 1].',
      state: { array: [7, 2, 3, 4, 5, 6, 1], left: 1, right: 5, k: 3, action: 'Swap 1 and 7.' },
    },
    {
      id: 2,
      title: 'Reverse Entire Array (Swap 2)',
      explanation: 'Move pointers inward. Swap 2 and 6. Array becomes [7, 6, 3, 4, 5, 2, 1].',
      state: { array: [7, 6, 3, 4, 5, 2, 1], left: 2, right: 4, k: 3, action: 'Swap 2 and 6.' },
    },
    {
      id: 3,
      title: 'Reverse Entire Array (Swap 3)',
      explanation: 'Move pointers inward. Swap 3 and 5. Array becomes [7, 6, 5, 4, 3, 2, 1]. The middle element (4) remains in place. The first reversal is complete.',
      state: { array: [7, 6, 5, 4, 3, 2, 1], left: 3, right: 3, k: 3, action: 'Swap 3 and 5. Reversal done.' },
    },
    {
      id: 4,
      title: 'Reverse First K Elements',
      explanation: 'Now we reverse the first K (3) elements (indices 0 to 2). We reset pointers: left=0, right=2. We swap 7 and 5. Array becomes [5, 6, 7, 4, 3, 2, 1]. WHY: The first K elements are currently in reverse order of how they should appear.',
      state: { array: [5, 6, 7, 4, 3, 2, 1], left: 1, right: 1, k: 3, action: 'Swap 7 and 5. First K done.' },
    },
    {
      id: 5,
      title: 'Reverse Remaining Elements',
      explanation: 'Finally, we reverse the remaining elements (indices 3 to 6). We reset pointers: left=3, right=6. Swap 4 and 1. Array becomes [5, 6, 7, 1, 3, 2, 4]. WHY: These elements also appear in reverse order from their final expected positions.',
      state: { array: [5, 6, 7, 1, 3, 2, 4], left: 4, right: 5, k: 3, action: 'Swap 4 and 1.' },
    },
    {
      id: 6,
      title: 'Final Swap',
      explanation: 'Move pointers inward. Swap 3 and 2. Array becomes [5, 6, 7, 1, 2, 3, 4]. Pointers cross, so the third reversal is complete. The array is successfully rotated right by 3.',
      state: { array: [5, 6, 7, 1, 2, 3, 4], left: 5, right: 4, k: 3, action: 'Swap 3 and 2. Rotated!', found: true },
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