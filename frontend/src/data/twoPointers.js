// ============================================================
// OPPOSITE ENDS — Two Sum II
// ============================================================
export const oppositeEnds = {
  id: 'opposite-ends',
  patternId: 'two-pointers',
  title: 'Opposite Ends',
  subtitle: 'Converging Pointers',
  type: 'opposite-ends',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Two pointers start at the extreme ends of a sorted array and walk toward each other.',
    why: 'Because the array is sorted, the Left pointer holds the smallest available number, and the Right pointer holds the largest. If the sum is too small, only the smallest number is holding us back. If the sum is too big, only the largest number is holding us back. This lets us eliminate one number per step.',
    when: 'Sorted input + a pair relationship (sum, difference, area, palindrome).',
    properties: [
      'Requires sorted or monotone-comparable input.',
      'Loop condition is strict L < R (never ≤).',
      'On non-match, exactly ONE pointer moves.',
      'Zero backtracking — every elimination is permanent.',
    ],
  },

  patternRecognition: {
    clues: [
      'The array is explicitly stated to be sorted.',
      '"Find a pair that sums to target."',
      'Finding a palindrome (checking characters from both ends).',
      'Maximizing area/water between two lines (Container With Most Water).'
    ],
    inputs: ['Sorted Array', 'String with symmetric structure'],
    constraints: ['Must use O(1) extra space', 'N is up to 10⁵ (rules out O(N²))'],
  },

  steps: [
    {
      id: 0,
      title: 'The Scale Analogy',
      explanation: 'Imagine a scale with weights. L points to the lightest weight (1), R points to the heaviest (15). Our target sum is 19. Currently, 1 + 15 = 16. The sum is too SMALL. Since L is already the lightest possible weight, the only way to increase the sum is to discard L and pick the next lightest weight.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 0, right: 5,
        sum: 16, target: 19, highlighted: { 0: 'left', 5: 'right' },
        comparison: '16 < 19', action: 'Move L to get a larger number.', found: false,
      },
    },
    {
      id: 1,
      title: 'Increase the Left',
      explanation: 'L moves to 3. New sum: 3 + 15 = 18. Still too small. Since 3 is the smallest number remaining, it cannot possibly pair with 15 to reach 19. We abandon 3 and move L again.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 1, right: 5,
        sum: 18, target: 19,
        highlighted: { 0: 'discarded', 1: 'left', 5: 'right' },
        comparison: '18 < 19', action: 'Still too small. Move L again.', found: false,
      },
    },
    {
      id: 2,
      title: 'Overshot the Target',
      explanation: 'L moves to 5. New sum: 5 + 15 = 20. Now the sum is TOO BIG. This time, R is the problem. 15 is too heavy. We must discard 15 and move R inward.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 2, right: 5,
        sum: 20, target: 19,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'left', 5: 'right' },
        comparison: '20 > 19', action: 'Sum too large. Move R to get a smaller number.', found: false,
      },
    },
    {
      id: 3,
      title: 'Decrease the Right',
      explanation: 'R moves to 11. New sum: 5 + 11 = 16. Too small again. Move L.',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 2, right: 4,
        sum: 16, target: 19,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'left', 4: 'right', 5: 'discarded' },
        comparison: '16 < 19', action: 'Sum too small. Move L.', found: false,
      },
    },
    {
      id: 4,
      title: 'Perfect Balance',
      explanation: 'L moves to 8. New sum: 8 + 11 = 19. We found the exact pair! We return the indices (3 and 4).',
      state: {
        array: [1, 3, 5, 8, 11, 15], left: 3, right: 4,
        sum: 19, target: 19,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'match', 4: 'match', 5: 'discarded' },
        comparison: '19 == 19', action: 'Found the exact pair!', found: true,
      },
    },
  ],

  javaCode: `import java.util.Arrays;

public class TwoSumII {
    public int[] twoSum(int[] numbers, int target) {
        int left = 0;
        int right = numbers.length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];

            if (sum == target) {
                return new int[]{left + 1, right + 1}; // 1-indexed
            } else if (sum < target) {
                left++;   // Too small, discard the smallest number
            } else {
                right--;  // Too large, discard the largest number
            }
        }
        return new int[]{-1, -1};
    }
}`,

  javaExplanation: [
    { line: 'int left = 0; int right = numbers.length - 1;', note: 'Point to the smallest and largest elements.' },
    { line: 'while (left < right)', note: 'Strict <. We never compare an element with itself.' },
    { line: 'if (sum == target)', note: 'Match! Convert to 1-based index as required by the problem.' },
    { line: 'else if (sum < target) left++;', note: 'Sum is too small, so the smallest number is useless. Discard it.' },
    { line: 'else right--;', note: 'Sum is too large, so the largest number is useless. Discard it.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'The distance between left and right shrinks by 1 every iteration, meaning we do at most N iterations. We only use two integer variables.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Check every possible pair (i, j). This fails when N = 100,000.',
  },

  commonMistakes: [
    { title: 'Using while (left <= right)', detail: 'If left == right, you are comparing an element with itself, which violates the pair rule. Always use strict <.' },
    { title: 'Moving both pointers at once', detail: 'Only move the pointer that is responsible for the sum being wrong. Move left if too small, move right if too big.' },
    { title: 'Forgetting to sort', detail: 'If the input is not sorted, this logic is completely invalid. You must either sort it first (O(N log N)) or use a Hash Map.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/' },
    { level: 'Easy', title: 'Squares of a Sorted Array', url: 'https://leetcode.com/problems/squares-of-a-sorted-array/' },
    { level: 'Medium', title: 'Two Sum II - Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
    { level: 'Medium', title: 'Container With Most Water', url: 'https://leetcode.com/problems/container-with-most-water/' },
    { level: 'Hard', title: 'Trapping Rain Water', url: 'https://leetcode.com/problems/trapping-rain-water/' },
  ],

  quickRevision: [
    'Requires sorted input.',
    'L = 0, R = N−1.',
    'Sum < target → L++ (discard smallest)',
    'Sum > target → R-- (discard largest)',
    'Sum == target → Return.',
  ],
};

// ============================================================
// SAME DIRECTION — Remove Duplicates
// ============================================================
export const sameDirection = {
  id: 'same-direction',
  patternId: 'two-pointers',
  title: 'Same Direction',
  subtitle: 'Fast & Slow · In-Place Modification',
  type: 'same-direction',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Both pointers start at the beginning. Fast scans the array, Slow writes valid elements.',
    why: 'This is like packing a suitcase. Fast takes items out of the closet and shows them to you. Slow marks the exact spot in the suitcase where the next approved item goes. It allows you to compress the array in O(1) space without creating a new one.',
    when: 'In-place filtering, removing duplicates, moving zeros, or deleting specific values.',
    properties: [
      'slow ≤ fast at all times.',
      'The prefix [0 ... slow-1] is always the valid, compacted result.',
      'Writing at slow never overwrites unread data.',
    ],
  },

  patternRecognition: {
    clues: [
      'The words "in-place" or "O(1) extra memory".',
      '"Remove duplicates" or "Move Zeroes".',
      'Return the new length of the array.',
    ],
    inputs: ['Sorted or unsorted array'],
    constraints: ['Cannot allocate a new array', 'Must preserve the relative order of elements'],
  },

  steps: [
    {
      id: 0,
      title: 'The Two Roles',
      explanation: 'We want to remove duplicates. Fast is the "Read Head" scanning every element. Slow is the "Write Head" pointing to where the next unique number should go. Initially, index 0 is always unique.',
      state: {
        array: [1, 1, 2, 2, 3, 4], slow: 0, fast: 1,
        highlighted: { 0: 'window', 1: 'fast' },
        action: 'Compare nums[fast] with nums[slow].',
      },
    },
    {
      id: 1,
      title: 'Duplicate Detected',
      explanation: 'nums[1] is 1, and our last unique number (slow) is also 1. It is a duplicate. We don\'t write it. We just tell Fast to keep looking and move to the next element.',
      state: {
        array: [1, 1, 2, 2, 3, 4], slow: 0, fast: 2,
        highlighted: { 0: 'window', 1: 'discarded', 2: 'fast' },
        action: 'Skip the duplicate. Fast moves forward.',
      },
    },
    {
      id: 2,
      title: 'New Unique Found',
      explanation: 'nums[2] is 2, which is different from our last unique number (1). We advance Slow to the next write slot (index 1) and copy the 2 there.',
      state: {
        array: [1, 2, 2, 2, 3, 4], slow: 1, fast: 2,
        highlighted: { 0: 'window', 1: 'window', 2: 'fast' },
        action: 'Advance Slow, copy nums[fast] to nums[slow].',
      },
    },
    {
      id: 3,
      title: 'Duplicate Detected',
      explanation: 'nums[3] is 2, matching our last written unique number (2). Skip it. Fast moves to index 4.',
      state: {
        array: [1, 2, 2, 2, 3, 4], slow: 1, fast: 4,
        highlighted: { 0: 'window', 1: 'window', 2: 'discarded', 3: 'discarded', 4: 'fast' },
        action: 'Skip. Fast moves forward.',
      },
    },
    {
      id: 4,
      title: 'New Unique Found',
      explanation: 'nums[4] is 3. It is unique. Advance Slow to index 2 and copy the 3 there.',
      state: {
        array: [1, 2, 3, 2, 3, 4], slow: 2, fast: 4,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'discarded', 4: 'fast', 5: 'fast' },
        action: 'Advance Slow, write 3.',
      },
    },
    {
      id: 5,
      title: 'New Unique Found',
      explanation: 'nums[5] is 4. It is unique. Advance Slow to index 3 and copy the 4.',
      state: {
        array: [1, 2, 3, 4, 3, 4], slow: 3, fast: 5,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'discarded', 5: 'fast' },
        action: 'Advance Slow, write 4.',
      },
    },
    {
      id: 6,
      title: 'Suitcase Packed',
      explanation: 'Fast has checked every element. Slow is at index 3. The unique elements are packed into the first 4 slots (0 through 3). We return the length, which is slow + 1 = 4.',
      state: {
        array: [1, 2, 3, 4, 3, 4], slow: 3, fast: 5,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'discarded', 5: 'discarded' },
        action: 'Return slow + 1 = 4', found: true,
      },
    },
  ],

  javaCode: `public class RemoveDuplicates {
    public int removeDuplicates(int[] nums) {
        if (nums.length == 0) return 0;

        int slow = 0;
        for (int fast = 1; fast < nums.length; fast++) {
            if (nums[fast] != nums[slow]) {
                slow++;
                nums[slow] = nums[fast];
            }
        }
        return slow + 1;
    }
}`,

  javaExplanation: [
    { line: 'int slow = 0;', note: 'The write head. Points to the last unique element written.' },
    { line: 'for (int fast = 1; fast < nums.length; fast++)', note: 'The read head. Scans every element.' },
    { line: 'if (nums[fast] != nums[slow])', note: 'If the scanned element is different from our last written element, it is unique.' },
    { line: 'nums[slow] = nums[fast];', note: 'Write the new unique element into the next available slot.' },
    { line: 'return slow + 1;', note: 'slow is a 0-based index. The total length is index + 1.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Fast visits every element exactly once. Memory usage is constant because we modify the array in-place.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Finding a duplicate and then shifting all subsequent elements left by 1. Extremely slow for large arrays.',
  },

  commonMistakes: [
    { title: 'Returning slow instead of slow + 1', detail: 'slow is a 0-based index. The total count of unique elements is slow + 1.' },
    { title: 'Starting fast at 0', detail: 'If you start fast at 0, nums[fast] == nums[slow] on the first iteration. Start fast at 1.' },
    { title: 'Using fast++ inside the if block', detail: 'The for-loop handles fast++. You only increment slow when you find a unique element.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Remove Duplicates from Sorted Array', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/' },
    { level: 'Easy', title: 'Remove Element', url: 'https://leetcode.com/problems/remove-element/' },
    { level: 'Easy', title: 'Move Zeroes', url: 'https://leetcode.com/problems/move-zeroes/' },
    { level: 'Medium', title: 'Remove Duplicates from Sorted Array II', url: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/' },
  ],

  quickRevision: [
    'slow = 0 (write), fast = 1 (read).',
    'If unique, slow++; nums[slow] = nums[fast].',
    'Return slow + 1.',
    'O(N) time, O(1) space.',
  ],
};

// ============================================================
// DUTCH NATIONAL FLAG — Sort Colors
// ============================================================
export const dutchFlag = {
  id: 'dutch-flag',
  patternId: 'two-pointers',
  title: 'Dutch National Flag',
  subtitle: 'Three-Way Partition',
  type: 'dutch-flag',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Three pointers (lo, mid, hi) partition the array into three distinct regions in a single pass.',
    why: 'Sorts arrays with exactly three possible values (like 0, 1, 2) in O(N) time without using a sorting algorithm. It acts like a funnel, pushing small items left, large items right, and leaving medium items in the middle.',
    when: 'When you need to partition an array into three ordered groups (e.g., < pivot, == pivot, > pivot).',
    properties: [
      'Regions: [0..lo-1] are small, [lo..mid-1] are equal, [mid..hi] are unknown, [hi+1..end] are large.',
      'lo and hi mark the boundaries. mid is the explorer.',
      'Do NOT advance mid when swapping with hi.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Sort an array of 0s, 1s, and 2s".',
      '"Partition around a pivot".',
      'Categorizing elements into exactly three distinct groups.',
    ],
    inputs: ['Array with a very small set of unique values'],
    constraints: ['Must be done in a single pass', 'O(1) extra space'],
  },

  steps: [
    {
      id: 0,
      title: 'Three Buckets',
      explanation: 'We have three regions: Left (for 0s), Middle (for 1s), Right (for 2s). mid checks the current element (2). Since 2 belongs on the Right, we swap it with the far Right element (hi) and shrink the Right boundary.',
      state: {
        array: [2, 0, 1, 2, 0, 1], lo: 0, mid: 0, hi: 5, pivot: 1,
        highlighted: { 0: 'mid', 5: 'hi' },
        action: 'Found a 2. Swap it to the far right.',
      },
    },
    {
      id: 1,
      title: 'New Element arrived',
      explanation: 'The 2 is now at the end. hi moved left. A new number (1) arrived at mid. Since it is a 1, it belongs in the Middle. We just advance mid.',
      state: {
        array: [1, 0, 1, 2, 0, 2], lo: 0, mid: 0, hi: 4, pivot: 1,
        highlighted: { 0: 'mid', 5: 'discarded' },
        action: 'Found a 1. It belongs in the middle. mid++.',
      },
    },
    {
      id: 2,
      title: 'Found a 0',
      explanation: 'mid is now 0. 0 belongs on the Left. We swap it with the Left boundary (lo) and advance both lo and mid.',
      state: {
        array: [0, 1, 1, 2, 0, 2], lo: 1, mid: 2, hi: 4, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'mid' },
        action: 'Found a 0. Swap to the far left. lo++, mid++.',
      },
    },
    {
      id: 3,
      title: 'Found a 1',
      explanation: 'mid is now 1. It belongs in the Middle. Just advance mid.',
      state: {
        array: [0, 1, 1, 2, 0, 2], lo: 1, mid: 3, hi: 4, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'mid' },
        action: 'Found a 1. mid++.',
      },
    },
    {
      id: 4,
      title: 'Found a 2 (The Trap!)',
      explanation: 'mid is now 2. It belongs on the Right. Swap with hi. **Crucial:** Do NOT advance mid here. The element that just arrived from the right is unexplored!',
      state: {
        array: [0, 1, 1, 0, 2, 2], lo: 1, mid: 3, hi: 3, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'mid' },
        action: 'Found a 2. Swap with hi. DO NOT mid++.',
      },
    },
    {
      id: 5, title: 'Found a 0',
      explanation: 'The unexplored element is a 0. Swap it to the Left boundary.',
      state: {
        array: [0, 0, 1, 1, 2, 2], lo: 2, mid: 4, hi: 3, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'mid' },
        action: 'Found a 0. Swap with lo. lo++, mid++.',
      },
    },
    {
      id: 6,
      title: 'Sorted!',
      explanation: 'mid has crossed hi. This means there are no unknown elements left. The array is perfectly sorted into 0s, 1s, and 2s.',
      state: {
        array: [0, 0, 1, 1, 2, 2], lo: 2, mid: 4, hi: 3, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'window', 5: 'window' },
        action: 'Sorted!', found: true,
      },
    },
  ],

  javaCode: `public class SortColors {
    public void sortColors(int[] nums) {
        int lo = 0;
        int mid = 0;
        int hi = nums.length - 1;
        int pivot = 1;

        while (mid <= hi) {
            if (nums[mid] < pivot) {
                swap(nums, lo, mid);
                lo++;
                mid++;
            } else if (nums[mid] == pivot) {
                mid++;
            } else {
                swap(nums, mid, hi);
                hi--;
                // Do NOT mid++ here!
            }
        }
    }
    private void swap(int[] a, int i, int j) {
        int tmp = a[i]; a[i] = a[j]; a[j] = tmp;
    }
}`,

  javaExplanation: [
    { line: 'int lo = 0, mid = 0, hi = nums.length - 1;', note: 'Setup the three pointer boundaries.' },
    { line: 'while (mid <= hi)', note: '<= is required because we must inspect the very last element.' },
    { line: 'if (nums[mid] < pivot)', note: 'The element belongs on the left. Swap with lo, advance both.' },
    { line: 'else if (nums[mid] == pivot)', note: 'The element is in the correct middle region. Just skip it.' },
    { line: 'else { swap(nums, mid, hi); hi--; }', note: 'Belongs on the right. Swap with hi. Crucially, mid stays put because the new element from hi is unexplored.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Each element is inspected by mid exactly once. hi and mid move towards each other, guaranteeing a single pass.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(1)',
    note: 'Using a standard sorting algorithm like QuickSort or MergeSort. It works, but ignores the 3-value structure.',
  },

  commonMistakes: [
    { title: 'mid++ after swap(mid, hi)', detail: 'When you swap with hi, the new element at mid came from the end of the array. It hasn\'t been checked yet. If you increment mid, you skip it.' },
    { title: 'while (mid < hi)', detail: 'Must use <= because when mid == hi, there is one element left to inspect.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Sort Colors', url: 'https://leetcode.com/problems/sort-colors/' },
    { level: 'Medium', title: 'Partition Array According to Given Pivot', url: 'https://leetcode.com/problems/partition-array-according-to-given-pivot/' },
    { level: 'Hard', title: 'Wiggle Sort II', url: 'https://leetcode.com/problems/wiggle-sort-ii/' },
    { level: 'Hard', title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  ],

  quickRevision: [
    'Three pointers: lo, mid, hi.',
    '< pivot: swap(lo, mid), lo++, mid++.',
    '== pivot: mid++.',
    '> pivot: swap(mid, hi), hi-- (NO mid++).',
    'Loop while mid <= hi.',
  ],
};

// ============================================================
// MULTI-POINTER — 3Sum
// ============================================================
export const multiPointer = {
  id: 'multi-pointer',
  patternId: 'two-pointers',
  title: 'Multi-Pointer',
  subtitle: '3Sum · 4Sum · k-Sum',
  type: 'multi-pointer',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Fix k−2 anchors, then run an Opposite Ends search on the remaining elements.',
    why: 'Reduces a complex k-sum problem from O(N^k) to O(N^{k−1}) by leveraging the 2Sum logic recursively. It is like saying "If I lock this one number in place, can I find two more that complete the target?"',
    when: 'When you need to find k numbers that sum to a target (e.g., 3 numbers summing to 0).',
    properties: [
      'Requires sorting for both logic and deduplication.',
      'Must handle duplicate values aggressively at every level.',
      'The inner loop is always standard Opposite Ends.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Find all unique triplets that sum to zero."',
      '"Find k numbers that sum to target."',
      'The array size is small enough (N ≤ 3000) to allow O(N²).',
    ],
    inputs: ['Array of integers (can contain duplicates)'],
    constraints: ['Output must not contain duplicate triplets', 'Must use O(1) auxiliary space (excluding output)'],
  },

  steps: [
    {
      id: 0,
      title: 'Anchor the First Number',
      explanation: 'First, sort the array. We fix i=0 (value -4). The goal for the inner loop is to find two numbers that sum to +4 to cancel out the -4. L starts at 1, R at 5.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 1, right: 5,
        sum: -3, target: 0,
        highlighted: { 0: 'pivot', 1: 'left', 5: 'right' },
        action: 'Fix -4. Sum = -4 + -1 + 2 = -3. L++',
      },
    },
    {
      id: 1,
      title: 'No Match for -4',
      explanation: 'L moves to 2. Sum = -4 + -1 + 2 = -3. Still too small. L++. There are no two numbers that can pair with -4 to reach 0.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 2, right: 5,
        sum: -3, target: 0,
        highlighted: { 0: 'pivot', 2: 'left', 5: 'right' },
        action: 'Sum < 0. L++',
      },
    },
    {
      id: 2,
      title: 'New Anchor: -1',
      explanation: 'i advances to index 1 (value -1). Inner L=2, R=5. Sum = -1 + -1 + 2 = 0. We found a match! [-1, -1, 2].',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 2, right: 5,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'match', 5: 'match' },
        action: '🎯 Found [-1, -1, 2]',
      },
    },
    {
      id: 3,
      title: 'Skip Duplicates',
      explanation: 'We must skip duplicates to avoid duplicate triplets. L skips the duplicate -1, and R moves inward. L=3, R=4.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'discarded', 3: 'left', 4: 'right', 5: 'discarded' },
        action: 'Skip duplicates, then move pointers.',
      },
    },
    {
      id: 4,
      title: 'Second Match for -1',
      explanation: 'Sum = -1 + 0 + 1 = 0. Another match! [-1, 0, 1].',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'discarded', 3: 'match', 4: 'match', 5: 'discarded' },
        action: '🎯 Found [-1, 0, 1]',
      },
    },
    {
      id: 5,
      title: 'Skip Duplicate Anchor',
      explanation: 'The next i (index 2) has value -1. It is identical to our previous anchor. We skip it entirely to prevent duplicate triplets.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 3, left: 4, right: 5,
        sum: 3, target: 0,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'pivot', 4: 'left', 5: 'right' },
        action: 'Skip duplicate anchor -1. Sum = 0+1+2 = 3 > 0.',
      },
    },
    {
      id: 6,
      title: 'Exhausted',
      explanation: 'No more valid triplets can be formed. We have found all unique answers.',
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
            if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip dup anchor

            int left = i + 1;
            int right = nums.length - 1;

            while (left < right) {
                int sum = nums[i] + nums[left] + nums[right];

                if (sum == 0) {
                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                    while (left < right && nums[left] == nums[left + 1]) left++; // Skip dup L
                    while (left < right && nums[right] == nums[right - 1]) right--; // Skip dup R
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
    { line: 'Arrays.sort(nums);', note: 'Mandatory. Enables Opposite Ends and makes duplicate skipping easy.' },
    { line: 'if (i > 0 && nums[i] == nums[i - 1]) continue;', note: 'Skip duplicate anchors to avoid re-solving the same subproblem.' },
    { line: 'while (left < right)', note: 'Standard Opposite Ends loop.' },
    { line: 'if (sum == 0)', note: 'Found a valid triplet.' },
    { line: 'while (left < right && nums[left] == nums[left + 1]) left++;', note: 'Skip duplicate L values after recording.' },
    { line: 'while (left < right && nums[right] == nums[right - 1]) right--;', note: 'Skip duplicate R values after recording.' },
  ],

  complexity: {
    time: 'O(N²)',
    space: 'O(1)',
    aux: 'O(1) (excluding the output list)',
    explanation: 'Sorting takes O(N log N). The outer loop runs N times, and the inner Two-Pointer loop runs in O(N). Total is O(N²).',
  },

  bruteForce: {
    time: 'O(N³)',
    space: 'O(1)',
    note: 'Three nested loops. Will time out on LeetCode for N = 3000.',
  },

  commonMistakes: [
    { title: 'Missing any of the 3 dedup checks', detail: 'You must dedup the anchor (i), the left pointer, and the right pointer. If you miss one, you will output duplicate triplets.' },
    { title: 'Forgetting to sort', detail: 'Without sorting, Opposite Ends will not work, and you cannot skip duplicates.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: '3Sum', url: 'https://leetcode.com/problems/3sum/' },
    { level: 'Medium', title: '3Sum Closest', url: 'https://leetcode.com/problems/3sum-closest/' },
    { level: 'Medium', title: '4Sum', url: 'https://leetcode.com/problems/4sum/' },
    { level: 'Medium', title: '3Sum Smaller', url: 'https://leetcode.com/problems/3sum-smaller/' },
  ],

  quickRevision: [
    'Sort the array.',
    'Fix anchor i.',
    'Run Opposite Ends on the rest.',
    'On match: skip duplicates for L and R.',
    'Skip duplicate anchors.',
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