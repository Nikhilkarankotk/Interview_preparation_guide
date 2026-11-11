// ============================================================
// TREE DFS (PRE-ORDER) — The Maze Runner
// ============================================================
export const treeDFS = {
  id: 'tree-dfs',
  patternId: 'dfs',
  title: 'Tree DFS (Pre-order)',
  subtitle: 'The Maze Runner',
  type: 'tree-dfs',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Traverse a tree by going as deep as possible down the left branch before exploring the right branch.',
    why: 'DFS uses the call stack (or an explicit stack) to remember where to backtrack. It is perfect for problems where you need to explore a full path before trying another.',
    when: 'When you need to visit every node, copy a tree, or find a path from the root to a leaf.',
    properties: [
      'Root -> Left -> Right (Pre-order).',
      'Uses Recursion (or a Stack).',
      'Space complexity is O(H) where H is the height of the tree.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Pre-order / In-order / Post-order traversal".',
      '"Find the path from root to leaf".',
      '"Invert binary tree".',
    ],
    inputs: ['Binary Tree'],
    constraints: ['O(N) time', 'O(H) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start at Root',
      explanation: 'We start at the root node (1). In Pre-order, we process the node immediately, then go left.',
      state: {
        tree: [1, 2, 3, 4, 5], currentVal: 1, path: [1], stack: [1], action: 'Visit Root 1. Go Left.',
      },
    },
    {
      id: 1,
      title: 'Dive Left',
      explanation: 'We go to the left child (2). Process it. Then go to its left child (4).',
      state: {
        tree: [1, 2, 3, 4, 5], currentVal: 2, path: [1, 2, 4], stack: [1, 2], action: 'Visit 2. Go Left to 4.',
      },
    },
    {
      id: 2,
      title: 'Hit a Leaf',
      explanation: 'Node 4 has no children. We hit a dead end. We must backtrack to 2, and then explore its right child (5).',
      state: {
        tree: [1, 2, 3, 4, 5], currentVal: 4, path: [1, 2, 4], stack: [1, 2, 4], action: '4 is a leaf. Backtrack to 2.',
      },
    },
    {
      id: 3,
      title: 'Explore Right',
      explanation: 'We explore the right child of 2, which is 5. Then we backtrack all the way to 1, and go to its right child (3).',
      state: {
        tree: [1, 2, 3, 4, 5], currentVal: 5, path: [1, 2, 4, 5], stack: [1, 2], action: 'Visit 5. Backtrack to 1.',
      },
    },
    {
      id: 4,
      title: 'Finish Right Subtree',
      explanation: 'Visit 3. All nodes are visited.',
      state: {
        tree: [1, 2, 3, 4, 5], currentVal: 3, path: [1, 2, 4, 5, 3], stack: [1], action: 'Visit 3. Done.', found: true,
      },
    },
  ],

  javaCode: `public class TreeDFS {
    public void preorder(TreeNode root) {
        if (root == null) return;

        // 1. Process Node
        System.out.print(root.val + " ");

        // 2. Go Left
        preorder(root.left);

        // 3. Go Right
        preorder(root.right);
    }
}`,

  javaExplanation: [
    { line: 'if (root == null) return;', note: 'Base case: stop when we hit a leaf\'s child.' },
    { line: 'System.out.print(root.val + " ");', note: 'Process the node (Pre-order).' },
    { line: 'preorder(root.left);', note: 'Dive as deep as possible into the left subtree.' },
    { line: 'preorder(root.right);', note: 'Once left is fully explored, explore the right.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(H)',
    aux: 'O(H)',
    explanation: 'We visit every node once. The recursion stack goes as deep as the height of the tree (H).',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'BFS (Level Order) also takes O(N) time, but uses O(W) space where W is the max width of the tree.',
  },

  commonMistakes: [
    { title: 'Forgetting the base case', detail: 'If you don\'t check `if (root == null)`, you will get a NullPointerException.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Binary Tree Preorder Traversal', url: 'https://leetcode.com/problems/binary-tree-preorder-traversal/' },
    { level: 'Easy', title: 'Invert Binary Tree', url: 'https://leetcode.com/problems/invert-binary-tree/' },
    { level: 'Easy', title: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/' },
  ],

  quickRevision: [
    'Base case: if (root == null) return.',
    'Process node.',
    'Recurse left.',
    'Recurse right.',
  ],
};

// ============================================================
// PATH SUM — The Treasure Hunt
// ============================================================
export const pathSum = {
  id: 'path-sum',
  patternId: 'dfs',
  title: 'Path Sum',
  subtitle: 'The Treasure Hunt',
  type: 'path-sum',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Pass a running total (or a list of nodes) down the recursive DFS calls to check if a root-to-leaf path equals a target.',
    why: 'DFS naturally maintains the path from the root to the current node in the call stack. We just need to pass the accumulated sum as a parameter.',
    when: 'When you need to evaluate root-to-leaf paths or find paths that meet a condition.',
    properties: [
      'Passes state (current sum) downward.',
      'Must evaluate only at leaf nodes.',
      'Can be used to find all paths or just check existence.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Root-to-leaf path".',
      '"Path sum equals target".',
      '"Find all paths".',
    ],
    inputs: ['Binary Tree', 'Target Sum'],
    constraints: ['O(N) time', 'O(H) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start with Target',
      explanation: 'We want a path sum of 22. Start at root (5). We subtract 5 from the target: 22 - 5 = 17.',
      state: {
        tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 5, remaining: 17, path: [5], action: 'Target 22. Remaining: 17.',
      },
    },
    {
      id: 1,
      title: 'Go Left',
      explanation: 'Go left to 4. Remaining: 17 - 4 = 13.',
      state: {
        tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 4, remaining: 13, path: [5, 4], action: 'Remaining: 13.',
      },
    },
    {
      id: 2,
      title: 'Go Deeper Left',
      explanation: 'Go left to 11. Remaining: 13 - 11 = 2.',
      state: {
        tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 11, remaining: 2, path: [5, 4, 11], action: 'Remaining: 2.',
      },
    },
    {
      id: 3,
      title: 'Find the Treasure',
      explanation: 'Go left to 7. Remaining: 2 - 7 = -5. Not a leaf or wrong sum. Backtrack. Go right to 2. Remaining: 2 - 2 = 0. We are at a leaf and remaining is 0! Found a valid path.',
      state: {
        tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 2, remaining: 0, path: [5, 4, 11, 2], action: 'Remaining 0 at leaf. Found!', found: true,
      },
    },
  ],

  javaCode: `public class PathSum {
    public boolean hasPathSum(TreeNode root, int targetSum) {
        if (root == null) return false;

        // Check if we are at a leaf node
        if (root.left == null && root.right == null) {
            return targetSum == root.val;
        }

        // Recurse down, subtracting the current node's value
        boolean leftSum = hasPathSum(root.left, targetSum - root.val);
        boolean rightSum = hasPathSum(root.right, targetSum - root.val);

        return leftSum || rightSum;
    }
}`,

  javaExplanation: [
    { line: 'if (root.left == null && root.right == null)', note: 'We ONLY check the sum when we reach a leaf. A partial path doesn\'t count.' },
    { line: 'return targetSum == root.val;', note: 'If the remaining target equals the leaf\'s value, we found a valid path.' },
    { line: 'hasPathSum(root.left, targetSum - root.val);', note: 'Pass the updated target down the left subtree.' },
    { line: 'return leftSum || rightSum;', note: 'Return true if either the left or right path works.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(H)',
    aux: 'O(H)',
    explanation: 'We might visit every node in the worst case (if no path exists). Space is the height of the tree.',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'You could find all root-to-leaf paths using BFS and check their sums, but it uses more memory.',
  },

  commonMistakes: [
    { title: 'Checking sum at null nodes', detail: 'If you check `if (root == null)` instead of `if (leaf)`, an empty tree could falsely return true.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/' },
    { level: 'Medium', title: 'Path Sum II', url: 'https://leetcode.com/problems/path-sum-ii/' },
    { level: 'Medium', title: 'Path Sum III', url: 'https://leetcode.com/problems/path-sum-iii/' },
  ],

  quickRevision: [
    'Subtract current node from target.',
    'Check if at leaf and remaining == 0.',
    'Recurse left and right.',
  ],
};

// ============================================================
// GRID DFS (ISLAND COUNT) — The Flood Fill
// ============================================================
export const gridDFS = {
  id: 'grid-dfs',
  patternId: 'dfs',
  title: 'Grid DFS',
  subtitle: 'The Flood Fill',
  type: 'grid-dfs',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Explore all connected cells in a 2D grid that share a property.',
    why: 'DFS is perfect for finding "connected components". When we find a piece of land ("1"), we use DFS to sink the entire island by turning all connected "1"s into "0"s.',
    when: 'Counting islands, flood fill algorithms (like the paint bucket tool), finding connected regions.',
    properties: [
      'Usually modifies the grid in-place to mark visited cells.',
      'Explores up, down, left, right.',
      'Base cases: out of bounds OR water ("0").',
    ],
  },

  patternRecognition: {
    clues: [
      '"Number of islands".',
      '"Flood fill" / "Paint bucket".',
      '"Connected components" in a matrix.',
    ],
    inputs: ['2D Grid (Matrix) of chars/ints'],
    constraints: ['O(N*M) time', 'O(N*M) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Scan the Grid',
      explanation: 'We scan the grid. We find a "1" (land). We increment our island count to 1, and trigger DFS to "sink" this entire island.',
      state: {
        grid: [[1,1,0,0],[1,0,0,1],[0,0,1,1]], row: 0, col: 0, islands: 1, action: 'Found land at (0,0). Islands = 1.',
      },
    },
    {
      id: 1,
      title: 'DFS: Sink Left and Right',
      explanation: 'From (0,0), we sink the land at (0,1) and (1,0).',
      state: {
        grid: [[0,0,0,0],[0,0,0,1],[0,0,1,1]], row: 0, col: 1, islands: 1, action: 'Sinking (0,0), (0,1), (1,0).',
      },
    },
    {
      id: 2,
      title: 'Found Another Island',
      explanation: 'DFS finishes sinking the first island. We continue scanning. We find a "1" at (1,3). Islands = 2. DFS sinks it.',
      state: {
        grid: [[0,0,0,0],[0,0,0,0],[0,0,1,1]], row: 1, col: 3, islands: 2, action: 'Found land at (1,3). Islands = 2.',
      },
    },
    {
      id: 3,
      title: 'Last Island',
      explanation: 'Scanning continues. Find a "1" at (2,2). Islands = 3. DFS sinks the connected (2,3).',
      state: {
        grid: [[0,0,0,0],[0,0,0,0],[0,0,0,0]], row: 2, col: 3, islands: 3, action: 'Found land at (2,2). Islands = 3.', found: true,
      },
    },
  ],

  javaCode: `public class NumberOfIslands {
    public int numIslands(char[][] grid) {
        if (grid == null || grid.length == 0) return 0;
        int count = 0;

        for (int i = 0; i < grid.length; i++) {
            for (int j = 0; j < grid[0].length; j++) {
                if (grid[i][j] == '1') {
                    count++;
                    dfs(grid, i, j);
                }
            }
        }
        return count;
    }

    private void dfs(char[][] grid, int r, int c) {
        // Base case: out of bounds or water
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length || grid[r][c] == '0') {
            return;
        }

        // Sink the land
        grid[r][c] = '0';

        // Explore all 4 directions
        dfs(grid, r + 1, c);
        dfs(grid, r - 1, c);
        dfs(grid, r, c + 1);
        dfs(grid, r, c - 1);
    }
}`,

  javaExplanation: [
    { line: 'if (grid[i][j] == \'1\')', note: 'We found an unvisited island.' },
    { line: 'grid[r][c] = \'0\';', note: 'Crucial: Mark the cell as visited by turning it into water, so we don\'t visit it again.' },
    { line: 'dfs(grid, r + 1, c);', note: 'Recursively flood fill in all 4 directions.' },
  ],

  complexity: {
    time: 'O(N*M)',
    space: 'O(N*M)',
    aux: 'O(N*M)',
    explanation: 'We visit every cell at most once. The recursion stack can go as deep as N*M in the worst case (a giant island).',
  },

  bruteForce: {
    time: 'O(N*M)',
    space: 'O(N*M)',
    note: 'BFS does the same thing but uses an explicit Queue instead of the call stack.',
  },

  commonMistakes: [
    { title: 'Forgetting to mark visited', detail: 'If you don\'t set `grid[r][c] = \'0\'`, the DFS will loop infinitely between two connected cells.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/' },
    { level: 'Easy', title: 'Flood Fill', url: 'https://leetcode.com/problems/flood-fill/' },
    { level: 'Medium', title: 'Max Area of Island', url: 'https://leetcode.com/problems/max-area-of-island/' },
  ],

  quickRevision: [
    'Scan grid.',
    'If land found, islands++ and trigger DFS.',
    'DFS: if out of bounds or water, return.',
    'Mark as visited (sink it), then recurse 4 directions.',
  ],
};

