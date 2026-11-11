// ============================================================
// KAHN'S ALGORITHM — BFS / In-Degree
// ============================================================
export const kahnsAlgorithm = {
  id: 'kahns-algorithm',
  patternId: 'topological-sort',
  title: "Kahn's Algorithm",
  subtitle: 'BFS / In-Degree',
  type: 'kahns-algorithm',
  difficulty: 'Medium',

  coreConcept: {
    what: 'A linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, U comes before V.',
    why: 'Uses BFS to repeatedly remove nodes with an in-degree of 0 (no incoming edges). This ensures all dependencies are met before processing a node.',
    when: 'Course scheduling, build systems, task dependencies.',
    properties: [
      'Requires a DAG (Directed Acyclic Graph).',
      'Uses a Queue and an in-degree array.',
      'If the final order doesn\'t contain all nodes, a cycle exists.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Course Schedule".',
      '"Task dependencies".',
      'Ordering tasks where some must happen before others.',
    ],
    inputs: ['Number of nodes', 'List of directed edges'],
    constraints: ['O(V + E) time', 'O(V + E) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Compute In-Degrees',
      explanation: 'Calculate the number of incoming edges for each node. Nodes 4 and 5 have 0 in-degree, so they can start immediately.',
      state: {
        inDegree: [2, 2, 2, 1, 0, 0], queue: [4, 5], result: [], current: null, action: 'In-degrees: [2, 2, 2, 1, 0, 0]. Queue: [4, 5].',
      },
    },
    {
      id: 1,
      title: 'Process Node 4',
      explanation: 'Pop 4. Add to result. Decrement in-degrees of neighbors 0 and 1. Node 1\'s in-degree becomes 0, so it is added to the queue.',
      state: {
        inDegree: [1, 1, 2, 1, 0, 0], queue: [5, 1], result: [4], current: 4, action: 'Process 4. Queue: [5, 1].',
      },
    },
    {
      id: 2,
      title: 'Process Node 5',
      explanation: 'Pop 5. Add to result. Decrement in-degrees of neighbors 0 and 2. Node 0\'s in-degree becomes 0, so it is added to the queue.',
      state: {
        inDegree: [0, 1, 1, 1, 0, 0], queue: [1, 0], result: [4, 5], current: 5, action: 'Process 5. Queue: [1, 0].',
      },
    },
    {
      id: 3,
      title: 'Continue Processing',
      explanation: 'Pop 1. No outbound edges. Pop 0. No outbound edges. Pop 2. Decrement in-degree of 3 to 0. Push 3. Pop 3. Result is complete.',
      state: {
        inDegree: [0, 0, 0, 0, 0, 0], queue: [], result: [4, 5, 1, 0, 2, 3], current: 3, action: 'Result: [4, 5, 1, 0, 2, 3].', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class TopologicalSort {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];

        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }

        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }

        int[] order = new int[numCourses];
        int idx = 0;

        while (!queue.isEmpty()) {
            int curr = queue.poll();
            order[idx++] = curr;

            for (int neighbor : adj.get(curr)) {
                if (--inDegree[neighbor] == 0) {
                    queue.offer(neighbor);
                }
            }
        }
        return idx == numCourses ? order : new int[0];
    }
}`,

  javaExplanation: [
    { line: 'int[] inDegree = new int[numCourses];', note: 'Track the number of prerequisites for each course.' },
    { line: 'if (inDegree[i] == 0) queue.offer(i);', note: 'Courses with 0 prerequisites can start immediately.' },
    { line: 'if (--inDegree[neighbor] == 0)', note: 'When a prerequisite is completed, decrement the neighbor\'s in-degree.' },
    { line: 'return idx == numCourses ? order : new int[0];', note: 'If idx < numCourses, there is a cycle.' },
  ],

  complexity: {
    time: 'O(V + E)',
    space: 'O(V + E)',
    aux: 'O(V + E)',
    explanation: 'Process each vertex and edge exactly once.',
  },

  bruteForce: {
    time: 'O(V!)',
    space: 'O(V)',
    note: 'Try all permutations of nodes and check if edges are valid.',
  },

  commonMistakes: [
    { title: 'Not checking for cycles', detail: 'If the result array doesn\'t contain all nodes, there was a cycle. Return an empty array.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/' },
  ],

  quickRevision: [
    'Compute in-degrees.',
    'Queue 0 in-degree nodes.',
    'Pop, add to result, reduce neighbors.',
    'If result size < V, cycle exists.',
  ],
};

// ============================================================
// DFS POST-ORDER — Cycle Detection via DFS
// ============================================================
export const dfsPostOrder = {
  id: 'dfs-post-order',
  patternId: 'topological-sort',
  title: 'DFS Post-Order',
  subtitle: 'Alternative Topological Sort',
  type: 'dfs-post-order',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Explores a node\'s neighbors as deeply as possible, then adds the node to the front of a LinkedList.',
    why: 'This is a Post-Order Traversal. Nodes with no outgoing edges finish first, effectively building the topological sort from end to start.',
    when: 'Path finding, complex dependencies, or when you prefer recursion over BFS.',
    properties: [
      'Uses Recursion and a `visited` array.',
      'Uses a `path` array to detect cycles.',
      'Adds nodes to a LinkedList using `addFirst()`.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Topological sort with DFS".',
      '"Find a valid order".',
    ],
    inputs: ['Number of nodes', 'List of directed edges'],
    constraints: ['O(V + E) time', 'O(V) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Start DFS(0)',
      explanation: 'Call DFS(0). Mark 0 as visited and in the current path. Recurse to 1.',
      state: {
        visited: [true, false, false], path: [true, false, false], result: [], current: 0, action: 'DFS(0).',
      },
    },
    {
      id: 1,
      title: 'DFS(1) -> DFS(2)',
      explanation: 'At 1, mark visited. Recurse to 2. At 2, mark visited. No neighbors.',
      state: {
        visited: [true, true, true], path: [true, true, true], result: [], current: 2, action: 'DFS(2) base case.',
      },
    },
    {
      id: 2,
      title: 'Backtrack Node 2',
      explanation: 'Remove 2 from path. Add 2 to the FRONT of the result. Return to 1.',
      state: {
        visited: [true, true, true], path: [true, true, false], result: [2], current: 1, action: 'Add 2 to front.',
      },
    },
    {
      id: 3,
      title: 'Backtrack Node 1',
      explanation: 'Remove 1 from path. Add 1 to the front. Return to 0.',
      state: {
        visited: [true, true, true], path: [true, false, false], result: [1, 2], current: 0, action: 'Add 1 to front.',
      },
    },
    {
      id: 4,
      title: 'Backtrack Node 0',
      explanation: 'Remove 0 from path. Add 0 to the front. Result: [0, 1, 2].',
      state: {
        visited: [true, true, true], path: [false, false, false], result: [0, 1, 2], current: null, action: 'Result: [0, 1, 2]', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class TopologicalDFS {
    public int[] findOrder(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        for (int[] pre : prerequisites) adj.get(pre[1]).add(pre[0]);
        
        boolean[] visited = new boolean[numCourses];
        boolean[] path = new boolean[numCourses];
        LinkedList<Integer> result = new LinkedList<>();
        
        for (int i = 0; i < numCourses; i++) {
            if (!visited[i]) {
                if (!dfs(i, adj, visited, path, result)) return new int[0];
            }
        }
        return result.stream().mapToInt(i -> i).toArray();
    }

    private boolean dfs(int node, List<List<Integer>> adj, boolean[] visited, 
                        boolean[] path, LinkedList<Integer> result) {
        if (path[node]) return false; // Cycle detected
        if (visited[node]) return true;
        
        path[node] = true;
        for (int neighbor : adj.get(node)) {
            if (!dfs(neighbor, adj, visited, path, result)) return false;
        }
        
        path[node] = false;
        visited[node] = true;
        result.addFirst(node);
        return true;
    }
}`,

  javaExplanation: [
    { line: 'if (path[node]) return false;', note: 'If we visit a node currently in our path, we have a cycle.' },
    { line: 'result.addFirst(node);', note: 'Post-order: add nodes to the front after exploring all neighbors.' },
    { line: 'path[node] = false;', note: 'Backtrack: remove from the path after fully exploring.' },
  ],

  complexity: {
    time: 'O(V + E)',
    space: 'O(V + E)',
    aux: 'O(V)',
    explanation: 'Recursion stack can go up to O(V). LinkedList stores V nodes.',
  },

  bruteForce: {
    time: 'O(V!)',
    space: 'O(V)',
    note: 'Try all permutations.',
  },

  commonMistakes: [
    { title: 'Forgetting to backtrack', detail: 'If you don\'t set `path[node] = false`, you will falsely detect cycles.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/' },
  ],

  quickRevision: [
    'DFS with visited and path.',
    'If path has node -> cycle.',
    'Post-order: add to front.',
  ],
};

