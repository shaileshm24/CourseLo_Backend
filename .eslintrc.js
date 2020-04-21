module.exports = {
	env: {
		browser: true,
		es6: true,
		node: true,
	},
	"plugins": [
		"jsdoc"
	],
	extends: [
		'airbnb-base',
	],
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	rules: {
		'jsdoc/require-example': [
			// The Error level should be `error`, `warn`, or `off` (or 2, 1, or 0)
			'error',
			// The options vary by rule, but are added to an options object:
			{
				avoidExampleOnConstructors: true,
				exemptedBy: ['type']
			}
		]
	},
};
