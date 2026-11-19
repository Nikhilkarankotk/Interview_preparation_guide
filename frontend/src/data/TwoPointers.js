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
      title: 'Setup: The Two Anchors',
      explanation: 'Scenario: A payments team has a sorted ledger of invoice amounts [2, 6, 11, 15, 19, 24, 31, 38] and needs to find two invoices that net to exactly $39. L points to the smallest (2), R to the largest (38). First comparison: 2 + 38 = 40 — one dollar over target. Because 38 is the LARGEST remaining value and even paired with the smallest (2) we overshoot, 38 can never be part of any valid pair. Eliminate it permanently: R--.',
      state: {
        array: [2, 6, 11, 15, 19, 24, 31, 38], left: 0, right: 7,
        sum: 40, target: 39,
        highlighted: { 0: 'left', 7: 'right' },
        comparison: '40 > 39', action: 'Sum too large — drop 38. R--.',
        found: false,
      },
    },
    {
      id: 1,
      title: 'Undershoot',
      explanation: 'Now 2 + 31 = 33 — six short. The smallest remaining value (2) is the bottleneck: even paired with the new largest (31) we undershoot. No future R can rescue 2. Discard it: L++.',
      state: {
        array: [2, 6, 11, 15, 19, 24, 31, 38], left: 0, right: 6,
        sum: 33, target: 39,
        highlighted: { 0: 'left', 6: 'right', 7: 'discarded' },
        comparison: '33 < 39', action: 'Sum too small — drop 2. L++.',
        found: false,
      },
    },
    {
      id: 2,
      title: 'Still Short',
      explanation: '6 + 31 = 37 — short by 2. The smallest available (6) cannot pair with anything to reach 39. Move L again. Each L increment is a one-row elimination from the O(N²) pair matrix.',
      state: {
        array: [2, 6, 11, 15, 19, 24, 31, 38], left: 1, right: 6,
        sum: 37, target: 39,
        highlighted: { 0: 'discarded', 1: 'left', 6: 'right', 7: 'discarded' },
        comparison: '37 < 39', action: 'Sum too small — drop 6. L++.',
        found: false,
      },
    },
    {
      id: 3,
      title: 'Overshoot Again',
      explanation: '11 + 31 = 42 — now over. R (31) is the culprit: paired with the smallest available (11), we\'re too big. Discard 31: R--. Notice how the direction of the fix depends entirely on which side is "responsible" for the wrong sum.',
      state: {
        array: [2, 6, 11, 15, 19, 24, 31, 38], left: 2, right: 6,
        sum: 42, target: 39,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'left', 6: 'right', 7: 'discarded' },
        comparison: '42 > 39', action: 'Sum too large — drop 31. R--.',
        found: false,
      },
    },
    {
      id: 4,
      title: 'Undershoot Again',
      explanation: '11 + 24 = 35 — short. 11 is now the bottleneck against the new largest (24). Drop 11: L++. The candidate window has shrunk from 8 elements to just 3 — brute force would still be scanning all 28 pairs.',
      state: {
        array: [2, 6, 11, 15, 19, 24, 31, 38], left: 2, right: 5,
        sum: 35, target: 39,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'left', 5: 'right', 6: 'discarded', 7: 'discarded' },
        comparison: '35 < 39', action: 'Sum too small — drop 11. L++.',
        found: false,
      },
    },
    {
      id: 5,
      title: 'Perfect Match',
      explanation: '15 + 24 = 39 — exact. We found the pair (15, 24) in 5 comparisons. Brute force on 8 elements would have taken 28 comparisons. That is the O(N²) → O(N) collapse that makes two-pointer so powerful on sorted data. Return indices 3 and 5 (1-indexed: 4 and 6).',
      state: {
        array: [2, 6, 11, 15, 19, 24, 31, 38], left: 3, right: 5,
        sum: 39, target: 39,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'match', 5: 'match', 6: 'discarded', 7: 'discarded' },
        comparison: '39 == 39', action: 'Match! Return indices of (15, 24).',
        found: true,
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
      title: 'Two Roles, One Goal',
      explanation: 'Scenario: A streaming pipeline receives event logs sorted by user ID, but duplicates (from retries) slipped through: [1, 1, 2, 2, 2, 3, 4, 4]. We need to collapse to unique IDs in-place. Fast is the read head — it scans every cell. Slow is the write head — it marks the last confirmed unique value. Initially both face index 0; the first element (1) is always unique by definition.',
      state: {
        array: [1, 1, 2, 2, 2, 3, 4, 4], slow: 0, fast: 1,
        highlighted: { 0: 'window', 1: 'fast' },
        action: 'Compare nums[fast]=1 vs nums[slow]=1.',
      },
    },
    {
      id: 1,
      title: 'First Duplicate',
      explanation: 'nums[1]=1 equals nums[slow=0]=1 — a duplicate. Do NOTHING. Never write a duplicate to the array. Just advance Fast. This is the whole compression mechanism: we let the write head stay put while the read head skips past junk.',
      state: {
        array: [1, 1, 2, 2, 2, 3, 4, 4], slow: 0, fast: 2,
        highlighted: { 0: 'window', 1: 'discarded', 2: 'fast' },
        action: 'Duplicate — skip. F++.',
      },
    },
    {
      id: 2,
      title: 'First Unique — Write!',
      explanation: 'nums[2]=2 differs from nums[slow=0]=1 — a new unique value. Advance Slow to the next write slot (index 1) and copy 2 into it. The array mutates to [1, 2, 2, 2, 2, 3, 4, 4]. The confirmed unique prefix now spans indices 0–1.',
      state: {
        array: [1, 2, 2, 2, 2, 3, 4, 4], slow: 1, fast: 2,
        highlighted: { 0: 'window', 1: 'window', 2: 'fast' },
        action: 'Unique! S++, write nums[fast]→nums[slow].',
      },
    },
    {
      id: 3,
      title: 'Batch of Duplicates',
      explanation: 'Fast now sweeps indices 3 and 4, both holding 2 — duplicates of the last confirmed unique (2). Skip both. Fast lands on index 5 holding 3, which differs from nums[slow=1]=2. This is the moment to write again.',
      state: {
        array: [1, 2, 2, 2, 2, 3, 4, 4], slow: 1, fast: 5,
        highlighted: { 0: 'window', 1: 'window', 2: 'discarded', 3: 'discarded', 4: 'discarded', 5: 'fast' },
        action: 'Skipped both 2s. Now check 3.',
      },
    },
    {
      id: 4,
      title: 'Write 3',
      explanation: 'nums[5]=3 is unique. Advance Slow to 2 and copy 3 into nums[2]. The array becomes [1, 2, 3, 2, 2, 3, 4, 4]. The write is safe because index 2 was already confirmed as a stale duplicate — we\'re replacing our own garbage.',
      state: {
        array: [1, 2, 3, 2, 2, 3, 4, 4], slow: 2, fast: 5,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'discarded', 4: 'discarded', 5: 'fast', 6: 'fast' },
        action: 'Write 3 to index 2. S=2, F=5.',
      },
    },
    {
      id: 5,
      title: 'Write 4',
      explanation: 'nums[6]=4 differs from nums[slow=2]=3 — unique. Advance Slow to 3, write 4 at index 3. Array becomes [1, 2, 3, 4, 2, 3, 4, 4]. The compacted prefix now spans indices 0–3.',
      state: {
        array: [1, 2, 3, 4, 2, 3, 4, 4], slow: 3, fast: 6,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'discarded', 5: 'discarded', 6: 'fast', 7: 'fast' },
        action: 'Write 4 to index 3. S=3, F=6.',
      },
    },
    {
      id: 6,
      title: 'Pack Complete',
      explanation: 'nums[7]=4 equals the last write (4) — duplicate, skip. Fast reaches the end of the array. Slow is at index 3, so 4 unique values live in indices 0–3. Everything past index 3 is stale garbage. Return slow+1 = 4.',
      state: {
        array: [1, 2, 3, 4, 2, 3, 4, 4], slow: 3, fast: 7,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'discarded', 5: 'discarded', 6: 'discarded', 7: 'discarded' },
        action: 'Return slow+1 = 4.', found: true,
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
      title: 'Three Lanes, One Sweep',
      explanation: 'Scenario: An emergency dispatch system receives tickets tagged 0 (P0), 1 (P1), or 2 (P2). We must sort them in one pass: all P0s first, then P1s, then P2s. Array: [2, 1, 0, 2, 1, 1, 0, 1]. Three pointers: lo=left boundary, mid=explorer, hi=right boundary. mid inspects nums[mid]=2 — too large. Swap with the far right (hi) and shrink hi. Crucial: mid does NOT advance — the value arriving from hi hasn\'t been inspected yet.',
      state: {
        array: [2, 1, 0, 2, 1, 1, 0, 1], lo: 0, mid: 0, hi: 7, pivot: 1,
        highlighted: { 0: 'mid', 7: 'hi' },
        action: 'nums[0]=2 > pivot. Swap with hi=7.',
      },
    },
    {
      id: 1,
      title: 'New Arrival — Check It',
      explanation: 'After the swap, a 1 arrived at mid=0. The old 2 now lives at index 7, permanently in the sorted-right region. nums[0]=1 equals pivot — correct middle region. Advance mid. This is the payoff of not advancing mid after a hi-swap: we didn\'t skip the incoming value.',
      state: {
        array: [1, 1, 0, 2, 1, 1, 0, 2], lo: 0, mid: 0, hi: 6, pivot: 1,
        highlighted: { 0: 'mid', 7: 'discarded' },
        action: 'nums[0]=1 == pivot. mid++.',
      },
    },
    {
      id: 2,
      title: 'Sweep Through the Middle',
      explanation: 'nums[1]=1 again equals pivot — correct region. Advance mid. The middle band (indices lo..mid-1) grows: both index 0 and index 1 now hold confirmed 1s.',
      state: {
        array: [1, 1, 0, 2, 1, 1, 0, 2], lo: 0, mid: 1, hi: 6, pivot: 1,
        highlighted: { 0: 'window', 1: 'mid', 7: 'discarded' },
        action: 'nums[1]=1 == pivot. mid++.',
      },
    },
    {
      id: 3,
      title: 'Too Small — Push Left',
      explanation: 'nums[2]=0 is less than pivot. Swap with lo to push it into the leftmost region, then advance BOTH lo and mid (the element arrived at mid from lo is our own previously-validated 1, so it\'s safe to skip). Array becomes [0, 1, 1, 2, 1, 1, 0, 2].',
      state: {
        array: [1, 1, 0, 2, 1, 1, 0, 2], lo: 0, mid: 2, hi: 6, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'mid', 7: 'discarded' },
        action: 'nums[2]=0 < pivot. Swap with lo=0.',
      },
    },
    {
      id: 4,
      title: 'Too Large — Push Right (and PAUSE)',
      explanation: 'nums[3]=2 exceeds pivot. Swap with hi=6. hi shrinks to 5. mid STAYS at 3 because the value that just arrived from index 6 (which was 0) has not been inspected. This is the single most important rule of the Dutch Flag algorithm. Array: [0, 1, 1, 0, 1, 1, 2, 2].',
      state: {
        array: [0, 1, 1, 2, 1, 1, 0, 2], lo: 1, mid: 3, hi: 6, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'mid', 7: 'discarded' },
        action: 'nums[3]=2 > pivot. Swap with hi=6. DO NOT mid++.',
      },
    },
    {
      id: 5,
      title: 'The Arrival Was Small',
      explanation: 'The value now at nums[3] is 0 — less than pivot. Swap with lo=1 (which holds a validated 1). Array becomes [0, 0, 1, 1, 1, 1, 2, 2]. lo advances to 2, mid to 4. This is exactly why we paused mid earlier: had we advanced, this 0 would have been stranded in the wrong region.',
      state: {
        array: [0, 1, 1, 0, 1, 1, 2, 2], lo: 1, mid: 3, hi: 5, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'mid', 6: 'discarded', 7: 'discarded' },
        action: 'nums[3]=0 < pivot. Swap with lo=1.',
      },
    },
    {
      id: 6,
      title: 'Fast Finish',
      explanation: 'nums[4]=1 equals pivot — correct. Advance mid. The left region (0s) is now sealed: lo=2 means indices 0–1 are locked 0s. mid continues sweeping the middle.',
      state: {
        array: [0, 0, 1, 1, 1, 1, 2, 2], lo: 2, mid: 4, hi: 5, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'mid', 6: 'discarded', 7: 'discarded' },
        action: 'nums[4]=1 == pivot. mid++.',
      },
    },
    {
      id: 7,
      title: 'Cross the Boundary',
      explanation: 'nums[5]=1 equals pivot. Advance mid to 6. Now mid=6 > hi=5 — the unknown region is empty. Every cell has been classified exactly once. The array is sorted in a single O(N) pass with O(1) space.',
      state: {
        array: [0, 0, 1, 1, 1, 1, 2, 2], lo: 2, mid: 5, hi: 5, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'window', 5: 'mid', 6: 'window', 7: 'window' },
        action: 'nums[5]=1 == pivot. mid++.',
      },
    },
    {
      id: 8,
      title: 'Sorted — One Pass',
      explanation: 'Final: [0, 0, 1, 1, 1, 1, 2, 2]. Three clean bands. One hi-swap pause occurred (step 4 → 5) — this is the classic trap that trips up 80% of candidates. A standard sort would be O(N log N); this is O(N).',
      state: {
        array: [0, 0, 1, 1, 1, 1, 2, 2], lo: 2, mid: 6, hi: 5, pivot: 1,
        highlighted: { 0: 'window', 1: 'window', 2: 'window', 3: 'window', 4: 'window', 5: 'window', 6: 'window', 7: 'window' },
        action: 'mid > hi — done.', found: true,
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
      title: 'Anchor the First Value',
      explanation: 'Scenario: A financial auditor needs all triplets of signed transactions that net to zero. Sorted ledger: [-4, -1, -1, 0, 1, 2]. We lock i=0 (value -4) as the anchor. The inner pair must sum to +4 to cancel it. L=1, R=5. Sum = -4 + -1 + 2 = -3 — negative. Since sum < 0, the smallest element in the inner window (L) is the bottleneck. Advance L.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 1, right: 5,
        sum: -3, target: 0,
        highlighted: { 0: 'pivot', 1: 'left', 5: 'right' },
        action: 'Sum < 0 — L++.',
      },
    },
    {
      id: 1,
      title: 'Still Short',
      explanation: 'L=2, R=5: sum = -4 + -1 + 2 = -3. Still negative. L++ again. After L reaches 3 (value 0), the sum becomes -2 — still negative. L reaches 4 (value 1): sum = -4 + 1 + 2 = -1 — still negative. L reaches 5 = R, inner loop ends. No pair can rescue -4. Skip the anchor: i advances to 1.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 0, left: 2, right: 5,
        sum: -3, target: 0,
        highlighted: { 0: 'pivot', 2: 'left', 5: 'right' },
        action: 'Sum < 0 — L++.',
      },
    },
    {
      id: 2,
      title: 'New Anchor: -1',
      explanation: 'Anchor i=1 (value -1). Inner L=2 (-1), R=5 (2). Sum = -1 + -1 + 2 = 0. Match! Record triplet [-1, -1, 2]. Now the tricky part: skip duplicate L values AND duplicate R values so we don\'t re-emit the same triplet when we advance.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 2, right: 5,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'match', 5: 'match' },
        action: '🎯 Found [-1, -1, 2].',
      },
    },
    {
      id: 3,
      title: 'Dedup Advance',
      explanation: 'After recording, L skips the duplicate -1 at index 2 and lands at index 3 (value 0). R moves from 5 to 4 (value 1). We advance both pointers — L past its duplicate, R to a smaller value. New state: L=3, R=4. Sum = -1 + 0 + 1 = 0 again.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'discarded', 3: 'left', 4: 'right', 5: 'discarded' },
        action: 'Skip duplicates, advance both pointers.',
      },
    },
    {
      id: 4,
      title: 'Second Match for the Same Anchor',
      explanation: 'Sum = -1 + 0 + 1 = 0. Second triplet: [-1, 0, 1]. Record it. Skip duplicates: L moves to 4, R moves to 3 — L >= R, inner loop ends. Anchor i=1 is exhausted. i advances to 2, but nums[2] = -1 equals nums[1] — skip duplicate anchor. i jumps to 3.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 1, left: 3, right: 4,
        sum: 0, target: 0,
        highlighted: { 0: 'discarded', 1: 'pivot', 2: 'discarded', 3: 'match', 4: 'match', 5: 'discarded' },
        action: '🎯 Found [-1, 0, 1].',
      },
    },
    {
      id: 5,
      title: 'New Anchor: 0',
      explanation: 'Anchor i=3 (value 0). Inner L=4 (1), R=5 (2). Sum = 0 + 1 + 2 = 3 — positive. R--. R becomes 4 = L, inner loop ends. No triplet from anchor 0. i advances to 4. Check: i < nums.length - 2 = 4? No. Outer loop terminates.',
      state: {
        array: [-4, -1, -1, 0, 1, 2], i: 3, left: 4, right: 5,
        sum: 3, target: 0,
        highlighted: { 0: 'discarded', 1: 'discarded', 2: 'discarded', 3: 'pivot', 4: 'left', 5: 'right' },
        action: 'Sum > 0 — R--.',
      },
    },
    {
      id: 6,
      title: 'All Triplets Found',
      explanation: 'Result: [[-1, -1, 2], [-1, 0, 1]]. Two unique triplets. Complexity: O(N²) time (N outer × N inner), O(1) extra space (excluding output). Brute force would be O(N³) — the two-pointer inner loop turns each O(N²) anchor scan into O(N). For N=3000 that\'s ~9M operations vs 27B.',
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