// ============================================================
// CYCLE DETECTION — Course Schedule
// ============================================================
export const cycleDetection = {
  id: 'cycle-detection',
  patternId: 'topological-sort',
  title: 'Cycle Detection',
  subtitle: 'Course Schedule',
  type: 'cycle-detection',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Determine if a graph has a cycle. If it does, a topological sort is impossible.',
    why: 'Kahn\'s algorithm can detect cycles by checking if the number of processed nodes is less than the total number of nodes.',
    when: 'Course Schedule, deadlock detection.',
    properties: [
      'Use Kahn\'s Algorithm.',
      'Track the `count` of processed nodes.',
      'If `count < N`, return false.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Can you finish all courses?".',
      '"Is there a cycle?".',
    ],
    inputs: ['Number of nodes', 'Edges'],
    constraints: ['O(V + E) time', 'O(V) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Graph Setup',
      explanation: 'Cycle graph: 0->1, 1->2, 2->0. In-degrees are [1, 1, 1]. No node has 0 in-degree.',
      state: {
        inDegree: [1, 1, 1], queue: [], count: 0, action: 'In-degrees: [1, 1, 1]. Queue empty.',
      },
    },
    {
      id: 1,
      title: 'Check Queue',
      explanation: 'Queue is empty. We process 0 nodes.',
      state: {
        inDegree: [1, 1, 1], queue: [], count: 0, action: 'Queue empty. Count = 0.',
      },
    },
    {
      id: 2,
      title: 'Cycle Detected',
      explanation: 'Count (0) < Total Nodes (3). Therefore, a cycle exists.',
      state: {
        inDegree: [1, 1, 1], queue: [], count: 0, action: 'Cycle detected!', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class CourseSchedule {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
        int[] inDegree = new int[numCourses];
        
        for (int[] pre : prerequisites) {
            adj.get(pre[1]).add(pre[0]);
            inDegree[pre[0]]++;
        }
        
        Queue<Integer> queue = new LinkedList<>();
        for (int i = 0; i < numCourses; i++) {
            if (inDegree[i] == 0) queue.offer(i);
        }
        
        int count = 0;
        while (!queue.isEmpty()) {
            int curr = queue.poll();
            count++;
            for (int neighbor : adj.get(curr)) {
                if (--inDegree[neighbor] == 0) queue.offer(neighbor);
            }
        }
        
        return count == numCourses;
    }
}`,

  javaExplanation: [
    { line: 'int count = 0;', note: 'Keep track of how many courses we can finish.' },
    { line: 'count++;', note: 'Increment when a course is processed.' },
    { line: 'return count == numCourses;', note: 'If we didn\'t process all courses, there is a cycle.' },
  ],

  complexity: {
    time: 'O(V + E)',
    space: 'O(V + E)',
    aux: 'O(V)',
    explanation: 'Standard BFS traversal.',
  },

  bruteForce: {
    time: 'O(V!)',
    space: 'O(V)',
    note: 'Try all orderings.',
  },

  commonMistakes: [
    { title: 'Forgetting the cycle check', detail: 'You must verify `count == numCourses` at the end.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/' },
  ],

  quickRevision: [
    'Kahn\'s algorithm.',
    'Count processed nodes.',
    'If count < N, cycle.',
  ],
};

// ============================================================
// LEXICOGRAPHICAL ORDER — Alien Dictionary
// ============================================================
export const lexicographicalOrder = {
  id: 'lexicographical-order',
  patternId: 'topological-sort',
  title: 'Lexicographical Order',
  subtitle: 'Alien Dictionary',
  type: 'lexicographical-order',
  difficulty: 'Hard',

  coreConcept: {
    what: 'Find the smallest topological order possible.',
    why: 'By replacing the standard Queue in Kahn\'s Algorithm with a Min-Heap (Priority Queue), we always process the lexicographically smallest available node.',
    when: 'Alien Dictionary, or when a specific tie-breaking order is required.',
    properties: [
      'Use a PriorityQueue instead of a LinkedList.',
      'Extract minimum character at each step.',
      'Ensure all characters in the dictionary are accounted for.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Alien Dictionary".',
      '"Smallest lexicographical order".',
      '"Custom sorting rules".',
    ],
    inputs: ['List of sorted words'],
    constraints: ['O(C + E log V) time (C = total characters)'],
  },

  steps: [
    {
      id: 0,
      title: 'Build Graph',
      explanation: 'Words: ["wrt", "wrf", "er"]. Compare adjacent words. w==w, r==r, t != f. Edge t->f. w->e. In-degrees computed.',
      state: {
        inDegree: [0, 0, 0, 0, 0], queue: ['w'], result: '', action: 'Edges: t->f, w->e. PQ: [w].',
      },
    },
    {
      id: 1,
      title: 'Process w',
      explanation: 'Pop w. Result: "w". Decrement in-degree of e to 0. Push e to PQ.',
      state: {
        inDegree: [0, 0, 0, 0, 0], queue: ['e'], result: 'w', action: 'PQ: [e].',
      },
    },
    {
      id: 2,
      title: 'Process e',
      explanation: 'Pop e. Result: "we". Push r.',
      state: {
        inDegree: [0, 0, 0, 0, 0], queue: ['r'], result: 'we', action: 'PQ: [r].',
      },
    },
    {
      id: 3,
      title: 'Continue',
      explanation: 'Pop r. Result: "wer". Push t.',
      state: {
        inDegree: [0, 0, 0, 0, 0], queue: ['t'], result: 'wer', action: 'PQ: [t].',
      },
    },
    {
      id: 4,
      title: 'Finish',
      explanation: 'Pop t. Result: "wert". Push f. Pop f. Result: "wertf".',
      state: {
        inDegree: [0, 0, 0, 0, 0], queue: [], result: 'wertf', action: 'Result: wertf', found: true,
      },
    },
  ],

  javaCode: `import java.util.*;

public class AlienDictionary {
    public String alienOrder(String[] words) {
        Map<Character, Set<Character>> adj = new HashMap<>();
        int[] inDegree = new int[26];
        int uniqueChars = 0;
        
        for (String w : words) {
            for (char c : w.toCharArray()) {
                if (inDegree[c - 'a'] == 0) uniqueChars++;
                inDegree[c - 'a']++;
            }
        }
        
        for (int i = 0; i < words.length - 1; i++) {
            String w1 = words[i], w2 = words[i + 1];
            int minLen = Math.min(w1.length(), w2.length());
            for (int j = 0; j < minLen; j++) {
                if (w1.charAt(j) != w2.charAt(j)) {
                    adj.computeIfAbsent(w1.charAt(j), k -> new HashSet<>()).add(w2.charAt(j));
                    break;
                }
            }
        }
        
        Arrays.fill(inDegree, 0);
        for (Set<Character> neighbors : adj.values()) {
            for (char c : neighbors) inDegree[c - 'a']++;
        }
        
        PriorityQueue<Character> pq = new PriorityQueue<>();
        for (int i = 0; i < 26; i++) {
            if (inDegree[i] == 0 && adj.containsKey((char)(i + 'a'))) {
                pq.offer((char)(i + 'a'));
            }
        }
        
        StringBuilder sb = new StringBuilder();
        while (!pq.isEmpty()) {
            char c = pq.poll();
            sb.append(c);
            if (adj.containsKey(c)) {
                for (char next : adj.get(c)) {
                    if (--inDegree[next - 'a'] == 0) pq.offer(next);
                }
            }
        }
        return sb.length() == uniqueChars ? sb.toString() : "";
    }
}`,

  javaExplanation: [
    { line: 'PriorityQueue<Character> pq = new PriorityQueue<>();', note: 'Min-Heap ensures we process the alphabetically smallest character first.' },
    { line: 'sb.length() == uniqueChars', note: 'Verify we processed all unique characters. Otherwise, a cycle exists.' },
  ],

  complexity: {
    time: 'O(C + E log V)',
    space: 'O(V + E)',
    aux: 'O(V)',
    explanation: 'C is total characters. E log V for heap operations.',
  },

  bruteForce: {
    time: 'O(V!)',
    space: 'O(V)',
    note: 'Try all permutations of the alphabet.',
  },

  commonMistakes: [
    { title: 'Invalid prefix', detail: 'If a longer word appears before a shorter word with the same prefix (e.g., "abc" before "ab"), return "".' },
  ],

  interviewQuestions: [
    { level: 'Hard', title: 'Alien Dictionary', url: 'https://leetcode.com/problems/alien-dictionary/' },
  ],

  quickRevision: [
    'Build graph from adjacent words.',
    'Use PriorityQueue (Min-Heap).',
    'Verify length matches unique chars.',
  ],
};

export const topologicalSortSubPatterns = [kahnsAlgorithm, dfsPostOrder, cycleDetection, lexicographicalOrder];

export const topologicalSortOverview = {
  id: 'topological-sort',
  title: 'Topological Sort',
  subtitle: 'Order tasks, resolve dependencies, detect cycles',
  introduction: 'Topological Sort is a linear ordering of vertices in a Directed Acyclic Graph (DAG) such that for every directed edge U -> V, vertex U comes before V. It is the core algorithm for dependency resolution and scheduling.',
  coreConcept: {
    what: 'An ordering of nodes based on their dependencies.',
    why: 'Ensures tasks are executed in a valid sequence (e.g., you must take Math 101 before Math 201).',
    when: 'Course scheduling, build systems, task dependencies.',
  },
  whenToUse: [
    'The problem involves tasks with dependencies.',
    'You need to find a valid order or detect a cycle.',
  ],
  recognitionClues: [
    '"Course Schedule"',
    '"Alien Dictionary"',
    '"Task dependencies"',
  ],
  importantProperties: [
    'Only works on DAGs.',
    'Two main approaches: Kahn\'s BFS (In-Degree) and DFS Post-Order.',
    'If the result doesn\'t contain all nodes, a cycle exists.',
  ],
  comparison: [
    { aspect: "Kahn's", when: 'Standard order', time: 'O(V + E)', space: 'O(V)' },
    { aspect: 'DFS', when: 'Path finding', time: 'O(V + E)', space: 'O(V)' },
    { aspect: 'Cycle Det', when: 'Is DAG valid?', time: 'O(V + E)', space: 'O(V)' },
    { aspect: 'Lexicographical', when: 'Smallest order', time: 'O(E log V)', space: 'O(V)' },
  ],
  commonMistakes: [
    { title: 'Forgetting Cycle Check', detail: 'Always check if the processed count equals the total nodes.' },
  ],
  interviewQuestions: [
    { level: 'Medium', title: 'Course Schedule', url: 'https://leetcode.com/problems/course-schedule/' },
    { level: 'Medium', title: 'Course Schedule II', url: 'https://leetcode.com/problems/course-schedule-ii/' },
    { level: 'Hard', title: 'Alien Dictionary', url: 'https://leetcode.com/problems/alien-dictionary/' },
  ],
};