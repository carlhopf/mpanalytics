module.exports = {
  env: {
    node: true,
    mocha: true,
    es2021: true,
  },

  extends: ['eslint:recommended', 'prettier'],

  parserOptions: {
    sourceType: 'module',
  },

  rules: {
    'no-class-assign': [0],
  },
};
