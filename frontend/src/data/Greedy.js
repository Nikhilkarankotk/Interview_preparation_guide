// ============================================================
// JUMP GAME — The Leap of Faith
// ============================================================
export const jumpGame = {
  id: 'jump-game',
  patternId: 'greedy',
  title: 'Jump Game',
  subtitle: 'The Leap of Faith',
  type: 'jump-game',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Track the maximum reachable index as you iterate through the array.',
    why: 'Instead of exploring every possible jump path (which would be exponential), we just keep track of the furthest index we can reach. If our current index passes the maximum reach, we are stuck.',
    when: 'Reachability problems, interval coverage, or when you only care about the furthest boundary.',
    properties: [
      'Single pass through the array.',
      'Greedy choice: always update the max reach with the current index + jump length.',
      'If max reach >= last index, success.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Jump Game".',
      '"Can you reach the end?".',
      '"Minimum number of jumps".',
    ],
    inputs: ['Array of non-negative integers'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start at 0',
      explanation: 'Array: [2, 3, 1, 1, 4]. We start at index 0. Our max reach is 0 + 2 = 2. We can reach index 1 or 2.',
      state: {
        array: [2, 3, 1, 1, 4], currentIdx: 0, maxReach: 2, action: 'Max reach is 2.',
      },
    },
    {
      id: 1,
      title: 'Move to 1',
      explanation: 'We move to index 1. We can jump up to 3 steps, which reaches index 1 + 3 = 4. Our max reach is updated to 4. We can now reach the end!',
      state: {
        array: [2, 3, 1, 1, 4], currentIdx: 1, maxReach: 4, action: 'Max reach updated to 4.',
      },
    },
    {
      id: 2,
      title: 'Success',
      explanation: 'Since max reach (4) >= last index (4), we return true.',
      state: {
        array: [2, 3, 1, 1, 4], currentIdx: 1, maxReach: 4, action: 'Can reach the end!', found: true,
      },
    },
  ],

  javaCode: `public class JumpGame {
    public boolean canJump(int[] nums) {
        int maxReach = 0;
        
        for (int i = 0; i < nums.length; i++) {
            // If we reach an index we can't actually get to, return false
            if (i > maxReach) return false;
            
            // Update the furthest we can reach
            maxReach = Math.max(maxReach, i + nums[i]);
            
            // Early exit if we can reach the end
            if (maxReach >= nums.length - 1) return true;
        }
        return true;
    }
}`,

  javaExplanation: [
    { line: 'if (i > maxReach) return false;', note: 'If the current index is greater than our furthest reach, we are stuck.' },
    { line: 'maxReach = Math.max(maxReach, i + nums[i]);', note: 'Greedy choice: update max reach with the current jump power.' },
    { line: 'if (maxReach >= nums.length - 1)', note: 'We can reach the end, so we can stop early.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We only iterate through the array once, and we only store the maxReach variable.',
  },

  bruteForce: {
    time: 'O(2^N)',
    space: 'O(N)',
    note: 'DFS/Backtracking exploring every possible jump from every index.',
  },

  commonMistakes: [
    { title: 'Forgetting the `i > maxReach` check', detail: 'If the array is [0, 1], you will never reach index 1. You must check if you are stuck.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/' },
    { level: 'Medium', title: 'Jump Game II', url: 'https://leetcode.com/problems/jump-game-ii/' },
    { level: 'Medium', title: 'Jump Game VII', url: 'https://leetcode.com/problems/jump-game-vii/' },
  ],

  quickRevision: [
    'Track maxReach.',
    'If i > maxReach, return false.',
    'Update maxReach.',
    'If maxReach >= end, return true.',
  ],
};

