module.exports = {
  extends: [
    '../.eslintrc.js',
    'airbnb/rules/react',
  ],
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'react/forbid-prop-types': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-wrap-multilines': ['error', {
      arrow: 'parens',
      assignment: 'parens',
      condition: 'ignore',
      declaration: 'parens',
      logical: 'ignore',
      prop: 'ignore',
      return: 'parens',
    }],
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
  },
}
