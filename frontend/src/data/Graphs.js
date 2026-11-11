// ============================================================
// DIJKSTRA — Shortest Path
// ============================================================
export const dijkstra = {
  id: 'dijkstra',
  patternId: 'graphs',
  title: 'Dijkstra',
  subtitle: 'Shortest Path (Non-Negative)',
  type: 'dijkstra',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Finds the shortest path from a single source to all other nodes in a weighted graph with non-negative edge weights.',
    why: 'Uses a Priority Queue (Min-Heap) to greedily pick the node with the smallest known distance. This guarantees that once a node is popped, its shortest path has been found.',
    when: 'Weighted graphs, shortest routes, network delays.',
    properties: [
      'Uses a Min-Heap (Priority Queue).',
      'Maintains a `dist` array initialized to Infinity.',
      'Relaxation: if dist[u] + weight < dist[v], update dist[v].',
    ],
  },

  patternRecognition: {
    clues: [
      '"Shortest path in a weighted graph".',
      '"Network delay time".',
      'Non-negative edge weights.',
    ],
    inputs: ['Weighted Graph', 'Source Node'],
    constraints: ['O((V + E) log V) time', 'O(V) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Initialization',
      explanation: 'We start at node A (0). Distances are set to Infinity except for A. The Priority Queue has [0, A].',
      state: {
        distances: [0, Infinity, Infinity], queue: [[0, 0]], current: null, action: 'Init distances. PQ: [0, A].',
      },
    },
    {
      id: 1,
      title: 'Pop A(0)',
      explanation: 'Pop (0, A). Update neighbors B (weight 4) and C (weight 6). Distances become [0, 4, 6]. Push to PQ.',
      state: {
        distances: [0, 4, 6], queue: [[4, 1], [6, 2]], current: 0, action: 'Update B and C. PQ: [(4,B), (6,C)].',
      },
    },
    {
      id: 2,
      title: 'Pop B(4)',
      explanation: 'Pop B(4). Neighbor C has weight 2. Current distance to C is 6. New path: 4 + 2 = 6. 6 is not less than 6, so we skip.',
      state: {
        distances: [0, 4, 6], queue: [[6, 2]], current: 1, action: 'Skip update to C. PQ: [(6,C)].',
      },
    },
    {
      id: 3,
      title: 'Pop C(6)',
      explanation: 'Pop C(6). No more nodes. The shortest distances are [0, 4, 6].',
      state: {
        distances: [0, 4, 6], queue: [], current: 2, action: 'Done. Shortest distance to C is 6.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class Dijkstra {
    public int networkDelayTime(int[][] times, int n, int k) {
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
        for (int[] t : times) adj.get(t[0]).add(new int[]{t[1], t[2]});

        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, k}); // [dist, node]

        int[] dist = new int[n + 1];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[k] = 0;

        while (!pq.isEmpty()) {
            int[] curr = pq.poll();
            int d = curr[0], u = curr[1];
            if (d > dist[u]) continue;

            for (int[] edge : adj.get(u)) {
                int v = edge[0], w = edge[1];
                if (dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                    pq.offer(new int[]{dist[v], v});
                }
            }
        }

        int max = 0;
        for (int i = 1; i <= n; i++) max = Math.max(max, dist[i]);
        return max == Integer.MAX_VALUE ? -1 : max;
    }
}`,

  javaExplanation: [
    { line: 'PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);', note: 'Min-Heap to always process the closest node first.' },
    { line: 'if (d > dist[u]) continue;', note: 'Lazy deletion: skip outdated (worse) paths in the queue.' },
    { line: 'if (dist[u] + w < dist[v])', note: 'Relaxation: if we found a shorter path to v, update it.' },
  ],

  complexity: {
    time: 'O((V + E) log V)',
    space: 'O(V + E)',
    aux: 'O(V + E)',
    explanation: 'Heap operations take log V. Space is for the adjacency list and distance array.',
  },

  bruteForce: {
    time: 'O(V²)',
    space: 'O(V)',
    note: 'Use an array to find the minimum distance node each time.',
  },

  commonMistakes: [
    { title: 'Using Dijkstra for negative weights', detail: 'Dijkstra fails if there are negative edge weights. Use Bellman-Ford instead.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Network Delay Time', url: 'https://leetcode.com/problems/network-delay-time/' },
    { level: 'Medium', title: 'Path With Minimum Effort', url: 'https://leetcode.com/problems/path-with-minimum-effort/' },
  ],

  quickRevision: [
    'Init dist array to Infinity, start to 0.',
    'Min-Heap of (dist, node).',
    'Pop min, skip if outdated.',
    'Relax neighbors and push.',
  ],
};

// ============================================================
// BELLMAN-FORD & FLOYD-WARSHALL
// ============================================================
export const bellmanFord = {
  id: 'bellman-ford',
  patternId: 'graphs',
  title: 'Bellman-Ford & Floyd-Warshall',
  subtitle: 'Shortest Path (Negative Weights)',
  type: 'bellman-ford',
  difficulty: 'Hard',

  coreConcept: {
    what: 'Bellman-Ford finds shortest paths from a single source with negative weights. Floyd-Warshall finds shortest paths between all pairs of nodes.',
    why: 'Negative weights break Dijkstra. Bellman-Ford relaxes all edges V-1 times. Floyd-Warshall uses DP on a 2D matrix.',
    when: 'Graphs with negative weights, all-pairs shortest paths.',
    properties: [
      'Bellman-Ford: O(V * E) time, detects negative cycles.',
      'Floyd-Warshall: O(V³) time, O(V²) space.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Negative edge weights".',
      '"Detect negative cycles".',
      '"Shortest path between all pairs".',
    ],
    inputs: ['Edge list / Adjacency Matrix'],
    constraints: ['O(V * E) or O(V³) time'],
  },

  steps: [
    {
      id: 0,
      title: 'BF Initialization',
      explanation: 'Bellman-Ford: Start at A. Distances: [0, inf, inf].',
      state: {
        distances: [0, Infinity, Infinity], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'Init distances.',
      },
    },
    {
      id: 1,
      title: 'Pass 1',
      explanation: 'Relax edge A->B (0+4=4). Relax edge A->C (0+6=6). Relax edge B->C (4-2=2). Update C to 2.',
      state: {
        distances: [0, 4, 2], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'Relax all edges. C becomes 2.',
      },
    },
    {
      id: 2,
      title: 'Pass 2',
      explanation: 'No further updates. Distances are final: [0, 4, 2].',
      state: {
        distances: [0, 4, 2], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'No updates. Final distances.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class BellmanFord {
    public int[] bellmanFord(int n, int[][] edges, int src) {
        int[] dist = new int[n];
        Arrays.fill(dist, Integer.MAX_VALUE);
        dist[src] = 0;

        for (int i = 0; i < n - 1; i++) {
            for (int[] edge : edges) {
                int u = edge[0], v = edge[1], w = edge[2];
                if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                    dist[v] = dist[u] + w;
                }
            }
        }

        // Nth pass: Check for negative cycle
        for (int[] edge : edges) {
            int u = edge[0], v = edge[1], w = edge[2];
            if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v]) {
                return new int[]{-1}; // Negative cycle!
            }
        }
        return dist;
    }
}`,

  javaExplanation: [
    { line: 'for (int i = 0; i < n - 1; i++)', note: 'Relax all edges V-1 times.' },
    { line: 'for (int[] edge : edges)', note: 'Check every edge in every pass.' },
    { line: 'if (dist[u] + w < dist[v])', note: 'Standard relaxation step.' },
  ],

  complexity: {
    time: 'O(V * E)',
    space: 'O(V)',
    aux: 'O(V)',
    explanation: 'V-1 passes over E edges.',
  },

  bruteForce: {
    time: 'O(V³)',
    space: 'O(V²)',
    note: 'Floyd-Warshall finds all-pairs, not just single source.',
  },

  commonMistakes: [
    { title: 'Forgetting the Nth pass', detail: 'Without the extra pass, you cannot detect negative cycles.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Cheapest Flights Within K Stops', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
  ],

  quickRevision: [
    'Init dist array.',
    'Loop V-1 times: relax all edges.',
    'Check for negative cycle.',
  ],
};

