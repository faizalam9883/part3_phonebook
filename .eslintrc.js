module.exports = {
	env: {
		node: true,
		commonjs: true,
		es2021: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
	},
	plugins: ["react"],
	rules: {
		indent: ["error", "tab"],
		"linebreak-style": ["error", "windows"],
		quotes: ["error", "double"],
		semi: ["error", "never"],
		eqeqeq: "error",
		"no-trailing-spaces": "error",
		"object-curly-spacing": ["error", "always"],
		"arrow-spacing": ["error", { before: true, after: true }],
		"no-console": 0,
	},
}