export const dfsSubPatterns = [treeDFS, pathSum, gridDFS];

export const dfsOverview = {
  id: 'dfs',
  title: 'Depth-First Search (DFS)',
  subtitle: 'Dive deep into paths, trees, and connected components',
  introduction: 'Depth-First Search (DFS) is a fundamental traversal algorithm that explores as far as possible along each branch before backtracking. It relies on the call stack (recursion) or an explicit Stack. It is the go-to approach for finding paths, exploring structures, and solving backtracking puzzles.',
  coreConcept: {
    what: 'Exploring a graph or tree by going as deep as possible down one path before trying another.',
    why: 'DFS naturally handles path-finding and nested structures because the recursion stack keeps track of the exact path taken.',
    when: 'Tree traversals, path sums, grid connected components (islands), permutations/combinations.',
  },
  whenToUse: [
    'The problem asks for a specific path or nested structure.',
    'You need to explore all possibilities (backtracking).',
    'Counting connected components in a grid.',
  ],
  recognitionClues: [
    '"Root-to-leaf path"',
    '"Number of islands"',
    '"Permutations / Subsets"',
    '"Clone graph"',
  ],
  importantProperties: [
    'Uses Recursion or a Stack (LIFO).',
    'Space complexity is O(H) where H is the height/depth.',
    'Does NOT guarantee the shortest path (use BFS for that).',
  ],
  comparison: [
    { aspect: 'Tree DFS', when: 'Full traversal', time: 'O(N)', space: 'O(H)' },
    { aspect: 'Path Sum', when: 'Root-to-leaf paths', time: 'O(N)', space: 'O(H)' },
    { aspect: 'Grid DFS', when: 'Connected components', time: 'O(N*M)', space: 'O(N*M)' },
  ],
  commonMistakes: [
    { title: 'Infinite loops in grids', detail: 'Always mark a cell as visited as soon as you enter it.' },
    { title: 'Forgetting the base case', detail: 'Always check `if (node == null)` or `if (out of bounds)` first.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Path Sum', url: 'https://leetcode.com/problems/path-sum/' },
    { level: 'Medium', title: 'Number of Islands', url: 'https://leetcode.com/problems/number-of-islands/' },
    { level: 'Medium', title: 'Clone Graph', url: 'https://leetcode.com/problems/clone-graph/' },
    { level: 'Medium', title: 'Subsets', url: 'https://leetcode.com/problems/subsets/' },
  ],
};