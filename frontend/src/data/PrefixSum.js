// ============================================================
// BASIC PREFIX SUM — Range Sum Query
// ============================================================
export const basicPrefixSum = {
  id: 'basic-prefix-sum',
  patternId: 'prefix-sum',
  title: 'Basic Prefix Sum',
  subtitle: 'The Tally Mark',
  type: 'basic-prefix-sum',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Create a new array where every element is the sum of all previous elements in the original array.',
    why: 'It allows you to calculate the sum of any subarray in O(1) time instead of O(N). The sum of a range [L, R] is simply `prefix[R] - prefix[L - 1]`.',
    when: 'When you have multiple range sum queries on a static array.',
    properties: [
      'Precomputation takes O(N) time.',
      'Each range query takes O(1) time.',
      'Requires O(N) extra space.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Calculate the sum of elements between index L and R".',
      'Multiple queries on the same array.',
      'The array does not change between queries.',
    ],
    inputs: ['Array of numbers'],
    constraints: ['O(1) time per query', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Original Array',
      explanation: 'We have our original array. We want to answer queries like: "What is the sum from index 2 to 4?"',
      state: {
        array: [3, 1, 4, 1, 5, 9], prefix: [], left: 2, right: 4, action: 'Target: Sum from index 2 to 4.',
      },
    },
    {
      id: 1,
      title: 'Build Prefix Array',
      explanation: 'We build the prefix array. Each element is the sum of all elements up to that point. Prefix[0] = 3. Prefix[1] = 3+1 = 4. Prefix[2] = 3+1+4 = 8, and so on.',
      state: {
        array: [3, 1, 4, 1, 5, 9], prefix: [3, 4, 8, 9, 14, 23], left: 2, right: 4, action: 'Prefix array built.',
      },
    },
    {
      id: 2,
      title: 'Calculate Range Sum',
      explanation: 'To find the sum from index 2 to 4: we take the sum up to index 4 (14) and subtract the sum up to index 1 (4). 14 - 4 = 10. (Which is 4 + 1 + 5).',
      state: {
        array: [3, 1, 4, 1, 5, 9], prefix: [3, 4, 8, 9, 14, 23], left: 2, right: 4, result: 10, action: 'prefix[4] - prefix[1] = 14 - 4 = 10', found: true,
      },
    },
  ],

  javaCode: `public class PrefixSum {
    private int[] prefix;

    public PrefixSum(int[] nums) {
        prefix = new int[nums.length];
        prefix[0] = nums[0];
        for (int i = 1; i < nums.length; i++) {
            prefix[i] = prefix[i - 1] + nums[i];
        }
    }

    public int sumRange(int left, int right) {
        if (left == 0) return prefix[right];
        return prefix[right] - prefix[left - 1];
    }
}`,

  javaExplanation: [
    { line: 'prefix[i] = prefix[i - 1] + nums[i];', note: 'Build the running total.' },
    { line: 'if (left == 0)', note: 'If the query starts at 0, just return the prefix at the right index.' },
    { line: 'return prefix[right] - prefix[left - 1];', note: 'The core formula to get any range sum in O(1).' },
  ],

  complexity: {
    time: 'O(1) per query',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Building takes O(N). Each query takes O(1). Space is O(N) for the prefix array.',
  },

  bruteForce: {
    time: 'O(N) per query',
    space: 'O(1)',
    note: 'Loop from left to right for every query. Too slow if there are many queries.',
  },

  commonMistakes: [
    { title: 'Off-by-one in subtraction', detail: 'The formula is `prefix[R] - prefix[L - 1]`. If L is 0, watch out for index out of bounds.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Range Sum Query - Immutable', url: 'https://leetcode.com/problems/range-sum-query-immutable/' },
    { level: 'Medium', title: 'Range Sum Query 2D - Immutable', url: 'https://leetcode.com/problems/range-sum-query-2d-immutable/' },
  ],

  quickRevision: [
    'Build running sum array.',
    'Query: prefix[R] - prefix[L - 1].',
    'Handle L = 0.',
  ],
};

