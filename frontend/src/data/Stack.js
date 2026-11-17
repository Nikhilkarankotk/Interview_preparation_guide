// ============================================================
// VALID PARENTHESES — The Matching Game
// ============================================================
export const validParentheses = {
  id: 'valid-parentheses',
  patternId: 'stack',
  title: 'Valid Parentheses',
  subtitle: 'The Matching Game',
  type: 'valid-parentheses',
  difficulty: 'Easy',

  coreConcept: {
    what: 'Use a Stack to keep track of opening brackets. When a closing bracket is found, check if it matches the most recent opening bracket.',
    why: 'Stacks naturally enforce LIFO order, which is exactly how brackets nest. The most recently opened bracket must be the first one closed.',
    when: 'When validating nested structures like brackets, HTML tags, or any paired symbols.',
    properties: [
      'Push opening brackets onto the stack.',
      'Pop when a matching closing bracket appears.',
      'If the stack is empty at the end, the string is valid.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Valid parentheses/brackets".',
      '"Balanced" or "Well-formed" strings.',
      'Nested structures that must close in reverse order.',
    ],
    inputs: ['String containing brackets'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Push the First Opening Bracket',
      explanation: 'We scan left to right. Index 0 is "(", an opening bracket, so we push it onto the stack. The stack now holds ["("]. WHY: the stack remembers every opener that is still waiting for a closer. LIFO guarantees the most recent opener will be checked first.',
      state: { string: '({[()]})', currentIdx: 0, stack: ['('], action: 'Push "(" onto the stack.' },
    },
    {
      id: 1,
      title: 'Push the Second Opening Bracket',
      explanation: 'Index 1 is "{". We push it. Stack is ["(", "{"]. WHY: nesting means the newest opener "{" must close before the older opener "(". The stack order encodes that obligation.',
      state: { string: '({[()]})', currentIdx: 1, stack: ['(', '{'], action: 'Push "{" onto the stack.' },
    },
    {
      id: 2,
      title: 'Push the Third Opening Bracket',
      explanation: 'Index 2 is "[". We push it. Stack is ["(", "{", "["]. The stack now mirrors the exact nesting depth: 3 open brackets waiting for 3 closes in reverse order.',
      state: { string: '({[()]})', currentIdx: 2, stack: ['(', '{', '['], action: 'Push "[" onto the stack.' },
    },
    {
      id: 3,
      title: 'Push the Innermost Opening Bracket',
      explanation: 'Index 3 is "(". We push it. Stack is ["(", "{", "[", "("]. This is the deepest nesting level, so this "(" must be the first opener to receive its closing partner.',
      state: { string: '({[()]})', currentIdx: 3, stack: ['(', '{', '[', '('], action: 'Push "(" onto the stack.' },
    },
    {
      id: 4,
      title: 'First Closing Bracket — Match and Pop',
      explanation: 'Index 4 is ")". We compare it with the top of the stack, which is "(". They match, so we pop "(". Stack becomes ["(", "{", "["]. WHY: this ")" closes the "(" opened at index 3 because that "(" was the most recent opener — exactly what LIFO enforces.',
      state: { string: '({[()]})', currentIdx: 4, stack: ['(', '{', '['], action: 'Match ")" with "(". Pop the top.' },
    },
    {
      id: 5,
      title: 'Second Closing Bracket — Match and Pop',
      explanation: 'Index 5 is "]". The top of the stack is "[". They match, so we pop it. Stack becomes ["(", "{"]. WHY: the "]" correctly closes the "[" from index 2, the next most recent unmatched opener.',
      state: { string: '({[()]})', currentIdx: 5, stack: ['(', '{'], action: 'Match "]" with "[". Pop the top.' },
    },
    {
      id: 6,
      title: 'Third Closing Bracket — Match and Pop',
      explanation: 'Index 6 is "}". The top of the stack is "{". They match, so we pop it. Stack becomes ["("]. The nesting is unwinding in perfect reverse order.',
      state: { string: '({[()]})', currentIdx: 6, stack: ['('], action: 'Match "}" with "{". Pop the top.' },
    },
    {
      id: 7,
      title: 'Final Closing Bracket — Match and Pop',
      explanation: 'Index 7 is ")". The top of the stack is "(". They match, so we pop it. Stack becomes []. WHY: the oldest opener is closed last, which is the defining property of well-formed nesting.',
      state: { string: '({[()]})', currentIdx: 7, stack: [], action: 'Match ")" with "(". Pop the top.' },
    },
    {
      id: 8,
      title: 'End of Input — Stack Must Be Empty',
      explanation: 'All 8 characters are processed. The stack is empty, so every opening bracket found a matching close in the correct order. Return true. WHY: if any opener remained on the stack, it was never closed and the string would be invalid. The other failure mode is caught during the scan: a closing bracket with an empty stack, or a closing bracket that does not match the stack top, returns false immediately.',
      state: { string: '({[()]})', currentIdx: 8, stack: [], action: 'Stack empty. Return true.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class ValidParentheses {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        
        for (char c : s.toCharArray()) {
            if (c == '(') stack.push(')');
            else if (c == '{') stack.push('}');
            else if (c == '[') stack.push(']');
            else if (stack.isEmpty() || stack.pop() != c) {
                return false;
            }
        }
        return stack.isEmpty();
    }
}`,

  javaExplanation: [
    { line: 'if (c == \'(\') stack.push(\')\');', note: 'Smart trick: push the EXPECTED closing bracket instead of the opening one.' },
    { line: 'else if (stack.isEmpty() || stack.pop() != c)', note: 'If we see a closing bracket but the stack is empty, or it doesn\'t match the expected, it\'s invalid.' },
    { line: 'return stack.isEmpty();', note: 'If there are leftover opening brackets, it\'s invalid.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'We process each character exactly once. The stack can hold up to N characters.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(1)',
    note: 'Repeatedly remove "()", "[]", and "{}" substrings until no more can be removed.',
  },

  commonMistakes: [
    { title: 'Forgetting the empty check', detail: 'If you see a closing bracket and the stack is empty, calling `pop()` will throw an exception.' },
  ],

  interviewQuestions: [
    { level: 'Easy', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/' },
    { level: 'Medium', title: 'Generate Parentheses', url: 'https://leetcode.com/problems/generate-parentheses/' },
    { level: 'Hard', title: 'Longest Valid Parentheses', url: 'https://leetcode.com/problems/longest-valid-parentheses/' },
  ],

  quickRevision: [
    'Use a Stack.',
    'Push expected closing brackets.',
    'Pop and compare on closing brackets.',
    'Stack must be empty at the end.',
  ],
};

// ============================================================
// MIN STACK — The Auxiliary Stack
// ============================================================
export const minStack = {
  id: 'min-stack',
  patternId: 'stack',
  title: 'Min Stack',
  subtitle: 'The Auxiliary Stack',
  type: 'min-stack',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Design a stack that supports push, pop, top, and retrieving the minimum element in O(1) time.',
    why: 'If you just track one `min` variable, popping the minimum element breaks your O(1) lookup. You need a second stack (an auxiliary stack) that tracks the minimum at every level.',
    when: 'When you need constant-time access to an extreme value (min/max) in a dynamic data structure.',
    properties: [
      'Two stacks: Main stack and Min stack.',
      'Min stack only pushes if the new value is <= current min.',
      'Both stacks pop together if their tops match.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Design a stack that supports... in O(1) time".',
      '"Get minimum element in constant time".',
    ],
    inputs: ['Operations sequence'],
    constraints: ['O(1) time for all operations'],
  },

  steps: [
    {
      id: 0,
      title: 'Push 5 — First Element',
      explanation: 'Main stack is empty. We push 5. The Min stack is also empty, so 5 is trivially the current minimum and is pushed there too. WHY: the Min stack must have exactly one entry per active minimum candidate so getMin can read the top in O(1).',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 0, stack: [5], minStack: [5], action: 'Push 5 to both stacks.',
      },
    },
    {
      id: 1,
      title: 'Push 3 — New Minimum',
      explanation: 'Push 3 to Main. Compare with the Min stack top (5). Since 3 <= 5, 3 becomes the new minimum, so we also push 3 to Min. WHY: getMin must return 3 from now on, and the Min stack top is the source of truth.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 1, stack: [5, 3], minStack: [5, 3], action: '3 <= 5. Push to both stacks.',
      },
    },
    {
      id: 2,
      title: 'Push 7 — Not a Minimum',
      explanation: 'Push 7 to Main. Compare with the Min stack top (3). Since 7 <= 3 is false, we do NOT push to Min. WHY: 7 cannot become the minimum while 3 is still inside the stack, so adding it to Min would only waste space and risk incorrect pops later.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 2, stack: [5, 3, 7], minStack: [5, 3], action: '7 is not smaller. Push only to Main.',
      },
    },
    {
      id: 3,
      title: 'Push 3 — Duplicate Minimum',
      explanation: 'Push 3 to Main. Compare with the Min stack top (3). Since 3 <= 3 is true, we push 3 to Min as well. WHY: using <= (not <) is critical. If we skip duplicates, popping one 3 from Main would also pop the only 3 in Min, and getMin would incorrectly report an older minimum even though another 3 still exists.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 3, stack: [5, 3, 7, 3], minStack: [5, 3, 3], action: '3 <= 3. Push the duplicate to both.',
      },
    },
    {
      id: 4,
      title: 'getMin — Read the Top',
      explanation: 'The current minimum is the top of the Min stack, which is 3. No scanning is needed. WHY: the Min stack was maintained so that its top always equals the minimum of all elements currently in Main.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 4, stack: [5, 3, 7, 3], minStack: [5, 3, 3], action: 'Return Min.top() = 3.',
      },
    },
    {
      id: 5,
      title: 'Pop — Remove the Top 3',
      explanation: 'Pop from Main removes 3. Since the Min stack top is also 3, we pop Min too. Main becomes [5, 3, 7] and Min becomes [5, 3]. WHY: the element being removed was the active minimum, so the auxiliary record for that minimum must be removed in lockstep.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 5, stack: [5, 3, 7], minStack: [5, 3], action: 'Tops match at 3. Pop both stacks.',
      },
    },
    {
      id: 6,
      title: 'getMin — Minimum After Pop',
      explanation: 'The Min stack top is now 3. The duplicate 3 pushed at step 3 is doing its job: it preserves the correct minimum even after the first 3 was removed.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 6, stack: [5, 3, 7], minStack: [5, 3], action: 'Return Min.top() = 3.',
      },
    },
    {
      id: 7,
      title: 'Pop 7 — No Min Change',
      explanation: 'Pop from Main removes 7. The Min stack top is 3, which does not match 7, so we do NOT pop Min. Main becomes [5, 3]. WHY: 7 was never recorded as a minimum candidate, so removing it cannot affect the minimum.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 7, stack: [5, 3], minStack: [5, 3], action: 'Tops differ (7 vs 3). Pop Main only.',
      },
    },
    {
      id: 8,
      title: 'getMin — Still 3',
      explanation: 'The Min stack top is 3, so getMin returns 3. The two stacks remain synchronized with respect to minimum candidates.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 8, stack: [5, 3], minStack: [5, 3], action: 'Return Min.top() = 3.',
      },
    },
    {
      id: 9,
      title: 'Push 1 — New Global Minimum',
      explanation: 'Push 1 to Main. Compare with the Min stack top (3). Since 1 <= 3, we push 1 to Min. The new minimum is 1. WHY: every new value that ties or beats the current minimum must be recorded so future pops can restore the correct minimum.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 9, stack: [5, 3, 1], minStack: [5, 3, 1], action: '1 <= 3. Push to both stacks.',
      },
    },
    {
      id: 10,
      title: 'getMin — Return 1',
      explanation: 'The Min stack top is 1, so getMin returns 1. All four required operations — push, pop, top, getMin — have now been demonstrated in O(1) time.',
      state: {
        operations: ['push(5)', 'push(3)', 'push(7)', 'push(3)', 'getMin', 'pop', 'getMin', 'pop', 'getMin', 'push(1)', 'getMin'],
        currentIdx: 10, stack: [5, 3, 1], minStack: [5, 3, 1], action: 'Return Min.top() = 1.', found: true,
      },
    },
  ],

  javaCode: `import java.util.Stack;

public class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }

    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }

    public void pop() {
        if (stack.peek().equals(minStack.peek())) {
            minStack.pop();
        }
        stack.pop();
    }

    public int top() {
        return stack.peek();
    }

    public int getMin() {
        return minStack.peek();
    }
}`,

  javaExplanation: [
    { line: 'if (minStack.isEmpty() || val <= minStack.peek())', note: 'Only track the new value if it ties or beats the current minimum.' },
    { line: 'if (stack.peek().equals(minStack.peek()))', note: 'If we are removing the element that is currently the minimum, we must remove it from the minStack too.' },
    { line: 'return minStack.peek();', note: 'The top of the minStack is always the minimum of the main stack.' },
  ],

  complexity: {
    time: 'O(1)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'All operations are O(1). In the worst case (descending order), the minStack takes O(N) space.',
  },

  bruteForce: {
    time: 'O(N) for getMin',
    space: 'O(1)',
    note: 'Search the entire stack for the minimum element every time getMin is called.',
  },

  commonMistakes: [
    { title: 'Using < instead of <=', detail: 'If you use `<`, duplicate minimums will not be pushed to the minStack. When you pop one minimum, the minStack will lose it entirely, even though another one still exists in the main stack.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/' },
    { level: 'Hard', title: 'Max Stack', url: 'https://leetcode.com/problems/max-stack/' },
  ],

  quickRevision: [
    'Two stacks: Main and Min.',
    'Push to Min if val <= current min.',
    'Pop Min if tops match.',
    'getMin() is Min.top().',
  ],
};

// ============================================================
// EVALUATE RPN — The Calculator
// ============================================================
export const evaluateRPN = {
  id: 'evaluate-rpn',
  patternId: 'stack',
  title: 'Evaluate RPN',
  subtitle: 'The Calculator',
  type: 'evaluate-rpn',
  difficulty: 'Medium',

  coreConcept: {
    what: 'Evaluate Reverse Polish Notation (postfix expression) using a Stack.',
    why: 'In RPN, operators come after their operands. When we see an operator, the top two elements on the stack are the operands.',
    when: 'Expression evaluation, building calculators, compilers.',
    properties: [
      'Push numbers onto the stack.',
      'When an operator is found, pop two numbers, calculate, and push the result.',
      'The final result is the only item left on the stack.',
    ],
  },

  patternRecognition: {
    clues: [
      '"Evaluate Reverse Polish Notation".',
      'Expression evaluation with postfix notation.',
    ],
    inputs: ['Array of strings representing numbers and operators'],
    constraints: ['O(N) time', 'O(N) space'],
  },

  steps: [
    {
      id: 0,
      title: 'Push 10',
      explanation: 'Token 0 is the number "10". Numbers are operands, so we push 10. Stack is [10]. WHY: RPN delivers operands before their operators, so the stack stores pending operands until an operator consumes them.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 0, stack: [10], action: 'Push 10.' },
    },
    {
      id: 1,
      title: 'Push 6',
      explanation: 'Token 1 is "6". Push it. Stack is [10, 6]. The stack now holds two pending operands.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 1, stack: [10, 6], action: 'Push 6.' },
    },
    {
      id: 2,
      title: 'Push 9',
      explanation: 'Token 2 is "9". Push it. Stack is [10, 6, 9]. No operator has appeared yet, so all three values remain pending.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 2, stack: [10, 6, 9], action: 'Push 9.' },
    },
    {
      id: 3,
      title: 'Push 3',
      explanation: 'Token 3 is "3". Push it. Stack is [10, 6, 9, 3]. The next token is an operator, and the top two values will become its operands.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 3, stack: [10, 6, 9, 3], action: 'Push 3.' },
    },
    {
      id: 4,
      title: 'Operator + — Pop Two, Push Result',
      explanation: 'Token 4 is "+". Pop the right operand 3, then the left operand 9. Compute 9 + 3 = 12 and push 12. Stack becomes [10, 6, 12]. WHY: the first pop is the right operand and the second pop is the left operand — for addition the order is symmetric, but this discipline must be consistent for every operator.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 4, stack: [10, 6, 12], action: '9 + 3 = 12. Push 12.' },
    },
    {
      id: 5,
      title: 'Push -11',
      explanation: 'Token 5 is "-11". Push it. Stack is [10, 6, 12, -11]. The next operator will combine -11 with 12.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 5, stack: [10, 6, 12, -11], action: 'Push -11.' },
    },
    {
      id: 6,
      title: 'Operator * — Multiply Top Two',
      explanation: 'Token 6 is "*". Pop -11 (right) and 12 (left). Compute 12 * -11 = -132 and push it. Stack becomes [10, 6, -132]. WHY: multiplication is commutative, but we still respect the right-then-left pop order so the same code works for every operator.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 6, stack: [10, 6, -132], action: '12 * -11 = -132. Push -132.' },
    },
    {
      id: 7,
      title: 'Operator / — Order Matters',
      explanation: 'Token 7 is "/". Pop -132 (right) and 6 (left). Integer division truncates toward zero, so 6 / -132 = 0. Push 0. Stack becomes [10, 0]. WHY: the first pop is the divisor and the second pop is the dividend. Reversing them would produce -132 / 6 = -22, which is wrong.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 7, stack: [10, 0], action: '6 / -132 = 0. Push 0.' },
    },
    {
      id: 8,
      title: 'Operator * — Multiply by 10',
      explanation: 'Token 8 is "*". Pop 0 (right) and 10 (left). Compute 10 * 0 = 0 and push 0. Stack becomes [0]. The sub-expression has collapsed to a single value.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 8, stack: [0], action: '10 * 0 = 0. Push 0.' },
    },
    {
      id: 9,
      title: 'Push 17',
      explanation: 'Token 9 is "17". Push it. Stack is [0, 17]. The next operator will add these two values.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 9, stack: [0, 17], action: 'Push 17.' },
    },
    {
      id: 10,
      title: 'Operator + — Add 17 and 0',
      explanation: 'Token 10 is "+". Pop 17 (right) and 0 (left). Compute 0 + 17 = 17 and push 17. Stack becomes [17]. WHY: addition is commutative, so the operand order does not change the result here.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 10, stack: [17], action: '0 + 17 = 17. Push 17.' },
    },
    {
      id: 11,
      title: 'Push 5',
      explanation: 'Token 11 is "5". Push it. Stack is [17, 5]. The final token is an operator that will combine 17 and 5.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 11, stack: [17, 5], action: 'Push 5.' },
    },
    {
      id: 12,
      title: 'Final Operator + — Return Result',
      explanation: 'Token 12 is "+". Pop 5 (right) and 17 (left). Compute 17 + 5 = 22 and push 22. Stack is [22]. The expression is fully consumed, so the single remaining value 22 is the answer. WHY: a well-formed RPN expression always reduces to exactly one stack value at the end.',
      state: { tokens: ['10', '6', '9', '3', '+', '-11', '*', '/', '*', '17', '+', '5', '+'], currentIdx: 12, stack: [22], action: '17 + 5 = 22. Return 22.', found: true },
    },
  ],

  javaCode: `import java.util.*;

