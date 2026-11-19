// ============================================================
// BASIC BINARY SEARCH — LeetCode 704: Binary Search
// ============================================================
export const basicBinarySearch = {
  id: 'basic-binary-search',
  patternId: 'binary-search',
  title: 'Basic Binary Search',
  subtitle: 'The Dictionary Search',
  type: 'basic-binary-search',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Repeatedly divide the sorted search interval in half.',
    why: 'If the target is smaller than the middle element, it must be in the left half. If it\'s larger, it must be in the right half. This eliminates half the remaining elements in one step.',
    when: 'Searching for a specific value in a sorted array, or finding the exact insertion point.',
    properties: [
      'Requires sorted or monotonic input.',
      'Time complexity is O(log N).',
      'Mid calculation `left + (right - left) / 2` prevents integer overflow.',
    ],
  },

  patternRecognition: {
    clues: [
      'The array is explicitly sorted.',
      'You need to find an exact element.',
      'The time complexity is required to be O(log N).',
    ],
    inputs: ['Sorted Array', 'Sorted Matrix'],
    constraints: ['O(1) extra space', 'O(log N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'LC 704 — Binary Search',
      explanation: 'Input: `nums = [-1, 0, 3, 5, 9, 12]`, `target = 9`. We want index 4.\n\nL = 0 and R = 5 mark where the target could be. Since the array is sorted, every probe can eliminate half of what remains.',
      state: {
        array: [-1, 0, 3, 5, 9, 12], left: 0, right: 5, mid: null, target: 9,
        action: 'Search space [0, 5].',
      },
    },
    {
      id: 1,
      title: 'Probe 1 — Too Small',
      explanation: 'mid = 2. nums[2] = 3 < 9. Because the array is sorted, everything at index ≤ 2 is also < 9. The target cannot be in the left half.',
      state: {
        array: [-1, 0, 3, 5, 9, 12], left: 0, right: 5, mid: 2, target: 9,
        action: 'nums[2]=3 < 9 → go right.',
      },
    },
    {
      id: 2,
      title: 'Move L Past mid',
      explanation: 'L = mid + 1 = 3. We skip index 2 because we already know it isn\'t the target. Search space is now [3, 5].',
      state: {
        array: [-1, 0, 3, 5, 9, 12], left: 3, right: 5, mid: null, target: 9,
        action: 'L = 3. Search space [3, 5].',
      },
    },
    {
      id: 3,
      title: 'Probe 2 — Exact Match',
      explanation: 'mid = 4. nums[4] = 9 == target. Return 4. Two probes total — linear search would have taken 5.',
      state: {
        array: [-1, 0, 3, 5, 9, 12], left: 3, right: 5, mid: 4, target: 9, found: true,
        action: 'nums[4]=9 == target. Return 4.',
      },
    },
  ],

  javaCode: `public class BinarySearch {
    public int search(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] == target) {
                return mid;
            } else if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        return -1;
    }
}`,

  javaExplanation: [
    { line: 'while (left <= right)', note: '<= is used because the search space includes a single element.' },
    { line: 'int mid = left + (right - left) / 2;', note: 'This prevents integer overflow compared to (left + right) / 2.' },
    { line: 'if (nums[mid] == target)', note: 'Found the target, return the index.' },
    { line: 'left = mid + 1;', note: 'Target is larger, discard the left half (including mid).' },
    { line: 'right = mid - 1;', note: 'Target is smaller, discard the right half (including mid).' },
  ],

  complexity: {
    time: 'O(log N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'The search space halves at each step. For N=1,000,000, it takes at most 20 steps.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'Linear search from left to right.',
  },

  commonMistakes: [
    { title: 'Infinite Loop', detail: 'If you use `left = mid` or `right = mid` instead of `mid + 1` / `mid - 1`, it can get stuck in an infinite loop.' },
    { title: 'Overflow', detail: 'Using `(left + right) / 2` can overflow if left + right exceeds Integer.MAX_VALUE.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/' },
    { level: 'Easy', title: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/' },
    { level: 'Easy', title: 'Sqrt(x)', url: 'https://leetcode.com/problems/sqrtx/' },
  ],

  quickRevision: [
    'L = 0, R = N-1.',
    'mid = L + (R - L) / 2.',
    'Loop while L <= R.',
  ],
};

