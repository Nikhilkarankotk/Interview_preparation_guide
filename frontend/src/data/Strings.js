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
      title: 'Setup',
      explanation: 'String: "A man, a plan, a canal: Panama". We use L=0 and R=length-1.',
      state: {
        str: 'A man, a plan, a canal: Panama', left: 0, right: 29, action: 'L at "A", R at "a".',
      },
    },
    {
      id: 1,
      title: 'Skip Non-Alphanumeric',
      explanation: 'L points to "A" (valid). R points to "a" (valid). They match (ignoring case). Move both.',
      state: {
        str: 'A man, a plan, a canal: Panama', left: 1, right: 28, action: 'Match "A" and "a". L++, R--.',
      },
    },
    {
      id: 2,
      title: 'Skip Spaces and Commas',
      explanation: 'L points to space (skip). R points to "m" (valid). L moves to "m" (valid). They match.',
      state: {
        str: 'A man, a plan, a canal: Panama', left: 2, right: 27, action: 'Skip spaces. Match "m".',
      },
    },
    {
      id: 3,
      title: 'Continue...',
      explanation: 'This pattern continues until L >= R, verifying the palindrome.',
      state: {
        str: 'A man, a plan, a canal: Panama', left: 15, right: 15, action: 'Midpoint reached. Valid Palindrome!', found: true,
      },
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
      title: 'Init Count Array',
      explanation: 'String 1: "anagram", String 2: "nagaram". Create an array of size 26 (0s).',
      state: {
        str1: 'anagram', str2: 'nagaram', counts: [0,0,0,0,0,0,0,0,0,0,0,0,0], action: 'Init counts to 0.',
      },
    },
    {
      id: 1,
      title: 'Count String 1',
      explanation: 'Increment for each char in "anagram". e.g., "a" becomes 3.',
      state: {
        str1: 'anagram', str2: 'nagaram', counts: [3,0,0,0,0,0,1,0,0,0,0,0,1], action: 'Count "anagram".',
      },
    },
    {
      id: 2,
      title: 'Subtract String 2',
      explanation: 'Decrement for each char in "nagaram".',
      state: {
        str1: 'anagram', str2: 'nagaram', counts: [0,0,0,0,0,0,0,0,0,0,0,0,0], action: 'Subtract "nagaram". All 0s!',
      },
    },
    {
      id: 3,
      title: 'Check',
      explanation: 'All counts are 0. They are anagrams.',
      state: {
        str1: 'anagram', str2: 'nagaram', counts: [0,0,0,0,0,0,0,0,0,0,0,0,0], action: 'Valid Anagram!', found: true,
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
      title: 'Init Pointers',
      explanation: 'Chars: ["a","a","b","b","c","c","c"]. Read = 0, Write = 0.',
      state: {
        str: 'a a b b c c c', read: 0, write: 0, action: 'Read at a, Write at 0.',
      },
    },
    {
      id: 1,
      title: 'Count "a"',
      explanation: 'Read counts 2 "a"s. Write "a" and "2" at index 0 and 1. Write becomes 2.',
      state: {
        str: 'a 2 b b c c c', read: 2, write: 2, action: 'Write "a", "2".',
      },
    },
    {
      id: 2,
      title: 'Count "b"',
      explanation: 'Read counts 2 "b"s. Write "b" and "2" at index 2 and 3. Write becomes 4.',
      state: {
        str: 'a 2 b 2 c c c', read: 4, write: 4, action: 'Write "b", "2".',
      },
    },
    {
      id: 3,
      title: 'Count "c"',
      explanation: 'Read counts 3 "c"s. Write "c" and "3". Write becomes 6. Return length 6.',
      state: {
        str: 'a 2 b 2 c 3', read: 7, write: 6, action: 'Write "c", "3". Length = 6.', found: true,
      },
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