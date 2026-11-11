// ============================================================
// SUBSETS — The Decision Tree (Include/Exclude)
// ============================================================
export const subsets = {
  id: 'subsets',
  patternId: 'backtracking',
  title: 'Subsets',
  subtitle: 'The Decision Tree',
  type: 'subsets',
  difficulty: 'Medium',

  coreConcept: {
    what: 'At every element, you make a binary decision: either INCLUDE it in the current subset, or EXCLUDE it.',
    why: 'Backtracking explores this decision tree. We add an element, explore all paths with it, then remove it (backtrack) and explore all paths without it.',
    when: 'Generating all combinations, permutations, or power sets where order does not matter.',
    properties: [
      'Every element is processed exactly once.',
      'The recursion tree has 2^N leaves (for N elements).',
      'Requires adding the current path to the result at EVERY node, not just leaves.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Generate all subsets / power set".',
      '"Find all combinations".',
      'The order of elements does not matter.',
    ],
    inputs: ['Array of unique integers'],
    constraints: ['O(N * 2^N) time', 'O(N) space (recursion stack)'],
  },

  steps: [
    {
      id: 0,
      title: 'Start with Empty',
      explanation: 'We start with an empty subset []. We are at index 0 (value 1).',
      state: {
        array: [1, 2, 3], path: [], result: [[]], currentIdx: 0, action: 'Start with empty subset.',
      },
    },
    {
      id: 1,
      title: 'Include 1',
      explanation: 'We INCLUDE 1. The path becomes [1]. We add it to the result. Then we go deeper to index 1.',
      state: {
        array: [1, 2, 3], path: [1], result: [[], [1]], currentIdx: 1, action: 'Include 1. Path: [1].',
      },
    },
    {
      id: 2,
      title: 'Include 2',
      explanation: 'Include 2. Path becomes [1, 2]. Add to result. Go to index 2.',
      state: {
        array: [1, 2, 3], path: [1, 2], result: [[], [1], [1, 2]], currentIdx: 2, action: 'Include 2. Path: [1, 2].',
      },
    },
    {
      id: 3,
      title: 'Include 3',
      explanation: 'Include 3. Path becomes [1, 2, 3]. Add to result. We hit the end of the array, so we BACKTRACK (pop 3).',
      state: {
        array: [1, 2, 3], path: [1, 2, 3], result: [[], [1], [1, 2], [1, 2, 3]], currentIdx: 3, action: 'Include 3. Backtrack.',
      },
    },
    {
      id: 4,
      title: 'Exclude 3',
      explanation: 'After backtracking, we EXCLUDE 3. The path goes back to [1, 2].',
      state: {
        array: [1, 2, 3], path: [1, 2], result: [[], [1], [1, 2], [1, 2, 3]], currentIdx: 3, action: 'Exclude 3. Back to [1, 2].',
      },
    },
    {
      id: 5,
      title: 'Backtrack to 2',
      explanation: 'We backtrack all the way up to the decision for 2. We pop 2. Path is [1]. Then we exclude 2.',
      state: {
        array: [1, 2, 3], path: [1], result: [[], [1], [1, 2], [1, 2, 3]], currentIdx: 1, action: 'Backtrack to 1. Path: [1].',
      },
    },
  ],

  javaCode: `import java.util.*;

public class Subsets {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        backtrack(nums, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] nums, int start, List<Integer> path, List<List<Integer>> result) {
        // Add the current path to the result at EVERY node
        result.add(new ArrayList<>(path));

        // Explore choices
        for (int i = start; i < nums.length; i++) {
            path.add(nums[i]);                // 1. Include
            backtrack(nums, i + 1, path, result); // 2. Recurse
            path.remove(path.size() - 1);     // 3. Exclude (Backtrack)
        }
    }
}`,

  javaExplanation: [
    { line: 'result.add(new ArrayList<>(path));', note: 'We make a deep copy because `path` is mutated during backtracking.' },
    { line: 'path.add(nums[i]);', note: 'Make a choice: include the current element.' },
    { line: 'backtrack(nums, i + 1, path, result);', note: 'Explore all paths from this choice.' },
    { line: 'path.remove(path.size() - 1);', note: 'Undo the choice (backtrack) to try the next option.' },
  ],

  complexity: {
    time: 'O(N * 2^N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'There are 2^N subsets, and it takes O(N) to copy each subset into the result array. The recursion stack goes N levels deep.',
  },

  bruteForce: {
    time: 'O(2^N)',
    space: 'O(N)',
    note: 'Using bit manipulation (0 to 2^N - 1) to generate subsets is a valid non-recursive alternative.',
  },

  commonMistakes: [
    { title: 'Adding a reference instead of a copy', detail: 'If you do `result.add(path)`, all subsets will be empty because `path` is modified by reference.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/' },
    { level: 'Medium', title: 'Subsets II', url: 'https://leetcode.com/problems/subsets-ii/' },
  ],

  quickRevision: [
    'Add current path to result.',
    'Loop from start to end.',
    'Add to path, recurse, remove from path.',
  ],
};