// ============================================================
// LOWER / UPPER BOUND — LeetCode 34: Find First and Last Position
// ============================================================
export const lowerUpperBound = {
  id: 'lower-upper-bound',
  patternId: 'binary-search',
  title: 'Lower / Upper Bound',
  subtitle: 'The Insertion Point',
  type: 'lower-upper-bound',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Instead of returning immediately when a target is found, continue searching to find the very first or very last occurrence.',
    why: 'When there are duplicates, a standard binary search returns an arbitrary copy. Lower Bound finds the first index where the value is >= target, and Upper Bound finds the first index where value > target.',
    when: 'Finding the first/last occurrence, or finding the exact insertion index for a value.',
    properties: [
      'Lower Bound: First index where `nums[i] >= target`.',
      'Upper Bound: First index where `nums[i] > target`.',
      'Uses a `while (left < right)` loop.',
    ],
  },

  patternRecognition: {
    clues: [
      'The array has duplicates.',
      '"Find the first and last position of a target".',
      '"Find the insertion point".',
    ],
    inputs: ['Sorted Array (may contain duplicates)'],
    constraints: ['O(log N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'LC 34 — Find First and Last Position',
      explanation: 'Input: `nums = [5, 7, 7, 8, 8, 10]`, `target = 8`. We want `[3, 4]` — the first and last 8.\n\nStandard binary search would return 3 or 4 arbitrarily. We need Lower Bound (first index where nums[i] ≥ 8). Note R = 6, not 5 — we allow a virtual slot past the end in case the target doesn\'t exist.',
      state: {
        array: [5, 7, 7, 8, 8, 10], left: 0, right: 6, mid: null, target: 8,
        action: 'Lower Bound setup: L=0, R=6.',
      },
    },
    {
      id: 1,
      title: 'Probe 1 — Match, But Keep Going',
      explanation: 'mid = 3. nums[3] = 8 — a match. But is it the FIRST 8? We don\'t know. Record ans = 3, then search left: R = mid = 3 (keep index 3 as a valid candidate).',
      state: {
        array: [5, 7, 7, 8, 8, 10], left: 0, right: 3, mid: 3, target: 8, ans: 3,
        action: 'nums[3]=8. ans=3. R=mid.',
      },
    },
    {
      id: 2,
      title: 'Probe 2 — Too Small',
      explanation: 'mid = 1. nums[1] = 7 < 8. Everything at index ≤ 1 is < 8. Discard them: L = 2.',
      state: {
        array: [5, 7, 7, 8, 8, 10], left: 2, right: 3, mid: 1, target: 8, ans: 3,
        action: 'nums[1]=7 < 8 → L=2.',
      },
    },
    {
      id: 3,
      title: 'Probe 3 — Too Small Again',
      explanation: 'mid = 2. nums[2] = 7 < 8. Move L = 3. Interval collapses to [3, 3].',
      state: {
        array: [5, 7, 7, 8, 8, 10], left: 3, right: 3, mid: 2, target: 8, ans: 3,
        action: 'nums[2]=7 < 8 → L=3.',
      },
    },
    {
      id: 4,
      title: 'First Occurrence = 3',
      explanation: 'L == R == 3. First 8 is at index 3. To get the last 8, run Upper Bound (flip `<` to `<=`) → converges to 5, so last = 4. Answer: `[3, 4]`.',
      state: {
        array: [5, 7, 7, 8, 8, 10], left: 3, right: 3, mid: 3, target: 8, ans: 3, found: true,
        action: 'First = 3. Upper Bound gives last = 4. Return [3,4].',
      },
    },
  ],

  javaCode: `public class LowerBound {
    public int lowerBound(int[] nums, int target) {
        int left = 0;
        int right = nums.length; // Not N-1

        while (left < right) {
            int mid = left + (right - left) / 2;

            if (nums[mid] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}`,

  javaExplanation: [
    { line: 'int right = nums.length;', note: 'The search space includes a hypothetical index N (if target is larger than all elements).' },
    { line: 'while (left < right)', note: 'Strictly less than. When they are equal, we found the boundary.' },
    { line: 'if (nums[mid] < target)', note: 'Mid is definitely too small. Search to the right.' },
    { line: 'else right = mid;', note: 'Mid is >= target. It could be the first occurrence, so keep it in the search space by setting R = mid.' },
  ],

  complexity: {
    time: 'O(log N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Standard binary search halving.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(1)',
    note: 'Linear scan to find the first occurrence.',
  },

  commonMistakes: [
    { title: 'Using left <= right', detail: 'Lower bound uses a slightly different template: `left < right` and `right = mid`.' },
    { title: 'right = mid - 1', detail: 'If you do this, you might discard the exact answer when nums[mid] == target.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Find First and Last Position of Element in Sorted Array', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
    { level: 'Easy', title: 'Search Insert Position', url: 'https://leetcode.com/problems/search-insert-position/' },
  ],

  quickRevision: [
    'R = N (not N-1).',
    'while L < R.',
    'if nums[mid] < target -> L = mid + 1.',
    'else -> R = mid.',
  ],
};

