// ============================================================
// MERGE INTERVALS — The Consolidation
// ============================================================
export const mergeIntervals = {
  id: 'merge-intervals',
  patternId: 'intervals',
  title: 'Merge Intervals',
  subtitle: 'The Consolidation',
  type: 'merge-intervals',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Sort the intervals by their start times, then merge any overlapping intervals.',
    why: 'By sorting by start time, we guarantee that if interval B overlaps with interval A, B\'s start time will be <= A\'s end time. This allows us to compare them linearly.',
    when: 'When you need to consolidate overlapping ranges, schedule meetings, or unify time slots.',
    properties: [
      'Sort by start time.',
      'If current.start <= previous.end, they overlap.',
      'Merge by taking the max of the end times.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Merge intervals".',
      '"Overlapping intervals".',
      'Consolidating time ranges.',
    ],
    inputs: ['Array of intervals [[start, end], ...]'],
    constraints: ['O(N log N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start with First Interval',
      explanation: 'Intervals sorted by start time: [[1,3], [2,6], [8,10], [15,18]]. We start with [1,3] as our current interval.',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 0, merged: [[1,3]], action: 'Current interval: [1,3].',
      },
    },
    {
      id: 1,
      title: 'Check Overlap',
      explanation: 'Next is [2,6]. It starts at 2, which is <= the end of the current interval (3). They overlap! We merge them by taking max(3, 6) = 6. Current becomes [1,6].',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 1, merged: [[1,6]], action: 'Merge [1,3] and [2,6] -> [1,6].',
      },
    },
    {
      id: 2,
      title: 'No Overlap',
      explanation: 'Next is [8,10]. It starts at 8, which is > the end of current (6). No overlap. We add current to the result, and make [8,10] the new current.',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 2, merged: [[1,6], [8,10]], action: 'Add [1,6], move to [8,10].',
      },
    },
    {
      id: 3,
      title: 'Finish',
      explanation: 'Next is [15,18]. 15 > 10. Add [8,10] to result. [15,18] is the last interval. Final result: [[1,6], [8,10], [15,18]].',
      state: {
        intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 3, merged: [[1,6], [8,10], [15,18]], action: 'Final merged intervals.', found: true,
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
    { level: 'Easy', title: 'Meeting Rooms', url: 'https://leetcode.com/problems/meeting-rooms/' },
  ],

  quickRevision: [
    'Sort by start time.',
    'Check if current.start <= previous.end.',
    'Merge by taking max(previous.end, current.end).',
  ],
};

