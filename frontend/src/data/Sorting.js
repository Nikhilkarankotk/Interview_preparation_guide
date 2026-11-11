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
      title: 'Divide',
      explanation: 'Array: [38, 27, 43, 3, 9, 82, 10]. Split into two halves.',
      state: {
        array: [38, 27, 43, 3, 9, 82, 10], left: 0, right: 6, mid: 3, action: 'Split at mid=3.',
      },
    },
    {
      id: 1,
      title: 'Recursively Sort Left',
      explanation: 'Sort left half [38, 27, 43, 3]. Split and merge to get [3, 27, 38, 43].',
      state: {
        array: [3, 27, 38, 43, 9, 82, 10], left: 0, right: 3, mid: 1, action: 'Left half sorted.',
      },
    },
    {
      id: 2,
      title: 'Recursively Sort Right',
      explanation: 'Sort right half [9, 82, 10]. Split and merge to get [9, 10, 82].',
      state: {
        array: [3, 27, 38, 43, 9, 10, 82], left: 4, right: 6, mid: 5, action: 'Right half sorted.',
      },
    },
    {
      id: 3,
      title: 'Merge Halves',
      explanation: 'Merge [3, 27, 38, 43] and [9, 10, 82] by comparing elements from each half.',
      state: {
        array: [3, 9, 10, 27, 38, 43, 82], left: null, right: null, mid: null, action: 'Merged! Array sorted.', found: true,
      },
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
      explanation: 'Array: [10, 80, 30, 90, 40, 50, 70]. Let\'s pick the last element (70) as the pivot.',
      state: {
        array: [10, 80, 30, 90, 40, 50, 70], left: 0, right: 6, pivot: 70, action: 'Pivot = 70.',
      },
    },
    {
      id: 1,
      title: 'Partition',
      explanation: 'Move all elements < 70 to the left, and > 70 to the right. The array becomes [10, 30, 40, 50, 70, 90, 80]. Pivot is at its correct index (4).',
      state: {
        array: [10, 30, 40, 50, 70, 90, 80], left: 0, right: 6, pivot: 70, action: 'Pivot placed at index 4.',
      },
    },
    {
      id: 2,
      title: 'Recurse Left',
      explanation: 'Sort the left subarray [10, 30, 40, 50].',
      state: {
        array: [10, 30, 40, 50, 70, 90, 80], left: 0, right: 3, pivot: 50, action: 'Sorting left half.',
      },
    },
    {
      id: 3,
      title: 'Recurse Right',
      explanation: 'Sort the right subarray [90, 80].',
      state: {
        array: [10, 30, 40, 50, 70, 80, 90], left: 5, right: 6, pivot: 80, action: 'Sorting right half. Sorted!', found: true,
      },
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
      title: 'Initialize Index',
      explanation: 'Array: [3, 1, 5, 4, 2]. Start at index 0. The value is 3, which should be at index 2 (3-1).',
      state: {
        array: [3, 1, 5, 4, 2], current: 0, action: 'Value 3 should be at index 2.',
      },
    },
    {
      id: 1,
      title: 'Swap',
      explanation: 'Swap nums[0] and nums[2]. Array becomes [5, 1, 3, 4, 2].',
      state: {
        array: [5, 1, 3, 4, 2], current: 0, action: 'Swapped 3 and 5.',
      },
    },
    {
      id: 2,
      title: 'Continue at Same Index',
      explanation: 'Now value 5 is at index 0. It should be at index 4. Swap nums[0] and nums[4]. Array: [2, 1, 3, 4, 5].',
      state: {
        array: [2, 1, 3, 4, 5], current: 0, action: 'Swapped 5 and 2.',
      },
    },
    {
      id: 3,
      title: 'Move Forward',
      explanation: 'Value 2 is at index 0. It should be at index 1. Swap nums[0] and nums[1]. Array: [1, 2, 3, 4, 5].',
      state: {
        array: [1, 2, 3, 4, 5], current: 0, action: 'Swapped 2 and 1.',
      },
    },
    {
      id: 4,
      title: 'Check Next',
      explanation: 'Index 0 is correct. Move to index 1 (value 2, index 1, correct). Move to index 2 (value 3, correct). Array is sorted!',
      state: {
        array: [1, 2, 3, 4, 5], current: 2, action: 'Sorted!', found: true,
      },
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
      title: 'The Problem',
      explanation: 'Given numbers [3, 30, 34, 5, 9], arrange them to form the largest number. Result: "9534330".',
      state: {
        array: ['3', '30', '34', '5', '9'], action: 'We need to sort them.',
      },
    },
    {
      id: 1,
      title: 'Define Comparator',
      explanation: 'Compare string a and b. We prefer `a + b` over `b + a`. E.g., comparing "3" and "30": "330" > "303", so "3" comes first.',
      state: {
        array: ['9', '5', '34', '3', '30'], action: 'Sorted by a+b > b+a rule.',
      },
    },
    {
      id: 2,
      title: 'Result',
      explanation: 'Concatenate the sorted array. Result: "9534330".',
      state: {
        array: ['9', '5', '34', '3', '30'], action: 'Final string: 9534330', found: true,
      },
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