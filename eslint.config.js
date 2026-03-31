import js from '@eslint/js'
import globals from 'globals'
import { defineConfig } from 'eslint/config'
import prettierConfig from 'eslint-config-prettier'
import prettierPlugin from 'eslint-plugin-prettier'

export default defineConfig([
  js.configs.recommended,

  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // 'prettier/prettier': 'error',
      'no-unused-vars': 'warn',
      'no-console': 'off',
    },
  },

  prettierConfig,
])
