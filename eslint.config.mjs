import js from '@eslint/js';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Apply Prettier rules safely
      ...prettierConfig.rules,
      'prettier/prettier': 'warn',

      // Your custom rules
      'no-console': 'off',
      'consistent-return': 'off',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: 'req|res|next|val|err|error|e',
          varsIgnorePattern: '^_', // This allows any variable starting with _ to be ignored
        },
      ],
    },
  },
];
