// ============================================================
// OPTIMIZED UNION FIND — Path Compression & Union by Rank
// ============================================================
export const unionFindOptimized = {
  id: 'union-find-optimized',
  patternId: 'union-find',
  title: 'Union Find (Optimized)',
  subtitle: 'The Disjoint Set',
  type: 'union-find-optimized',
  difficulty: 'Hard',

  coreConcept: {
    what: 'A data structure that keeps track of elements partitioned into a number of disjoint (non-overlapping) sets.',
    why: 'It allows us to quickly determine if two elements are in the same set (connected) or to merge two sets together in nearly O(1) time.',
    when: 'Detecting cycles in an undirected graph, finding connected components, or Kruskal\'s MST algorithm.',
    properties: [
      'Uses a `parent` array to represent the root of each set.',
      'Path Compression flattens the tree for faster future lookups.',
      'Union by Rank ensures the tree stays balanced.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Connected components".',
      '"Detect cycle in an undirected graph".',
      '"Accounts merge" / "Redundant connection".',
    ],
    inputs: ['Number of nodes N', 'List of edges'],
    constraints: ['O(α(N)) ≈ O(1) time per op', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Parent and Rank',
      explanation: 'We have 5 nodes (0 to 4). We initialize `parent` so each node points to itself (they are their own roots). We initialize `rank` to all 0s. WHY: Initially, every node is an independent set. The rank tracks the depth (or size) of the tree to keep it balanced during unions.',
      state: { nodes: [0, 1, 2, 3, 4], parent: [0, 1, 2, 3, 4], rank: [0, 0, 0, 0, 0], edges: [[0,1], [2,3], [1,2]], currentEdge: null, action: 'Init. Parent = self, Rank = 0.' },
    },
    {
      id: 1,
      title: 'Union Edge (0, 1)',
      explanation: 'Edge (0,1). We call `find(0)` -> returns 0. `find(1)` -> returns 1. Since 0 != 1, they are in different sets. We compare ranks: both are 0. We attach 1 to 0. `parent[1] = 0`. The rank of 0 increases to 1.',
      state: { nodes: [0, 1, 2, 3, 4], parent: [0, 0, 2, 3, 4], rank: [1, 0, 0, 0, 0], edges: [[0,1], [2,3], [1,2]], currentEdge: [0,1], action: 'Union(0,1). Parent[1]=0, Rank[0]=1.' },
    },
    {
      id: 2,
      title: 'Union Edge (2, 3)',
      explanation: 'Edge (2,3). `find(2)` -> returns 2. `find(3)` -> returns 3. Different sets. Ranks are both 0. We attach 3 to 2. `parent[3] = 2`. The rank of 2 increases to 1.',
      state: { nodes: [0, 1, 2, 3, 4], parent: [0, 0, 2, 2, 4], rank: [1, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,2]], currentEdge: [2,3], action: 'Union(2,3). Parent[3]=2, Rank[2]=1.' },
    },
    {
      id: 3,
      title: 'Union Edge (1, 2)',
      explanation: 'Edge (1,2). `find(1)` -> 1 points to 0, so root is 0. `find(2)` -> root is 2. Different sets. We compare ranks: rank[0]=1, rank[2]=1. They are equal, so we attach 2 to 0. `parent[2] = 0`. Rank[0] increases to 2. WHY: Attaching the smaller/equal tree to the larger root keeps the overall tree depth minimal.',
      state: { nodes: [0, 1, 2, 3, 4], parent: [0, 0, 0, 2, 4], rank: [2, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,2]], currentEdge: [1,2], action: 'Union(1,2). Parent[2]=0, Rank[0]=2.' },
    },
    {
      id: 4,
      title: 'Path Compression: find(3)',
      explanation: 'We call `find(3)`. 3 points to 2, which points to 0. The root is 0. With Path Compression, we update `parent[3]` to point directly to 0. WHY: Next time we call `find(3)`, it will be a direct O(1) lookup instead of traversing the chain.',
      state: { nodes: [0, 1, 2, 3, 4], parent: [0, 0, 0, 0, 4], rank: [2, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,2]], currentEdge: null, action: 'Compress 3->0. Parent[3]=0.' },
    },
    {
      id: 5,
      title: 'Final Components',
      explanation: 'We have successfully processed all edges. The roots of the sets are 0 (containing 0,1,2,3) and 4 (containing 4). The number of connected components is 2.',
      state: { nodes: [0, 1, 2, 3, 4], parent: [0, 0, 0, 0, 4], rank: [2, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,2]], currentEdge: null, action: '2 components found.', found: true },
    },
  ],

  javaCode: `public class UnionFind {
    private int[] parent;
    private int[] rank;

    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        for (int i = 0; i < n; i++) parent[i] = i;
    }

    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // Path compression
        }
        return parent[x];
    }

    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);

        if (rootX == rootY) return false; // Already connected (Cycle)

        if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        return true;
    }
}`,

  javaExplanation: [
    { line: 'parent[x] = find(parent[x]);', note: 'Path compression: point the node directly to the root to flatten the tree.' },
    { line: 'if (rootX == rootY) return false;', note: 'If they already have the same root, they are in the same set (adding this edge creates a cycle).' },
    { line: 'rank[rootX]++;', note: 'Union by rank: attach the shorter tree to the taller tree to keep it balanced.' },
  ],

  complexity: {
    time: 'O(α(N)) ≈ O(1)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'With path compression and union by rank, the time per operation is nearly constant (inverse Ackermann function).',
  },

  bruteForce: {
    time: 'O(N)',
    space: 'O(N)',
    note: 'Use BFS or DFS to find connected components each time, which is much slower for dynamic connections.',
  },

  commonMistakes: [
    { title: 'Forgetting Path Compression', detail: 'Without it, the tree can become a linked list, degrading `find` to O(N).' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Number of Connected Components in an Undirected Graph', url: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/' },
    { level: 'Hard', title: 'Accounts Merge', url: 'https://leetcode.com/problems/accounts-merge/' },
  ],

  quickRevision: [
    'Initialize parent[i] = i.',
    'find(x): recursively find root, apply path compression.',
    'union(x, y): attach root of one to root of another.',
  ],
};

