// ============================================================
// PALINDROME CHECK — The Mirror
// ============================================================
export const palindromeCheck = {
  id: 'palindrome-check',
  patternId: 'strings',
  title: 'Palindrome Check',
  subtitle: 'The Mirror',
  type: 'palindrome-check',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Determine if a string reads the same forwards and backwards.',
    why: 'By using two pointers starting at opposite ends, we can compare characters in O(N/2) time.',
    when: 'Valid Palindrome, checking if a string is symmetric, or finding palindromic substrings.',
    properties: [
      'Uses two pointers (Left and Right).',
      'Often requires filtering out non-alphanumeric characters.',
      'Case-insensitive comparison.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Valid Palindrome".',
      '"Reads the same forwards and backwards".',
    ],
    inputs: ['String'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initial Pointers',
      explanation: 'String: "A man, a plan, a canal: Panama". We set L=0 ("A") and R=29 ("a"). Both are alphanumeric. They match (ignoring case). WHY: The outer characters must match to be a palindrome.',
      state: { str: 'A man, a plan, a canal: Panama', left: 0, right: 29, action: 'Match "A" and "a".' },
    },
    {
      id: 1,
      title: 'Skip Space',
      explanation: 'Move inward. L=1 is a space (skip). L becomes 2 ("m"). R=28 is "m". They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 2, right: 28, action: 'Skip space. Match "m".' },
    },
    {
      id: 2,
      title: 'Match "a"',
      explanation: 'Move inward. L=3 ("a"), R=27 ("a"). They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 3, right: 27, action: 'Match "a" and "a".' },
    },
    {
      id: 3,
      title: 'Match "n"',
      explanation: 'Move inward. L=4 ("n"), R=26 ("n"). They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 4, right: 26, action: 'Match "n" and "n".' },
    },
    {
      id: 4,
      title: 'Skip Comma and Space',
      explanation: 'Move inward. L=5 is a comma. Skip. L=6 is a space. Skip. L becomes 7 ("a"). R=25 is "a". They match. WHY: Punctuation and spaces are ignored.',
      state: { str: 'A man, a plan, a canal: Panama', left: 7, right: 25, action: 'Skip ", ". Match "a".' },
    },
    {
      id: 5,
      title: 'Skip Space (Left)',
      explanation: 'Move inward. L=8 is a space. Skip. L becomes 9 ("p"). R=24 is "P". They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 9, right: 24, action: 'Skip space. Match "p" and "P".' },
    },
    {
      id: 6,
      title: 'Match "l"',
      explanation: 'Move inward. L=10 ("l"). R=23 is a space. Skip. R becomes 22 (":"), then 21 ("l"). They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 10, right: 21, action: 'Match "l" and "l".' },
    },
    {
      id: 7,
      title: 'Match "a"',
      explanation: 'Move inward. L=11 ("a"). R=20 ("a"). They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 11, right: 20, action: 'Match "a" and "a".' },
    },
    {
      id: 8,
      title: 'Match "n"',
      explanation: 'Move inward. L=12 ("n"). R=19 ("n"). They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 12, right: 19, action: 'Match "n" and "n".' },
    },
    {
      id: 9,
      title: 'Skip Comma and Match',
      explanation: 'Move inward. L=13 is a comma. Skip. L becomes 14 (space). Skip. L becomes 15 ("a"). R=18 is "a". They match.',
      state: { str: 'A man, a plan, a canal: Panama', left: 15, right: 18, action: 'Skip ", ". Match "a".' },
    },
    {
      id: 10,
      title: 'Midpoint Reached',
      explanation: 'Move inward. L=16 (space). Skip to 17 ("c"). R=17 ("c"). L and R meet. The loop terminates. All characters matched, so it is a valid palindrome.',
      state: { str: 'A man, a plan, a canal: Panama', left: 17, right: 17, action: 'L meets R. Valid!', found: true },
    },
  ],

  javaCode: `public class ValidPalindrome {
    public boolean isPalindrome(String s) {
        int left = 0, right = s.length() - 1;
        
        while (left < right) {
            // Skip non-alphanumeric characters
            while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
            while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
            
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            }
            left++;
            right--;
        }
        return true;
    }
}`,

  javaExplanation: [
    { line: 'while (left < right && !Character.isLetterOrDigit(...))', note: 'Skip spaces, commas, and punctuation.' },
    { line: 'Character.toLowerCase(...)', note: 'Compare characters case-insensitively.' },
    { line: 'left++; right--;', note: 'Move pointers inward after a successful match.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We process each character at most once.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Create a reversed copy of the string and compare.',
  },

  commonMistakes: [
    { title: 'Missing the `left < right` check', detail: 'If you only check `isLetterOrDigit`, you might go out of bounds on a string with only punctuation.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/' },
    { level: 'Easy', title: 'Valid Palindrome II', url: 'https://leetcode.com/problems/valid-palindrome-ii/' },
  ],

  quickRevision: [
    'Left = 0, Right = N-1.',
    'Skip non-alphanumeric.',
    'Compare lowercased chars.',
  ],
};

