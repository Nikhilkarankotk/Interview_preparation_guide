// ============================================================
// BASIC TRIE — Insert, Search, StartsWith
// ============================================================
export const basicTrie = {
  id: 'basic-trie',
  patternId: 'trie',
  title: 'Basic Trie',
  subtitle: 'The Prefix Tree',
  type: 'basic-trie',
  difficulty: 'Medium',

  coreConcept: {
    what: 'A tree-like data structure used to store and retrieve strings efficiently.',
    why: 'It allows us to search for a word or prefix in O(L) time, where L is the length of the word, regardless of how many words are in the dictionary.',
    when: 'Autocomplete, spell checkers, IP routing, or any problem asking for fast prefix matching.',
    properties: [
      'Each node represents a single character.',
      'Paths from the root down represent words.',
      'A boolean flag (`isEnd`) marks the end of a valid word.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Implement a Trie".',
      '"Search for a prefix".',
      '"Autocomplete / Word Dictionary".',
    ],
    inputs: ['Stream of strings to insert, search, or prefix-match'],
    constraints: ['O(L) time per operation', 'O(N * L) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Trie',
      explanation: 'We start with an empty root node. It has no character and no children.',
      state: {
        word: '', path: ['Root'], isEnd: false, action: 'Empty Trie initialized.',
      },
    },
    {
      id: 1,
      title: 'Insert "apple"',
      explanation: 'We traverse the characters a -> p -> p -> l -> e. Since the root is empty, we create new nodes for each character.',
      state: {
        word: 'apple', path: ['Root', 'a', 'p', 'p', 'l', 'e'], isEnd: true, action: 'Inserted "apple". Node "e" is marked as End.',
      },
    },
    {
      id: 2,
      title: 'Search "apple"',
      explanation: 'We traverse a -> p -> p -> l -> e. All nodes exist, and the final node has `isEnd = true`. Return true.',
      state: {
        word: 'apple', path: ['Root', 'a', 'p', 'p', 'l', 'e'], isEnd: true, action: 'Word found!', found: true,
      },
    },
    {
      id: 3,
      title: 'StartsWith "app"',
      explanation: 'We traverse a -> p -> p. We reach the end of the prefix successfully. We don\'t care if `isEnd` is true. Return true.',
      state: {
        word: 'app', path: ['Root', 'a', 'p', 'p'], isEnd: false, action: 'Prefix found!', found: true,
      },
    },
    {
      id: 4,
      title: 'Search "app"',
      explanation: 'We traverse a -> p -> p. The node exists, but `isEnd` is false because we only inserted "apple". Return false.',
      state: {
        word: 'app', path: ['Root', 'a', 'p', 'p'], isEnd: false, action: 'Word not found (Prefix only).', found: false,
      },
    },
  ],

  javaCode: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    private TrieNode root;

    public Trie() {
        root = new TrieNode();
    }

    public void insert(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) {
                curr.children[idx] = new TrieNode();
            }
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return curr.isEnd;
    }

    public boolean startsWith(String prefix) {
        TrieNode curr = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) return false;
            curr = curr.children[idx];
        }
        return true;
    }
}`,

  javaExplanation: [
    { line: 'TrieNode[] children = new TrieNode[26];', note: 'Each node has 26 potential children (for a-z).' },
    { line: 'curr.children[idx] = new TrieNode();', note: 'Create a node if the path doesn\'t exist yet.' },
    { line: 'curr.isEnd = true;', note: 'Mark the end of a complete word.' },
    { line: 'return curr.isEnd;', note: 'For search, the path must exist AND `isEnd` must be true.' },
  ],

  complexity: {
    time: 'O(L)',
    space: 'O(N * L)',
    aux: 'O(1)',
    explanation: 'L is the length of the word. N is the number of words inserted. Space is for the Trie nodes.',
  },

  bruteForce: {
    time: 'O(N * L)',
    space: 'O(N)',
    note: 'Store all words in a HashSet. Checking a prefix requires iterating through all words.',
  },

  commonMistakes: [
    { title: 'Confusing search and startsWith', detail: 'search must check `isEnd`. startsWith only checks if the path exists.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Implement Trie (Prefix Tree)', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
  ],

  quickRevision: [
    'Node has children array and isEnd boolean.',
    'Insert: create nodes, set isEnd.',
    'Search: traverse path, return isEnd.',
    'StartsWith: traverse path, return true.',
  ],
};

// ============================================================
// WILDCARD SEARCH — Word Dictionary
// ============================================================
export const wildcardSearch = {
  id: 'wildcard-search',
  patternId: 'trie',
  title: 'Wildcard Search',
  subtitle: 'Word Dictionary',
  type: 'wildcard-search',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Search for words in a Trie where the search term can contain "." representing any single letter.',
    why: 'When we encounter a ".", we must branch our search to all existing children at that level. This requires DFS and Backtracking.',
    when: 'Word Dictionary problems, regular expression matching.',
    properties: [
      'Standard Trie insertion.',
      'Search uses DFS.',
      'On ".", loop through all non-null children.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Word Dictionary" / "Wildcard matching".',
      'Search strings contain "."',
    ],
    inputs: ['Strings with "." characters'],
    constraints: ['O(26^M) worst case for search', 'O(N * L) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Insert "bad" and "dad"',
      explanation: 'We insert "bad" and "dad". The root has children "b" and "d".',
      state: {
        word: 'bad, dad', path: ['Root', 'b', 'a', 'd'], isEnd: true, action: 'Trie built.',
      },
    },
    {
      id: 1,
      title: 'Search ".ad"',
      explanation: 'First char is ".". We must explore BOTH "b" and "d" paths.',
      state: {
        word: '.ad', path: ['Root', '.'], isEnd: false, action: 'Hit wildcard. Branching to b and d.',
      },
    },
    {
      id: 2,
      title: 'Explore "bad" path',
      explanation: 'Path "b" -> "a" -> "d" exists and `isEnd` is true. Found a match!',
      state: {
        word: '.ad', path: ['Root', 'b', 'a', 'd'], isEnd: true, action: 'Found "bad". Returning true.', found: true,
      },
    },
  ],

  javaCode: `class WordDictionary {
    TrieNode root;

    public WordDictionary() {
        root = new TrieNode();
    }

    public void addWord(String word) {
        TrieNode curr = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (curr.children[idx] == null) curr.children[idx] = new TrieNode();
            curr = curr.children[idx];
        }
        curr.isEnd = true;
    }

    public boolean search(String word) {
        return dfs(word, 0, root);
    }

    private boolean dfs(String word, int idx, TrieNode node) {
        if (node == null) return false;
        if (idx == word.length()) return node.isEnd;

        char c = word.charAt(idx);
        if (c == '.') {
            for (TrieNode child : node.children) {
                if (dfs(word, idx + 1, child)) return true;
            }
            return false;
        } else {
            return dfs(word, idx + 1, node.children[c - 'a']);
        }
    }
}`,

  javaExplanation: [
    { line: 'if (c == \'.\')', note: 'If we see a wildcard, we must try ALL possible children.' },
    { line: 'for (TrieNode child : node.children)', note: 'Explore every non-null child.' },
    { line: 'return dfs(word, idx + 1, node.children[c - \'a\']);', note: 'For regular characters, just go down that specific path.' },
  ],

  complexity: {
    time: 'O(N) to insert, O(26^M) to search',
    space: 'O(N * L)',
    aux: 'O(M)',
    explanation: 'M is the length of the search word. 26^M is the worst case if all characters are ".".',
  },

  bruteForce: {
    time: 'O(N * L)',
    space: 'O(N)',
    note: 'Store all words in a list, and manually check every word against the wildcard pattern.',
  },

  commonMistakes: [
    { title: 'Not checking `idx == word.length()`', detail: 'The base case must check if we have reached the end of the word, not just if the node exists.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Design Add and Search Words Data Structure', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
  ],

  quickRevision: [
    'Trie + DFS.',
    'If char is ".", loop all children.',
    'Else, go to specific child.',
    'Base case: length == word.length, return isEnd.',
  ],
};

// ============================================================
// BITWISE TRIE — Maximum XOR
// ============================================================
export const bitwiseTrie = {
  id: 'bitwise-trie',
  patternId: 'trie',
  title: 'Bitwise Trie',
  subtitle: 'Maximum XOR',
  type: 'bitwise-trie',
  difficulty: 'Hard',

  coreConcept: {
    what: 'A Trie where each node stores a bit (0 or 1) instead of a character.',
    why: 'To maximize the XOR of two numbers, we want to pick a number that has the opposite bits of the current number, starting from the most significant bit.',
    when: 'Maximum XOR of two numbers in an array, or finding the maximum XOR of a subarray.',
    properties: [
      'Nodes have exactly 2 children: 0 and 1.',
      'Insert numbers from the 31st bit down to the 0th bit.',
      'Greedily traverse the opposite bit if it exists.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Maximum XOR of two numbers".',
      '"Find the pair with maximum XOR".',
    ],
    inputs: ['Array of integers'],
    constraints: ['O(N * 32) time', 'O(N * 32) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Insert Numbers',
      explanation: 'Insert 3 (011), 10 (1010), 5 (0101), 25 (11001), 2 (0010) into the Trie starting from the highest bit.',
      state: {
        word: '3, 10, 5, 25, 2', path: ['Root', '0/1'], isEnd: false, action: 'Trie built from bit representations.',
      },
    },
    {
      id: 1,
      title: 'Find Max XOR for 5',
      explanation: '5 is 0101. To maximize XOR, we want opposite bits. Start at highest bit (0). We want a 1. The Trie has a 1 path! Go right.',
      state: {
        word: '5 (0101)', path: ['Root', '1'], isEnd: false, action: 'Want 1, found 1.',
      },
    },
    {
      id: 2,
      title: 'Continue Traversal',
      explanation: 'Next bit is 1. We want 0. The Trie has 0. Go left. Next bit is 0. We want 1. Go right. Next bit is 1. We want 0. We find 0. Number is 1010 (10).',
      state: {
        word: '5 (0101)', path: ['Root', '1', '0', '1', '0'], isEnd: true, action: 'Max XOR pair: 5 ^ 10 = 15.', found: true,
      },
    },
  ],

  javaCode: `class BitTrieNode {
    BitTrieNode[] children = new BitTrieNode[2];
}

