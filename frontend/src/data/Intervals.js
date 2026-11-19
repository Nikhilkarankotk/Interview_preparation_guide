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
      title: 'Sort by Start Time',
      explanation: 'Intervals: [[1,3], [2,6], [8,10], [15,18]]. We sort them by their start times. In this case, they are already sorted. WHY: Sorting ensures that we only need to compare the current interval with the immediately preceding one. If they don\'t overlap, no later interval will overlap with the preceding one either.',
      state: { intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 0, merged: [[1,3]], action: 'Sorted. Current interval: [1,3].' },
    },
    {
      id: 1,
      title: 'Check [2,6] for Overlap',
      explanation: 'We compare the next interval [2,6] with our current merged interval [1,3]. The next start (2) is <= the current end (3). They overlap! We merge them by updating the end to `max(3, 6) = 6`. The merged interval becomes [1,6]. WHY: Since 2 falls inside the range of [1,3], the two intervals form one continuous block from 1 to 6.',
      state: { intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 1, merged: [[1,6]], action: 'Overlap! Merge [1,3] and [2,6] -> [1,6].' },
    },
    {
      id: 2,
      title: 'Check [8,10] for Overlap',
      explanation: 'We compare [8,10] with the current merged interval [1,6]. The next start (8) is > the current end (6). There is no overlap. We finalize [1,6] in our result list and make [8,10] the new current interval.',
      state: { intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 2, merged: [[1,6], [8,10]], action: 'No overlap. Add [1,6], current is [8,10].' },
    },
    {
      id: 3,
      title: 'Check [15,18] for Overlap',
      explanation: 'We compare [15,18] with [8,10]. The start (15) is > the end (10). No overlap. We finalize [8,10] and make [15,18] the current interval.',
      state: { intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 3, merged: [[1,6], [8,10], [15,18]], action: 'No overlap. Add [8,10], current is [15,18].' },
    },
    {
      id: 4,
      title: 'Finalize Last Interval',
      explanation: 'We have processed all intervals. We must remember to add the final current interval [15,18] to our result list. The final merged list is [[1,6], [8,10], [15,18]].',
      state: { intervals: [[1,3], [2,6], [8,10], [15,18]], currentIdx: 4, merged: [[1,6], [8,10], [15,18]], action: 'Done.', found: true },
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
      title: 'Phase 1: Add Intervals Before',
      explanation: 'New interval is [4,8]. We scan existing intervals. [1,2] ends at 2, which is strictly less than the new start (4). It does not overlap. We add [1,2] directly to our result. WHY: Phase 1 handles all intervals that are completely to the left of the new interval.',
      state: { intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [4,8], currentIdx: 1, merged: [[1,2]], action: 'Add [1,2] directly.' },
    },
    {
      id: 1,
      title: 'Phase 2: Merge Overlaps (Start)',
      explanation: 'Next is [3,5]. Its end (5) is >= new start (4), so they overlap. We begin Phase 2. We merge them by taking `start = min(3,4) = 3` and `end = max(5,8) = 8`. The new interval expands to [3,8].',
      state: { intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,8], currentIdx: 2, merged: [[1,2]], action: 'Merge [3,5] into new -> [3,8].' },
    },
    {
      id: 2,
      title: 'Phase 2: Merge Overlaps (Continue)',
      explanation: 'Next is [6,7]. Its start (6) is <= the new end (8), so it overlaps. We expand the new interval again: `start = min(3,6) = 3`, `end = max(8,7) = 8`. It remains [3,8].',
      state: { intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,8], currentIdx: 3, merged: [[1,2]], action: 'Merge [6,7] into new -> [3,8].' },
    },
    {
      id: 3,
      title: 'Phase 2: Merge Overlaps (End)',
      explanation: 'Next is [8,10]. Its start (8) is <= the new end (8), so they overlap. We expand the new interval: `start = min(3,8) = 3`, `end = max(8,10) = 10`. The new interval is now [3,10].',
      state: { intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,10], currentIdx: 4, merged: [[1,2]], action: 'Merge [8,10] into new -> [3,10].' },
    },
    {
      id: 4,
      title: 'Phase 3: Add Remaining',
      explanation: 'Next is [12,16]. Its start (12) is > the new end (10). The overlap phase ends! We add the fully merged new interval [3,10] to our result list.',
      state: { intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,10], currentIdx: 5, merged: [[1,2], [3,10]], action: 'Overlap ended. Add [3,10].' },
    },
    {
      id: 5,
      title: 'Phase 3: Add Remaining (Done)',
      explanation: 'We are in Phase 3 now. We simply append the rest of the existing intervals directly to the result. We add [12,16]. The final result is [[1,2], [3,10], [12,16]].',
      state: { intervals: [[1,2], [3,5], [6,7], [8,10], [12,16]], newInterval: [3,10], currentIdx: 5, merged: [[1,2], [3,10], [12,16]], action: 'Add [12,16]. Done.', found: true },
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
      explanation: 'Intervals: [[1,2], [2,3], [1,3], [3,4]]. We sort them by their END times. The array becomes [[1,2], [2,3], [1,3], [3,4]]. WHY: By keeping intervals that end earliest, we leave the maximum possible room for subsequent intervals. We start by keeping [1,2] and set `lastEnd = 2`.',
      state: { intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 0, removed: 0, lastEnd: 2, action: 'Keep [1,2]. Last End = 2.' },
    },
    {
      id: 1,
      title: 'Check [2,3]',
      explanation: 'Next is [2,3]. Its start (2) is >= `lastEnd` (2). They do not overlap. We keep this interval and update `lastEnd` to 3.',
      state: { intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 1, removed: 0, lastEnd: 3, action: 'Keep [2,3]. Last End = 3.' },
    },
    {
      id: 2,
      title: 'Check [1,3] (Overlap)',
      explanation: 'Next is [1,3]. Its start (1) is < `lastEnd` (3). This means it overlaps with the last kept interval. We must remove it. We increment our `removed` count to 1. WHY: We choose to remove [1,3] because it started earlier and covers more ground, making it more likely to cause future conflicts.',
      state: { intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 2, removed: 1, lastEnd: 3, action: 'Overlap! Remove [1,3]. Count = 1.' },
    },
    {
      id: 3,
      title: 'Check [3,4]',
      explanation: 'Next is [3,4]. Its start (3) is >= `lastEnd` (3). No overlap. We keep it and update `lastEnd` to 4. WHY: The previous overlap was successfully resolved by removing one interval, and now this one fits perfectly.',
      state: { intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 3, removed: 1, lastEnd: 4, action: 'Keep [3,4]. Last End = 4.' },
    },
    {
      id: 4,
      title: 'Final Count',
      explanation: 'We have processed all intervals. The total number of intervals we had to remove is 1.',
      state: { intervals: [[1,2], [2,3], [1,3], [3,4]], currentIdx: 4, removed: 1, lastEnd: 4, action: 'Done. Removed 1 interval.', found: true },
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