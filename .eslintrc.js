module.exports = {
  'root': true,
  'parser': 'babel-eslint',
  'env': {
    'browser': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  'globals': {
    'require': true,
    'Promise': true
  },
  'plugins': [
    'react',
    'react-hooks'
  ],
  'parserOptions': {
    'ecmaVersion': 6,
    'sourceType': 'module',
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'settings': {
    'react': {
      // Regex for Component Factory to use,
      // default to "createReactClass"
      'createClass': 'createReactClass',
      'pragma': 'React',  // Pragma to use, default to "React"
      'version': '16.5' // React version, default to the latest React stable release
      // 'flowVersion': '0.53' // Flow version
    },
    // The names of any functions used to wrap the
    // propTypes object, e.g. `forbidExtraProps`.
    // If this isn't set, any propTypes wrapped in
    // a function will be skipped.
    'propWrapperFunctions': ['forbidExtraProps']
  },
  'rules': {
    'react-hooks/rules-of-hooks': 'error',
    "react-hooks/exhaustive-deps": 'warn',
    'jsx-quotes': [2, 'prefer-single'],
    'react/jsx-no-undef': 0,
    'quotes': [2, 'single'],
    'semi': [2, 'never'],
    'comma-dangle': [2, 'never'],
    'prefer-const': 2,
    'comma-spacing': 2,
    'no-debugger': 0,
    'arrow-parens': 2,
    'no-undef': 0,
    'no-console': 0
  }
}
