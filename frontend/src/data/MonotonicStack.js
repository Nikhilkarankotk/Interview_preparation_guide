// ============================================================
// NEXT GREATER ELEMENT — The Waiting Line
// ============================================================
export const nextGreaterElement = {
  id: 'next-greater-element',
  patternId: 'monotonic-stack',
  title: 'Next Greater Element',
  subtitle: 'The Waiting Line',
  type: 'next-greater-element',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Use a stack to keep track of elements that are waiting for a greater element to appear on their right.',
    why: 'Instead of checking every element to the right (O(N²)), we can maintain a stack of "waiting" indices in decreasing order. When a new element arrives, it resolves all waiting elements that are smaller than it.',
    when: 'When you need to find the next greater (or smaller) element for every item in an array.',
    properties: [
      'The stack stores indices, not values.',
      'The stack values are always in decreasing order.',
      'Each element is pushed and popped at most once.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Next greater element".',
      '"Nearest larger number to the right".',
      'Finding a monotonic relationship between neighbors.',
    ],
    inputs: ['Array of numbers'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start the Waiting Line',
      explanation: 'We scan left to right. Index 0 is the value 2. The stack is empty. We push its index (0) onto the stack. The stack now holds [0]. WHY: Every element is a potential "next greater element" for the elements to its left. We push its index so we can calculate distances or assign answers later.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 0, stack: [0], result: [null, null, null, null, null], action: 'Push index 0 (val 2).' },
    },
    {
      id: 1,
      title: 'Smaller Element Arrives',
      explanation: 'Index 1 is the value 1. We compare it to the stack top (index 0, value 2). Since 1 is NOT greater than 2, it cannot resolve index 0. We push index 1. Stack is [0, 1]. WHY: The stack remains strictly decreasing in values (2, then 1). This ensures that the next number we see is always compared against the most recent unresolved element.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 1, stack: [0, 1], result: [null, null, null, null, null], action: '1 < 2. Push index 1.' },
    },
    {
      id: 2,
      title: 'Resolver Arrives — Part 1',
      explanation: 'Index 2 is the value 2. It is greater than the stack top (index 1, value 1). This means index 2 is the next greater element for index 1. We pop index 1 and set result[1] = 2. Stack is now [0]. WHY: The first number to the right that is larger is the definitive answer. We pop it to remove it from the waiting line.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 2, stack: [0], result: [null, 2, null, null, null], action: '2 > 1. Pop 1, ans[1]=2.' },
    },
    {
      id: 3,
      title: 'Resolver Arrives — Part 2',
      explanation: 'Still at index 2 (value 2). We compare it to the new stack top (index 0, value 2). Since 2 is NOT strictly greater than 2, we stop popping. We push index 2. Stack becomes [0, 2]. WHY: The problem asks for the "next greater" (strictly greater). Equal values do not resolve each other.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 2, stack: [0, 2], result: [null, 2, null, null, null], action: '2 == 2. Stop popping. Push index 2.' },
    },
    {
      id: 4,
      title: 'Big Resolver Arrives',
      explanation: 'Index 3 is the value 4. 4 > 2 (stack top index 2). We pop index 2 and set result[2] = 4. Stack is now [0]. WHY: 4 is the first number to the right of index 2 that is larger than it.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 3, stack: [0], result: [null, 2, 4, null, null], action: '4 > 2. Pop 2, ans[2]=4.' },
    },
    {
      id: 5,
      title: 'Big Resolver Keeps Going',
      explanation: 'Still at index 3 (value 4). We compare with stack top (index 0, value 2). 4 > 2. We pop index 0 and set result[0] = 4. Stack is now empty. WHY: 4 is also the next greater element for the very first element. The while loop clears all smaller pending elements.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 3, stack: [], result: [4, 2, 4, null, null], action: '4 > 2. Pop 0, ans[0]=4.' },
    },
    {
      id: 6,
      title: 'Push the Resolver',
      explanation: 'The while loop ends because the stack is empty. We push index 3 (value 4) so it can wait for its own next greater element. Stack is [3].',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 3, stack: [3], result: [4, 2, 4, null, null], action: 'Push index 3.' },
    },
    {
      id: 7,
      title: 'Smaller Element Arrives Again',
      explanation: 'Index 4 is the value 3. 3 < 4 (stack top index 3). It cannot resolve index 3. We push index 4. Stack is [3, 4].',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 4, stack: [3, 4], result: [4, 2, 4, null, null], action: '3 < 4. Push index 4.' },
    },
    {
      id: 8,
      title: 'End of Array — Finalize',
      explanation: 'We have processed all elements. The stack contains [3, 4]. These indices never found a greater element to their right. We leave them as the default -1. The final result is [4, 2, 4, -1, -1]. WHY: Any indices left in the monotonic stack are strictly decreasing towards the top, meaning nothing to their right was ever large enough to pop them.',
      state: { array: [2, 1, 2, 4, 3], currentIdx: 4, stack: [3, 4], result: [4, 2, 4, -1, -1], action: 'End. Remaining = -1.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class NextGreaterElement {
    public int[] nextGreaterElement(int[] nums) {
        int[] result = new int[nums.length];
        Arrays.fill(result, -1);
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
                int index = stack.pop();
                result[index] = nums[i];
            }
            stack.push(i);
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'Arrays.fill(result, -1);', note: 'Default answer is -1 if no greater element exists.' },
    { line: 'while (!stack.isEmpty() && nums[i] > nums[stack.peek()])', note: 'While the current number is greater than the top of the stack, the current number is the "next greater" for the stack top.' },
    { line: 'stack.push(i);', note: 'Push the current index to wait for its own next greater element.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Each element is pushed onto the stack exactly once and popped at most once.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'For each element, scan to the right until a larger number is found.',
  },

  commonMistakes: [
    { title: 'Using <= instead of <', detail: 'If you want strictly greater, use `nums[i] > nums[stack.peek()]`. If you want greater or equal, use `>=`.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/' },
    { level: 'Medium', title: 'Next Greater Element II', url: 'https://leetcode.com/problems/next-greater-element-ii/' },
  ],

  quickRevision: [
    'Stack stores indices.',
    'While current > stack top, pop and record.',
    'Push current index.',
    'Leftover indices = -1.',
  ],
};

