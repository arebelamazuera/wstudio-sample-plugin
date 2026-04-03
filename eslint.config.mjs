/**
 * ESLint configuration for the external-facing WStudio plugin starter.
 */

import js from '@eslint/js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const configDirectory = path.dirname(fileURLToPath(import.meta.url));
const typedTypeScriptConfigs = tseslint.configs.recommendedTypeChecked.map((config) => ({
  ...config,
  files: ['**/*.ts', '**/*.tsx'],
}));

export default [
  {
    ignores: ['main.js', 'main.js.map', 'styles.css', 'node_modules', 'sdk'],
  },
  js.configs.recommended,
  ...typedTypeScriptConfigs,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: configDirectory,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['**/*.mjs'],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
