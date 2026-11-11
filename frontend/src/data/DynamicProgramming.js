// ============================================================
// 1D DP — Climbing Stairs
// ============================================================
export const climbingStairs = {
  id: 'climbing-stairs',
  patternId: 'dynamic-programming',
  title: '1D DP (Climbing Stairs)',
  subtitle: 'The Domino Effect',
  type: 'climbing-stairs',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Build the solution to the current state by adding the solutions to the previous states.',
    why: 'To reach step N, you must come from either step N-1 or step N-2. Therefore, the number of ways to reach step N is the sum of the ways to reach N-1 and N-2.',
    when: 'When the problem asks for the number of ways to do something, and the choices are limited to 1 or 2 steps.',
    properties: [
      'Uses a 1D array (or just two variables) to store previous states.',
      'Base cases: dp[0] = 1, dp[1] = 1.',
      'Recurrence relation: dp[i] = dp[i-1] + dp[i-2].',
    ],
  },

  patternRecognition: {
    clues: [
      '"How many ways to reach the top".',
      '"You can climb 1 or 2 steps".',
      'Fibonacci sequence patterns.',
    ],
    inputs: ['Integer N'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Base Cases',
      explanation: 'N = 5. We start at step 0 (1 way to stay) and step 1 (1 way to reach).',
      state: {
        dp: [1, 1, 0, 0, 0, 0], currentIdx: 1, action: 'Base cases: dp[0]=1, dp[1]=1.',
      },
    },
    {
      id: 1,
      title: 'Step 2',
      explanation: 'dp[2] = dp[1] + dp[0] = 1 + 1 = 2.',
      state: {
        dp: [1, 1, 2, 0, 0, 0], currentIdx: 2, prev1: 1, prev2: 0, action: 'dp[2] = 1 + 1 = 2.',
      },
    },
    {
      id: 2,
      title: 'Step 3',
      explanation: 'dp[3] = dp[2] + dp[1] = 2 + 1 = 3.',
      state: {
        dp: [1, 1, 2, 3, 0, 0], currentIdx: 3, prev1: 2, prev2: 1, action: 'dp[3] = 2 + 1 = 3.',
      },
    },
    {
      id: 3,
      title: 'Step 4',
      explanation: 'dp[4] = dp[3] + dp[2] = 3 + 2 = 5.',
      state: {
        dp: [1, 1, 2, 3, 5, 0], currentIdx: 4, prev1: 3, prev2: 2, action: 'dp[4] = 3 + 2 = 5.',
      },
    },
    {
      id: 4,
      title: 'Step 5',
      explanation: 'dp[5] = dp[4] + dp[3] = 5 + 3 = 8. The answer is 8.',
      state: {
        dp: [1, 1, 2, 3, 5, 8], currentIdx: 5, prev1: 5, prev2: 3, action: 'dp[5] = 5 + 3 = 8.', found: true,
      },
    },
  ],

  javaCode: `public class ClimbingStairs {
    public int climbStairs(int n) {
        if (n <= 2) return n;
        
        int prev2 = 1; // dp[0]
        int prev1 = 1; // dp[1]
        
        for (int i = 2; i <= n; i++) {
            int current = prev1 + prev2;
            prev2 = prev1;
            prev1 = current;
        }
        return prev1;
    }
}`,

  javaExplanation: [
    { line: 'int prev2 = 1; int prev1 = 1;', note: 'We only need to keep track of the last two steps to calculate the next one.' },
    { line: 'int current = prev1 + prev2;', note: 'The recurrence relation: current = step N-1 + step N-2.' },
    { line: 'prev2 = prev1; prev1 = current;', note: 'Slide the window forward.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We iterate up to N, but only use two variables to store the previous states.',
  },

  bruteForce: {
    time: 'O(2^N)',
    space: 'O(N)',
    note: 'Recursive DFS exploring all paths. Extremely slow due to overlapping subproblems.',
  },

  commonMistakes: [
    { title: 'Not using memoization', detail: 'If you write a recursive solution without caching, it will time out. DP solves this.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/' },
    { level: 'Easy', title: 'Fibonacci Number', url: 'https://leetcode.com/problems/fibonacci-number/' },
  ],

  quickRevision: [
    'Base cases: dp[0]=1, dp[1]=1.',
    'Recurrence: dp[i] = dp[i-1] + dp[i-2].',
    'Optimize space to O(1) by keeping only 2 vars.',
  ],
};

