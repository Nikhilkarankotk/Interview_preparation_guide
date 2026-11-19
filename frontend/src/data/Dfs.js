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
      explanation: 'We start at the root node (1). In Pre-order traversal, we process the node immediately, then go left. WHY: Pre-order means "Root, Left, Right". We record the root as visited and add it to our stack to remember where we are.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 1, path: [1], stack: [1], action: 'Visit Root 1.' },
    },
    {
      id: 1,
      title: 'Dive Left to 2',
      explanation: 'We go to the left child (2). We process it immediately and push it to the stack. WHY: DFS goes as deep as possible on the left side before exploring the right.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 2, path: [1, 2], stack: [1, 2], action: 'Visit 2.' },
    },
    {
      id: 2,
      title: 'Dive Left to 4 (Leaf)',
      explanation: 'We go to the left child of 2, which is 4. We process it and push it to the stack. Node 4 has no left or right children, so it is a leaf.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 4, path: [1, 2, 4], stack: [1, 2, 4], action: 'Visit 4 (Leaf).' },
    },
    {
      id: 3,
      title: 'Backtrack from 4',
      explanation: 'Since 4 is a leaf, we hit a dead end. The recursive call returns. We pop 4 from our stack and backtrack to its parent, 2.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 2, path: [1, 2], stack: [1, 2], action: 'Backtrack to 2.' },
    },
    {
      id: 4,
      title: 'Explore Right to 5 (Leaf)',
      explanation: 'We have finished the left side of 2. We now explore its right child (5). We process it and push it to the stack. 5 is also a leaf.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 5, path: [1, 2, 5], stack: [1, 2, 5], action: 'Visit 5 (Leaf).' },
    },
    {
      id: 5,
      title: 'Backtrack to 1',
      explanation: '5 is a leaf, so we backtrack. We pop 5, return to 2, pop 2, and return to 1. We have fully explored the left subtree of 1.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 1, path: [1], stack: [1], action: 'Backtrack to 1.' },
    },
    {
      id: 6,
      title: 'Explore Right to 3 (Leaf)',
      explanation: 'Now we explore the right child of 1, which is 3. We process it and push it to the stack.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 3, path: [1, 3], stack: [1, 3], action: 'Visit 3 (Leaf).' },
    },
    {
      id: 7,
      title: 'Final Backtrack',
      explanation: '3 is a leaf. We backtrack to 1, and pop 1. The stack is empty. All nodes have been visited.',
      state: { tree: [1, 2, 3, 4, 5], currentVal: 1, path: [1], stack: [], action: 'Done.', found: true },
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
      title: 'Start at Root (5)',
      explanation: 'We want a path sum of 22. We start at the root (5). We subtract 5 from the target: 22 - 5 = 17. WHY: Instead of adding up the path, we subtract each node value from the target. If we hit a leaf and the remaining target is 0, we found our path.',
      state: { tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 5, remaining: 17, path: [5], action: 'Remaining target: 17.' },
    },
    {
      id: 1,
      title: 'Go Left to 4',
      explanation: 'We go left to node 4. Remaining target: 17 - 4 = 13.',
      state: { tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 4, remaining: 13, path: [5, 4], action: 'Remaining target: 13.' },
    },
    {
      id: 2,
      title: 'Go Left to 11',
      explanation: 'We go left to node 11. Remaining target: 13 - 11 = 2.',
      state: { tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 11, remaining: 2, path: [5, 4, 11], action: 'Remaining target: 2.' },
    },
    {
      id: 3,
      title: 'Check Left Leaf (7)',
      explanation: 'We go left to node 7. Remaining target: 2 - 7 = -5. Node 7 is a leaf. Since the remaining target is not 0, this path fails. We must backtrack.',
      state: { tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 7, remaining: -5, path: [5, 4, 11, 7], action: 'Leaf 7 fails. Backtrack.' },
    },
    {
      id: 4,
      title: 'Backtrack to 11',
      explanation: 'We return to node 11. The remaining target is restored to 2.',
      state: { tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 11, remaining: 2, path: [5, 4, 11], action: 'Backtracked to 11.' },
    },
    {
      id: 5,
      title: 'Check Right Leaf (2)',
      explanation: 'We go right to node 2. Remaining target: 2 - 2 = 0. Node 2 is a leaf, and the remaining target is exactly 0! We found a valid path.',
      state: { tree: [5, 4, 8, 11, null, 13, 4, 7, 2], currentVal: 2, remaining: 0, path: [5, 4, 11, 2], action: 'Remaining 0 at leaf. Found!', found: true },
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
      title: 'Scan Grid - Find Land',
      explanation: 'We scan the grid row by row. At (0,0), we find a "1". This is a new island. We increment our island count to 1 and trigger DFS to sink this whole island. WHY: DFS will spread from this cell to all connected land, marking them as visited so we don\'t count them as a new island later.',
      state: { grid: [[1,1,0],[1,0,0],[0,0,1]], row: 0, col: 0, islands: 1, action: 'Found land at (0,0). Islands = 1.' },
    },
    {
      id: 1,
      title: 'DFS: Sink (0,0)',
      explanation: 'DFS starts at (0,0). We sink the land by changing it to "0". We then recursively check its neighbors (up, down, left, right).',
      state: { grid: [[0,1,0],[1,0,0],[0,0,1]], row: 0, col: 0, islands: 1, action: 'Sink (0,0).' },
    },
    {
      id: 2,
      title: 'DFS: Explore Right (0,1)',
      explanation: 'The right neighbor (0,1) is a "1". We sink it to "0" and recurse from there.',
      state: { grid: [[0,0,0],[1,0,0],[0,0,1]], row: 0, col: 1, islands: 1, action: 'Sink (0,1).' },
    },
    {
      id: 3,
      title: 'DFS: Explore Down (1,0)',
      explanation: 'The right neighbor of (0,1) is out of bounds, and its down neighbor (1,1) is "0" (water). It returns. Back at (0,0), we explore its down neighbor (1,0). It is a "1". We sink it and recurse.',
      state: { grid: [[0,0,0],[0,0,0],[0,0,1]], row: 1, col: 0, islands: 1, action: 'Sink (1,0).' },
    },
    {
      id: 4,
      title: 'DFS: Neighbors of (1,0)',
      explanation: '(1,0) checks its neighbors. Up is (0,0) which is now "0". Down is (2,0) which is "0". Right is (1,1) which is "0". All water. DFS returns completely. The first island is fully sunk.',
      state: { grid: [[0,0,0],[0,0,0],[0,0,1]], row: 1, col: 0, islands: 1, action: 'Island 1 sunk.' },
    },
    {
      id: 5,
      title: 'Scan Grid - Find Second Island',
      explanation: 'The scan continues. Cells (0,1), (0,2), (1,0), (1,1), (1,2), (2,0), (2,1) are all "0". At (2,2), we find a "1". This is a new island. Islands = 2.',
      state: { grid: [[0,0,0],[0,0,0],[0,0,1]], row: 2, col: 2, islands: 2, action: 'Found land at (2,2). Islands = 2.' },
    },
    {
      id: 6,
      title: 'DFS: Sink (2,2)',
      explanation: 'DFS starts at (2,2). We sink it to "0". All of its neighbors are out of bounds or water. DFS returns immediately.',
      state: { grid: [[0,0,0],[0,0,0],[0,0,0]], row: 2, col: 2, islands: 2, action: 'Sink (2,2).' },
    },
    {
      id: 7,
      title: 'Final Count',
      explanation: 'The grid scan is complete. We have found and sunk all islands. The total number of islands is 2.',
      state: { grid: [[0,0,0],[0,0,0],[0,0,0]], row: 2, col: 2, islands: 2, action: 'Done. Total islands = 2.', found: true },
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