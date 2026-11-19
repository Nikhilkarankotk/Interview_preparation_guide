// ============================================================
// LEVEL ORDER TRAVERSAL — The Layer Cake
// ============================================================
export const levelOrder = {
  id: 'level-order',
  patternId: 'bfs',
  title: 'Level Order Traversal',
  subtitle: 'The Layer Cake',
  type: 'level-order',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Traverse a tree level by level, from top to bottom, left to right.',
    why: 'A Queue (FIFO) perfectly maintains the order of nodes. By processing all nodes currently in the queue before adding their children, we naturally process the tree layer by layer.',
    when: 'When you need to process a tree level by level, or find the minimum depth of a tree.',
    properties: [
      'Uses a Queue (FIFO).',
      'We take a snapshot of the queue size at the start of each level.',
      'The queue size tells us exactly how many nodes are in the current level.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Level order traversal".',
      '"Minimum depth of a binary tree".',
      '"Right side view of a tree".',
    ],
    inputs: ['Binary Tree'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Queue',
      explanation: 'We start by pushing the root node (3) into the queue. WHY: BFS always starts at the root and explores outwards. The queue will manage the order of nodes to visit.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 3, queue: [3], level: 0, result: [], action: 'Push root to queue.' },
    },
    {
      id: 1,
      title: 'Level 0: Snapshot Size',
      explanation: 'We enter the while loop. We take a snapshot of the queue size: `levelSize = 1`. WHY: This snapshot is critical. As we process node 3, we will add its children to the queue. If we didn\'t snapshot the size, our loop would accidentally process the children in the same level.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 3, queue: [3], level: 0, result: [], action: 'Level 0 size = 1.' },
    },
    {
      id: 2,
      title: 'Level 0: Process Node 3',
      explanation: 'We pop 3 from the queue. We add 3 to our current level list. Since 3 has a left (9) and right (20) child, we push both to the queue.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 3, queue: [9, 20], level: 0, result: [[3]], action: 'Pop 3, push 9, 20.' },
    },
    {
      id: 3,
      title: 'Level 1: Snapshot Size',
      explanation: 'Level 0 is complete and added to the result. The queue now has 2 nodes. We snapshot the size: `levelSize = 2`. These are the nodes for Level 1.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 9, queue: [9, 20], level: 1, result: [[3]], action: 'Level 1 size = 2.' },
    },
    {
      id: 4,
      title: 'Level 1: Process Node 9',
      explanation: 'We pop 9. 9 has no children, so we do nothing else.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 9, queue: [20], level: 1, result: [[3]], action: 'Pop 9. No children.' },
    },
    {
      id: 5,
      title: 'Level 1: Process Node 20',
      explanation: 'We pop 20. 20 has left (15) and right (7) children. We push both to the queue. The levelSize was 2, so the for-loop ends. We add [9, 20] to the result.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 20, queue: [15, 7], level: 1, result: [[3], [9, 20]], action: 'Pop 20, push 15, 7.' },
    },
    {
      id: 6,
      title: 'Level 2: Snapshot Size',
      explanation: 'Level 1 is complete. The queue has 2 nodes (15, 7). We snapshot the size: `levelSize = 2`.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 15, queue: [15, 7], level: 2, result: [[3], [9, 20]], action: 'Level 2 size = 2.' },
    },
    {
      id: 7,
      title: 'Level 2: Process Nodes',
      explanation: 'We pop 15 (no children). We pop 7 (no children). We add [15, 7] to the result.',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 7, queue: [], level: 2, result: [[3], [9, 20], [15, 7]], action: 'Pop 15, 7.' },
    },
    {
      id: 8,
      title: 'Final Result',
      explanation: 'The queue is empty. The while loop terminates. The final result is [[3], [9, 20], [15, 7]].',
      state: { tree: [3, 9, 20, null, null, 15, 7], currentVal: 7, queue: [], level: 2, result: [[3], [9, 20], [15, 7]], action: 'Done.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class LevelOrder {
    public List<List<Integer>> levelOrder(TreeNode root) {
        List<List<Integer>> result = new ArrayList<>();
        if (root == null) return result;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while (!queue.isEmpty()) {
            int levelSize = queue.size();
            List<Integer> currentLevel = new ArrayList<>();

            for (int i = 0; i < levelSize; i++) {
                TreeNode node = queue.poll();
                currentLevel.add(node.val);

                if (node.left != null) queue.offer(node.left);
                if (node.right != null) queue.offer(node.right);
            }
            result.add(currentLevel);
        }
        return result;
    }
}`,

  javaExplanation: [
    { line: 'int levelSize = queue.size();', note: 'Snapshot the size! This tells us exactly how many nodes are in the current level.' },
    { line: 'for (int i = 0; i < levelSize; i++)', note: 'Process exactly the number of nodes in this level.' },
    { line: 'queue.offer(node.left);', note: 'Add children to the back of the queue for the next level.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Each node is processed exactly once. The queue holds at most one level, which is O(N) in the worst case.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Calculate the height of the tree, then recursively print each level by passing the current level.',
  },

  commonMistakes: [
    { title: 'Not taking a level size snapshot', detail: 'If you just loop `while (!queue.isEmpty())`, you will process children immediately, mixing levels together.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
    { level: 'Easy', title: 'Average of Levels in Binary Tree', url: 'https://leetcode.com/problems/average-of-levels-in-binary-tree/' },
    { level: 'Medium', title: 'Binary Tree Right Side View', url: 'https://leetcode.com/problems/binary-tree-right-side-view/' },
  ],

  quickRevision: [
    'Use a Queue.',
    'While queue not empty:',
    '  Snapshot size.',
    '  Pop `size` elements, push children.',
  ],
};

// ============================================================
// SHORTEST PATH — The Grid Runner
// ============================================================
export const shortestPath = {
  id: 'shortest-path',
  patternId: 'bfs',
  title: 'Shortest Path in Matrix',
  subtitle: 'The Grid Runner',
  type: 'shortest-path',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the shortest path from the top-left to the bottom-right of a grid.',
    why: 'BFS explores the grid layer by layer. The first time we reach the destination, we are guaranteed to have taken the shortest path because all edges have a weight of 1.',
    when: 'Grid problems, mazes, finding minimum steps to reach a target.',
    properties: [
      'Queue stores coordinates `(row, col)`.',
      'We track the distance inside the queue or by levels.',
      '8-directional or 4-directional movement.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Shortest path".',
      '"Minimum steps".',
      'Grid with obstacles.',
    ],
    inputs: ['2D Grid / Matrix'],
    constraints: ['O(N*M) time', 'O(N*M) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Queue',
      explanation: 'Grid is 3x3. We start at (0,0) with distance 1. We push `(0,0,1)` into the queue and mark (0,0) as visited by changing it to 1. WHY: Marking visited immediately prevents adding the same cell to the queue multiple times, which saves memory.',
      state: { grid: [[0,0,0],[1,1,0],[1,1,0]], row: 0, col: 0, queue: [{r:0,c:0,dist:1}], action: 'Start at (0,0) dist=1.' },
    },
    {
      id: 1,
      title: 'Explore (0,0)',
      explanation: 'We pop `(0,0,1)`. We check its neighbors. Right is (0,1) which is 0 (open). We push `(0,1,2)` and mark it 1. Down is (1,0) which is 1 (wall), so we skip it.',
      state: { grid: [[1,1,0],[1,1,0],[1,1,0]], row: 0, col: 1, queue: [{r:0,c:1,dist:2}], action: 'Push (0,1) dist=2.' },
    },
    {
      id: 2,
      title: 'Explore (0,1)',
      explanation: 'We pop `(0,1,2)`. Right is (0,2) which is 0. We push `(0,2,3)` and mark it. Down is (1,1) which is 1 (wall), skip.',
      state: { grid: [[1,1,1],[1,1,0],[1,1,0]], row: 0, col: 2, queue: [{r:0,c:2,dist:3}], action: 'Push (0,2) dist=3.' },
    },
    {
      id: 3,
      title: 'Explore (0,2)',
      explanation: 'We pop `(0,2,3)`. Down is (1,2) which is 0. We push `(1,2,4)` and mark it. (Left and right are out of bounds).',
      state: { grid: [[1,1,1],[1,1,1],[1,1,0]], row: 1, col: 2, queue: [{r:1,c:2,dist:4}], action: 'Push (1,2) dist=4.' },
    },
    {
      id: 4,
      title: 'Explore (1,2)',
      explanation: 'We pop `(1,2,4)`. Down is (2,2) which is 0. We push `(2,2,5)` and mark it.',
      state: { grid: [[1,1,1],[1,1,1],[1,1,1]], row: 2, col: 2, queue: [{r:2,c:2,dist:5}], action: 'Push (2,2) dist=5.' },
    },
    {
      id: 5,
      title: 'Reached Target',
      explanation: 'We pop `(2,2,5)`. We check if it is the bottom-right corner. It is! We return the distance 5. WHY: Because BFS explores level by level, the first time we pop the target, we are guaranteed it is the shortest path.',
      state: { grid: [[1,1,1],[1,1,1],[1,1,1]], row: 2, col: 2, queue: [], distance: 5, action: 'Target reached. Return 5.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class ShortestPathBinaryMatrix {
    public int shortestPathBinaryMatrix(int[][] grid) {
        if (grid[0][0] == 1) return -1;
        int n = grid.length;
        Queue<int[]> queue = new LinkedList<>();
        queue.offer(new int[]{0, 0, 1}); // r, c, distance
        grid[0][0] = 1; // mark visited

        int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};

        while (!queue.isEmpty()) {
            int[] curr = queue.poll();
            int r = curr[0], c = curr[1], dist = curr[2];

            if (r == n - 1 && c == n - 1) return dist;

            for (int[] d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && grid[nr][nc] == 0) {
                    grid[nr][nc] = 1; // mark visited immediately to avoid dupes
                    queue.offer(new int[]{nr, nc, dist + 1});
                }
            }
        }
        return -1;
    }
}`,

  javaExplanation: [
    { line: 'queue.offer(new int[]{0, 0, 1});', note: 'Store row, col, and distance in the queue.' },
    { line: 'grid[nr][nc] = 1;', note: 'Mark as visited IMMEDIATELY when adding to queue to prevent processing the same cell multiple times.' },
    { line: 'if (r == n - 1 && c == n - 1)', note: 'If we reach the target, the distance stored is the shortest.' },
  ],

  complexity: {
    time: 'O(N*M)',
    space: 'O(N*M)',
    aux: 'O(N*M)',
    explanation: 'Each cell is visited at most once. The queue can hold up to N*M cells.',
  },

  bruteForce: {
    time: 'O(4^(N*M))',
    space: 'O(N*M)',
    note: 'DFS exploring every possible path will result in exponential time.',
  },

  commonMistakes: [
    { title: 'Marking visited after popping', detail: 'If you only mark visited when you pop from the queue, you will add the same cell to the queue multiple times, wasting memory and time.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Shortest Path in Binary Matrix', url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/' },
    { level: 'Medium', title: '01 Matrix', url: 'https://leetcode.com/problems/01-matrix/' },
  ],

  quickRevision: [
    'Queue stores `(r, c, dist)`.',
    'Mark visited when pushing to queue.',
    'Check bounds and obstacles.',
  ],
};

// ============================================================
// MULTI-SOURCE BFS — Rotting Oranges
// ============================================================
export const multiSourceBFS = {
  id: 'multi-source-bfs',
  patternId: 'bfs',
  title: 'Multi-Source BFS',
  subtitle: 'The Infection',
  type: 'multi-source-bfs',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Start BFS from multiple sources simultaneously by pushing all starting points into the queue at the very beginning.',
    why: 'Instead of running BFS from each source separately (which would be slow), we can simulate all sources spreading at the same time.',
    when: 'When you have multiple starting points and need to find the shortest distance to a target, or simulate a spreading process.',
    properties: [
      'Queue is initialized with ALL sources.',
      'Nodes are processed level by level to track time/distance.',
      'Initial sources have a distance of 0.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Rotting Oranges"',
      '"Distance to nearest 0"',
      'Multiple points spreading at the same speed.',
    ],
    inputs: ['2D Grid'],
    constraints: ['O(N*M) time', 'O(N*M) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Find All Sources',
      explanation: 'We scan the grid. We find one rotten orange at (0,0). We push it to the queue. We also count the fresh oranges (value 1): there are 6. WHY: Pushing all sources at once allows them to spread simultaneously.',
      state: { grid: [[2,1,1],[1,1,0],[0,1,1]], queue: [{r:0,c:0}], fresh: 6, time: 0, action: 'Push (0,0). Fresh=6.' },
    },
    {
      id: 1,
      title: 'Time 0: Process Level',
      explanation: 'We snapshot the queue size (1). We pop (0,0). It infects its neighbors: right to (0,1) and down to (1,0). We change them to 2, decrement `fresh` to 4, and push them to the queue.',
      state: { grid: [[2,2,1],[2,1,0],[0,1,1]], queue: [{r:0,c:1},{r:1,c:0}], fresh: 4, time: 1, action: 'Infect right and down.' },
    },
    {
      id: 2,
      title: 'Time 1: Process (0,1)',
      explanation: 'We enter the next minute. We snapshot the queue size (2). We pop (0,1). It infects its right neighbor (0,2). `fresh` becomes 3.',
      state: { grid: [[2,2,2],[2,1,0],[0,1,1]], queue: [{r:1,c:0},{r:0,c:2}], fresh: 3, time: 2, action: 'Infect (0,2).' },
    },
    {
      id: 3,
      title: 'Time 1: Process (1,0)',
      explanation: 'Still processing the same minute. We pop (1,0). It infects its right neighbor (1,1). `fresh` becomes 2. This minute is complete.',
      state: { grid: [[2,2,2],[2,2,0],[0,1,1]], queue: [{r:0,c:2},{r:1,c:1}], fresh: 2, time: 2, action: 'Infect (1,1).' },
    },
    {
      id: 4,
      title: 'Time 2: Process (0,2)',
      explanation: 'Next minute. Snapshot size (2). Pop (0,2). It has no valid fresh neighbors.',
      state: { grid: [[2,2,2],[2,2,0],[0,1,1]], queue: [{r:1,c:1}], fresh: 2, time: 3, action: 'No neighbors.' },
    },
    {
      id: 5,
      title: 'Time 2: Process (1,1)',
      explanation: 'Pop (1,1). It infects its down neighbor (2,1). `fresh` becomes 1.',
      state: { grid: [[2,2,2],[2,2,0],[0,2,1]], queue: [{r:2,c:1}], fresh: 1, time: 3, action: 'Infect (2,1).' },
    },
    {
      id: 6,
      title: 'Time 3: Process (2,1)',
      explanation: 'Next minute. Snapshot size (1). Pop (2,1). It infects its right neighbor (2,2). `fresh` becomes 0.',
      state: { grid: [[2,2,2],[2,2,0],[0,2,2]], queue: [{r:2,c:2}], fresh: 0, time: 4, action: 'Infect (2,2).' },
    },
    {
      id: 7,
      title: 'Early Termination',
      explanation: 'The queue still has (2,2), but `fresh == 0`. The while loop condition `fresh > 0` fails. The loop stops early. We return `time` (which is 3, as the time was incremented at the end of the previous iteration).',
      state: { grid: [[2,2,2],[2,2,0],[0,2,2]], queue: [{r:2,c:2}], fresh: 0, time: 3, action: 'All rotten! Time=3.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class RottingOranges {
    public int orangesRotting(int[][] grid) {
        int fresh = 0;
        Queue<int[]> queue = new LinkedList<>();

        for (int r = 0; r < grid.length; r++) {
            for (int c = 0; c < grid[0].length; c++) {
                if (grid[r][c] == 2) queue.offer(new int[]{r, c});
                else if (grid[r][c] == 1) fresh++;
            }
        }

        if (fresh == 0) return 0;

        int time = 0;
        int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};

        while (!queue.isEmpty() && fresh > 0) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                int[] curr = queue.poll();
                for (int[] d : dirs) {
                    int nr = curr[0] + d[0], nc = curr[1] + d[1];
                    if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length && grid[nr][nc] == 1) {
                        grid[nr][nc] = 2;
                        fresh--;
                        queue.offer(new int[]{nr, nc});
                    }
                }
            }
            time++;
        }
        return fresh == 0 ? time : -1;
    }
}`,

  javaExplanation: [
    { line: 'if (grid[r][c] == 2) queue.offer(new int[]{r, c});', note: 'Push ALL rotten oranges into the queue at the start.' },
    { line: 'while (!queue.isEmpty() && fresh > 0)', note: 'Stop early if there are no fresh oranges left.' },
    { line: 'int size = queue.size();', note: 'Process level by level to simulate 1 minute of spreading.' },
  ],

  complexity: {
    time: 'O(N*M)',
    space: 'O(N*M)',
    aux: 'O(N*M)',
    explanation: 'Each cell is visited at most once.',
  },

  bruteForce: {
    time: 'O((N*M)²)',
    space: 'O(N*M)',
    note: 'Run BFS from each rotten orange individually and take the maximum time.',
  },

  commonMistakes: [
    { title: 'Not checking `fresh` at the end', detail: 'If there are still fresh oranges left (unreachable), return -1.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/' },
    { level: 'Medium', title: '01 Matrix', url: 'https://leetcode.com/problems/01-matrix/' },
    { level: 'Hard', title: 'Walls and Gates', url: 'https://leetcode.com/problems/walls-and-gates/' },
  ],

  quickRevision: [
    'Push all sources to Queue.',
    'Loop level by level.',
    'Infect neighbors.',
    'If fresh left, return -1.',
  ],
};

export const bfsSubPatterns = [levelOrder, shortestPath, multiSourceBFS];

export const bfsOverview = {
  id: 'bfs',
  title: 'Breadth-First Search (BFS)',
  subtitle: 'Explore level by level to find shortest paths',
  introduction: 'Breadth-First Search (BFS) is a fundamental graph traversal algorithm. It explores all neighbors at the present depth prior to moving on to the nodes at the next depth level. This makes it the perfect algorithm for finding the shortest path in unweighted graphs and for processing trees level by level.',
  coreConcept: {
    what: 'Exploring a graph or tree layer by layer, using a Queue (FIFO).',
    why: 'Because it explores all nodes at distance `d` before distance `d+1`, the first time it reaches a target, it is guaranteed to be the shortest path.',
    when: 'Shortest path, level order traversal, multi-source spreading.',
  },
  whenToUse: [
    'Finding the shortest path in an unweighted graph or grid.',
    'Processing a tree level by level.',
    'Simulating a spreading process (like fire or infection).',
  ],
  recognitionClues: [
    '"Shortest path" / "Minimum steps"',
    '"Level order"',
    '"Rotting oranges" / "Walls and gates"',
  ],
  importantProperties: [
    'Uses a Queue (FIFO).',
    'Guarantees shortest path in unweighted graphs.',
    'Mark nodes as visited when pushing to queue.',
  ],
  comparison: [
    { aspect: 'Level Order', when: 'Tree levels', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Shortest Path', when: 'Grid maze', time: 'O(N*M)', space: 'O(N*M)' },
    { aspect: 'Multi-Source', when: 'Multiple origins', time: 'O(N*M)', space: 'O(N*M)' },
  ],
  commonMistakes: [
    { title: 'Using a Stack instead of Queue', detail: 'Using a Stack (LIFO) turns BFS into DFS, which will not find the shortest path.' },
    { title: 'Marking visited late', detail: 'Mark a node as visited as soon as you add it to the queue, otherwise you might add it multiple times.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Binary Tree Level Order Traversal', url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/' },
    { level: 'Medium', title: 'Rotting Oranges', url: 'https://leetcode.com/problems/rotting-oranges/' },
    { level: 'Medium', title: 'Shortest Path in Binary Matrix', url: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/' },
    { level: 'Hard', title: 'Word Ladder', url: 'https://leetcode.com/problems/word-ladder/' },
  ],
};