// ============================================================
// 0/1 KNAPSACK — The Thief
// ============================================================
export const knapsack = {
  id: 'knapsack',
  patternId: 'dynamic-programming',
  title: '0/1 Knapsack',
  subtitle: 'The Thief',
  type: 'knapsack',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Given a set of items with weights and values, find the maximum value you can fit in a bag of capacity W.',
    why: 'For each item, you have two choices: take it (if it fits) or leave it. DP stores the maximum value for every possible capacity up to W.',
    when: 'Subset sum, partition equal subset sum, coin change.',
    properties: [
      'Uses a 2D matrix of size (items + 1) x (capacity + 1).',
      'Rows represent items, columns represent capacity.',
      'If item weight > capacity, inherit value from above.',
      'Else, max of (take item, skip item).',
    ],
  },

  patternRecognition: {
    clues: [
      '"Pick items to maximize value".',
      '"Subset sum".',
      '"Partition equal subset sum".',
    ],
    inputs: ['Array of item weights', 'Array of item values', 'Capacity W'],
    constraints: ['O(N * W) time', 'O(N * W) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Matrix',
      explanation: 'Items: weights [1, 3, 4, 5], values [1, 4, 5, 7]. Capacity = 7. We create a DP table filled with 0s.',
      state: {
        dp: [[0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]],
        row: 0, col: 0, item: '', action: 'Initialize 5x8 matrix with 0s.',
      },
    },
    {
      id: 1,
      title: 'Process Item 1',
      explanation: 'Item 1 (weight 1, value 1). For capacities 1 to 7, we can take it. dp[1][1] = 1.',
      state: {
        dp: [[0,0,0,0,0,0,0,0], [0,1,1,1,1,1,1,1], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]],
        row: 1, col: 1, item: 'Item 1', action: 'Take item 1.',
      },
    },
    {
      id: 2,
      title: 'Process Item 2',
      explanation: 'Item 2 (weight 3, value 4). At capacity 3, we can take it. dp[2][3] = max(dp[1][3], dp[1][0] + 4) = max(1, 4) = 4.',
      state: {
        dp: [[0,0,0,0,0,0,0,0], [0,1,1,1,1,1,1,1], [0,1,1,4,5,5,5,5], [0,0,0,0,0,0,0,0], [0,0,0,0,0,0,0,0]],
        row: 2, col: 3, item: 'Item 2', action: 'dp[2][3] = max(1, 4) = 4.',
      },
    },
    {
      id: 3,
      title: 'Process Item 3',
      explanation: 'Item 3 (weight 4, value 5). At capacity 4, dp[3][4] = max(dp[2][4], dp[2][0] + 5) = max(5, 5) = 5.',
      state: {
        dp: [[0,0,0,0,0,0,0,0], [0,1,1,1,1,1,1,1], [0,1,1,4,5,5,5,5], [0,1,1,4,5,6,6,9], [0,0,0,0,0,0,0,0]],
        row: 3, col: 4, item: 'Item 3', action: 'dp[3][4] = max(5, 5) = 5.',
      },
    },
    {
      id: 4,
      title: 'Process Item 4',
      explanation: 'Item 4 (weight 5, value 7). The final answer at dp[4][7] is 9.',
      state: {
        dp: [[0,0,0,0,0,0,0,0], [0,1,1,1,1,1,1,1], [0,1,1,4,5,5,5,5], [0,1,1,4,5,6,6,9], [0,1,1,4,5,7,8,9]],
        row: 4, col: 7, item: 'Item 4', action: 'Final max value is 9.', found: true,
      },
    },
  ],

  javaCode: `public class Knapsack {
    public int knapsack(int[] weights, int[] values, int W) {
        int n = weights.length;
        int[][] dp = new int[n + 1][W + 1];

        for (int i = 1; i <= n; i++) {
            for (int w = 1; w <= W; w++) {
                if (weights[i - 1] <= w) {
                    // Max of taking the item or skipping it
                    dp[i][w] = Math.max(
                        values[i - 1] + dp[i - 1][w - weights[i - 1]],
                        dp[i - 1][w]
                    );
                } else {
                    // Cannot fit the item
                    dp[i][w] = dp[i - 1][w];
                }
            }
        }
        return dp[n][W];
    }
}`,

  javaExplanation: [
    { line: 'int[][] dp = new int[n + 1][W + 1];', note: 'Extra row and column for 0 items and 0 capacity.' },
    { line: 'if (weights[i - 1] <= w)', note: 'Check if the current item fits in the current capacity.' },
    { line: 'Math.max(values[i - 1] + dp[i - 1][w - weights[i - 1]], dp[i - 1][w])', note: 'Take the max of including the item (value + best from remaining capacity) vs excluding it (best from previous items).' },
  ],

  complexity: {
    time: 'O(N * W)',
    space: 'O(N * W)',
    aux: 'O(N * W)',
    explanation: 'We iterate N items and W capacities. Space can be optimized to O(W) by using a 1D array.',
  },

  bruteForce: {
    time: 'O(2^N)',
    space: 'O(N)',
    note: 'Recursively try every subset of items.',
  },

  commonMistakes: [
    { title: 'Iterating wrong direction for 1D space optimization', detail: 'If optimizing space to 1D, you must iterate capacity from W down to 0 to avoid reusing the same item multiple times.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Partition Equal Subset Sum', url: 'https://leetcode.com/problems/partition-equal-subset-sum/' },
    { level: 'Medium', title: 'Target Sum', url: 'https://leetcode.com/problems/target-sum/' },
    { level: 'Medium', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/' },
  ],

  quickRevision: [
    'dp[i][w] = max value using first i items and capacity w.',
    'If item fits: max(take, skip).',
    'Else: skip.',
  ],
};

