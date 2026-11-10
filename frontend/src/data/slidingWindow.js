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
      title: 'Build the First Window',
      explanation: 'We need the max sum of 3 elements. Imagine placing a magnifying glass over the first 3 items: [2, 1, 5]. The sum is 8. This is our first maxSum.',
      state: {
        array: [2, 1, 5, 1, 3, 2], left: 0, right: 2, k: 3,
        windowSum: 8, maxSum: 8, windowContent: [2, 1, 5],
        action: 'Initial window sum is 8. Max is 8.',
      },
    },
    {
      id: 1,
      title: 'Slide the Window Right',
      explanation: 'Move the glass one step right. The 1 (index 3) enters the window, and the 2 (index 0) leaves. Instead of recounting, we do Math: 8 (old sum) + 1 (entering) - 2 (leaving) = 7.',
      state: {
        array: [2, 1, 5, 1, 3, 2], left: 1, right: 3, k: 3,
        windowSum: 7, maxSum: 8, windowContent: [1, 5, 1],
        action: 'Add 1, remove 2. Sum = 7.',
      },
    },
    {
      id: 2,
      title: 'New Maximum Found',
      explanation: 'Slide right again. The 3 enters, the 1 leaves. New Sum = 7 + 3 - 1 = 9. We found a new maximum! We update maxSum to 9.',
      state: {
        array: [2, 1, 5, 1, 3, 2], left: 2, right: 4, k: 3,
        windowSum: 9, maxSum: 9, windowContent: [5, 1, 3],
        action: 'Add 3, remove 1. Sum = 9. New Max!',
      },
    },
    {
      id: 3,
      title: 'Final Slide',
      explanation: 'The 2 enters, the 5 leaves. New Sum = 9 + 2 - 5 = 6. We reached the end of the array.',
      state: {
        array: [2, 1, 5, 1, 3, 2], left: 3, right: 5, k: 3,
        windowSum: 6, maxSum: 9, windowContent: [1, 3, 2],
        action: 'Add 2, remove 5. Sum = 6.',
      },
    },
    {
      id: 4,
      title: 'Return Maximum',
      explanation: 'We checked every window of size 3. The highest sum we ever saw was 9.',
      state: {
        array: [2, 1, 5, 1, 3, 2], left: 3, right: 5, k: 3,
        windowSum: 6, maxSum: 9, windowContent: [1, 3, 2],
        action: 'Return maxSum: 9', found: true,
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
      title: 'Start Expanding',
      explanation: 'We want the longest substring without repeating characters. The right pointer eats characters. The window "a" is valid. Length = 1.',
      state: {
        string: "abcabcbb", left: 0, right: 0,
        windowStr: "a", windowMap: {a: 1}, maxLen: 1,
        action: 'Expand right. Window is valid.',
      },
    },
    {
      id: 1,
      title: 'Keep Growing',
      explanation: 'Right eats "b". Window "ab" is valid. Length = 2.',
      state: {
        string: "abcabcbb", left: 0, right: 1,
        windowStr: "ab", windowMap: {a: 1, b: 1}, maxLen: 2,
        action: 'Expand right. Window is valid.',
      },
    },
    {
      id: 2,
      title: 'New Maximum',
      explanation: 'Right eats "c". Window "abc" is valid. Length = 3.',
      state: {
        string: "abcabcbb", left: 0, right: 2,
        windowStr: "abc", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Expand right. Window is valid.',
      },
    },
    {
      id: 3,
      title: 'Condition Broken! (Duplicate)',
      explanation: 'Right eats "a". Now we have two "a"s in the window "abca". The condition is broken. We CANNOT expand further. We must shrink from the left until the duplicate is gone.',
      state: {
        string: "abcabcbb", left: 0, right: 3,
        windowStr: "abca", windowMap: {a: 2, b: 1, c: 1}, maxLen: 3,
        action: 'Invalid! Duplicate "a". Shrink left.',
      },
    },
    {
      id: 4,
      title: 'Shrink to Fix',
      explanation: 'Left drops the first "a". The window is "bca", which is valid again. Length = 3. We can resume expanding right.',
      state: {
        string: "abcabcbb", left: 1, right: 3,
        windowStr: "bca", windowMap: {a: 1, b: 1, c: 1}, maxLen: 3,
        action: 'Shrink left. Window is valid again.',
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
      title: 'Expand Until Valid',
      explanation: 'We need a sum ≥ 7. We expand right, accumulating the sum. 2 + 3 + 1 = 6. Not enough.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 0, right: 2,
        sum: 6, target: 7, minLen: Infinity,
        action: 'Sum = 6. Need more. Expand right.',
      },
    },
    {
      id: 1,
      title: 'Target Reached',
      explanation: 'Right adds 2. The sum is now 8, which is ≥ 7. We have a valid window of length 4 (indices 0 to 3).',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 0, right: 3,
        sum: 8, target: 7, minLen: 4,
        action: 'Sum = 8 ≥ 7. Valid! Update minLen = 4.',
      },
    },
    {
      id: 2,
      title: 'Shrink the Rope',
      explanation: 'Since the window is valid, let\'s try to make it smaller. Remove the 2 on the left. Sum drops to 6. It is no longer valid.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 1, right: 3,
        sum: 6, target: 7, minLen: 4,
        action: 'Shrink left. Sum = 6 < 7. Invalid!',
      },
    },
    {
      id: 3,
      title: 'Expand Again',
      explanation: 'Window is invalid, so we expand right. Add 4. Sum = 10. Valid again. The window is length 4. minLen is still 4.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 1, right: 4,
        sum: 10, target: 7, minLen: 4,
        action: 'Sum = 10 ≥ 7. Shrink left.',
      },
    },
    {
      id: 4,
      title: 'Keep Shrinking',
      explanation: 'Remove 3. Sum = 7. Valid! Window length is 3. minLen updates to 3.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 2, right: 4,
        sum: 7, target: 7, minLen: 3,
        action: 'Sum = 7. Valid! New minLen = 3.',
      },
    },
    {
      id: 5,
      title: 'Try to Shrink More',
      explanation: 'Remove 1. Sum = 6. Invalid.',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 3, right: 4,
        sum: 6, target: 7, minLen: 3,
        action: 'Sum = 6 < 7. Invalid!',
      },
    },
    {
      id: 6,
      title: 'Final Window',
      explanation: 'Expand right. Add 3. Sum = 9. Valid! Shrink left (remove 2). Sum = 7. Length = 2. New minLen = 2!',
      state: {
        array: [2, 3, 1, 2, 4, 3], left: 4, right: 5,
        sum: 7, target: 7, minLen: 2,
        action: 'Found the shortest window [4, 3]. minLen = 2.',
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
      title: 'First Element Enters',
      explanation: 'Window size is 3. We process the first element (1). It goes into the deque.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 0,
        deque: [0], windowMax: 1, result: [],
        action: 'Deque holds index 0 (value 1).',
      },
    },
    {
      id: 1,
      title: 'Bigger Guy Arrives',
      explanation: 'Next is 3. It is bigger than 1 (the back of the deque). The bouncer kicks 1 out because 3 is newer and taller. 1 can never be the max of any window that includes 3.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 1,
        deque: [1], windowMax: 3, result: [],
        action: '3 > 1. Pop 1 from back. Push 3.',
      },
    },
    {
      id: 2,
      title: 'Window is Full',
      explanation: 'Next is -1. It is smaller than 3, so it waits in the deque. The window size is 3. The max is at the front: 3.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 2,
        deque: [1, 2], windowMax: 3, result: [3],
        action: 'Push -1. Window full. Max is 3.',
      },
    },
    {
      id: 3,
      title: 'Slide Window (Expiration)',
      explanation: 'Next is -3. The window slides. The index 0 (value 1) leaves the window, but it was already kicked out! The deque is [1, 2, 3]. Max is still 3.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 3,
        deque: [1, 2, 3], windowMax: 3, result: [3, 3],
        action: 'Push -3. Max remains 3.',
      },
    },
    {
      id: 4,
      title: 'New Max Arrives',
      explanation: 'Next is 5. It is bigger than -3, -1, and 3. It kicks them all out! The deque only contains 5. Max is now 5.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 4,
        deque: [4], windowMax: 5, result: [3, 3, 5],
        action: '5 > all. Clear deque, push 5.',
      },
    },
    {
      id: 5,
      title: 'Window Slide + Expiration',
      explanation: 'Next is 3. Deque is [4, 5]. The window slides. The index 1 (value 3) is now outside the window (right - k = 5 - 3 = 2). It must be removed from the front. Max is still 5.',
      state: {
        array: [1, 3, -1, -3, 5, 3, 6, 7], right: 5,
        deque: [4, 5], windowMax: 5, result: [3, 3, 5, 5],
        action: 'Push 3. Remove expired index 1. Max 5.',
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