// ============================================================
// VALID ANAGRAM — The Frequency Map
// ============================================================
export const validAnagram = {
  id: 'valid-anagram',
  patternId: 'strings',
  title: 'Valid Anagram',
  subtitle: 'The Frequency Map',
  type: 'valid-anagram',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Determine if two strings are anagrams (contain the exact same characters with the same frequencies).',
    why: 'By counting the frequency of each character in the first string and subtracting for the second, we can verify they match in O(N) time.',
    when: 'Anagrams, permutations, or checking if two strings have the same character counts.',
    properties: [
      'Uses an integer array of size 26 (for a-z).',
      'Increment for string 1, decrement for string 2.',
      'All counts must be 0 at the end.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Valid Anagram".',
      '"Same characters, different order".',
    ],
    inputs: ['Two Strings'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Array',
      explanation: 'String 1: "anagram", String 2: "nagaram". We create an array of size 26 (representing a-z), initialized to 0. WHY: We need to track the difference in character counts between the two strings.',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'Init 26 zeros.' },
    },
    {
      id: 1,
      title: 'Process "a" and "n"',
      explanation: 'Index 0: Add "a" from String 1 (index 0 becomes 1). Subtract "n" from String 2 (index 13 becomes -1).',
      state: { str1: 'anagram', str2: 'nagaram', counts: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'a:+1, n:-1.' },
    },
    {
      id: 2,
      title: 'Process "n" and "a"',
      explanation: 'Index 1: Add "n" from String 1 (index 13 becomes 0). Subtract "a" from String 2 (index 0 becomes 0). They cancel out.',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'n:+1, a:-1.' },
    },
    {
      id: 3,
      title: 'Process "a" and "g"',
      explanation: 'Index 2: Add "a" (index 0 becomes 1). Subtract "g" (index 6 becomes -1).',
      state: { str1: 'anagram', str2: 'nagaram', counts: [1, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'a:+1, g:-1.' },
    },
    {
      id: 4,
      title: 'Process "g" and "a"',
      explanation: 'Index 3: Add "g" (index 6 becomes 0). Subtract "a" (index 0 becomes 0).',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'g:+1, a:-1.' },
    },
    {
      id: 5,
      title: 'Process "r" and "r"',
      explanation: 'Index 4: Add "r" (index 17 becomes 1). Subtract "r" (index 17 becomes 0). WHY: The same character is added and subtracted immediately.',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'r:+1, r:-1.' },
    },
    {
      id: 6,
      title: 'Process "a" and "a"',
      explanation: 'Index 5: Add "a" (index 0 becomes 1). Subtract "a" (index 0 becomes 0).',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'a:+1, a:-1.' },
    },
    {
      id: 7,
      title: 'Process "m" and "m"',
      explanation: 'Index 6: Add "m" (index 12 becomes 1). Subtract "m" (index 12 becomes 0).',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'm:+1, m:-1.' },
    },
    {
      id: 8,
      title: 'Final Check',
      explanation: 'We iterate through the counts. All values are exactly 0. This means both strings have the exact same characters with the same frequencies. They are anagrams.',
      state: { str1: 'anagram', str2: 'nagaram', counts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], action: 'All 0s. Valid Anagram!', found: true },
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
    { level: 'Medium', title: 'Group Anagrams', url: 'https://leetcode.com/problems/group-anagrams/' },
  ],

  quickRevision: [
    'Use int[26] for characters.',
    '++ for string 1, -- for string 2.',
    'All zeros means anagram.',
  ],
};

