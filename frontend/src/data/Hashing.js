// ============================================================
// COMPLEMENT LOOKUP — LeetCode 1: Two Sum
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
      title: 'LC 1 — What Are We Looking For?',
      explanation: 'Input: `nums = [2, 7, 11, 15]`, `target = 9`.\n\n🎯 Goal: Find TWO indices i, j such that `nums[i] + nums[j] = 9`. Return `[i, j]`. The array is UNSORTED — Two Pointers won\'t work.\n\n🔍 Strategy: As we walk left-to-right, we ask a simple question for each number: "What value do I need to complete target?" That\'s the complement = 9 − current. If we\'ve seen it before (stored in a map), we\'re done. If not, store current for future lookups.\n\nStart: empty map, no numbers seen yet.\n\nNext step → Check nums[0] = 2.',
      state: {
        array: [2, 7, 11, 15], target: 9, map: {}, currentIdx: 0,
        action: 'Goal: find pair summing to 9. Map empty.',
      },
    },
    {
      id: 1,
      title: 'Probe 1 — Current = 2',
      explanation: '🔍 What we\'re doing: For nums[0] = 2, compute its complement.\n\n🧮 Complement = 9 − 2 = 7. If 7 were already in the map, we\'d have our pair (7 + 2 = 9).\n\n❌ Verdict: Map is empty → 7 not found.\n\n➡️ Next move: Store `2 → 0` in the map so future numbers can check against 2. Then advance to index 1.\n\nNext step → Check nums[1] = 7.',
      state: {
        array: [2, 7, 11, 15], target: 9, map: {2: 0}, currentIdx: 1,
        action: 'nums[0]=2 → need 7. Not in map. Store 2→0.',
      },
    },
    {
      id: 2,
      title: 'Probe 2 — Current = 7',
      explanation: '🔍 What we\'re doing: For nums[1] = 7, compute its complement.\n\n🧮 Complement = 9 − 7 = 2. Check map for 2.\n\n✅ Verdict: `2 → 0` IS in the map (we stored it last step). The pair is nums[0] + nums[1] = 2 + 7 = 9. \n\n➡️ Next move: Return `[0, 1]`.\n\n🎯 Answer: `[0, 1]` — matches LC 1\'s expected output. Note we check BEFORE storing 7, because storing first could match 7 with itself in edge cases (like target = 14, nums = [7, 7]).',
      state: {
        array: [2, 7, 11, 15], target: 9, map: {2: 0}, currentIdx: 1, found: true,
        action: 'nums[1]=7 → need 2. Found at index 0. Return [0, 1].',
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
// FREQUENCY MAP — LeetCode 242: Valid Anagram
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
      title: 'LC 242 — What Are We Checking?',
      explanation: 'Input: `s = "anagram"`, `t = "nagaram"`.\n\n🎯 Goal: Return true if t is an anagram of s — meaning both strings have the SAME letters with the SAME counts, just in any order.\n\n💡 Simple idea: For each letter, count how many times it appears in s, and count how many times it appears in t. If every letter has the same count in both, they are anagrams.\n\n🔧 Setup:\n- Both strings are 7 letters → OK (different lengths would be instant false)\n- Create a count table: one slot per letter, all starting at 0\n- We will add 1 for each letter in s, and subtract 1 for each letter in t\n\nAt the end, if every slot is 0, the counts matched everywhere.\n\nNext step → Look at position 0.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {}, phase: 'init',
        action: 'Lengths match (7). Start with empty count table.',
      },
    },
    {
      id: 1,
      title: 'Position 0 — Add s[0], Subtract t[0]',
      explanation: 'What we do at position 0:\n\n- s[0] = \'a\' → count[a] goes from 0 to +1 (found one \'a\' in s)\n- t[0] = \'n\' → count[n] goes from 0 to −1 (found one \'n\' in t)\n\n📊 Table now looks like:\n- a → +1  (s has one extra \'a\' so far)\n- n → −1  (t has one extra \'n\' so far)\n\nThink of +1 as "s is ahead on this letter" and −1 as "t is ahead on this letter". If both strings have the same letters, these will cancel out as we keep scanning.\n\nNext step → Position 1.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {a: 1, n: -1}, phase: 'scan',
        action: 'i=0: ++a → +1, --n → −1.',
      },
    },
    {
      id: 2,
      title: 'Position 1 — They Cancel Out',
      explanation: 'What we do at position 1:\n\n- s[1] = \'n\' → count[n] goes from −1 to 0 (this \'n\' in s pays back the \'n\' we saw earlier in t)\n- t[1] = \'a\' → count[a] goes from +1 to 0 (this \'a\' in t pays back the \'a\' we saw earlier in s)\n\n📊 Table now looks like:\n- a → 0  (balanced)\n- n → 0  (balanced)\n\n✅ This is exactly the behavior we want — a letter that appears in BOTH strings will add 1 somewhere and subtract 1 somewhere else, netting to 0. Order doesn\'t matter.\n\nNext step → Positions 2 through 6.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {a: 0, n: 0}, phase: 'scan',
        action: 'i=1: ++n → 0, --a → 0. Both balanced.',
      },
    },
    {
      id: 3,
      title: 'Positions 2–6 — Finish the Scan',
      explanation: 'We repeat the same +1 / −1 pattern for every remaining position:\n\n- i=2: s[2]=\'a\' (+1), t[2]=\'g\' (−1)\n- i=3: s[3]=\'g\' (+1), t[3]=\'a\' (−1)\n- i=4: s[4]=\'r\' (+1), t[4]=\'r\' (−1) → net 0\n- i=5: s[5]=\'a\' (+1), t[5]=\'a\' (−1) → net 0\n- i=6: s[6]=\'m\' (+1), t[6]=\'m\' (−1) → net 0\n\n📊 Final counts for every letter that appeared:\n- a → 0  (appeared 3 times in s, 3 times in t)\n- n → 0  (1 and 1)\n- g → 0  (1 and 1)\n- r → 0  (1 and 1)\n- m → 0  (1 and 1)\n\nEvery slot balanced to zero.\n\nNext step → Verify all slots are zero.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {a: 0, n: 0, g: 0, r: 0, m: 0}, phase: 'verify',
        action: 'Finished i=0..6. Every count is 0.',
      },
    },
    {
      id: 4,
      title: 'Return Answer',
      explanation: 'Final check: walk through the count table. If ANY slot is not 0, the strings have different character counts → return false. If every slot is 0 → return true.\n\n✅ All slots are 0 here → return true.\n\n🎯 Answer: `true` — matches LC 242\'s expected output for "anagram" / "nagaram".\n\n💭 Why this works in one sentence: a letter that appears k times in s contributes +k, and if it also appears k times in t it contributes −k → they cancel. If t had one extra \'x\', that slot would end at −1 and we\'d return false. If t had one missing \'a\', the \'a\' slot would end at +1 and we\'d return false.',
      state: {
        string1: 'anagram', string2: 'nagaram', map: {a: 0, n: 0, g: 0, r: 0, m: 0}, phase: 'done', found: true,
        action: 'All counts = 0 → return true.',
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