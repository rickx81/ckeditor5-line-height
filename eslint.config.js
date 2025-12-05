import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'pnpm/json-enforce-catalog': 'off',
  },
  ignores: [
    // Ignore the entire `dist/` (the NIM build).
    'dist/**',
    // Ignore compiled JavaScript files, as they are generated automatically.
    'src/**/*.js',
    // Also, do not check typing declarations, too.
    'src/**/*.d.ts',
  ],
})