class Solution {
    public int findMaximumXOR(int[] nums) {
        BitTrieNode root = new BitTrieNode();
        
        // 1. Build the Trie
        for (int num : nums) {
            BitTrieNode curr = root;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >> i) & 1;
                if (curr.children[bit] == null) {
                    curr.children[bit] = new BitTrieNode();
                }
                curr = curr.children[bit];
            }
        }
        
        // 2. Find Max XOR
        int maxXor = 0;
        for (int num : nums) {
            BitTrieNode curr = root;
            int currXor = 0;
            for (int i = 31; i >= 0; i--) {
                int bit = (num >> i) & 1;
                int desired = 1 - bit; // We want the opposite bit
                
                if (curr.children[desired] != null) {
                    currXor |= (1 << i); // Add to XOR result
                    curr = curr.children[desired];
                } else {
                    curr = curr.children[bit];
                }
            }
            maxXor = Math.max(maxXor, currXor);
        }
        return maxXor;
    }
}`,

  javaExplanation: [
    { line: 'for (int i = 31; i >= 0; i--)', note: 'Start from the most significant bit (31) down to 0.' },
    { line: 'int desired = 1 - bit;', note: 'We want the opposite bit to maximize XOR.' },
    { line: 'if (curr.children[desired] != null)', note: 'If the opposite bit exists, take it. This guarantees a 1 in the XOR result.' },
    { line: 'currXor |= (1 << i);', note: 'Set the i-th bit of the XOR result to 1.' },
  ],

  complexity: {
    time: 'O(N * 32) = O(N)',
    space: 'O(N * 32) = O(N)',
    aux: 'O(N)',
    explanation: 'We process 32 bits for each number. 32 is a constant, so time is O(N).',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Calculate XOR for every pair of numbers.',
  },

  commonMistakes: [
    { title: 'Starting from bit 0', detail: 'You must start from the highest bit (31) because higher bits contribute more to the final value.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Maximum XOR of Two Numbers in an Array', url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' },
    { level: 'Hard', title: 'Maximum XOR With an Element From Array', url: 'https://leetcode.com/problems/maximum-xor-with-an-element-from-array/' },
  ],

  quickRevision: [
    'Trie of bits (0 and 1).',
    'Insert 31 to 0.',
    'Greedily pick opposite bit for max XOR.',
  ],
};

export const trieSubPatterns = [basicTrie, wildcardSearch, bitwiseTrie];

export const trieOverview = {
  id: 'trie',
  title: 'Trie (Prefix Tree)',
  subtitle: 'Efficient string retrieval and prefix matching',
  introduction: 'A Trie (pronounced "try") is a tree-like data structure used to store an associative array where the keys are usually strings. Unlike a binary search tree, no node in the tree stores the key associated with that node; instead, its position in the tree defines the key with which it is associated.',
  coreConcept: {
    what: 'A tree where each node represents a character, and paths represent words.',
    why: 'Provides O(L) time for inserting, searching, and prefix matching, where L is the length of the word.',
    when: 'Autocomplete, spell checkers, word games, and bitwise operations.',
  },
  whenToUse: [
    'You need to quickly check if a prefix exists.',
    'You need to store a dictionary of words and search them efficiently.',
    'The problem involves bitwise XOR maximization.',
  ],
  recognitionClues: [
    '"Implement a Trie"',
    '"Word Dictionary"',
    '"Prefix matching"',
    '"Maximum XOR"',
  ],
  importantProperties: [
    'Each node has up to 26 children (for a-z).',
    'O(L) insertion and search.',
    'Can be combined with DFS for wildcard searches.',
  ],
  comparison: [
    { aspect: 'Basic Trie', when: 'Insert/Search words', time: 'O(L)', space: 'O(N * L)' },
    { aspect: 'Wildcard', when: 'Search with "."', time: 'O(26^M)', space: 'O(N * L)' },
    { aspect: 'Bitwise', when: 'Max XOR', time: 'O(N * 32)', space: 'O(N * 32)' },
  ],
  commonMistakes: [
    { title: 'Confusing search and startsWith', detail: 'search must check `isEnd`, startsWith only checks the path.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Implement Trie (Prefix Tree)', url: 'https://leetcode.com/problems/implement-trie-prefix-tree/' },
    { level: 'Medium', title: 'Design Add and Search Words Data Structure', url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/' },
    { level: 'Medium', title: 'Maximum XOR of Two Numbers in an Array', url: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/' },
  ],
};