// ============================================================
// REDUNDANT CONNECTION — Cycle Detection
// ============================================================
export const redundantConnection = {
  id: 'redundant-connection',
  patternId: 'union-find',
  title: 'Redundant Connection',
  subtitle: 'Cycle Detection',
  type: 'redundant-connection',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the edge that creates a cycle in an undirected graph.',
    why: 'By processing edges one by one using Union Find, the first edge that connects two nodes already in the same set is the redundant edge.',
    when: 'Detecting cycles in dynamic undirected graphs.',
    properties: [
      'Initialize Union Find with N nodes.',
      'Iterate through edges.',
      'If find(u) == find(v), the edge creates a cycle. Return it.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Redundant connection".',
      '"Detect cycle in an undirected graph".',
    ],
    inputs: ['Number of nodes', 'List of edges'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Parent Array',
      explanation: 'Edges: [[1,2], [1,3], [2,3]]. Since nodes are 1-indexed, we use an array of size 4. `parent = [0, 1, 2, 3]`. WHY: Each node starts as its own root. We will process each edge and attempt to union the nodes.',
      state: { parent: [0, 1, 2, 3], edges: [[1,2], [1,3], [2,3]], currentEdge: null, action: 'Parent initialized: [0,1,2,3].' },
    },
    {
      id: 1,
      title: 'Process Edge (1, 2)',
      explanation: 'We call `find(1)` -> 1. `find(2)` -> 2. They are in different sets. We union them by setting `parent[2] = 1`. No cycle yet.',
      state: { parent: [0, 1, 1, 3], edges: [[1,2], [1,3], [2,3]], currentEdge: [1,2], action: 'Union(1,2). Parent[2]=1.' },
    },
    {
      id: 2,
      title: 'Process Edge (1, 3)',
      explanation: 'We call `find(1)` -> 1. `find(3)` -> 3. Different sets. We union them by setting `parent[3] = 1`. No cycle yet.',
      state: { parent: [0, 1, 1, 1], edges: [[1,2], [1,3], [2,3]], currentEdge: [1,3], action: 'Union(1,3). Parent[3]=1.' },
    },
    {
      id: 3,
      title: 'Process Edge (2, 3) - Cycle',
      explanation: 'We call `find(2)`. 2 points to 1, so root is 1. We call `find(3)`. 3 points to 1, so root is 1. Both return root 1! WHY: Since they already share the same root, adding an edge between them creates a cycle. This is the redundant edge.',
      state: { parent: [0, 1, 1, 1], edges: [[1,2], [1,3], [2,3]], currentEdge: [2,3], action: 'find(2)=1, find(3)=1. Cycle detected!', found: true },
    },
  ],

  javaCode: `public class RedundantConnection {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        UnionFind uf = new UnionFind(n + 1);

        for (int[] edge : edges) {
            if (!uf.union(edge[0], edge[1])) {
                return edge; // Cycle detected
            }
        }
        return new int[0];
    }
}`,

  javaExplanation: [
    { line: 'int n = edges.length;', note: 'For a tree, edges = N-1. Here we have N edges, so N nodes.' },
    { line: 'if (!uf.union(edge[0], edge[1]))', note: 'If union returns false, the nodes were already connected.' },
    { line: 'return edge;', note: 'This is the redundant edge that creates the cycle.' },
  ],

  complexity: {
    time: 'O(N * α(N)) ≈ O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Process each edge once. Union Find operations are nearly O(1).',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(N)',
    note: 'Run DFS from the start of each edge to check if the end is reachable before adding it.',
  },

  commonMistakes: [
    { title: '1-based vs 0-based indexing', detail: 'LeetCode inputs are often 1-based (nodes 1 to N). Make sure your parent array size is `N + 1`.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/' },
  ],

  quickRevision: [
    'Union Find with N+1 nodes.',
    'Loop edges.',
    'If union fails, return edge.',
  ],
};

