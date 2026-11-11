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
      title: 'Initialization',
      explanation: 'N=5 nodes. Each node is its own parent. Parent array: [0, 1, 2, 3, 4]. Rank array: [0, 0, 0, 0, 0].',
      state: {
        nodes: [0, 1, 2, 3, 4], parent: [0, 1, 2, 3, 4], rank: [0, 0, 0, 0, 0], edges: [[0,1], [2,3], [1,4]], currentEdge: null, action: 'Each node is its own parent.',
      },
    },
    {
      id: 1,
      title: 'Union Edge (0, 1)',
      explanation: 'Edge (0,1). find(0)=0, find(1)=1. They are different. Union: make parent of 1 point to 0. Rank[0] increases to 1.',
      state: {
        nodes: [0, 1, 2, 3, 4], parent: [0, 0, 2, 3, 4], rank: [1, 0, 0, 0, 0], edges: [[0,1], [2,3], [1,4]], currentEdge: [0,1], action: 'Union(0,1). Parent[1] = 0.',
      },
    },
    {
      id: 2,
      title: 'Union Edge (2, 3)',
      explanation: 'Edge (2,3). find(2)=2, find(3)=3. Union: make parent of 3 point to 2. Rank[2] increases to 1.',
      state: {
        nodes: [0, 1, 2, 3, 4], parent: [0, 0, 2, 2, 4], rank: [1, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,4]], currentEdge: [2,3], action: 'Union(2,3). Parent[3] = 2.',
      },
    },
    {
      id: 3,
      title: 'Union Edge (1, 4)',
      explanation: 'Edge (1,4). find(1) -> parent is 0. find(4)=4. Union: make parent of 4 point to 0. Rank[0] and Rank[4] are equal, so attach 4 to 0.',
      state: {
        nodes: [0, 1, 2, 3, 4], parent: [0, 0, 2, 2, 0], rank: [1, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,4]], currentEdge: [1,4], action: 'Union(1,4). Parent[4] = 0.',
      },
    },
    {
      id: 4,
      title: 'Path Compression',
      explanation: 'If we call find(1), it recursively finds root 0, and updates parent[1] to 0 directly, flattening the tree.',
      state: {
        nodes: [0, 1, 2, 3, 4], parent: [0, 0, 2, 2, 0], rank: [1, 0, 1, 0, 0], edges: [[0,1], [2,3], [1,4]], currentEdge: null, action: '2 components found.', found: true,
      },
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
      title: 'Initialize',
      explanation: 'Edges: [[1,2], [1,3], [2,3]]. Parent array: [0, 1, 2, 3].',
      state: {
        parent: [0, 1, 2, 3], edges: [[1,2], [1,3], [2,3]], currentEdge: null, action: 'Parent array initialized.',
      },
    },
    {
      id: 1,
      title: 'Edge (1, 2)',
      explanation: 'find(1)=1, find(2)=2. Different sets. Union them. Parent[2] = 1.',
      state: {
        parent: [0, 1, 1, 3], edges: [[1,2], [1,3], [2,3]], currentEdge: [1,2], action: 'Union(1, 2).',
      },
    },
    {
      id: 2,
      title: 'Edge (1, 3)',
      explanation: 'find(1)=1, find(3)=3. Different sets. Union them. Parent[3] = 1.',
      state: {
        parent: [0, 1, 1, 1], edges: [[1,2], [1,3], [2,3]], currentEdge: [1,3], action: 'Union(1, 3).',
      },
    },
    {
      id: 3,
      title: 'Edge (2, 3)',
      explanation: 'find(2)=1, find(3)=1. Same root! Adding this edge creates a cycle. Return [2, 3].',
      state: {
        parent: [0, 1, 1, 1], edges: [[1,2], [1,3], [2,3]], currentEdge: [2,3], action: 'Cycle detected! Return [2, 3].', found: true,
      },
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
      title: 'Init',
      explanation: 'N=3. Parent: [0, 1, 2]. Components = 3.',
      state: {
        parent: [0, 1, 2], components: 3, action: 'Init. Components = 3.',
      },
    },
    {
      id: 1,
      title: 'Edge (0, 1)',
      explanation: 'isConnected[0][1] == 1. Union(0, 1) succeeds. Components becomes 2.',
      state: {
        parent: [0, 0, 2], components: 2, action: 'Union(0, 1). Components = 2.',
      },
    },
    {
      id: 2,
      title: 'Edge (1, 2)',
      explanation: 'isConnected[1][2] == 0. Skip.',
      state: {
        parent: [0, 0, 2], components: 2, action: 'No edge.',
      },
    },
    {
      id: 3,
      title: 'Finish',
      explanation: 'Checked all edges. Total components = 2.',
      state: {
        parent: [0, 0, 2], components: 2, action: 'Done. Result = 2.', found: true,
      },
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