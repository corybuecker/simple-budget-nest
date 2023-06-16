/* eslint-env node */
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  root: true,
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    'jest.config.js',
    '.eslintrc.cjs',
    'public/**/*',
    'vendor/**/*',
    'tailwind.config.js',
  ],
  "rules": {
    "@typescript-eslint/no-misused-promises": "off"
  }
};
