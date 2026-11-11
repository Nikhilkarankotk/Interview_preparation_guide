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
      title: 'Start the Line',
      explanation: 'We want to find the next greater element for each number. We push the index of the first element (2) onto the stack.',
      state: {
        array: [2, 1, 2, 4, 3], currentIdx: 0, stack: [0], result: [], action: 'Push 2 (index 0).',
      },
    },
    {
      id: 1,
      title: 'Smaller Element Arrives',
      explanation: 'Next is 1. It is smaller than the top of the stack (2). It cannot resolve 2. We push it and wait.',
      state: {
        array: [2, 1, 2, 4, 3], currentIdx: 1, stack: [0, 1], result: [], action: '1 < 2. Push 1 (index 1).',
      },
    },
    {
      id: 2,
      title: 'Resolver Arrives',
      explanation: 'Next is 2. It is greater than the top of the stack (1). We pop 1 and record 2 as its next greater element. 2 is also equal to the new top (2), so we stop popping and push 2.',
      state: {
        array: [2, 1, 2, 4, 3], currentIdx: 2, stack: [0, 2], result: [null, 2], action: '2 > 1. Pop 1, ans[1]=2. Push index 2.',
      },
    },
    {
      id: 3,
      title: 'Big Resolver',
      explanation: 'Next is 4. It is greater than 2 and 2. We pop both, recording 4 as their answer.',
      state: {
        array: [2, 1, 2, 4, 3], currentIdx: 3, stack: [3], result: [4, 2, 4], action: '4 > 2. Pop 2, ans[2]=4. Pop 2, ans[0]=4.',
      },
    },
    {
      id: 4,
      title: 'Finish',
      explanation: 'Next is 3. Push it. End of array. Any indices left in the stack have no next greater element (return -1).',
      state: {
        array: [2, 1, 2, 4, 3], currentIdx: 4, stack: [3, 4], result: [4, 2, 4, -1, -1], action: 'Push 3. End of array.', found: true,
      },
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
      explanation: 'Temperature is 73. We push its index (0) onto the stack.',
      state: {
        array: [73, 74, 75, 71, 69, 72, 76, 73], currentIdx: 0, stack: [0], result: [0, 0, 0, 0, 0, 0, 0, 0], action: 'Push Day 0.',
      },
    },
    {
      id: 1,
      title: 'Warmer Day!',
      explanation: 'Day 1 is 74, which is warmer than 73. Pop index 0. The distance is 1 - 0 = 1. Push index 1.',
      state: {
        array: [73, 74, 75, 71, 69, 72, 76, 73], currentIdx: 1, stack: [1], result: [1, 0, 0, 0, 0, 0, 0, 0], action: '74 > 73. Pop 0. ans[0] = 1.',
      },
    },
    {
      id: 2,
      title: 'Colder Days',
      explanation: 'Days 2, 3, and 4 are 75, 71, 69. They are colder than the previous days, so we just push them and wait.',
      state: {
        array: [73, 74, 75, 71, 69, 72, 76, 73], currentIdx: 4, stack: [2, 3, 4], result: [1, 1, 0, 0, 0, 0, 0, 0], action: 'Push 75, 71, 69.',
      },
    },
    {
      id: 3,
      title: 'Resolving Day 4 and 3',
      explanation: 'Day 5 is 72. It resolves 69 (Day 4) and 71 (Day 3). Distances: 5-4=1, 5-3=2.',
      state: {
        array: [73, 74, 75, 71, 69, 72, 76, 73], currentIdx: 5, stack: [2, 5], result: [1, 1, 0, 2, 1, 0, 0, 0], action: '72 > 69 (ans=1), 72 > 71 (ans=2).',
      },
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
      title: 'Start Stack',
      explanation: 'Heights: [2, 1, 5, 6, 2, 3]. Stack holds indices. Push 0 (height 2).',
      state: {
        array: [2, 1, 5, 6, 2, 3], currentIdx: 0, stack: [0], maxArea: 0, action: 'Push index 0.',
      },
    },
    {
      id: 1,
      title: 'Shorter Bar',
      explanation: 'Current is 1. It is shorter than height 2. Pop index 0. Area = 2 * (1 - 0) = 2. Max = 2. Push index 1.',
      state: {
        array: [2, 1, 5, 6, 2, 3], currentIdx: 1, stack: [1], maxArea: 2, action: 'Pop 0. Area = 2*1 = 2.',
      },
    },
    {
      id: 2,
      title: 'Taller Bars',
      explanation: 'Heights 5 and 6 are taller. We push their indices.',
      state: {
        array: [2, 1, 5, 6, 2, 3], currentIdx: 3, stack: [1, 2, 3], maxArea: 2, action: 'Push 2, 3.',
      },
    },
    {
      id: 3,
      title: 'Shorter Bar Resolves 6',
      explanation: 'Current is 2. Pop index 3 (height 6). Area = 6 * (4 - 2 - 1) = 6. Max = 6.',
      state: {
        array: [2, 1, 5, 6, 2, 3], currentIdx: 4, stack: [1, 2], maxArea: 6, action: 'Pop 3. Area = 6*1 = 6.',
      },
    },
    {
      id: 4,
      title: 'Shorter Bar Resolves 5',
      explanation: 'Still current is 2. Pop index 2 (height 5). Area = 5 * (4 - 1 - 1) = 10. Max = 10.',
      state: {
        array: [2, 1, 5, 6, 2, 3], currentIdx: 4, stack: [1], maxArea: 10, action: 'Pop 2. Area = 5*2 = 10.',
      },
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