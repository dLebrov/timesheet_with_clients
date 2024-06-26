module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    '@feature-sliced',
    'plugin:prettier/recommended',
  ],
  plugins: ['unused-imports', 'simple-import-sort', '@typescript-eslint', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    'import/no-internal-modules': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    'import/extensions': 'off',
    'no-console': ['warn', { allow: ['error', 'warn'] }],
    'react/jsx-filename-extension': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/no-non-null-assertion': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/naming-convention': 0,

    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,

    'import/prefer-default-export': 0,
    'import/no-extraneous-dependencies': 0,

    'react/require-default-props': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-unescaped-entities': 0,
    'react/no-array-index-key': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/no-unused-prop-types': 0,
    'react/destructuring-assignment': 0,

    'consistent-return': 0,
    '@typescript-eslint/ban-ts-comment': 0,

    'max-params': ['warn', 3],
  },
};
