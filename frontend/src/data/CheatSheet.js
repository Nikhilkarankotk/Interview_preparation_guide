// data/CheatSheet.js
// Existing title/desc are UNCHANGED. Only `tips` is added per item.
// CheatSheetPage.jsx needs no modification — it reads title/desc only.

export const cheatSheetSections = [
  {
    category: "General Strategy & Complexity",
    color: "card-yellow",
    icon: "🧠",
    items: [
      {
        title: "The 5-Step Interview Framework",
        desc: "1. Understand (ask edge cases). 2. Brute Force. 3. Optimize (find pattern). 4. Code cleanly. 5. Test (dry run).",
        tips: {
          recognition: {
            keywords: ["any new problem"],
            signals: ["You have no idea where to start", "You jump to coding within 30 seconds"],
            notFor: []
          },
          tricks: [
            "Spend the first 2 minutes restating the problem in your own words — interviewers frequently correct a wrong assumption here.",
            "State the brute force out loud even if you already know the optimal — it establishes a baseline to measure improvement against.",
            "Write the function signature and edge-case returns BEFORE the algorithm — this forces you to confront null/empty inputs early.",
            "Dry-run on the smallest non-trivial input (n = 3) plus one edge case before saying 'done'."
          ],
          optimization: {
            bottleneck: "Skipping straight to the optimal solution leaves you unable to justify it when the interviewer asks 'why is this better?'",
            path: "Brute force → identify the repeated work → name the pattern → optimize.",
            why: "Interviewers score reasoning, not just correctness; a justified O(n log n) beats an unexplained O(n).",
            tradeoff: "If time is short, a correct brute force beats a half-written optimal solution."
          },
          traps: [
            {
              wrong: "Coding immediately after reading the problem",
              why: "You optimize for the example, not the general case, and discover missed constraints mid-implementation.",
              right: "Restate + confirm constraints + one clarifying question first.",
              ex: "Problem says 'array' — ask if it can be empty or unsorted before assuming."
            }
          ],
          edgeCases: ["Empty input", "Single element", "All duplicates", "Max constraint value", "Negative numbers"],
          java: [
            "Write the method signature with the exact return type first; Java's compiler will catch mismatched returns early.",
            "Use `long` for any accumulation you are not 100% sure fits in `int`."
          ],
          followUps: [
            { q: "Why did you choose this approach?", a: "Tie it to a constraint: 'n ≤ 10^5 rules out O(n²), so I needed O(n) or O(n log n).'" },
            { q: "What is the bottleneck of your brute force?", a: "Name the exact repeated work — that's what justifies the optimization." },
            { q: "How would you test this?", a: "Walk through one normal case, one edge case, and one adversarial case." }
          ],
          recall: [
            "Restate the problem",
            "Confirm input constraints",
            "State brute force + its complexity",
            "Name the pattern",
            "Code",
            "Dry-run one edge case"
          ]
        }
      },
      {
        title: "Big-O & Input Constraints",
        desc: "N ≤ 10 (O(N!)), N ≤ 20 (O(2^N)), N ≤ 100 (O(N³)), N ≤ 1,000 (O(N²)), N ≤ 10^5 (O(N log N)), N ≤ 10^8 (O(N)).",
        tips: {
          recognition: {
            keywords: ["constraints", "1 ≤ n ≤"],
            signals: ["The constraint block is the single strongest hint about the intended complexity"],
            notFor: []
          },
          tricks: [
            "Read constraints BEFORE designing the algorithm — they tell you the target complexity.",
            "Inverse mapping: n ≤ 20 → bitmask/backtracking; n ≤ 10^5 → O(n log n); n ≤ 10^8 → O(n) with tiny constant.",
            "O(n log n) at n = 10^5 is ~1.7M ops — safe. O(n²) at n = 10^5 is 10^10 — TLE.",
            "Constants matter: a 10^8 loop with a HashMap lookup is ~10x slower than with an array."
          ],
          optimization: {
            bottleneck: "Guessing a complexity that doesn't match the constraint is the most common cause of TLE.",
            path: "Constraint → target complexity → candidate data structure → algorithm.",
            why: "Each complexity class has a characteristic 'trick' (sorting, heap, hash map, bitmask).",
            tradeoff: "O(n log n) with O(1) space often beats O(n) with O(n) space if memory is constrained."
          },
          traps: [
            {
              wrong: "Using a HashSet inside an O(n) loop for an O(n²) hidden cost",
              why: "Hash operations are O(1) amortized but with a large constant; still fine at n=10^5, but nested hash loops are not.",
              right: "Prefer arrays for fixed-range keys.",
              ex: "Character frequency: int[26] is ~10x faster than HashMap<Character,Integer>."
            }
          ],
          edgeCases: ["n = 0", "n = 1", "n at max bound", "Values at Integer.MAX_VALUE"],
          java: [
            "Java does ~10^8 simple ops/second; treat 10^7 as a safe target for mixed operations.",
            "`Arrays.sort(int[])` is dual-pivot quicksort, O(n log n) average, O(n²) worst — adversarial inputs exist."
          ],
          followUps: [
            { q: "What's the max n your solution handles?", a: "State the complexity and the n at which it would TLE." },
            { q: "Can you trade space for time?", a: "Hash map / memoization usually does this — name the space cost." }
          ],
          recall: [
            "Read constraints first",
            "Map n to target complexity",
            "Check constants, not just big-O",
            "Confirm space limit too"
          ]
        }
      },
      {
        title: "Edge Cases Checklist",
        desc: "Empty input (null, [], ''), Single element, Duplicates, Negative numbers, Overflows (use long), Cycles (check visited).",
        tips: {
          recognition: {
            keywords: ["null", "empty", "0 ≤ n", "may contain duplicates"],
            signals: ["Problem statement uses 'may be empty' or 'at least one'"],
            notFor: []
          },
          tricks: [
            "Guard clauses at the top of the method (`if (nums == null || nums.length == 0) return ...`) keep the main body clean.",
            "For arrays: test n = 0, n = 1, n = 2 — most off-by-one bugs surface in these three.",
            "For strings: test empty, single char, all-same-char, and a palindrome.",
            "For graphs: test a single node with no edges, a disconnected graph, and a self-loop."
          ],
          optimization: {
            bottleneck: "Edge-case handling bolted on at the end often contradicts the main logic.",
            path: "Enumerate edge cases before coding, then handle them with early returns.",
            why: "Early returns reduce nesting and make the main loop provably safe.",
            tradeoff: "Over-guarding adds noise; guard only what the loop actually assumes."
          },
          traps: [
            {
              wrong: "Checking `nums.length == 0` but not `nums == null`",
              why: "NPE at the first line; the guard never executes.",
              right: "Check null first, then length.",
              ex: "`if (nums == null || nums.length < 2) return ...`"
            }
          ],
          edgeCases: ["null", "[]", "[x]", "[x,x,x]", "[Integer.MIN_VALUE]", "Sorted descending", "All negative"],
          java: [
            "`Integer.MIN_VALUE` negated overflows to itself — use `long` when negating.",
            "`Math.abs(Integer.MIN_VALUE)` is negative — a classic bug in difference-based problems.",
            "`String.isEmpty()` is safe on empty; `charAt(0)` is not."
          ],
          followUps: [
            { q: "What if the array contains duplicates?", a: "Depends on the pattern — dedupe with sorting, or use a Set, or count frequencies." },
            { q: "What if n is 0?", a: "Return the identity element: 0 for sums, 1 for products, empty list for collections." }
          ],
          recall: [
            "Null check",
            "Empty check",
            "Single element",
            "Duplicates",
            "Overflow (long)",
            "Visited set for graphs"
          ]
        }
      },
      {
        title: "Optimization Loop",
        desc: "Always start with Brute Force. Then ask: 'Can I optimize this using a Hash Map, Two Pointers, or Sorting?'",
        tips: {
          recognition: {
            keywords: ["brute force", "optimize"],
            signals: ["You've written an O(n²) loop and are looking for the next step"],
            notFor: []
          },
          tricks: [
            "Ask: 'What am I recomputing?' — the answer usually names the data structure that removes the recomputation.",
            "Repeated lookups → Hash Map. Repeated range queries → Prefix Sum. Repeated min/max → Heap. Monotonic search → Binary Search.",
            "If the array can be sorted without losing required info, sorting is almost always a valid first optimization.",
            "Ask whether the brute force is O(n²) because of pair enumeration — if so, two pointers after sorting kills one loop."
          ],
          optimization: {
            bottleneck: "Nested loops that re-scan the same prefix or suffix",
            path: "Identify the repeated sub-computation → cache it (hash, prefix, monotonic stack) → drop one loop.",
            why: "Each loop level removed by caching turns O(n²) into O(n).",
            tradeoff: "Caching costs O(n) space; two pointers costs O(1) but requires sorting."
          },
          traps: [
            {
              wrong: "Reaching for the hash map when sorting + two pointers gives O(1) space",
              why: "Hash map is O(n) space; if the problem constrains space, this fails the follow-up.",
              right: "Mention both, justify the choice by the space constraint.",
              ex: "Two Sum (return indices) needs a hash map; Two Sum II (sorted, indices) needs two pointers."
            }
          ],
          edgeCases: ["Overflow in the optimization", "Duplicates creating false matches"],
          java: [
            "`HashMap.getOrDefault` avoids the containsKey + get double lookup.",
            "`Arrays.sort` on primitives is not stable — irrelevant for values, but matters for index-paired arrays."
          ],
          followUps: [
            { q: "Can you do it in O(1) space?", a: "Usually yes if sorting is allowed — sort in place, then two pointers." },
            { q: "Which is better, hash map or sorting?", a: "Hash map: O(n) time, O(n) space. Sorting: O(n log n) time, O(1) space. Choose by constraint." }
          ],
          recall: [
            "Write brute force first",
            "Name the repeated work",
            "Pick the structure that caches it",
            "Check the space constraint",
            "Compare alternatives explicitly"
          ]
        }
      }
    ]
  },

  {
    category: "Two Pointers",
    color: "card-blue",
    icon: "👉👈",
    items: [
      {
        title: "Opposite Ends",
        desc: "Requires sorted array. Move L++ if sum too small, R-- if too big. (e.g., 3Sum).",
        tips: {
          recognition: {
            keywords: ["sorted array", "pair with target sum", "triplet", "palindrome", "container with most water"],
            signals: [
              "Input is sorted, or can be sorted without losing required index info",
              "You need a pair/triplet satisfying a numeric or ordering condition",
              "O(1) auxiliary space is required"
            ],
            notFor: [
              "Original indices must be returned → use a hash map",
              "Elements can be non-contiguous → DP",
              "Constraint involves negative numbers in a sum-window → not this pattern"
            ]
          },
          tricks: [
            "Initialize `L = 0, R = n - 1` — start at the extremes, never the middle.",
            "Loop condition must be `while (L < R)` for pair problems — `L <= R` compares an element with itself.",
            "Movement rule: `sum < target → L++`, `sum > target → R--`. Sortedness guarantees this never skips a valid pair.",
            "Return immediately when `sum == target` — no need to explore further.",
            "In 3Sum, after finding a triplet, skip duplicates: `while (L < R && arr[L] == arr[L+1]) L++;` and symmetrically for R."
          ],
          optimization: {
            bottleneck: "Brute force pair enumeration is O(n²) — too slow for n > 10^4.",
            path: "Sort (O(n log n)) + two pointers (O(n)) = O(n log n) total.",
            why: "Sorting creates monotonicity; the pointer movement exploits it to eliminate half the remaining candidates per step.",
            tradeoff: "Sorting is in-place (O(1) extra) but destroys original indices. A hash map keeps order at O(n) space."
          },
          traps: [
            {
              wrong: "Using `while (L <= R)` for a pair-sum problem",
              why: "At L == R you compare an element with itself and can produce a false positive.",
              right: "Use `while (L < R)`.",
              ex: "[3], target 6 → would incorrectly match."
            },
            {
              wrong: "Not skipping duplicates in 3Sum",
              why: "Produces duplicate triplets.",
              right: "Skip duplicates for the fixed index and both pointers after each match.",
              ex: "[-1,-1,-1,2] would emit the same triplet twice."
            },
            {
              wrong: "Forgetting to sort",
              why: "Pointer movement is only correct on sorted input.",
              right: "`Arrays.sort(nums)` first when indices are not required.",
              ex: "[4,1,3] target 5 — unsorted movement misses (1,4)."
            }
          ],
          edgeCases: [
            "n < 2 → no pair possible",
            "All elements equal",
            "Negative numbers (sorting still preserves monotonicity)",
            "Target outside [min+min, max+max] → pointers cross",
            "Sum overflow → use long"
          ],
          java: [
            "`long sum = (long) arr[L] + arr[R];` to prevent int overflow.",
            "Skip duplicates with `while (L < R && arr[L] == arr[L+1]) L++;`.",
            "`Arrays.copyOf` before sorting if the original order must survive."
          ],
          followUps: [
            { q: "Can you solve it without sorting?", a: "Yes — hash map, O(n) time / O(n) space. Sorting wins when O(1) space matters." },
            { q: "How do you avoid duplicate triplets?", a: "Skip equal values at the fixed index and at both pointers after each match." },
            { q: "What if the input is a stream?", a: "Two pointers need random access — use a hash set for pair queries instead." }
          ],
          recall: [
            "Sorted? If not, can I sort?",
            "L = 0, R = n − 1",
            "while (L < R)",
            "sum < target → L++; sum > target → R−−",
            "Skip duplicates",
            "Use long for sums"
          ]
        }
      },
      {
        title: "Same Direction",
        desc: "Slow writes, Fast reads. Used for in-place deduplication.",
        tips: {
          recognition: {
            keywords: ["remove duplicates in-place", "move zeroes", "remove element", "compact array", "stable partition"],
            signals: [
              "Modify the array in-place and return the new length",
              "Order of retained elements must be preserved",
              "O(1) extra space is required"
            ],
            notFor: [
              "Order does not matter and you can swap → use the swap-based variant",
              "You need to delete from a linked list without a predecessor pointer"
            ]
          },
          tricks: [
            "`slow` marks the next write position; `fast` scans. Invariant: `[0, slow)` is the processed output.",
            "Copy only when `nums[fast] != nums[slow - 1]` (or whatever the keep-condition is).",
            "Return `slow`, not `slow + 1` — `slow` already points one past the last valid element.",
            "For 'move zeroes', swap instead of overwrite: `swap(slow, fast)` preserves the non-zero values without a second pass.",
            "Fast always advances; slow advances only on a write — this is what makes it O(n)."
          ],
          optimization: {
            bottleneck: "`ArrayList.remove(i)` shifts O(n) elements → O(n²) total.",
            path: "Overwrite in place with a write pointer.",
            why: "Each element is read once and written at most once → O(n) time, O(1) space.",
            tradeoff: "Overwrite is faster; swap preserves trailing values (needed for 'move zeroes')."
          },
          traps: [
            {
              wrong: "Returning `slow + 1`",
              why: "Off-by-one — `slow` already equals the count of kept elements.",
              right: "`return slow;`",
              ex: "[1,1,2] → slow ends at 2; returning 3 includes a stale element."
            },
            {
              wrong: "Comparing `nums[fast]` with `nums[fast - 1]` when fast == 0",
              why: "ArrayIndexOutOfBounds.",
              right: "Start fast at 1, or guard with `slow == 0`.",
              ex: "Single-element array crashes on the first iteration."
            }
          ],
          edgeCases: ["Empty array", "Single element", "All duplicates", "No duplicates", "All zeroes"],
          java: [
            "Return `int` length; the judge reads only the first `length` elements.",
            "Use `System.arraycopy` only when the destination does not overlap the source.",
            "Avoid `ArrayList` for in-place requirements — it defeats the O(1) space goal."
          ],
          followUps: [
            { q: "Can you do it if duplicates must be removed entirely (not deduped)?", a: "Two passes: one to count, one to compact — still O(n)/O(1)." },
            { q: "What if the array is a stream?", a: "In-place is impossible; use a buffer or emit filtered elements downstream." }
          ],
          recall: [
            "slow = write position, fast = read position",
            "Fast always increments",
            "Slow increments only on write",
            "Return slow",
            "Guard fast = 0 access"
          ]
        }
      },
      {
        title: "Dutch Flag",
        desc: "3 pointers (low, mid, high) for sorting 0s, 1s, 2s in one pass.",
        tips: {
          recognition: {
            keywords: ["sort colors", "0s 1s 2s", "three categories", "in-place partition", "one pass"],
            signals: [
              "Exactly 3 distinct values (or 3 buckets)",
              "In-place, single pass, O(1) space",
              "QuickSort's 3-way partition"
            ],
            notFor: [
              "More than 3 distinct values → counting sort or general sort",
              "Values are not from a small fixed set"
            ]
          },
          tricks: [
            "Invariant: `[0, low)` = 0s, `[low, mid)` = 1s, `(high, n)` = 2s, `[mid, high]` = unknown.",
            "`arr[mid] == 0` → swap(low, mid), low++, mid++.",
            "`arr[mid] == 1` → mid++ only.",
            "`arr[mid] == 2` → swap(mid, high), high-- ONLY — do NOT increment mid, the swapped-in element is unexamined.",
            "Loop while `mid <= high`."
          ],
          optimization: {
            bottleneck: "Counting sort needs two passes; comparison sort is O(n log n).",
            path: "Single pass with three pointers.",
            why: "Each element is examined at most once and placed in its final region immediately.",
            tradeoff: "Only works for 3 buckets — generalizing to k buckets loses the O(n)/O(1) property."
          },
          traps: [
            {
              wrong: "Incrementing `mid` after swapping with `high`",
              why: "The element swapped in from `high` has not been examined and may be a 0 or 2.",
              right: "Only `high--`; leave `mid` in place.",
              ex: "[2,0,1] → swap(0,2) gives [1,0,2]; incrementing mid skips the 1."
            },
            {
              wrong: "Using `while (mid < high)`",
              why: "Misses the last element when mid == high.",
              right: "`while (mid <= high)`.",
              ex: "Single element array never enters the loop."
            }
          ],
          edgeCases: ["Empty array", "All same value", "Already sorted", "Reverse sorted", "Only two distinct values"],
          java: [
            "Use a small `swap(int[] a, int i, int j)` helper — inlining three swaps hurts readability.",
            "No extra array — that would defeat the O(1) space goal."
          ],
          followUps: [
            { q: "How would you generalize to k values?", a: "Counting sort: O(n + k) time, O(k) space. The 3-pointer trick does not scale." },
            { q: "Why is it called Dutch National Flag?", a: "Dijkstra's analogy — the array is partitioned into three contiguous bands like the flag." }
          ],
          recall: [
            "low = 0, mid = 0, high = n − 1",
            "while (mid <= high)",
            "0 → swap(low, mid), low++, mid++",
            "1 → mid++",
            "2 → swap(mid, high), high−− only"
          ]
        }
      },
      {
        title: "Safe Mid-Point",
        desc: "Formula: mid = L + (R - L) / 2 (prevents integer overflow).",
        tips: {
          recognition: {
            keywords: ["binary search", "mid", "overflow"],
            signals: ["Any binary search, merge sort split, or divide-and-conquer midpoint"],
            notFor: []
          },
          tricks: [
            "`mid = L + (R - L) / 2` is mathematically identical to `(L + R) / 2` but never overflows.",
            "`(L + R) >>> 1` also works in Java for non-negative L, R and is branch-free.",
            "For lower-bound style binary search, keep `R = n` (not `n - 1`) so the answer can be `n`.",
            "Ensure `L` and `R` move in every iteration — otherwise infinite loop."
          ],
          optimization: {
            bottleneck: "`(L + R) / 2` overflows when L and R are both near Integer.MAX_VALUE, producing a negative mid → AIOOBE or infinite loop.",
            path: "Use the overflow-safe form everywhere.",
            why: "`R - L` is always ≤ R and fits in int whenever R does.",
            tradeoff: "None — it is strictly safer at identical cost."
          },
          traps: [
            {
              wrong: "`int mid = (L + R) / 2;`",
              why: "Overflow when L + R > 2^31 − 1.",
              right: "`int mid = L + (R - L) / 2;`",
              ex: "L = 1_500_000_000, R = 1_700_000_000 → sum overflows to negative."
            },
            {
              wrong: "`L = mid` in a lower-bound loop",
              why: "Infinite loop when R = L + 1 and mid == L.",
              right: "`L = mid + 1` with `R = mid`.",
              ex: "L=2, R=3 → mid=2 → L stays 2 forever."
            }
          ],
          edgeCases: ["L == R", "R = L + 1", "n = 0", "L or R at Integer.MAX_VALUE"],
          java: [
            "`(L + R) >>> 1` works for non-negative bounds and avoids a division.",
            "`Arrays.binarySearch` returns `-(insertionPoint) - 1` when not found — read the contract carefully."
          ],
          followUps: [
            { q: "Why not use `(L + R) >>> 1` everywhere?", a: "It requires non-negative L and R; `L + (R-L)/2` is safe for negatives too." }
          ],
          recall: [
            "mid = L + (R − L) / 2",
            "Every iteration must move L or R",
            "R = n for lower bound",
            "L = mid + 1, R = mid − 1 for exact match"
          ]
        }
      }
    ]
  },

  {
    category: "Sliding Window",
    color: "card-purple",
    icon: "🪟",
    items: [
      {
        title: "Fixed Size Window",
        desc: "Add right, remove left. No while loop needed. Window Length = R - L + 1.",
        tips: {
          recognition: {
            keywords: ["size k", "window of length k", "every subarray of size k", "maximum average"],
            signals: ["Window size is given as a constant k", "Answer is over all contiguous subarrays of exactly length k"],
            notFor: ["Size is a condition ('at most k distinct') → variable window", "Non-contiguous elements allowed"]
          },
          tricks: [
            "Compute the first window's sum in a loop, then slide: `sum += nums[R] - nums[R - k]`.",
            "Start the loop at `R = k` — the first window is already built.",
            "No inner while loop is needed; one add and one remove per step.",
            "Window length is always `R - L + 1 == k`.",
            "Guard `if (n < k) return ...` before anything else."
          ],
          optimization: {
            bottleneck: "Recomputing each window from scratch is O(n·k).",
            path: "Incremental add/remove → O(n).",
            why: "Consecutive windows share k−1 elements; only one leaves and one enters.",
            tradeoff: "Only valid for exactly-k windows; for 'at most k' you need the variable form."
          },
          traps: [
            {
              wrong: "Forgetting to remove the outgoing element",
              why: "Sum keeps growing and the window is no longer size k.",
              right: "`sum += nums[R] - nums[R - k]`.",
              ex: "[1,2,3,4], k=2 → without removal you compute [1,2], [2,3], [3,4] as growing sums."
            },
            {
              wrong: "Looping `R` from 0",
              why: "You add without removing during the first k steps.",
              right: "Build the first window, then loop from R = k.",
              ex: "Index underflow on `R - k` for R < k."
            }
          ],
          edgeCases: ["n < k", "k = 1", "k = n", "All negatives (still works — sum is not monotonic but that's fine)", "Zeros"],
          java: [
            "Use `long` for the window sum if values are large.",
            "For max average, return `(double) maxSum / k` — cast before dividing."
          ],
          followUps: [
            { q: "What if k is not fixed but 'at most k distinct'?", a: "Switch to the variable window: expand right, shrink while invalid." },
            { q: "Can you do it in O(1) space?", a: "Yes — only the running sum is stored, not the window itself." }
          ],
          recall: [
            "Build the first window",
            "Loop from R = k",
            "sum += nums[R] − nums[R−k]",
            "Window length is always k",
            "Guard n < k",
            "Use long for the sum"
          ]
        }
      },
      {
        title: "Variable (Longest)",
        desc: "Expand right, then while (INVALID) shrink left.",
        tips: {
          recognition: {
            keywords: ["longest substring", "longest subarray", "at most k", "without repeating", "maximum consecutive"],
            signals: [
              "Answer is a contiguous subarray/substring",
              "You want the MAXIMUM length satisfying a constraint",
              "Constraint is monotonic: extending an invalid window keeps it invalid"
            ],
            notFor: [
              "Non-contiguous → DP",
              "Negative numbers in a sum constraint → prefix sum + hash map",
              "'Exactly k' → AtMost(k) − AtMost(k−1)"
            ]
          },
          tricks: [
            "Shape: `for (right) { add(right); while (invalid) { remove(left); left++; } updateAnswer(); }`.",
            "Update the answer AFTER shrinking — recording while invalid overestimates.",
            "The while loop runs at most n times in total → O(n) overall, not O(n²).",
            "Track a violation counter (e.g., distinct count, or `count of chars with freq > k`) instead of re-checking the whole map.",
            "For 'at most k distinct', shrink while `map.size() > k`."
          ],
          optimization: {
            bottleneck: "Checking every subarray is O(n²) or O(n³).",
            path: "Two pointers with incremental add/remove → O(n).",
            why: "Monotonic validity: if [L, R] is invalid, [L, R+1] is also invalid, so shrinking is both necessary and sufficient.",
            tradeoff: "Frequency map costs O(k) space; for a fixed alphabet it is O(1)."
          },
          traps: [
            {
              wrong: "Using `if` instead of `while` to shrink",
              why: "One removal may not restore validity.",
              right: "`while (invalid) { remove(left++); }`.",
              ex: "'abcabcbb' with at most 1 distinct — one removal leaves duplicates."
            },
            {
              wrong: "Updating the answer before shrinking",
              why: "Records the length of an invalid window.",
              right: "Shrink first, then `max = Math.max(max, right - left + 1)`.",
              ex: "Overestimates by 1 or more whenever a shrink was needed."
            },
            {
              wrong: "Applying sliding window to negative numbers in a sum constraint",
              why: "Adding a negative can reduce the sum, breaking monotonicity.",
              right: "Prefix sum + hash map.",
              ex: "[1, -1, 1], target 1 — window logic misses [1, -1, 1]."
            }
          ],
          edgeCases: ["Empty input → 0", "k = 0", "All identical characters", "k ≥ n", "Unicode → use HashMap, not int[26]"],
          java: [
            "`int[26]` for lowercase; `HashMap<Character,Integer>` for general Unicode.",
            "`map.merge(c, 1, Integer::sum)` and `map.remove(c)` when the count hits 0 keeps `size()` meaningful.",
            "Use `Math.max` on `right - left + 1`, never on stored window contents."
          ],
          followUps: [
            { q: "How do you handle 'exactly k'?", a: "Compute AtMost(k) − AtMost(k−1); both are O(n) longest-type windows." },
            { q: "Can you avoid the frequency map?", a: "Only for fixed small alphabets — replace with an int array indexed by character." },
            { q: "Why is this O(n) despite the nested loop?", a: "Left only moves forward; total removals ≤ total additions = n." }
          ],
          recall: [
            "Expand right by one",
            "While invalid, shrink left",
            "Update answer after shrinking",
            "Track a violation counter, not a full re-check",
            "Nested loop is still O(n)",
            "Negatives break this pattern"
          ]
        }
      },
      {
        title: "Variable (Shortest)",
        desc: "Expand right, then while (VALID) shrink left.",
        tips: {
          recognition: {
            keywords: ["minimum window", "smallest subarray", "shortest substring", "at least k", "covers all"],
            signals: ["You want the MINIMUM length satisfying a constraint", "Constraint is 'at least' or 'covers all of'"],
            notFor: ["You want the maximum → use the longest form", "Constraint is not monotonic under shrinking"]
          },
          tricks: [
            "Shape: `for (right) { add(right); while (valid) { updateAnswer(); remove(left); left++; } }`.",
            "Update the answer INSIDE the while loop, before removing — that is when the window is at its smallest valid size.",
            "Use `Integer.MAX_VALUE` as the initial answer and check for it at the end.",
            "For 'minimum window substring', track `required` vs `formed` counts instead of comparing whole maps each step."
          ],
          optimization: {
            bottleneck: "Enumerating all windows is O(n²).",
            path: "Expand until valid, then shrink while still valid → O(n).",
            why: "Every element enters and leaves the window once.",
            tradeoff: "Slightly trickier than the longest form because the answer update lives inside the shrink loop."
          },
          traps: [
            {
              wrong: "Updating the answer after the while loop",
              why: "By then the window has already been shrunk past the minimum.",
              right: "Update at the top of the while body.",
              ex: "'ADOBECODEBANC' — recording after the loop misses 'BANC'."
            },
            {
              wrong: "Initializing `min = 0`",
              why: "0 is never a valid minimum and hides the 'not found' case.",
              right: "`int min = Integer.MAX_VALUE;` then check at the end.",
              ex: "Returns 0 instead of -1 when no window exists."
            }
          ],
          edgeCases: ["No valid window exists", "Pattern longer than text", "Empty pattern", "Duplicates in pattern", "Single-character pattern"],
          java: [
            "`Integer.MAX_VALUE` for the sentinel; return −1 or \"\" if unchanged.",
            "`substring(left, right + 1)` — the end index is exclusive.",
            "Use `int[] need = new int[128]` with a `required` counter for ASCII."
          ],
          followUps: [
            { q: "Can you do it without a frequency map?", a: "For ASCII, an int[128] array plus a match counter replaces the map." },
            { q: "What if multiple minimum windows exist?", a: "Return any — the standard problem guarantees uniqueness or accepts any." }
          ],
          recall: [
            "Expand right",
            "While valid: record, then shrink",
            "Record inside the while",
            "min = Integer.MAX_VALUE sentinel",
            "Check for 'not found' at the end"
          ]
        }
      },
      {
        title: "Negative Numbers?",
        desc: "Sliding window FAILS with negative numbers. Use Prefix Sum + Hash Map instead.",
        tips: {
          recognition: {
            keywords: ["subarray sum equals k", "subarray sum divisible by k", "contiguous sum"],
            signals: ["Array contains negative numbers AND the constraint is on the sum", "You need a count of subarrays, not just one"],
            notFor: ["All values are non-negative → sliding window is valid and cheaper", "You need the maximum length with a sum constraint and values are positive"]
          },
          tricks: [
            "Use `prefix[j] - prefix[i] == k` ⇔ `prefix[i] == prefix[j] - k`.",
            "Seed the map with `{0: 1}` so subarrays starting at index 0 are counted.",
            "Store frequencies, not just presence — multiple prefixes can have the same value.",
            "One pass: `count += map.getOrDefault(prefix - k, 0); map.merge(prefix, 1, Integer::sum);`"
          ],
          optimization: {
            bottleneck: "Checking every subarray is O(n²); sliding window is O(n) but invalid with negatives.",
            path: "Prefix sum + hash map → O(n) time, O(n) space.",
            why: "The map replaces the inner loop by answering 'how many earlier prefixes equal prefix − k?' in O(1).",
            tradeoff: "O(n) space is unavoidable here; sliding window's O(1) space is impossible with negatives."
          },
          traps: [
            {
              wrong: "Forgetting `map.put(0, 1)`",
              why: "Subarrays starting at index 0 are never counted.",
              right: "Seed the map with `{0: 1}`.",
              ex: "[3], k=3 → returns 0 instead of 1."
            },
            {
              wrong: "Forcing a sliding window because it 'feels' O(1) space",
              why: "With negatives the window is not monotonic; the two pointers never converge correctly.",
              right: "Prefix sum + hash map.",
              ex: "[1, -1, 1], k=1 → window logic misses [1, -1, 1]."
            }
          ],
          edgeCases: ["Empty array", "k = 0 with zero-sum subarrays", "All negatives", "Prefix sum overflow → long", "Duplicate prefix values"],
          java: [
            "`long prefix` if sums can exceed int range.",
            "`HashMap<Long, Integer>` — the key type must match the prefix type.",
            "`getOrDefault(key, 0)` avoids the containsKey branch."
          ],
          followUps: [
            { q: "What if all numbers are positive?", a: "Sliding window gives O(n) time and O(1) space — strictly better." },
            { q: "How do you handle k = 0?", a: "Same code — the map naturally counts zero-sum subarrays." }
          ],
          recall: [
            "Negatives kill sliding window",
            "prefix[j] − prefix[i] == k",
            "Seed {0: 1}",
            "Store frequencies",
            "Use long for the prefix"
          ]
        }
      }
    ]
  },

  {
    category: "Binary Search",
    color: "card-green",
    icon: "🔍",
    items: [
      {
        title: "Exact Match",
        desc: "while (L <= R), L = mid + 1, R = mid - 1.",
        tips: {
          recognition: {
            keywords: ["find target", "search in sorted array", "return index", "rotated sorted array"],
            signals: ["Sorted input", "Exact target lookup", "O(log n) is required"],
            notFor: ["You need the first/last occurrence → lower/upper bound", "The predicate is monotonic over a value range → binary search on answer"]
          },
          tricks: [
            "`L = 0, R = n - 1`, `while (L <= R)` — the inclusive form.",
            "Three branches: `== target → return mid`, `< target → L = mid + 1`, `> target → R = mid - 1`.",
            "Mid uses `L + (R - L) / 2` to avoid overflow.",
            "For rotated arrays, determine which half is sorted before deciding which side to search.",
            "Always return `-1` (or the problem's not-found sentinel) after the loop."
          ],
          optimization: {
            bottleneck: "Linear scan is O(n).",
            path: "Halve the search space each step → O(log n).",
            why: "Sortedness lets you prove the target cannot be in the discarded half.",
            tradeoff: "Logarithmic search needs random access — linked lists are a poor fit."
          },
          traps: [
            {
              wrong: "`while (L < R)` with `R = n - 1`",
              why: "The last element is never checked.",
              right: "Use `<=` for inclusive bounds, or restructure to the half-open form consistently.",
              ex: "[1,3,5], target 5 → returns −1."
            },
            {
              wrong: "Mixing inclusive and half-open bounds",
              why: "Off-by-one or infinite loop.",
              right: "Pick one convention and apply it everywhere.",
              ex: "`R = mid` with `while (L <= R)` loops forever when L == R."
            }
          ],
          edgeCases: ["Empty array", "Single element", "Target below min", "Target above max", "Duplicates (returns any index)", "Rotated array"],
          java: [
            "`Arrays.binarySearch` returns `-(insertionPoint) - 1` on miss.",
            "`mid = L + (R - L) / 2` inside the loop.",
            "Return the index only after confirming `arr[mid] == target` — otherwise the branch logic picks the side."
          ],
          followUps: [
            { q: "How do you find the first and last occurrence?", a: "Two lower-bound style searches: first ≥ target and first > target." },
            { q: "What about a rotated sorted array?", a: "Check which half is sorted (arr[L] ≤ arr[mid]); the target must lie in that sorted half if it is in range." }
          ],
          recall: [
            "L = 0, R = n − 1",
            "while (L <= R)",
            "mid = L + (R − L) / 2",
            "Move the correct side",
            "Return −1 after the loop"
          ]
        }
      },
      {
        title: "Lower Bound",
        desc: "while (L < R), R = mid, L = mid + 1. Right starts at N (not N-1).",
        tips: {
          recognition: {
            keywords: ["first occurrence", "insert position", "ceil", "first element ≥ target", "leftmost"],
            signals: ["You need the FIRST index satisfying a monotonic predicate", "The answer may be n (insert at the end)"],
            notFor: ["You need the last occurrence → upper bound", "Exact match with a return on equality"]
          },
          tricks: [
            "`L = 0, R = n`, `while (L < R)`, `mid = L + (R - L) / 2`.",
            "`arr[mid] < target → L = mid + 1`, else `R = mid` — the answer converges to the first index with `arr[i] >= target`.",
            "`R = n` (not `n - 1`) is essential — it allows returning `n` for insert-at-end.",
            "Never return on equality; let the loop converge.",
            "Upper bound is the same loop with `arr[mid] <= target → L = mid + 1`."
          ],
          optimization: {
            bottleneck: "Linear scan for the first occurrence is O(n).",
            path: "Binary search with the 'keep R at mid' invariant → O(log n).",
            why: "The invariant `answer ∈ [L, R]` holds even when `arr[mid] == target` (the answer could be `mid` or earlier).",
            tradeoff: "Slightly slower constant than exact match because it always runs to convergence."
          },
          traps: [
            {
              wrong: "`R = n - 1`",
              why: "You can never return `n`, so insert-at-end is missed.",
              right: "`R = n`.",
              ex: "[1,3,5], target 6 → should return 3, returns 2."
            },
            {
              wrong: "`L = mid` instead of `L = mid + 1`",
              why: "Infinite loop when `R = L + 1`.",
              right: "`L = mid + 1`.",
              ex: "L=2, R=3, mid=2 → L never advances."
            },
            {
              wrong: "Returning `mid` on equality",
              why: "Returns any occurrence, not the first.",
              right: "Record and continue left, or keep the `R = mid` invariant.",
              ex: "[1,2,2,2,3], target 2 → may return index 2."
            }
          ],
          edgeCases: ["Empty array → 0", "Target smaller than all → 0", "Target larger than all → n", "All equal", "n = 1"],
          java: [
            "`Arrays.binarySearch` can be converted: `int idx = Arrays.binarySearch(a, t); return idx >= 0 ? idx : -idx - 1;` gives the lower bound.",
            "Keep all indices as `int` — n ≤ 10^9 still fits.",
            "Be consistent: if `R = n`, the array access `arr[mid]` is always in range because `mid < R ≤ n` and `mid < n`."
          ],
          followUps: [
            { q: "How do you get the upper bound?", a: "Change the condition to `arr[mid] <= target → L = mid + 1`." },
            { q: "How do you count occurrences?", a: "`upperBound(target) - lowerBound(target)`." }
          ],
          recall: [
            "L = 0, R = n",
            "while (L < R)",
            "mid = L + (R − L) / 2",
            "arr[mid] < target → L = mid + 1",
            "else R = mid",
            "Return L"
          ]
        }
      },
      {
        title: "Binary Search on Answer",
        desc: "If isValid(x) is monotonic (if X works, X+1 works), binary search the answer space (e.g., Koko Eating Bananas).",
        tips: {
          recognition: {
            keywords: ["minimum capacity", "minimum speed", "maximum minimum", "smallest maximum", "minimize the maximum", "maximize the minimum"],
            signals: [
              "You can write a boolean `isValid(x)` that is monotonic over a numeric range",
              "The answer is a number, not an index",
              "The feasible range can be bounded and the predicate is monotonic"
            ],
            notFor: [
              "The predicate is not monotonic (flips more than once)",
              "The answer space is not bounded",
              "A greedy/DP solution exists that is simpler"
            ]
          },
          tricks: [
            "Step 1: identify the answer range — `[low, high]`. Step 2: write `isValid(x)`. Step 3: binary search for the boundary.",
            "Minimize-the-answer: `if (isValid(mid)) high = mid; else low = mid + 1;`.",
            "Maximize-the-answer: `if (isValid(mid)) low = mid + 1; else high = mid - 1;` (track the best explicitly).",
            "The predicate must be monotone: 'if x works, x+1 also works' (or the reverse). Prove this before coding.",
            "Set `high` from a bound you can justify — max element, sum of elements, or a known upper limit."
          ],
          optimization: {
            bottleneck: "Trying every candidate answer is O(range × n).",
            path: "Binary search the range with an O(n) predicate → O(n log(range)).",
            why: "Monotonicity guarantees the feasible set is a single suffix (or prefix) of the range, so the boundary is findable in log steps.",
            tradeoff: "The predicate's O(n) cost dominates; keep it as simple as possible."
          },
          traps: [
            {
              wrong: "Binary searching without proving monotonicity",
              why: "If the predicate flips twice, binary search converges to an arbitrary point.",
              right: "Prove 'if x works then x+1 works' (or the reverse) before coding.",
              ex: "A non-monotonic feasibility check on a ring-shaped cost function."
            },
            {
              wrong: "Using `high = n` when the answer can exceed n",
              why: "Binary search never explores the true answer.",
              right: "Set high to the maximum possible answer (e.g., sum for 'capacity').",
              ex: "Koko with piles [10^9] → high must be 10^9, not n."
            },
            {
              wrong: "Off-by-one in the boundary update",
              why: "Infinite loop or a wrong minimum.",
              right: "Use `high = mid` / `low = mid + 1` consistently for the 'first true' search.",
              ex: "`low = mid` with `high = mid - 1` loops forever."
            }
          ],
          edgeCases: [
            "Answer equals low",
            "Answer equals high",
            "Single element",
            "Predicate always true / always false",
            "Overflow in the predicate sum → use long"
          ],
          java: [
            "`long` for sums inside `isValid` (e.g., total hours in Koko).",
            "Cast explicitly: `(int) Math.ceil((double) p / speed)` — integer ceiling `(p + speed - 1) / speed` is faster and avoids floating point.",
            "Keep `isValid` as a private method — it makes the binary search body readable."
          ],
          followUps: [
            { q: "How do you find the range for the answer?", a: "Low = min possible (1 or max element), high = a provable upper bound (sum, max value, or n × max)." },
            { q: "What if the predicate is expensive?", a: "Binary search still wins if the predicate is cheaper than enumerating candidates; consider early termination inside `isValid`." },
            { q: "Can you return the actual solution, not just the value?", a: "Run the predicate once more at the final answer to reconstruct the schedule." }
          ],
          recall: [
            "Define the answer range",
            "Write a monotonic isValid(x)",
            "Prove monotonicity",
            "Boundary: high = mid for minimum",
            "Use long inside isValid",
            "Return low after the loop"
          ]
        }
      }
    ]
  },

  {
    category: "Hashing & Prefix Sum",
    color: "card-teal",
    icon: "🧮",
    items: [
      {
        title: "1D Prefix Sum",
        desc: "sum(L..R) = prefix[R+1] - prefix[L].",
        tips: {
          recognition: {
            keywords: ["range sum query", "subarray sum", "many queries", "immutable array"],
            signals: ["Multiple range-sum queries on a static array", "You need O(1) per query after O(n) preprocessing"],
            notFor: ["Array is updated between queries → use a Fenwick tree or segment tree", "You need range min/max → sparse table or segment tree"]
          },
          tricks: [
            "`prefix[0] = 0`, `prefix[i + 1] = prefix[i] + arr[i]` — this 1-indexed form removes all edge-case branches.",
            "`sum(L..R) = prefix[R + 1] - prefix[L]`.",
            "Use `long[]` if sums can exceed int range.",
            "For 2D, `prefix[i+1][j+1] = a[i][j] + p[i][j+1] + p[i+1][j] - p[i][j]`."
          ],
          optimization: {
            bottleneck: "Summing each query is O(n) → O(n·q) total.",
            path: "Precompute prefixes once → O(n) preprocess, O(1) per query.",
            why: "`sum(L..R)` is a difference of two cumulative sums, each computable in O(1).",
            tradeoff: "O(n) extra space; invalid if the array is mutated."
          },
          traps: [
            {
              wrong: "Using `prefix[R] - prefix[L]` with 0-indexed prefix",
              why: "Off-by-one — the R-th element is excluded.",
              right: "`prefix[R + 1] - prefix[L]`.",
              ex: "sum(0..0) of [5] → prefix[0] − prefix[0] = 0 instead of 5."
            },
            {
              wrong: "int overflow on large arrays",
              why: "n × maxValue can exceed 2^31 − 1.",
              right: "`long[] prefix`.",
              ex: "n = 10^5, values = 10^5 → sum = 10^10."
            }
          ],
          edgeCases: ["Empty array", "Single element", "L == R", "Full range query", "Overflow", "Negative values"],
          java: [
            "`long[] prefix = new long[n + 1];` — the +1 removes all bounds branches.",
            "Return `int` only after confirming the range fits; otherwise return `long`.",
            "2D prefix sums: allocate `(n+1) × (m+1)` and use the inclusion-exclusion formula."
          ],
          followUps: [
            { q: "What if the array is updated?", a: "Use a Fenwick tree (point update + range sum, O(log n)) or a segment tree (range update)." },
            { q: "How do you extend to 2D?", a: "Inclusion-exclusion: `P[i][j] = a[i-1][j-1] + P[i-1][j] + P[i][j-1] - P[i-1][j-1]`." }
          ],
          recall: [
            "prefix[0] = 0",
            "prefix[i+1] = prefix[i] + arr[i]",
            "sum(L..R) = prefix[R+1] − prefix[L]",
            "long[] for large sums",
            "Static array only"
          ]
        }
      },
      {
        title: "Subarray Sum Equals K",
        desc: "Use a Hash Map to store prefix sums. Check if (currentSum - K) exists in the map.",
        tips: {
          recognition: {
            keywords: ["subarray sum equals k", "count subarrays", "contiguous sum", "divisible by k"],
            signals: ["Count or find contiguous subarrays with a sum property", "Values may be negative (so sliding window fails)"],
            notFor: ["All values positive → sliding window is O(1) space and simpler", "You need the actual subarray elements (not just count) → still works but needs index storage"]
          },
          tricks: [
            "Seed `map.put(0, 1)` so subarrays starting at index 0 are counted.",
            "`count += map.getOrDefault(prefix - k, 0)` before inserting the current prefix.",
            "Store frequencies, not booleans — multiple prefixes can share a value.",
            "For 'divisible by k', store `prefix % k` (normalize negatives with `((p % k) + k) % k`).",
            "For 'equal number of 0s and 1s', map 0 → −1 and 1 → +1, then look for prefix 0."
          ],
          optimization: {
            bottleneck: "Enumerating all subarrays is O(n²).",
            path: "Prefix sum + hash map → O(n) time, O(n) space.",
            why: "The inner loop 'find a previous prefix equal to current − k' becomes an O(1) map lookup.",
            tradeoff: "O(n) space; sliding window's O(1) is impossible with negatives."
          },
          traps: [
            {
              wrong: "Forgetting `map.put(0, 1)`",
              why: "Subarrays starting at index 0 are missed.",
              right: "Seed the map with `{0: 1}`.",
              ex: "[3], k=3 → returns 0 instead of 1."
            },
            {
              wrong: "Using a sliding window because the array 'looks sorted'",
              why: "Negatives break monotonicity.",
              right: "Prefix sum + hash map.",
              ex: "[1, -1, 1], k=1 → window logic misses [1, -1, 1]."
            },
            {
              wrong: "Negative modulo in Java",
              why: "`-5 % 3 == -2`, not `1`.",
              right: "`((p % k) + k) % k`.",
              ex: "Subarray sum divisible by 3 with negative prefixes."
            }
          ],
          edgeCases: ["Empty array", "k = 0", "All zeros", "Single element equal to k", "Overflow → long prefix"],
          java: [
            "`HashMap<Long, Integer>` if the sum can exceed int.",
            "`getOrDefault(key, 0)` — one lookup instead of two.",
            "For modulo problems, normalize immediately after computing the prefix."
          ],
          followUps: [
            { q: "Can you do it in O(1) space?", a: "Only if all values are non-negative — then sliding window works." },
            { q: "How do you find the actual subarray indices?", a: "Store the earliest index for each prefix sum; the answer is `[firstIndex + 1, currentIndex]`." }
          ],
          recall: [
            "Seed {0: 1}",
            "prefix − k lookup",
            "Add to count before inserting",
            "Store frequencies",
            "long prefix",
            "Normalize negative modulos"
          ]
        }
      },
      {
        title: "Kadane's Algorithm",
        desc: "Max Subarray: curr = max(num, curr + num).",
        tips: {
          recognition: {
            keywords: ["maximum subarray", "maximum sum", "contiguous", "best time to buy and sell stock"],
            signals: ["Maximum contiguous sum, with negatives allowed", "You must include at least one element"],
            notFor: ["Non-contiguous → DP or sorting", "You need the minimum sum → flip signs or use the min-variant"]
          },
          tricks: [
            "`curr = Math.max(num, curr + num)` — the decision is 'extend' vs 'restart'.",
            "Track `best` separately; the answer is not always the final `curr`.",
            "For the 'at least one element' requirement, initialize `curr = best = arr[0]` and loop from index 1.",
            "For circular arrays, the answer is `max(kadane(arr), total - minKadane(arr))`, with the all-negative case handled separately."
          ],
          optimization: {
            bottleneck: "Checking all subarrays is O(n²).",
            path: "Single pass, O(1) state → O(n), O(1) space.",
            why: "Any optimal subarray ending at i either extends the optimal ending at i−1 or restarts at i — no other choice is needed.",
            tradeoff: "Kadane's does not directly return indices; add tracking variables if needed."
          },
          traps: [
            {
              wrong: "Initializing `curr = 0` for all-negative arrays",
              why: "Returns 0, but the answer must be the largest negative.",
              right: "Initialize to `arr[0]`.",
              ex: "[-3,-2,-5] → returns 0 instead of −2."
            },
            {
              wrong: "Returning `curr` instead of `best`",
              why: "The maximum may have occurred earlier.",
              right: "Return the tracked maximum.",
              ex: "[1,2,-10,1] → curr ends at 1, best is 3."
            }
          ],
          edgeCases: ["All negatives", "Single element", "All positives", "Zeros", "Circular variant"],
          java: [
            "`int curr = nums[0], best = nums[0];` then loop from 1.",
            "`Math.max(num, curr + num)` reads better than an if-else.",
            "For circular: compute total, minKadane, and handle the all-negative case before `total - minKadane`."
          ],
          followUps: [
            { q: "How do you handle the circular version?", a: "`max(kadane, total − minKadane)`, but if all elements are negative return `kadane`." },
            { q: "Can you return the subarray indices?", a: "Track a `start` that resets when `curr` restarts, and update `[start, i]` whenever `best` improves." }
          ],
          recall: [
            "curr = max(num, curr + num)",
            "Track best separately",
            "Init to arr[0] for all-negative",
            "Return best, not curr",
            "Circular: total − minKadane"
          ]
        }
      }
    ]
  },

  {
    category: "Trees & BFS/DFS",
    color: "card-pink",
    icon: "🌳",
    items: [
      {
        title: "DFS (Recursive)",
        desc: "Pre-order (Root, L, R), In-order (L, Root, R - sorted for BST), Post-order (L, R, Root).",
        tips: {
          recognition: {
            keywords: ["path", "depth", "subtree", "ancestor", "validate BST", "diameter"],
            signals: ["Solution decomposes into left + right subtree results", "You need information flowing up the tree"],
            notFor: ["You need level-order or shortest path in an unweighted tree → BFS", "The tree is extremely deep (stack overflow risk)"]
          },
          tricks: [
            "Pre-order: process the root first — useful for serialization and copying.",
            "In-order on a BST yields sorted order — the key to 'kth smallest' and 'validate BST'.",
            "Post-order: children before parent — used for height, diameter, and subtree aggregation.",
            "Return values up the recursion; use an instance/array field for global answers (diameter, max path sum).",
            "Base case: `if (root == null) return ...` — decide the identity value (0, null, true)."
          ],
          optimization: {
            bottleneck: "Recomputing subtree heights at each node → O(n²) for balanced trees.",
            path: "Return height from the recursion and compute the answer during the return → O(n).",
            why: "Each node is visited exactly once; the post-order position lets you combine child results.",
            tradeoff: "Recursion uses O(h) stack space; iterative DFS with an explicit stack trades clarity for safety."
          },
          traps: [
            {
              wrong: "Recomputing `height(node.left)` and `height(node.right)` inside the diameter calculation",
              why: "O(n²) on skewed trees.",
              right: "Return height and update the diameter from the returned values.",
              ex: "A linked-list-shaped tree degenerates to O(n²)."
            },
            {
              wrong: "Validating a BST with only local parent-child comparisons",
              why: "A node deep in the right subtree can still violate the root's bound.",
              right: "Pass `(min, max)` bounds down the recursion.",
              ex: "Root 10, right child 15, right-right 6 — locally valid, globally invalid."
            }
          ],
          edgeCases: ["Empty tree (null root)", "Single node", "Skewed tree (stack depth n)", "Duplicate values", "Negative values"],
          java: [
            "Deep trees can cause `StackOverflowError` — consider an explicit `Deque<TreeNode>` for DFS.",
            "Use `long` for min/max bounds in BST validation to avoid issues with `Integer.MIN_VALUE`/`MAX_VALUE`.",
            "Avoid autoboxing `Integer` in hot recursion paths — use primitive arrays for accumulators."
          ],
          followUps: [
            { q: "How do you make DFS iterative?", a: "Push children onto an explicit `Deque`; for post-order, push in reverse and reverse the output." },
            { q: "Why does in-order traversal of a BST give sorted order?", a: "The BST invariant places all left descendants below the node and all right descendants above it." }
          ],
          recall: [
            "Base case first",
            "Choose pre/in/post by when you combine results",
            "Return values up, track globals separately",
            "BST validation needs bounds, not just parent comparisons",
            "Watch stack depth"
          ]
        }
      },
      {
        title: "BFS (Queue)",
        desc: "Level-order traversal. Always capture size = queue.size() before the loop.",
        tips: {
          recognition: {
            keywords: ["level order", "minimum depth", "shortest path", "nearest", "right side view", "connect levels"],
            signals: ["You need per-level processing", "Shortest path in an unweighted graph/tree", "The answer depends on depth"],
            notFor: ["You need path sums or subtree aggregates → DFS", "Weighted edges → Dijkstra"]
          },
          tricks: [
            "Capture `int size = queue.size()` BEFORE the inner loop — the queue grows during iteration.",
            "Process exactly `size` nodes per outer iteration; each outer iteration = one level.",
            "Add the left child before the right to preserve left-to-right ordering.",
            "For 'right side view', record the last node of each level.",
            "For 'minimum depth', return at the first leaf encountered — do not wait for the full traversal."
          ],
          optimization: {
            bottleneck: "Recursive DFS for level-order requires passing depth and merging lists.",
            path: "BFS visits nodes in level order naturally → O(n).",
            why: "A queue is FIFO, so all nodes at depth d are dequeued before any at depth d+1.",
            tradeoff: "O(w) queue space where w is the max width; for a complete tree this is O(n/2)."
          },
          traps: [
            {
              wrong: "Reading `queue.size()` inside the inner loop condition",
              why: "The size changes as children are enqueued, breaking level boundaries.",
              right: "Capture it once per level.",
              ex: "`while (i < queue.size())` processes a partial level."
            },
            {
              wrong: "Returning at the first node for minimum depth",
              why: "A leaf at a deeper level may be reached first.",
              right: "Return only when a node with no children is dequeued.",
              ex: "Root has a right leaf and a deep left chain."
            }
          ],
          edgeCases: ["Empty tree", "Single node", "Skewed tree", "Complete binary tree", "Disconnected graph (BFS from each component)"],
          java: [
            "`Queue<TreeNode> q = new LinkedList<>();` or `ArrayDeque<TreeNode>` — `ArrayDeque` is faster and disallows nulls.",
            "Never enqueue null children; guard with a null check before `offer`.",
            "For graphs, use a `boolean[] visited` and mark on ENQUEUE, not on dequeue, to prevent duplicates in the queue."
          ],
          followUps: [
            { q: "Why mark visited on enqueue, not dequeue?", a: "Dequeue-marking allows the same node to be enqueued multiple times, inflating memory." },
            { q: "How do you do a zigzag level order?", a: "Use a `Deque` and alternate `addFirst` / `addLast` per level." }
          ],
          recall: [
            "Capture size before the inner loop",
            "Outer loop = one level",
            "Left child before right",
            "Mark visited on enqueue",
            "ArrayDeque over LinkedList",
            "Return early for minimum depth"
          ]
        }
      }
    ]
  },

  {
    category: "Graphs",
    color: "card-orange",
    icon: "🕸️",
    items: [
      {
        title: "BFS / DFS",
        desc: "O(V + E). Traversal, Connectivity, Cycle detection.",
        tips: {
          recognition: {
            keywords: ["connected components", "islands", "reachability", "cycle", "bipartite", "flood fill"],
            signals: ["Traverse all reachable nodes", "The answer depends on connectivity, not edge weights"],
            notFor: ["Shortest path with weights → Dijkstra", "Dependencies → topological sort"]
          },
          tricks: [
            "Build the adjacency list with `List<List<Integer>>` or a compact `int[][]` for performance.",
            "Mark visited on enqueue (BFS) or on entry (DFS) — never both, never neither.",
            "Cycle in an undirected graph: DFS with a `parent` parameter; an edge to a visited non-parent node is a cycle.",
            "Cycle in a directed graph: three-color DFS (white/gray/black) — a gray neighbor means a back edge.",
            "Count components by looping all nodes and launching a traversal only on unvisited ones."
          ],
          optimization: {
            bottleneck: "Repeatedly scanning the edge list per node → O(V × E).",
            path: "Build an adjacency list once → O(V + E).",
            why: "Each edge is inspected exactly twice (once per endpoint) in the traversal.",
            tradeoff: "Adjacency matrix is O(V²) space but O(1) edge lookup; adjacency list is better for sparse graphs."
          },
          traps: [
            {
              wrong: "Marking visited only when popping from the queue",
              why: "The same node can be enqueued many times, causing exponential blow-up in dense graphs.",
              right: "Mark on enqueue.",
              ex: "A star graph enqueues the center once per leaf."
            },
            {
              wrong: "Using a `List` for visited lookups",
              why: "O(n) membership check makes the traversal O(V²).",
              right: "`boolean[]` or `HashSet`.",
              ex: "n = 10^5 → 10^10 operations."
            }
          ],
          edgeCases: ["Single node, no edges", "Disconnected graph", "Self-loop", "Parallel edges", "Empty graph", "1-indexed vs 0-indexed nodes"],
          java: [
            "`boolean[] visited = new boolean[V];` — the fastest visited structure.",
            "`ArrayDeque<Integer>` for BFS; `Deque<Integer>` explicit stack for iterative DFS.",
            "For 1-indexed input, allocate arrays of size `n + 1`.",
            "Recursion depth on a chain graph of 10^5 nodes will overflow the stack — use iterative DFS."
          ],
          followUps: [
            { q: "How do you detect a cycle in a directed graph?", a: "Three-color DFS or Kahn's algorithm (if processed count < V, a cycle exists)." },
            { q: "How do you check bipartiteness?", a: "BFS/DFS coloring with two colors; an edge between same-colored nodes means not bipartite." }
          ],
          recall: [
            "Build adjacency list",
            "Mark visited on enqueue/entry",
            "Parent parameter for undirected cycles",
            "Three colors for directed cycles",
            "Loop all nodes for components",
            "Use boolean[]"
          ]
        }
      },
      {
        title: "Topological Sort",
        desc: "O(V + E). DAGs, Course Schedule, Dependencies.",
        tips: {
          recognition: {
            keywords: ["course schedule", "prerequisites", "build order", "dependency", "directed acyclic graph"],
            signals: ["A directed graph with ordering constraints", "You need to detect whether a valid order exists"],
            notFor: ["Undirected graphs", "The graph has cycles and no valid order is possible (detect and report)"]
          },
          tricks: [
            "Kahn's algorithm: compute in-degrees, enqueue all zero in-degree nodes, decrement neighbors as you pop.",
            "If the output size < V, a cycle exists — this is the cleanest cycle detection for a directed graph.",
            "DFS-based: push a node to a stack in post-order, then reverse the stack.",
            "For lexicographically smallest order, use a `PriorityQueue` instead of a `Queue`.",
            "An edge u → v means u must come BEFORE v; in-degree counts prerequisites."
          ],
          optimization: {
            bottleneck: "Repeatedly scanning for zero in-degree nodes is O(V²).",
            path: "Maintain a queue of zero in-degree nodes → O(V + E).",
            why: "Each edge is decremented exactly once, and each node is enqueued once.",
            tradeoff: "Kahn's naturally detects cycles; DFS-based requires an explicit cycle check."
          },
          traps: [
            {
              wrong: "Reversing the edge direction",
              why: "The in-degree counts depend on direction; reversing gives the wrong order.",
              right: "For prerequisite `a → b` (a before b), in-degree[b]++.",
              ex: "Course 0 requires 1: the edge is 1 → 0."
            },
            {
              wrong: "Not checking `output.size() == V`",
              why: "Cyclic graphs silently return a partial order.",
              right: "Compare the size and report a cycle if short.",
              ex: "Two courses depending on each other → output size 0."
            }
          ],
          edgeCases: ["Empty graph", "Single node", "Disconnected DAG", "Self-loop", "Cycle", "Multiple valid orders"],
          java: [
            "`int[] inDegree = new int[V];`",
            "`Queue<Integer> q = new ArrayDeque<>();`",
            "`PriorityQueue<Integer>` for lexicographic ordering (O(log V) per pop).",
            "Store the result in an `int[]` plus an index counter — avoids `List` boxing."
          ],
          followUps: [
            { q: "How do you detect a cycle?", a: "Kahn's: output size < V. DFS: a back edge to a gray node." },
            { q: "How do you get the lexicographically smallest order?", a: "Replace the queue with a min-heap." }
          ],
          recall: [
            "In-degree array",
            "Queue of zero in-degree",
            "Decrement neighbors on pop",
            "Check size == V",
            "Edge direction: prerequisite → dependent",
            "PriorityQueue for lexicographic"
          ]
        }
      },
      {
        title: "Dijkstra",
        desc: "O((V + E) log V). Shortest path (Non-negative weights).",
        tips: {
          recognition: {
            keywords: ["shortest path", "minimum cost", "network delay", "cheapest flight", "non-negative weights"],
            signals: ["Weighted graph with non-negative edges", "Single-source shortest path"],
            notFor: ["Negative weights → Bellman-Ford", "Unweighted → BFS is O(V + E) and simpler", "All-pairs → Floyd-Warshall"]
          },
          tricks: [
            "`PriorityQueue<int[]>` ordered by distance — `[node, dist]`.",
            "Lazy deletion: when popping, `if (d > dist[node]) continue;` — skip stale entries.",
            "Mark a node visited when it is POPPED (not when pushed) if all weights are non-negative.",
            "Relaxation: `if (dist[u] + w < dist[v]) { dist[v] = dist[u] + w; pq.offer(...); }`.",
            "Initialize `dist[]` to `Integer.MAX_VALUE` and the source to 0."
          ],
          optimization: {
            bottleneck: "Array-scan Dijkstra is O(V²) — fine for dense graphs, slow for sparse.",
            path: "Min-heap → O((V + E) log V).",
            why: "The heap always pops the smallest tentative distance, which is provably final.",
            tradeoff: "Heap allows duplicates (lazy deletion); a decrease-key heap is faster in theory but harder to implement."
          },
          traps: [
            {
              wrong: "Using Dijkstra with negative weights",
              why: "A node finalized by the heap can later be improved by a negative edge.",
              right: "Bellman-Ford (or SPFA).",
              ex: "A → B (1), A → C (5), C → B (−10): Dijkstra finalizes B at 1, missing 5 − 10 = −5."
            },
            {
              wrong: "Not skipping stale heap entries",
              why: "Wasted work and potentially wrong finalization.",
              right: "`if (d > dist[u]) continue;`",
              ex: "A node pushed three times with decreasing distances."
            }
          ],
          edgeCases: ["Disconnected nodes (dist stays MAX)", "Single node", "Self-loop with positive weight (harmless)", "Zero-weight edges", "Overflow when adding to MAX_VALUE"],
          java: [
            "`PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);` — beware subtraction overflow; use `Integer.compare(a[1], b[1])`.",
            "`long[] dist` if path sums can exceed int.",
            "Guard relaxation: `if (dist[u] != Integer.MAX_VALUE && dist[u] + w < dist[v])`.",
            "For 1-indexed nodes, size arrays as `n + 1`."
          ],
          followUps: [
            { q: "Why does Dijkstra fail with negative weights?", a: "It assumes the first pop is final, which negative edges can invalidate." },
            { q: "How do you reconstruct the path?", a: "Store a `parent[]` array on each successful relaxation." },
            { q: "What about all-pairs shortest path?", a: "Floyd-Warshall O(V³) or run Dijkstra V times." }
          ],
          recall: [
            "Non-negative weights only",
            "PQ ordered by distance",
            "Lazy deletion check",
            "Relax on smaller distance",
            "long[] for large sums",
            "Integer.compare in comparator"
          ]
        }
      },
      {
        title: "Bellman-Ford",
        desc: "O(V * E). Shortest path (Negative weights, detects neg cycles).",
        tips: {
          recognition: {
            keywords: ["negative weights", "negative cycle", "shortest path with at most k edges", "arbitrage"],
            signals: ["Weighted graph with possibly negative edges", "You need to detect a negative cycle"],
            notFor: ["All weights non-negative → Dijkstra is faster", "You need all-pairs → Floyd-Warshall"]
          },
          tricks: [
            "Relax all edges V − 1 times — that's the longest possible simple path.",
            "One more relaxation pass: if any edge still improves, a negative cycle is reachable.",
            "For 'at most k edges', run exactly k passes over a COPY of the distance array to prevent using an edge multiple times in one round.",
            "Edge list representation is sufficient — no adjacency list needed.",
            "Early exit: if a full pass makes no update, stop."
          ],
          optimization: {
            bottleneck: "O(V × E) is slow for large graphs.",
            path: "Use SPFA (queue-based) for average-case speed, or Dijkstra when weights permit.",
            why: "V − 1 passes suffice because the shortest simple path uses at most V − 1 edges.",
            tradeoff: "O(V × E) time but O(V) space and handles negative cycles — no other algorithm does both."
          },
          traps: [
            {
              wrong: "Using the updated array within the same pass for the 'k edges' variant",
              why: "Chains multiple edges in one round, violating the edge-count limit.",
              right: "Copy `dist` before each pass and relax from the copy.",
              ex: "A → B → C with k = 1 would incorrectly reach C."
            },
            {
              wrong: "Running V passes instead of V − 1",
              why: "The V-th pass is only for cycle detection, not for distances.",
              right: "V − 1 passes, then one detection pass.",
              ex: "Extra passes are wasted work on acyclic graphs."
            }
          ],
          edgeCases: ["Unreachable nodes", "Single node", "Zero-weight cycles", "Negative cycle reachable from the source", "Multiple components"],
          java: [
            "Use a flat `int[][] edges = {{u, v, w}, ...}` instead of an adjacency list.",
            "`long[] dist` — repeated additions can overflow.",
            "Initialize to `Long.MAX_VALUE / 2` to avoid overflow when adding weights.",
            "Detect the cycle only for nodes reachable from the source — otherwise unrelated cycles are reported."
          ],
          followUps: [
            { q: "How do you detect a negative cycle?", a: "Run one extra pass; any successful relaxation implies a reachable negative cycle." },
            { q: "How do you limit to at most k edges?", a: "Run exactly k passes with a copied distance array per pass." }
          ],
          recall: [
            "V − 1 relaxation passes",
            "One extra pass for cycle detection",
            "Copy dist for the k-edge variant",
            "long[] with MAX/2 init",
            "Edge-list representation is enough"
          ]
        }
      },
      {
        title: "Union Find (DSU)",
        desc: "O(α(N)) ≈ O(1). Dynamic connectivity, Kruskal's MST.",
        tips: {
          recognition: {
            keywords: ["connected components", "union", "find", "cycle in undirected graph", "redundant connection", "number of islands II"],
            signals: ["Dynamic connectivity (edges added over time)", "Grouping/merging sets", "Kruskal's MST"],
            notFor: ["Directed graphs", "You need the actual path, not just connectivity", "Shortest path queries"]
          },
          tricks: [
            "Two arrays: `parent[]` and `rank[]` (or `size[]`).",
            "Path compression in `find`: `parent[x] = find(parent[x])` on the way up.",
            "Union by rank: attach the smaller tree under the larger root.",
            "Two nodes are connected iff `find(a) == find(b)`.",
            "For 'redundant connection' (a cycle in an undirected graph), union until an edge joins two already-connected nodes.",
            "To count components: start at n and decrement on every successful union."
          ],
          optimization: {
            bottleneck: "Naive union/find is O(n) worst case per operation (a long chain).",
            path: "Path compression + union by rank → amortized O(α(n)) ≈ O(1).",
            why: "Path compression flattens the tree; union by rank keeps it shallow — together the height is bounded.",
            tradeoff: "Path compression alone gives O(log n) amortized; the combination gives near-constant."
          },
          traps: [
            {
              wrong: "Forgetting path compression",
              why: "Degenerates into a linked list, O(n) per find.",
              right: "`parent[x] = find(parent[x])`.",
              ex: "Union 1→2→3→…→n and then call find(1)."
            },
            {
              wrong: "Unioning without rank/size",
              why: "Always attaching to the second root can create a chain.",
              right: "Attach the smaller rank under the larger.",
              ex: "Sequential unions form a linked list of depth n."
            },
            {
              wrong: "Comparing `parent[a] == parent[b]`",
              why: "Two nodes can have the same parent without being in the same set after compression.",
              right: "`find(a) == find(b)`.",
              ex: "A node whose parent is stale after a partial compression."
            }
          ],
          edgeCases: ["Single node", "No edges", "Self-loop", "Duplicate edges", "Disconnected components", "n = 0"],
          java: [
            "`int[] parent = new int[n];` initialized with `parent[i] = i`.",
            "`int[] rank = new int[n];` or `int[] size = new int[n];` filled with 1.",
            "Recursive `find` risks stack overflow on adversarial chains — an iterative loop with path compression is safer.",
            "For a 2D grid, encode `(r, c)` as `r * cols + c` to keep the DSU 1D."
          ],
          followUps: [
            { q: "How do you use DSU in Kruskal's MST?", a: "Sort edges by weight; add an edge only if it connects two different components." },
            { q: "How do you count connected components?", a: "Initialize `count = n` and decrement on each successful union." },
            { q: "Can DSU handle deletions?", a: "Not directly — use offline processing in reverse (add edges back)." }
          ],
          recall: [
            "parent[i] = i, rank/size = 1",
            "find with path compression",
            "union by rank",
            "find(a) == find(b) for connectivity",
            "Count components by decrementing",
            "Iterative find for safety"
          ]
        }
      }
    ]
  },

  {
    category: "Dynamic Programming",
    color: "card-red",
    icon: "🧩",
    items: [
      {
        title: "1D DP",
        desc: "dp[i] = dp[i-1] + dp[i-2] (Fibonacci/Stairs).",
        tips: {
          recognition: {
            keywords: ["number of ways", "climb stairs", "house robber", "decode ways", "minimum steps"],
            signals: ["The answer at i depends on a constant number of previous states", "Overlapping subproblems on a single index"],
            notFor: ["State depends on two indices → 2D DP", "The state space is a graph/tree → tree DP"]
          },
          tricks: [
            "Define `dp[i]` as the answer for the first i elements — write the recurrence in words before coding.",
            "Base cases: `dp[0]` and `dp[1]` — get them right and the loop is mechanical.",
            "Two-variable rolling: `prev2, prev1` replaces the whole array when only i−1 and i−2 are needed.",
            "For 'house robber', `dp[i] = max(dp[i-1], dp[i-2] + nums[i-1])` — skip or take.",
            "For 'decode ways', handle leading zeros and two-digit bounds (10–26) explicitly."
          ],
          optimization: {
            bottleneck: "Naive recursion recomputes the same subproblems exponentially.",
            path: "Memoization → tabulation → rolling variables.",
            why: "Each state is computed once instead of once per path to it.",
            tradeoff: "Rolling variables reduce O(n) space to O(1) but lose the ability to reconstruct the path."
          },
          traps: [
            {
              wrong: "`dp[i] = dp[i-1] + dp[i-2]` without checking validity",
              why: "Some states are unreachable (e.g., a stair of 0 or a leading zero in decode ways).",
              right: "Guard each transition with its validity condition.",
              ex: "'10' can be decoded as 'J' or '10' — but '06' cannot be decoded at all."
            },
            {
              wrong: "Off-by-one between `nums[i]` and `dp[i]`",
              why: "The DP index often refers to the first i elements, not element i.",
              right: "Decide once: `dp[i]` = first i elements, so `nums[i-1]` is the i-th element.",
              ex: "House robber uses `nums[i-1]` in a 1-indexed dp."
            }
          ],
          edgeCases: ["n = 0", "n = 1", "All zeros", "Negative values", "Modulo arithmetic (1e9+7)"],
          java: [
            "`int[] dp = new int[n + 1];` — the +1 avoids bounds branching.",
            "Use `long` when counts can exceed int; apply modulo at each step.",
            "Rolling variables: `int prev2 = 0, prev1 = 1;` then update in order — do not clobber."
          ],
          followUps: [
            { q: "Can you reduce the space to O(1)?", a: "Yes, if only the last one or two states are needed." },
            { q: "How do you reconstruct the solution?", a: "Keep the full array and walk backwards from the final state." }
          ],
          recall: [
            "Define dp[i] in words",
            "Base cases dp[0], dp[1]",
            "Recurrence",
            "Guard invalid transitions",
            "Rolling variables when possible",
            "long + modulo"
          ]
        }
      },
      {
        title: "0/1 Knapsack",
        desc: "dp[i][w] = max(val[i] + dp[i-1][w-wt[i]], dp[i-1][w]).",
        tips: {
          recognition: {
            keywords: ["each item once", "subset sum", "partition equal subset", "target sum", "pick or skip"],
            signals: ["A capacity/limit and a set of items", "Each item can be used at most once"],
            notFor: ["Items are reusable → unbounded knapsack", "Fractional items → greedy"]
          },
          tricks: [
            "`dp[i][w]` = best value using the first i items with capacity w.",
            "Two choices: skip item i → `dp[i-1][w]`; take it → `val[i] + dp[i-1][w - wt[i]]`.",
            "1D optimization: iterate capacity BACKWARD (`for w = W down to wt[i]`) so each item is used at most once.",
            "Initialize `dp[0] = 0` and use −∞ where the state is unreachable (for 'exactly w' problems).",
            "For subset sum, `dp[w]` is a boolean: `dp[w] = dp[w] || dp[w - num]`."
          ],
          optimization: {
            bottleneck: "Enumerating all subsets is O(2^n).",
            path: "DP over items × capacity → O(n × W).",
            why: "Many subsets share the same (item index, remaining capacity) state; DP computes each once.",
            tradeoff: "O(n × W) time is pseudo-polynomial — fine when W is small, bad when W is large."
          },
          traps: [
            {
              wrong: "Iterating capacity FORWARD in the 1D version",
              why: "An item gets reused within the same pass — that's unbounded knapsack.",
              right: "Iterate BACKWARD for 0/1.",
              ex: "weights [2], W=4 → forward gives value 2×val, backward gives val."
            },
            {
              wrong: "Mixing 'at most W' and 'exactly W' initialization",
              why: "'Exactly W' requires −∞ for unreachable states; 'at most' uses 0.",
              right: "Choose the initialization to match the question.",
              ex: "Subset sum with 'exactly target' returns true for an impossible target if 0-initialized."
            }
          ],
          edgeCases: ["Empty items", "W = 0", "Item heavier than W", "All items fit", "Zero weights", "Negative values (not allowed in the standard form)"],
          java: [
            "`int[] dp = new int[W + 1];` for the 1D version.",
            "`Arrays.fill(dp, Integer.MIN_VALUE); dp[0] = 0;` for 'exactly W'.",
            "`boolean[]` for subset sum — smaller and faster than int.",
            "Guard `w >= wt[i]` before accessing `dp[w - wt[i]]`."
          ],
          followUps: [
            { q: "How do you reconstruct the chosen items?", a: "Keep the 2D table and walk backwards: if `dp[i][w] != dp[i-1][w]`, item i was taken." },
            { q: "What if W is huge but n is small?", a: "Meet-in-the-middle or DP over value instead of capacity." }
          ],
          recall: [
            "Skip vs take",
            "Backward capacity loop for 1D",
            "−∞ for 'exactly W'",
            "Guard w ≥ wt[i]",
            "Pseudo-polynomial in W",
            "2D table to reconstruct"
          ]
        }
      },
      {
        title: "Unbounded Knapsack",
        desc: "Coin Change. Iterate capacity FORWARD to allow item reuse.",
        tips: {
          recognition: {
            keywords: ["coin change", "unlimited coins", "minimum coins", "number of ways to make amount", "rod cutting"],
            signals: ["Items can be reused any number of times", "Capacity/amount with unlimited supply"],
            notFor: ["Each item once → 0/1 knapsack", "Fractional → greedy"]
          },
          tricks: [
            "1D version: iterate capacity FORWARD — `for (int w = wt[i]; w <= W; w++)`.",
            "Min coins: `dp[w] = min(dp[w], dp[w - coin] + 1)` with `dp[0] = 0` and the rest = ∞.",
            "Count ways: `dp[w] += dp[w - coin]` with `dp[0] = 1`.",
            "Coin order matters: to count combinations, loop coins outer and amounts inner; to count permutations, swap the loops.",
            "For 'minimum coins', return −1 if `dp[W]` is still ∞."
          ],
          optimization: {
            bottleneck: "Recursive enumeration of coin combinations is exponential.",
            path: "DP over amount → O(n × W).",
            why: "The forward iteration lets the current coin contribute again immediately — exactly the unbounded semantics.",
            tradeoff: "Combination vs permutation counts differ only in loop order — easy to get wrong."
          },
          traps: [
            {
              wrong: "Iterating capacity backward",
              why: "Each coin is used at most once — that solves 0/1, not unbounded.",
              right: "Forward iteration.",
              ex: "coins [1,2], amount 3 → backward misses the 1+1+1 combination."
            },
            {
              wrong: "Loop order for counting combinations vs permutations",
              why: "Coins-outer counts {1,2} and {2,1} as the same; amount-outer counts them separately.",
              right: "Coins-outer for combinations, amount-outer for permutations.",
              ex: "Amount 3 with coins [1,2]: combinations = 2 (1+1+1, 1+2), permutations = 3."
            },
            {
              wrong: "Initializing min-coins dp to 0",
              why: "Every amount looks achievable with 0 coins.",
              right: "`Arrays.fill(dp, amount + 1); dp[0] = 0;`",
              ex: "Amount 5 with coin [2] → returns 0 instead of −1."
            }
          ],
          edgeCases: ["Amount 0 → 0 coins / 1 way", "No coin fits", "Coin value 1 always exists", "Amount unreachable → −1", "Overflow in way-counting → modulo"],
          java: [
            "`int[] dp = new int[amount + 1];`",
            "`Arrays.fill(dp, amount + 1)` as the infinity sentinel (safe — the answer is ≤ amount).",
            "For counting, use `long` and modulo if required.",
            "`dp[w - coin]` is guarded by the loop start `w = coin`."
          ],
          followUps: [
            { q: "Why does forward iteration allow reuse?", a: "`dp[w - coin]` has already been updated with the current coin in this same pass." },
            { q: "How do you count the actual combinations?", a: "Keep a 2D table or store parent pointers to reconstruct the chosen coins." }
          ],
          recall: [
            "Forward capacity loop",
            "Min coins: ∞ sentinel",
            "Count ways: dp[0] = 1",
            "Coins outer → combinations",
            "Amount outer → permutations",
            "Return −1 when unreachable"
          ]
        }
      },
      {
        title: "String DP (LCS)",
        desc: "If chars match: dp[i][j] = dp[i-1][j-1] + 1. Else: max(dp[i-1][j], dp[i][j-1]).",
        tips: {
          recognition: {
            keywords: ["longest common subsequence", "edit distance", "longest palindromic subsequence", "distinct subsequences", "wildcard matching"],
            signals: ["Two strings compared by prefix", "Subsequence (not substring) semantics", "The answer at (i, j) depends on (i−1, j−1), (i−1, j), (i, j−1)"],
            notFor: ["Contiguous substring → sliding window or a different DP", "Single string → 1D DP"]
          },
          tricks: [
            "Size the table `(m + 1) × (n + 1)` so the empty-prefix row/column is the base case.",
            "Match → `dp[i][j] = dp[i-1][j-1] + 1`; mismatch → `max(dp[i-1][j], dp[i][j-1])`.",
            "Edit distance: mismatch → `1 + min(insert, delete, replace)`.",
            "Longest palindromic subsequence = LCS(s, reverse(s)).",
            "Iterate `i` from 1 to m and `j` from 1 to n; index the strings at `i-1` and `j-1`."
          ],
          optimization: {
            bottleneck: "Brute force over all subsequences is O(2^n).",
            path: "DP over prefix pairs → O(m × n).",
            why: "LCS has optimal substructure: the answer for two prefixes is determined by the answer for smaller prefixes.",
            tradeoff: "O(m × n) space → two rows if only the length is needed; the full table is required to reconstruct the string."
          },
          traps: [
            {
              wrong: "Indexing `s.charAt(i)` inside a 1-based DP loop",
              why: "Off-by-one — dp[i][j] refers to the first i characters, so the character is at i−1.",
              right: "`s.charAt(i - 1)` and `t.charAt(j - 1)`.",
              ex: "`StringIndexOutOfBounds` at i = m."
            },
            {
              wrong: "Using the mismatch formula for a substring problem",
              why: "Substring requires contiguity; the LCS recurrence skips characters.",
              right: "Use `dp[i][j] = 0` on mismatch for longest common SUBSTRING.",
              ex: "'abcde' and 'abfde' — LCS is 3, longest common substring is 2."
            }
          ],
          edgeCases: ["Empty string (either or both)", "Identical strings", "No common characters", "Single-character strings", "Unicode characters"],
          java: [
            "`int[][] dp = new int[m + 1][n + 1];` — the +1 is the empty prefix.",
            "For two-row optimization, keep the `prev` row and update `curr`, then swap.",
            "Reconstruction: walk from `(m, n)` backwards, moving to `(i-1, j-1)` on a match.",
            "For huge strings, `char[] a = s.toCharArray()` is faster than repeated `charAt`."
          ],
          followUps: [
            { q: "How do you reconstruct the LCS string?", a: "Walk backwards from `(m, n)`: on a match prepend the character and move diagonally; otherwise move in the direction of the larger value." },
            { q: "Can you reduce the space?", a: "Two rows suffice for the length; reconstruction needs the full table or Hirschberg's algorithm." }
          ],
          recall: [
            "Table size (m+1) × (n+1)",
            "Match → diagonal + 1",
            "Mismatch → max(up, left)",
            "Index strings at i−1, j−1",
            "Substring vs subsequence differ",
            "Two-row optimization"
          ]
        }
      },
      {
        title: "Space Optimization",
        desc: "If dp[i] only depends on dp[i-1], replace 2D array with 1D array or two variables.",
        tips: {
          recognition: {
            keywords: ["optimize space", "rolling array", "two rows", "O(1) space"],
            signals: ["The recurrence at row i references only row i−1 (and possibly the current row's earlier cells)"],
            notFor: ["Reconstruction is required → keep the full table", "The recurrence references arbitrary earlier rows"]
          },
          tricks: [
            "Ask: which rows does `dp[i][*]` depend on? Replace the table with exactly those rows.",
            "Knapsack: backward iteration in 1D is the space-optimized 2D table — no separate copy needed.",
            "LCS / edit distance: keep `prev` and `curr`, and save the overwritten `prev[j-1]` in a temporary before writing `curr[j]`.",
            "Fibonacci-style: two variables (`prev2`, `prev1`) reduce O(n) to O(1).",
            "If the row length is much smaller than the number of rows, transpose the table so the rolling dimension is the smaller one."
          ],
          optimization: {
            bottleneck: "O(m × n) space can exceed memory limits for large inputs.",
            path: "Reduce to the minimum number of rows the recurrence needs.",
            why: "Once row i−2 is no longer referenced, it can be discarded.",
            tradeoff: "Space drops but reconstruction becomes impossible without an auxiliary structure."
          },
          traps: [
            {
              wrong: "Overwriting `dp[j]` before reading `dp[j-1]` in a knapsack 1D loop",
              why: "The needed previous-row value is already gone.",
              right: "Iterate backward for 0/1 knapsack so `dp[j - wt]` still holds the previous row's value.",
              ex: "Forward iteration silently becomes unbounded knapsack."
            },
            {
              wrong: "Using two arrays but forgetting to clear `curr` between rows",
              why: "Stale values from two rows ago leak into the result.",
              right: "Overwrite every cell of `curr` in each row, or reset it.",
              ex: "Edit distance returning values smaller than possible."
            }
          ],
          edgeCases: ["Single row/column", "Empty input", "Recurrence referencing the current row (e.g., unbounded knapsack)"],
          java: [
            "Reuse two arrays and swap references (`int[] tmp = prev; prev = curr; curr = tmp;`) instead of allocating per row.",
            "`Arrays.fill(curr, 0)` only if the recurrence does not overwrite every cell.",
            "Avoid `Integer` boxing in rolling arrays — primitives only."
          ],
          followUps: [
            { q: "Can you still reconstruct the solution?", a: "Only with Hirschberg's divide-and-conquer (O(n) space, O(mn) time) or by storing decisions separately." },
            { q: "When is the full table unavoidable?", a: "When you must output the actual subsequence/alignment, not just its length." }
          ],
          recall: [
            "Which rows does row i need?",
            "Keep only those rows",
            "Knapsack: backward loop = space optimization",
            "Save overwritten values in a temp",
            "Swap array references, don't reallocate",
            "Reconstruction needs the full table"
          ]
        }
      }
    ]
  },

  {
    category: "Bit Manipulation",
    color: "card-yellow",
    icon: "💻",
    items: [
      {
        title: "Odd/Even",
        desc: "(x & 1) == 1 (Odd).",
        tips: {
          recognition: {
            keywords: ["odd", "even", "parity", "last bit"],
            signals: ["You need parity or the least significant bit"],
            notFor: ["You need divisibility by a non-power-of-two → use modulo"]
          },
          tricks: [
            "`(x & 1) == 1` for odd; `(x & 1) == 0` for even.",
            "Works correctly for negative numbers in two's complement.",
            "`x % 2` is equivalent but slower and negative for negative x (`-3 % 2 == -1`).",
            "Parity of a count can be tracked with `count ^= 1` instead of `count++`."
          ],
          optimization: {
            bottleneck: "`x % 2` uses division; on some architectures `&` is a single cycle.",
            path: "Bitwise AND.",
            why: "The LSB encodes parity in two's complement.",
            tradeoff: "Negligible for modern JVMs, but the bitwise form also avoids negative-modulo bugs."
          },
          traps: [
            {
              wrong: "`x % 2 == 1` for negative x",
              why: "`-3 % 2 == -1`, so the check fails.",
              right: "`(x & 1) == 1` or `Math.abs(x % 2) == 1`.",
              ex: "−3 is odd but `-3 % 2 == 1` is false."
            }
          ],
          edgeCases: ["x = 0 (even)", "Negative x", "Integer.MIN_VALUE", "Integer.MAX_VALUE"],
          java: [
            "`(x & 1) != 0` is the idiomatic odd check.",
            "Avoid `Math.abs` on `Integer.MIN_VALUE` — it overflows."
          ],
          followUps: [
            { q: "How do you check divisibility by 4?", a: "`(x & 3) == 0` — powers of two use a mask." }
          ],
          recall: ["(x & 1) == 1 → odd", "Works for negatives", "Avoid % for negatives", "count ^= 1 flips parity"]
        }
      },
      {
        title: "Clear Lowest Set Bit",
        desc: "x & (x - 1).",
        tips: {
          recognition: {
            keywords: ["count set bits", "remove lowest bit", "power of two", "Brian Kernighan"],
            signals: ["You need to iterate over set bits only", "You need to strip bits one at a time"],
            notFor: ["You need to isolate (not clear) the lowest bit → `x & -x`"]
          },
          tricks: [
            "`x & (x - 1)` clears the lowest set bit and leaves the rest unchanged.",
            "Count set bits by looping while `x != 0`: `x &= x - 1; count++;` — runs in O(popcount) instead of O(32).",
            "`x & -x` ISOLATES the lowest set bit (the opposite operation).",
            "`x ^ (x & -x)` is another way to clear the lowest set bit."
          ],
          optimization: {
            bottleneck: "Scanning all 32 bits is O(32) regardless of the number of set bits.",
            path: "Kernighan's loop runs once per set bit.",
            why: "Each iteration removes exactly one set bit, so the loop terminates after popcount steps.",
            tradeoff: "For sparse numbers this is much faster; for dense numbers the difference is small."
          },
          traps: [
            {
              wrong: "Confusing `x & (x - 1)` with `x & -x`",
              why: "One clears, the other isolates.",
              right: "Clear for counting; isolate for lowbit tricks (Fenwick trees).",
              ex: "x = 12 (1100): `x & (x-1)` = 1000 (8); `x & -x` = 0100 (4)."
            },
            {
              wrong: "Using it on x = 0 to loop",
              why: "0 & −1 == 0 — infinite loop if the condition is wrong.",
              right: "Loop condition must be `while (x != 0)`.",
              ex: "Counting bits of 0 returns 0 immediately with the correct guard."
            }
          ],
          edgeCases: ["x = 0", "x = 1", "x = Integer.MIN_VALUE (only the sign bit set)", "x = −1 (all bits set)"],
          java: [
            "`Integer.bitCount(x)` is intrinsified and faster than a manual loop.",
            "`Integer.lowestOneBit(x)` returns `x & -x` directly.",
            "Negative x works — two's complement keeps the identity valid."
          ],
          followUps: [
            { q: "How do you count set bits in O(1)?", a: "`Integer.bitCount(x)` uses a hardware popcount intrinsic." },
            { q: "Where is `x & -x` used?", a: "Fenwick trees (index advancement), and isolating the lowest set bit in subset enumeration." }
          ],
          recall: ["x & (x−1) clears the lowest bit", "x & −x isolates it", "Loop while x != 0", "O(popcount)", "bitCount for O(1)"]
        }
      },
      {
        title: "Check Power of 2",
        desc: "(x & (x - 1)) == 0.",
        tips: {
          recognition: {
            keywords: ["power of two", "power of four", "single set bit"],
            signals: ["Exactly one bit is set in the number"],
            notFor: ["Power of three → use division or logarithms", "Power of four → extra mask check"]
          },
          tricks: [
            "`(x & (x - 1)) == 0` is true for powers of two — but ALSO true for x = 0.",
            "Always guard: `x > 0 && (x & (x - 1)) == 0`.",
            "Power of four: power of two AND `(x & 0x55555555) != 0` (the bit is at an even position).",
            "Power of two minus one is all ones: `x - 1` has every lower bit set."
          ],
          optimization: {
            bottleneck: "Repeated division by 2 is O(log x).",
            path: "Single bitwise check → O(1).",
            why: "A power of two has exactly one set bit; subtracting 1 borrows through it, leaving no common set bits.",
            tradeoff: "None — this is optimal."
          },
          traps: [
            {
              wrong: "Forgetting the `x > 0` guard",
              why: "0 & −1 == 0, so 0 is reported as a power of two.",
              right: "`x > 0 && (x & (x - 1)) == 0`.",
              ex: "check(0) returns true without the guard."
            },
            {
              wrong: "Using the power-of-two check for power of four",
              why: "16 is a power of two but 8 is too — 8 is not a power of four.",
              right: "Add the `0x55555555` mask check.",
              ex: "check(8) returns true for power-of-two but false for power-of-four."
            }
          ],
          edgeCases: ["x = 0", "x = 1 (2^0)", "x = Integer.MIN_VALUE (sign bit only)", "Negative x"],
          java: [
            "`(x & (x - 1)) == 0 && x > 0`",
            "`Integer.highestOneBit(x) == x` is an equivalent check.",
            "For power of four: `(x & 0x55555555) != 0` after the power-of-two check."
          ],
          followUps: [
            { q: "Why does 0 pass the naive check?", a: "0 & −1 == 0, so the guard is mandatory." },
            { q: "How do you check power of three?", a: "Repeatedly divide by 3, or use the largest power of 3 within int range as a divisor." }
          ],
          recall: ["x > 0 guard", "x & (x−1) == 0", "0 falsely passes", "Power of 4 adds a mask", "highestOneBit alternative"]
        }
      },
      {
        title: "Unique Element",
        desc: "XOR all elements (a ^ a = 0).",
        tips: {
          recognition: {
            keywords: ["single number", "appears once", "others appear twice", "missing number", "find the duplicate"],
            signals: ["Every element appears an even number of times except one", "O(1) space is required"],
            notFor: ["The unique element appears while others appear three times → use bit counting", "Two unique elements → split by the lowest set bit"]
          },
          tricks: [
            "`a ^ a = 0`, `a ^ 0 = a`, XOR is commutative and associative — XOR-ing everything leaves the unique element.",
            "Missing number in [0, n]: XOR all indices and all values, or XOR with the expected sum.",
            "Two unique numbers: XOR everything to get `a ^ b`, isolate the lowest set bit with `x & -x`, partition the array by that bit, and XOR each partition.",
            "Appears three times: count bits modulo 3, or use two accumulators (`ones`, `twos`)."
          ],
          optimization: {
            bottleneck: "A frequency map is O(n) space.",
            path: "XOR accumulation → O(n) time, O(1) space.",
            why: "XOR cancels pairs; the order does not matter.",
            tradeoff: "Only works when the 'others' appear an even number of times."
          },
          traps: [
            {
              wrong: "Using XOR when others appear three times",
              why: "Triples do not cancel — three copies XOR to the value itself.",
              right: "Bit counting modulo 3, or the `ones`/`twos` method.",
              ex: "[2,2,2,3] → XOR gives 2^3 = 1, not 3."
            },
            {
              wrong: "Initializing the accumulator to the first element and looping from 0",
              why: "The first element is XOR-ed twice and cancels itself.",
              right: "Initialize to 0 and loop over all elements.",
              ex: "[5] → returns 0 instead of 5."
            }
          ],
          edgeCases: ["Single element", "Empty array (undefined)", "Negative numbers (XOR works on two's complement)", "All elements duplicated", "Unique element is 0"],
          java: [
            "`int xor = 0; for (int x : nums) xor ^= x;`",
            "`Integer.lowestOneBit(xor)` gives the split mask for the two-unique-element variant.",
            "XOR works identically on negative ints in Java — no special handling needed."
          ],
          followUps: [
            { q: "How do you find two unique elements?", a: "XOR all → split by the lowest set bit → XOR each group." },
            { q: "How do you find the element appearing once when others appear three times?", a: "Count each bit position modulo 3, or use the `ones`/`twos` accumulator." },
            { q: "Can you solve the missing number problem with XOR?", a: "Yes — XOR all values with all indices 0..n; the result is the missing number." }
          ],
          recall: ["a ^ a = 0", "a ^ 0 = a", "Initialize to 0", "Triples need bit counting", "Two uniques: split by lowest set bit", "Order does not matter"]
        }
      }
    ]
  },

  /* =========================================================================
 * APPEND THE OBJECTS BELOW TO `cheatSheetSections`
 * ========================================================================= */

  /* --------------------------------------------------------------------- */
  {
    category: "Fast & Slow Pointers",
    color: "card-blue",
    icon: "🐢🐇",
    items: [
      {
        title: "Cycle Detection (Floyd's)",
        desc: "Slow moves 1, fast moves 2. They meet iff a cycle exists.",
        tips: {
          recognition: {
            keywords: ["cycle", "loop", "linked list", "happy number", "repeated state"],
            signals: ["You are told a structure may contain a cycle", "The state space is a functional graph (each node has one outgoing edge)"],
            notFor: ["You need the cycle length only → still Floyd's, but count after the meeting", "You need node positions → store indices in a map"]
          },
          tricks: [
            "Both pointers start at head. Loop while `fast != null && fast.next != null`.",
            "After meeting, reset slow to head and advance both by 1 — they meet at the cycle start.",
            "Cycle length = steps fast takes to lap slow after the meeting.",
            "In a functional graph (e.g., happy numbers), Floyd's replaces a `HashSet` of visited states with O(1) space."
          ],
          optimization: {
            bottleneck: "A visited `HashSet` is O(n) space.",
            path: "Floyd's tortoise-and-hare → O(n) time, O(1) space.",
            why: "In a cycle of length L, fast gains exactly 1 on slow per step, so they must meet within L steps.",
            tradeoff: "O(1) space but harder to explain; a hash set is simpler and often accepted."
          },
          traps: [
            {
              wrong: "Checking `slow == fast` before advancing",
              why: "They start at the same node — you would report a cycle immediately.",
              right: "Advance first, then check, or start slow at head and fast at head.next.",
              ex: "A single-node list would be misreported as cyclic."
            },
            {
              wrong: "Using `fast.next != null` only",
              why: "`fast` itself may be null; `fast.next` throws NPE.",
              right: "`while (fast != null && fast.next != null)`.",
              ex: "Even-length lists end with fast == null."
            }
          ],
          edgeCases: ["Empty list", "Single node, no cycle", "Single node self-loop", "Cycle at head", "Cycle at tail"],
          java: [
            "`ListNode slow = head, fast = head;` — advance both inside the loop.",
            "Use `Objects.equals` if comparing node values instead of references.",
            "For happy numbers, use `int` and guard against `1` as a terminal."
          ],
          followUps: [
            { q: "How do you find the cycle start?", a: "Reset slow to head after the meeting; advance both by 1 until they meet." },
            { q: "How do you measure the cycle length?", a: "After the meeting, keep one fixed and count steps for the other to return." }
          ],
          recall: ["slow += 1, fast += 2", "Loop while fast and fast.next exist", "Meet → cycle", "Reset slow to head to find start", "Count steps for length"]
        }
      },
      {
        title: "Middle of List",
        desc: "Slow moves 1, fast moves 2; slow ends at the middle.",
        tips: {
          recognition: {
            keywords: ["middle node", "median of list", "split list", "reorder list"],
            signals: ["You need the midpoint of a linked structure in one pass"],
            notFor: ["Array midpoint → direct index access is O(1)"]
          },
          tricks: [
            "For even-length lists, decide whether to return the lower or upper middle.",
            "Lower middle: `while (fast.next != null && fast.next.next != null)`.",
            "Upper middle: `while (fast != null && fast.next != null)`.",
            "Combine middle-finding with reversal to solve reorder-list and palindrome-list in O(1) space."
          ],
          optimization: {
            bottleneck: "Two passes — one to count, one to walk to the middle.",
            path: "Single pass with two pointers.",
            why: "Fast reaches the end in n/2 steps, so slow is at n/2.",
            tradeoff: "The variant choice (lower vs upper) changes which element is returned on even-length lists."
          },
          traps: [
            {
              wrong: "Using the same condition for both middle variants",
              why: "Even-length lists give different results.",
              right: "Use `fast.next && fast.next.next` for the lower middle.",
              ex: "[1,2,3,4] → lower middle = 2, upper middle = 3."
            }
          ],
          edgeCases: ["Empty list", "Single node", "Two nodes", "Even vs odd length"],
          java: [
            "Return the `ListNode`; the caller reads `.val`.",
            "Pair with `reverseList` and `mergeLists` for the reorder-list problem."
          ],
          followUps: [
            { q: "How do you split the list at the middle?", a: "Find the lower middle, cut `mid.next = null`, return both halves." },
            { q: "How do you check if a list is a palindrome?", a: "Find middle → reverse second half → compare → optionally restore." }
          ],
          recall: ["slow += 1, fast += 2", "Even-length: pick lower or upper", "Lower: fast.next && fast.next.next", "Cut after middle to split"]
        }
      },
      {
        title: "Two-Pointer State Search",
        desc: "Use fast/slow for happy numbers, array duplicates, or any functional graph.",
        tips: {
          recognition: {
            keywords: ["happy number", "repeated state", "find duplicate", "functional graph"],
            signals: ["A state transition f(x) is deterministic", "The state space is finite and may cycle"],
            notFor: ["State transitions are non-deterministic → use BFS/DFS"]
          },
          tricks: [
            "Model the problem as `next(x)` and detect a cycle in that functional graph.",
            "For 'find the duplicate number' (values 1..n), treat `nums[i]` as a pointer — Floyd's finds the duplicate in O(1) space.",
            "Happy number: `next(x) = sum of squares of digits`; Floyd's detects the 1-cycle vs a non-1 cycle."
          ],
          optimization: {
            bottleneck: "A `HashSet` of seen states is O(n) space.",
            path: "Floyd's on the functional graph → O(1) space.",
            why: "Each state has exactly one successor, so the graph is a rho shape — Floyd's applies directly.",
            tradeoff: "The duplicate-number variant requires care with 1-indexed values."
          },
          traps: [
            {
              wrong: "Starting slow and fast at different states for the duplicate problem",
              why: "Both must start at `nums[0]` for the cycle-start logic to align.",
              right: "Both start at index 0, then advance inside the loop.",
              ex: "Starting fast at `nums[nums[0]]` breaks the reset-to-head step."
            }
          ],
          edgeCases: ["Single state", "Immediate cycle", "Long tail before the cycle", "Duplicate at index 0"],
          java: [
            "Helper `int next(int x)` isolates the transition function.",
            "For duplicate number, `slow = nums[slow]` and `fast = nums[nums[fast]]` with values as indices."
          ],
          followUps: [
            { q: "Why does the duplicate-number trick work?", a: "Values act as next pointers; a duplicate creates a node with two predecessors — the entry to the cycle is the duplicate." }
          ],
          recall: ["Define next(state)", "Floyd's finds the cycle", "Reset slow to start for entry point", "O(1) space"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Stack",
    color: "card-teal",
    icon: "📚",
    items: [
      {
        title: "Balanced Brackets",
        desc: "Push openers, pop and match on closers. Stack must be empty at end.",
        tips: {
          recognition: {
            keywords: ["valid parentheses", "balanced", "brackets", "nested", "well-formed"],
            signals: ["Nested structure where order matters", "Closers must match the most recent opener"],
            notFor: ["Only one type of bracket → a counter suffices", "Multiple independent sequences → reset per sequence"]
          },
          tricks: [
            "Push openers; on a closer, pop and verify the match.",
            "Return false immediately if the stack is empty on a closer.",
            "At the end, return `stack.isEmpty()` — leftover openers mean imbalance.",
            "Use a `Deque<Character>` and `push`/`pop`; avoid the legacy `Stack` class."
          ],
          optimization: {
            bottleneck: "Recursive matching recomputes inner segments repeatedly.",
            path: "Single left-to-right pass with a stack → O(n).",
            why: "A stack mirrors the LIFO nesting exactly.",
            tradeoff: "O(n) space in the worst case (all openers)."
          },
          traps: [
            {
              wrong: "Forgetting the final `stack.isEmpty()` check",
              why: "Leftover openers return true incorrectly.",
              right: "`return stack.isEmpty();`",
              ex: "\"(((\" is reported as valid."
            },
            {
              wrong: "Using `Stack` (synchronized) instead of `ArrayDeque`",
              why: "Slower, and `Stack` extends `Vector`.",
              right: "`Deque<Character> st = new ArrayDeque<>();`",
              ex: "Negligible at small n, meaningful in tight loops."
            }
          ],
          edgeCases: ["Empty string", "Single char", "Only openers", "Only closers", "Mixed types", "Odd length (immediate false)"],
          java: [
            "`ArrayDeque<Character>` is the idiomatic stack.",
            "`push` and `pop` are the LIFO pair; `offer`/`poll` are FIFO.",
            "Guard `st.isEmpty()` before `pop`."
          ],
          followUps: [
            { q: "Can you do it in O(1) space?", a: "Only for a single bracket type — use a counter." },
            { q: "What about multiple types?", a: "A stack is required; a single counter cannot distinguish `([)]`." }
          ],
          recall: ["Push openers", "On closer: pop and match", "Empty stack on closer → false", "Return stack.isEmpty()", "ArrayDeque over Stack"]
        }
      },
      {
        title: "Min / Max Stack",
        desc: "Track the running minimum alongside the main stack.",
        tips: {
          recognition: {
            keywords: ["min stack", "get minimum in O(1)", "max stack", "design a stack"],
            signals: ["O(1) aux query on a stack", "Values change as elements are pushed/popped"],
            notFor: ["Queries on a queue → use a deque or monotonic deque"]
          },
          tricks: [
            "Store pairs `(value, currentMin)` so each element knows the min at its depth.",
            "On pop, the previous element's stored min is automatically the new min.",
            "Alternative: push the min again when it equals the new min, and pop twice on the way out.",
            "For a max stack, flip the comparison."
          ],
          optimization: {
            bottleneck: "Scanning the stack for the min is O(n) per query.",
            path: "Store the min alongside each element → O(1) per operation.",
            why: "The min at depth i is a function of the min at depth i−1 and the pushed value.",
            tradeoff: "O(n) space (which the stack already uses); the pair encoding costs 2× memory."
          },
          traps: [
            {
              wrong: "Using a single `min` variable",
              why: "Popping the min loses the previous min.",
              right: "Store the running min per element, or re-push on ties.",
              ex: "push(5), push(3), pop() → the previous min 5 is lost."
            }
          ],
          edgeCases: ["Empty stack", "Duplicate minimums", "All same value", "Negative values"],
          java: [
            "`Deque<int[]> st = new ArrayDeque<>();` where each entry is `{value, currentMin}`.",
            "Or `Deque<long[]>` to avoid boxing.",
            "Re-push trick: `st.push(v); if (minSt.isEmpty() || v <= minSt.peek()) minSt.push(v);`"
          ],
          followUps: [
            { q: "How would you extend this to a max-min stack?", a: "Store both running min and running max per element." },
            { q: "Can you do it with O(1) extra space?", a: "Store the delta between the value and the min, but this requires long to avoid overflow." }
          ],
          recall: ["Store (value, runningMin)", "Re-push on ties", "Pop twice on the way out", "O(1) per operation", "ArrayDeque<int[]>"]
        }
      },
      {
        title: "Expression Evaluation",
        desc: "Stacks for operator precedence and postfix conversion.",
        tips: {
          recognition: {
            keywords: ["evaluate expression", "infix", "postfix", "calculator", "basic calculator", "RPN"],
            signals: ["Operators and operands with precedence", "Parentheses alter evaluation order"],
            notFor: ["No parentheses and no precedence → single left-to-right pass", "Boolean expressions → short-circuit evaluation"]
          },
          tricks: [
            "Two stacks: one for values, one for operators.",
            "On `(` push; on `)` pop-and-apply until `(`.",
            "Assign precedence: `* / > + -`; apply while the top operator has ≥ precedence.",
            "RPN (postfix): one value stack; push operands, pop two on an operator.",
            "For 'basic calculator' with signs, treat subtraction as adding a negative and track a `sign` variable."
          ],
          optimization: {
            bottleneck: "Naive parsing re-scans sub-expressions.",
            path: "Single pass with two stacks → O(n).",
            why: "The operator stack maintains precedence, so each operator is applied exactly once.",
            tradeoff: "A shunting-yard or recursive-descent parser generalizes better but is more code."
          },
          traps: [
            {
              wrong: "Applying operators strictly left-to-right",
              why: "Precedence is ignored — `2 + 3 * 4` becomes 20 instead of 14.",
              right: "Apply higher-precedence operators first via the operator stack.",
              ex: "`2 + 3 * 4` should be 14, not 20."
            },
            {
              wrong: "Forgetting multi-digit numbers",
              why: "Character-by-character parsing splits `123` into `1, 2, 3`.",
              right: "Accumulate digits into a full number before pushing.",
              ex: "\"12 + 3\" becomes 1 + 2 + 3."
            }
          ],
          edgeCases: ["Single number", "Leading minus", "Nested parentheses", "Division by zero", "Integer overflow in multiplication"],
          java: [
            "`Deque<Integer>` for values, `Deque<Character>` for operators.",
            "Guard `st.size() >= 2` before popping two operands.",
            "Division: `int` truncates toward zero — matches the standard LeetCode expectation."
          ],
          followUps: [
            { q: "How do you handle multi-digit numbers?", a: "Accumulate digits into an int until a non-digit character, then push." },
            { q: "How do you handle unary minus?", a: "Track the previous token: if it is an operator or `(`, treat `-` as unary." }
          ],
          recall: ["Two stacks: values + operators", "Precedence: * / > + -", "Pop on ) until (", "Accumulate multi-digit numbers", "Guard operand count"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Monotonic Stack",
    color: "card-orange",
    icon: "📈",
    items: [
      {
        title: "Next Greater / Smaller",
        desc: "Maintain a decreasing stack; pop when a larger element arrives.",
        tips: {
          recognition: {
            keywords: ["next greater", "next smaller", "previous greater", "previous smaller", "warmer day"],
            signals: ["You need the nearest element satisfying a comparison", "O(n) instead of O(n²) is required"],
            notFor: ["You need the farthest such element → binary search on a sorted array", "The comparison is not monotonic"]
          },
          tricks: [
            "Next greater: iterate left to right with a decreasing stack.",
            "Next smaller: iterate left to right with an increasing stack.",
            "Previous greater: iterate right to left with a decreasing stack.",
            "Store indices, not values, when the answer is a distance.",
            "The stack holds indices whose answer is not yet known — a pending list."
          ],
          optimization: {
            bottleneck: "Nested scan is O(n²).",
            path: "Monotonic stack → O(n).",
            why: "Each element is pushed once and popped at most once, so total work is O(n).",
            tradeoff: "The stack holds up to n indices; circular variants need two passes or `i % n`."
          },
          traps: [
            {
              wrong: "Using `<` vs `<=` carelessly",
              why: "Duplicates change whether the 'next greater' is strict or not.",
              right: "Use `<` for strict greater, `<=` for greater-or-equal.",
              ex: "[5, 5] → strict 'next greater' is -1; non-strict is the next 5."
            },
            {
              wrong: "Iterating without resizing the answer array",
              why: "Unset entries default to 0, which may be a valid answer.",
              right: "`Arrays.fill(res, -1)` before the loop.",
              ex: "A missing answer silently becomes 0."
            }
          ],
          edgeCases: ["Empty array", "Single element", "Strictly increasing", "Strictly decreasing", "All equal", "Circular array"],
          java: [
            "`Deque<Integer> st = new ArrayDeque<>();` for indices.",
            "`int[] res = new int[n]; Arrays.fill(res, -1);`",
            "For circular arrays, loop `for (int i = 0; i < 2 * n; i++)` and use `i % n`."
          ],
          followUps: [
            { q: "How do you handle circular arrays?", a: "Iterate twice with `i % n`; the second pass resolves the wrap-around." },
            { q: "How do you get previous greater?", a: "Iterate right to left with the same monotonic invariant." }
          ],
          recall: ["Store indices, not values", "Decreasing stack for next greater", "Each index pushed/popped once", "Fill with -1", "Circular: 2n with i % n"]
        }
      },
      {
        title: "Largest Rectangle in Histogram",
        desc: "For each bar, find the nearest smaller on both sides.",
        tips: {
          recognition: {
            keywords: ["largest rectangle", "histogram", "maximal rectangle", "trapping rain water"],
            signals: ["You need the span a bar can extend before hitting a smaller bar", "O(n) is required"],
            notFor: ["Values are not heights → different geometry", "Sorted bars → trivial"]
          },
          tricks: [
            "Use an increasing stack of indices plus a sentinel `-1` at the bottom.",
            "When the current bar is shorter than the stack top, pop and compute the area with the popped bar as the limiting height.",
            "Append a sentinel `0` height at the end to flush the stack.",
            "For 'maximal rectangle' in a binary matrix, treat each row as a histogram and reuse the same routine."
          ],
          optimization: {
            bottleneck: "For each bar, scanning left and right is O(n²).",
            path: "Monotonic stack computes both nearest-smaller indices in O(n).",
            why: "The stack stores bars in increasing height; a shorter bar pops all taller ones and finalizes their rectangles.",
            tradeoff: "Two passes or one pass with sentinels — the sentinel version is shorter but subtler."
          },
          traps: [
            {
              wrong: "Forgetting the sentinel to flush the stack",
              why: "Bars still on the stack at the end never get their rectangle computed.",
              right: "Append a 0-height bar, or drain the stack after the loop.",
              ex: "An increasing histogram [1,2,3] leaves all bars unprocessed."
            },
            {
              wrong: "Computing width as `i - top` instead of `i - st.peek() - 1`",
              why: "Off-by-one — the popped bar's left boundary is the next index on the stack.",
              right: "`width = i - st.peek() - 1` (with `-1` when empty).",
              ex: "Single bar [5] → area should be 5, not 5 × (i − 0)."
            }
          ],
          edgeCases: ["Empty histogram", "Single bar", "All equal heights", "Strictly increasing", "Strictly decreasing", "Zeros"],
          java: [
            "`Deque<Integer> st = new ArrayDeque<>();` seeded with `-1`.",
            "Use `long` for area if heights are large.",
            "For 2D maximal rectangle, maintain a `heights[]` array and call the 1D routine per row."
          ],
          followUps: [
            { q: "How do you extend to a 2D matrix?", a: "Update `heights[j]` per row (`0` resets, else `heights[j] + 1`) and run the 1D routine." },
            { q: "Can you solve trapping rain water with this pattern?", a: "Yes — a monotonic stack computes the trapped water layer by layer." }
          ],
          recall: ["Increasing stack of indices", "Sentinel -1 at the bottom", "Width = i − st.peek() − 1", "Append a 0-height sentinel", "long for area"]
        }
      },
      {
        title: "Daily Temperatures & Span",
        desc: "How many days until a warmer temperature — same stack shape.",
        tips: {
          recognition: {
            keywords: ["daily temperatures", "stock span", "how many days until", "next warmer"],
            signals: ["The answer is a DISTANCE to the next element satisfying a comparison"],
            notFor: ["You need the element itself, not the distance → still this pattern, but store values"]
          },
          tricks: [
            "Store indices in a decreasing stack; the answer is `i - stack.pop()`.",
            "Stock span: for each price, pop while `prices[top] <= today`; span = `i - stack.peek()` (or `i + 1` if empty).",
            "The stack never contains indices with a smaller/equal value below a larger one — it is strictly decreasing."
          ],
          optimization: {
            bottleneck: "Scanning forward per element is O(n²).",
            path: "Monotonic decreasing stack → O(n).",
            why: "Each index is pushed and popped once.",
            tradeoff: "The stack holds a pending list of unresolved days."
          },
          traps: [
            {
              wrong: "Storing temperatures instead of indices",
              why: "You cannot compute the distance without indices.",
              right: "Store indices; look up `temps[stack.peek()]`.",
              ex: "The answer array needs `i - j`, not the value difference."
            }
          ],
          edgeCases: ["Monotonically decreasing → all zeros", "Monotonically increasing → 1 each", "All equal", "Single day"],
          java: [
            "`int[] res = new int[n];` zero-initialized — perfect for 'no warmer day'.",
            "`Deque<Integer>` for the index stack.",
            "Use `long` if the span can exceed int (rare)."
          ],
          followUps: [
            { q: "How do you compute the stock span?", a: "Pop while `prices[top] <= today`; span = `i - top` after the pops (or `i + 1` if empty)." }
          ],
          recall: ["Decreasing index stack", "Distance = i − pop", "Zero-init for 'no warmer'", "Pop while top ≤ current", "Each index once"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Backtracking",
    color: "card-red",
    icon: "🔀",
    items: [
      {
        title: "Subsets & Combinations",
        desc: "Include / exclude each element; recurse on the rest.",
        tips: {
          recognition: {
            keywords: ["subsets", "combinations", "power set", "choose k", "combination sum"],
            signals: ["You need to enumerate all subsets/combinations of a set", "Order does not matter, size is bounded"],
            notFor: ["Only the count is needed → use DP or combinatorics", "Order matters → permutations"]
          },
          tricks: [
            "Pass a `start` index to prevent revisiting earlier elements.",
            "Record the current path at EVERY node — not just at leaves — for subsets.",
            "For 'combination sum with reuse', recurse at the same index; for 'without reuse', recurse at `i + 1`.",
            "Prune by sorting first and breaking when `candidate > remaining`.",
            "Copy the path with `new ArrayList<>(path)` when adding to results."
          ],
          optimization: {
            bottleneck: "Generating all 2^n subsets is inherent — cannot be asymptotically improved.",
            path: "Sorting + pruning reduces constant factors and avoids duplicate branches.",
            why: "Sorting makes 'too large' candidates discoverable early, cutting the recursion tree.",
            tradeoff: "Sorting costs O(n log n) but pays off when many branches are pruned."
          },
          traps: [
            {
              wrong: "Adding the path reference to the result without copying",
              why: "All results point to the same list and mutate together.",
              right: "`new ArrayList<>(path)` on every add.",
              ex: "Every subset prints identically at the end."
            },
            {
              wrong: "Not deduplicating in 'subsets II' (with duplicates)",
              why: "Duplicate values produce duplicate subsets.",
              right: "Sort and skip `nums[i] == nums[i-1]` when `i > start`.",
              ex: "[1,2,2] produces [2,2] twice."
            }
          ],
          edgeCases: ["Empty input → [[]]", "Single element", "All duplicates", "k = 0", "k > n"],
          java: [
            "`List<List<Integer>> res = new ArrayList<>();`",
            "`new ArrayList<>(path)` on every add.",
            "`Collections.sort(nums)` before the recursion for pruning and deduplication."
          ],
          followUps: [
            { q: "How do you count subsets without enumerating?", a: "2^n for distinct elements; for 'combination sum' use DP with the coin-change recurrence." },
            { q: "How do you handle duplicates?", a: "Sort and skip equal siblings at the same level." }
          ],
          recall: ["start index prevents revisits", "Add path at every node", "Sort for pruning/dedup", "Copy path before adding", "Reuse vs no-reuse: same vs +1 index"]
        }
      },
      {
        title: "Permutations",
        desc: "Swap or use a visited set; every element at every position.",
        tips: {
          recognition: {
            keywords: ["permutations", "arrangements", "all orderings", "next permutation"],
            signals: ["Order matters", "Every element must appear exactly once"],
            notFor: ["Only a specific ordering is needed → construct directly", "Count only → n! formula"]
          },
          tricks: [
            "Visited-set version: pick unused elements at each depth.",
            "Swap version: swap `i` with `start`, recurse, swap back — O(1) per branch.",
            "Deduplicate with the same sort-and-skip trick as subsets.",
            "For 'next permutation', use the standard three-step: find the pivot, swap with the next larger, reverse the suffix."
          ],
          optimization: {
            bottleneck: "n! permutations is inherent.",
            path: "Swap-based avoids the visited array and extra list allocations.",
            why: "Swapping in place encodes the 'used' state directly in the array.",
            tradeoff: "Swap-based does not produce a sorted output without extra work."
          },
          traps: [
            {
              wrong: "Forgetting to swap back after recursion",
              why: "The array is left in a permuted state and later branches are wrong.",
              right: "`swap(i, start); recurse; swap(i, start);`",
              ex: "Only the first permutation is correct."
            },
            {
              wrong: "Using a `boolean[]` without checking it before use",
              why: "Repeats the same element at the same depth.",
              right: "Check `!used[i]` before recursing, mark, recurse, unmark.",
              ex: "Duplicates appear even with distinct elements."
            }
          ],
          edgeCases: ["Empty input → [[]]", "Single element", "All duplicates", "Contains negatives"],
          java: [
            "Pass the same `List<Integer> path` and mutate it with add/remove.",
            "`swap(int[] a, int i, int j)` helper.",
            "For next permutation, use `Arrays.sort` on the suffix after the pivot."
          ],
          followUps: [
            { q: "How do you handle duplicate permutations?", a: "Sort + skip equal siblings at the same depth, or use a `HashSet` of visited values per level." },
            { q: "How do you compute the k-th permutation?", a: "Factoradic: repeatedly pick the (k / (n−1)!)-th remaining element." }
          ],
          recall: ["Visited or swap", "Swap back after recursion", "Sort + skip for duplicates", "Record at depth == n", "k-th via factoradic"]
        }
      },
      {
        title: "Constraint Satisfaction (N-Queens, Sudoku)",
        desc: "Place elements subject to non-overlapping constraints.",
        tips: {
          recognition: {
            keywords: ["N-Queens", "Sudoku", "word search", "place pieces", "constraint satisfaction"],
            signals: ["You place items one at a time, each constraining future placements"],
            notFor: ["A direct constructive solution exists", "The constraint graph is small enough for brute force"]
          },
          tricks: [
            "N-Queens: track three boolean sets — columns, `row - col`, `row + col`.",
            "Sudoku: track `rowUsed[9][9]`, `colUsed[9][9]`, `boxUsed[9][9]` — place, recurse, unplace.",
            "Word search: mark the cell as visited before recursing, unmark after.",
            "Prune the search by checking constraints BEFORE recursing, not after."
          ],
          optimization: {
            bottleneck: "Checking all constraints at every placement is O(n) per node.",
            path: "Precomputed sets/tables make each constraint check O(1).",
            why: "Each queen attacks along three axes — encode each axis as a boolean array.",
            tradeoff: "O(1) checks cost O(n) extra space; worth it for exponential searches."
          },
          traps: [
            {
              wrong: "Checking constraints only at the leaf",
              why: "The search explores many invalid partial states.",
              right: "Check before recursing.",
              ex: "N-Queens explores 8! leaves instead of pruning early."
            },
            {
              wrong: "Not unsetting the placement on backtrack",
              why: "Subsequent branches see stale state.",
              right: "Undo every mark after the recursion returns.",
              ex: "Sudoku solver fails to place the second number."
            }
          ],
          edgeCases: ["n = 1", "No solution", "Multiple solutions (return one or all)", "Pre-filled cells in Sudoku", "Word search with revisiting allowed"],
          java: [
            "`boolean[][] cols, diag1, diag2` for N-Queens.",
            "`char[][] board` for Sudoku — mutate in place.",
            "For word search, `board[r][c] = '#'` as a visited marker, then restore."
          ],
          followUps: [
            { q: "How do you count all N-Queens solutions?", a: "Same recursion; count instead of recording." },
            { q: "How do you speed up Sudoku?", a: "Order cells by the fewest remaining candidates first (MRV heuristic)." }
          ],
          recall: ["Constrain before recursing", "Sets for O(1) checks", "Undo marks on backtrack", "MRV ordering for speed", "Mutate board in place"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Heaps & Priority Queues",
    color: "card-purple",
    icon: "🏔️",
    items: [
      {
        title: "Top-K Elements",
        desc: "Maintain a min-heap of size K for the K largest.",
        tips: {
          recognition: {
            keywords: ["top K", "K largest", "K smallest", "K most frequent", "Kth element"],
            signals: ["You need a bounded subset of extremes", "Full sorting is overkill"],
            notFor: ["You need all elements in order → sort", "k ≈ n → sort may be simpler"]
          },
          tricks: [
            "K largest → min-heap of size K; K smallest → max-heap of size K.",
            "Push and pop when size exceeds K — the heap top is the boundary.",
            "For 'K most frequent', use a `HashMap` for frequencies, then a heap over the entries.",
            "QuickSelect gives O(n) average for the Kth element — better than the heap's O(n log k) when k is large."
          ],
          optimization: {
            bottleneck: "Sorting is O(n log n) regardless of k.",
            path: "Heap → O(n log k); QuickSelect → O(n) average.",
            why: "The heap only tracks k candidates; QuickSelect partitions without full sorting.",
            tradeoff: "Heap is streaming-friendly; QuickSelect needs random access and has O(n²) worst case."
          },
          traps: [
            {
              wrong: "Using a max-heap for K largest and popping K times",
              why: "Correct but O(n + k log n) — worse than a size-K min-heap for small k.",
              right: "Min-heap of size K.",
              ex: "k = 10, n = 10^6 → the size-K heap never exceeds 10 entries."
            },
            {
              wrong: "Forgetting to tie-break equal frequencies",
              why: "The order of equal entries is undefined.",
              right: "Use a secondary comparator.",
              ex: "K most frequent words with identical counts."
            }
          ],
          edgeCases: ["k = 0", "k = n", "All elements equal", "Negative values", "Empty input"],
          java: [
            "`PriorityQueue<Integer> pq = new PriorityQueue<>();` for a min-heap.",
            "For a max-heap, `new PriorityQueue<>(Comparator.reverseOrder())`.",
            "For entries: `PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);` — but use `Integer.compare` to avoid overflow."
          ],
          followUps: [
            { q: "How do you handle a stream?", a: "The size-K heap naturally supports streaming — each new element is compared to the heap top." },
            { q: "When is QuickSelect better?", a: "When k is large and the array is in memory — O(n) average vs O(n log k)." }
          ],
          recall: ["K largest → min-heap of size K", "K smallest → max-heap", "Pop when size > K", "Integer.compare for comparators", "QuickSelect for large k"]
        }
      },
      {
        title: "K-Way Merge",
        desc: "Heap of the current head of each sorted list.",
        tips: {
          recognition: {
            keywords: ["merge k sorted lists", "k sorted arrays", "smallest range", "k-way merge"],
            signals: ["Multiple sorted inputs that must be merged in order"],
            notFor: ["Two lists → merge directly without a heap", "Unsorted inputs → sort first"]
          },
          tricks: [
            "Heap stores `(value, listIndex, elementIndex)`.",
            "Pop the smallest, append to output, and push the next element from the same list.",
            "For 'smallest range covering elements from k lists', track the max of the current heads — the range is `max - min`.",
            "For linked lists, store the `ListNode` directly with a comparator on `.val`."
          ],
          optimization: {
            bottleneck: "Merging k lists pairwise is O(n × k) or O(n log k) with divide-and-conquer.",
            path: "Min-heap of size k → O(n log k).",
            why: "Each of the n total elements is pushed and popped once; heap operations are O(log k).",
            tradeoff: "Divide-and-conquer merge is simpler and equally fast; the heap is essential for streaming inputs."
          },
          traps: [
            {
              wrong: "Pushing all elements into the heap at once",
              why: "Heap size becomes n, negating the log k advantage.",
              right: "Push only the current head of each list.",
              ex: "k = 100 lists of 10^4 elements → heap should stay at 100."
            },
            {
              wrong: "Forgetting to advance the pointer in the source list",
              why: "The same element is pushed again — infinite loop or duplicates.",
              right: "Increment `elementIndex` before pushing the next.",
              ex: "Merging [1,2] and [3,4] repeats 1 forever."
            }
          ],
          edgeCases: ["Empty lists", "Single list", "All lists empty", "Very different lengths", "Duplicates across lists"],
          java: [
            "`PriorityQueue<int[]>` with `Integer.compare(a[0], b[0])`.",
            "For lists: `PriorityQueue<ListNode>` with `(a, b) -> Integer.compare(a.val, b.val)`.",
            "Guard `if (node.next != null) pq.offer(node.next);`"
          ],
          followUps: [
            { q: "Can you solve it without a heap?", a: "Divide-and-conquer merge — O(n log k) with O(log k) recursion depth." },
            { q: "How do you find the smallest range covering all k lists?", a: "Heap of heads; track max; pop the smallest and advance that list; update the range." }
          ],
          recall: ["Heap of current heads", "Track listIndex and elementIndex", "Push the next from the same list", "O(n log k)", "Integer.compare comparator"]
        }
      },
      {
        title: "Streaming Median",
        desc: "Two heaps: max-heap for the lower half, min-heap for the upper.",
        tips: {
          recognition: {
            keywords: ["median of stream", "running median", "sliding window median", "two heaps"],
            signals: ["Elements arrive one at a time", "Median queries interspersed with insertions"],
            notFor: ["All elements are known upfront → sort once", "Only the mean is needed → running sum"]
          },
          tricks: [
            "Max-heap (lower) and min-heap (upper); keep their sizes within 1.",
            "Insert into the max-heap, then move its top to the min-heap, then rebalance.",
            "Median = max-heap top (odd size) or the average of the two tops (even size).",
            "For a sliding-window median, add lazy deletion via a `HashMap` of pending removals."
          ],
          optimization: {
            bottleneck: "Re-sorting on each insertion is O(n log n) per query.",
            path: "Two heaps → O(log n) insert, O(1) median.",
            why: "The two tops are the boundary between the lower and upper halves.",
            tradeoff: "Streaming-friendly; sliding-window variant adds lazy deletion complexity."
          },
          traps: [
            {
              wrong: "Allowing the size difference to exceed 1",
              why: "The tops no longer straddle the median.",
              right: "Rebalance after every insert.",
              ex: "Three consecutive inserts into the max-heap leave it 3 larger."
            },
            {
              wrong: "Integer division in the even-size average",
              why: "`(a + b) / 2` truncates in Java.",
              right: "Return `(a + b) / 2.0`.",
              ex: "Median of [1, 2] should be 1.5, not 1."
            }
          ],
          edgeCases: ["Empty stream", "Single element", "Even count", "Odd count", "Negative values", "Duplicates"],
          java: [
            "`PriorityQueue<Integer> lower = new PriorityQueue<>(Comparator.reverseOrder());`",
            "`PriorityQueue<Integer> upper = new PriorityQueue<>();`",
            "For sliding window, use `HashMap<Integer, Integer> delayed` to track removals lazily."
          ],
          followUps: [
            { q: "How do you extend to a sliding-window median?", a: "Add lazy deletion: mark removals and prune heaps when their tops are stale." },
            { q: "What if the stream has duplicates?", a: "Heaps handle duplicates fine; order is preserved by size." }
          ],
          recall: ["Max-heap for lower half", "Min-heap for upper half", "Size difference ≤ 1", "Even: average the tops", "Rebalance after each insert"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Greedy Algorithms",
    color: "card-yellow",
    icon: "🎯",
    items: [
      {
        title: "Interval / Activity Selection",
        desc: "Sort by end time; greedily pick the next non-overlapping interval.",
        tips: {
          recognition: {
            keywords: ["maximum non-overlapping", "activity selection", "meeting rooms", "minimum removals"],
            signals: ["You need the maximum number of non-conflicting items", "Sorting by one key enables a provably optimal pick"],
            notFor: ["The problem asks for a specific interval, not the count", "Conflicts are not pairwise"]
          },
          tricks: [
            "Sort by END time for 'maximum non-overlapping intervals'.",
            "Sort by START time for 'merge intervals' or 'minimum meeting rooms'.",
            "Track the end of the last picked interval; pick the next interval with `start >= lastEnd`.",
            "For 'minimum removals to make non-overlapping', the answer is `n - maxNonOverlapping`."
          ],
          optimization: {
            bottleneck: "Enumerating all subsets is O(2^n).",
            path: "Sort + single pass → O(n log n).",
            why: "The earliest-ending interval leaves the most room for the rest — an exchange argument proves optimality.",
            tradeoff: "Sorting by the wrong key breaks correctness — the key choice must be justified."
          },
          traps: [
            {
              wrong: "Sorting by start time for 'maximum non-overlapping'",
              why: "A long early interval can block many short ones.",
              right: "Sort by end time.",
              ex: "[[1,100],[2,3],[3,4]] — start-sort picks [1,100], end-sort picks [2,3],[3,4]."
            },
            {
              wrong: "Using `>` instead of `>=` for touching intervals",
              why: "`[1,2]` and `[2,3]` touch but do not overlap — most problems treat them as non-overlapping.",
              right: "Pick when `start >= lastEnd`.",
              ex: "Strict `>` rejects a valid touching interval."
            }
          ],
          edgeCases: ["Empty list", "Single interval", "All overlapping", "All non-overlapping", "Touching intervals", "Zero-length intervals"],
          java: [
            "`Arrays.sort(intervals, (a, b) -> Integer.compare(a[1], b[1]));`",
            "Avoid `a[1] - b[1]` — overflow risk.",
            "For 'meeting rooms', use a min-heap of end times instead of sorting alone."
          ],
          followUps: [
            { q: "What if intervals can be split?", a: "Fractional scheduling becomes LP-like and greedy may not be optimal." },
            { q: "How do you count minimum meeting rooms?", a: "Sort by start, use a min-heap of end times, and reuse a room when `heap.peek() <= start`." }
          ],
          recall: ["Max non-overlap → sort by end", "Merge → sort by start", "Pick when start ≥ lastEnd", "Touching ≠ overlapping", "Integer.compare comparator"]
        }
      },
      {
        title: "Jump Game / Reachability",
        desc: "Track the furthest reachable index; return false if you pass it.",
        tips: {
          recognition: {
            keywords: ["jump game", "can reach the end", "furthest reach", "minimum jumps"],
            signals: ["At each index you have a range of moves", "The question is reachability or minimum jumps"],
            notFor: ["Costs vary per jump → Dijkstra/BFS on weighted graph", "Backward-only movement"]
          },
          tricks: [
            "Maintain `maxReach = max(maxReach, i + nums[i])` as you scan.",
            "If `i > maxReach` at any point, the end is unreachable.",
            "For 'minimum jumps', use BFS levels: each level is the range you can reach in `jumps` steps.",
            "For 'jump game VII' (with a distance limit), use a sliding window of reachable indices."
          ],
          optimization: {
            bottleneck: "DP over all reachable indices is O(n²).",
            path: "Greedy reach tracking → O(n).",
            why: "The furthest reachable index dominates all smaller reaches — extending from a smaller reach is never better.",
            tradeoff: "Works only when jumps are non-negative (always forward or stay)."
          },
          traps: [
            {
              wrong: "Checking reachability only at the last index",
              why: "You may pass an unreachable gap earlier.",
              right: "Check `i > maxReach` at every step.",
              ex: "[0,1,1] — index 1 is unreachable, but the last index might still look 'reachable' by a naive check."
            },
            {
              wrong: "Using DP when greedy suffices",
              why: "O(n²) instead of O(n).",
              right: "Single-pass reach tracking.",
              ex: "n = 10^5 → DP times out."
            }
          ],
          edgeCases: ["Single element (always reachable)", "First element 0", "Zeros in the middle", "All zeros after index 0", "Large jump values"],
          java: [
            "`int maxReach = 0;` and `for (int i = 0; i < n; i++)`.",
            "For minimum jumps, use a `jumps` counter and `currentEnd` boundary (BFS layer).",
            "Use `long` if `i + nums[i]` can overflow."
          ],
          followUps: [
            { q: "How do you return the minimum jumps?", a: "BFS layering: increment jumps when you pass the current reach boundary." },
            { q: "What if jumps can be negative?", a: "Greedy fails — the state is no longer monotonic; use BFS over indices." }
          ],
          recall: ["maxReach = max(maxReach, i + nums[i])", "i > maxReach → false", "Minimum jumps: BFS levels", "Single pass O(n)", "Guard overflow"]
        }
      },
      {
        title: "Local Choice → Global Optimal",
        desc: "Greedy works only when local choices are provably globally optimal.",
        tips: {
          recognition: {
            keywords: ["minimum coins (canonical)", "Huffman", "assign cookies", "gas station", "candy"],
            signals: ["An exchange argument shows that a locally best pick never hurts", "The problem has the 'greedy choice property'"],
            notFor: ["Coins like [1, 3, 4] with target 6 → greedy gives 3, optimal is 2 (4+1+1) is wrong — actual optimal is 3+3", "The greedy choice property is not provable"]
          },
          tricks: [
            "Always state the exchange argument in the interview: 'swapping any optimal solution's first pick with the greedy pick cannot worsen it'.",
            "For 'gas station', track `total` and `current`; reset the start when `current < 0`.",
            "For Huffman coding, repeatedly merge the two smallest frequencies via a min-heap.",
            "For 'candy', do a left-to-right pass for ascending ratings and a right-to-left pass for descending."
          ],
          optimization: {
            bottleneck: "Brute-force DP is O(n × W) or exponential.",
            path: "Greedy when the choice property holds → O(n log n) or O(n).",
            why: "The exchange argument proves that the greedy pick is part of some optimal solution.",
            tradeoff: "Greedy is fast but only valid when the property holds — verify with a counterexample attempt first."
          },
          traps: [
            {
              wrong: "Applying greedy without a proof",
              why: "Classic counterexample: coins [1, 3, 4], target 6 → greedy gives 4+1+1 (3 coins), optimal is 3+3 (2 coins).",
              right: "For arbitrary coin systems, use DP. Greedy only for canonical systems.",
              ex: "Same problem, wrong algorithm, silent wrong answer."
            },
            {
              wrong: "One-pass 'candy' without the right-to-left pass",
              why: "Descending ratings are missed.",
              right: "Two passes: left-to-right for ascending, right-to-left for descending.",
              ex: "[5,4,3,2,1] requires 5+4+3+2+1 candies."
            }
          ],
          edgeCases: ["Empty input", "Single element", "All same value", "Already sorted", "Reverse-sorted"],
          java: [
            "`PriorityQueue<Integer>` for Huffman merging.",
            "`int[] left = new int[n], right = new int[n];` for two-pass greedy.",
            "Use `long` for total sums in gas-station style problems."
          ],
          followUps: [
            { q: "How do you prove greedy correctness?", a: "Exchange argument: transform any optimal solution to include the greedy pick without increasing cost." },
            { q: "When should you switch to DP?", a: "When you can construct a counterexample to the greedy choice — the coin problem is the canonical case." }
          ],
          recall: ["State the exchange argument", "Verify with a counterexample", "Two-pass when both directions matter", "PriorityQueue for Huffman", "DP when greedy fails"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Intervals",
    color: "card-pink",
    icon: "📅",
    items: [
      {
        title: "Merge Intervals",
        desc: "Sort by start; merge if the next start ≤ current end.",
        tips: {
          recognition: {
            keywords: ["merge intervals", "overlapping intervals", "combine ranges", "insert interval"],
            signals: ["Ranges that may overlap and need consolidation"],
            notFor: ["The problem asks for the maximum non-overlapping count → different pattern"]
          },
          tricks: [
            "Sort by start; iterate and merge when `next.start <= current.end`.",
            "Otherwise, push the current interval and start a new one.",
            "For 'insert interval', find the insertion point, merge left overlaps, merge right overlaps.",
            "Use a `List<int[]>` for the result; the last merged interval is the one to extend."
          ],
          optimization: {
            bottleneck: "Pairwise comparison is O(n²).",
            path: "Sort + single pass → O(n log n).",
            why: "After sorting by start, overlaps are contiguous — no need to compare non-adjacent intervals.",
            tradeoff: "Sorting modifies the input; copy first if order must be preserved."
          },
          traps: [
            {
              wrong: "Comparing `next.start < current.end` instead of `<=`",
              why: "Touching intervals [1,2] and [2,3] are not merged.",
              right: "Use `<=` for 'merge on touch'.",
              ex: "Problem says 'touching counts as overlap'."
            },
            {
              wrong: "Modifying the original interval objects in place",
              why: "Caller's data is corrupted.",
              right: "Create new `int[]` for merged results.",
              ex: "Reusing the input array's references propagates mutations."
            }
          ],
          edgeCases: ["Empty list", "Single interval", "All overlapping", "All disjoint", "Touching intervals", "Zero-length intervals"],
          java: [
            "`intervals` are usually `int[][]` — sort with a comparator.",
            "`List<int[]> res` — append `new int[]{start, end}` on merge completion.",
            "Return `res.toArray(new int[res.size()][])`."
          ],
          followUps: [
            { q: "How do you insert an interval into a sorted list?", a: "Scan for the insertion point, merge with the left, then with the right, and splice." },
            { q: "What if intervals are not sorted?", a: "Sort first — O(n log n) is unavoidable without sorting." }
          ],
          recall: ["Sort by start", "Merge when next.start ≤ current.end", "Push when no overlap", "Copy intervals on merge", "Touching counts as overlap"]
        }
      },
      {
        title: "Meeting Rooms",
        desc: "Sort by start; use a min-heap of end times to count rooms.",
        tips: {
          recognition: {
            keywords: ["meeting rooms", "minimum rooms", "can attend all", "conference scheduling"],
            signals: ["Resource contention over intervals", "You need to count simultaneous usage"],
            notFor: ["Maximum non-overlapping → sort by end", "Overlap count only → sweep-line"]
          },
          tricks: [
            "Sort meetings by start time.",
            "Min-heap of end times: for each meeting, if `heap.peek() <= start`, reuse (pop). Then push the end.",
            "The heap size is the number of rooms in use at the peak.",
            "For 'can attend all', check whether any adjacent pair overlaps after sorting.",
            "Sweep-line alternative: sort starts and ends separately, then balance."
          ],
          optimization: {
            bottleneck: "Pairwise overlap checking is O(n²).",
            path: "Sort + heap → O(n log n).",
            why: "The heap always contains the earliest-ending room — reuse it whenever possible.",
            tradeoff: "Sweep-line is O(n log n) with less space; heap is more intuitive."
          },
          traps: [
            {
              wrong: "Sorting by end instead of start",
              why: "Rooms are allocated in the order meetings begin.",
              right: "Sort by start.",
              ex: "Meeting Rooms II assumes start-sorted input."
            },
            {
              wrong: "Using `heap.peek() < start` instead of `<=`",
              why: "A meeting ending exactly when the next starts reuses the room — that is allowed.",
              right: "Use `<=`.",
              ex: "[0,5] and [5,10] use one room."
            }
          ],
          edgeCases: ["Empty list", "Single meeting", "All same start", "All same end", "Zero-length meetings", "Touching meetings"],
          java: [
            "`PriorityQueue<Integer>` for end times.",
            "`Arrays.sort(intervals, (a, b) -> Integer.compare(a[0], b[0]));`",
            "For 'can attend all', compare `sorted[i-1][1] > sorted[i][0]`."
          ],
          followUps: [
            { q: "How do you find the maximum concurrent meetings?", a: "Sweep-line: sort events, increment on start, decrement on end, track the max." },
            { q: "How do you return the actual assignments?", a: "Store `(endTime, roomIndex)` in the heap." }
          ],
          recall: ["Sort by start", "Min-heap of end times", "Reuse when peek ≤ start", "Heap size = peak rooms", "Touching allowed"]
        }
      },
      {
        title: "Sweep-Line / Overlap Counting",
        desc: "Sort events; process start before end at the same coordinate.",
        tips: {
          recognition: {
            keywords: ["maximum concurrent", "car pooling", "skyline", "meeting rooms III", "count overlaps"],
            signals: ["You need the maximum simultaneous usage over all points"],
            notFor: ["The answer is a count of non-overlapping intervals → greedy"]
          },
          tricks: [
            "Create events: `(start, +1)` and `(end, -1)`. Sort by coordinate, tie-break with `+1` first for touching semantics.",
            "For 'touching allowed', process ends before starts at the same coordinate.",
            "For 'skyline', use a max-heap of heights with lazy deletion as events expire.",
            "For 'car pooling', the difference array approach is a sweep-line in disguise."
          ],
          optimization: {
            bottleneck: "Per-point counting is O(n × maxCoordinate).",
            path: "Sweep-line → O(n log n).",
            why: "The count only changes at event coordinates — everything between is constant.",
            tradeoff: "A difference array is O(n + maxCoordinate) but requires bounded coordinates."
          },
          traps: [
            {
              wrong: "Inconsistent tie-breaking between start and end events",
              why: "Overlap counts differ for touching intervals.",
              right: "Decide 'touching counts' vs 'touching does not count' and stick to it.",
              ex: "Skyline: ends must be processed before starts at the same x."
            },
            {
              wrong: "Sweeping point-by-point instead of event-by-event",
              why: "O(maxCoordinate) when the coordinate range is huge.",
              right: "Only visit event coordinates.",
              ex: "Coordinates up to 10^9 → per-point sweep times out."
            }
          ],
          edgeCases: ["Empty events", "Single interval", "Touching intervals", "Zero-length intervals", "Very large coordinates"],
          java: [
            "`int[][] events = new int[2 * n][2];` sorted by coordinate.",
            "Tie-break: `events[i][1]` with `-1` before `+1` if touching does not count.",
            "For skyline, `PriorityQueue<int[]> pq` of `(height, endX)` with lazy deletion."
          ],
          followUps: [
            { q: "How do you compute the union area of rectangles?", a: "Sweep-line over x, maintain active y-intervals, and multiply the delta-x by the covered y-length." },
            { q: "How do you find the skyline?", a: "Sweep over building edges; maintain a max-heap of heights with lazy deletion; record when the max changes." }
          ],
          recall: ["Events: (start, +1), (end, -1)", "Sort by coordinate", "Tie-break: ends before starts for touching", "Only visit event points", "Lazy deletion for skyline"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Linked Lists",
    color: "card-blue",
    icon: "🔗",
    items: [
      {
        title: "Reversal",
        desc: "Three pointers: prev, curr, next. Reverse links in place.",
        tips: {
          recognition: {
            keywords: ["reverse list", "reverse k-group", "reverse between", "swap pairs"],
            signals: ["You need to change the direction of `next` pointers"],
            notFor: ["You need to reverse the VALUES only → swap values, not pointers"]
          },
          tricks: [
            "Standard 3-pointer loop: `prev = null, curr = head; while (curr != null) { next = curr.next; curr.next = prev; prev = curr; curr = next; }`.",
            "Use a dummy node for 'reverse between' and 'reverse k-group' — it simplifies head-edge cases.",
            "For k-group reversal, reverse k nodes at a time and reconnect the tail to the next group's head.",
            "Reverse recursively for elegance: `head.next.next = head; head.next = null; return newHead;`."
          ],
          optimization: {
            bottleneck: "Storing nodes in an array and re-linking is O(n) space.",
            path: "In-place pointer reversal → O(1) space.",
            why: "Only the direction of `next` changes; node identities stay put.",
            tradeoff: "Recursive reversal uses O(n) stack space — iterative is safer for long lists."
          },
          traps: [
            {
              wrong: "Losing `curr.next` before rewiring",
              why: "You have no reference to the rest of the list.",
              right: "Save `next = curr.next` BEFORE `curr.next = prev`.",
              ex: "A NULL next pointer after one iteration."
            },
            {
              wrong: "Returning `head` instead of `prev`",
              why: "The original head is now the tail.",
              right: "`return prev;` after the loop.",
              ex: "[1,2,3] → returns a single node."
            }
          ],
          edgeCases: ["Empty list", "Single node", "Two nodes", "All same values", "k larger than list length"],
          java: [
            "`ListNode prev = null, curr = head;`",
            "Use a `ListNode dummy = new ListNode(0); dummy.next = head;` for edge-case-free splicing.",
            "Recursive reversal: stack depth = n — avoid for n > 10^4."
          ],
          followUps: [
            { q: "How do you reverse between positions m and n?", a: "Walk to m−1, reverse n−m+1 nodes, and reconnect both ends." },
            { q: "How do you reverse in k-groups?", a: "Count k nodes, reverse the segment, reconnect, and continue; if fewer than k remain, leave them." }
          ],
          recall: ["Save next before rewiring", "Return prev", "Dummy node for edges", "In-place O(1) space", "Iterative over recursive"]
        }
      },
      {
        title: "Merge & Sort",
        desc: "Merge two sorted lists with a dummy head; merge-sort the list for O(n log n).",
        tips: {
          recognition: {
            keywords: ["merge two sorted lists", "sort list", "merge k lists", "partition list"],
            signals: ["Combining sorted lists or sorting an unsorted linked list"],
            notFor: ["Insertion into an array → index-based"]
          },
          tricks: [
            "Dummy head removes the 'first node' branch.",
            "Compare heads, append the smaller, advance that list.",
            "After the loop, splice the remaining non-empty list in one step — no per-node loop.",
            "Merge sort: find the middle (fast/slow), cut, sort both halves, merge."
          ],
          optimization: {
            bottleneck: "Sorting with insertion sort is O(n²).",
            path: "Merge sort → O(n log n).",
            why: "Linked lists have O(1) merge but O(n) random access — merge sort exploits this.",
            tradeoff: "Merge sort uses O(log n) stack space; array quicksort is not applicable."
          },
          traps: [
            {
              wrong: "Forgetting the trailing splice after the merge loop",
              why: "The remaining elements are lost.",
              right: "`if (l1 != null) tail.next = l1; else tail.next = l2;`",
              ex: "[1,3] merged with [2,4,5] misses 5."
            },
            {
              wrong: "Not cutting the list at the middle before recursing",
              why: "Infinite recursion — the two halves overlap.",
              right: "`mid.next = null;` before sorting.",
              ex: "Two-node list recurses forever."
            }
          ],
          edgeCases: ["Empty lists", "One empty list", "Both empty", "All equal values", "Even vs odd length"],
          java: [
            "`ListNode dummy = new ListNode(0); ListNode tail = dummy;`",
            "Splice with `tail.next = (l1 != null) ? l1 : l2;`",
            "For merge sort, `slow.next = null` after finding the middle."
          ],
          followUps: [
            { q: "How do you merge k sorted lists?", a: "Min-heap of heads (K-Way Merge pattern) → O(n log k)." },
            { q: "Why is merge sort preferred over quicksort for lists?", a: "Lists have O(1) merge and O(n) random access — merge sort's strengths align better." }
          ],
          recall: ["Dummy head", "Compare and append smaller", "Splice remaining", "Mid via fast/slow", "Cut at mid before recursing"]
        }
      },
      {
        title: "Pointer Surgery",
        desc: "Remove, insert, swap pairs, reorder — all with pointer rewiring.",
        tips: {
          recognition: {
            keywords: ["remove nth from end", "swap pairs", "reorder list", "partition", "odd-even list"],
            signals: ["Modify the list structure in place", "Dummy node + multiple pointers"],
            notFor: ["Only the values matter → swap values"]
          },
          tricks: [
            "Two-pointer gap for 'remove nth from end': advance fast by n, then move both until fast is null.",
            "For 'swap pairs', use a dummy and rewire three links per pair.",
            "For 'reorder list', split at middle, reverse the second half, merge alternating.",
            "For 'partition', maintain two lists (before/after) and concatenate."
          ],
          optimization: {
            bottleneck: "Two passes for locating a node → one pass with a gap.",
            path: "Multi-pointer single-pass surgery.",
            why: "Pointers encode relative positions without extra memory.",
            tradeoff: "Complex pointer juggling — easy to introduce null-pointer bugs."
          },
          traps: [
            {
              wrong: "Not handling the case where the removed node is the head",
              why: "`head.next = ...` on the head with `prev = null` throws NPE.",
              right: "Use a dummy head.",
              ex: "Remove nth from end where n == length."
            },
            {
              wrong: "Losing the reconnection links during 'swap pairs'",
              why: "The pair's tail must point to the next pair's head.",
              right: "Track `prev`, `first`, `second` and rewire carefully.",
              ex: "[1,2,3,4] → only [2,1] survives."
            }
          ],
          edgeCases: ["Empty list", "Single node", "Two nodes", "n == length", "n == 1", "Odd vs even length"],
          java: [
            "`ListNode dummy = new ListNode(0); dummy.next = head;`",
            "Gap method: `for (int i = 0; i <= n; i++) fast = fast.next;`",
            "Guard `fast != null` before `fast = fast.next`."
          ],
          followUps: [
            { q: "How do you find the nth from end in one pass?", a: "Gap method: advance fast n steps, then move both until fast hits null." },
            { q: "How do you swap pairs without a dummy?", a: "Recursion: swap the first two, recurse on the rest." }
          ],
          recall: ["Dummy head for edge cases", "Gap for nth-from-end", "Rewire three links per swap", "Split-reverse-merge for reorder", "Guard null access"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Trie (Prefix Tree)",
    color: "card-teal",
    icon: "🌲",
    items: [
      {
        title: "Insert & Search",
        desc: "Children map per node; mark word ends with a boolean.",
        tips: {
          recognition: {
            keywords: ["prefix", "dictionary", "autocomplete", "starts with", "word search"],
            signals: ["Many strings share prefixes", "You need O(L) prefix queries"],
            notFor: ["Only exact matches → HashSet is simpler", "Small dictionary with no shared prefixes → hash map"]
          },
          tricks: [
            "`TrieNode` with `TrieNode[] children = new TrieNode[26]` (fast) or `HashMap<Character, TrieNode>` (flexible).",
            "`insert`: walk/create children, set `isEnd = true` at the last char.",
            "`search`: walk children; return `node.isEnd` at the end.",
            "`startsWith`: same walk but return `true` regardless of `isEnd`."
          ],
          optimization: {
            bottleneck: "HashSet cannot answer prefix queries.",
            path: "Trie → O(L) per operation, independent of the number of strings.",
            why: "Prefixes are shared structurally, so lookup cost depends only on the query length.",
            tradeoff: "26-way arrays cost 26 × nodeCount pointers; HashMaps save memory at the cost of speed."
          },
          traps: [
            {
              wrong: "Setting `isEnd` on intermediate nodes",
              why: "Prefix queries report false positives.",
              right: "Set `isEnd` only at the last character.",
              ex: "Inserting 'cat' and searching 'ca' returns true."
            },
            {
              wrong: "Null-checking children incorrectly",
              why: "NPE during search for a missing prefix.",
              right: "`if (node.children[c] == null) return false;`",
              ex: "Empty trie search crashes."
            }
          ],
          edgeCases: ["Empty string", "Single char", "Duplicate inserts", "Very long strings", "Unicode (use HashMap)"],
          java: [
            "`class TrieNode { TrieNode[] children = new TrieNode[26]; boolean isEnd; }`",
            "For Unicode: `HashMap<Character, TrieNode>`.",
            "`insert` is O(L); `search` and `startsWith` are O(L)."
          ],
          followUps: [
            { q: "How do you delete a word?", a: "Recursively unset `isEnd` and prune empty children on the way back up." },
            { q: "How do you find all words with a prefix?", a: "Walk to the prefix node, then DFS collecting all `isEnd` paths." }
          ],
          recall: ["Children array or map", "isEnd only at the last char", "O(L) per operation", "Null-check children", "HashMap for Unicode"]
        }
      },
      {
        title: "Prefix Search & Autocomplete",
        desc: "Walk to the prefix node, then DFS to collect completions.",
        tips: {
          recognition: {
            keywords: ["autocomplete", "search suggestions", "prefix matching", "top k frequent words"],
            signals: ["You need to enumerate all strings with a given prefix"],
            notFor: ["Only the count of prefix matches → store counts in nodes"]
          },
          tricks: [
            "Store extra metadata per node: `count`, `top3` suggestions, or a `List<String>` of completions.",
            "For 'top k frequent', maintain a min-heap per node or sort children by frequency at insert time.",
            "For 'search suggestions' (top 3), cache up to 3 strings per node to make queries O(prefix).",
            "Prune DFS when the result list reaches k."
          ],
          optimization: {
            bottleneck: "DFS per query can visit the whole subtree.",
            path: "Cache metadata at nodes → O(prefix + k).",
            why: "The expensive part is recomputed on every query; caching moves it to insert time.",
            tradeoff: "Extra memory per node proportional to the cached data."
          },
          traps: [
            {
              wrong: "DFS without pruning when k results suffice",
              why: "Visits the whole subtree unnecessarily.",
              right: "Stop after collecting k results.",
              ex: "10^6 words under the prefix → visiting all of them."
            }
          ],
          edgeCases: ["Empty prefix → all words", "Prefix with no matches", "k > total matches", "Duplicate inserts"],
          java: [
            "`List<String> suggestions` per node for top-3 caching.",
            "`PriorityQueue<String>` for top-k with a custom comparator.",
            "Avoid re-collecting strings — reuse the path buffer."
          ],
          followUps: [
            { q: "How do you find the longest common prefix?", a: "Walk the trie while exactly one child exists; the path is the answer." },
            { q: "How do you count words with a prefix?", a: "Store a `count` at each node; increment on insert." }
          ],
          recall: ["Metadata per node", "Cache top-k at insert time", "Prune DFS at k", "Longest common prefix = single-child walk"]
        }
      },
      {
        title: "Word Search / Dictionary",
        desc: "Trie of the dictionary + DFS on the grid.",
        tips: {
          recognition: {
            keywords: ["word search II", "dictionary on grid", "Boggle", "longest word in dictionary"],
            signals: ["Multiple words searched in a grid simultaneously"],
            notFor: ["Single-word search → plain DFS", "Words are independent → hash set"]
          },
          tricks: [
            "Build a trie of all words; DFS the grid with the trie node as state.",
            "Prune: stop when no child matches the current cell.",
            "Mark visited cells by mutating (`board[r][c] = '#'`) and restore on backtrack.",
            "Collect words at `isEnd` nodes and clear `isEnd` to avoid duplicates."
          ],
          optimization: {
            bottleneck: "Searching each word separately is O(W × cells × 4^L).",
            path: "Shared trie traversal → O(cells × 4^L), independent of W.",
            why: "The trie shares the DFS across all words with the same prefix.",
            tradeoff: "Trie memory is O(total characters); pruning is essential for large dictionaries."
          },
          traps: [
            {
              wrong: "Not removing matched words from the trie",
              why: "The same word is collected multiple times.",
              right: "Set `node.isEnd = false` (and optionally `node.word = null`) after collecting.",
              ex: "Grid contains 'aa' multiple times."
            },
            {
              wrong: "Restoring `visited` incorrectly on backtrack",
              why: "The grid is corrupted for subsequent searches.",
              right: "Store and restore the original character.",
              ex: "'#' chars persist and break later DFS."
            }
          ],
          edgeCases: ["Empty grid", "Empty dictionary", "Single cell", "Word longer than grid path", "Duplicate words in dictionary"],
          java: [
            "`char[][] board` — mutate in place for visited marking.",
            "`TrieNode` stores `String word` at the end for easy collection.",
            "Direction arrays: `int[][] dirs = {{0,1},{0,-1},{1,0},{-1,0}};`"
          ],
          followUps: [
            { q: "How do you find the longest word buildable from others?", a: "Sort words by length; use a trie to check if the word is composed of shorter dictionary words." },
            { q: "How do you avoid duplicate results?", a: "Clear `isEnd` / `word` after collecting, or use a `HashSet`." }
          ],
          recall: ["Build trie of dictionary", "DFS grid with trie state", "Mutate board for visited", "Clear isEnd after collecting", "Prune on missing child"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Sorting",
    color: "card-yellow",
    icon: "🧹",
    items: [
      {
        title: "Merge Sort",
        desc: "Divide, sort halves, merge. Stable, O(n log n) worst case.",
        tips: {
          recognition: {
            keywords: ["stable sort", "sort linked list", "count inversions", "external sort"],
            signals: ["You need guaranteed O(n log n) worst case", "Stability matters", "You want to count inversions"],
            notFor: ["You only need the top-k → heap or QuickSelect", "Memory is tight → in-place quicksort"]
          },
          tricks: [
            "Recurse on `[lo, mid]` and `[mid+1, hi]`, then merge into a temp array.",
            "Copy back only the merged range — not the whole array.",
            "Count inversions: when `right[j] < left[i]`, add `mid - i + 1` to the count.",
            "For linked lists, merge sort is preferred — find middle via fast/slow, cut, merge."
          ],
          optimization: {
            bottleneck: "Bubble/insertion sort are O(n²).",
            path: "Merge sort → O(n log n) guaranteed, stable.",
            why: "Each merge is O(n); log n levels of recursion.",
            tradeoff: "O(n) auxiliary space for the temp array (or O(log n) for linked lists)."
          },
          traps: [
            {
              wrong: "Not copying back the merged range",
              why: "The array remains partially unsorted.",
              right: "`for (int k = lo; k <= hi; k++) a[k] = temp[k];`",
              ex: "Only the first level sorts correctly."
            },
            {
              wrong: "Using `mid = (lo + hi) / 2`",
              why: "Overflow for large lo, hi.",
              right: "`mid = lo + (hi - lo) / 2`.",
              ex: "lo, hi near Integer.MAX_VALUE."
            }
          ],
          edgeCases: ["Empty array", "Single element", "Already sorted", "Reverse sorted", "Duplicates (stability test)"],
          java: [
            "`int[] temp = new int[a.length];` allocated once.",
            "For linked lists: `ListNode slow = head, fast = head.next;` to find the lower middle.",
            "`System.arraycopy` for bulk copies where possible."
          ],
          followUps: [
            { q: "Why is merge sort preferred for linked lists?", a: "O(1) merge for lists; quicksort's partitioning is O(n) per pivot on lists." },
            { q: "How do you count inversions?", a: "During merge, when a right element is smaller than the left, add the remaining left count." }
          ],
          recall: ["mid = lo + (hi − lo) / 2", "Recurse on both halves", "Merge into temp", "Copy back the range", "Count inversions during merge"]
        }
      },
      {
        title: "Quick Sort & QuickSelect",
        desc: "Partition around a pivot; recurse on smaller side. QuickSelect for k-th.",
        tips: {
          recognition: {
            keywords: ["kth largest", "kth smallest", "median", "partition", "in-place sort"],
            signals: ["You need the k-th element without full sorting", "In-place sort with O(1) space"],
            notFor: ["Stability matters → merge sort", "Worst-case guarantee needed → heap or merge sort"]
          },
          tricks: [
            "Lomuto partition: pivot at the end, `i` tracks the boundary of '< pivot'.",
            "Hoare partition: two pointers move inward, swapping out-of-place pairs.",
            "QuickSelect: recurse only into the half containing the k-th — average O(n).",
            "Randomize the pivot to avoid O(n²) on sorted input.",
            "For k-th largest, target index is `n - k` after ascending partition."
          ],
          optimization: {
            bottleneck: "Sorting is O(n log n); finding the k-th is O(n) with QuickSelect.",
            path: "Partition once, recurse only into the target half → O(n) average.",
            why: "Each partition halves the expected search space.",
            tradeoff: "O(n²) worst case (already-sorted input with a bad pivot) — randomize to avoid."
          },
          traps: [
            {
              wrong: "Recursing into both halves in QuickSelect",
              why: "Loses the O(n) average advantage.",
              right: "Recurse only into the half containing k.",
              ex: "Full quicksort is O(n log n), not O(n)."
            },
            {
              wrong: "Using the last element as pivot on sorted input",
              why: "Degenerates to O(n²).",
              right: "Randomize the pivot or use the median-of-three.",
              ex: "Sorted 10^5 elements → 10^10 operations."
            }
          ],
          edgeCases: ["Empty array", "Single element", "All equal elements", "Already sorted", "k = 1", "k = n"],
          java: [
            "`Random rand = new Random(); int pivot = lo + rand.nextInt(hi - lo + 1);`",
            "Hoare partition avoids O(n²) on all-equal input.",
            "Swap helper is essential for clarity."
          ],
          followUps: [
            { q: "Why does QuickSelect work?", a: "After partitioning, the pivot is in its final position; only one half can contain k." },
            { q: "How do you handle duplicate-heavy input?", a: "Use 3-way partitioning (Dutch Flag) to group equal elements." }
          ],
          recall: ["Random pivot", "Partition once", "QuickSelect: recurse into one half", "3-way for duplicates", "O(n) average, O(n²) worst"]
        }
      },
      {
        title: "Counting / Radix Sort",
        desc: "Non-comparison sorts for bounded integer ranges.",
        tips: {
          recognition: {
            keywords: ["sort colors", "counting sort", "radix sort", "small integer range", "O(n) sort"],
            signals: ["Values are small integers with a bounded range", "Comparisons are not required"],
            notFor: ["Values are floats or strings of arbitrary length", "Range is huge → counting array blows up"]
          },
          tricks: [
            "Counting sort: count frequencies, prefix-sum, then place — O(n + k).",
            "Radix sort: stable sort by each digit, least-significant first — O(d × (n + k)).",
            "Sort colors: 3-way partition (Dutch Flag) is the pattern-specific form.",
            "For negative values in counting sort, offset by the minimum."
          ],
          optimization: {
            bottleneck: "Comparison sort is Ω(n log n).",
            path: "Counting sort → O(n + k) when k is small.",
            why: "The value range bounds the work; no comparisons are made.",
            tradeoff: "O(k) extra space; useless for sparse large ranges."
          },
          traps: [
            {
              wrong: "Counting sort with a huge range",
              why: "`int[k]` allocation OOMs for k = 10^9.",
              right: "Use a comparison sort or radix sort.",
              ex: "Sorting IDs up to 10^9 with counting sort."
            },
            {
              wrong: "Counting sort without stability when required",
              why: "Pairs (value, originalIndex) lose order.",
              right: "Use the prefix-sum variant to make it stable.",
              ex: "Radix sort on objects breaks without stable counting."
            }
          ],
          edgeCases: ["Empty array", "All same value", "Negative values", "Max value equals min value", "Large value range"],
          java: [
            "`int[] count = new int[max - min + 1];` — offset by `min`.",
            "Prefix-sum pass to convert counts to positions.",
            "For radix sort, `10` buckets per digit; 10 passes for ints."
          ],
          followUps: [
            { q: "When is counting sort faster than comparison sort?", a: "When k = O(n) — O(n + k) beats O(n log n)." },
            { q: "How do you sort negative numbers?", a: "Offset by `min` before counting; or use radix sort with sign handling." }
          ],
          recall: ["O(n + k)", "Bounded range", "Offset for negatives", "Prefix-sum for stability", "Radix: per-digit stable sort"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Recursion",
    color: "card-teal",
    icon: "🌀",
    items: [
      {
        title: "Divide & Conquer",
        desc: "Split the problem, solve halves, combine results.",
        tips: {
          recognition: {
            keywords: ["divide and conquer", "split in half", "binary search", "merge sort", "closest pair"],
            signals: ["The problem decomposes into independent subproblems of the same type", "The combine step is cheaper than solving directly"],
            notFor: ["Subproblems overlap heavily → DP", "The split is not obvious → recursion with pruning (backtracking)"]
          },
          tricks: [
            "Identify three parts: split, recurse, combine. Write the combine step first.",
            "Base case at the smallest non-trivial size — `n == 0`, `n == 1`, or an empty range.",
            "Use `mid = lo + (hi - lo) / 2` to avoid overflow.",
            "If two subproblems are identical (e.g., Fibonacci), memoize — that's DP, not D&C."
          ],
          optimization: {
            bottleneck: "Naive recursion recomputes overlapping subproblems.",
            path: "D&C when subproblems are disjoint; DP when they overlap.",
            why: "D&C's complexity is `T(n) = a·T(n/b) + f(n)` — Master Theorem applies only without overlap.",
            tradeoff: "D&C uses O(log n) stack space; the combine step's cost dominates."
          },
          traps: [
            {
              wrong: "Recursing on identical subproblems without memoization",
              why: "Exponential blow-up.",
              right: "Detect overlap; switch to DP.",
              ex: "Fibonacci(40) takes ~10^9 calls without memoization."
            },
            {
              wrong: "Stack overflow on deep recursion",
              why: "Recursion depth = n for linear splits.",
              right: "Iterative or increase stack size (rarely acceptable).",
              ex: "n = 10^5 on a skewed split."
            }
          ],
          edgeCases: ["n = 0", "n = 1", "Already sorted input", "All equal elements", "Reverse-sorted input"],
          java: [
            "Prefer explicit stack for depth > 10^4.",
            "Avoid autoboxing in recursion — use primitive arrays.",
            "Tail recursion is not optimized in Java — convert if depth matters."
          ],
          followUps: [
            { q: "How do you analyze D&C complexity?", a: "Master Theorem: `T(n) = a·T(n/b) + f(n)`." },
            { q: "When should D&C become DP?", a: "When subproblems overlap — memoize or tabulate." }
          ],
          recall: ["Split, recurse, combine", "Base case first", "mid overflow-safe", "Overlap → DP", "Watch stack depth"]
        }
      },
      {
        title: "Tree Recursion",
        desc: "Recurse on left and right; combine results at the parent.",
        tips: {
          recognition: {
            keywords: ["tree", "binary tree", "subtree", "ancestor", "diameter", "height"],
            signals: ["The structure is a tree (or tree-like)", "The answer combines left and right subtree results"],
            notFor: ["The answer depends on the parent's state → pass it as a parameter", "Iterative traversal is easier"]
          },
          tricks: [
            "Base case: `if (node == null) return identity;` — decide the identity value (0, null, true).",
            "Return the value the parent needs; accumulate the global answer via a field or array.",
            "For 'diameter', return height up but update `maxDiameter` from `leftHeight + rightHeight`.",
            "For 'max path sum', return the best single-branch sum up but track the best two-branch sum globally."
          ],
          optimization: {
            bottleneck: "Recomputing subtree values at each node → O(n²) for skewed trees.",
            path: "Return subtree values from the recursion → O(n).",
            why: "Post-order position lets you combine child results exactly once.",
            tradeoff: "Global state via field/array — but must be reset between calls in multi-test environments."
          },
          traps: [
            {
              wrong: "Global variable not reset between test cases",
              why: "Leaked state gives wrong answers.",
              right: "Reset the field at the entry point, or pass a mutable `int[]`.",
              ex: "Second test case sees the first's accumulated max."
            },
            {
              wrong: "Recomputing `height(child)` inside the recursion",
              why: "O(n²) on skewed trees.",
              right: "Return height and use the returned value.",
              ex: "Linked-list-shaped tree."
            }
          ],
          edgeCases: ["Null root", "Single node", "Skewed tree", "All negative values", "Duplicate values"],
          java: [
            "Pass `int[] global = new int[1];` instead of a field when possible.",
            "For BST validation, use `long min, long max` bounds.",
            "Explicit `Deque` stack for deep trees."
          ],
          followUps: [
            { q: "How do you make tree recursion iterative?", a: "Explicit stack with pre/in/post markers; post-order needs a 'visited' flag." },
            { q: "How do you return multiple values from a subtree?", a: "Return a small array or use a `Pair` class." }
          ],
          recall: ["Base case identity", "Return what the parent needs", "Global answer via field/array", "Post-order for aggregation", "Reset globals"]
        }
      },
      {
        title: "Memoization",
        desc: "Cache subproblem results; convert exponential to polynomial.",
        tips: {
          recognition: {
            keywords: ["memoize", "cache", "overlapping subproblems", "top-down DP"],
            signals: ["The same subproblem is reached from multiple paths", "Brute-force recursion is exponential"],
            notFor: ["Subproblems are disjoint (pure D&C)", "The state space is small enough for tabulation"]
          },
          tricks: [
            "Signature: `memo(key) -> value`; use an array for numeric keys, a HashMap for tuple keys.",
            "Initialize memo to a sentinel (`-1`, `Integer.MIN_VALUE`) that cannot be a real answer.",
            "Return the cached value BEFORE recomputing.",
            "For 2D DP, `int[][] memo` filled with `-1` — remember to fill it.",
            "Convert to tabulation (bottom-up) when the dependency order is clear."
          ],
          optimization: {
            bottleneck: "Exponential recursion re-explores states.",
            path: "Memoize → each state computed once.",
            why: "Top-down DP pays the recursion cost once per state instead of once per path.",
            tradeoff: "Memoization uses stack + map; tabulation uses a table but no stack."
          },
          traps: [
            {
              wrong: "Using 0 as the memo sentinel when 0 is a valid answer",
              why: "The cached value is indistinguishable from 'not computed'.",
              right: "Use −1 or `Integer.MIN_VALUE` as the sentinel.",
              ex: "Paths with sum 0 return 'not cached' forever."
            },
            {
              wrong: "Forgetting to memoize one recursive branch",
              why: "Only half the states are cached.",
              right: "Memoize every recursive return.",
              ex: "Exponential still — just with a smaller constant."
            }
          ],
          edgeCases: ["Empty input", "Base case returns a cached value", "Sentinel collision with valid values", "Large state space"],
          java: [
            "`int[] memo = new int[n + 1]; Arrays.fill(memo, -1);`",
            "`HashMap<String, Integer>` for tuple states — but consider a 2D array for speed.",
            "For boolean states, use `Boolean[]` with null = uncomputed."
          ],
          followUps: [
            { q: "When is tabulation better?", a: "When the dependency order is clear and stack depth is a concern." },
            { q: "How do you memoize with multiple parameters?", a: "Use a multi-dimensional array or encode the tuple into a single key." }
          ],
          recall: ["Sentinel ≠ valid answer", "Check memo before recompute", "Cache every recursive return", "HashMap for tuples", "Consider tabulation"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Arrays",
    color: "card-green",
    icon: "📊",
    items: [
      {
        title: "Prefix & Suffix Arrays",
        desc: "Precompute cumulative aggregates for O(1) range queries.",
        tips: {
          recognition: {
            keywords: ["product of array except self", "range sum", "range product", "precompute", "left/right arrays"],
            signals: ["Multiple queries over ranges of a static array", "The aggregate is associative (sum, product, XOR)"],
            notFor: ["The array is mutated → use a Fenwick tree", "The aggregate is not invertible (max/min) → sparse table"]
          },
          tricks: [
            "`prefix[i] = prefix[i-1] + a[i-1]` with `prefix[0] = 0` — 1-indexed removes branches.",
            "Suffix arrays: `suffix[i] = suffix[i+1] + a[i]` with `suffix[n] = 0`.",
            "For 'product except self', `result[i] = prefixProduct[i] * suffixProduct[i+1]`.",
            "Skip the extra suffix array by reusing `result` and a running variable.",
            "Use `long` for sums/products to prevent overflow."
          ],
          optimization: {
            bottleneck: "Range queries are O(n) each → O(n·q) total.",
            path: "Precompute → O(n) build, O(1) query.",
            why: "Aggregates are associative and invertible; range = prefix[R] − prefix[L].",
            tradeoff: "O(n) extra space; static only."
          },
          traps: [
            {
              wrong: "0-indexed prefix causing off-by-one",
              why: "`prefix[R] - prefix[L]` excludes a[R].",
              right: "`prefix[R + 1] - prefix[L]`.",
              ex: "sum(0..0) of [5] returns 0."
            },
            {
              wrong: "Ignoring zeros in product problems",
              why: "Division by zero during a 'product except self' shortcut.",
              right: "Use prefix and suffix products.",
              ex: "[1,2,0,4] — division blows up."
            }
          ],
          edgeCases: ["Empty array", "Single element", "Contains zeros", "All negatives", "Overflow"],
          java: [
            "`int[] prefix = new int[n + 1];` — +1 removes the bounds branch.",
            "`long` for products and large sums.",
            "In-place trick: write into the result array to save space."
          ],
          followUps: [
            { q: "How do you compute 'product except self' in O(1) space?", a: "Left-to-right running product into `result`; right-to-left running product multiplies into `result`." },
            { q: "What if the array is mutable?", a: "Fenwick tree or segment tree — O(log n) per update." }
          ],
          recall: ["prefix[0] = 0", "prefix[i+1] = prefix[i] + a[i]", "sum(L..R) = prefix[R+1] − prefix[L]", "Suffix from the right", "long for overflow"]
        }
      },
      {
        title: "In-Place Array Manipulation",
        desc: "Two pointers, swaps, and overwrites — O(1) space.",
        tips: {
          recognition: {
            keywords: ["in-place", "O(1) space", "move zeroes", "remove duplicates", "rotate array"],
            signals: ["The problem explicitly forbids extra arrays", "Elements must be rearranged without copies"],
            notFor: ["The output requires a new structure → copy"]
          },
          tricks: [
            "Two-pointer overwrite: `slow` writes, `fast` reads.",
            "Swaps preserve values; overwrites discard them — choose based on what must survive.",
            "Array rotation: reverse the whole, then reverse the first k, then reverse the rest.",
            "For 'move zeroes', swap `slow` (non-zero boundary) with `fast` when `a[fast] != 0`.",
            "For 'sort colors', use the Dutch Flag 3-pointer."
          ],
          optimization: {
            bottleneck: "`ArrayList.remove` shifts elements → O(n²).",
            path: "Overwrite or swap in place → O(n).",
            why: "Each element is written at most once.",
            tradeoff: "Swaps preserve the tail; overwrites may leave stale values past the returned length."
          },
          traps: [
            {
              wrong: "Rotating with a temp array",
              why: "Defeats the O(1) space requirement.",
              right: "Reversal trick or cycle swaps.",
              ex: "Problem explicitly requires O(1) extra space."
            },
            {
              wrong: "Overwriting without saving when order matters",
              why: "Original values are lost.",
              right: "Swap instead of overwrite.",
              ex: "'Move zeroes' with overwrite loses non-zero values."
            }
          ],
          edgeCases: ["Empty array", "Single element", "All zeros", "No zeros", "k > n for rotation", "All same value"],
          java: [
            "Return `slow` for 'compact' style problems — the judge reads only the first `slow` elements.",
            "`swap(int[] a, int i, int j)` helper.",
            "Rotation: `k %= n` before reversing."
          ],
          followUps: [
            { q: "How do you rotate by k in O(1) space?", a: "Reverse whole, reverse first k, reverse the rest." },
            { q: "When should you swap vs overwrite?", a: "Swap when all values must survive; overwrite when the problem returns a new logical length." }
          ],
          recall: ["slow writes, fast reads", "Swap vs overwrite", "Reverse trick for rotation", "k %= n", "Return slow"]
        }
      },
      {
        title: "2D Array Tricks",
        desc: "Index math, direction arrays, and in-place traversal.",
        tips: {
          recognition: {
            keywords: ["matrix", "grid", "2D array", "spiral", "rotate", "transpose"],
            signals: ["Row/column operations", "Grid traversal with directions"],
            notFor: ["The grid is actually a graph → BFS/DFS on grids"]
          },
          tricks: [
            "Transpose + reverse each row = rotate 90° clockwise.",
            "Transpose + reverse each column = rotate 90° counter-clockwise.",
            "Reverse rows + transpose = rotate 90° counter-clockwise (alternative).",
            "Spiral order: maintain four boundaries `top, bottom, left, right` and shrink.",
            "Direction arrays: `int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};`",
            "Flatten: `id = r * cols + c`; unflatten: `r = id / cols, c = id % cols`."
          ],
          optimization: {
            bottleneck: "Allocating a second matrix for rotation is O(mn) space.",
            path: "In-place transpose + reverse → O(1) space.",
            why: "Transpose swaps `a[i][j]` with `a[j][i]` for `j > i`; reversal is O(1) swap per pair.",
            tradeoff: "In-place rotation requires a square matrix."
          },
          traps: [
            {
              wrong: "Iterating the transpose with `j < cols` instead of `j < i`",
              why: "Double-swaps undo the transpose.",
              right: "`for (int j = 0; j < i; j++) swap(a[i][j], a[j][i]);`",
              ex: "Transposed matrix equals the original."
            },
            {
              wrong: "Rotating a non-square matrix in place",
              why: "Dimensions differ; in-place rotation is not defined.",
              right: "Allocate a new matrix or only support square input.",
              ex: "2×3 → 3×2 cannot be in-place."
            }
          ],
          edgeCases: ["Empty matrix", "Single row", "Single column", "1×1", "Non-square", "Zeros and negatives"],
          java: [
            "`int rows = a.length, cols = a[0].length;` — assume rectangular.",
            "Direction arrays for grid BFS/DFS.",
            "`Arrays.fill` for row-wise reset."
          ],
          followUps: [
            { q: "How do you rotate a non-square matrix?", a: "Allocate a new matrix: `newMatrix[c][rows - 1 - r] = oldMatrix[r][c]`." },
            { q: "How do you spiral-traverse a matrix?", a: "Four boundaries; shrink each after traversing its row/column." }
          ],
          recall: ["Transpose + reverse for rotation", "j < i in transpose", "Four boundaries for spiral", "Direction arrays", "Flatten with r * cols + c"]
        }
      }
    ]
  },

  /* --------------------------------------------------------------------- */
  {
    category: "Strings",
    color: "card-orange",
    icon: "🔤",
    items: [
      {
        title: "Palindrome Checks",
        desc: "Two pointers from both ends; expand around a center for longest.",
        tips: {
          recognition: {
            keywords: ["palindrome", "valid palindrome", "longest palindromic substring", "palindromic partition"],
            signals: ["Symmetry around the center", "You need to compare characters from both ends"],
            notFor: ["You need palindromic subsequences → DP", "Only a boolean check → two pointers"]
          },
          tricks: [
            "Boolean check: two pointers from both ends.",
            "Longest palindromic SUBSTRING: expand around each center (2n−1 centers).",
            "Longest palindromic SUBSEQUENCE: `LCS(s, reverse(s))` or the `dp[i][j]` interval DP.",
            "Skip non-alphanumeric characters with two `while` loops."
          ],
          optimization: {
            bottleneck: "Checking all substrings is O(n³) or O(n²) with the palindrome DP.",
            path: "Expand around centers → O(n²) time, O(1) space.",
            why: "Each palindrome has a unique center; expanding verifies in linear time.",
            tradeoff: "Manacher's algorithm gives O(n) but is complex — rarely required."
          },
          traps: [
            {
              wrong: "Conflating substring and subsequence",
              why: "Substring must be contiguous; subsequence may skip characters.",
              right: "Contiguous → expand around center; non-contiguous → DP.",
              ex: "'abcba' vs 'abccba' — the longest palindromic substring and subsequence differ."
            },
            {
              wrong: "Comparing `Character.toLowerCase` only on one side",
              why: "Case mismatch causes false negatives.",
              right: "Normalize both sides.",
              ex: "\"Aa\" should be a palindrome."
            }
          ],
          edgeCases: ["Empty string", "Single char", "All same chars", "Non-alphanumeric only", "Unicode"],
          java: [
            "`Character.isLetterOrDigit(c)` for filtering.",
            "`s.charAt(i)` returns a `char` primitive — no boxing.",
            "`StringBuilder` for building results; `toString()` once."
          ],
          followUps: [
            { q: "How do you find the longest palindromic substring?", a: "Expand around 2n−1 centers; track the max length." },
            { q: "Can you partition into palindromes?", a: "DP `dp[i] = min cuts for s[0..i]`, checking each suffix with the palindrome DP table." }
          ],
          recall: ["Two pointers for boolean check", "Expand around center for longest", "Substring ≠ subsequence", "Normalize case", "Manacher's O(n) rarely needed"]
        }
      },
      {
        title: "String Parsing",
        desc: "Walk characters; handle delimiters, whitespace, and multi-digit tokens.",
        tips: {
          recognition: {
            keywords: ["parse", "tokenize", "split", "atoi", "reverse words", "format"],
            signals: ["Character-by-character processing", "Whitespace or delimiter handling"],
            notFor: ["Simple delimiter split suffices → `split` API"]
          },
          tricks: [
            "Accumulate characters until a delimiter; then process the token.",
            "`StringBuilder` for building output; `toString()` once at the end.",
            "For reverse-words: split by whitespace, reverse the array, join with a single space.",
            "For atoi: skip leading whitespace, handle sign, accumulate digits, clamp on overflow.",
            "Use `\s+` regex carefully — trim first to avoid empty tokens."
          ],
          optimization: {
            bottleneck: "Repeated `String` concatenation is O(n²).",
            path: "`StringBuilder` → O(n).",
            why: "Strings are immutable; every concat allocates a new array.",
            tradeoff: "`String.split` allocates arrays of substrings — fine for one-off, bad in loops."
          },
          traps: [
            {
              wrong: "Using `+=` inside a loop",
              why: "O(n²) — each concat copies the entire string.",
              right: "`StringBuilder.append`.",
              ex: "Concatenating 10^5 characters this way takes seconds."
            },
            {
              wrong: "Ignoring leading whitespace in atoi",
              why: "First char is ' ' → parsed value is 0.",
              right: "Skip whitespace before processing the sign.",
              ex: "\" 42\" should return 42."
            }
          ],
          edgeCases: ["Empty string", "Only whitespace", "Leading sign", "Leading zeros", "Overflow", "Trailing whitespace"],
          java: [
            "`StringBuilder sb = new StringBuilder();`",
            "`s.trim()` removes leading and trailing whitespace.",
            "`Long.parseLong` for overflow detection before casting to int.",
            "Use `s.toCharArray()` for repeated `charAt` access."
          ],
          followUps: [
            { q: "How do you reverse words in a string?", a: "Split on whitespace, reverse the token list, join with single spaces." },
            { q: "How do you handle integer overflow in atoi?", a: "Clamp to `Integer.MIN_VALUE`/`MAX_VALUE` when the accumulated value exceeds the bound." }
          ],
          recall: ["StringBuilder, not +=", "Skip whitespace first", "Sign before digits", "Clamp on overflow", "charAt → toCharArray for hot loops"]
        }
      },
      {
        title: "Anagrams & Frequency",
        desc: "Character frequency arrays or sort both strings.",
        tips: {
          recognition: {
            keywords: ["anagram", "permutation", "character count", "group anagrams", "same characters"],
            signals: ["Comparison based on character multiset", "Order does not matter"],
            notFor: ["Order matters (subsequence/substring) → sliding window"]
          },
          tricks: [
            "`int[26]` frequency arrays; compare arrays or increment/decrement.",
            "Group anagrams: sort each string and use it as a hash-map key.",
            "Or use the frequency array encoded as a String key.",
            "For 'valid anagram' with one string at a time, increment one and decrement the other; all zeros means match.",
            "For streaming anagrams, maintain a diff counter to avoid array comparison."
          ],
          optimization: {
            bottleneck: "Sorting both strings is O(n log n).",
            path: "Frequency array → O(n).",
            why: "Anagrams have identical character counts — order is irrelevant.",
            tradeoff: "`int[26]` only works for lowercase ASCII; use `HashMap` for Unicode."
          },
          traps: [
            {
              wrong: "Sorting strings to compare anagrams in a large collection",
              why: "O(n log n) per string; slow at scale.",
              right: "Frequency array encoded as a key → O(n).",
              ex: "10^4 strings × O(n log n) becomes slow."
            },
            {
              wrong: "Using `HashMap<Character, Integer>` for lowercase-only",
              why: "Slower than `int[26]` and boxes chars.",
              right: "`int[26]` for ASCII.",
              ex: "Autoboxing overhead in hot loops."
            }
          ],
          edgeCases: ["Empty strings", "Single char", "Unicode characters", "Case sensitivity", "Different lengths (immediate false)"],
          java: [
            "`int[] freq = new int[26]; freq[c - 'a']++;`",
            "For grouping, `HashMap<String, List<String>>` with the sorted string as the key.",
            "`Arrays.equals(freqA, freqB)` compares two int arrays.",
            "`Arrays.hashCode(freq)` for a cheap key (careful: collisions are possible)."
          ],
          followUps: [
            { q: "How do you find all anagrams of a pattern in a string?", a: "Sliding window of length `pattern.length()` with frequency comparison." },
            { q: "How do you handle Unicode anagrams?", a: "Use `HashMap<Character, Integer>` or `HashMap<CodePoint, Integer>`." }
          ],
          recall: ["int[26] for ASCII", "Sort or frequency for grouping", "Arrays.equals compares", "Streaming: diff counter", "HashMap for Unicode"]
        }
      }
    ]
  }
];