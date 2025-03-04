let ops = {
	"add": fn(a, b) {
		return a + b;
	},
	"sub": fn(a, b) {
		return a - b;
	},
	"mul": fn(a, b) {
		return a * b;
	},
	"div": fn(a, b) {
		return a / b;
	}
};

let calc = fn(op, a, b) {
	return ops[op](a, b);
}

calc("mul", calc("add", 1, 2), calc("sub", 10, 5))