// ============================================================
// DAILY TEMPERATURES — The Countdown
// ============================================================
export const dailyTemperatures = {
  id: 'daily-temperatures',
  patternId: 'monotonic-stack',
  title: 'Daily Temperatures',
  subtitle: 'The Countdown',
  type: 'daily-temperatures',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Instead of returning the next greater value, return the distance (in days) until the next greater value occurs.',
    why: 'It is the exact same Monotonic Stack logic, but the math is `current_index - stack.pop()` instead of returning the value.',
    when: 'When you need to find the distance to the next greater element.',
    properties: [
      'Stack stores indices.',
      'Result array stores the difference in indices.',
      'If no warmer day exists, the result is 0.',
    ],
  },

  patternRecognition: {
    clues: [
      '"How many days until a warmer temperature".',
      '"Distance to the next greater element".',
    ],
    inputs: ['Array of integers'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Day 0',
      explanation: 'We push the index of Day 0 (temperature 73) onto the stack. Stack is [0]. WHY: We need to wait for a future day that is warmer. Storing indices allows us to calculate the distance in days later.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 0, stack: [0], result: [0, 0, 0, 0, 0, 0], action: 'Push index 0 (73).' },
    },
    {
      id: 1,
      title: 'Warmer Day Resolves Day 0',
      explanation: 'Day 1 is 74. 74 > 73 (stack top). We found a warmer day for index 0! We pop index 0. The distance is 1 - 0 = 1. We set result[0] = 1. Stack is empty. WHY: The first warmer day encountered is always the closest one.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 1, stack: [], result: [1, 0, 0, 0, 0, 0], action: '74 > 73. Pop 0, ans[0]=1.' },
    },
    {
      id: 2,
      title: 'Push Day 1',
      explanation: 'The while loop ends. We push index 1 onto the stack. Stack is [1]. It will now wait for a future day warmer than 74.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 1, stack: [1], result: [1, 0, 0, 0, 0, 0], action: 'Push index 1 (74).' },
    },
    {
      id: 3,
      title: 'Day 2',
      explanation: 'Day 2 is 75. 75 > 74 (stack top). We pop index 1. Distance = 2 - 1 = 1. result[1] = 1. Stack is empty. We push index 2. Stack is [2].',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 2, stack: [2], result: [1, 1, 0, 0, 0, 0], action: '75 > 74. Pop 1, ans[1]=1. Push 2.' },
    },
    {
      id: 4,
      title: 'Colder Days',
      explanation: 'Day 3 is 71. 71 < 75 (stack top). It cannot resolve index 2. We push index 3. Stack is [2, 3]. WHY: We only pop when we find a warmer temperature. Colder days just extend the waiting line.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 3, stack: [2, 3], result: [1, 1, 0, 0, 0, 0], action: '71 < 75. Push 3.' },
    },
    {
      id: 5,
      title: 'Even Colder',
      explanation: 'Day 4 is 69. 69 < 71 (stack top). We push index 4. Stack is [2, 3, 4]. The stack values are now [75, 71, 69], which is strictly decreasing.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 4, stack: [2, 3, 4], result: [1, 1, 0, 0, 0, 0], action: '69 < 71. Push 4.' },
    },
    {
      id: 6,
      title: 'Resolving Day 4',
      explanation: 'Day 5 is 72. 72 > 69 (stack top). Pop index 4. Distance = 5 - 4 = 1. result[4] = 1. Stack is [2, 3]. WHY: Day 5 is the first day warmer than Day 4.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 5, stack: [2, 3], result: [1, 1, 0, 0, 1, 0], action: '72 > 69. Pop 4, ans[4]=1.' },
    },
    {
      id: 7,
      title: 'Resolving Day 3',
      explanation: 'Still at Day 5 (72). 72 > 71 (new stack top index 3). Pop index 3. Distance = 5 - 3 = 2. result[3] = 2. Stack is [2]. WHY: Day 5 is also warmer than Day 3, skipping over the colder Day 4.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 5, stack: [2], result: [1, 1, 0, 2, 1, 0], action: '72 > 71. Pop 3, ans[3]=2.' },
    },
    {
      id: 8,
      title: 'Push Day 5',
      explanation: '72 < 75 (stack top index 2). Stop popping. Push index 5. Stack is [2, 5]. We have processed all days. The indices left in the stack (2 and 5) never found a warmer day, so their results remain 0.',
      state: { array: [73, 74, 75, 71, 69, 72], currentIdx: 5, stack: [2, 5], result: [1, 1, 0, 2, 1, 0], action: '72 < 75. Push 5. End.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class DailyTemperatures {
    public int[] dailyTemperatures(int[] temperatures) {
        int[] result = new int[temperatures.length];
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < temperatures.length; i++) {
            while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
                int prevIndex = stack.pop();
                result[prevIndex] = i - prevIndex;
            }
            stack.push(i);
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'int prevIndex = stack.pop();', note: 'Get the index of the colder day.' },
    { line: 'result[prevIndex] = i - prevIndex;', note: 'Calculate the number of days it took to find a warmer temperature.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Each index is pushed and popped at most once.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'For every day, scan forward until a warmer day is found.',
  },

  commonMistakes: [
    { title: 'Returning the temperature instead of the distance', detail: 'Make sure to do `i - prevIndex`, not `temperatures[i]`.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/' },
  ],

  quickRevision: [
    'Monotonic stack of indices.',
    'Pop when current > stack top.',
    'Distance = current index - popped index.',
  ],
};

