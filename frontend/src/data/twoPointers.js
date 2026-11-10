// ============================================================
// OPPOSITE ENDS — Two Sum II, target=19, array=[1,3,5,8,11,15]
// ============================================================
export const oppositeEnds = {
  id: 'opposite-ends',
  patternId: 'two-pointers',
  title: 'Opposite Ends',
  subtitle: 'Converging Pointers',
  type: 'opposite-ends',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Two pointers start at the two ends of a sorted array and walk toward each other.',
    why: 'A single comparison eliminates an entire row or column of the N² pair matrix — turning O(N²) brute force into O(N).',
    when: 'Sorted (or monotonic) input + a pair relationship (sum, difference, product, area, palindrome).',
    properties: [
      'Requires sorted or monotone-comparable input.',
      'Loop condition is strict L < R (never ≤).',
      'On non-match, exactly ONE pointer moves.',
      'Pointer moves are never reversed — zero backtracking.',
      'Every elimination is provably permanent.',
    ],
  },

  patternRecognition: {
    clues: ['Input is sorted ascending/descending', 'Return indices/values of a pair', 'Sum, product, difference target', 'Palindrome / mirror comparison', 'Container / area / max-min between two lines'],
    inputs: ['Sorted array', 'String with symmetric structure', 'Height / line array'],
    constraints: ['Memory tight (O(1) space demanded)', 'N up to 10⁵ or 10⁶'],
  },

  // ---- INTERACTIVE STEPS ----
  steps: [
    {
      id: 0,
      title: 'Initial State',
      explanation: 'We want a pair summing to 19. Place L at index 0 (value 1), R at index 5 (value 15). The current sum is 1 + 15 = 16 — less than 19.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 0, right: 5,
        sum: 16, target: 19, highlighted: { 0: 'left', 5: 'right' },
        comparison: '16 < 19', action: 'Move L inward to increase sum', found: false,
      },
    },
    {
      id: 1,
      title: 'L++ (sum too small)',
      explanation: 'Sum is too small — the only way to increase it is to bring in a larger value on the left. Move L to index 1. New sum: 3 + 15 = 18.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 1, right: 5,
        sum: 18, target: 19,
        highlighted: { 0: 'discarded', 1: 'left', 5: 'right' },
        comparison: '18 < 19', action: 'Move L again', found: false,
      },
    },
    {
      id: 2,
      title: 'L++ (still too small)',
      explanation: 'Still too small. Move L to index 2. New sum: 5 + 15 = 20 — now too BIG.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 2, right: 5,
        sum: 20, target: 19,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'left', 5: 'right' },
        comparison: '20 > 19', action: 'Move R inward to decrease sum', found: false,
      },
    },
    {
      id: 3,
      title: 'R-- (sum too large)',
      explanation: 'Sum too large — bring in a smaller right value. Move R to index 4. New sum: 5 + 11 = 16.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 2, right: 4,
        sum: 16, target: 19,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'left', 4: 'right', 5: 'discarded' },
        comparison: '16 < 19', action: 'Move L inward', found: false,
      },
    },
    {
      id: 4,
      title: 'L++ (sum too small)',
      explanation: 'Move L to index 3. New sum: 8 + 11 = 19 — matches target!',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 3, right: 4,
        sum: 19, target: 19,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'match', 4: 'match', 5: 'discarded' },
        comparison: '19 == 19', action: 'Found pair (3, 4) → values 8 and 11', found: true,
      },
    },
  ],

  javaCode: `import java.util.Arrays;

public class TwoSumII {
    // Returns 1-indexed positions of the pair summing to target.
    // Input array MUST be sorted ascending.
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if (sum == target) {
                return new int[]{left + 1, right + 1};  // 1-indexed
            } else if (sum < target) {
                left++;   // need a larger value
            } else {
                right--;  // need a smaller value
            }
        }
        return new int[]{-1, -1};  // no pair found
    }
}`,

  javaExplanation: [
    { line: 'int left = 0;', note: 'Start pointer at the smallest element.' },
    { line: 'int right = numbers.length - 1;', note: 'Start pointer at the largest element.' },
    { line: 'while (left < right) {', note: 'Strict < — the pointers must not cross, and we never pair an element with itself.' },
    { line: 'int sum = numbers[left] + numbers[right];', note: 'The only candidate being considered this iteration.' },
    { line: 'if (sum == target) return ...', note: 'Match found. Convert to 1-indexed because the problem statement demands it.' },
    { line: 'else if (sum < target) left++;', note: 'Left value is too small to pair with anything up to R. Discard it permanently.' },
    { line: 'else right--;', note: 'Right value is too large to pair with anything from L. Discard it permanently.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1) — only two int indices',
    explanation: 'The interval R − L decreases by exactly 1 each iteration, so at most N − 1 iterations. Each iteration performs O(1) work.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Checking all N(N−1)/2 pairs. Correct but TLE on N ≥ 10⁵.',
  },

  commonMistakes: [
    { title: 'Using while (L <= R)', detail: 'Compares an element with itself when L == R. Must be strict `<`.' },
    { title: 'Moving both pointers on a non-match', detail: 'Only the pointer whose value is provably wrong should move.' },
    { title: 'Forgetting that input must be sorted', detail: 'On unsorted input, the monotonicity argument collapses silently — the code runs but returns wrong results.' },
    { title: 'Skipping the sorted pre-check', detail: 'Sort takes O(N log N). Total is O(N log N), not O(N). Communicate this correctly.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/' },
    { level: 'Easy', title: 'Squares of a Sorted Array', url: 'https://leetcode.com/problems/squares-of-a-sorted-array/' },
    { level: 'Medium', title: 'Two Sum II — Input Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
    { level: 'Medium', title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/' },
    { level: 'Hard', title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/' },
  ],

  quickRevision: [
    'Sort first if not sorted.',
    'L = 0, R = N−1; loop while L < R.',
    'Sum too small → L++. Too big → R--. Match → return / record.',
    'Move exactly one pointer per non-match.',
    'O(N) time, O(1) space.',
  ],
};

// ============================================================
// SAME DIRECTION — Remove Duplicates, array=[1,1,2,2,3,4]
// ============================================================
export const sameDirection = {
  id: 'same-direction',
  patternId: 'two-pointers',
  title: 'Same Direction',
  subtitle: 'Fast & Slow · In-Place Modification',
  type: 'same-direction',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Both pointers start at the beginning. Slow writes valid elements; fast scans every element.',
    why: 'Enables in-place compaction in O(1) space — the write head only advances when there is something to write.',
    when: 'In-place filtering, deduplication, moving zeros, deleting values.',
    properties: [
      'slow ≤ fast at all times.',
      'Writing at slow never corrupts unread data.',
      'Keeps preserved elements in their original relative order.',
      'Runs in one pass — O(N) time, O(1) space.',
    ],
  },

  patternRecognition: {
    clues: ['"Remove duplicates/zeros/element in place"', '"Return new length k"', '"Modify array in place"', 'O(1) extra memory constraint'],
    inputs: ['Sorted array (for dedup)', 'Unsorted array (for element removal)'],
    constraints: ['Cannot allocate a second array', 'Must not change relative order of kept elements'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial State',
      explanation: 'slow=0 marks the last unique element written. fast=1 scans for the next unique value.',
      state: {
        array: [1, 1, 2, 2, 3, 4], slow: 0, fast: 1,
        highlighted: { 0: 'window', 1: 'fast' },
        action: 'Compare nums[fast] vs nums[slow]',
      },
    },
    {
      id: 1,
      title: 'fast=1, duplicate',
      explanation: 'nums[1]=1 equals nums[slow]=1 — duplicate, skip. fast moves to 2, slow stays.',
      state: {
        array: [1, 1, 2, 2, 3, 4], slow: 0, fast: 2,
        highlighted: { 0: 'window', 1: 'discarded', 2: 'fast' },
        action: 'fast++ (duplicate skipped)',
      },
    },
    {
      id: 2,
      title: 'fast=2, new unique',
      explanation: 'nums[2]=2 ≠ nums[slow]=1. Advance slow to index 1, write nums[1]=2.',
      state: {
        array: [1, 2, 2, 2, 3, 4], slow: 1, fast: 2,
        highlighted: { 0: 'window', 1: 'window', 2: 'fast' },
        action: 'Write 2 at index 1, then fast++',
      },
    },
    {
      id: 3,
      title: 'fast=3, duplicate',
      explanation: 'nums[3]=2 equals nums[slow]=2 — duplicate. fast advances to 4.',
      state: {
        array: [1, 2, 2, 2, 3, 4], slow: 1, fast: 4,
        highlighted: { 0: 'window', 1: 'window', 2: 'discarded', 3: 'discarded', 4: 'fast' },
        action: 'fast++ (duplicate)',
      },
    },
    {
      id: 4,
      title: 'fast=4, new unique',
      explanation: 'nums[4]=3 ≠ nums[slow]=2. Advance slow to 2, write 3 at index 2.',
      state: {
        array: [1, 2, 3, 2, 3, 4], slow: 2, fast: 4,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'discarded', 4: 'fast', 5: 'fast' },
        action: 'Write 3 at index 2, fast++',
      },
    },
    {
      id: 5,
      title: 'fast=5, new unique',
      explanation: 'nums[5]=4 ≠ nums[slow]=3. Advance slow to 3, write 4 at index 3.',
      state: {
        array: [1, 2, 3, 4, 3, 4], slow: 3, fast: 5,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'discarded', 5: 'fast' },
        action: 'Write 4 at index 3',
      },
    },
    {
      id: 6,
      title: 'Done',
      explanation: 'fast reached the end. First slow+1 = 4 elements (1,2,3,4) are unique. Return 4.',
      state: {
        array: [1, 2, 3, 4, 3, 4], slow: 3, fast: 5,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'discarded', 5: 'discarded' },
        action: 'Return slow + 1 = 4', found: true,
      },
    },
  ],

  javaCode: `public class RemoveDuplicates {
    // Returns the number of unique elements, writing them into the first k slots.
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;  // count of unique elements
    }
}`,

  javaExplanation: [
    { line: 'int slow = 0;', note: 'Index of the last unique element written so far.' },
    { line: 'for (int fast = 1; ...) {', note: 'fast reads every element starting from 1.' },
    { line: 'if (nums[fast] != nums[slow])', note: 'Only keep when the current element differs from the last keeper.' },
    { line: 'nums[slow] = nums[fast];', note: 'Overwrite: no auxiliary storage.' },
    { line: 'return slow + 1;', note: 'slow is the last valid index; length = slow + 1.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1) — two integer indices',
    explanation: 'fast visits every element once. Each iteration does O(1) work.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Shifting elements after every duplicate delete. Loses the one-pass advantage.',
  },

  commonMistakes: [
    { title: 'Returning slow instead of slow + 1', detail: 'slow is the last index; the count is one more.' },
    { title: 'Starting fast at 0', detail: 'Would compare nums[0] to itself and work — but usually off-by-one misaligns the invariant. Start fast at 1.' },
    { title: 'Writing when nums[fast] == nums[slow]', detail: 'Only advance slow on new unique values.' },
    { title: 'Using fast++ inside the if block', detail: 'The for-loop already advances fast; only slow moves conditionally.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
    { level: 'Easy', title: 'Remove Element', url: 'https://leetcode.com/problems/remove-element/' },
    { level: 'Easy', title: 'Move Zeroes', url: 'https://leetcode.com/problems/move-zeroes/' },
    { level: 'Medium', title: 'Remove Duplicates from Sorted Array II', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/' },
    { level: 'Medium', title: 'Sort Array By Parity', url: 'https://leetcode.com/problems/sort-array-by-parity/' },
  ],

  quickRevision: [
    'slow = 0, fast = 1.',
    'If keep(nums[fast]) → nums[slow++] = nums[fast].',
    'Return slow (or slow + 1 for last-index semantics).',
    'slow ≤ fast always — safe to write.',
    'O(N) time, O(1) space.',
  ],
};

// ============================================================
// DUTCH FLAG — Sort Colors, array=[2,0,1,2,0,1]
// ============================================================
export const dutchFlag = {
  id: 'dutch-flag',
  patternId: 'two-pointers',
  title: 'Dutch National Flag',
  subtitle: 'Three-Way Partition',
  type: 'dutch-flag',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Three pointers (lo, mid, hi) partition the array into three ordered regions in one pass.',
    why: 'Sorts 0s, 1s, 2s (or any three-way pivot split) in O(N) without extra space.',
    when: 'Exactly three ordered categories + O(1) memory.',
    properties: [
      'Four regions: <pivot, ==pivot, unexplored, >pivot.',
      'mid is the explorer; lo and hi are settled boundaries.',
      'Do NOT advance mid after swap(mid, hi) — incoming value from hi is unexplored.',
      'Runs in one pass, O(N) time, O(1) space.',
    ],
  },

  patternRecognition: {
    clues: ['Sort an array with only 0s, 1s, 2s', 'Partition around a pivot into three groups', '"Three-way split" / "Dutch flag"'], 
    inputs: ['Array with values from a small set of 3 categories'],
    constraints: ['O(1) extra space', 'Single pass preferred'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial State',
      explanation: 'lo=0, mid=0, hi=5. Pivot = 1. nums[mid]=2 > 1 → swap(mid, hi), then hi--.',
      state: {
        array: [2, 0, 1, 2, 0, 1], lo: 0, mid: 0, hi: 5, pivot: 1,
        highlighted: { 0: 'mid', 5: 'hi' },
        action: 'nums[0]=2 > 1 → swap(mid,hi), hi--',
      },
    },
    {
      id: 1,
      title: 'After swap(mid, hi)',
      explanation: 'Array is [1, 0, 1, 2, 0, 2]. hi is now 4. nums[mid]=1 == 1 → mid++.',
      state: {
        array: [1, 0, 1, 2, 0, 2], lo: 0, mid: 0, hi: 4, pivot: 1,
        highlighted: { 0: 'mid', 5: 'discarded' },
        action: 'nums[0]=1 == pivot → mid++',
      },
    },
    {
      id: 2,
      title: 'mid=1, value 0 < pivot',
      explanation: 'nums[1]=0 < 1. Swap(lo=0, mid=1), then lo++, mid++. Array becomes [0, 1, 1, 2, 0, 2].',
      state: {
        array: [0, 1, 1, 2, 0, 2], lo: 1, mid: 2, hi: 4, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'mid' },
        action: 'swap(0,1), lo++, mid++',
      },
    },
    {
      id: 3,
      title: 'mid=2, value 1 == pivot',
      explanation: 'nums[2]=1 == 1 → mid++. Now mid=3.',
      state: {
        array: [0, 1, 1, 2, 0, 2], lo: 1, mid: 3, hi: 4, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'mid' },
        action: 'nums[3]=2 > 1 → will swap with hi',
      },
    },
    {
      id: 4,
      title: 'mid=3, value 2 > pivot',
      explanation: 'nums[3]=2 > 1. Swap(mid=3, hi=4), hi--. Array becomes [0,1,1,0,2,2]. Note: mid stays at 3.',
      state: {
        array: [0, 1, 1, 0, 2, 2], lo: 1, mid: 3, hi: 3, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'mid' },
        action: 'swap(mid,hi), hi-- · mid stays',
      },
    },
    {
      id: 5,
      title: 'mid=3, value 0 < pivot',
      explanation: 'nums[3]=0 < 1. Swap(lo=1, mid=3), lo++, mid++. Array becomes [0,0,1,1,2,2].',
      state: {
        array: [0, 0, 1, 1, 2, 2], lo: 2, mid: 4, hi: 3, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'mid' },
        action: 'swap(1,3), lo++, mid++',
      },
    },
    {
      id: 6,
      title: 'Sorted!',
      explanation: 'mid=4 > hi=3 → loop exits. Array is sorted [0,0,1,1,2,2].',
      state: {
        array: [0, 0, 1, 1, 2, 2], lo: 2, mid: 4, hi: 3, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'window', 5: 'window' },
        action: 'Sorted!', found: true,
      },
    },
  ],

  javaCode: `public class SortColors {
    // Partitions nums into [< pivot, == pivot, > pivot] in one pass.
    public void sortColors(int[] nums) {
        int lo = 0;
        int mid = 0;
        int hi = nums.length - 1;
        int pivot = 1;   // In general: pick nums[0] or a random element

        while (mid <= hi) {
            if (nums[mid] < pivot) {
                swap(nums, lo, mid);
                lo++;
                mid++;
            } else if (nums[mid] == pivot) {
                mid++;
            } else {  // nums[mid] > pivot
                swap(nums, mid, hi);
                hi--;         // NOTE: mid stays — new value from hi is unexplored
            }
        }
    }

    private void swap(int[] a, int i, int j) {
        int tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
}`,

  javaExplanation: [
    { line: 'int lo = 0, mid = 0, hi = nums.length - 1;', note: 'Three pointers mark four regions.' },
    { line: 'while (mid <= hi)', note: '≤ because mid and hi can meet — the last element still needs inspection.' },
    { line: 'nums[mid] < pivot → swap(lo, mid); lo++; mid++;', note: 'The swapped-in value at mid came from the ==-region, so it is safe to advance mid.' },
    { line: 'nums[mid] == pivot → mid++;', note: 'Already in the correct region.' },
    { line: 'nums[mid] > pivot → swap(mid, hi); hi--;', note: 'CRITICAL: mid does NOT move — the new value at mid is unexplored.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1) — three integer indices',
    explanation: 'Each element is inspected by mid at most once. hi and mid together shrink the unexplored window monotonically.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(1)',
    note: 'Generic sort. Correct but does not exploit the three-value structure.',
  },

  commonMistakes: [
    { title: 'mid++ after swap(mid, hi)', detail: 'The value from hi is unexamined — advancing mid skips it. Wrong output that looks almost correct.' },
    { title: 'Loop condition mid < hi', detail: 'Must be ≤ — otherwise the last remaining element is never inspected.' },
    { title: 'mid++ after swap(lo, mid) — you DO want this', detail: 'Unlike the hi case, the swapped-in value is known to be == pivot. Don\'t over-correct.' },
    { title: 'Using pivot = nums[0]', detail: 'Works for {0,1,2} arrays but breaks if the pivot value is at an extreme. Prefer a median-of-three pick when generalizing.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/' },
    { level: 'Medium', title: 'Partition Array into Three Parts Around Pivot', url: 'https://leetcode.com/problems/partition-array-according-to-given-pivot/' },
    { level: 'Hard', title: 'Wiggle Sort II', url: 'https://leetcode.com/problems/wiggle-sort-ii/' },
    { level: 'Medium', title: 'Move Zeroes (variant)', url: 'https://leetcode.com/problems/move-zeroes/' },
    { level: 'Hard', title: 'Kth Largest Element in an Array (3-way QuickSelect)', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  ],

  quickRevision: [
    'lo=0, mid=0, hi=N−1.',
    'nums[mid] < pivot → swap(lo,mid), lo++, mid++.',
    'nums[mid] == pivot → mid++.',
    'nums[mid] > pivot → swap(mid,hi), hi-- (no mid++).',
    'Loop while mid ≤ hi. O(N) time, O(1) space.',
  ],
};

// ============================================================
// MULTI-POINTER — 3Sum, array=[-1,0,1,2,-1,-4] → sorted [-4,-1,-1,0,1,2]
// ============================================================
export const multiPointer = {
  id: 'multi-pointer',
  patternId: 'two-pointers',
  title: 'Multi-Pointer',
  subtitle: '3Sum · 4Sum · k-Sum',
  type: 'multi-pointer',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Fix k−2 anchor pointers, then run opposite-ends on the remaining suffix.',
    why: 'Reduces a k-sum problem to O(N^{k−1}) by using opposite-ends as the innermost engine — the same trick recursively.',
    when: 'k-tuples summing to a target with k ≥ 3.',
    properties: [
      'Requires sorting (enables monotonicity AND dedup).',
      'Exactly k−2 outer anchor loops + 1 inner opposite-ends loop.',
      'Dedup at EVERY level — anchor, inner-L, inner-R.',
      'O(N^{k−1}) time.',
    ],
  },

  patternRecognition: {
    clues: ['"Find triplets summing to 0"', '"Find k-tuples summing to target"', '"Return all unique triplets"', 'Sorted + pair-sum + one extra dimension'],
    inputs: ['Sortable integer array'],
    constraints: ['Output must have NO duplicates', 'N up to 3000 for 3Sum', 'k is small (≤ 4 typically)'],
  },

  steps: [
    {
      id: 0,
      title: 'Sorted + First Anchor',
      explanation: 'Sort input → [-4, -1, -1, 0, 1, 2]. Fix anchor i=0 (value -4). Inner pointers L=1, R=5.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 1, right: 5,
        sum: -5, target: 0,
        highlighted: { 0: 'pivot', 1: 'left', 5: 'right' },
        action: 'Sum = -4 + -1 + 2 = -3, need 0. Sum too small → L++',
      },
    },
    {
      id: 1,
      title: 'i=0, L moves',
      explanation: 'L moves to 2. Sum = -4 + -1 + 2 = -3. Still too small → L++.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 2, right: 5,
        sum: -3, target: 0,
        highlighted: { 0: 'pivot', 2: 'left', 5: 'right' },
        action: 'Sum = -3 < 0 → L++',
      },
    },
    {
      id: 2,
      title: 'i=0, L exhausts',
      explanation: 'L keeps moving (0, 1, 2 values) until L >= R. No triplet found with i=0. Move to i=1.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 4, right: 5,
        sum: -1, target: 0,
        highlighted: { 0: 'pivot', 4: 'left', 5: 'right' },
        action: 'No match — advance anchor to i=1',
      },
    },
    {
      id: 3,
      title: 'i=1, new anchor',
      explanation: 'i=1 (value -1). L=2, R=5. Sum = -1 + -1 + 2 = 0. Match found!',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 2, right: 5,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'match', 5: 'match' },
        action: '🎯 Found [-1, -1, 2]',
      },
    },
    {
      id: 4,
      title: 'Dedup + move',
      explanation: 'Skip duplicate L (index 2 is -1) and R (index 5 is 2). Then L=3, R=4.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'discarded', 3: 'left', 4: 'right', 5: 'discarded' },
        action: 'Recorded. Continue scanning.',
      },
    },
    {
      id: 5,
      title: 'i=1, another match',
      explanation: 'Sum = -1 + 0 + 1 = 0. Match! Record [-1, 0, 1]. Dedup and advance L,R.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'discarded', 3: 'match', 4: 'match', 5: 'discarded' },
        action: '🎯 Found [-1, 0, 1]',
      },
    },
    {
      id: 6,
      title: 'Skip duplicate anchor',
      explanation: 'Next i=2 has value -1 == i=1 → skip. Advance to i=3 (value 0).',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 3, left: 4, right: 5,
        sum: 3, target: 0,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'pivot', 4: 'left', 5: 'right' },
        action: 'Duplicate anchor skipped. Sum = 0+1+2 = 3 > 0 → R--',
      },
    },
    {
      id: 7,
      title: 'Exhausted',
      explanation: 'i=3 with L=4, R=5 gives sum 3, too big. L==R after R--, exit. All triplets found: [-1,-1,2] and [-1,0,1].',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 4, left: 5, right: 5,
        sum: 3, target: 0,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'discarded', 4: 'discarded', 5: 'discarded' },
        action: 'Result: [-1,-1,2], [-1,0,1]', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class ThreeSum {
    public List<List<Integer>> threeSum(int[] nums) {
        Arrays.sort(nums);
        List<List<Integer>> result = new ArrayList<>();

        for (int i = 0; i < nums.length - 2; i++) {
            // Skip duplicate anchors
            if (i > 0 && nums[i] == nums[i - 1]) continue;

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    // Skip duplicate L values
                    while (left < right && nums[left] == nums[left + 1]) left++;
                    // Skip duplicate R values
                    while (left < right && nums[right] == nums[right - 1]) right--;
                    left++;
                    right--;
                } else if (sum < 0) {
                    left++;
                } else {
                    right--;
                }
            }
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'Arrays.sort(nums);', note: 'Mandatory — enables both monotonicity and duplicate-skipping.' },
    { line: 'if (i > 0 && nums[i] == nums[i - 1]) continue;', note: 'Dedup anchor — never re-solve the same anchor value.' },
    { line: 'int left = i + 1, right = nums.length - 1;', note: 'Inner suffix is [i+1, N−1].' },
    { line: 'while (left < right)', note: 'Standard opposite-ends loop.' },
    { line: 'if (sum == 0) → record', note: 'Triplet captured.' },
    { line: 'while (...) left++; while (...) right--;', note: 'Dedup both inner pointers after recording.' },
    { line: 'left++; right--;', note: 'Move BOTH after a match (one-pair-per-tap).' },
  ],

  complexity: {
    time: 'O(N²)',
    space: 'O(1)',
    aux: 'O(1) — excluding the output list',
    explanation: 'Sort is O(N log N). Outer loop runs N times; each inner opposite-ends pass is O(N). Total O(N²).',
  },

  bruteForce: {
    time: 'O(N³)',
    space: 'O(1)',
    note: 'Three nested loops. Correct but 27 billion ops for N=3000.',
  },

  commonMistakes: [
    { title: 'Forgetting to sort', detail: 'Without sorting, both monotonicity and dedup break silently.' },
    { title: 'Missing ANY of the 3 dedup skips', detail: 'Anchor dedup, L dedup, R dedup — all three required. Missing one → duplicate triplets in output.' },
    { title: 'Moving only one pointer on a match', detail: 'After recording, move BOTH — otherwise you re-record the same triplet.' },
    { title: 'Comparing full integer overflow in 4Sum', detail: 'For 4Sum, use long for intermediate sums to avoid int overflow.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: '3Sum', url: 'https://leetcode.com/problems/3sum/' },
    { level: 'Medium', title: '3Sum Closest', url: 'https://leetcode.com/problems/3sum-closest/' },
    { level: 'Medium', title: '4Sum', url: 'https://leetcode.com/problems/4sum/' },
    { level: 'Medium', title: '3Sum Smaller', url: 'https://leetcode.com/problems/3sum-smaller/' },
    { level: 'Medium', title: 'Count Pairs with Sum < Target', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
  ],

  quickRevision: [
    'Sort. Outer loop i over anchors.',
    'Dedup anchor: skip nums[i] == nums[i-1].',
    'Inner opposite-ends L=i+1, R=N−1.',
    'On match: record, dedup L and R, advance both.',
    '3 dedup skips mandatory. O(N²) time.',
  ],
};

export const twoPointerSubPatterns = [oppositeEnds, sameDirection, dutchFlag, multiPointer];

export const twoPointerOverview = {
  id: 'two-pointers',
  title: 'Two Pointers',
  subtitle: 'Eliminate whole rows of the N² search space with one comparison',
  introduction:
    'Two pointers is not one algorithm — it is a family of strategies unified by one idea: two index references walk a monotone array, and each comparison eliminates an entire family of candidates. Master the four sub-patterns and every pair-sum, in-place, and partition problem collapses into the same skeleton.',
  coreConcept: {
    what: 'Two index references moving through a sequence with a monotone invariant.',
    why: 'An O(N²) pair search becomes O(N) — one comparison eliminates a whole row or column of the pair matrix.',
    when: 'Sorted input + pair question · in-place modification · three-way partition · k-sum.',
  },
  whenToUse: [
    'Input is sorted / monotonic and the question is about a pair relationship.',
    'You must modify the array in place with O(1) memory.',
    'You need to partition into 3 ordered groups.',
    'The problem asks for k-tuples summing to a target.',
  ],
  recognitionClues: [
    '"Two elements whose sum is ..."',
    '"Remove duplicates / zeros / target in place"',
    '"Sort an array of 0s, 1s, 2s"',
    '"Triplets / quadruplets summing to target"',
    '"Max area / water between two lines"',
    '"Palindrome / mirror equality"',
  ],
  importantProperties: [
    'Loop condition is usually strict (L < R).',
    'On non-match, exactly ONE pointer moves.',
    'Pointers never reverse direction.',
    'Every elimination is provably permanent — no backtracking.',
    'Extra state (e.g. leftMax / rightMax) can extend opposite-ends to relational invariants.',
  ],
  comparison: [
    { aspect: 'Opposite Ends', when: 'Sorted + pair-sum', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Same Direction', when: 'In-place compaction', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Dutch Flag', when: 'Three-way partition', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Multi-Pointer', when: 'k-sum (k ≥ 3)', time: 'O(N^{k−1})', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Infinite loop', detail: 'A branch without L++ or R-- hangs forever.' },
    { title: 'Missing sort', detail: 'Opposite-ends requires sorted input — silently wrong otherwise.' },
    { title: 'Missing dedup', detail: 'In 3Sum, all three dedup skips are required.' },
    { title: 'mid++ after swap(mid, hi)', detail: 'Dutch-flag classic bug — value from hi is unexplored.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/' },
    { level: 'Medium', title: 'Two Sum II', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
    { level: 'Medium', title: '3Sum', url: 'https://leetcode.com/problems/3sum/' },
    { level: 'Medium', title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/' },
    { level: 'Hard', title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/' },
  ],
};