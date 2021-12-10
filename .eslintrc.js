module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
  },
  'extends': [
    'google',
  ],
  'parserOptions': {
    'ecmaVersion': 13,
    'sourceType': 'module',
  },
  'rules': {
    "semi": ["error", "always"],
    "quotes": ["error", "double"],
    "prefer-arrow-callback": "error",
		"func-style": ["error", "expression"],
		"camelcase": ["error", { "properties":"always" }],
		"require-jsdoc": ["error", {
			"require": {
				"FunctionDeclaration": true,
				"MethodDefinition": true,
				"ClassDeclaration": true,
				"ArrowFunctionExpression": true,
				"FunctionExpression": true
			}
		}],
		"valid-jsdoc": "error" ,
  },
};
