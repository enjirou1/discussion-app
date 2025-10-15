import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import { defineConfig } from 'eslint/config';
import daStyle from 'eslint-config-dicodingacademy';
import pluginReactHooks from 'eslint-plugin-react-hooks';

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js, 'react-hooks': pluginReactHooks },
    extends: ['js/recommended'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  daStyle,
  {
    rules: {
      'eol-last': 'off',
      'linebreak-style': 'off',
      'no-alert': 'off',
      'no-underscore-dangle': 'off',
      'import/prefer-default-export': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // 'react/jsx-props-no-spreading': 'off'
    }
  }
]);
