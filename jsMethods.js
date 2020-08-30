Object.prototype.calling = function (obj, ...args) {
	const newObj = Object.assign({}, obj, { newMethod: this });
	return newObj.newMethod(...args);
};

Object.prototype.applying = function (obj, args) {
	const newObj = Object.assign({}, obj, { newMethod: this });
	if (!Array.isArray(args)) {
		throw new Error("Second argument should be an Array");
	}
	return newObj.newMethod(...args);
};

Object.prototype.binding = function (obj) {
	const newObj = Object.assign({}, obj, { newMethod: this });
	return function () {
		return newObj.newMethod(...arguments);
	};
};

function greeting(lan) {
	console.log(`My name is ${this.name} and I am learning ${lan}`);
}

let Shanoy = {
	name: "Shanoy",
};

let Lamar = {
	name: "Lamar",
};

greeting.applying(Shanoy, ["React"]); //  My name is Shanoy and I am learning React
greeting.calling(Lamar, "Vue"); // My name is Lamar and I am learning Vue

let shanoyGreet = greeting.binding(Shanoy);
shanoyGreet("golang"); // My name is Shanoy and I am learning golang
