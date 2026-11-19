// ============================================================
// BASIC PREFIX SUM — LeetCode 303: Range Sum Query - Immutable
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
      title: 'LC 303 — Setup',
      explanation: 'Input: `nums = [-2, 0, 3, -5, 2, -1]`.\n\n🎯 Goal: Build a `prefix` array so any "sum from L to R" query becomes O(1).\n\n💡 Rule: `prefix[i] = sum of nums[0..i]`.\n\nStart: `prefix = []` — we\'ll build it one entry at a time.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [], left: null, right: null,
        action: 'Start with empty prefix array.',
      },
    },
    {
      id: 1,
      title: 'Build prefix[0]',
      explanation: '🔍 Build prefix[0] using nums[0].\n\n🧮 prefix[0] = nums[0] = **−2**.\n\n📊 `prefix = [−2]`. This means the sum of nums[0..0] is −2.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2], left: 0, right: 0,
        action: 'prefix[0] = nums[0] = −2.',
      },
    },
    {
      id: 2,
      title: 'Build prefix[1]',
      explanation: '🔍 Build prefix[1] using prefix[0] + nums[1].\n\n🧮 prefix[1] = prefix[0] + nums[1] = −2 + 0 = **−2**.\n\n📊 `prefix = [−2, −2]`. We reuse prefix[0] instead of re-summing from scratch.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2], left: 1, right: 1,
        action: 'prefix[1] = prefix[0] + nums[1] = −2 + 0 = −2.',
      },
    },
    {
      id: 3,
      title: 'Build prefix[2]',
      explanation: '🔍 Build prefix[2].\n\n🧮 prefix[2] = prefix[1] + nums[2] = −2 + 3 = **1**.\n\n📊 `prefix = [−2, −2, 1]`. Sum of nums[0..2] is 1.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1], left: 2, right: 2,
        action: 'prefix[2] = prefix[1] + nums[2] = −2 + 3 = 1.',
      },
    },
    {
      id: 4,
      title: 'Build prefix[3]',
      explanation: '🔍 Build prefix[3].\n\n🧮 prefix[3] = prefix[2] + nums[3] = 1 + (−5) = **−4**.\n\n📊 `prefix = [−2, −2, 1, −4]`. Values can decrease — prefix sums are cumulative, not monotonic.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1, -4], left: 3, right: 3,
        action: 'prefix[3] = prefix[2] + nums[3] = 1 + (−5) = −4.',
      },
    },
    {
      id: 5,
      title: 'Build prefix[4]',
      explanation: '🔍 Build prefix[4].\n\n🧮 prefix[4] = prefix[3] + nums[4] = −4 + 2 = **−2**.\n\n📊 `prefix = [−2, −2, 1, −4, −2]`.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1, -4, -2], left: 4, right: 4,
        action: 'prefix[4] = prefix[3] + nums[4] = −4 + 2 = −2.',
      },
    },
    {
      id: 6,
      title: 'Build prefix[5] — Done',
      explanation: '🔍 Build prefix[5].\n\n🧮 prefix[5] = prefix[4] + nums[5] = −2 + (−1) = **−3**.\n\n✅ Complete: `prefix = [−2, −2, 1, −4, −2, −3]`. Every query is now one subtraction away.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1, -4, -2, -3], left: 5, right: 5,
        action: 'prefix[5] = prefix[4] + nums[5] = −2 + (−1) = −3. Prefix array complete.',
      },
    },
    {
      id: 7,
      title: 'Query 1 — sum(0, 2)',
      explanation: '🔍 Query: sum of nums[0..2].\n\n🧮 Since L = 0, we cannot subtract prefix[−1]. Just return prefix[2].\n\n`sum(0, 2) = prefix[2] = **1**`.\n\n✅ Verify by hand: −2 + 0 + 3 = 1 ✅',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1, -4, -2, -3], left: 0, right: 2,
        result: 1,
        action: 'sum(0,2) = prefix[2] = 1.',
      },
    },
    {
      id: 8,
      title: 'Query 2 — sum(2, 5)',
      explanation: '🔍 Query: sum of nums[2..5].\n\n🧮 Since L > 0: `sum(2, 5) = prefix[5] − prefix[1]`.\n\n= (−3) − (−2) = **−1**.\n\n📖 Why: prefix[5] covers indices 0..5; prefix[1] covers indices 0..1. Subtracting removes the 0..1 part, leaving 2..5.\n\n✅ Verify: 3 + (−5) + 2 + (−1) = −1 ✅',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1, -4, -2, -3], left: 2, right: 5,
        result: -1,
        action: 'sum(2,5) = prefix[5] − prefix[1] = −3 − (−2) = −1.',
      },
    },
    {
      id: 9,
      title: 'Query 3 — sum(0, 5) + Done',
      explanation: '🔍 Query: sum of the entire array (L = 0).\n\n🧮 `sum(0, 5) = prefix[5] = **−3**`.\n\n🎯 All LC 303 queries answered: `[1, −1, −3]` — matches expected output.\n\n📌 Building cost was O(N) once. Every query after is O(1). Without prefix sums, each query would be O(N) → total O(Q × N) for Q queries.',
      state: {
        array: [-2, 0, 3, -5, 2, -1], prefix: [-2, -2, 1, -4, -2, -3], left: 0, right: 5,
        result: -3, found: true,
        action: 'sum(0,5) = prefix[5] = −3. All queries answered.',
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
// HASH MAP + PREFIX SUM — LeetCode 560: Subarray Sum Equals K
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
      title: 'LC 560 — Setup',
      explanation: 'Input: `nums = [1, 1, 1]`, `k = 2`.\n\n🎯 Goal: Count how many contiguous subarrays sum to exactly 2. Expected: **2** — `[1,1]` at indices 0..1, and `[1,1]` at indices 1..2.\n\n💡 Key trick: If `prefix[j] − prefix[i] = k`, then subarray i+1..j sums to k. Rearrange: `prefix[i] = prefix[j] − k`. So as we walk, we ask: "Have we seen `currentSum − k` before?"\n\nStart: `map = {0: 1}` — this seeds "the running sum before we started was 0, seen 1 time." Without this, subarrays starting at index 0 would be missed.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 0, map: {0: 1}, count: 0,
        action: 'Init map={0:1}, currentSum=0, count=0.',
      },
    },
    {
      id: 1,
      title: 'i=0 — Sum = 1, No Match',
      explanation: '🔍 Process nums[0] = 1.\n\n🧮 currentSum = 0 + 1 = **1**.\ntarget = currentSum − k = 1 − 2 = **−1**.\n\n❌ Look up −1 in map → not present. No subarray ends here summing to 2.\n\n➡️ Store currentSum into map: `{1: 1}`.\n\n📊 `map = {0:1, 1:1}`, `count = 0`.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 1, map: {0: 1, 1: 1}, count: 0,
        action: 'sum=1, target=−1 (miss). Store {1:1}.',
      },
    },
    {
      id: 2,
      title: 'i=1 — Sum = 2, Found #1',
      explanation: '🔍 Process nums[1] = 1.\n\n🧮 currentSum = 1 + 1 = **2**.\ntarget = 2 − 2 = **0**.\n\n✅ Look up 0 in map → found with count **1**.\n\n💭 Meaning: a prefix sum of 0 was seen before we started. So `currentSum − 0 = 2` → the subarray from index 0 to index 1 sums to 2 → `[1, 1]`.\n\n🧮 count += 1 → **1**.\n\n➡️ Store currentSum: `{2: 1}`.\n\n📊 `map = {0:1, 1:1, 2:1}`, `count = 1`.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 2, map: {0: 1, 1: 1, 2: 1}, count: 1,
        action: 'sum=2, target=0 (found 1×). count=1. Store {2:1}.',
      },
    },
    {
      id: 3,
      title: 'i=2 — Sum = 3, Found #2',
      explanation: '🔍 Process nums[2] = 1.\n\n🧮 currentSum = 2 + 1 = **3**.\ntarget = 3 − 2 = **1**.\n\n✅ Look up 1 in map → found with count **1**.\n\n💭 Meaning: a prefix sum of 1 was seen at index 0. So `currentSum − 1 = 2` → the subarray from index 1 to index 2 sums to 2 → `[1, 1]`.\n\n🧮 count += 1 → **2**.\n\n➡️ Store currentSum: `{3: 1}`.\n\n📊 `map = {0:1, 1:1, 2:1, 3:1}`, `count = 2`.',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 3, map: {0: 1, 1: 1, 2: 1, 3: 1}, count: 2,
        action: 'sum=3, target=1 (found 1×). count=2. Store {3:1}.',
      },
    },
    {
      id: 4,
      title: 'Answer — 2 Subarrays',
      explanation: '🎯 Answer: **2** — matches LC 560\'s expected output.\n\n✅ The two subarrays:\n1. `nums[0..1] = [1, 1]` — found at i=1 via `map[0]` (seeded before start)\n2. `nums[1..2] = [1, 1]` — found at i=2 via `map[1]` (set at i=0)\n\n📌 One pass through the array. Each map lookup is O(1) average. Total: **O(N) time, O(N) space**. Brute force would scan every subarray → O(N²).',
      state: {
        array: [1, 1, 1], k: 2, currentSum: 3, map: {0: 1, 1: 1, 2: 1, 3: 1}, count: 2, found: true,
        action: 'Return count = 2.',
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
// DIFFERENCE ARRAY — LeetCode 370: Range Addition
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
      title: 'LC 370 — Setup',
      explanation: 'Input: `length = 5`, `updates = [[1,3,2], [2,4,3], [0,2,-2]]`.\n\n🎯 Goal: Start with `[0,0,0,0,0]`. Apply all 3 range updates. Return the final array — expected **[-2, 0, 3, 5, 3]**.\n\n💡 Trick: Instead of adding `val` to every element in [L, R], we mark "start +val at L" and "stop +val at R+1". A single prefix sum later turns those marks into real values.\n\nStart: `diff = [0, 0, 0, 0, 0]`.',
      state: {
        diff: [0, 0, 0, 0, 0],
        action: 'Init diff=[0,0,0,0,0]. Apply 3 range updates.',
      },
    },
    {
      id: 1,
      title: 'Update 1 — [1, 3] += 2',
      explanation: '🔍 Apply update `[L=1, R=3, val=2]`.\n\n🧮 Two marks:\n- `diff[1] += 2` → start adding 2 at index 1\n- `diff[3+1] = diff[4] -= 2` → stop adding 2 at index 4\n\n📊 `diff = [0, 2, 0, 0, −2]`.\n\n💭 During prefix sum later: index 1 jumps +2, indices 2 and 3 inherit it, index 4 sees −2 which cancels the +2 and returns to baseline.',
      state: {
        diff: [0, 2, 0, 0, -2],
        action: '[1,3,2]: diff[1]+=2, diff[4]-=2 → [0,2,0,0,−2].',
      },
    },
    {
      id: 2,
      title: 'Update 2 — [2, 4] += 3',
      explanation: '🔍 Apply update `[L=2, R=4, val=3]`.\n\n🧮 Two marks:\n- `diff[2] += 3` → start adding 3 at index 2\n- `diff[4+1] = diff[5] -= 3` → **out of bounds** (length 5, valid indices 0–4). Skip — the addition just runs to the end.\n\n📊 `diff = [0, 2, 3, 0, −2]`.',
      state: {
        diff: [0, 2, 3, 0, -2],
        action: '[2,4,3]: diff[2]+=3, diff[5] OOB (skip) → [0,2,3,0,−2].',
      },
    },
    {
      id: 3,
      title: 'Update 3 — [0, 2] += −2',
      explanation: '🔍 Apply update `[L=0, R=2, val=−2]` — subtract 2 from indices 0–2.\n\n🧮 Two marks:\n- `diff[0] += −2` → start subtracting 2 at index 0\n- `diff[2+1] = diff[3] -= −2 = +2` → stop subtracting after index 2\n\n📊 `diff = [−2, 2, 3, 2, −2]`.\n\n✅ All updates marked. Now reconstruct the real array.',
      state: {
        diff: [-2, 2, 3, 2, -2],
        action: '[0,2,−2]: diff[0]−=2, diff[3]+=2 → [−2,2,3,2,−2].',
      },
    },
    {
      id: 4,
      title: 'Reconstruct i=0',
      explanation: '🔍 Reconstruct index 0: running total starts at 0, add `diff[0]`.\n\n🧮 result[0] = 0 + diff[0] = 0 + (−2) = **−2**.\n\n📊 `result = [−2]`.',
      state: {
        diff: [-2, 2, 3, 2, -2], result: [-2],
        action: 'result[0] = diff[0] = −2.',
      },
    },
    {
      id: 5,
      title: 'Reconstruct i=1',
      explanation: '🔍 Reconstruct index 1.\n\n🧮 result[1] = result[0] + diff[1] = (−2) + 2 = **0**.\n\n📊 `result = [−2, 0]`.',
      state: {
        diff: [-2, 2, 3, 2, -2], result: [-2, 0],
        action: 'result[1] = result[0] + diff[1] = −2 + 2 = 0.',
      },
    },
    {
      id: 6,
      title: 'Reconstruct i=2',
      explanation: '🔍 Reconstruct index 2.\n\n🧮 result[2] = result[1] + diff[2] = 0 + 3 = **3**.\n\n📊 `result = [−2, 0, 3]`.',
      state: {
        diff: [-2, 2, 3, 2, -2], result: [-2, 0, 3],
        action: 'result[2] = result[1] + diff[2] = 0 + 3 = 3.',
      },
    },
    {
      id: 7,
      title: 'Reconstruct i=3',
      explanation: '🔍 Reconstruct index 3.\n\n🧮 result[3] = result[2] + diff[3] = 3 + 2 = **5**.\n\n📊 `result = [−2, 0, 3, 5]`.',
      state: {
        diff: [-2, 2, 3, 2, -2], result: [-2, 0, 3, 5],
        action: 'result[3] = result[2] + diff[3] = 3 + 2 = 5.',
      },
    },
    {
      id: 8,
      title: 'Reconstruct i=4 — Done',
      explanation: '🔍 Reconstruct index 4 (last).\n\n🧮 result[4] = result[3] + diff[4] = 5 + (−2) = **3**.\n\n✅ Final: `result = [−2, 0, 3, 5, 3]` — matches LC 370\'s expected output.',
      state: {
        diff: [-2, 2, 3, 2, -2], result: [-2, 0, 3, 5, 3],
        action: 'result[4] = result[3] + diff[4] = 5 + (−2) = 3. Done.',
      },
    },
    {
      id: 9,
      title: 'Verify + Complexity',
      explanation: '🎯 Verification by hand (naive approach):\n- Start: `[0, 0, 0, 0, 0]`\n- Apply [1,3]+=2: `[0, 2, 2, 2, 0]`\n- Apply [2,4]+=3: `[0, 2, 5, 5, 3]`\n- Apply [0,2]+=−2: `[−2, 0, 3, 5, 3]` ✅\n\n📌 Complexity:\n- K updates → O(K) time (each = 2 O(1) marks)\n- 1 prefix sum pass → O(N) time\n- Total: **O(K + N)**, space O(N)\n\nBrute force (loop over each range per update) = O(K × N). For K = 10K updates, N = 10K elements: 100M ops vs 20K — 5,000× speedup.',
      state: {
        diff: [-2, 2, 3, 2, -2], result: [-2, 0, 3, 5, 3], found: true,
        action: 'Verified. Time O(K+N), space O(N).',
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