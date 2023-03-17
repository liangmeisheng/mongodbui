module.exports = {
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    // tsconfigRootDir: '.'
    project: ['./packages/client/tsconfig.json','./packages/server/tsconfig.json']
  },
  plugins: ['react', 'unused-imports', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'unused-imports/no-unused-imports': 'error',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
    '@typescript-eslint/restrict-plus-operands': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/no-dynamic-delete': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/no-unused-vars':
      process.env.NODE_ENV === 'production' ? 'on' : 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-confusing-void-expression':'OFF'
  }
}