// ============================================================
// KRUSKAL'S — MST (Union-Find)
// ============================================================
export const kruskal = {
  id: 'kruskal',
  patternId: 'graphs',
  title: "Kruskal's Algorithm",
  subtitle: 'Minimum Spanning Tree',
  type: 'kruskal',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Finds the Minimum Spanning Tree (MST) of a graph.',
    why: 'Sorts edges by weight and adds them to the MST if they do not create a cycle. Uses Union-Find for cycle detection.',
    when: 'Connecting all nodes with minimum cost.',
    properties: [
      'Sort edges by weight.',
      'Union-Find for cycle detection.',
      'Stop when V-1 edges are added.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Minimum cost to connect all points".',
      '"Connecting cities".',
    ],
    inputs: ['Number of nodes', 'Edge list'],
    constraints: ['O(E log E) time', 'O(V) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Sort Edges',
      explanation: 'Edges sorted: (1-2, 1), (3-4, 2), (1-3, 3), (2-4, 4).',
      state: {
        edges: [[1, 2, 1], [3, 4, 2], [1, 3, 3], [2, 4, 4]], parent: [0, 1, 2, 3, 4], mst: [], action: 'Sort edges by weight.',
      },
    },
    {
      id: 1,
      title: 'Pick 1-2',
      explanation: 'Union 1 and 2. Cost = 1.',
      state: {
        edges: [[1, 2, 1], [3, 4, 2], [1, 3, 3], [2, 4, 4]], parent: [0, 1, 1, 3, 4], mst: [[1, 2, 1]], action: 'Add (1,2).',
      },
    },
    {
      id: 2,
      title: 'Pick 3-4',
      explanation: 'Union 3 and 4. Cost = 1 + 2 = 3.',
      state: {
        edges: [[1, 2, 1], [3, 4, 2], [1, 3, 3], [2, 4, 4]], parent: [0, 1, 1, 3, 3], mst: [[1, 2, 1], [3, 4, 2]], action: 'Add (3,4).',
      },
    },
    {
      id: 3,
      title: 'Pick 1-3',
      explanation: 'Union 1 and 3. Cost = 3 + 3 = 6. MST complete (3 edges).',
      state: {
        edges: [[1, 2, 1], [3, 4, 2], [1, 3, 3], [2, 4, 4]], parent: [0, 1, 1, 1, 1], mst: [[1, 2, 1], [3, 4, 2], [1, 3, 3]], action: 'Add (1,3). MST complete.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class Kruskal {
    public int kruskalMST(int n, int[][] edges) {
        Arrays.sort(edges, (a, b) -> a[2] - b[2]);
        UnionFind uf = new UnionFind(n);
        int cost = 0, edgesUsed = 0;

        for (int[] edge : edges) {
            if (uf.union(edge[0], edge[1])) {
                cost += edge[2];
                edgesUsed++;
                if (edgesUsed == n - 1) break;
            }
        }
        return edgesUsed == n - 1 ? cost : -1;
    }

    class UnionFind {
        int[] parent, rank;
        public UnionFind(int n) {
            parent = new int[n];
            rank = new int[n];
            for (int i = 0; i < n; i++) parent[i] = i;
        }
        public int find(int x) {
            if (parent[x] != x) parent[x] = find(parent[x]);
            return parent[x];
        }
        public boolean union(int x, int y) {
            int rootX = find(x), rootY = find(y);
            if (rootX == rootY) return false;
            if (rank[rootX] < rank[rootY]) parent[rootX] = rootY;
            else if (rank[rootX] > rank[rootY]) parent[rootY] = rootX;
            else { parent[rootY] = rootX; rank[rootX]++; }
            return true;
        }
    }
}`,

  javaExplanation: [
    { line: 'Arrays.sort(edges, (a, b) -> a[2] - b[2]);', note: 'Sort edges by weight ascending.' },
    { line: 'if (uf.union(edge[0], edge[1]))', note: 'If they are in different sets, add to MST.' },
    { line: 'if (edgesUsed == n - 1) break;', note: 'Stop when MST is complete.' },
  ],

  complexity: {
    time: 'O(E log E)',
    space: 'O(V)',
    aux: 'O(V)',
    explanation: 'Sorting dominates. Union-Find takes O(V).',
  },

  bruteForce: {
    time: 'O(2^E)',
    space: 'O(E)',
    note: 'Try all subsets of edges. Inefficient.',
  },

  commonMistakes: [
    { title: 'Not sorting edges', detail: 'Kruskal\'s relies on picking the smallest edge first.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
  ],

  quickRevision: [
    'Sort edges by weight.',
    'Union-Find for cycle check.',
    'Add edge if union succeeds.',
    'Stop at V-1 edges.',
  ],
};

// ============================================================
// PRIM'S — MST (Min-Heap)
// ============================================================
export const prim = {
  id: 'prim',
  patternId: 'graphs',
  title: "Prim's Algorithm",
  subtitle: 'Minimum Spanning Tree',
  type: 'prim',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Builds the MST by starting from a node and greedily growing it using a Min-Heap.',
    why: 'Instead of sorting all edges, Prim\'s uses a Min-Heap to always pick the cheapest edge connecting a visited node to an unvisited one.',
    when: 'Dense graphs, connecting all nodes with minimum cost.',
    properties: [
      'Uses a Min-Heap (PriorityQueue).',
      'Maintains a visited set.',
      'Similar to Dijkstra, but tracks edge weight instead of distance from source.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Minimum spanning tree".',
      '"Connecting cities with minimum cost".',
    ],
    inputs: ['Weighted Graph'],
    constraints: ['O(E log V) time', 'O(V + E) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start at A',
      explanation: 'Start at A. Push neighbors B(2) and C(5) to PQ.',
      state: {
        visited: [true, false, false], queue: [[2, 1], [5, 2]], current: 0, action: 'Start at A. PQ: [(2,B), (5,C)].',
      },
    },
    {
      id: 1,
      title: 'Pop B(2)',
      explanation: 'Pop B. Mark visited. Cost = 2. Push neighbor C(1) to PQ.',
      state: {
        visited: [true, true, false], queue: [[1, 2], [5, 2]], current: 1, action: 'Visit B. PQ: [(1,C), (5,C)].',
      },
    },
    {
      id: 2,
      title: 'Pop C(1)',
      explanation: 'Pop C. Mark visited. Cost = 3. MST complete.',
      state: {
        visited: [true, true, true], queue: [[5, 2]], current: 2, action: 'Visit C. Cost = 3.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class Prim {
    public int primMST(int n, List<List<int[]>> adj) {
        boolean[] visited = new boolean[n];
        PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        pq.offer(new int[]{0, 0}); // [weight, node]

        int cost = 0, nodesVisited = 0;

        while (!pq.isEmpty() && nodesVisited < n) {
            int[] curr = pq.poll();
            int w = curr[0], u = curr[1];

            if (visited[u]) continue;

            visited[u] = true;
            cost += w;
            nodesVisited++;

            for (int[] neighbor : adj.get(u)) {
                int v = neighbor[0], weight = neighbor[1];
                if (!visited[v]) {
                    pq.offer(new int[]{weight, v});
                }
            }
        }
        return nodesVisited == n ? cost : -1;
    }
}`,

  javaExplanation: [
    { line: 'pq.offer(new int[]{0, 0});', note: 'Start with an arbitrary node (0) and weight 0.' },
    { line: 'if (visited[u]) continue;', note: 'Skip if we already added this node to the MST.' },
    { line: 'cost += w;', note: 'Add the edge weight to the total cost.' },
  ],

  complexity: {
    time: 'O(E log V)',
    space: 'O(V + E)',
    aux: 'O(V + E)',
    explanation: 'Heap operations take log V. Similar to Dijkstra.',
  },

  bruteForce: {
    time: 'O(V²)',
    space: 'O(V)',
    note: 'Use a matrix and an array to find the minimum edge to a visited node.',
  },

  commonMistakes: [
    { title: 'Confusing with Dijkstra', detail: 'Dijkstra minimizes distance from the source. Prim\'s minimizes the edge weight connecting to the MST.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
  ],

  quickRevision: [
    'Min-Heap of (weight, node).',
    'Visited array.',
    'Pop min edge, if unvisited, add cost and push neighbors.',
  ],
};

// ============================================================
// BIPARTITE CHECK — 2-Coloring
// ============================================================
export const bipartite = {
  id: 'bipartite',
  patternId: 'graphs',
  title: 'Bipartite Graph',
  subtitle: '2-Coloring',
  type: 'bipartite',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Determine if a graph can be colored with 2 colors such that no two adjacent nodes have the same color.',
    why: 'A graph is bipartite if and only if it contains no odd-length cycles. We can use BFS/DFS to try and 2-color it.',
    when: 'Detecting odd cycles, assigning tasks to two groups with conflict constraints.',
    properties: [
      'Uses a color array initialized to -1.',
      'Start BFS, color node 0, push to queue.',
      'Color neighbors with 1 - current color.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Is Graph Bipartite?".',
      '"2-coloring".',
      '"Odd cycle detection".',
    ],
    inputs: ['Graph adjacency list'],
    constraints: ['O(V + E) time', 'O(V) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Init Colors',
      explanation: 'Triangle graph: 0-1, 1-2, 2-0. Color array: [-1, -1, -1].',
      state: {
        nodes: [0, 1, 2], colors: [-1, -1, -1], queue: [], action: 'Uncolored.',
      },
    },
    {
      id: 1,
      title: 'Start BFS at 0',
      explanation: 'Color 0 with 0. Queue: [0]. Pop 0. Color neighbors 1 and 2 with 1.',
      state: {
        nodes: [0, 1, 2], colors: [0, 1, 1], queue: [1, 2], action: 'Color 0 with 0, neighbors with 1.',
      },
    },
    {
      id: 2,
      title: 'Conflict Detected',
      explanation: 'Pop 1. Neighbor 2 is already colored 1. Same color! Not Bipartite.',
      state: {
        nodes: [0, 1, 2], colors: [0, 1, 1], queue: [2], action: 'Conflict at node 2! Not Bipartite.', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class Bipartite {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        Arrays.fill(color, -1);

        for (int i = 0; i < n; i++) {
            if (color[i] != -1) continue;

            Queue<Integer> queue = new LinkedList<>();
            queue.offer(i);
            color[i] = 0;

            while (!queue.isEmpty()) {
                int u = queue.poll();
                for (int v : graph[u]) {
                    if (color[v] == -1) {
                        color[v] = 1 - color[u];
                        queue.offer(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
}`,

  javaExplanation: [
    { line: 'Arrays.fill(color, -1);', note: 'Initialize all nodes as uncolored.' },
    { line: 'if (color[i] != -1) continue;', note: 'Handle disconnected components.' },
    { line: 'color[v] = 1 - color[u];', note: 'Assign the opposite color.' },
    { line: 'else if (color[v] == color[u])', note: 'If an adjacent node has the same color, it\'s not bipartite.' },
  ],

  complexity: {
    time: 'O(V + E)',
    space: 'O(V)',
    aux: 'O(V)',
    explanation: 'Standard BFS traversal.',
  },

  bruteForce: {
    time: 'O(2^V)',
    space: 'O(V)',
    note: 'Try all color assignments. Exponential.',
  },

  commonMistakes: [
    { title: 'Forgetting disconnected components', detail: 'You must loop over all nodes to start a BFS for each disconnected component.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Is Graph Bipartite?', url: 'https://leetcode.com/problems/is-graph-bipartite/' },
    { level: 'Hard', title: 'Possible Bipartition', url: 'https://leetcode.com/problems/possible-bipartition/' },
  ],

  quickRevision: [
    'Color array (-1).',
    'BFS, color opposite.',
    'If neighbor has same color, fail.',
  ],
};

export const graphSubPatterns = [dijkstra, bellmanFord, kruskal, prim, bipartite];

export const graphOverview = {
  id: 'graphs',
  title: 'Graph Patterns',
  subtitle: 'Traverse networks, resolve dependencies, and find shortest paths',
  introduction: 'Graphs are non-linear data structures consisting of nodes (vertices) connected by edges. Mastering graph algorithms is essential for solving complex network problems like routing, scheduling, and connectivity.',
  coreConcept: {
    what: 'A collection of nodes connected by edges.',
    why: 'Model real-world networks (social media, maps, dependency graphs).',
    when: 'Shortest path, connectivity, cycle detection, spanning trees.',
  },
  whenToUse: [
    'The problem involves a network or relationships.',
    'You need to find the shortest/cheapest path.',
    'You need to detect cycles or resolve dependencies.',
  ],
  recognitionClues: [
    '"Shortest path"',
    '"Minimum spanning tree"',
    '"Course schedule"',
    '"Network delay"',
  ],
  importantProperties: [
    'Can be directed or undirected.',
    'Can be weighted or unweighted.',
    'BFS/DFS for traversal, Dijkstra/BF for shortest paths.',
  ],
  comparison: [
    { aspect: 'Dijkstra', when: 'Shortest path (no neg)', time: 'O(E log V)', space: 'O(V)' },
    { aspect: 'Bellman-Ford', when: 'Shortest path (neg)', time: 'O(V * E)', space: 'O(V)' },
    { aspect: 'Kruskal/Prim', when: 'MST', time: 'O(E log V)', space: 'O(V)' },
    { aspect: 'Bipartite', when: '2-Coloring', time: 'O(V + E)', space: 'O(V)' },
  ],
  commonMistakes: [
    { title: 'Using Dijkstra for negative weights', detail: 'Dijkstra fails with negative weights. Use Bellman-Ford.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Network Delay Time', url: 'https://leetcode.com/problems/network-delay-time/' },
    { level: 'Medium', title: 'Min Cost to Connect All Points', url: 'https://leetcode.com/problems/min-cost-to-connect-all-points/' },
    { level: 'Medium', title: 'Is Graph Bipartite?', url: 'https://leetcode.com/problems/is-graph-bipartite/' },
    { level: 'Hard', title: 'Cheapest Flights Within K Stops', url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/' },
  ],
};