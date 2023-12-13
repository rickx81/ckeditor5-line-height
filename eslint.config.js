import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'build',
    'dist',
  ],
}, {
  rules: {
    'ts/ban-ts-comment': 0,
  },
})
