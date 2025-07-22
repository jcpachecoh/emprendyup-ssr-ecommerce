// ESLint v9+ config for Next.js
import next from 'eslint-config-next';

export default [
  ...next(),
  {
    rules: {
      'no-unused-vars': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];
