let map = fn(arr, f) {
    let iter = fn(arr, accumulated) {
        if (len(arr) == 0) {
            return accumulated;
        }

        iter(rest(arr), push(accumulated, f(first(arr))));
    }

    iter(arr, []);
}

let doubleValue = fn(x) {
    return x * 2;
}

map([1, 2, 3, 4, 5], doubleValue);