// ============================================================
// STRING COMPRESSION — In-place Modification
// ============================================================
export const stringCompression = {
  id: 'string-compression',
  patternId: 'strings',
  title: 'String Compression',
  subtitle: 'The Run-Length Encoding',
  type: 'string-compression',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Compress a string of characters in-place by replacing consecutive repeating characters with the character followed by the count.',
    why: 'We use a fast pointer to read through the array and a slow pointer to write the compressed characters.',
    when: 'Run-length encoding, or any in-place string/array modification where you need to overwrite the original data.',
    properties: [
      'In-place (O(1) space).',
      'Two pointers (Read and Write).',
      'Careful with counts > 9 (need to split into digits).',
    ],
  },

  patternRecognition: {
    clues: [
      '"Compress the string in-place".',
      '"Modify the input array in O(1) space".',
    ],
    inputs: ['Array of characters'],
    constraints: ['O(N) time', 'O(1) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Pointers',
      explanation: 'Chars: ["a","a","b","b","c","c","c"]. Read = 0, Write = 0. WHY: Read will scan ahead to count duplicates, while Write will stay behind to build the compressed version.',
      state: { str: 'a a b b c c c', read: 0, write: 0, action: 'Read at a, Write at 0.' },
    },
    {
      id: 1,
      title: 'Count "a"',
      explanation: 'Read counts consecutive "a"s. It moves to index 2. Count = 2. We write "a" at index 0. Write becomes 1.',
      state: { str: 'a a b b c c c', read: 2, write: 1, action: 'Write "a".' },
    },
    {
      id: 2,
      title: 'Write Count for "a"',
      explanation: 'Count > 1, so we write the count "2" at index 1. Write becomes 2.',
      state: { str: 'a 2 b b c c c', read: 2, write: 2, action: 'Write "2".' },
    },
    {
      id: 3,
      title: 'Count "b"',
      explanation: 'Read continues from index 2. Counts consecutive "b"s. Moves to index 4. Count = 2. We write "b" at index 2. Write becomes 3.',
      state: { str: 'a 2 b b c c c', read: 4, write: 3, action: 'Write "b".' },
    },
    {
      id: 4,
      title: 'Write Count for "b"',
      explanation: 'Write the count "2" at index 3. Write becomes 4.',
      state: { str: 'a 2 b 2 c c c', read: 4, write: 4, action: 'Write "2".' },
    },
    {
      id: 5,
      title: 'Count "c"',
      explanation: 'Read continues from index 4. Counts consecutive "c"s. Moves to index 7. Count = 3. We write "c" at index 4. Write becomes 5.',
      state: { str: 'a 2 b 2 c c c', read: 7, write: 5, action: 'Write "c".' },
    },
    {
      id: 6,
      title: 'Write Count for "c"',
      explanation: 'Write the count "3" at index 5. Write becomes 6.',
      state: { str: 'a 2 b 2 c 3', read: 7, write: 6, action: 'Write "3".' },
    },
    {
      id: 7,
      title: 'Final Result',
      explanation: 'Read reaches the end of the array. The algorithm stops. The compressed array is the first 6 characters: "a 2 b 2 c 3". Return the write pointer: 6.',
      state: { str: 'a 2 b 2 c 3', read: 7, write: 6, action: 'Return 6. Done!', found: true },
    },
  ],

  javaCode: `public class StringCompression {
    public int compress(char[] chars) {
        int write = 0;
        int read = 0;
        
        while (read < chars.length) {
            char currChar = chars[read];
            int count = 0;
            
            // Count consecutive identical characters
            while (read < chars.length && chars[read] == currChar) {
                read++;
                count++;
            }
            
            // Write the character
            chars[write++] = currChar;
            
            // Write the count (if > 1)
            if (count > 1) {
                for (char c : String.valueOf(count).toCharArray()) {
                    chars[write++] = c;
                }
            }
        }
        return write;
    }
}`,

  javaExplanation: [
    { line: 'while (read < chars.length && chars[read] == currChar)', note: 'Count how many times the current character repeats.' },
    { line: 'chars[write++] = currChar;', note: 'Write the character.' },
    { line: 'if (count > 1)', note: 'If the count is 1, we don\'t write the "1", just the character.' },
    { line: 'String.valueOf(count).toCharArray()', note: 'Handles counts >= 10 by writing each digit separately.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(1)',
    aux: 'O(1)',
    explanation: 'We iterate through the array once, writing in-place.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use a StringBuilder or an extra array to build the compressed result.',
  },

  commonMistakes: [
    { title: 'Not handling counts > 9', detail: 'If a character repeats 12 times, you must write "1" and "2" as separate characters, not "12".' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'String Compression', url: 'https://leetcode.com/problems/string-compression/' },
  ],

  quickRevision: [
    'Read counts consecutive chars.',
    'Write char.',
    'If count > 1, write digits.',
    'Return write pointer.',
  ],
};