// ============================================================
// LARGEST RECTANGLE — The Skyline
// ============================================================
export const largestRectangle = {
  id: 'largest-rectangle',
  patternId: 'monotonic-stack',
  title: 'Largest Rectangle',
  subtitle: 'The Skyline',
  type: 'largest-rectangle',
  difficulty: 'Hard',

  coreConcept: {
    what: 'Find the largest rectangular area that can be formed within a histogram.',
    why: 'For any bar, the largest rectangle it can form is bounded by the first shorter bar on its left, and the first shorter bar on its right. A Monotonic Increasing Stack helps us find these boundaries in O(N).',
    when: 'Histogram problems, maximal rectangle problems.',
    properties: [
      'Stack stores indices of bars in increasing order of height.',
      'We append a 0 at the end of the array to force the stack to empty.',
      'Width is calculated as `current_index - stack.peek() - 1`.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Largest Rectangle in Histogram".',
      '"Maximal Rectangle" in a matrix.',
    ],
    inputs: ['Array of heights'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start with First Bar',
      explanation: 'Heights: [2, 1, 5, 6, 2, 3]. We iterate left to right. Index 0 has height 2. The stack is empty, so we push index 0. Stack is [0]. WHY: Every bar starts as a potential left boundary for a rectangle. We push its index to remember its position.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 0, stack: [0], maxArea: 0, action: 'Push index 0 (h=2).' },
    },
    {
      id: 1,
      title: 'Shorter Bar — Pop and Calculate',
      explanation: 'Index 1 has height 1. 1 < 2 (stack top). This means index 1 is the Right Boundary for the rectangle of height 2. We pop index 0. Height = 2. Width = 1 (current index) - 0 (no left boundary) = 1. Area = 2 * 1 = 2. maxArea = 2.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 1, stack: [], maxArea: 2, action: '1 < 2. Pop 0, Area=2.' },
    },
    {
      id: 2,
      title: 'Push New Left Boundary',
      explanation: 'The stack is empty. We push index 1. Stack is [1]. This bar (height 1) can extend further left than any previous bar because it is shorter, making it a better left boundary.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 1, stack: [1], maxArea: 2, action: 'Push index 1 (h=1).' },
    },
    {
      id: 3,
      title: 'Increasing Heights',
      explanation: 'Index 2 (5) > 1, Index 3 (6) > 5. Both are taller than the stack top, so we just push them. Stack is [1, 2, 3]. WHY: A taller bar is a valid right extension for shorter bars, but we don\'t know its right boundary yet.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 3, stack: [1, 2, 3], maxArea: 2, action: 'Push 2 and 3.' },
    },
    {
      id: 4,
      title: 'Right Boundary Found',
      explanation: 'Index 4 has height 2. 2 < 6 (stack top index 3). Pop index 3. Height = 6. Left boundary is index 2 (stack top after pop). Width = 4 (current) - 2 (left) - 1 = 1. Area = 6 * 1 = 6. maxArea = 6.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 4, stack: [1, 2], maxArea: 6, action: '2 < 6. Pop 3, Area=6.' },
    },
    {
      id: 5,
      title: 'Keep Popping',
      explanation: 'Still at index 4 (height 2). 2 < 5 (stack top index 2). Pop index 2. Height = 5. Left boundary is index 1. Width = 4 - 1 - 1 = 2. Area = 5 * 2 = 10. maxArea = 10. WHY: The height 5 bar can span from index 1 to 3.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 4, stack: [1], maxArea: 10, action: '2 < 5. Pop 2, Area=10.' },
    },
    {
      id: 6,
      title: 'Push Current Bar',
      explanation: '2 > 1 (stack top). Stop popping. Push index 4. Stack is [1, 4].',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 4, stack: [1, 4], maxArea: 10, action: 'Push index 4 (h=2).' },
    },
    {
      id: 7,
      title: 'Last Bar',
      explanation: 'Index 5 has height 3. 3 > 2 (stack top). Push index 5. Stack is [1, 4, 5].',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 5, stack: [1, 4, 5], maxArea: 10, action: 'Push index 5 (h=3).' },
    },
    {
      id: 8,
      title: 'The Sentinel 0',
      explanation: 'We iterate one extra time with height 0. 0 < 3. Pop index 5. Height=3. Left boundary is 4. Width = 6 - 4 - 1 = 1. Area = 3. maxArea stays 10. WHY: The sentinel 0 acts as a right boundary for ALL remaining bars, forcing the stack to empty.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 6, stack: [1, 4], maxArea: 10, action: '0 < 3. Pop 5, Area=3.' },
    },
    {
      id: 9,
      title: 'Resolving Remaining Bars',
      explanation: 'Still at 0. 0 < 2. Pop index 4. Height=2. Left boundary is 1. Width = 6 - 1 - 1 = 4. Area = 2 * 4 = 8. maxArea stays 10.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 6, stack: [1], maxArea: 10, action: '0 < 2. Pop 4, Area=8.' },
    },
    {
      id: 10,
      title: 'Final Calculation',
      explanation: 'Still at 0. 0 < 1. Pop index 1. Height=1. Stack is empty. Width = 6 - 0 = 6. Area = 1 * 6 = 6. maxArea stays 10. The algorithm finishes with a maximum area of 10.',
      state: { array: [2, 1, 5, 6, 2, 3], currentIdx: 6, stack: [], maxArea: 10, action: '0 < 1. Pop 1, Area=6. Done.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class LargestRectangle {
    public int largestRectangleArea(int[] heights) {
        Stack<Integer> stack = new Stack<>();
        int maxArea = 0;
        
        for (int i = 0; i <= heights.length; i++) {
            int currentHeight = (i == heights.length) ? 0 : heights[i];
            
            while (!stack.isEmpty() && currentHeight < heights[stack.peek()]) {
                int height = heights[stack.pop()];
                int width = stack.isEmpty() ? i : i - stack.peek() - 1;
                maxArea = Math.max(maxArea, height * width);
            }
            stack.push(i);
        }
        return maxArea;
    }
}`,

  javaExplanation: [
    { line: 'for (int i = 0; i <= heights.length; i++)', note: 'Iterate one extra time with a height of 0 to pop everything off the stack at the end.' },
    { line: 'while (!stack.isEmpty() && currentHeight < heights[stack.peek()])', note: 'Pop while the current bar is shorter than the stack top. This means we found the right boundary.' },
    { line: 'int width = stack.isEmpty() ? i : i - stack.peek() - 1;', note: 'The width extends from the new stack top to the current index.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Each bar is pushed and popped at most once.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'For every bar, expand left and right until a shorter bar is found.',
  },

  commonMistakes: [
    { title: 'Forgetting the 0 sentinel', detail: 'If the array is strictly increasing, the stack will never be popped. Append a 0 to force resolution.' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
    { level: 'Hard', title: 'Maximal Rectangle', url: 'https://leetcode.com/problems/maximal-rectangle/' },
  ],

  quickRevision: [
    'Monotonic increasing stack.',
    'Append 0 to heights array.',
    'While current < stack top, pop and calc area.',
    'Width = current index - new stack top - 1.',
  ],
};

export const monotonicStackSubPatterns = [nextGreaterElement, dailyTemperatures, largestRectangle];

export const monotonicStackOverview = {
  id: 'monotonic-stack',
  title: 'Monotonic Stack',
  subtitle: 'Find next greater/smaller elements in O(N) time',
  introduction: 'A Monotonic Stack is a stack that is kept in either strictly increasing or strictly decreasing order. By enforcing this order, we can efficiently find the "Next Greater Element" or "Next Smaller Element" for every item in the array without using nested loops.',
  coreConcept: {
    what: 'A stack where elements are popped when a new element breaks the sorted order.',
    why: 'It acts as a waiting line. Elements wait in the stack until a larger (or smaller) element arrives to "resolve" them, ensuring every element is pushed and popped at most once.',
    when: 'Next Greater/Smaller Element, Stock Span, Largest Rectangle, Trapping Rain Water II.',
  },
  whenToUse: [
    'You need to find the next/previous greater or smaller element.',
    'The problem involves calculating a "span" or "range" based on boundaries.',
    'The problem asks for O(N) time where O(N²) is the naive approach.',
  ],
  recognitionClues: [
    '"Next greater element"',
    '"Daily temperatures"',
    '"Largest rectangle"',
    '"Stock span"',
  ],
  importantProperties: [
    'Stores indices, not values.',
    'Increasing stack: elements are smaller to larger.',
    'Decreasing stack: elements are larger to smaller.',
    'O(N) time, O(N) space.',
  ],
  comparison: [
    { aspect: 'Next Greater', when: 'Find next larger', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Daily Temp', when: 'Distance to larger', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Largest Rect', when: 'Histogram area', time: 'O(N)', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Using values instead of indices', detail: 'You need the index to calculate distance or width. Always push the index.' },
    { title: 'Forgetting strict vs non-strict comparisons', detail: 'Decide if equal values should pop or stay in the stack based on the problem.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/' },
    { level: 'Medium', title: 'Next Greater Element I', url: 'https://leetcode.com/problems/next-greater-element-i/' },
    { level: 'Medium', title: 'Next Greater Element II', url: 'https://leetcode.com/problems/next-greater-element-ii/' },
    { level: 'Hard', title: 'Largest Rectangle in Histogram', url: 'https://leetcode.com/problems/largest-rectangle-in-histogram/' },
  ],
};