// ============================================================
// NUMBER OF PROVINCES — Connected Components
// ============================================================
export const numberOfProvinces = {
  id: 'number-of-provinces',
  patternId: 'union-find',
  title: 'Number of Provinces',
  subtitle: 'Connected Components',
  type: 'number-of-provinces',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Find the total number of connected components in an undirected graph.',
    why: 'We start with N components. Every successful union reduces the number of components by 1.',
    when: 'Finding friend circles, connected cities, or disjoint sets.',
    properties: [
      'Initialize component count to N.',
      'For every edge (i, j), if union(i, j) succeeds, decrement count.',
      'Return the final count.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Number of provinces".',
      '"Friend circles".',
      '"Number of connected components".',
    ],
    inputs: ['Adjacency Matrix'],
    constraints: ['O(N² * α(N)) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialize Components',
      explanation: 'Adjacency Matrix: [[1,1,0,0], [1,1,0,0], [0,0,1,1], [0,0,1,1]]. There are 4 nodes. Initially, all 4 are in separate provinces. `parent = [0, 1, 2, 3]`. `components = 4`. WHY: We assume worst-case initially, and every time we find a connection, we merge two provinces.',
      state: { parent: [0, 1, 2, 3], components: 4, action: 'Init. Components = 4.' },
    },
    {
      id: 1,
      title: 'Check Edge (0, 1)',
      explanation: 'At matrix[0][1], the value is 1. Nodes 0 and 1 are connected. We call `union(0, 1)`. They are in different sets. We merge them. `components` decrements to 3.',
      state: { parent: [0, 0, 2, 3], components: 3, action: 'Union(0,1). Components = 3.' },
    },
    {
      id: 2,
      title: 'Check Edge (0, 2)',
      explanation: 'At matrix[0][2], the value is 0. No connection. We skip.',
      state: { parent: [0, 0, 2, 3], components: 3, action: 'No edge (0,2).' },
    },
    {
      id: 3,
      title: 'Check Edge (0, 3)',
      explanation: 'At matrix[0][3], the value is 0. Skip.',
      state: { parent: [0, 0, 2, 3], components: 3, action: 'No edge (0,3).' },
    },
    {
      id: 4,
      title: 'Check Edge (1, 2)',
      explanation: 'We move to i=1. At matrix[1][2], the value is 0. Skip.',
      state: { parent: [0, 0, 2, 3], components: 3, action: 'No edge (1,2).' },
    },
    {
      id: 5,
      title: 'Check Edge (1, 3)',
      explanation: 'At matrix[1][3], the value is 0. Skip.',
      state: { parent: [0, 0, 2, 3], components: 3, action: 'No edge (1,3).' },
    },
    {
      id: 6,
      title: 'Check Edge (2, 3)',
      explanation: 'We move to i=2. At matrix[2][3], the value is 1. Nodes 2 and 3 are connected. We call `union(2, 3)`. They are in different sets. We merge them. `components` decrements to 2.',
      state: { parent: [0, 0, 2, 2], components: 2, action: 'Union(2,3). Components = 2.' },
    },
    {
      id: 7,
      title: 'Final Count',
      explanation: 'We have checked all edges. The final number of provinces (connected components) is 2.',
      state: { parent: [0, 0, 2, 2], components: 2, action: 'Done. Result = 2.', found: true },
    },
  ],

  javaCode: `public class NumberOfProvinces {
    public int findCircleNum(int[][] isConnected) {
        int n = isConnected.length;
        UnionFind uf = new UnionFind(n);
        int components = n;

        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                if (isConnected[i][j] == 1 && uf.union(i, j)) {
                    components--;
                }
            }
        }
        return components;
    }
}`,

  javaExplanation: [
    { line: 'int components = n;', note: 'Start with N isolated nodes.' },
    { line: 'if (isConnected[i][j] == 1 && uf.union(i, j))', note: 'If there is an edge and they are in different sets, merge them.' },
    { line: 'components--;', note: 'Every successful merge reduces the total component count.' },
  ],

  complexity: {
    time: 'O(N²)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'Checking the adjacency matrix takes O(N²). Union Find operations are O(1).',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(N)',
    note: 'Run DFS on the matrix and count how many times you restart the DFS.',
  },

  commonMistakes: [
    { title: 'Checking j from 0', detail: 'Since the graph is undirected, you only need to check `j = i + 1` to avoid duplicate unions.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Number of Provinces', url: 'https://leetcode.com/problems/number-of-provinces/' },
  ],

  quickRevision: [
    'Components = N.',
    'Loop matrix, union if 1.',
    'Decrement components on success.',
  ],
};