// ============================================================
// BINARY SEARCH ON ANSWER — LeetCode 875: Koko Eating Bananas
// ============================================================
export const binarySearchOnAnswer = {
  id: 'binary-search-on-answer',
  patternId: 'binary-search',
  title: 'Binary Search on Answer',
  subtitle: 'The Optimizer',
  type: 'binary-search-on-answer',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Instead of searching through an array, we search through the possible range of answers.',
    why: 'If a problem asks for the "minimum capacity" or "maximum speed" to achieve a goal, and a larger capacity always helps, we can binary search the answer space.',
    when: 'Problems that ask for min/max of something where the condition is monotonic (e.g., if speed 5 works, speed 6 will definitely work).',
    properties: [
      'The search space is not the array indices, but a range `[min_possible, max_possible]`.',
      'We write a `canAchieve(mid)` function that returns true/false.',
      'We binary search for the first `mid` that returns true.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find the minimum capacity / speed / time..."',
      '"Maximize the minimum..."',
      'The input array is not necessarily sorted, but the answer space is.',
    ],
    inputs: ['Array of numbers'],
    constraints: ['O(N log M) time, where M is the answer range'],
  },

  steps: [
    {
      id: 0,
      title: 'LC 875 — What Are We Looking For?',
      explanation: 'Input: `piles = [3, 6, 7, 11]`, `h = 8`.\n\n🎯 Goal: Find the SMALLEST eating speed K so Koko finishes all 4 piles within 8 hours.\n\nWhy "smallest"? Any speed big enough works — we want the minimum that still meets the deadline.\n\n🔍 Search space: K can range from 1 (slowest) to 11 (largest pile). Going faster than 11 is pointless — Koko can\'t finish an 11-banana pile in less than 1 hour no matter what. So we binary search K in [1, 11].\n\nNext step → Check the middle speed K = 6.',
      state: {
        array: [3, 6, 7, 11], left: 1, right: 11, mid: null, hours: 8,
        action: 'Goal: smallest K where total hours ≤ 8. Search K in [1, 11].',
      },
    },
    {
      id: 1,
      title: 'Probe 1 — Check K = 6',
      explanation: '🔍 What we\'re doing: Guess K = 6. Compute total hours.\n\n🍌 Hours = ceil(3/6) + ceil(6/6) + ceil(7/6) + ceil(11/6) = 1 + 1 + 2 + 2 = 6 hours.\n\n✅ Verdict: 6 ≤ 8 → K = 6 WORKS.\n\n➡️ Next move: Since it works, maybe a smaller K also works. Shrink toward smaller by setting R = 6. We keep 6 in the space — if nothing smaller works, 6 is our fallback answer.\n\nNext step → Check K = 3 (middle of [1, 6]).',
      state: {
        array: [3, 6, 7, 11], left: 1, right: 6, mid: 6, hours: 8, currentHours: 6,
        action: 'K=6 → 6h ≤ 8h. Valid. Shrink right (R=6). Next: check smaller.',
      },
    },
    {
      id: 2,
      title: 'Probe 2 — Check K = 3',
      explanation: '🔍 What we\'re doing: Guess K = 3 (middle of [1, 6]).\n\n🍌 Hours = ceil(3/3) + ceil(6/3) + ceil(7/3) + ceil(11/3) = 1 + 2 + 3 + 4 = 10 hours.\n\n❌ Verdict: 10 > 8 → K = 3 FAILS.\n\n➡️ Next move: Since K = 3 fails, any speed ≤ 3 also fails (slower = more hours). The whole left half [1, 3] is useless. Discard it: L = 4.\n\nNext step → Check K = 5 (middle of [4, 6]).',
      state: {
        array: [3, 6, 7, 11], left: 4, right: 6, mid: 3, hours: 8, currentHours: 10,
        action: 'K=3 → 10h > 8h. Invalid. Discard left (L=4). Next: check bigger.',
      },
    },
    {
      id: 3,
      title: 'Probe 3 — Check K = 5',
      explanation: '🔍 What we\'re doing: Guess K = 5 (middle of [4, 6]).\n\n🍌 Hours = ceil(3/5) + ceil(6/5) + ceil(7/5) + ceil(11/5) = 1 + 2 + 2 + 3 = 8 hours.\n\n✅ Verdict: 8 ≤ 8 → K = 5 WORKS.\n\n➡️ Next move: Better than K = 6. Maybe K = 4 also works. Shrink right: R = 5.\n\nNext step → Check K = 4 (middle of [4, 5]).',
      state: {
        array: [3, 6, 7, 11], left: 4, right: 5, mid: 5, hours: 8, currentHours: 8,
        action: 'K=5 → 8h ≤ 8h. Valid. Shrink right (R=5). Next: check smaller.',
      },
    },
    {
      id: 4,
      title: 'Probe 4 — Check K = 4 → Answer Found',
      explanation: '🔍 What we\'re doing: Guess K = 4 (middle of [4, 5]).\n\n🍌 Hours = ceil(3/4) + ceil(6/4) + ceil(7/4) + ceil(11/4) = 1 + 2 + 2 + 3 = 8 hours.\n\n✅ Verdict: 8 ≤ 8 → K = 4 WORKS.\n\n➡️ Next move: R = 4. Now L == R == 4 — no more guesses possible.\n\n🎯 Answer: K = 4. Every smaller K was either proven to fail (K = 3) or excluded by logic (K = 1, 2 are even slower). This is the smallest valid speed.',
      state: {
        array: [3, 6, 7, 11], left: 4, right: 4, mid: 4, hours: 8, currentHours: 8,
        action: 'K=4 → 8h ≤ 8h. Valid. L==R==4. Answer = 4.', found: true,
      },
    },
  ],

  javaCode: `public class KokoEatingBananas {
    public int minEatingSpeed(int[] piles, int h) {
        int left = 1;
        int right = 0;
        for (int pile : piles) {
            right = Math.max(right, pile);
        }

        while (left < right) {
            int mid = left + (right - left) / 2;
            
            if (canFinish(piles, mid, h)) {
                right = mid;      // Try smaller speed
            } else {
                left = mid + 1;   // Need larger speed
            }
        }
        return left;
    }

    private boolean canFinish(int[] piles, int speed, int h) {
        int hours = 0;
        for (int pile : piles) {
            hours += Math.ceil((double) pile / speed);
        }
        return hours <= h;
    }
}`,

  javaExplanation: [
    { line: 'int left = 1, right = maxPile;', note: 'The answer must be between 1 and the largest pile.' },
    { line: 'int mid = left + (right - left) / 2;', note: 'Guess a speed.' },
    { line: 'if (canFinish(...))', note: 'If this speed works, try to find an even smaller speed.' },
    { line: 'right = mid;', note: 'We keep mid in the search space because it might be the minimum.' },
  ],

  complexity: {
    time: 'O(N log M)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'N is the number of piles (we iterate through it for each guess). M is the max pile size. The binary search takes log M steps.',
  },

  bruteForce: {
    time: 'O(N * M)',
    space: 'O(1)',
    note: 'Linear search from speed 1 to max pile, checking `canFinish` at each step.',
  },

  commonMistakes: [
    { title: 'Using integer division', detail: 'In Java, `pile / speed` does integer division. Use `Math.ceil((double) pile / speed)`.' },
    { title: 'Off-by-one in bounds', detail: 'If left starts at 1, make sure the mid calculation handles it correctly.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/' },
    { level: 'Medium', title: 'Capacity To Ship Packages Within D Days', url: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/' },
    { level: 'Hard', title: 'Split Array Largest Sum', url: 'https://leetcode.com/problems/split-array-largest-sum/' },
  ],

  quickRevision: [
    'Find the min and max possible answers.',
    'While L < R:',
    '  Check if mid is valid.',
    '  If valid, R = mid.',
    '  If invalid, L = mid + 1.',
  ],
};