// ============================================================
// PERMUTATIONS — The Swapping Game
// ============================================================
export const permutations = {
  id: 'permutations',
  patternId: 'backtracking',
  title: 'Permutations',
  subtitle: 'The Swapping Game',
  type: 'permutations',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Generating all possible orderings of a set of elements.',
    why: 'Unlike subsets, order matters. We can generate permutations by picking an element, and then recursively finding permutations for the remaining elements.',
    when: 'When you need all possible orderings, and order matters.',
    properties: [
      'The recursion tree is N! (N factorial) nodes deep.',
      'We use a `used` boolean array to keep track of chosen elements.',
      'Every result will have exactly N elements.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Generate all permutations".',
      '"Find all possible arrangements".',
      'Order matters!',
    ],
    inputs: ['Array of unique integers'],
    constraints: ['O(N * N!) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Empty Path',
      explanation: 'We start with an empty path. Available elements: [1, 2, 3].',
      state: {
        array: [1, 2, 3], path: [], result: [], used: [false, false, false], action: 'Start empty.',
      },
    },
    {
      id: 1,
      title: 'Pick 1',
      explanation: 'Pick 1. Mark it as used. Path is [1].',
      state: {
        array: [1, 2, 3], path: [1], result: [], used: [true, false, false], action: 'Pick 1.',
      },
    },
    {
      id: 2,
      title: 'Pick 2',
      explanation: 'Pick 2. Mark as used. Path is [1, 2].',
      state: {
        array: [1, 2, 3], path: [1, 2], result: [], used: [true, true, false], action: 'Pick 2.',
      },
    },
    {
      id: 3,
      title: 'Pick 3 (Complete)',
      explanation: 'Pick 3. Path is [1, 2, 3]. This is a full permutation! Add to result. Backtrack.',
      state: {
        array: [1, 2, 3], path: [1, 2, 3], result: [[1, 2, 3]], used: [true, true, true], action: 'Complete! Backtrack.',
      },
    },
    {
      id: 4,
      title: 'Try Next Option',
      explanation: 'Backtrack: remove 3, unmark it. Backtrack: remove 2, unmark it. Try picking 3 instead.',
      state: {
        array: [1, 2, 3], path: [1], result: [[1, 2, 3]], used: [true, false, false], action: 'Backtracked to [1]. Try picking 3 next.',
      },
    },
  ],

  javaCode: `import java.util.*;

public class Permutations {
    public List<List<Integer>> permute(int[] nums) {
        List<List<Integer>> result = new ArrayList<>();
        boolean[] used = new boolean[nums.length];
        backtrack(nums, new ArrayList<>(), used, result);
        return result;
    }

    private void backtrack(int[] nums, List<Integer> path, boolean[] used, List<List<Integer>> result) {
        // Base case: full permutation
        if (path.size() == nums.length) {
            result.add(new ArrayList<>(path));
            return;
        }

        for (int i = 0; i < nums.length; i++) {
            if (used[i]) continue; // Skip already used elements

            used[i] = true;              // 1. Make choice
            path.add(nums[i]);
            
            backtrack(nums, path, used, result); // 2. Recurse
            
            used[i] = false;             // 3. Undo choice
            path.remove(path.size() - 1);
        }
    }
}`,

  javaExplanation: [
    { line: 'if (path.size() == nums.length)', note: 'Base case: we have made N choices, so we have a full permutation.' },
    { line: 'if (used[i]) continue;', note: 'We cannot pick the same element twice in one path.' },
    { line: 'used[i] = true;', note: 'Mark the element as used before exploring deeper.' },
    { line: 'used[i] = false;', note: 'Crucial for backtracking: unmark it so it can be used in a different branch.' },
  ],

  complexity: {
    time: 'O(N * N!)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'There are N! permutations, and copying each into the result takes O(N). The recursion depth is N.',
  },

  bruteForce: {
    time: 'O(N!)',
    space: 'O(N)',
    note: 'Using C++ `next_permutation` or Python `itertools.permutations` is faster and uses built-in libraries.',
  },

  commonMistakes: [
    { title: 'Forgetting to unmark used', detail: 'If you don\'t set `used[i] = false` after the recursive call, the next branch will think the element is still in use.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/' },
    { level: 'Medium', title: 'Permutations II', url: 'https://leetcode.com/problems/permutations-ii/' },
    { level: 'Hard', title: 'N-Queens', url: 'https://leetcode.com/problems/n-queens/' },
  ],

  quickRevision: [
    'Use a `used` array.',
    'Base case: path size == N.',
    'Loop all elements, skip if used.',
    'Mark used, add to path, recurse.',
    'Unmark used, remove from path.',
  ],
};

