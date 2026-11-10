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
      title: 'Push Opening Brackets',
      explanation: 'We scan the string. We see "(", so we push it onto the stack. Then we see "[", we push it too.',
      state: {
        string: "([)]", currentIdx: 1, stack: ["(", "["], action: 'Push ( and [',
      },
    },
    {
      id: 1,
      title: 'Mismatch Detected',
      explanation: 'We see ")". We check the top of the stack. It is "[". ")" does not match "[". The string is invalid!',
      state: {
        string: "([)]", currentIdx: 2, stack: ["(", "["], action: 'Mismatch! ) != [', found: true,
      },
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
      title: 'Push -2',
      explanation: 'Main stack is empty. Push -2. Since Min stack is also empty, push -2 to Min stack as well.',
      state: {
        operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "getMin"],
        currentIdx: 0, stack: [-2], minStack: [-2], action: 'Push -2 to both stacks.',
      },
    },
    {
      id: 1,
      title: 'Push 0',
      explanation: 'Push 0 to Main. Is 0 <= current min (-2)? No. So we do NOT push to Min stack.',
      state: {
        operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "getMin"],
        currentIdx: 1, stack: [-2, 0], minStack: [-2], action: '0 is not smaller. Only push to Main.',
      },
    },
    {
      id: 2,
      title: 'Push -3',
      explanation: 'Push -3 to Main. Is -3 <= current min (-2)? Yes. Push -3 to Min stack.',
      state: {
        operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "getMin"],
        currentIdx: 2, stack: [-2, 0, -3], minStack: [-2, -3], action: '-3 is new min. Push to both.',
      },
    },
    {
      id: 3,
      title: 'Get Min',
      explanation: 'The top of the Min stack is the current minimum: -3.',
      state: {
        operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "getMin"],
        currentIdx: 3, stack: [-2, 0, -3], minStack: [-2, -3], action: 'Current min is -3.',
      },
    },
    {
      id: 4,
      title: 'Pop',
      explanation: 'Pop from Main (-3). Since the top of Min stack is also -3, pop from Min stack too. The new min is now -2.',
      state: {
        operations: ["push(-2)", "push(0)", "push(-3)", "getMin", "pop", "getMin"],
        currentIdx: 4, stack: [-2, 0], minStack: [-2], action: 'Pop -3. Min stack also pops.',
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
      title: 'Push Numbers',
      explanation: 'Tokens: ["4", "13", "5", "/", "+"]. We push numbers until we hit an operator.',
      state: {
        tokens: ["4", "13", "5", "/", "+"], currentIdx: 2, stack: [4, 13, 5], action: 'Push 4, 13, 5.',
      },
    },
    {
      id: 1,
      title: 'Hit Operator /',
      explanation: 'We see "/". Pop 5 (right operand), then pop 13 (left operand). 13 / 5 = 2.6, but integer division truncates to 2. Push 2.',
      state: {
        tokens: ["4", "13", "5", "/", "+"], currentIdx: 3, stack: [4, 2], action: '13 / 5 = 2. Push 2.',
      },
    },
    {
      id: 2,
      title: 'Hit Operator +',
      explanation: 'We see "+". Pop 2 (right), pop 4 (left). 4 + 2 = 6. Push 6.',
      state: {
        tokens: ["4", "13", "5", "/", "+"], currentIdx: 4, stack: [6], action: '4 + 2 = 6. Push 6.', found: true,
      },
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