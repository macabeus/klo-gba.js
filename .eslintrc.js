module.exports = {
  extends: [
    'airbnb-base',
  ],
  env: {
    browser: true,
  },
  plugins: [
    'import',
    'sort-destructure-keys',
  ],
  parser: 'babel-eslint',
  rules: {
    'arrow-parens': 'off',
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
        imports: 'always-multiline',
        objects: 'always-multiline',
      },
    ],
    'function-paren-newline': ['error', 'consistent'],
    'max-len': [
      'error',
      {
        code: 80,
        ignoreComments: true,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        tabWidth: 2,
      },
    ],
    'multiline-ternary': ['error', 'always-multiline'],
    'no-bitwise': 'off',
    'no-unused-expressions': ['error', { allowTernary: true }]
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 1,
      },
    ],
    'implicit-arrow-linebreak':  'off',
    'import/extensions': 'off',
    'semi': ['error', 'never'],
    'sort-destructure-keys/sort-destructure-keys': ['error'],
    'sort-keys': ['error'],
    'sort-vars': ['error'],
    'space-before-function-paren': ['error', 'always'],
    'operator-linebreak': [
      'error',
      'before',
      { overrides: { '=': 'after', ':': 'after', '?': 'after' } },
    ],
  },
}
