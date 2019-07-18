module.exports = {
    root: true,
    env: {
        'browser': true,
        'es6': true,
        'node': true,
        'jest': true,
    },
    extends: ['eslint:recommended', 'plugin:react/recommended'],
    globals: {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    parser: 'babel-eslint',
    parserOptions: {
        'ecmaFeatures': {
            'jsx': true
        },
        'ecmaVersion': 2018,
        'sourceType': 'module'
    },
    plugins: [
        'react', 'jest'
    ],
    rules: {
        'indent': [
            'error',
            2
        ],
        'linebreak-style': [
            'error',
            'unix'
        ],
        'quotes': [
            'error',
            'single'
        ],
        'semi': [
            'error',
            'always'
        ],
      'react/prop-types': 0,
      'no-console': 'off',
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error'
    }
};

