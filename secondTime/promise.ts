//构造方法
let Promise = () => {
	this.callbacks = [];
}
Promise.prototype = {
	construct: Promise,
	resolve: (result) => {
		this.complete("resolve", result);
	},
	reject: (result) => {
		this.complete("reject", result);
	},
	complete: (type, result) => {
		while (this.callback[0]) {
			this.callbacks.shift()[type](result);
		}
	},
	then: (successHandler, failedHandler) => {
		this.callback.push({
			reslove: successHandler,
			reject: failedHandler
		});
		return this;
	}
}

//test
const promise = new Promise();
const delay1 = () => {
	setTimeout(function () {
		promise.resolve("数据1");
	}, 1000);
	return promise;
};
const callback1 = (re) => {
	re = re + "数据2";
	console.log(re);
	promise.resolve(re);
};
const callback2 = (re) => {
	console.log(re + "数据3");
};
delay1().then(callback1).then(callback2);