public class EvaluateRPN {
    public int evalRPN(String[] tokens) {
        Stack<Integer> stack = new Stack<>();
        
        for (String t : tokens) {
            if (t.equals("+")) {
                stack.push(stack.pop() + stack.pop());
            } else if (t.equals("-")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a - b);
            } else if (t.equals("*")) {
                stack.push(stack.pop() * stack.pop());
            } else if (t.equals("/")) {
                int b = stack.pop();
                int a = stack.pop();
                stack.push(a / b);
            } else {
                stack.push(Integer.parseInt(t));
            }
        }
        return stack.pop();
    }
}`,

  javaExplanation: [
    { line: 'if (t.equals("+"))', note: 'For addition and multiplication, order doesn\'t matter.' },
    { line: 'int b = stack.pop(); int a = stack.pop();', note: 'For subtraction and division, order matters! The first pop is the right operand (b), the second pop is the left operand (a).' },
    { line: 'stack.push(a - b);', note: 'Calculate and push the result back onto the stack.' },
  ],

  complexity: {
    time: 'O(N)',
    space: 'O(N)',
    aux: 'O(N)',
    explanation: 'We iterate through the tokens once. The stack can hold at most N/2 numbers.',
  },

  bruteForce: {
    time: 'O(N²)',
    space: 'O(N)',
    note: 'Repeatedly scan the array for an operator, calculate, and replace the 3 tokens with 1. Very slow.',
  },

  commonMistakes: [
    { title: 'Reversing operands in - and /', detail: 'The first pop is the right operand, the second pop is the left operand. Doing `stack.pop() - stack.pop()` is wrong for `-` and `/`.' },
  ],

  interviewQuestions: [
    { level: 'Medium', title: 'Evaluate Reverse Polish Notation', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
    { level: 'Hard', title: 'Basic Calculator', url: 'https://leetcode.com/problems/basic-calculator/' },
  ],

  quickRevision: [
    'Push numbers.',
    'On operator: pop right, then pop left.',
    'Calculate left op right.',
    'Push result.',
  ],
};

export const stackSubPatterns = [validParentheses, minStack, evaluateRPN];

export const stackOverview = {
  id: 'stack',
  title: 'Stack',
  subtitle: 'LIFO data structure for nested logic and backtracking',
  introduction: 'A Stack is a Last-In, First-Out (LIFO) data structure. Think of it like a stack of plates: you can only add or remove from the top. It is the perfect tool for problems that require matching, reversing, or undoing actions.',
  coreConcept: {
    what: 'A collection that supports push (add to top) and pop (remove from top) in O(1) time.',
    why: 'It enforces the exact order needed for nested operations (like brackets) and lets us look backward in a sequence without knowing the future.',
    when: 'Valid parentheses, min/max tracking, expression evaluation, and undo operations.',
  },
  whenToUse: [
    'The problem involves matching pairs (brackets, HTML tags).',
    'You need to evaluate postfix/prefix expressions.',
    'You need to track a "most recent" state.',
  ],
  recognitionClues: [
    '"Valid parentheses"',
    '"Evaluate RPN"',
    '"Min Stack" or "Max Stack"',
  ],
  importantProperties: [
    'LIFO (Last-In, First-Out).',
    'O(1) push and pop.',
    'Can be implemented with an Array or a Linked List.',
  ],
  comparison: [
    { aspect: 'Valid Parens', when: 'Matching nested symbols', time: 'O(N)', space: 'O(N)' },
    { aspect: 'Min Stack', when: 'Tracking min in O(1)', time: 'O(1) ops', space: 'O(N)' },
    { aspect: 'Eval RPN', when: 'Postfix math', time: 'O(N)', space: 'O(N)' },
  ],
  commonMistakes: [
    { title: 'Popping an empty stack', detail: 'Always check `isEmpty()` before calling `pop()`.' },
  ],
  interviewQuestions: [
    { level: 'Easy', title: 'Valid Parentheses', url: 'https://leetcode.com/problems/valid-parentheses/' },
    { level: 'Medium', title: 'Min Stack', url: 'https://leetcode.com/problems/min-stack/' },
    { level: 'Medium', title: 'Evaluate Reverse Polish Notation', url: 'https://leetcode.com/problems/evaluate-reverse-polish-notation/' },
    { level: 'Medium', title: 'Daily Temperatures', url: 'https://leetcode.com/problems/daily-temperatures/' },
  ],
};