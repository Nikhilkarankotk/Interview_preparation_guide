// ============================================================
// MERGE SORT — Divide and Conquer
// ============================================================
export const mergeSort = {
  id: 'merge-sort',
  patternId: 'sorting',
  title: 'Merge Sort',
  subtitle: 'Divide and Conquer',
  type: 'merge-sort',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Divide the array into halves, recursively sort each half, and then merge the sorted halves back together.',
    why: 'It guarantees O(N log N) time complexity in all cases (best, average, worst) and is a stable sort.',
    when: 'When you need a guaranteed O(N log N) sort, or when sorting linked lists.',
    properties: [
      'Stable sort.',
      'Requires O(N) extra space for merging.',
      'Divides the problem into identical subproblems.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Sort an array in O(N log N)".',
      '"Sort a linked list".',
      'Count inversions in an array.',
    ],
    inputs: ['Array'],
    constraints: ['O(N log N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial Divide',
      explanation: 'Array: [38, 27, 43, 3]. We calculate mid = (0 + 3) / 2 = 1. We split the array into two halves: left subarray [38, 27] and right subarray [43, 3]. WHY: Merge sort uses divide-and-conquer. Splitting the array halves the problem size, eventually reaching single-element arrays which are inherently sorted.',
      state: { array: [38, 27, 43, 3], left: 0, right: 3, mid: 1, action: 'Split into [38, 27] and [43, 3].' },
    },
    {
      id: 1,
      title: 'Divide Left Half',
      explanation: 'We recurse on the left half [38, 27]. Mid = (0 + 1) / 2 = 0. We split it into [38] and [27].',
      state: { array: [38, 27, 43, 3], left: 0, right: 1, mid: 0, action: 'Split [38, 27] into [38] and [27].' },
    },
    {
      id: 2,
      title: 'Merge Left Half',
      explanation: 'Both [38] and [27] are base cases (size 1). We merge them. We compare 38 and 27. Since 27 < 38, we place 27 first, then 38. The left half is now sorted: [27, 38].',
      state: { array: [27, 38, 43, 3], left: 0, right: 1, mid: 0, action: 'Merged to [27, 38].' },
    },
    {
      id: 3,
      title: 'Divide Right Half',
      explanation: 'We recurse on the right half [43, 3] (indices 2 to 3). Mid = (2 + 3) / 2 = 2. We split it into [43] and [3].',
      state: { array: [27, 38, 43, 3], left: 2, right: 3, mid: 2, action: 'Split [43, 3] into [43] and [3].' },
    },
    {
      id: 4,
      title: 'Merge Right Half',
      explanation: 'We merge [43] and [3]. Compare 43 and 3. Since 3 < 43, we place 3 first, then 43. The right half is now sorted: [3, 43].',
      state: { array: [27, 38, 3, 43], left: 2, right: 3, mid: 2, action: 'Merged to [3, 43].' },
    },
    {
      id: 5,
      title: 'Compare Left and Right Halves (1)',
      explanation: 'Now we merge the two sorted halves: [27, 38] and [3, 43]. We use two pointers (i for left, j for right). Compare 27 and 3. 3 is smaller, so we place 3 in the temp array.',
      state: { array: [27, 38, 3, 43], left: 0, right: 3, mid: 1, action: 'Pick 3 (from right half).' },
    },
    {
      id: 6,
      title: 'Compare Left and Right Halves (2)',
      explanation: 'Compare 27 and 43. 27 is smaller, so we place 27 in the temp array.',
      state: { array: [27, 38, 3, 43], left: 0, right: 3, mid: 1, action: 'Pick 27 (from left half).' },
    },
    {
      id: 7,
      title: 'Compare Left and Right Halves (3)',
      explanation: 'Compare 38 and 43. 38 is smaller, so we place 38 in the temp array.',
      state: { array: [27, 38, 3, 43], left: 0, right: 3, mid: 1, action: 'Pick 38 (from left half).' },
    },
    {
      id: 8,
      title: 'Attach Remaining Elements',
      explanation: 'The left half is exhausted. The only remaining element is 43 from the right half. We copy 43 to the temp array.',
      state: { array: [27, 38, 3, 43], left: 0, right: 3, mid: 1, action: 'Pick 43 (from right half).' },
    },
    {
      id: 9,
      title: 'Final Sorted Array',
      explanation: 'We copy the sorted temp array [3, 27, 38, 43] back into the original array. The array is now fully sorted.',
      state: { array: [3, 27, 38, 43], left: null, right: null, mid: null, action: 'Merged! Array sorted.', found: true },
    },
  ],

  javaCode: `public class MergeSort {
    public void sort(int[] arr) {
        if (arr == null || arr.length <= 1) return;
        int[] temp = new int[arr.length];
        mergeSort(arr, temp, 0, arr.length - 1);
    }

    private void mergeSort(int[] arr, int[] temp, int left, int right) {
        if (left >= right) return;
        
        int mid = left + (right - left) / 2;
        mergeSort(arr, temp, left, mid);
        mergeSort(arr, temp, mid + 1, right);
        merge(arr, temp, left, mid, right);
    }

    private void merge(int[] arr, int[] temp, int left, int mid, int right) {
        for (int i = left; i <= right; i++) temp[i] = arr[i];
        
        int i = left, j = mid + 1, k = left;
        while (i <= mid && j <= right) {
            if (temp[i] <= temp[j]) arr[k++] = temp[i++];
            else arr[k++] = temp[j++];
        }
        while (i <= mid) arr[k++] = temp[i++];
    }
}`,

  javaExplanation: [
    { line: 'int mid = left + (right - left) / 2;', note: 'Find the middle point to divide the array.' },
    { line: 'mergeSort(arr, temp, left, mid);', note: 'Recursively sort the left half.' },
    { line: 'if (temp[i] <= temp[j]) arr[k++] = temp[i++];', note: 'Compare elements and merge in sorted order. The `<=` ensures stability.' },
  ],

  complexity: {
    time: 'O(N log N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'The array is divided log N times. Merging takes O(N) at each level.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Bubble or Insertion sort, which are too slow for large arrays.',
  },

  commonMistakes: [
    { title: 'Not allocating a temp array', detail: 'Merging requires a temporary array to hold the combined elements without overwriting unprocessed data.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Sort an Array', url: 'https://leetcode.com/problems/sort-an-array/' },
    { level: 'Hard', title: 'Merge k Sorted Lists', url: 'https://leetcode.com/problems/merge-k-sorted-lists/' },
    { level: 'Hard', title: 'Count of Smaller Numbers After Self', url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/' },
  ],

  quickRevision: [
    'Divide at mid.',
    'Recursively sort left and right.',
    'Merge two sorted halves into a temp array.',
    'Copy back to original.',
  ],
};