// ============================================================
// COMBINATION SUM — The Pruning
// ============================================================
export const combinationSum = {
  id: 'combination-sum',
  patternId: 'backtracking',
  title: 'Combination Sum',
  subtitle: 'The Pruning',
  type: 'combination-sum',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Finding combinations that sum to a target, where elements can be reused.',
    why: 'We recursively subtract the current element from the target. If the target hits 0, we found a valid combination. If it goes below 0, we PRUNE the branch (stop early).',
    when: 'When there is a target sum, and you need to generate combinations with pruning.',
    properties: [
      'Elements can be reused (stay at the same index).',
      'Pruning saves massive amounts of time.',
      'Sorting the array helps prune earlier.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Combination sum".',
      '"Target sum".',
      'Elements can be reused.',
    ],
    inputs: ['Array of positive integers', 'Target integer'],
    constraints: ['O(N^(T/M)) time (T = target, M = min element)', 'O(T/M) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Target: 5',
      explanation: 'Candidates: [2, 3, 5]. Target is 5. Start at index 0 (value 2).',
      state: {
        array: [2, 3, 5], target: 5, path: [], result: [], currentIdx: 0, action: 'Target 5. Try 2.',
      },
    },
    {
      id: 1,
      title: 'Pick 2',
      explanation: 'Pick 2. Target becomes 5 - 2 = 3. Path: [2].',
      state: {
        array: [2, 3, 5], target: 3, path: [2], result: [], currentIdx: 0, action: 'Remaining target: 3.',
      },
    },
    {
      id: 2,
      title: 'Pick 2 Again',
      explanation: 'Pick 2 again. Target becomes 3 - 2 = 1. Path: [2, 2].',
      state: {
        array: [2, 3, 5], target: 1, path: [2, 2], result: [], currentIdx: 0, action: 'Remaining target: 1.',
      },
    },
    {
      id: 3,
      title: 'Prune!',
      explanation: 'Target is 1. If we try to pick 2 again, target becomes -1. Since the array is sorted, all future numbers will also be too big. We PRUNE this branch.',
      state: {
        array: [2, 3, 5], target: -1, path: [2, 2, 2], result: [], currentIdx: 0, action: 'Pruned! Target < 0.',
      },
    },
    {
      id: 4,
      title: 'Backtrack & Try 3',
      explanation: 'We backtrack to path [2] (target 3). Try picking 3. Target becomes 0! Path [2, 3] is valid.',
      state: {
        array: [2, 3, 5], target: 0, path: [2, 3], result: [[2, 3]], currentIdx: 1, action: 'Found [2, 3]! Backtrack.',
      },
    },
  ],

  javaCode: `import java.util.*;

public class CombinationSum {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        List<List<Integer>> result = new ArrayList<>();
        Arrays.sort(candidates); // Sort to enable pruning
        backtrack(candidates, target, 0, new ArrayList<>(), result);
        return result;
    }

    private void backtrack(int[] candidates, int remain, int start, List<Integer> path, List<List<Integer>> result) {
        // Base cases
        if (remain == 0) {
            result.add(new ArrayList<>(path));
            return;
        }
        if (remain < 0) return; // Prune

        for (int i = start; i < candidates.length; i++) {
            path.add(candidates[i]);
            // Stay at 'i' because we can reuse the same number
            backtrack(candidates, remain - candidates[i], i, path, result);
            path.remove(path.size() - 1); // Backtrack
        }
    }
}`,

  javaExplanation: [
    { line: 'if (remain < 0) return;', note: 'Pruning: if the remaining target drops below 0, this path can never succeed.' },
    { line: 'backtrack(..., remain - candidates[i], i, ...);', note: 'Pass `i` instead of `i+1` so the same number can be reused.' },
    { line: 'path.remove(path.size() - 1);', note: 'Standard backtracking cleanup.' },
  ],

  complexity: {
    time: 'O(N^(T/M))',
    space: 'O(T/M)',
    aux: 'O(T/M)',
    explanation: 'Where T is the target and M is the minimum element. The recursion tree is fairly wide because we can reuse elements.',
  },

  bruteForce: {
    time: 'O(N^T)',
    space: 'O(T)',
    note: 'Without pruning, the recursion tree explores all possible combinations of the array.',
  },

  commonMistakes: [
    { title: 'Passing i + 1 instead of i', detail: 'If you pass `i + 1`, you cannot reuse the same element, which changes the problem to Combination Sum III.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/' },
    { level: 'Medium', title: 'Combination Sum II', url: 'https://leetcode.com/problems/combination-sum-ii/' },
    { level: 'Medium', title: 'Combination Sum III', url: 'https://leetcode.com/problems/combination-sum-iii/' },
  ],

  quickRevision: [
    'Sort array.',
    'Base case: remain == 0 (add to result).',
    'Base case: remain < 0 (prune).',
    'Recurse with `i` (reuse) or `i+1` (no reuse).',
  ],
};

