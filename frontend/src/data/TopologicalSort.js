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
      title: 'Initialize In-Degrees',
      explanation: 'Graph: 0->1, 0->2, 1->3, 2->3. We calculate the in-degree (number of incoming edges) for each node. Node 0 has 0, Node 1 has 1, Node 2 has 1, Node 3 has 2. WHY: Nodes with in-degree 0 have no prerequisites and are safe to start.',
      state: { inDegree: [0, 1, 1, 2], queue: [0], result: [], current: null, action: 'In-degrees: [0,1,1,2]. Queue: [0].' },
    },
    {
      id: 1,
      title: 'Process Node 0',
      explanation: 'We pop 0 from the queue and add it to our result. We look at its neighbors (1 and 2) and decrement their in-degrees. Node 1\'s in-degree becomes 0, so it enters the queue. Node 2\'s in-degree becomes 0, so it enters the queue.',
      state: { inDegree: [0, 0, 0, 2], queue: [1, 2], result: [0], current: 0, action: 'Pop 0. Queue: [1, 2].' },
    },
    {
      id: 2,
      title: 'Process Node 1',
      explanation: 'We pop 1 and add it to the result. We decrement the in-degree of its neighbor 3. Node 3\'s in-degree drops from 2 to 1. It is not 0 yet, so we don\'t queue it.',
      state: { inDegree: [0, 0, 0, 1], queue: [2], result: [0, 1], current: 1, action: 'Pop 1. Queue: [2].' },
    },
    {
      id: 3,
      title: 'Process Node 2',
      explanation: 'We pop 2 and add it to the result. We decrement the in-degree of its neighbor 3. Node 3\'s in-degree drops from 1 to 0. It is now ready, so we push it to the queue. WHY: Both of Node 3\'s prerequisites (1 and 2) are now processed.',
      state: { inDegree: [0, 0, 0, 0], queue: [3], result: [0, 1, 2], current: 2, action: 'Pop 2. Queue: [3].' },
    },
    {
      id: 4,
      title: 'Process Node 3',
      explanation: 'We pop 3 and add it to the result. Node 3 has no outgoing edges. The queue is now empty, and our result contains all 4 nodes.',
      state: { inDegree: [0, 0, 0, 0], queue: [], result: [0, 1, 2, 3], current: 3, action: 'Pop 3. Result complete.' },
    },
    {
      id: 5,
      title: 'Final Result',
      explanation: 'We successfully processed all nodes. The topological order is [0, 1, 2, 3]. If the result length was less than the total nodes, it would mean a cycle exists.',
      state: { inDegree: [0, 0, 0, 0], queue: [], result: [0, 1, 2, 3], current: 3, action: 'Done.', found: true },
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
      explanation: 'Graph: 0->1, 1->2. We start at node 0. We mark it as `visited` and add it to our current `path`. We then recursively explore its neighbor, 1. WHY: `path` is used to detect cycles, while `visited` prevents redundant work.',
      state: { visited: [true, false, false], path: [true, false, false], result: [], current: 0, action: 'DFS(0). Path: [0].' },
    },
    {
      id: 1,
      title: 'DFS(1)',
      explanation: 'We are at node 1. Mark it `visited` and add to `path`. Recurse to its neighbor, 2.',
      state: { visited: [true, true, false], path: [true, true, false], result: [], current: 1, action: 'DFS(1). Path: [0, 1].' },
    },
    {
      id: 2,
      title: 'DFS(2)',
      explanation: 'We are at node 2. Mark it `visited` and add to `path`. Node 2 has no outgoing edges. The recursion bottoms out.',
      state: { visited: [true, true, true], path: [true, true, true], result: [], current: 2, action: 'DFS(2). No outgoing edges.' },
    },
    {
      id: 3,
      title: 'Backtrack Node 2',
      explanation: 'We have finished exploring node 2. We remove it from the `path` (since we are no longer visiting it) and add it to the FRONT of our result list. WHY: Post-order means we add the node only after all its dependencies are processed.',
      state: { visited: [true, true, true], path: [true, true, false], result: [2], current: 1, action: 'Add 2 to front. Backtrack to 1.' },
    },
    {
      id: 4,
      title: 'Backtrack Node 1',
      explanation: 'We return to node 1. Its only neighbor (2) is fully processed. We remove 1 from the `path` and add it to the FRONT of the result list.',
      state: { visited: [true, true, true], path: [true, false, false], result: [1, 2], current: 0, action: 'Add 1 to front. Backtrack to 0.' },
    },
    {
      id: 5,
      title: 'Backtrack Node 0',
      explanation: 'We return to node 0. It has no other neighbors. We remove 0 from the `path` and add it to the FRONT of the result list.',
      state: { visited: [true, true, true], path: [false, false, false], result: [0, 1, 2], current: null, action: 'Add 0 to front.' },
    },
    {
      id: 6,
      title: 'Final Result',
      explanation: 'The DFS is complete. The topological order is [0, 1, 2]. WHY: By adding to the front, the node with no outgoing edges (2) ends up at the very back of the list.',
      state: { visited: [true, true, true], path: [false, false, false], result: [0, 1, 2], current: null, action: 'Result: [0, 1, 2]', found: true },
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
      explanation: 'Cycle graph: 0->1, 1->2, 2->0. We calculate the in-degree of each node. Node 0 has 1 (from 2), Node 1 has 1 (from 0), Node 2 has 1 (from 1). WHY: In a cycle, every node is dependent on another node in the cycle.',
      state: { inDegree: [1, 1, 1], queue: [], count: 0, action: 'In-degrees: [1, 1, 1]. Queue empty.' },
    },
    {
      id: 1,
      title: 'Check Queue',
      explanation: 'We look for nodes with an in-degree of 0 to start our BFS. There are none. The queue is empty from the very beginning.',
      state: { inDegree: [1, 1, 1], queue: [], count: 0, action: 'No nodes with 0 in-degree.' },
    },
    {
      id: 2,
      title: 'Cycle Detected',
      explanation: 'Because the queue is empty, the while loop terminates immediately. We have processed `count = 0` nodes. Since `count` (0) < Total Nodes (3), we know a cycle exists. We cannot finish all courses.',
      state: { inDegree: [1, 1, 1], queue: [], count: 0, action: 'Count 0 < 3. Cycle detected!', found: true },
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
      title: 'Build Edges',
      explanation: 'Words: ["wrt", "wrf", "er"]. We compare adjacent words to find the character ordering. Comparing "wrt" and "wrf", the first differing character is "t" and "f". This means t comes before f (edge: t->f). Comparing "wrf" and "er", the first differing character is w and e (edge: w->e).',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 1, e: 1 }, queue: ['r', 't', 'w'], result: '', action: 'Edges: t->f, w->e. PQ: [r, t, w].' },
    },
    {
      id: 1,
      title: 'Process Smallest (r)',
      explanation: 'We use a Min-Heap. The smallest character with in-degree 0 is r. We pop r and add it to our result. It has no outgoing edges.',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 1, e: 1 }, queue: ['t', 'w'], result: 'r', action: 'Pop r. PQ: [t, w].' },
    },
    {
      id: 2,
      title: 'Process Smallest (t)',
      explanation: 'The smallest character in the PQ is t. We pop t and add it to the result. t has an edge to f. We decrement f\'s in-degree to 0. f is now ready and is pushed to the PQ.',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 0, e: 1 }, queue: ['f', 'w'], result: 'rt', action: 'Pop t. PQ: [f, w].' },
    },
    {
      id: 3,
      title: 'Process Smallest (f)',
      explanation: 'The smallest in the PQ is now f. Pop f and add to result. f has no outgoing edges.',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 0, e: 1 }, queue: ['w'], result: 'rtf', action: 'Pop f. PQ: [w].' },
    },
    {
      id: 4,
      title: 'Process Smallest (w)',
      explanation: 'Pop w and add to result. w has an edge to e. Decrement e\'s in-degree to 0. Push e to the PQ.',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 0, e: 0 }, queue: ['e'], result: 'rtfw', action: 'Pop w. PQ: [e].' },
    },
    {
      id: 5,
      title: 'Process Smallest (e)',
      explanation: 'Pop e and add to result. The PQ is empty.',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 0, e: 0 }, queue: [], result: 'rtfwe', action: 'Pop e. PQ empty.' },
    },
    {
      id: 6,
      title: 'Final Check',
      explanation: 'The result length (5) matches the number of unique characters found (w, r, t, f, e). The valid alien dictionary order is "rtfwe".',
      state: { inDegree: { w: 0, r: 0, t: 0, f: 0, e: 0 }, queue: [], result: 'rtfwe', action: 'Result: rtfwe', found: true },
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