// ============================================================
// QUICK SORT — Partitioning
// ============================================================
export const quickSort = {
  id: 'quick-sort',
  patternId: 'sorting',
  title: 'Quick Sort',
  subtitle: 'The Partitioning',
  type: 'quick-sort',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Pick a pivot element, partition the array such that elements smaller than the pivot are on the left, and larger are on the right. Recursively sort the left and right partitions.',
    why: 'It is an in-place sorting algorithm (O(1) extra space) and is extremely fast in practice (O(N log N) average).',
    when: 'When you need an in-place sort, or when finding the Kth largest/smallest element (QuickSelect).',
    properties: [
      'In-place (no extra array needed).',
      'Not stable.',
      'Worst case is O(N²) if the pivot is poorly chosen.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Sort an array in-place".',
      '"Find the Kth largest element".',
    ],
    inputs: ['Array'],
    constraints: ['O(N log N) average time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Choose Pivot',
      explanation: 'Array: [10, 80, 30, 90, 40]. We pick the last element (40) as the pivot. We also initialize a pointer `i = -1` to track the boundary of elements smaller than the pivot. WHY: The pivot acts as the dividing line. We want all elements smaller than 40 to be on its left, and larger on its right.',
      state: { array: [10, 80, 30, 90, 40], left: 0, right: 4, pivot: 40, action: 'Pivot = 40. i = -1.' },
    },
    {
      id: 1,
      title: 'Compare 10 with Pivot',
      explanation: '`j = 0` (value 10). 10 < 40. We increment `i` (i becomes 0) and swap `arr[i]` with `arr[j]` (swapping 10 with itself). Array remains [10, 80, 30, 90, 40]. WHY: We are moving smaller elements to the left partition.',
      state: { array: [10, 80, 30, 90, 40], left: 0, right: 4, pivot: 40, action: '10 < 40. Swap.' },
    },
    {
      id: 2,
      title: 'Compare 80 with Pivot',
      explanation: '`j = 1` (value 80). 80 > 40. We do nothing. 80 stays on the right side of the partition.',
      state: { array: [10, 80, 30, 90, 40], left: 0, right: 4, pivot: 40, action: '80 > 40. Ignore.' },
    },
    {
      id: 3,
      title: 'Compare 30 with Pivot',
      explanation: '`j = 2` (value 30). 30 < 40. We increment `i` (i becomes 1) and swap `arr[i]` (80) with `arr[j]` (30). Array becomes [10, 30, 80, 90, 40]. WHY: We found a smaller element (30), so we swap it into the smaller-elements partition.',
      state: { array: [10, 30, 80, 90, 40], left: 0, right: 4, pivot: 40, action: '30 < 40. Swap 80 and 30.' },
    },
    {
      id: 4,
      title: 'Compare 90 with Pivot',
      explanation: '`j = 3` (value 90). 90 > 40. We do nothing. The loop ends.',
      state: { array: [10, 30, 80, 90, 40], left: 0, right: 4, pivot: 40, action: '90 > 40. Ignore.' },
    },
    {
      id: 5,
      title: 'Place Pivot in Correct Position',
      explanation: 'We swap the pivot (40) with the element at `i + 1` (80). Array becomes [10, 30, 40, 90, 80]. The pivot 40 is now at its exact sorted index (2). WHY: The pivot separates the smaller and larger elements.',
      state: { array: [10, 30, 40, 90, 80], left: 0, right: 4, pivot: 40, action: 'Swap pivot with 80. Pivot at index 2.' },
    },
    {
      id: 6,
      title: 'Recurse Left Partition',
      explanation: 'We recursively sort the left partition [10, 30]. The pivot is 30. 10 < 30, so they remain in order. Left partition sorted.',
      state: { array: [10, 30, 40, 90, 80], left: 0, right: 1, pivot: 30, action: 'Left partition sorted.' },
    },
    {
      id: 7,
      title: 'Recurse Right Partition',
      explanation: 'We recursively sort the right partition [90, 80]. The pivot is 80. 90 > 80, so we swap them to [80, 90]. Right partition sorted.',
      state: { array: [10, 30, 40, 80, 90], left: 3, right: 4, pivot: 80, action: 'Right partition sorted.' },
    },
    {
      id: 8,
      title: 'Final Sorted Array',
      explanation: 'All partitions are sorted. The array is fully sorted: [10, 30, 40, 80, 90].',
      state: { array: [10, 30, 40, 80, 90], left: null, right: null, pivot: null, action: 'Array sorted!', found: true },
    },
  ],

  javaCode: `public class QuickSort {
    public void sort(int[] arr) {
        quickSort(arr, 0, arr.length - 1);
    }

    private void quickSort(int[] arr, int low, int high) {
        if (low < high) {
            int pi = partition(arr, low, high);
            quickSort(arr, low, pi - 1);
            quickSort(arr, pi + 1, high);
        }
    }

    private int partition(int[] arr, int low, int high) {
        int pivot = arr[high];
        int i = low - 1; // Index of smaller element
        
        for (int j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                swap(arr, i, j);
            }
        }
        swap(arr, i + 1, high);
        return i + 1;
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`,

  javaExplanation: [
    { line: 'int pivot = arr[high];', note: 'Choose the last element as the pivot.' },
    { line: 'if (arr[j] < pivot) { i++; swap(arr, i, j); }', note: 'If current element is smaller than pivot, swap it to the left side.' },
    { line: 'swap(arr, i + 1, high);', note: 'Place the pivot in its correct sorted position.' },
  ],

  complexity: {
    time: 'O(N log N) avg, O(N²) worst',
    space: 'O(1)',
    aux: 'O(log N)',
    explanation: 'Space is O(log N) due to the recursion stack. Worst case happens if the pivot is always the smallest/largest.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Selection sort.',
  },

  commonMistakes: [
    { title: 'Infinite recursion', detail: 'If the partition logic is flawed, the pivot might not move, causing infinite recursion. Ensure the pivot is swapped into place.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Sort an Array', url: 'https://leetcode.com/problems/sort-an-array/' },
    { level: 'Medium', title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
  ],

  quickRevision: [
    'Pick last element as pivot.',
    'Partition: smaller to left, larger to right.',
    'Recursively sort left and right.',
  ],
};

