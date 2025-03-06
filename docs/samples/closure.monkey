let multiplyBy = fn(a) {
	return fn (b) { a * b };
}

let double = multiplyBy(2);
double(4);