export const binarySearchSubPatterns = [basicBinarySearch, lowerUpperBound, binarySearchOnAnswer];

export const binarySearchOverview = {
  id: 'binary-search',
  title: 'Binary Search',
  subtitle: 'Divide and conquer to find targets in O(log N) time',
  introduction: 'Binary Search is a fundamental algorithm that finds the position of a target value within a sorted array. By repeatedly dividing the search interval in half, it achieves logarithmic time complexity, making it incredibly fast for massive datasets.',
  coreConcept: {
    what: 'Repeatedly halving the search space by comparing the middle element to the target.',
    why: 'It eliminates half of the remaining elements at every step, turning an O(N) linear scan into an O(log N) operation.',
    when: 'The input is sorted, or the problem asks for a boundary in a monotonic function.',
  },
  whenToUse: [
    'The array is sorted.',
    'You need to find an exact target, or the first/last occurrence.',
    'The problem asks for a minimum or maximum value that satisfies a monotonic condition.',
  ],
  recognitionClues: [
    '"Sorted array"',
    '"O(log N) time complexity required"',
    '"Find the first/last..."',
    '"Minimum capacity/speed..."',
  ],
  importantProperties: [
    'Requires sorted input.',
    'The search space halves every iteration.',
    'Can be applied to the answer space, not just array indices.',
  ],
  comparison: [
    { aspect: 'Basic Search', when: 'Exact target', time: 'O(log N)', space: 'O(1)' },
    { aspect: 'Lower Bound', when: 'First occurrence', time: 'O(log N)', space: 'O(1)' },
    { aspect: 'Rotated Array', when: 'Broken sort order', time: 'O(log N)', space: 'O(1)' },
    { aspect: 'On Answer', when: 'Optimization (Min/Max)', time: 'O(N log M)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Infinite Loops', detail: 'Make sure left or right moves past mid (`mid + 1` or `mid - 1`) to avoid infinite loops.' },
    { title: 'Overflow', detail: 'Use `left + (right - left) / 2` instead of `(left + right) / 2`.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Binary Search', url: 'https://leetcode.com/problems/binary-search/' },
    { level: 'Medium', title: 'Search in Rotated Sorted Array', url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/' },
    { level: 'Medium', title: 'Find First and Last Position', url: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/' },
    { level: 'Medium', title: 'Koko Eating Bananas', url: 'https://leetcode.com/problems/koko-eating-bananas/' },
  ],
};