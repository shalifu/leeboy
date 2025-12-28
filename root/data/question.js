// You can expand these sets—keep ids unique per level.
// Types: 'mc' (multiple-choice), 'tf' (true/false)

const beginner = [
  {
    id: 'b1',
    type: 'mc',
    prompt: 'Which HTML tag is used to create a hyperlink?',
    options: ['<link>', '<a>', '<href>', '<anchor>'],
    answer: '<a>',
    topic: 'html'
  },
  {
    id: 'b2',
    type: 'mc',
    prompt: 'In CSS, which property sets the text color?',
    options: ['font-color', 'text-color', 'color', 'foreground'],
    answer: 'color',
    topic: 'css'
  },
  {
    id: 'b3',
    type: 'tf',
    prompt: 'let and const are block-scoped in JavaScript.',
    options: ['True', 'False'],
    answer: 'True',
    topic: 'javascript'
  },
{
    id: 'b4',
    type: 'mc',
    prompt: 'Which HTTP method is idempotent by spec?',
    options: ['POST', 'PUT', 'PATCH', 'GET'],
    answer: 'GET',
    topic: 'http'
  }
];

const intermediate = [
  {
    id: 'i1',
    type: 'mc',
    prompt: 'Which status code best represents "resource created"?',
    options: ['200', '201', '204', '301'],
    answer: '201',
    topic: 'http'
  },
  {
    id: 'i2',
    type: 'mc',
    prompt: 'What does Array.prototype.map return?',
    options: ['Mutates original array', 'A new array', 'Iterator', 'Promise'],
    answer: 'A new array',
    topic: 'javascript'
  },
  {
    id: 'i3',
    type: 'mc',
    prompt: 'Which CSS layout is best for 2D grid-based placement?',
    options: ['Flexbox', 'Grid', 'Floats', 'Position absolute'],
    answer: 'Grid',
    topic: 'css'
  },
  {
    id: 'i4',
    type: 'tf',
    prompt: 'In Node.js, require() is asynchronous by default.',
    options: ['True', 'False'],
    answer: 'False',
    topic: 'node'
  },
  {
    id: 'i5',
    type: 'mc',
    prompt: 'Which Git command is used to create a new branch?',
    options: ['git branch', 'git checkout -b', 'git merge', 'git commit'],
    answer: 'git checkout -b',
    topic: 'git'
  }
];
const advanced = [
  {
    id: 'a1',
    type: 'mc',
    prompt: 'Which Content Security Policy directive controls allowed script sources?',
    options: ['default-src', 'script-src', 'style-src', 'connect-src'],
    answer: 'script-src',
    topic: 'security'
  },
  {
    id: 'a2',
    type: 'mc',
    prompt: 'Which database index type is optimal for equality lookups on a single column?',
    options: ['B-Tree', 'Hash', 'GIN', 'Spatial R-Tree'],
    answer: 'Hash',
    topic: 'db'
  },
  {
    id: 'a3',
    type: 'mc',
    prompt: 'What’s the Big-O of quicksort average case?',
    options: ['O(n)', 'O(n log n)', 'O(n^2)', 'O(log n)'],
    answer: 'O(n log n)',
    topic: 'algorithms'
  },
 {
    id: 'a4',
    type: 'tf',
    prompt: 'SameSite=Lax allows cookies on top-level GET navigations.',
    options: ['True', 'False'],
    answer: 'True',
    topic: 'web'
  }
];

const expert = [
  {
    id: 'e1',
    type: 'mc',
    prompt: 'Which HTTP method is idempotent and safe?',
    options: ['GET', 'POST', 'PUT', 'DELETE'],
    answer: 'GET',
    topic: 'http'
  },
  {
    id: 'e2',
    type: 'mc',
    prompt: 'In React, what is the purpose of useEffect?',
    options: ['Render components', 'Handle side effects', 'Manage state', 'Create refs'],
    answer: 'Handle side effects',
    topic: 'react'
  },
  {
    id: 'e3',
    type: 'mc',
    prompt: 'Which SQL clause is used to filter groups in aggregate queries?',
    options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
    answer: 'HAVING',
    topic: 'sql'
  },
  {
    id: 'e4',
    type: 'tf',
    prompt: 'In JavaScript, Symbol is a primitive data type.',
    options: ['True', 'False'],
    answer: 'True',
    topic: 'javascript'
  },
  {
    id: 'e5',
    type: 'mc',
    prompt: 'What does CORS stand for?',
    options: ['Cross-Origin Resource Sharing', 'Cross-Origin Request Security', 'Client-Origin Resource Sharing', 'Cross-Object Resource Sharing'],
    answer: 'Cross-Origin Resource Sharing',
    topic: 'web'
  }
];

const master = [
  {
    id: 'm1',
    type: 'mc',
    prompt: 'Which algorithm is used in Git for object hashing?',
    options: ['MD5', 'SHA-1', 'SHA-256', 'Blowfish'],
    answer: 'SHA-1',
    topic: 'git'
  },
  {
    id: 'm2',
    type: 'mc',
    prompt: 'In Docker, what is a container?',
    options: ['A virtual machine', 'A lightweight runtime', 'A file system', 'A network protocol'],
    answer: 'A lightweight runtime',
    topic: 'docker'
  },
  {
    id: 'm3',
    type: 'mc',
    prompt: 'Which design pattern ensures a class has only one instance?',
    options: ['Factory', 'Singleton', 'Observer', 'Decorator'],
    answer: 'Singleton',
    topic: 'design-patterns'
  },
  {
    id: 'm4',
    type: 'tf',
    prompt: 'TCP is a connectionless protocol.',
    options: ['True', 'False'],
    answer: 'False',
    topic: 'networking'
  },
  {
    id: 'm5',
    type: 'mc',
    prompt: 'What is the time complexity of binary search?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
    answer: 'O(log n)',
    topic: 'algorithms'
  }
];

exports.QUESTIONS = {
  beginner,
  intermediate,
  advanced,
  expert,
  master
};
