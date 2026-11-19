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
      explanation: 'We start at source node A (index 0). We set the distance to A as 0, and all other nodes to Infinity. We push `(0, A)` to the Min-Heap (PQ). WHY: Dijkstra greedily expands the node with the smallest known distance. Since we are at A, its distance is 0.',
      state: { distances: [0, Infinity, Infinity], queue: [[0, 0]], current: null, action: 'Init. PQ: [(0, A)].' },
    },
    {
      id: 1,
      title: 'Pop A(0)',
      explanation: 'We pop `(0, A)` from the PQ. We look at its neighbors. Neighbor B has weight 4. The new distance is `0 + 4 = 4`, which is less than Infinity. We update B\'s distance to 4 and push `(4, B)` to the PQ.',
      state: { distances: [0, 4, Infinity], queue: [[4, 1]], current: 0, action: 'Relax B. Dist=4.' },
    },
    {
      id: 2,
      title: 'Relax Neighbor C',
      explanation: 'Neighbor C has weight 6. The new distance is `0 + 6 = 6`, which is less than Infinity. We update C\'s distance to 6 and push `(6, C)` to the PQ.',
      state: { distances: [0, 4, 6], queue: [[4, 1], [6, 2]], current: 0, action: 'Relax C. Dist=6.' },
    },
    {
      id: 3,
      title: 'Pop B(4)',
      explanation: 'We pop the smallest distance node from the PQ, which is B(4). We look at its neighbor C. The edge weight is 2. The new path to C is `4 + 2 = 6`. We compare this with C\'s current distance, which is 6. Since 6 is not strictly less than 6, we do NOT update.',
      state: { distances: [0, 4, 6], queue: [[6, 2]], current: 1, action: 'Path 4+2=6 is not < 6. Skip.' },
    },
    {
      id: 4,
      title: 'Pop C(6)',
      explanation: 'We pop the smallest distance node, C(6). It has no unvisited neighbors that can be relaxed. WHY: Once a node is popped, its shortest path is finalized. All edges are non-negative, so no future path can be shorter.',
      state: { distances: [0, 4, 6], queue: [], current: 2, action: 'C is finalized. PQ is empty.' },
    },
    {
      id: 5,
      title: 'Final Distances',
      explanation: 'The PQ is empty. The shortest distances from A to all nodes are: A=0, B=4, C=6.',
      state: { distances: [0, 4, 6], queue: [], current: 2, action: 'Done. Shortest distances: [0, 4, 6].', found: true },
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
      title: 'Initialize Distances',
      explanation: 'Source is A (0). Distances: [0, Infinity, Infinity]. WHY: Like Dijkstra, we start with 0 at the source and Infinity everywhere else. The difference is we will loop over all edges multiple times.',
      state: { distances: [0, Infinity, Infinity], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'Init distances.' },
    },
    {
      id: 1,
      title: 'Pass 1: Edge A->B (4)',
      explanation: 'We relax edge A->B. `dist[A] + 4 = 0 + 4 = 4`. 4 < Infinity, so we update `dist[B] = 4`.',
      state: { distances: [0, 4, Infinity], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'Update B to 4.' },
    },
    {
      id: 2,
      title: 'Pass 1: Edge B->C (-2)',
      explanation: 'We relax edge B->C. `dist[B] + (-2) = 4 - 2 = 2`. 2 < Infinity, so we update `dist[C] = 2`. WHY: Negative weights allow the path to decrease in cost.',
      state: { distances: [0, 4, 2], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'Update C to 2.' },
    },
    {
      id: 3,
      title: 'Pass 1: Edge A->C (6)',
      explanation: 'We relax edge A->C. `dist[A] + 6 = 0 + 6 = 6`. 6 is not less than `dist[C]` (2). We skip this update. WHY: The path through B is shorter than the direct edge.',
      state: { distances: [0, 4, 2], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: '6 is not < 2. Skip.' },
    },
    {
      id: 4,
      title: 'Pass 2: Check All Edges',
      explanation: 'We repeat the process for V-1 iterations (2 passes here). In Pass 2, we check A->B (0+4=4), B->C (4-2=2), A->C (0+6=6). None of these can improve the distances. WHY: After V-1 passes, the shortest paths are guaranteed to be found (assuming no negative cycles).',
      state: { distances: [0, 4, 2], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'No updates in Pass 2.' },
    },
    {
      id: 5,
      title: 'Negative Cycle Check',
      explanation: 'We do one final pass over all edges. If we can still relax an edge, it means there is a negative cycle (a cycle whose total weight is negative). Here, no updates occur, so there is no negative cycle. Final distances: [0, 4, 2].',
      state: { distances: [0, 4, 2], edges: [[0, 1, 4], [1, 2, -2], [0, 2, 6]], action: 'No negative cycle. Done.', found: true },
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
      explanation: 'We have 4 nodes (0, 1, 2, 3). Edges: [[0,1,1], [2,3,2], [0,2,3], [1,3,4]]. We sort them by weight. They are already sorted. WHY: Kruskal\'s greedily picks the cheapest edge that does not form a cycle.',
      state: { edges: [[0, 1, 1], [2, 3, 2], [0, 2, 3], [1, 3, 4]], parent: [0, 1, 2, 3], mst: [], action: 'Sorted edges.' },
    },
    {
      id: 1,
      title: 'Pick Edge (0-1, w=1)',
      explanation: 'We pick edge (0,1). Nodes 0 and 1 are in different sets. We union them. Cost = 1. `parent` of 1 becomes 0. WHY: They don\'t form a cycle, so we add the edge to the MST.',
      state: { edges: [[0, 1, 1], [2, 3, 2], [0, 2, 3], [1, 3, 4]], parent: [0, 0, 2, 3], mst: [[0, 1, 1]], action: 'Union 0 and 1. Cost=1.' },
    },
    {
      id: 2,
      title: 'Pick Edge (2-3, w=2)',
      explanation: 'We pick edge (2,3). Nodes 2 and 3 are in different sets. We union them. Cost = 1 + 2 = 3. `parent` of 3 becomes 2.',
      state: { edges: [[0, 1, 1], [2, 3, 2], [0, 2, 3], [1, 3, 4]], parent: [0, 0, 2, 2], mst: [[0, 1, 1], [2, 3, 2]], action: 'Union 2 and 3. Cost=3.' },
    },
    {
      id: 3,
      title: 'Pick Edge (0-2, w=3)',
      explanation: 'We pick edge (0,2). Node 0 is in the set {0,1}, and node 2 is in the set {2,3}. They are different sets. We union them. Cost = 3 + 3 = 6. `parent` of 2 becomes 0.',
      state: { edges: [[0, 1, 1], [2, 3, 2], [0, 2, 3], [1, 3, 4]], parent: [0, 0, 0, 2], mst: [[0, 1, 1], [2, 3, 2], [0, 2, 3]], action: 'Union 0 and 2. Cost=6.' },
    },
    {
      id: 4,
      title: 'Pick Edge (1-3, w=4)',
      explanation: 'We pick edge (1,3). Node 1\'s root is 0. Node 3\'s root is 0 (via 2). They are in the SAME set! Adding this edge would create a cycle. We skip it. WHY: The MST is already complete (V-1 = 3 edges), and adding this would create a cycle.',
      state: { edges: [[0, 1, 1], [2, 3, 2], [0, 2, 3], [1, 3, 4]], parent: [0, 0, 0, 2], mst: [[0, 1, 1], [2, 3, 2], [0, 2, 3]], action: 'Cycle detected. Skip. MST complete.', found: true },
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
      title: 'Start at Node A',
      explanation: 'We start at node A (0) with weight 0. We push `(0, A)` to the Min-Heap. WHY: Prim\'s algorithm grows the MST by adding the cheapest edge from the visited set to the unvisited set.',
      state: { visited: [false, false, false], queue: [[0, 0]], current: null, cost: 0, action: 'Start. PQ: [(0, A)].' },
    },
    {
      id: 1,
      title: 'Pop A(0)',
      explanation: 'We pop A(0). A is unvisited, so we mark it visited and add 0 to our cost. We look at A\'s edges: to B (weight 2) and to C (weight 5). We push both to the PQ.',
      state: { visited: [true, false, false], queue: [[2, 1], [5, 2]], current: 0, cost: 0, action: 'Visit A. Push edges (2,B) and (5,C).' },
    },
    {
      id: 2,
      title: 'Pop B(2)',
      explanation: 'We pop the cheapest edge, which leads to B(2). B is unvisited. We mark it visited and add 2 to our cost. We look at B\'s edges: to C (weight 1). We push (1, C) to the PQ.',
      state: { visited: [true, true, false], queue: [[1, 2], [5, 2]], current: 1, cost: 2, action: 'Visit B. Cost=2. Push (1,C).' },
    },
    {
      id: 3,
      title: 'Pop C(1)',
      explanation: 'We pop the cheapest edge, which is to C(1) via B. C is unvisited. We mark it visited and add 1 to our cost (total 3). WHY: Even though A->C has weight 5, the path B->C is cheaper, so we greedily take it.',
      state: { visited: [true, true, true], queue: [[5, 2]], current: 2, cost: 3, action: 'Visit C. Cost=3.' },
    },
    {
      id: 4,
      title: 'Pop C(5) - Skip',
      explanation: 'We pop `(5, C)`. C is already visited. We skip this edge. WHY: Adding this edge would create a cycle (A -> B -> C -> A).',
      state: { visited: [true, true, true], queue: [], current: 2, cost: 3, action: 'C visited. Skip edge. PQ empty.' },
    },
    {
      id: 5,
      title: 'MST Complete',
      explanation: 'The PQ is empty. The total cost of the Minimum Spanning Tree is 3 (edges A-B and B-C).',
      state: { visited: [true, true, true], queue: [], current: 2, cost: 3, action: 'MST complete. Cost = 3.', found: true },
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
      title: 'Initialize Colors',
      explanation: 'We have a triangle graph (A-B, B-C, C-A). We create a color array of size 3, initialized to -1 (uncolored). WHY: We need to track the color of each node. -1 means unvisited.',
      state: { nodes: [0, 1, 2], colors: [-1, -1, -1], queue: [], action: 'Uncolored.' },
    },
    {
      id: 1,
      title: 'Color Node A',
      explanation: 'We start BFS at node 0 (A). We color it with 0 and push it to the queue.',
      state: { nodes: [0, 1, 2], colors: [0, -1, -1], queue: [0], action: 'Color A with 0. Queue: [A].' },
    },
    {
      id: 2,
      title: 'Process A, Color Neighbors',
      explanation: 'We pop A. We look at its neighbors B and C. They are uncolored (-1). We color them with the opposite color (1). We push them to the queue.',
      state: { nodes: [0, 1, 2], colors: [0, 1, 1], queue: [1, 2], action: 'Color B and C with 1. Queue: [B, C].' },
    },
    {
      id: 3,
      title: 'Pop B, Check Neighbors',
      explanation: 'We pop B. We look at its neighbors. Neighbor A is colored 0 (different, OK). Neighbor C is colored 1 (same, CONFLICT!). WHY: B and C are connected by an edge but have the same color, meaning they cannot be in different sets.',
      state: { nodes: [0, 1, 2], colors: [0, 1, 1], queue: [2], action: 'Conflict at C (colored 1, same as B).' },
    },
    {
      id: 4,
      title: 'Not Bipartite',
      explanation: 'We detected a conflict (B and C are adjacent but have the same color). The graph contains an odd cycle (triangle) and is not bipartite. We return false.',
      state: { nodes: [0, 1, 2], colors: [0, 1, 1], queue: [2], action: 'Not Bipartite!', found: true },
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