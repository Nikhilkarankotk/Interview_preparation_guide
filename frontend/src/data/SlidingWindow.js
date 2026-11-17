// ============================================================
// FIXED SIZE — Maximum Sum Subarray of Size K
// ============================================================
export const fixedSize = {
  id: 'fixed-window',
  patternId: 'sliding-window',
  title: 'Fixed Size Window',
  subtitle: 'The Rolling Window',
  type: 'fixed-window',
  difficulty: 'Easy',

  coreConcept: {
    what: 'A window of a specific size K slides across the array from left to right.',
    why: 'If you recalculate the sum of K elements from scratch every time, you do O(N * K) work. By using a sliding window, you only add the new element entering the right side and subtract the old element leaving the left side. This reduces the time to O(N).',
    when: 'When the problem explicitly asks for a contiguous subarray of an exact size K (e.g., "Find the maximum average of 3 consecutive elements").',
    properties: [
      'The window size remains constant throughout the process.',
      'The Right pointer adds a new element; the Left pointer removes the oldest.',
      'The distance between Left and Right is always exactly K - 1.',
    ],
  },

  patternRecognition: {
    clues: [
      'The problem mentions a specific number K.',
      'The words "consecutive", "contiguous", or "subarray".',
      'Asking for max, min, or average of a sub-array of size K.',
    ],
    inputs: ['Array or String'],
    constraints: ['Must be O(N) time', 'K is smaller than the array length'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: Build the First Window',
      explanation: 'Scenario: A trading desk tracks daily revenue [2, 5, 1, 8, 3, 6, 4, 7] (in $K) and needs the best 3-day rolling window. The naive way recalculates every 3-day sum from scratch — 3 additions per window × 6 windows = 18 additions. Instead, we build the first window once: 2 + 5 + 1 = 8. This is our starting maxSum. Every later window only needs 2 operations.',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 0, right: 2, k: 3,
        windowSum: 8, maxSum: 8, windowContent: [2, 5, 1],
        action: 'Initial window sum is 8. Max is 8.',
      },
    },
    {
      id: 1,
      title: 'First Slide — New Maximum',
      explanation: 'Slide right by one: the 8 (index 3) enters, the 2 (index 0) leaves. Instead of recounting, reuse: 8 (old) + 8 (in) − 2 (out) = 14. That is 2 operations instead of 3. And 14 beats 8, so maxSum updates to 14. This is the core win: we never re-add the shared middle elements (5, 1).',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 1, right: 3, k: 3,
        windowSum: 14, maxSum: 14, windowContent: [5, 1, 8],
        action: 'Add 8, remove 2. Sum = 14. New Max!',
      },
    },
    {
      id: 2,
      title: 'Second Slide — Drop Below Max',
      explanation: '3 enters, 5 leaves: 14 + 3 − 5 = 12. Not a new max, so maxSum stays at 14. Notice how we still had to update windowSum (12) even though the max didn\'t change — the running sum must always reflect the current window.',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 2, right: 4, k: 3,
        windowSum: 12, maxSum: 14, windowContent: [1, 8, 3],
        action: 'Add 3, remove 5. Sum = 12.',
      },
    },
    {
      id: 3,
      title: 'Third Slide — New Maximum',
      explanation: '6 enters, 1 leaves: 12 + 6 − 1 = 17. New champion. maxSum jumps to 17. The 8 that dominated window 1 has now fully exited; the window is completely new — [8, 3, 6]. This is why we cannot cache more than the running sum; the window contents churn quickly.',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 3, right: 5, k: 3,
        windowSum: 17, maxSum: 17, windowContent: [8, 3, 6],
        action: 'Add 6, remove 1. Sum = 17. New Max!',
      },
    },
    {
      id: 4,
      title: 'Fourth Slide',
      explanation: '4 enters, 8 leaves: 17 + 4 − 8 = 13. The high-value 8 was doing heavy lifting; without it we drop 4 points. maxSum still 17. Notice that the moment the largest window contributor exits, the sum collapses — this is why the running sum must be recomputed from the previous sum, never from the "current max" window.',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 4, right: 6, k: 3,
        windowSum: 13, maxSum: 17, windowContent: [3, 6, 4],
        action: 'Add 4, remove 8. Sum = 13.',
      },
    },
    {
      id: 5,
      title: 'Fifth Slide — Tie',
      explanation: '7 enters, 3 leaves: 13 + 7 − 3 = 17. Ties the current max. We keep maxSum at 17 (Math.max returns the same value). The window is now [6, 4, 7] — the last one, since right has hit the array end.',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 5, right: 7, k: 3,
        windowSum: 17, maxSum: 17, windowContent: [6, 4, 7],
        action: 'Add 7, remove 3. Sum = 17. Tie.',
      },
    },
    {
      id: 6,
      title: 'Return Maximum',
      explanation: 'All 6 windows of size 3 have been checked. Total arithmetic: 3 additions (build) + 5 slides × 2 operations = 13 operations. Brute force would have done 6 × 3 = 18. For N=10⁶ and K=100, that is 100M vs 2M — the difference is runtime, not just elegance.',
      state: {
        array: [2, 5, 1, 8, 3, 6, 4, 7], left: 5, right: 7, k: 3,
        windowSum: 17, maxSum: 17, windowContent: [6, 4, 7],
        action: 'Return maxSum: 17', found: true,
      },
    },
  ],

  javaCode: `public class MaxSumSubarray {
    public int maxSum(int[] nums, int k) {
        int maxSum = 0;
        int currentSum = 0;

        // 1. Build the first window of size K
        for (int i = 0; i < k; i++) {
            currentSum += nums[i];
        }
        maxSum = currentSum;

        // 2. Slide the window to the end
        for (int right = k; right < nums.length; right++) {
            currentSum += nums[right];          // Add the new element entering
            currentSum -= nums[right - k];      // Remove the element leaving (exactly k steps back)
            maxSum = Math.max(maxSum, currentSum);
        }

        return maxSum;
    }
}`,

  javaExplanation: [
    { line: 'for (int i = 0; i < k; i++)', note: 'Manually build the sum of the first K elements.' },
    { line: 'for (int right = k; right < nums.length; right++)', note: 'Start right at K, because the first window is already built.' },
    { line: 'currentSum += nums[right];', note: 'The new element enters the window on the right.' },
    { line: 'currentSum -= nums[right - k];', note: 'The element exactly K steps behind leaves the window on the left.' },
    { line: 'maxSum = Math.max(maxSum, currentSum);', note: 'Update the record if the new window is better.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We iterate through the array exactly once. Calculating the sum takes O(1) per step because we reuse the previous sum.',
  },

  bruteForce: {
    time: 'O(N * K)',
    space: 'O(1)',
    note: 'Nested loops: for every starting point, loop K times to calculate the sum. This is too slow if K is large.',
  },

  commonMistakes: [
    { title: 'Forgetting the initial window', detail: 'You must calculate the sum of the first K elements before you start sliding.' },
    { title: 'Off-by-one in subtraction', detail: 'When the new element is at `right`, the element leaving is at `right - k`. Not `right - k + 1`.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Maximum Average Subarray I', url: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
    { level: 'Easy', title: 'Contains Duplicate II', url: 'https://leetcode.com/problems/contains-duplicate-ii/' },
    { level: 'Medium', title: 'Find All Anagrams in a String', url: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/' },
  ],

  quickRevision: [
    'Build sum of first K.',
    'Slide right pointer from K to N-1.',
    'Add nums[right], subtract nums[right-K].',
    'Track the max.',
  ],
};

// ============================================================
// VARIABLE LONGEST — Longest Substring Without Repeating Chars
// ============================================================
export const variableLongest = {
  id: 'variable-longest',
  patternId: 'sliding-window',
  title: 'Variable Window (Longest)',
  subtitle: 'The Expanding Window',
  type: 'variable-longest',
  difficulty: 'Medium',

  coreConcept: {
    what: 'The window expands to the right as long as the condition is valid. If the condition breaks, the left side shrinks just enough to become valid again.',
    why: 'To find the longest valid sequence, we want the window to grow as much as possible. We only shrink it when forced to by an invalid condition (like a duplicate).',
    when: 'When the problem asks for the "Longest" or "Maximum" contiguous subarray/substring that meets a condition.',
    properties: [
      'Right pointer constantly explores and expands.',
      'Left pointer only moves forward when the window becomes invalid.',
      'The maximum valid window size is recorded.',
    ],
  },

  patternRecognition: {
    clues: [
      'The word "Longest" or "Maximum".',
      '"Without repeating characters" or "at most K distinct".',
      'Finding a subarray that satisfies a constraint.',
    ],
    inputs: ['String or Array'],
    constraints: ['Must be O(N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: Expand Into a New Character',
      explanation: 'Scenario: A DNA sequencer is analyzing the string "abcabcbb" (a compressed genome fragment) and needs the longest run with no repeated nucleotides. Right eats "a". The window "a" is valid (no duplicates). maxLen = 1. A map records where each character was last seen: { a: 0 }.',
      state: {
        string: "abcabcbb", left: 0, right: 0,
        windowStr: "a", windowMap: {a: 1}, maxLen: 1,
        action: 'Expand right. Window is valid.',
      },
    },
    {
      id: 1,
      title: 'Grow — No Conflict',
      explanation: 'Right eats "b" (index 1). "b" is not in the map, so no duplicate. Window "ab" is valid. Length = 2. Map now { a:0, b:1 }. The left pointer stays at 0 because there is no reason to shrink.',
      state: {
        string: "abcabcbb", left: 0, right: 1,
        windowStr: "ab", windowMap: {a: 1, b: 1}, maxLen: 2,
        action: 'Expand right. Window is valid.',
      },
    },
    {
      id: 2,
      title: 'New Maximum',
      explanation: 'Right eats "c" (index 2). Still no duplicate. Window "abc" is valid. Length = 3 — new maxLen. Map { a:0, b:1, c:2 }. Every window of length 3 is currently valid, so we must keep expanding to beat it.',
      state: {
        string: "abcabcbb", left: 0, right: 2,
        windowStr: "abc", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Expand right. Window is valid.',
      },
    },
    {
      id: 3,
      title: 'The Jump — Skip Past Duplicate',
      explanation: 'Right eats "a" (index 3). Map says "a" was last seen at 0. Naive shrinking would drop b, then c, then a — 3 iterations. Instead we JUMP: left = max(left, map["a"] + 1) = max(0, 0+1) = 1. Window is now "bca" (valid, length 3). This is the O(1) per-step magic of the map.',
      state: {
        string: "abcabcbb", left: 1, right: 3,
        windowStr: "bca", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Duplicate "a" at 0. Jump left to 1.',
      },
    },
    {
      id: 4,
      title: 'Duplicate Again — B',
      explanation: 'Right eats "b" (index 4). Map says "b" last seen at 1. left = max(1, 1+1) = 2. Window "cab" (indices 2-4), length 3. Still tied with maxLen=3. Note: we did not reset the map — the old entries for "a" and "b" are replaced on the next visit.',
      state: {
        string: "abcabcbb", left: 2, right: 4,
        windowStr: "cab", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Duplicate "b" at 1. Jump left to 2.',
      },
    },
    {
      id: 5,
      title: 'Duplicate Again — C',
      explanation: 'Right eats "c" (index 5). "c" last seen at 2. left = max(2, 2+1) = 3. Window "abc" (indices 3-5), length 3. maxLen stays 3. The map is now overwriting entries: { a:3, b:4, c:5 } — the newest positions.',
      state: {
        string: "abcabcbb", left: 3, right: 5,
        windowStr: "abc", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Duplicate "c" at 2. Jump left to 3.',
      },
    },
    {
      id: 6,
      title: 'The Trap — Stale Map Entry',
      explanation: 'Right eats "b" (index 6). Map says "b" last seen at 4. left = max(3, 4+1) = 5. Window "cb" (indices 5-6), length 2. Why max()? Because if we used left = 5 + 1 directly, we might jump backward. Stale entries from before the current window must never move left backward.',
      state: {
        string: "abcabcbb", left: 5, right: 6,
        windowStr: "cb", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Duplicate "b" at 4. left = max(3, 5) = 5.',
      },
    },
    {
      id: 7,
      title: 'Final Duplicate',
      explanation: 'Right eats "b" (index 7). "b" last seen at 6. left = max(5, 6+1) = 7. Window "b" — just one character, length 1. Right reaches string end. maxLen stays 3 because no later window beat the "abc" from earlier.',
      state: {
        string: "abcabcbb", left: 7, right: 7,
        windowStr: "b", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Duplicate "b" at 6. left = max(5, 7) = 7.',
      },
    },
    {
      id: 8,
      title: 'Return Longest',
      explanation: 'Final answer: 3 (from "abc" at index range [0, 2] or [3, 5] or [4, 6]). Every character was visited exactly once by right, and left jumped forward at most N times across the whole run — total O(N) time. A brute-force substring-and-check solution would have been O(N³).',
      state: {
        string: "abcabcbb", left: 7, right: 7,
        windowStr: "b", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Return maxLen: 3', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class LongestSubstring {
    public int lengthOfLongestSubstring(String s) {
        Map<Character, Integer> map = new HashMap<>();
        int left = 0, maxLen = 0;

        for (int right = 0; right < s.length(); right++) {
            char c = s.charAt(right);
            
            // If we found a duplicate, move left pointer past the previous occurrence
            if (map.containsKey(c)) {
                left = Math.max(left, map.get(c) + 1);
            }
            
            map.put(c, right); // Update the character's latest index
            maxLen = Math.max(maxLen, right - left + 1);
        }
        return maxLen;
    }
}`,

  javaExplanation: [
    { line: 'for (int right = 0; right < s.length(); right++)', note: 'The right pointer constantly explores.' },
    { line: 'if (map.containsKey(c))', note: 'We found a duplicate character.' },
    { line: 'left = Math.max(left, map.get(c) + 1);', note: 'Jump the left pointer to just after the previous occurrence. Math.max prevents left from moving backward.' },
    { line: 'map.put(c, right);', note: 'Record the newest index of this character.' },
    { line: 'maxLen = Math.max(maxLen, right - left + 1);', note: 'The current window is valid. Update the record.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(min(N, M))',
    aux: 'O(M)',
    explanation: 'We visit each character at most twice (once with right, once with left). M is the size of the character set (e.g., 26 for lowercase letters).',
  },

  bruteForce: {
    time: 'O(N³)',
    space: 'O(N)',
    note: 'Check every possible substring, and then verify if it has duplicates. Highly inefficient.',
  },

  commonMistakes: [
    { title: 'Moving left backwards', detail: 'If you use `left = map.get(c) + 1`, `left` might move backward if the duplicate was outside the current window. Always use `Math.max(left, map.get(c) + 1)`.' },
    { title: 'Shrinking one by one', detail: 'You can jump the left pointer directly using the map instead of moving it one by one, making it much faster.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
    { level: 'Medium', title: 'Max Consecutive Ones III', url: 'https://leetcode.com/problems/max-consecutive-ones-iii/' },
    { level: 'Medium', title: 'Fruit Into Baskets', url: 'https://leetcode.com/problems/fruit-into-baskets/' },
  ],

  quickRevision: [
    'Expand right.',
    'If invalid (e.g., duplicate), shrink left.',
    'Update max length.',
    'Jump left pointer using Map.',
  ],
};

// ============================================================
// VARIABLE SHORTEST — Minimum Size Subarray Sum
// ============================================================
export const variableShortest = {
  id: 'variable-shortest',
  patternId: 'sliding-window',
  title: 'Variable Window (Shortest)',
  subtitle: 'The Shrinking Rope',
  type: 'variable-shortest',
  difficulty: 'Medium',

  coreConcept: {
    what: 'The window expands to the right until the condition is met. Once met, the left side shrinks as much as possible to find the smallest valid window.',
    why: 'To find the shortest sequence, we must find a valid window and then tighten the rope as much as possible before it breaks. Once it breaks, we expand again.',
    when: 'When the problem asks for the "Shortest" or "Minimum" contiguous subarray that meets a condition.',
    properties: [
      'Right pointer expands until valid.',
      'Left pointer shrinks to optimize while valid.',
      'The minimum valid window size is recorded.',
    ],
  },

  patternRecognition: {
    clues: [
      'The word "Shortest", "Minimum", or "Smallest".',
      '"Sum greater than or equal to target".',
      'Finding the smallest window that contains a specific set of elements.',
    ],
    inputs: ['Array of positive numbers'],
    constraints: ['Must be O(N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: Expand Until Valid',
      explanation: 'Scenario: A logistics team is packing shipments from a sorted buffer of daily weights [2, 3, 1, 2, 4, 3] and needs the smallest contiguous block summing to at least 7 (the truck capacity). We expand right, accumulating: 2 + 3 + 1 = 6. Not enough — the truck is still under-filled. We must expand.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 0, right: 2,
        sum: 6, target: 7, minLen: Infinity,
        action: 'Sum = 6. Need more. Expand right.',
      },
    },
    {
      id: 1,
      title: 'Target Reached — First Candidate',
      explanation: 'Right adds 2. Sum = 8 ≥ 7. First valid window found: [2,3,1,2] of length 4. minLen = 4. But before we celebrate — can we shrink and get shorter? That is the whole point of the "shortest" variant.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 0, right: 3,
        sum: 8, target: 7, minLen: 4,
        action: 'Sum = 8 ≥ 7. Valid! Update minLen = 4.',
      },
    },
    {
      id: 2,
      title: 'Shrink — Lose Validity',
      explanation: 'Drop the 2 on the left: sum = 8 − 2 = 6. Now 6 < 7 — invalid. The while loop that shrinks must stop because the window is no longer valid. This is exactly why we use a while, not an if: we shrink one step at a time and re-check each time.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 1, right: 3,
        sum: 6, target: 7, minLen: 4,
        action: 'Shrink left. Sum = 6 < 7. Invalid!',
      },
    },
    {
      id: 3,
      title: 'Expand — Valid Again',
      explanation: 'Window is invalid, so expand right. Add 4: sum = 6 + 4 = 10 ≥ 7. Valid again, length = 4. minLen stays 4 — we haven\'t beaten the record yet. But now we shrink again.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 1, right: 4,
        sum: 10, target: 7, minLen: 4,
        action: 'Sum = 10 ≥ 7. Shrink left.',
      },
    },
    {
      id: 4,
      title: 'Shrink — Still Valid',
      explanation: 'Drop the 3: sum = 10 − 3 = 7. Still ≥ 7. Length = 3 (indices 2–4: [1, 2, 4]). New record! minLen = 3. The while loop continues — we have not yet broken the condition, so we must keep shrinking.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 2, right: 4,
        sum: 7, target: 7, minLen: 3,
        action: 'Sum = 7. Valid! New minLen = 3.',
      },
    },
    {
      id: 5,
      title: 'Shrink — Break It',
      explanation: 'Drop the 1: sum = 7 − 1 = 6. Invalid. Stop shrinking. minLen stays 3. Every element that leaves the left passed through the window exactly once — this is why the total number of moves is O(N), not O(N²).',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 3, right: 4,
        sum: 6, target: 7, minLen: 3,
        action: 'Sum = 6 < 7. Invalid!',
      },
    },
    {
      id: 6,
      title: 'Expand — Final Slide',
      explanation: 'Add 3: sum = 6 + 3 = 9 ≥ 7. Valid. Length = 3 (indices 3–5: [2, 4, 3]). minLen stays 3. Again — shrink to see if we can go smaller.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 3, right: 5,
        sum: 9, target: 7, minLen: 3,
        action: 'Sum = 9 ≥ 7. Shrink left.',
      },
    },
    {
      id: 7,
      title: 'Shrink — New Minimum!',
      explanation: 'Drop the 2: sum = 9 − 2 = 7. Still valid. Length = 2 (indices 4–5: [4, 3]). New minimum! minLen = 2. That is likely the best we can do at this right edge.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 4, right: 5,
        sum: 7, target: 7, minLen: 2,
        action: 'Sum = 7. Valid! New minLen = 2.',
      },
    },
    {
      id: 8,
      title: 'Shrink — Break It',
      explanation: 'Drop the 4: sum = 7 − 4 = 3. Invalid. Right has reached the array end, so we cannot expand further. The while loop terminates. minLen = 2 is final.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 5, right: 5,
        sum: 3, target: 7, minLen: 2,
        action: 'Sum = 3 < 7. Invalid!',
      },
    },
    {
      id: 9,
      title: 'Return Shortest',
      explanation: 'Final answer: 2 — the subarray [4, 3]. Every element was added once and removed at most once: 6 additions + 5 removals = 11 operations total (N=6). Brute force would have been 21 subarrays each requiring O(K) check — O(N²) overall.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 5, right: 5,
        sum: 3, target: 7, minLen: 2,
        action: 'Return minLen: 2', found: true,
      },
    },
  ],

  javaCode: `public class MinSubArrayLen {
    public int minSubArrayLen(int target, int[] nums) {
        int left = 0;
        int currentSum = 0;
        int minLen = Integer.MAX_VALUE;

        for (int right = 0; right < nums.length; right++) {
            currentSum += nums[right]; // Expand right

            // While the window is valid, try to shrink it
            while (currentSum >= target) {
                minLen = Math.min(minLen, right - left + 1);
                currentSum -= nums[left]; // Shrink left
                left++;
            }
        }
        return minLen == Integer.MAX_VALUE ? 0 : minLen;
    }
}`,

  javaExplanation: [
    { line: 'for (int right = 0; right < nums.length; right++)', note: 'Always expand the right pointer first.' },
    { line: 'while (currentSum >= target)', note: 'Once the condition is met, we use a while loop to shrink as much as possible.' },
    { line: 'minLen = Math.min(minLen, right - left + 1);', note: 'Record the length while it is valid.' },
    { line: 'currentSum -= nums[left]; left++;', note: 'Remove the left element to see if the window is still valid without it.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Each element is added to the sum once and removed from the sum at most once. Thus, it is O(N).',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Calculate the sum of every subarray starting at every index. Too slow for N = 10⁵.',
  },

  commonMistakes: [
    { title: 'Using if instead of while', detail: 'When the window becomes valid, you must shrink it repeatedly until it becomes invalid. Using `if` only shrinks it once, missing the shortest window.' },
    { title: 'Forgetting to handle the "no valid window" case', detail: 'Return 0 if minLen is still Integer.MAX_VALUE.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Minimum Size Subarray Sum', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
    { level: 'Hard', title: 'Minimum Window Substring', url: 'https://leetcode.com/problems/minimum-window-substring/' },
    { level: 'Medium', title: 'Shortest Subarray with Sum at Least K', url: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/' },
  ],

  quickRevision: [
    'Expand right until valid.',
    'While valid, update min length, then shrink left.',
    'Return min length.',
  ],
};

// ============================================================
// MONOTONIC DEQUE — Sliding Window Maximum
// ============================================================
export const monotonicDeque = {
  id: 'monotonic-deque',
  patternId: 'sliding-window',
  title: 'Monotonic Deque',
  subtitle: 'The VIP Line',
  type: 'monotonic-deque',
  difficulty: 'Hard',

  coreConcept: {
    what: 'A Deque (double-ended queue) is used to maintain the maximum (or minimum) element of a sliding window in O(1) time.',
    why: 'When the window slides, we need to know the new maximum. The deque keeps elements in decreasing order. The front of the deque is always the maximum. If a new element is bigger than the ones behind it, those smaller elements are useless.',
    when: 'When you need to find the max/min of every sliding window efficiently, without recalculating.',
    properties: [
      'The deque stores indices, not values.',
      'The front of the deque is always the index of the max element.',
      'Elements in the deque are in decreasing order of their values.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Sliding Window Maximum" or "Sliding Window Minimum".',
      'Need to find max/min of every window of size K in O(N).',
    ],
    inputs: ['Array of numbers'],
    constraints: ['O(N) time', 'O(K) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Scenario: First Element Enters',
      explanation: 'Scenario: A stock monitoring dashboard tracks [1, 3, -1, -3, 5, 3, 6, 7] and must display the peak price of every 3-day window. Naive: rescan 3 values per window = O(N·K). Deque: O(N). We store indices, not values, so we can detect expiration. Index 0 (value 1) enters an empty deque.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 0,
        deque: [0], windowMax: 1, result: [],
        action: 'Deque holds index 0 (value 1).',
      },
    },
    {
      id: 1,
      title: 'Bigger Guy — Kick the Back',
      explanation: 'Index 1 (value 3) arrives. The back of the deque holds index 0 (value 1), and 1 < 3. Index 0 is USELESS: any window that includes index 0 will also include index 1 (since windows are contiguous), and 3 > 1. Pop 0. Push 1. Deque = [1].',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 1,
        deque: [1], windowMax: 3, result: [],
        action: '3 > 1. Pop 1 from back. Push 3.',
      },
    },
    {
      id: 2,
      title: 'Window Full — Record Max',
      explanation: 'Index 2 (value -1) arrives. It is smaller than 3, so it stays. Deque = [1, 2] (values 3, -1 in decreasing order). right = 2 ≥ k−1 = 2, so the first window is complete. Max = value at deque front = 3. Record it.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 2,
        deque: [1, 2], windowMax: 3, result: [3],
        action: 'Push -1. Window full. Max is 3.',
      },
    },
    {
      id: 3,
      title: 'Expiration Check — Nothing to Evict',
      explanation: 'Index 3 (value -3) arrives. First check: does the front of the deque fall outside the window? Window covers indices [right−k+1, right] = [1, 3]. Deque front is index 1 — still inside. No eviction. Push 3 to back. Deque = [1, 2, 3]. Max = 3. Record.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 3,
        deque: [1, 2, 3], windowMax: 3, result: [3, 3],
        action: 'Push -3. Max remains 3.',
      },
    },
    {
      id: 4,
      title: 'New Champion — Clear the Deque',
      explanation: 'Index 4 (value 5) arrives. Eviction check: window is [2, 4]; front is 1 → EVICT. Pop 1. Then: -3, -1, 3 are all smaller than 5, so pop them all from the back. Deque = [4] (just 5). Max = 5. Record. This is the deque\'s power — the entire window history collapsed in one step.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 4,
        deque: [4], windowMax: 5, result: [3, 3, 5],
        action: '5 > all. Clear deque, push 5.',
      },
    },
    {
      id: 5,
      title: 'Same-Value Tail — Append',
      explanation: 'Index 5 (value 3) arrives. Window is [3, 5]; front index 4 is inside → no eviction. Back of deque is 4 (value 5) and 5 > 3 → no back-pop. Push 5. Deque = [4, 5] (values 5, 3). Max = 5. Record.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 5,
        deque: [4, 5], windowMax: 5, result: [3, 3, 5, 5],
        action: 'Push 3. Max 5.',
      },
    },
    {
      id: 6,
      title: 'New Champion Again',
      explanation: 'Index 6 (value 6) arrives. Window is [4, 6]; front index 4 is inside → no eviction. Back is 5 (value 3) and 3 < 6 → pop. Back is 4 (value 5) and 5 < 6 → pop. Deque = [6] (just 6). Max = 6. Record. Every surviving index in the deque must be "newer AND larger" than the ones it replaced.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 6,
        deque: [6], windowMax: 6, result: [3, 3, 5, 5, 6],
        action: '6 > 3 and 5. Pop them. Push 6.',
      },
    },
    {
      id: 7,
      title: 'Final Window',
      explanation: 'Index 7 (value 7) arrives. Window is [5, 7]; front index 6 is inside → no eviction. Back is 6 (value 6) and 6 < 7 → pop. Deque = [7]. Max = 7. Record. Right reaches the end. Six window maximums recorded total.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 7,
        deque: [7], windowMax: 7, result: [3, 3, 5, 5, 6, 7],
        action: '7 > 6. Pop 6. Push 7.',
      },
    },
    {
      id: 8,
      title: 'Return All Maximums',
      explanation: 'Result: [3, 3, 5, 5, 6, 7]. Total operations: each index entered the deque once and left at most once (either evicted by expiration or popped by a bigger newcomer). That is ≤ 2N operations — O(N) total. For N = 10⁵ and K = 500, that is 200K ops vs 50M for brute-force.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 7,
        deque: [7], windowMax: 7, result: [3, 3, 5, 5, 6, 7],
        action: 'Return [3, 3, 5, 5, 6, 7]', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class SlidingWindowMaximum {
    public int[] maxSlidingWindow(int[] nums, int k) {
        if (nums == null || k <= 0) return new int[0];
        
        int n = nums.length;
        int[] result = new int[n - k + 1];
        int ri = 0;
        
        // Deque stores INDICES
        Deque<Integer> q = new ArrayDeque<>();
        
        for (int i = 0; i < n; i++) {
            // 1. Remove indices that are out of the current window
            while (!q.isEmpty() && q.peek() < i - k + 1) {
                q.poll();
            }
            // 2. Remove smaller elements from the back
            while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) {
                q.pollLast();
            }
            // 3. Add current index
            q.offer(i);
            
            // 4. Record result if window is full
            if (i >= k - 1) {
                result[ri++] = nums[q.peek()];
            }
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'Deque<Integer> q = new ArrayDeque<>();', note: 'Stores indices of elements in decreasing order of value.' },
    { line: 'while (!q.isEmpty() && q.peek() < i - k + 1) q.poll();', note: 'Remove expired elements from the front.' },
    { line: 'while (!q.isEmpty() && nums[q.peekLast()] < nums[i]) q.pollLast();', note: 'Remove smaller elements from the back. They can never be the max.' },
    { line: 'q.offer(i);', note: 'Add the current index.' },
    { line: 'if (i >= k - 1) result[ri++] = nums[q.peek()];', note: 'Once the window is full, the front is the max.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(K)',
    aux: 'O(K)',
    explanation: 'Each element is added to the deque once and removed at most once. Thus, the total operations are O(N). The deque holds at most K elements.',
  },

  bruteForce: {
    time: 'O(N * K)',
    space: 'O(1)',
    note: 'For every window of size K, find the max by scanning all K elements.',
  },

  commonMistakes: [
    { title: 'Storing values instead of indices', detail: 'You cannot determine if an element is out of the window if you only store its value. You must store indices.' },
    { title: 'Using >= instead of > when removing smaller elements', detail: 'Both work, but using strict `<` keeps the newest duplicate. It doesn\'t change correctness.' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
    { level: 'Medium', title: 'Shortest Subarray with Sum at Least K', url: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/' },
    { level: 'Hard', title: 'Max Value of Equation', url: 'https://leetcode.com/problems/max-value-of-equation/' },
  ],

  quickRevision: [
    'Use a Deque of indices.',
    'Remove out-of-window indices from front.',
    'Remove smaller elements from back.',
    'Add current index.',
    'Front is always the max.',
  ],
};

export const slidingWindowSubPatterns = [fixedSize, variableLongest, variableShortest, monotonicDeque];

export const slidingWindowOverview = {
  id: 'sliding-window',
  title: 'Sliding Window',
  subtitle: 'Maintain a contiguous subarray and move it efficiently',
  introduction: 'Sliding Window is a technique for finding a contiguous subarray or substring that satisfies a condition. Instead of recomputing from scratch, we add the new element and remove the old one, turning O(N²) problems into O(N).',
  coreConcept: {
    what: 'A window (range) defined by two pointers that moves across the array.',
    why: 'Reuses calculations from the previous window. Reduces time complexity by eliminating redundant work.',
    when: 'Contiguous subarray + condition (max, min, exact size).',
  },
  whenToUse: [
    'The problem asks for a contiguous subarray or substring.',
    'The problem asks for max, min, longest, shortest, or exact size K.',
    'You need to calculate a rolling sum, frequency, or condition.',
  ],
  recognitionClues: [
    '"Find the longest substring..."',
    '"Find the maximum sum of consecutive elements..."',
    '"Find the minimum window containing..."',
    '"Sliding window maximum"',
  ],
  importantProperties: [
    'The elements must be contiguous.',
    'Both pointers generally move in the same direction.',
    'Window state (sum, map, deque) is updated incrementally.',
  ],
  comparison: [
    { aspect: 'Fixed Size', when: 'Exact K size', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Variable Longest', when: 'Max / Longest', time: 'O(N)', space: 'O(K)' },
    { aspect: 'Variable Shortest', when: 'Min / Shortest', time: 'O(N)', space: 'O(K)' },
    { aspect: 'Monotonic Deque', when: 'Window Max/Min', time: 'O(N)', space: 'O(K)' },
  ],
  commonMistakes: [
    { title: 'Using if instead of while', detail: 'When shrinking a variable window, you must use `while` to ensure it shrinks until valid, not just once.' },
    { title: 'Off-by-one boundaries', detail: 'Window length is `right - left + 1`.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Maximum Average Subarray I', url: 'https://leetcode.com/problems/maximum-average-subarray-i/' },
    { level: 'Medium', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
    { level: 'Medium', title: 'Minimum Size Subarray Sum', url: 'https://leetcode.com/problems/minimum-size-subarray-sum/' },
    { level: 'Hard', title: 'Sliding Window Maximum', url: 'https://leetcode.com/problems/sliding-window-maximum/' },
  ],
};