// ============================================================
// INSERT INTERVAL — The Three-Phase
// ============================================================
export const insertInterval = {
  id: 'insert-interval',
  patternId: 'intervals',
  title: 'Insert Interval',
  subtitle: 'The Three-Phase',
  type: 'insert-interval',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Insert a new interval into a sorted list of non-overlapping intervals, merging if necessary.',
    why: 'Instead of adding and re-sorting, we can process the array in three phases: (1) Add all intervals strictly before the new one, (2) Merge all overlapping intervals with the new one, (3) Add all remaining intervals.',
    when: 'Inserting into a schedule or a sorted list of intervals.',
    properties: [
      'Array is already sorted and non-overlapping.',
      'Three distinct phases.',
      'O(N) time, O(N) space.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Insert interval".',
      '"Add a new meeting".',
      'Input is already sorted.',
    ],
    inputs: ['Sorted Array of intervals', 'New interval'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Phase 1: Before',
      explanation: 'New interval is [4,8]. We add all intervals that end before the new interval starts. [1,2] ends before 4. Add it.',
      state: {
        intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [4,8], currentIdx: 0, merged: [[1,2]], action: 'Add [1,2].',
      },
    },
    {
      id: 1,
      title: 'Phase 2: Merge Overlaps',
      explanation: '[3,5] overlaps with [4,8] (5 >= 4). We merge them: start = min(3,4)=3, end = max(5,8)=8. New interval becomes [3,8].',
      state: {
        intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,8], currentIdx: 1, merged: [[1,2]], action: 'Merge [3,5] and [4,8] -> [3,8].',
      },
    },
    {
      id: 2,
      title: 'Keep Merging',
      explanation: '[6,7] overlaps with [3,8] (7 >= 3). Merge: start = min(3,6)=3, end = max(8,7)=8. Interval remains [3,8].',
      state: {
        intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,8], currentIdx: 2, merged: [[1,2]], action: 'Merge [6,7] -> [3,8].',
      },
    },
    {
      id: 3,
      title: 'Merge Final',
      explanation: '[8,10] overlaps with [3,8] (10 >= 3). Merge: start=3, end=max(8,10)=10. New interval is [3,10].',
      state: {
        intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,10], currentIdx: 3, merged: [[1,2]], action: 'Merge [8,10] -> [3,10].',
      },
    },
    {
      id: 4,
      title: 'Phase 3: After',
      explanation: '[12,16] starts after the merged interval ends (12 > 10). Add [3,10] to result. Add [12,16].',
      state: {
        intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,10], currentIdx: 4, merged: [[1,2], [3,10], [12,16]], action: 'Add [3,10] and [12,16].', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class InsertInterval {
    public int[][] insert(int[][] intervals, int[] newInterval) {
        List<int[]> result = new ArrayList<>();
        int i = 0;
        int n = intervals.length;

        // 1. Add all intervals that end before the new interval starts
        while (i < n && intervals[i][1] < newInterval[0]) {
            result.add(intervals[i]);
            i++;
        }

        // 2. Merge overlapping intervals
        while (i < n && intervals[i][0] <= newInterval[1]) {
            newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
            newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
            i++;
        }
        result.add(newInterval);

        // 3. Add remaining intervals
        while (i < n) {
            result.add(intervals[i]);
            i++;
        }

        return result.toArray(new int[result.size()][]);
    }
}`,

  javaExplanation: [
    { line: 'while (i < n && intervals[i][1] < newInterval[0])', note: 'Phase 1: Intervals completely to the left.' },
    { line: 'newInterval[0] = Math.min(newInterval[0], intervals[i][0]);', note: 'Phase 2: Expand the new interval to cover the overlap.' },
    { line: 'newInterval[1] = Math.max(newInterval[1], intervals[i][1]);', note: 'Phase 2: Update the end time.' },
    { line: 'while (i < n)', note: 'Phase 3: Add all remaining intervals.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'We iterate through the array exactly once. Space is O(N) for the result list.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(N)',
    note: 'Add the new interval to the array and re-sort everything, then merge.',
  },

  commonMistakes: [
    { title: 'Forgetting to add the newInterval', detail: 'If the new interval does not overlap with anything, you still must add it to the result.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/' },
  ],

  quickRevision: [
    'Phase 1: Add all intervals strictly left.',
    'Phase 2: Merge all overlapping intervals.',
    'Phase 3: Add all intervals strictly right.',
  ],
};

// ============================================================
// NON-OVERLAPPING INTERVALS — The Eraser
// ============================================================
export const nonOverlappingIntervals = {
  id: 'non-overlapping-intervals',
  patternId: 'intervals',
  title: 'Non-Overlapping Intervals',
  subtitle: 'The Eraser',
  type: 'non-overlapping-intervals',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the minimum number of intervals you need to remove to make the rest of the intervals non-overlapping.',
    why: 'This is a classic greedy scheduling problem. To maximize the number of non-overlapping intervals, always keep the interval that ends the earliest.',
    when: 'When you need to remove the fewest elements to resolve conflicts.',
    properties: [
      'Sort by END time, not start time.',
      'Track the end time of the last kept interval.',
      'If the current interval starts before the last end, it overlaps. Remove it.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Remove minimum number of intervals".',
      '"Maximum non-overlapping intervals".',
      '"Erase overlap".',
    ],
    inputs: ['Array of intervals'],
    constraints: ['O(N log N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Sort by End Time',
      explanation: 'Intervals: [[1,2], [2,3], [3,4], [1,3]]. Sort by end time: [[1,2], [2,3], [1,3], [3,4]].',
      state: {
        intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 0, removed: 0, lastEnd: 2, action: 'Keep [1,2]. Last End = 2.',
      },
    },
    {
      id: 1,
      title: 'Check Next',
      explanation: 'Next is [2,3]. Start is 2, Last End is 2. No overlap (2 >= 2). Keep it. Last End = 3.',
      state: {
        intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 1, removed: 0, lastEnd: 3, action: 'Keep [2,3]. Last End = 3.',
      },
    },
    {
      id: 2,
      title: 'Overlap Detected',
      explanation: 'Next is [1,3]. Start is 1, which is < Last End (3). Overlap! We must remove it. Removed count = 1.',
      state: {
        intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 2, removed: 1, lastEnd: 3, action: 'Remove [1,3]. Count = 1.',
      },
    },
    {
      id: 3,
      title: 'Continue',
      explanation: 'Next is [3,4]. Start is 3, Last End is 3. No overlap. Keep it. Total removed: 1.',
      state: {
        intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 3, removed: 1, lastEnd: 4, action: 'Keep [3,4]. Final count: 1.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class NonOverlappingIntervals {
    public int eraseOverlapIntervals(int[][] intervals) {
        if (intervals.length == 0) return 0;

        // Sort by end time
        Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));

        int count = 0;
        int lastEnd = intervals[0][1];

        for (int i = 1; i < intervals.length; i++) {
            if (intervals[i][0] < lastEnd) {
                // Overlap! Remove current interval
                count++;
            } else {
                // No overlap, update the end time
                lastEnd = intervals[i][1];
            }
        }
        return count;
    }
}`,

  javaExplanation: [
    { line: 'Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));', note: 'Crucial: Sort by END time to keep the intervals that finish earliest.' },
    { line: 'if (intervals[i][0] < lastEnd)', note: 'If the current interval starts before the last kept interval ends, they overlap.' },
    { line: 'count++;', note: 'We choose to remove the current interval because it ends later, blocking fewer future intervals.' },
  ],

  complexity: {
    time: 'O(N log N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Sorting takes O(N log N). The greedy pass takes O(N) time.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(N)',
    note: 'Use DP. Sort by start time, and calculate max non-overlapping intervals using memoization.',
  },

  commonMistakes: [
    { title: 'Sorting by start time', detail: 'If you sort by start time, you might keep a very long interval that blocks many smaller ones. Always sort by END time for maximum count.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
    { level: 'Medium', title: 'Minimum Number of Arrows to Burst Balloons', url: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/' },
  ],

  quickRevision: [
    'Sort by END time.',
    'Track lastEnd.',
    'If current.start < lastEnd, overlap -> remove.',
    'Else update lastEnd.',
  ],
};

export const intervalsSubPatterns = [mergeIntervals, insertInterval, nonOverlappingIntervals];

export const intervalsOverview = {
  id: 'intervals',
  title: 'Intervals',
  subtitle: 'Merge, insert, and schedule time ranges',
  introduction: 'Intervals are a special class of problems that involve ranges, such as time slots or spatial ranges. Because intervals can overlap in complex ways, sorting them (usually by start or end time) allows us to make linear passes and resolve conflicts efficiently.',
  coreConcept: {
    what: 'Representing and manipulating ranges using a start and end point.',
    why: 'Sorting intervals reduces the problem to comparing adjacent elements, drastically reducing complexity.',
    when: 'Merge overlaps, insert new intervals, find maximum non-overlapping intervals.',
  },
  whenToUse: [
    'The input is a list of `[start, end]` pairs.',
    'You need to resolve conflicts between time ranges.',
    'The problem asks to merge overlapping sections.',
  ],
  recognitionClues: [
    '"Merge intervals"',
    '"Insert interval"',
    '"Overlapping intervals"',
    '"Meeting rooms"',
  ],
  importantProperties: [
    'O(N log N) is the typical time due to sorting.',
    'Merge: Sort by START time.',
    'Non-Overlapping: Sort by END time.',
  ],
  comparison: [
    { aspect: 'Merge', when: 'Consolidate overlaps', time: 'O(N log N)', space: 'O(N)' },
    { aspect: 'Insert', when: 'Add to sorted list', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Non-Overlapping', when: 'Max independent intervals', time: 'O(N log N)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'Sorting by the wrong field', detail: 'Merge intervals requires sorting by START time. Non-overlapping intervals requires sorting by END time. Mixing them up yields wrong answers.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Merge Intervals', url: 'https://leetcode.com/problems/merge-intervals/' },
    { level: 'Medium', title: 'Insert Interval', url: 'https://leetcode.com/problems/insert-interval/' },
    { level: 'Medium', title: 'Non-overlapping Intervals', url: 'https://leetcode.com/problems/non-overlapping-intervals/' },
    { level: 'Medium', title: 'Meeting Rooms II', url: 'https://leetcode.com/problems/meeting-rooms-ii/' },
  ],
};