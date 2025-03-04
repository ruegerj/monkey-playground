let countDown = fn(x) {
	if (x == 0) {
		return 0;
	}
	
	puts(x);
	
	return countDown(x-1);
}
countDown(5);