export const unionFindSubPatterns = [unionFindOptimized, redundantConnection, numberOfProvinces];

export const unionFindOverview = {
  id: 'union-find',
  title: 'Union Find',
  subtitle: 'Dynamic connectivity and disjoint sets',
  introduction: 'Union Find (Disjoint Set Union) is a data structure that keeps track of elements partitioned into a number of disjoint (non-overlapping) sets. It provides near O(1) time for adding connections and checking if two elements are connected.',
  coreConcept: {
    what: 'A forest of trees where each node points to its parent.',
    why: 'It dynamically maintains connected components. When you union two nodes, you merge their trees.',
    when: 'Connected components, cycle detection, Kruskal\'s MST.',
  },
  whenToUse: [
    'The problem asks about connectivity in an undirected graph.',
    'You need to dynamically add edges and check for cycles.',
  ],
  recognitionClues: [
    '"Connected components"',
    '"Redundant connection"',
    '"Friend circles"',
  ],
  importantProperties: [
    'Path compression flattens the trees.',
    'Union by rank keeps the trees shallow.',
    'Near O(1) amortized time per operation.',
  ],
  comparison: [
    { aspect: 'Union Find', when: 'Dynamic connectivity', time: 'O(α(N))', space: 'O(N)' },
    { aspect: 'BFS/DFS', when: 'Static connectivity', time: 'O(V + E)', space: 'O(V)' },
  ],
  commonMistakes: [
    { title: 'Forgetting path compression', detail: 'Without it, the tree can become a line, making find() O(N).' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Redundant Connection', url: 'https://leetcode.com/problems/redundant-connection/' },
    { level: 'Medium', title: 'Number of Provinces', url: 'https://leetcode.com/problems/number-of-provinces/' },
    { level: 'Hard', title: 'Accounts Merge', url: 'https://leetcode.com/problems/accounts-merge/' },
  ],
};