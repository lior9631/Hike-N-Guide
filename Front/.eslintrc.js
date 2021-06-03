module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb/base",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    }
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx']
      }
    }
  },
  "env": {
    // "es6": true,
    "node": true,
    "browser": true,
  },
  "globals": {
    "ReactDOM": true,
    "React": true,
    "ReactRouterDOM": true,
  },
  "rules": {
    "linebreak-style": 0,
    "import/no-cycle": 0,
    'import/extensions': ['error', 'always', {
      "js": 'never',
      "jsx": 'never'
    }],
    "camelcase": 0,
    "arrow-parens": ["error", "as-needed"],
    "no-underscore-dangle": 0,
    "spaced-comment": 0,
    "no-plusplus": 0,
    "no-param-reassign": 0,
    "no-console": 0,
    "import/no-named-as-default": 0,
    "react/react-in-jsx-scope": 0,
    "class-methods-use-this": 0,
    "jsx-quotes": 1,
    "import/extensions": 0,
    "import/prefer-default-export": 0,
    "no-use-before-define": 0,
    "react/jsx-no-undef": [1, { "allowGlobals": true }],
    "react/prop-types": 0,
    "react/jsx-curly-spacing": [1, { "when": "always", "allowMultiline": true }]
  },
}