export const backtrackingSubPatterns = [subsets, permutations, combinationSum];

export const backtrackingOverview = {
  id: 'backtracking',
  title: 'Backtracking',
  subtitle: 'Explore all possibilities, prune the bad ones',
  introduction: 'Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, and removing those solutions that fail to satisfy the constraints of the problem at any point in time. It is essentially a refined brute-force search.',
  coreConcept: {
    what: 'Making a choice, exploring it fully, and then undoing the choice to try the next option.',
    why: 'It allows you to explore complex decision trees (combinations, permutations, puzzles) without running out of memory, as it only holds the current path in memory.',
    when: 'Permutations, combinations, subsets, N-Queens, Sudoku Solver.',
  },
  whenToUse: [
    'The problem asks for ALL possible combinations or arrangements.',
    'There are constraints that allow you to PRUNE (stop early) on bad paths.',
    'The solution can be represented as a path from root to leaf in a decision tree.',
  ],
  recognitionClues: [
    '"Generate all..."',
    '"Find all valid combinations..."',
    '"Solve the puzzle..." (Sudoku, N-Queens)',
  ],
  importantProperties: [
    'Uses recursion.',
    'Standard template: Choose -> Explore -> Un-choose.',
    'State is maintained via the recursion stack and path array.',
  ],
  comparison: [
    { aspect: 'Subsets', when: 'Include/Exclude', time: 'O(N * 2^N)', space: 'O(N)' },
    { aspect: 'Permutations', when: 'Order matters', time: 'O(N * N!)', space: 'O(N)' },
    { aspect: 'Combination Sum', when: 'Target sum + Reuse', time: 'O(N^(T/M))', space: 'O(T/M)' },
  ],
  commonMistakes: [
    { title: 'Not copying the path', detail: 'When you add to the result, use `new ArrayList<>(path)` instead of `path`, otherwise all results will point to the same empty array.' },
    { title: 'Forgetting to undo the choice', detail: 'If you don\'t remove the last element from the path (or unmark used), the next branch will be corrupted.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/' },
    { level: 'Medium', title: 'Permutations', url: 'https://leetcode.com/problems/permutations/' },
    { level: 'Medium', title: 'Combination Sum', url: 'https://leetcode.com/problems/combination-sum/' },
    { level: 'Hard', title: 'N-Queens', url: 'https://leetcode.com/problems/n-queens/' },
  ],
};