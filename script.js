function f(a) {
	console.log(a)
}

function throttle(func, ms) {
	function wrapper(x) {
		wrapper.calls.push(x)
		func.call(this, wrapper.calls[wrapper.calls.length - 1])
		setTimeout(()=>{ }, ms)
	}
	wrapper.calls = []
	return wrapper
}

let f1000 = throttle(f, 1000);

f1000(1);
f1000(2);
f1000(3);