// ============================================================
// HASH MAP + PREFIX SUM — Subarray Sum Equals K
// ============================================================
export const hashMapPrefixSum = {
  id: 'hashmap-prefix-sum',
  patternId: 'prefix-sum',
  title: 'Prefix Sum + Hash Map',
  subtitle: 'The Running Ledger',
  type: 'hashmap-prefix-sum',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Store the frequency of prefix sums in a Hash Map to instantly find if a previous prefix sum exists that satisfies a condition.',
    why: 'To find a subarray that sums to K, we need to know if `currentSum - K` exists as a previous prefix sum. The Hash Map stores these previous sums, turning an O(N²) search into O(N).',
    when: 'Finding a contiguous subarray that sums to a target (K), especially when there are negative numbers.',
    properties: [
      'The Hash Map stores `(prefix_sum, frequency)`.',
      'You always initialize the map with `(0, 1)` to handle subarrays starting from index 0.',
      'One pass, O(N) time.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find a subarray that sums to K".',
      'The array contains negative numbers (Sliding Window won\'t work).',
      '"Count the number of subarrays...".',
    ],
    inputs: ['Array of integers (positive and negative)'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize the Ledger',
      explanation: 'We want subarrays summing to K=2. We start with a map containing {0: 1}, meaning a sum of 0 has been seen 1 time (before we start).',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 0, map: {0: 1}, count: 0, action: 'Initialize map with {0: 1}.',
      },
    },
    {
      id: 1,
      title: 'First Element',
      explanation: 'Add 1 to currentSum -> sum = 1. We check if `sum - k` (1 - 2 = -1) is in the map. It is not. Add {1: 1} to the map.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 1, map: {0: 1, 1: 1}, count: 0, action: 'sum=1. 1-2=-1 (not found). Add 1 to map.',
      },
    },
    {
      id: 2,
      title: 'Second Element',
      explanation: 'Add 1 to currentSum -> sum = 2. Check if `sum - k` (2 - 2 = 0) is in the map. Yes, it appears 1 time! Add 1 to count.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 2, map: {0: 1, 1: 1, 2: 1}, count: 1, action: 'sum=2. 2-2=0 (Found 1). count=1.',
      },
    },
    {
      id: 3,
      title: 'Third Element',
      explanation: 'Add 1 to currentSum -> sum = 3. Check if `sum - k` (3 - 2 = 1) is in the map. Yes, it appears 1 time! Add 1 to count. Final count = 2.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 3, map: {0: 1, 1: 1, 2: 1, 3: 1}, count: 2, action: 'sum=3. 3-2=1 (Found 1). count=2.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class SubarraySumEqualsK {
    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> map = new HashMap<>();
        map.put(0, 1); // Base case: sum 0 has occurred once
        
        int count = 0;
        int currentSum = 0;
        
        for (int num : nums) {
            currentSum += num;
            
            int target = currentSum - k;
            if (map.containsKey(target)) {
                count += map.get(target);
            }
            
            map.put(currentSum, map.getOrDefault(currentSum, 0) + 1);
        }
        
        return count;
    }
}`,

  javaExplanation: [
    { line: 'map.put(0, 1);', note: 'Crucial: if currentSum equals k, then `currentSum - k` is 0. We need 0 to be in the map.' },
    { line: 'currentSum += num;', note: 'Calculate the running sum.' },
    { line: 'int target = currentSum - k;', note: 'If we remove a previous sum of `target`, the remaining elements sum to exactly k.' },
    { line: 'count += map.get(target);', note: 'Add the number of times that target sum appeared.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'One pass through the array. Map operations take O(1) on average.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Calculate the sum of every subarray starting at every index.',
  },

  commonMistakes: [
    { title: 'Forgetting the {0:1} base case', detail: 'Without it, any subarray that starts at index 0 will be missed.' },
    { title: 'Adding to map before checking', detail: 'You must check if `currentSum - k` is in the map BEFORE adding `currentSum` to the map.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
    { level: 'Medium', title: 'Continuous Subarray Sum', url: 'https://leetcode.com/problems/continuous-subarray-sum/' },
    { level: 'Medium', title: 'Subarray Sums Divisible by K', url: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/' },
  ],

  quickRevision: [
    'Initialize map with {0: 1}.',
    'Update currentSum.',
    'Check `currentSum - k` in map.',
    'Add `currentSum` to map.',
  ],
};

// ============================================================
// DIFFERENCE ARRAY — Range Addition
// ============================================================
export const differenceArray = {
  id: 'difference-array',
  patternId: 'prefix-sum',
  title: 'Difference Array',
  subtitle: 'The Paint Roller',
  type: 'difference-array',
  difficulty: 'Medium',

  coreConcept: {
    what: 'An array where `diff[i]` stores the difference between `nums[i]` and `nums[i-1]`.',
    why: 'To add a value to a range [L, R], you only need to do two operations: `diff[L] += val` and `diff[R+1] -= val`. Then, a single prefix sum pass reconstructs the final array. This turns an O(N) range update into O(1).',
    when: 'When you have multiple range updates (add X to elements from L to R) and need the final array.',
    properties: [
      'Updates take O(1) time.',
      'Reconstruction takes O(N) time.',
      'The prefix sum of the difference array is the final result.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Add X to all elements from L to R".',
      '"Apply these range updates".',
      '"Corporate Flight Bookings" or "Car Pooling".',
    ],
    inputs: ['Array of numbers', 'List of range updates'],
    constraints: ['O(K + N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start with Zeros',
      explanation: 'We have an array of zeros. We want to add 2 to the range [1, 3] and add 3 to the range [2, 4]. We use a difference array to mark the boundaries.',
      state: {
        diff: [0, 0, 0, 0, 0], action: 'Initial diff array.',
      },
    },
    {
      id: 1,
      title: 'First Update [1, 3]',
      explanation: 'Add 2 to diff[1]. Subtract 2 from diff[4] (which is R+1).',
      state: {
        diff: [0, 2, 0, 0, -2], action: 'diff[1] += 2, diff[4] -= 2.',
      },
    },
    {
      id: 2,
      title: 'Second Update [2, 4]',
      explanation: 'Add 3 to diff[2]. Subtract 3 from diff[5] (out of bounds here, so ignore or extend array).',
      state: {
        diff: [0, 2, 3, 0, -2], action: 'diff[2] += 3.',
      },
    },
    {
      id: 3,
      title: 'Reconstruct via Prefix Sum',
      explanation: 'Take the prefix sum of the diff array: 0, 2, 5, 5, 3. This is the final array after all updates!',
      state: {
        diff: [0, 2, 3, 0, -2], result: [0, 2, 5, 5, 3], action: 'Prefix sum of diff = [0, 2, 5, 5, 3]', found: true,
      },
    },
  ],

  javaCode: `public class RangeAddition {
    public int[] getModifiedArray(int length, int[][] updates) {
        int[] diff = new int[length];
        
        for (int[] update : updates) {
            int start = update[0];
            int end = update[1];
            int val = update[2];
            
            diff[start] += val;
            if (end + 1 < length) {
                diff[end + 1] -= val;
            }
        }
        
        for (int i = 1; i < length; i++) {
            diff[i] += diff[i - 1];
        }
        
        return diff;
    }
}`,

  javaExplanation: [
    { line: 'diff[start] += val;', note: 'From this point on, the value increases by `val`.' },
    { line: 'if (end + 1 < length) diff[end + 1] -= val;', note: 'After the range ends, subtract `val` to cancel the previous addition.' },
    { line: 'diff[i] += diff[i - 1];', note: 'The prefix sum reconstructs the actual values.' },
  ],

  complexity: {
    time: 'O(K + N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'K is the number of updates (O(1) each). N is the array length (O(N) for prefix sum).',
  },

  bruteForce: {
    time: 'O(K * N)',
    space: 'O(1)',
    note: 'Loop from start to end for every update, adding the value manually.',
  },

  commonMistakes: [
    { title: 'Out of bounds on end + 1', detail: 'If `end` is the last index, `end + 1` is out of bounds. Check this before subtracting.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Range Addition', url: 'https://leetcode.com/problems/range-addition/' },
    { level: 'Medium', title: 'Corporate Flight Bookings', url: 'https://leetcode.com/problems/corporate-flight-bookings/' },
    { level: 'Medium', title: 'Car Pooling', url: 'https://leetcode.com/problems/car-pooling/' },
  ],

  quickRevision: [
    'Create diff array of size N.',
    'Update: diff[L] += val, diff[R+1] -= val.',
    'Reconstruct with prefix sum.',
  ],
};

export const prefixSumSubPatterns = [basicPrefixSum, hashMapPrefixSum, differenceArray];

export const prefixSumOverview = {
  id: 'prefix-sum',
  title: 'Prefix Sum',
  subtitle: 'Answer range queries and find subarrays in O(1) and O(N) time',
  introduction: 'Prefix Sum is a precomputation technique that allows you to calculate the sum of any contiguous subarray in O(1) time. When combined with a Hash Map, it becomes a superpower for finding subarrays that sum to a target, even with negative numbers.',
  coreConcept: {
    what: 'An array where each element is the cumulative sum of all previous elements.',
    why: 'Turns O(N) range sum queries into O(1) math. Combined with hashing, turns O(N²) subarray searches into O(N).',
    when: 'Range sum queries, subarray sum equals K, or range update problems.',
  },
  whenToUse: [
    'You need to answer multiple sum queries on an array.',
    'You need to find a subarray with a specific sum (especially with negative numbers).',
    'You need to apply multiple range updates.',
  ],
  recognitionClues: [
    '"Sum of subarray from L to R"',
    '"Subarray Sum Equals K"',
    '"Range Addition"',
    '"Continuous Subarray Sum"',
  ],
  importantProperties: [
    'Prefix sums are monotonic if all numbers are positive.',
    'The difference array is the inverse of the prefix sum.',
    'Hash Map + Prefix Sum handles negative numbers gracefully.',
  ],
  comparison: [
    { aspect: 'Basic Prefix Sum', when: 'Range sum queries', time: 'O(1) query', space: 'O(N)' },
    { aspect: 'Prefix + Hash Map', when: 'Subarray Sum = K', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Difference Array', when: 'Range updates', time: 'O(1) update', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Off-by-one in Prefix Sum', detail: 'When querying range [L, R], the formula is prefix[R] - prefix[L-1]. Handle L=0 carefully.' },
    { title: 'Missing the 0 base case in Hash Map', detail: 'Always initialize the map with {0: 1}.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Range Sum Query - Immutable', url: 'https://leetcode.com/problems/range-sum-query-immutable/' },
    { level: 'Medium', title: 'Subarray Sum Equals K', url: 'https://leetcode.com/problems/subarray-sum-equals-k/' },
    { level: 'Medium', title: 'Corporate Flight Bookings', url: 'https://leetcode.com/problems/corporate-flight-bookings/' },
    { level: 'Medium', title: 'Continuous Subarray Sum', url: 'https://leetcode.com/problems/continuous-subarray-sum/' },
  ],
};