// ============================================================
// CYCLIC SORT — In-place Range Sorting
// ============================================================
export const cyclicSort = {
  id: 'cyclic-sort',
  patternId: 'sorting',
  title: 'Cyclic Sort',
  subtitle: 'The In-Place Swap',
  type: 'cyclic-sort',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Iterate through the array. If the current number is not at its correct index (where correct index = value - 1), swap it to its correct position.',
    why: 'If an array contains numbers from 1 to N (or 0 to N), we can sort it in O(N) time without using any extra space.',
    when: 'When the problem asks for missing numbers, duplicates, or the first missing positive, and the array contains a range of numbers.',
    properties: [
      'O(N) time complexity.',
      'O(1) space complexity.',
      'Modifies the array in-place.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Numbers are in range 1 to N".',
      '"Find the missing number".',
      '"Find all duplicates".',
    ],
    inputs: ['Array of integers within a specific range'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start at Index 0',
      explanation: 'Array: [3, 1, 5, 4, 2]. We start at `i = 0`. The value is 3. The correct index for 3 is `3 - 1 = 2`. Since `i` (0) does not equal the correct index (2), we must swap. WHY: Every number N in the range 1 to N belongs at index N-1.',
      state: { array: [3, 1, 5, 4, 2], current: 0, action: 'Value 3 belongs at index 2. Swap.' },
    },
    {
      id: 1,
      title: 'Swap 3 and 5',
      explanation: 'We swap `arr[0]` (3) with `arr[2]` (5). The array becomes [5, 1, 3, 4, 2]. 3 is now in its correct position. We do NOT increment `i` yet.',
      state: { array: [5, 1, 3, 4, 2], current: 0, action: 'Swapped. 3 is home. Check index 0 again.' },
    },
    {
      id: 2,
      title: 'Index 0 has 5',
      explanation: 'Still at `i = 0`. The value is 5. The correct index for 5 is `5 - 1 = 4`. `i` (0) != 4, so we swap `arr[0]` (5) with `arr[4]` (2).',
      state: { array: [2, 1, 3, 4, 5], current: 0, action: 'Value 5 belongs at index 4. Swap.' },
    },
    {
      id: 3,
      title: 'Index 0 has 2',
      explanation: 'Still at `i = 0`. The value is 2. The correct index for 2 is `2 - 1 = 1`. `i` (0) != 1, so we swap `arr[0]` (2) with `arr[1]` (1).',
      state: { array: [1, 2, 3, 4, 5], current: 0, action: 'Value 2 belongs at index 1. Swap.' },
    },
    {
      id: 4,
      title: 'Check Index 0 (Correct)',
      explanation: 'Still at `i = 0`. The value is 1. The correct index for 1 is 0. `i` (0) == 0, so the element is in its correct place. We increment `i` to 1.',
      state: { array: [1, 2, 3, 4, 5], current: 1, action: '1 is home. Move to index 1.' },
    },
    {
      id: 5,
      title: 'Check Index 1',
      explanation: 'At `i = 1`, value is 2. Correct index is 1. It is already in place. Increment `i` to 2.',
      state: { array: [1, 2, 3, 4, 5], current: 2, action: '2 is home. Move to index 2.' },
    },
    {
      id: 6,
      title: 'Check Index 2',
      explanation: 'At `i = 2`, value is 3. Correct index is 2. It is already in place. Increment `i` to 3.',
      state: { array: [1, 2, 3, 4, 5], current: 3, action: '3 is home. Move to index 3.' },
    },
    {
      id: 7,
      title: 'Check Index 3',
      explanation: 'At `i = 3`, value is 4. Correct index is 3. It is already in place. Increment `i` to 4.',
      state: { array: [1, 2, 3, 4, 5], current: 4, action: '4 is home. Move to index 4.' },
    },
    {
      id: 8,
      title: 'Check Index 4 (End)',
      explanation: 'At `i = 4`, value is 5. Correct index is 4. It is in place. `i` increments to 5, which is out of bounds. The array is now fully sorted.',
      state: { array: [1, 2, 3, 4, 5], current: 5, action: 'Sorted!', found: true },
    },
  ],

  javaCode: `public class CyclicSort {
    public void sort(int[] nums) {
        int i = 0;
        while (i < nums.length) {
            int correct = nums[i] - 1;
            if (nums[i] > 0 && nums[i] <= nums.length && nums[i] != nums[correct]) {
                swap(nums, i, correct);
            } else {
                i++;
            }
        }
    }

    private void swap(int[] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
}`,

  javaExplanation: [
    { line: 'int correct = nums[i] - 1;', note: 'Calculate the correct index for the current value.' },
    { line: 'if (nums[i] != nums[correct])', note: 'If the value is not already at its correct index, swap it.' },
    { line: 'else { i++; }', note: 'Only move to the next index if the current one is correct or if it\'s a duplicate/invalid.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'Each element is either placed in its correct position or skipped, taking O(N) total swaps.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(1)',
    note: 'Standard sorting (Merge/Quick) or using a Hash Set (O(N) space).',
  },

  commonMistakes: [
    { title: 'Infinite loop', detail: 'If you increment `i` even when you perform a swap, you might skip the new element at index `i`. You must only increment `i` when the current element is correct.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Find All Numbers Disappeared in an Array', url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/' },
    { level: 'Medium', title: 'Find the Duplicate Number', url: 'https://leetcode.com/problems/find-the-duplicate-number/' },
    { level: 'Hard', title: 'First Missing Positive', url: 'https://leetcode.com/problems/first-missing-positive/' },
  ],

  quickRevision: [
    'While i < N.',
    'correct = nums[i] - 1.',
    'If nums[i] != nums[correct], swap.',
    'Else, i++.',
  ],
};

// ============================================================
// CUSTOM SORTING — The Comparator
// ============================================================
export const customSort = {
  id: 'custom-sort',
  patternId: 'sorting',
  title: 'Custom Sorting',
  subtitle: 'The Comparator',
  type: 'custom-sort',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Define a custom comparison rule to determine the order of elements.',
    why: 'Standard sorting uses numerical or alphabetical order. Many problems require sorting based on a specific custom rule (e.g., largest number, string lengths, or custom priorities).',
    when: 'When you need to sort elements based on complex conditions.',
    properties: [
      'Uses `Arrays.sort()` with a custom `Comparator`.',
      'Comparator returns negative if a < b, 0 if a == b, positive if a > b.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Arrange numbers to form the largest number".',
      '"Sort by custom priority".',
    ],
    inputs: ['Array of objects/strings/numbers'],
    constraints: ['O(N log N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'Convert to Strings',
      explanation: 'Given numbers [3, 30, 34, 5, 9]. We want to form the largest number. First, we convert them to strings: ["3", "30", "34", "5", "9"]. WHY: We cannot simply sort by numerical value (e.g., 9 > 34, but "9" + "34" = "934" is larger than "34" + "9" = "349"). String concatenation allows us to test the combinations directly.',
      state: { array: ['3', '30', '34', '5', '9'], action: 'Converted to strings.' },
    },
    {
      id: 1,
      title: 'Comparator Logic: 3 vs 30',
      explanation: 'We compare "3" and "30". We check "330" vs "303". Since "330" > "303", "3" should come BEFORE "30". WHY: The comparator chooses the order that results in the larger concatenated string.',
      state: { array: ['3', '30', '34', '5', '9'], action: '3 before 30 ("330" > "303").' },
    },
    {
      id: 2,
      title: 'Comparator Logic: 9 vs 5',
      explanation: 'We compare "9" and "5". "95" > "59", so "9" comes before "5".',
      state: { array: ['9', '5', '34', '3', '30'], action: '9 before 5 ("95" > "59").' },
    },
    {
      id: 3,
      title: 'Comparator Logic: 34 vs 3',
      explanation: 'We compare "34" and "3". "343" > "334", so "34" comes before "3".',
      state: { array: ['9', '5', '34', '3', '30'], action: '34 before 3 ("343" > "334").' },
    },
    {
      id: 4,
      title: 'Final Sorted Array',
      explanation: 'After sorting with this custom comparator, the array becomes ["9", "5", "34", "3", "30"]. WHY: This specific order guarantees that any adjacent pair `a, b` satisfies `a + b > b + a`, which is the condition for the lexicographically largest concatenation.',
      state: { array: ['9', '5', '34', '3', '30'], action: 'Sorted array.' },
    },
    {
      id: 5,
      title: 'Concatenate Result',
      explanation: 'We concatenate the sorted strings to form the final answer: "9534330".',
      state: { array: ['9', '5', '34', '3', '30'], action: 'Result: 9534330', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class LargestNumber {
    public String largestNumber(int[] nums) {
        String[] arr = new String[nums.length];
        for (int i = 0; i < nums.length; i++) {
            arr[i] = String.valueOf(nums[i]);
        }

        // Custom comparator
        Arrays.sort(arr, (a, b) -> (b + a).compareTo(a + b));

        // Edge case: if the largest number is 0
        if (arr[0].equals("0")) return "0";

        StringBuilder sb = new StringBuilder();
        for (String s : arr) sb.append(s);
        
        return sb.toString();
    }
}`,

  javaExplanation: [
    { line: 'String[] arr = new String[nums.length];', note: 'Convert integers to strings so we can concatenate them.' },
    { line: '(b + a).compareTo(a + b)', note: 'The custom rule: if "ba" is larger than "ab", then b should come before a.' },
    { line: 'if (arr[0].equals("0")) return "0";', note: 'Handle the case where the array only contains zeros.' },
  ],

  complexity: {
    time: 'O(N log N * L)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Sorting takes O(N log N) comparisons. Each comparison compares strings of length L.',
  },

  bruteForce: {
    time: 'O(N!)',
    space: 'O(N)',
    note: 'Try all permutations of the array to find the largest concatenation.',
  },

  commonMistakes: [
    { title: 'Using Integer subtraction for comparator', detail: 'If comparing strings, `a - b` does not work. Use `(a + b).compareTo(b + a)`.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Largest Number', url: 'https://leetcode.com/problems/largest-number/' },
    { level: 'Medium', title: 'Custom Sort String', url: 'https://leetcode.com/problems/custom-sort-string/' },
  ],

  quickRevision: [
    'Convert to strings.',
    'Sort with custom comparator.',
    'Concatenate result.',
  ],
};

export const sortingSubPatterns = [mergeSort, quickSort, cyclicSort, customSort];

export const sortingOverview = {
  id: 'sorting',
  title: 'Sorting',
  subtitle: 'Organize data efficiently',
  introduction: 'Sorting is the process of arranging data in a specific order. While standard library sorts are powerful, understanding the underlying algorithms (Merge, Quick) and specialized techniques (Cyclic) is crucial for optimizing time and space complexity in interviews.',
  coreConcept: {
    what: 'Rearranging elements based on a defined comparison rule.',
    why: 'Sorted data enables faster searching (Binary Search), simplifies deduplication, and is often a prerequisite for other algorithms (Two Pointers).',
    when: 'Whenever data needs to be ordered, or when you can exploit the properties of sorted data.',
  },
  whenToUse: [
    'The problem requires ordered output.',
    'You need to perform O(log N) searches.',
    'You can use Two Pointers or Greedy techniques after sorting.',
  ],
  recognitionClues: [
    '"Sort the array".',
    '"Find the Kth element".',
    '"Arrange to form the largest number".',
  ],
  importantProperties: [
    'Merge Sort: Stable, O(N log N) guaranteed, O(N) space.',
    'Quick Sort: In-place, O(N log N) average, O(1) space.',
    'Cyclic Sort: O(N) time for continuous ranges.',
  ],
  comparison: [
    { aspect: 'Merge Sort', when: 'Stable sort, Linked List', time: 'O(N log N)', space: 'O(N)' },
    { aspect: 'Quick Sort', when: 'In-place, fastest avg', time: 'O(N log N)', space: 'O(1)' },
    { aspect: 'Cyclic Sort', when: 'Range 1 to N', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Custom Sort', when: 'Custom rules', time: 'O(N log N)', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Forgetting Stability', detail: 'If relative order matters, you must use a stable sort like Merge Sort or TimSort (Java\'s default).' },
    { title: 'Using Cyclic Sort outside Range', detail: 'Cyclic sort only works if elements are in the range 0 to N or 1 to N.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Sort an Array', url: 'https://leetcode.com/problems/sort-an-array/' },
    { level: 'Medium', title: 'Kth Largest Element in an Array', url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/' },
    { level: 'Medium', title: 'Find All Numbers Disappeared in an Array', url: 'https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array/' },
    { level: 'Medium', title: 'Largest Number', url: 'https://leetcode.com/problems/largest-number/' },
  ],
};