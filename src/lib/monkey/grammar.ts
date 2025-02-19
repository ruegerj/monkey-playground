export default {
	string: {
		pattern: /(["])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	keyword: /\b(?:let|if|else|fn|return)\b/,
	boolean: /\b(?:false|true)\b/,
	number: /\b\d+\b/i,
	builtin: /\b(?:len|puts|first|last|rest|push)\b/,
	operator: /[<>]|[!=]=?|\+|-|\*|\//,
	punctuation: /[{}[\];(),:]/
} as Prism.Grammar;
