export const cheatSheetSections = [
  {
    category: "General Strategy & Complexity",
    color: "card-yellow",
    icon: "🧠",
    items: [
      { title: "The 5-Step Interview Framework", desc: "1. Understand (ask edge cases). 2. Brute Force. 3. Optimize (find pattern). 4. Code cleanly. 5. Test (dry run)." },
      { title: "Big-O & Input Constraints", desc: "N ≤ 10 (O(N!)), N ≤ 20 (O(2^N)), N ≤ 100 (O(N³)), N ≤ 1,000 (O(N²)), N ≤ 10^5 (O(N log N)), N ≤ 10^8 (O(N))." },
      { title: "Edge Cases Checklist", desc: "Empty input (null, [], ''), Single element, Duplicates, Negative numbers, Overflows (use long), Cycles (check visited)." },
      { title: "Optimization Loop", desc: "Always start with Brute Force. Then ask: 'Can I optimize this using a Hash Map, Two Pointers, or Sorting?'" }
    ]
  },
  {
    category: "Two Pointers",
    color: "card-blue",
    icon: "👉👈",
    items: [
      { title: "Opposite Ends", desc: "Requires sorted array. Move L++ if sum too small, R-- if too big. (e.g., 3Sum)." },
      { title: "Same Direction", desc: "Slow writes, Fast reads. Used for in-place deduplication." },
      { title: "Dutch Flag", desc: "3 pointers (low, mid, high) for sorting 0s, 1s, 2s in one pass." },
      { title: "Safe Mid-Point", desc: "Formula: mid = L + (R - L) / 2 (prevents integer overflow)." }
    ]
  },
  {
    category: "Sliding Window",
    color: "card-purple",
    icon: "🪟",
    items: [
      { title: "Fixed Size Window", desc: "Add right, remove left. No while loop needed. Window Length = R - L + 1." },
      { title: "Variable (Longest)", desc: "Expand right, then while (INVALID) shrink left." },
      { title: "Variable (Shortest)", desc: "Expand right, then while (VALID) shrink left." },
      { title: "Negative Numbers?", desc: "Sliding window FAILS with negative numbers. Use Prefix Sum + Hash Map instead." }
    ]
  },
  {
    category: "Binary Search",
    color: "card-green",
    icon: "🔍",
    items: [
      { title: "Exact Match", desc: "while (L <= R), L = mid + 1, R = mid - 1." },
      { title: "Lower Bound", desc: "while (L < R), R = mid, L = mid + 1. Right starts at N (not N-1)." },
      { title: "Binary Search on Answer", desc: "If isValid(x) is monotonic (if X works, X+1 works), binary search the answer space (e.g., Koko Eating Bananas)." }
    ]
  },
  {
    category: "Hashing & Prefix Sum",
    color: "card-teal",
    icon: "🧮",
    items: [
      { title: "1D Prefix Sum", desc: "sum(L..R) = prefix[R+1] - prefix[L]." },
      { title: "Subarray Sum Equals K", desc: "Use a Hash Map to store prefix sums. Check if (currentSum - K) exists in the map." },
      { title: "Kadane's Algorithm", desc: "Max Subarray: curr = max(num, curr + num)." }
    ]
  },
  {
    category: "Trees & BFS/DFS",
    color: "card-pink",
    icon: "🌳",
    items: [
      { title: "DFS (Recursive)", desc: "Pre-order (Root, L, R), In-order (L, Root, R - sorted for BST), Post-order (L, R, Root)." },
      { title: "BFS (Queue)", desc: "Level-order traversal. Always capture size = queue.size() before the loop." }
    ]
  },
  {
    category: "Graphs",
    color: "card-orange",
    icon: "🕸️",
    items: [
      { title: "BFS / DFS", desc: "O(V + E). Traversal, Connectivity, Cycle detection." },
      { title: "Topological Sort", desc: "O(V + E). DAGs, Course Schedule, Dependencies." },
      { title: "Dijkstra", desc: "O((V + E) log V). Shortest path (Non-negative weights)." },
      { title: "Bellman-Ford", desc: "O(V * E). Shortest path (Negative weights, detects neg cycles)." },
      { title: "Union Find (DSU)", desc: "O(α(N)) ≈ O(1). Dynamic connectivity, Kruskal's MST." }
    ]
  },
  {
    category: "Dynamic Programming",
    color: "card-red",
    icon: "🧩",
    items: [
      { title: "1D DP", desc: "dp[i] = dp[i-1] + dp[i-2] (Fibonacci/Stairs)." },
      { title: "0/1 Knapsack", desc: "dp[i][w] = max(val[i] + dp[i-1][w-wt[i]], dp[i-1][w])." },
      { title: "Unbounded Knapsack", desc: "Coin Change. Iterate capacity FORWARD to allow item reuse." },
      { title: "String DP (LCS)", desc: "If chars match: dp[i][j] = dp[i-1][j-1] + 1. Else: max(dp[i-1][j], dp[i][j-1])." },
      { title: "Space Optimization", desc: "If dp[i] only depends on dp[i-1], replace 2D array with 1D array or two variables." }
    ]
  },
  {
    category: "Bit Manipulation",
    color: "card-yellow",
    icon: "💻",
    items: [
      { title: "Odd/Even", desc: "(x & 1) == 1 (Odd)." },
      { title: "Clear Lowest Set Bit", desc: "x & (x - 1)." },
      { title: "Check Power of 2", desc: "(x & (x - 1)) == 0." },
      { title: "Unique Element", desc: "XOR all elements (a ^ a = 0)." }
    ]
  }
];