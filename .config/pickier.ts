import type { PickierConfig } from 'pickier'

const config: PickierConfig = {
  verbose: false,
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/bin/**',
    '**/.git/**',
    '**/coverage/**',
    '**/*.min.js',
    '**/bun.lock',
    '**/src/packages/**',
    '**/src/pantry/**',
    '**/.cache/**',
  ],

  lint: {
    extensions: ['ts', 'js'],
    reporter: 'stylish',
    cache: false,
    maxWarnings: -1,
  },

  format: {
    extensions: ['ts', 'js', 'json', 'md', 'yaml', 'yml'],
    trimTrailingWhitespace: true,
    maxConsecutiveBlankLines: 1,
    finalNewline: 'one',
    indent: 2,
    quotes: 'single',
    semi: false,
  },

  rules: {
    noDebugger: 'error',
    noConsole: 'off',
  },

  pluginRules: {
    // TypeScript rules
    'ts/no-explicit-any': 'off',
    'ts/no-unused-vars': 'warn',

    // Disable buggy rules (false positives on TypeScript syntax)
    'regexp/no-unused-capturing-group': 'off',
    'no-super-linear-backtracking': 'off',
    'style/brace-style': 'off',
    'max-statements-per-line': 'off',
    'quotes': 'off',

    // Markdown rules
    'markdown/heading-increment': 'error',
    'markdown/no-trailing-spaces': 'error',
    'markdown/fenced-code-language': 'warn',
  },
}

export default config
