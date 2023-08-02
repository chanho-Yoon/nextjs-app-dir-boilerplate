const OFF = 0;
const WARNING = 1;
const ERROR = 2;

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
  },
  plugins: ['react', 'react-hooks', '@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-unused-expressions': OFF,
    'no-unused-vars': OFF,
    'no-use-before-define': OFF,
    'no-useless-constructor': OFF,
    'no-alert': OFF,
    'no-shadow': OFF,
    'no-restricted-globals': OFF,
    'class-methods-use-this': OFF,
    camelcase: OFF,
    quotes: [ERROR, 'single'],
    semi: [ERROR, 'always'],

    'import/export': OFF,
    'import/named': OFF,
    'import/no-extraneous-dependencies': OFF,
    'import/no-duplicates': OFF,
    'import/order': OFF,
    'import/no-self-import': OFF,
    'import/no-cycle': OFF,
    'import/no-named-as-default': OFF,
    'import/no-named-as-default-member': OFF,
    'import/no-useless-path-segments': OFF,
    'import/no-unresolved': OFF,
    'import/extensions': OFF,
    'import/prefer-default-export': OFF,
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'const', next: 'return' },
    ],
    '@typescript-eslint/no-inferrable-types': OFF,
    '@typescript-eslint/explicit-function-return-type': OFF,
    '@typescript-eslint/no-use-before-define': OFF,
    '@typescript-eslint/no-unused-vars': [
      WARNING,
      { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
    ],
    '@typescript-eslint/no-unused-expressions': ERROR,
    '@typescript-eslint/ban-ts-ignore': OFF,
    '@typescript-eslint/explicit-module-boundary-types': OFF,

    /* react */
    'react/button-has-type': OFF,
    'react-hooks/rules-of-hooks': ERROR,
    'react-hooks/exhaustive-deps': WARNING,
    'react/require-default-props': OFF,
    'react/jsx-props-no-spreading': OFF,
    'react/react-in-jsx-scope': OFF,
    'react/jsx-no-useless-fragment': OFF,
    'react/jsx-filename-extension': [
      ERROR,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/jsx-wrap-multilines': ERROR,
    'react/jsx-max-props-per-line': [ERROR, { maximum: 1 }],
    'react/no-array-index-key': OFF,
    'jsx-a11y/label-has-associated-control': [
      ERROR,
      {
        required: {
          every: ['nesting', 'id'],
        },
      },
    ],
  },
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': OFF,
      },
    },
  ],

};