// ============================================================
// STRING DP — Longest Common Subsequence
// ============================================================
export const lcs = {
  id: 'lcs',
  patternId: 'dynamic-programming',
  title: 'String DP (LCS)',
  subtitle: 'The Common Thread',
  type: 'lcs',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the length of the longest subsequence common to both strings.',
    why: 'We compare characters from both strings. If they match, we add 1 to the result from the diagonally previous cell. If they don\'t, we take the max of the cell above or to the left.',
    when: 'Comparing two strings for similarity, edit distance, or diffing.',
    properties: [
      '2D matrix of size (len1 + 1) x (len2 + 1).',
      'Match: dp[i][j] = dp[i-1][j-1] + 1.',
      'Mismatch: dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
    ],
  },

  patternRecognition: {
    clues: [
      '"Longest common subsequence".',
      '"Edit distance".',
      '"Shortest common supersequence".',
    ],
    inputs: ['Two Strings'],
    constraints: ['O(N * M) time', 'O(N * M) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Matrix',
      explanation: 'String 1: "abcde", String 2: "ace". We create a 6x4 matrix of 0s.',
      state: {
        dp: [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
        row: 0, col: 0, str1: 'abcde', str2: 'ace', action: 'Initialize matrix.',
      },
    },
    {
      id: 1,
      title: 'Match "a"',
      explanation: 'str1[1] = "a", str2[1] = "a". They match! dp[1][1] = dp[0][0] + 1 = 1.',
      state: {
        dp: [[0,0,0,0], [0,1,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
        row: 1, col: 1, str1: 'abcde', str2: 'ace', action: 'Match "a". dp[1][1] = 1.',
      },
    },
    {
      id: 2,
      title: 'No Match "b" vs "c"',
      explanation: 'str1[2] = "b", str2[2] = "c". No match. Take max of top (1) and left (0). dp[2][2] = 1.',
      state: {
        dp: [[0,0,0,0], [0,1,1,1], [0,1,1,1], [0,0,0,0], [0,0,0,0], [0,0,0,0]],
        row: 2, col: 2, str1: 'abcde', str2: 'ace', action: 'No match. Take max(1, 1) = 1.',
      },
    },
    {
      id: 3,
      title: 'Match "c"',
      explanation: 'str1[3] = "c", str2[2] = "c". Match! dp[3][2] = dp[2][1] + 1 = 2.',
      state: {
        dp: [[0,0,0,0], [0,1,1,1], [0,1,1,1], [0,1,2,2], [0,0,0,0], [0,0,0,0]],
        row: 3, col: 2, str1: 'abcde', str2: 'ace', action: 'Match "c". dp[3][2] = 2.',
      },
    },
    {
      id: 4,
      title: 'Match "e"',
      explanation: 'str1[5] = "e", str2[3] = "e". Match! The final answer is 3.',
      state: {
        dp: [[0,0,0,0], [0,1,1,1], [0,1,1,1], [0,1,2,2], [0,1,2,2], [0,1,2,3]],
        row: 5, col: 3, str1: 'abcde', str2: 'ace', action: 'Final LCS length is 3.', found: true,
      },
    },
  ],

  javaCode: `public class LCS {
    public int longestCommonSubsequence(String text1, String text2) {
        int m = text1.length();
        int n = text2.length();
        int[][] dp = new int[m + 1][n + 1];

        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                if (text1.charAt(i - 1) == text2.charAt(j - 1)) {
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
                }
            }
        }
        return dp[m][n];
    }
}`,

  javaExplanation: [
    { line: 'if (text1.charAt(i - 1) == text2.charAt(j - 1))', note: 'Check if the current characters match (adjusting for 1-based indexing).' },
    { line: 'dp[i][j] = dp[i - 1][j - 1] + 1;', note: 'If they match, extend the LCS from the diagonal.' },
    { line: 'dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);', note: 'If they don\'t match, take the best result from skipping a character in either string.' },
  ],

  complexity: {
    time: 'O(M * N)',
    space: 'O(M * N)',
    aux: 'O(M * N)',
    explanation: 'Where M and N are the lengths of the two strings. Space can be optimized to O(min(M,N)) using 1D arrays.',
  },

  bruteForce: {
    time: 'O(2^(M+N))',
    space: 'O(M+N)',
    note: 'Recursive approach branching for every character match/mismatch.',
  },

  commonMistakes: [
    { title: 'Using 0-based indexing for the matrix', detail: 'The DP matrix needs an extra row and column for the empty string base case.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
    { level: 'Hard', title: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/' },
  ],

  quickRevision: [
    '2D matrix of size (M+1)x(N+1).',
    'Match: dp[i][j] = diag + 1.',
    'Mismatch: max(top, left).',
  ],
};

export const dpSubPatterns = [climbingStairs, knapsack, lcs];

export const dpOverview = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  subtitle: 'Break complex problems into overlapping subproblems',
  introduction: 'Dynamic Programming (DP) is a method for solving complex problems by breaking them down into simpler subproblems. It is only applicable when the problem has "optimal substructure" and "overlapping subproblems". We store the results of subproblems to avoid redundant computation (memoization/tabulation).',
  coreConcept: {
    what: 'Storing intermediate results to avoid recalculating the same state multiple times.',
    why: 'Turns exponential time complexity O(2^N) into polynomial time O(N^2) or O(N).',
    when: 'Optimization problems, counting paths, string comparisons, or subset sum.',
  },
  whenToUse: [
    'The problem asks for the maximum/minimum/number of ways.',
    'You can identify a recurrence relation.',
    'The recursive solution has overlapping subproblems.',
  ],
  recognitionClues: [
    '"Number of ways to..."',
    '"Maximum profit..."',
    '"Edit distance / LCS"',
    'Choices between "take it" or "leave it".',
  ],
  importantProperties: [
    'Optimal Substructure: optimal solution built from optimal sub-solutions.',
    'Overlapping Subproblems: the same sub-problem is solved multiple times.',
    'State & Transition: define what a state is, and how to move to the next.',
  ],
  comparison: [
    { aspect: '1D DP', when: 'Fibonacci, House Robber', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Knapsack', when: 'Subset Sum', time: 'O(N * W)', space: 'O(N * W)' },
    { aspect: 'String DP', when: 'LCS, Edit Distance', time: 'O(M * N)', space: 'O(M * N)' },
  ],
  commonMistakes: [
    { title: 'Wrong Base Cases', detail: 'A single incorrect base case will propagate errors through the entire DP table.' },
    { title: 'Trying to Greedy a DP problem', detail: 'If the problem has overlapping subproblems, a locally optimal choice (Greedy) will often fail to find the global optimum.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Climbing Stairs', url: 'https://leetcode.com/problems/climbing-stairs/' },
    { level: 'Medium', title: 'Coin Change', url: 'https://leetcode.com/problems/coin-change/' },
    { level: 'Medium', title: 'Longest Common Subsequence', url: 'https://leetcode.com/problems/longest-common-subsequence/' },
    { level: 'Hard', title: 'Edit Distance', url: 'https://leetcode.com/problems/edit-distance/' },
  ],
};