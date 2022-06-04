module.exports = {
  root: true,
  extends: [
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:jsdoc/recommended',
  ],
  plugins: ['babel', 'prettier', 'unused-imports', 'import', 'sort-export-all', 'jsdoc'],
  env: { browser: false, commonjs: true, es6: true, jest: true, node: false },
  parserOptions: { ecmaVersion: 2018, sourceType: 'module' },
  ignorePatterns: ['**/*.cjs.*', '**/*.esm.*'],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        semi: 'off',
        '@typescript-eslint/semi': 'error',
        'no-unused-vars': 'off',
        'eslint/no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/ban-ts-comment': 0,
        '@typescript-eslint/no-empty-interface': ['error', { allowSingleExtends: true }],
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/member-delimiter-style': 0,
        'padding-line-between-statements': 'off',
        '@typescript-eslint/padding-line-between-statements': [
          'error',
          {
            blankLine: 'always',
            prev: [
              'const',
              'let',
              'var',
              'type',
              'interface',
              'throw',
              'block-like',
              'class',
              'multiline-expression',
            ],
            next: '*',
          },
          {
            blankLine: 'always',
            prev: '*',
            next: [
              'const',
              'let',
              'var',
              'type',
              'interface',
              'throw',
              'block-like',
              'class',
              'multiline-expression',
            ],
          },
          {
            blankLine: 'any',
            prev: ['singleline-const', 'singleline-let', 'singleline-var'],
            next: ['singleline-const', 'singleline-let', 'singleline-var'],
          },
          { blankLine: 'any', prev: ['expression'], next: ['expression'] },
        ],
        '@typescript-eslint/lines-between-class-members': [
          'error',
          'always',
          { exceptAfterSingleLine: true },
        ],
        '@typescript-eslint/no-unused-vars': [
          'error',
          { varsIgnorePattern: '^_', argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-empty-function': 0,
        '@typescript-eslint/member-ordering': [
          'error',
          {
            default: {
              order: 'as-written',
              memberTypes: [
                'signature',

                'public-instance-field',
                'protected-instance-field',
                'private-instance-field',

                'public-constructor',
                'protected-constructor',
                'private-constructor',

                'public-instance-method',
                'protected-instance-method',
                'private-instance-method',

                'public-instance-get',
                'public-instance-set',

                'protected-instance-get',
                'private-instance-get',

                'protected-instance-set',
                'private-instance-set',

                'public-static-method',
                'protected-static-method',
                'private-static-method',

                'public-static-field',
                'protected-static-field',
                'private-static-field',

                'public-static-get',
                'public-static-set',

                'protected-static-get',
                'protected-static-set',

                'private-static-get',
                'private-static-set',
              ],
            },
          },
        ],
      },
    },
    {
      files: ['**/*.jsx', '**/*.tsx'],
      extends: ['plugin:react/recommended'],
      plugins: ['react'],
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      settings: {
        react: { version: 'detect' },
      },
    },
  ],
  rules: {
    'no-confusing-arrow': ['error', { allowParens: true }],
    'spaced-comment': [
      'error',
      'always',
      {
        line: { markers: ['/'], exceptions: ['-', '+'] },
        block: { markers: ['!'], exceptions: ['*'], balanced: true },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    'sort-imports': [
      'error',
      { ignoreCase: false, ignoreDeclarationSort: true, ignoreMemberSort: false },
    ],
    'max-len': [
      'error',
      {
        code: 100,
        comments: 200,
        tabWidth: 2,
        ignoreRegExpLiterals: true,
        ignoreTemplateLiterals: true,
        ignoreStrings: true,
        ignoreUrls: true,
        ignorePattern: '^\\s*import\\s*',
      },
    ],
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: ['external', 'unknown', 'internal', ['parent', 'sibling'], 'index'],
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          { pattern: 'lib/**', group: 'unknown', position: 'before' },
          { pattern: '~~/lib/**', group: 'internal', position: 'before' },
        ],
      },
    ],
    'prefer-const': 'error',
    'prefer-object-spread': 'error',
    'no-duplicate-imports': 'error',
    'no-return-await': 'error',
    'prettier/prettier': 'error',
    'padded-blocks': ['error', 'never'],
    'sort-export-all/sort-export-all': ['error', 'asc', { caseSensitive: false, natural: true }],
    'jsdoc/check-tag-names': [
      'error',
      {
        definedTags: ['typicalname'],
      },
    ],
    'jsdoc/require-returns': [
      'error',
      {
        checkGetters: false,
      },
    ],
  },
};
