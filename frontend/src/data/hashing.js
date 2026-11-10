// ============================================================
// COMPLEMENT LOOKUP — Two Sum (Unsorted)
// ============================================================
export const complementLookup = {
  id: 'complement-lookup',
  patternId: 'hashing',
  title: 'Complement Lookup',
  subtitle: 'The Missing Piece',
  type: 'complement-lookup',
  difficulty: 'Easy',

  coreConcept: {
    what: 'As you iterate through the array, store each element in a Hash Map. Before storing, check if its "complement" (target - current) already exists in the map.',
    why: 'Instead of checking every pair (O(N²)), the Hash Map acts as a fast lookup table. We trade O(N) memory for O(N) time.',
    when: 'When you need to find a pair that sums to a target, and the array is UNSORTED.',
    properties: [
      'One pass through the array.',
      'Map stores `value -> index` (so you can return indices).',
      'O(N) time and O(N) space.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Two Sum" on an unsorted array.',
      '"Find a pair that adds up to X".',
      'You need to return original indices.',
    ],
    inputs: ['Unsorted Array'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize',
      explanation: 'Target is 9. We start with an empty map.',
      state: {
        array: [2, 11, 7, 15], target: 9, map: {}, currentIdx: 0, action: 'Empty map.',
      },
    },
    {
      id: 1,
      title: 'First Element',
      explanation: 'Current is 2. Complement needed = 9 - 2 = 7. Is 7 in the map? No. Store {2: 0}.',
      state: {
        array: [2, 11, 7, 15], target: 9, map: {2: 0}, currentIdx: 1, action: '2 not found. Store 2 -> 0.',
      },
    },
    {
      id: 2,
      title: 'Second Element',
      explanation: 'Current is 11. Complement = 9 - 11 = -2. Is -2 in the map? No. Store {11: 1}.',
      state: {
        array: [2, 11, 7, 15], target: 9, map: {2: 0, 11: 1}, currentIdx: 2, action: '11 not found. Store 11 -> 1.',
      },
    },
    {
      id: 3,
      title: 'Third Element (Match!)',
      explanation: 'Current is 7. Complement = 9 - 7 = 2. Is 2 in the map? YES! It is at index 0. We found our pair.',
      state: {
        array: [2, 11, 7, 15], target: 9, map: {2: 0, 11: 1}, currentIdx: 2, found: true,
        action: '7 + 2 = 9. Return [0, 2].',
      },
    },
  ],

  javaCode: `import java.util.*;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            
            if (map.containsKey(complement)) {
                return new int[]{map.get(complement), i};
            }
            map.put(nums[i], i);
        }
        return new int[]{-1, -1};
    }
}`,

  javaExplanation: [
    { line: 'int complement = target - nums[i];', note: 'Calculate what number we need to reach the target.' },
    { line: 'if (map.containsKey(complement))', note: 'Check if we have seen the needed number before.' },
    { line: 'map.put(nums[i], i);', note: 'Store the current number and its index for future lookups.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'One pass, O(1) average lookup time for the Hash Map.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Two nested loops checking every pair.',
  },

  commonMistakes: [
    { title: 'Adding to map before checking', detail: 'You must check for the complement BEFORE adding the current number. Otherwise, an element might match itself.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/' },
    { level: 'Easy', title: 'Two Sum II - Input Array Is Sorted', url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/' },
  ],

  quickRevision: [
    'Create Hash Map.',
    'Complement = target - current.',
    'Check map for complement.',
    'Add current to map.',
  ],
};

// ============================================================
// FREQUENCY MAP — Valid Anagram
// ============================================================
export const frequencyMap = {
  id: 'frequency-map',
  patternId: 'hashing',
  title: 'Frequency Map',
  subtitle: 'The Character Counter',
  type: 'frequency-map',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Count the occurrences of each element in a string or array using a Hash Map (or an array of size 26 for lowercase letters).',
    why: 'Order doesn\'t matter for anagrams or frequency comparisons. The Hash Map reduces the problem to just comparing the counts.',
    when: 'Checking for anagrams, permutations, or finding the most frequent element.',
    properties: [
      'Map stores `character -> count`.',
      'Can increment and decrement counts in a single pass.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Anagram", "Permutation", "Frequency".',
      '"Contains duplicate characters".',
    ],
    inputs: ['String', 'Array'],
    constraints: ['O(N) time'],
  },

  steps: [
    {
      id: 0,
      title: 'Count String 1',
      explanation: 'We want to check if "anagram" and "nagaram" are anagrams. First, count characters in string 1.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {a: 3, n: 1, g: 1, r: 1, m: 1}, phase: 'count1', action: 'Built frequency map for "anagram".',
      },
    },
    {
      id: 1,
      title: 'Subtract String 2',
      explanation: 'Loop through string 2 and decrement the counts in the map. If a character is missing or goes negative, it\'s not an anagram.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {a: 0, n: 0, g: 0, r: 0, m: 0}, phase: 'subtract2', found: true, action: 'All counts reached 0. Valid Anagram!',
      },
    },
  ],

  javaCode: `public class ValidAnagram {
    public boolean isAnagram(String s, String t) {
        if (s.length() != t.length()) return false;
        
        int[] count = new int[26]; // For lowercase English letters
        
        for (int i = 0; i < s.length(); i++) {
            count[s.charAt(i) - 'a']++;
            count[t.charAt(i) - 'a']--;
        }
        
        for (int c : count) {
            if (c != 0) return false;
        }
        return true;
    }
}`,

  javaExplanation: [
    { line: 'int[] count = new int[26];', note: 'An array is faster than a HashMap for fixed character sets.' },
    { line: 'count[s.charAt(i) - \'a\']++;', note: 'Increment for the first string.' },
    { line: 'count[t.charAt(i) - \'a\']--;', note: 'Decrement for the second string.' },
    { line: 'if (c != 0) return false;', note: 'If any count is not zero, the strings are not anagrams.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'The array size is fixed at 26, which is O(1) space.',
  },

  bruteForce: {
    time: 'O(N log N)',
    space: 'O(N)',
    note: 'Sort both strings and compare them.',
  },

  commonMistakes: [
    { title: 'Forgetting length check', detail: 'If lengths differ, they cannot be anagrams. Return false immediately.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/' },
    { level: 'Easy', title: 'Ransom Note', url: 'https://leetcode.com/problems/ransom-note/' },
    { level: 'Medium', title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/' },
  ],

  quickRevision: [
    'Use int[26] for characters.',
    '++ for string 1, -- for string 2.',
    'All zeros means anagram.',
  ],
};

export const hashingSubPatterns = [complementLookup, frequencyMap];

export const hashingOverview = {
  id: 'hashing',
  title: 'Hashing',
  subtitle: 'O(1) lookups to remember what you have seen',
  introduction: 'Hashing is the art of trading space for time. By storing data in a Hash Map or Hash Set, you can instantly check if an element exists, count frequencies, or find complements without looping through the array again.',
  coreConcept: {
    what: 'Mapping keys to values for O(1) average time lookups.',
    why: 'Avoids O(N) linear scans inside a loop, reducing O(N²) algorithms to O(N).',
    when: 'Finding pairs, counting frequencies, or tracking seen elements.',
  },
  whenToUse: [
    'You need to look up data instantly.',
    'The array is unsorted (Two Pointers won\'t work).',
    'You need to count frequencies.',
  ],
  recognitionClues: [
    '"Find a pair..."',
    '"Contains duplicates..."',
    '"Anagram / Permutation..."',
  ],
  importantProperties: [
    'Hash Map: Key-Value pairs.',
    'Hash Set: Just keys (existence).',
    'O(1) average time, O(N) space.',
  ],
  comparison: [
    { aspect: 'Complement', when: 'Find a pair', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Frequency Map', when: 'Count matches', time: 'O(N)', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Hash Collisions', detail: 'In worst case, Hash Map becomes O(N). But in interviews, assume O(1).' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Two Sum', url: 'https://leetcode.com/problems/two-sum/' },
    { level: 'Easy', title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/' },
    { level: 'Medium', title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/' },
  ],
};