// ============================================================
// MERGE INTERVALS — The Scheduling
// ============================================================
export const mergeIntervals = {
  id: 'merge-intervals',
  patternId: 'greedy',
  title: 'Merge Intervals',
  subtitle: 'The Scheduling',
  type: 'merge-intervals',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Sort the intervals by their start times, then merge any overlapping intervals.',
    why: 'By sorting, we guarantee that if interval B overlaps with interval A, B\'s start time will be <= A\'s end time. This allows us to greedily merge them into one.',
    when: 'When you need to consolidate overlapping ranges, schedule meetings, or insert intervals.',
    properties: [
      'Sort by start time.',
      'If current.start <= previous.end, they overlap.',
      'Merge by taking the max of the end times.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Merge intervals".',
      '"Insert interval".',
      '"Meeting rooms".',
    ],
    inputs: ['Array of intervals [[start, end], ...]'],
    constraints: ['O(N log N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Sort Intervals',
      explanation: 'Intervals: [[1,3], [2,6], [8,10], [15,18]]. We sort them by start time (they are already sorted here).',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 0, merged: [[1,3]], action: 'Start with [1,3].',
      },
    },
    {
      id: 1,
      title: 'Check Overlap',
      explanation: 'Next interval is [2,6]. It starts at 2, which is <= the end of the last merged interval (3). So they overlap! We merge them into [1, max(3,6)] = [1,6].',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 1, merged: [[1,6]], action: 'Merge [1,3] and [2,6] -> [1,6].',
      },
    },
    {
      id: 2,
      title: 'No Overlap',
      explanation: 'Next interval is [8,10]. It starts at 8, which is > the end of the last merged interval (6). No overlap. Add it to the list.',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 2, merged: [[1,6], [8,10]], action: 'Add [8,10].',
      },
    },
    {
      id: 3,
      title: 'Finish',
      explanation: 'Next is [15,18]. 15 > 10. Add it. Final result: [[1,6], [8,10], [15,18]].',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 3, merged: [[1,6], [8,10], [15,18]], action: 'Final result.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class MergeIntervals {
    public int[][] merge(int[][] intervals) {
        if (intervals.length <= 1) return intervals;

        // 1. Sort by start time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));

        List<int[]> result = new ArrayList<>();
        int[] currentInterval = intervals[0];
        result.add(currentInterval);

        for (int[] interval : intervals) {
            int currentEnd = currentInterval[1];
            int nextStart = interval[0];
            int nextEnd = interval[1];

            if (nextStart <= currentEnd) {
                // Overlap! Merge by updating the end time
                currentInterval[1] = Math.max(currentEnd, nextEnd);
            } else {
                // No overlap, move to the next interval
                currentInterval = interval;
                result.add(currentInterval);
            }
        }
        return result.toArray(new int[result.size()][]);
    }
}`,

  javaExplanation: [
    { line: 'Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));', note: 'Sort by the start time of each interval.' },
    { line: 'if (nextStart <= currentEnd)', note: 'If the next interval starts before or when the current one ends, they overlap.' },
    { line: 'currentInterval[1] = Math.max(currentEnd, nextEnd);', note: 'Merge them by extending the end time to the maximum of the two.' },
  ],

  complexity: {
    time: 'O(N log N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Sorting takes O(N log N). The merge pass takes O(N) time. Space is O(N) to store the result.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(N)',
    note: 'Repeatedly compare every interval with every other interval to find overlaps.',
  },

  commonMistakes: [
    { title: 'Forgetting to sort', detail: 'If you don\'t sort by start time, you cannot guarantee that a single pass will work.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/' },
    { level: 'Medium', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/' },
    { level: 'Easy', title: 'Meeting Rooms', url: 'https://leetcode.com/problems/meeting-rooms/' },
  ],

  quickRevision: [
    'Sort by start time.',
    'Check if current.start <= previous.end.',
    'Merge by taking max(previous.end, current.end).',
  ],
};

// ============================================================
// GAS STATION — The Circuit
// ============================================================
export const gasStation = {
  id: 'gas-station',
  patternId: 'greedy',
  title: 'Gas Station',
  subtitle: 'The Circuit',
  type: 'gas-station',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the starting gas station index where you can travel around the circuit once without running out of gas.',
    why: 'If the total gas is less than the total cost, it is impossible. If it is possible, the greedy approach guarantees that the correct starting point is the one right after the point where your tank went negative.',
    when: 'Circuit problems, finding a valid starting index.',
    properties: [
      'If total gas < total cost, return -1.',
      'If tank drops below 0 at station i, the start must be i+1.',
      'One pass solution.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Gas Station".',
      '"Circuit".',
      '"Find the starting point".',
    ],
    inputs: ['Two arrays: gas[], cost[]'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Check Gas vs Cost',
      explanation: 'Gas: [1,2,3,4,5], Cost: [3,4,5,1,2]. Total gas = 15, Total cost = 15. It is possible!',
      state: {
        gas: [1,2,3,4,5], cost: [3,4,5,1,2], start: 0, tank: 0, total: 0, action: 'Total is possible.',
      },
    },
    {
      id: 1,
      title: 'Start at 0',
      explanation: 'At index 0: gas is 1, cost is 3. Tank becomes -2. We can\'t start here. The next possible start is index 1. Reset tank to 0.',
      state: {
        gas: [1,2,3,4,5], cost: [3,4,5,1,2], start: 1, tank: 0, total: -2, action: 'Tank < 0. Start = 1.',
      },
    },
    {
      id: 2,
      title: 'Start at 1',
      explanation: 'At index 1: gas is 2, cost is 4. Tank becomes -2. Can\'t start here. Start = 2.',
      state: {
        gas: [1,2,3,4,5], cost: [3,4,5,1,2], start: 2, tank: 0, total: -4, action: 'Tank < 0. Start = 2.',
      },
    },
    {
      id: 3,
      title: 'Start at 2',
      explanation: 'At index 2: gas is 3, cost is 5. Tank becomes -2. Can\'t start here. Start = 3.',
      state: {
        gas: [1,2,3,4,5], cost: [3,4,5,1,2], start: 3, tank: 0, total: -6, action: 'Tank < 0. Start = 3.',
      },
    },
    {
      id: 4,
      title: 'Start at 3',
      explanation: 'Index 3: gas 4, cost 1, tank +3. Index 4: gas 5, cost 2, tank +3. Total tank = 6. Start 3 works!',
      state: {
        gas: [1,2,3,4,5], cost: [3,4,5,1,2], start: 3, tank: 6, total: 0, action: 'Start 3 works!', found: true,
      },
    },
  ],

  javaCode: `public class GasStation {
    public int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0;
        int currentTank = 0;
        int startIndex = 0;

        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i] - cost[i];
            currentTank += gas[i] - cost[i];

            // If we can't reach the next station
            if (currentTank < 0) {
                startIndex = i + 1;
                currentTank = 0;
            }
        }
        return totalGas >= 0 ? startIndex : -1;
    }
}`,

  javaExplanation: [
    { line: 'totalGas += gas[i] - cost[i];', note: 'Track the overall gas to determine if a solution exists.' },
    { line: 'currentTank += gas[i] - cost[i];', note: 'Track the gas from the current starting point.' },
    { line: 'if (currentTank < 0)', note: 'If we run out of gas, this start point and all before it are invalid. The next possible start is i+1.' },
    { line: 'return totalGas >= 0 ? startIndex : -1;', note: 'If total gas is negative, it is impossible. Otherwise, startIndex is the answer.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We pass through the arrays exactly once, using only a few integer variables.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Try starting from every station and simulate the circuit.',
  },

  commonMistakes: [
    { title: 'Forgetting the total gas check', detail: 'You must verify that total gas >= total cost at the end, otherwise return -1.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/' },
  ],

  quickRevision: [
    'Track total gas and current tank.',
    'If current tank < 0, reset start to i+1.',
    'If total gas >= 0, return start.',
  ],
};

export const greedySubPatterns = [jumpGame, mergeIntervals, gasStation];

export const greedyOverview = {
  id: 'greedy',
  title: 'Greedy Algorithms',
  subtitle: 'Make the locally optimal choice for a globally optimal outcome',
  introduction: 'A Greedy algorithm makes the locally optimal choice at each stage with the hope of finding a global optimum. It is fast and simple, but it requires a proof that the greedy choice is actually safe. It is best used for optimization problems like scheduling, graph traversal, and interval problems.',
  coreConcept: {
    what: 'Making the best immediate choice at each step without reconsidering past choices.',
    why: 'It avoids the overhead of exploring all possibilities (like DP or Backtracking) and often results in O(N) or O(N log N) algorithms.',
    when: 'Interval scheduling, reachability, minimum coins, and when the problem has the "greedy choice property".',
  },
  whenToUse: [
    'The problem asks for a minimum or maximum.',
    'You can prove that a local choice leads to a global optimum.',
    'You want a faster solution than DP.',
  ],
  recognitionClues: [
    '"Jump Game".',
    '"Merge Intervals".',
    '"Gas Station".',
    '"Minimum number of coins".',
  ],
  importantProperties: [
    'No backtracking.',
    'Often requires sorting first.',
    'Requires a "greedy choice property" proof.',
  ],
  comparison: [
    { aspect: 'Jump Game', when: 'Reachability', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Merge Intervals', when: 'Scheduling', time: 'O(N log N)', space: 'O(N)' },
    { aspect: 'Gas Station', when: 'Circuit', time: 'O(N)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Greedy choice doesn\'t work everywhere', detail: 'For example, 0/1 Knapsack cannot be solved with greedy (you need DP). You must verify the greedy choice property.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Jump Game', url: 'https://leetcode.com/problems/jump-game/' },
    { level: 'Medium', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/' },
    { level: 'Medium', title: 'Gas Station', url: 'https://leetcode.com/problems/gas-station/' },
    { level: 'Medium', title: 'Task Scheduler', url: 'https://leetcode.com/problems/task-scheduler/' },
  ],
};