export const stringsSubPatterns = [palindromeCheck, validAnagram, stringCompression];

export const stringsOverview = {
  id: 'strings',
  title: 'Strings',
  subtitle: 'Character-level processing and manipulation',
  introduction: 'Strings are sequences of characters. In Java, strings are immutable, which means every modification creates a new string. To manipulate strings efficiently in interviews, we often convert them to character arrays or use a StringBuilder.',
  coreConcept: {
    what: 'A sequence of characters.',
    why: 'Strings model text, which is everywhere. Understanding how to traverse, compare, and modify them efficiently is crucial.',
    when: 'Whenever the input involves text, words, or characters.',
  },
  whenToUse: [
    'The problem involves palindromes, anagrams, or substring searches.',
    'You need to parse or format text.',
  ],
  recognitionClues: [
    '"Anagram"',
    '"Palindrome"',
    '"Substring"',
    '"Compress"',
  ],
  importantProperties: [
    'Immutable in Java (use `toCharArray()` or `StringBuilder`).',
    'O(N) access time by index.',
    'ASCII vs Unicode.',
  ],
  comparison: [
    { aspect: 'Palindrome', when: 'Two Pointers', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Anagram', when: 'Frequency Map', time: 'O(N)', space: 'O(1)' },
    { aspect: 'Compression', when: 'In-place Two Pointers', time: 'O(N)', space: 'O(1)' },
  ],
  commonMistakes: [
    { title: 'String concatenation in a loop', detail: 'Using `str += char` inside a loop creates a new string every time, resulting in O(N²) time. Use `StringBuilder` instead.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Valid Palindrome', url: 'https://leetcode.com/problems/valid-palindrome/' },
    { level: 'Easy', title: 'Valid Anagram', url: 'https://leetcode.com/problems/valid-anagram/' },
    { level: 'Medium', title: 'Longest Substring Without Repeating Characters', url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/' },
    { level: 'Medium', title: 'String Compression', url: 'https://leetcode.com/problems/string-compression/' },
  ],
};