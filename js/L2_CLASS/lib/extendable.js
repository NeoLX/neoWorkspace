
var Class = function (klass, su) {

	if (!klass
		|| typeof klass != 'function') {
		alert("THIS IS NOT A FUNCTION");
		throw new execption();
	}

	var _super, _superObj;
	if (su && typeof su == 'function') {
		_super = su;
		_superObj = new su();
	}
	
	// console.log("++++++++++++++++klass++++++++++++++");
	// for(var i in klass){
	// 	console.log("[klass]" + i + ":" + klass[i]);
	// }
	// console.log("++++++++++++++++klass++++++++++++++");
	
	// console.log("");
	// console.log("++++++++++++++++super++++++++++++++");
	// for(var i in su){
	// 	console.log("[su]" + i + ":" + su[i]);
	// }
	// console.log("++++++++++++++++super++++++++++++++");
	
	// var _k = new klass();
	var _proto = new su();

	var c = function () {
		klass.apply(this, arguments);
		
		var self = this;
		// debugger;
		if(_superObj){
			
			for(var i in _superObj){
				console.log("this[" + i + "]:" + this[i]);
				if(this[i]){
					
					if(typeof this[i] == "function"
						&& typeof _superObj[i] == "function"){
						
						// this[i].prototype._super = _superObj[i];
						// this[i].prototype._super.apply(self, self.arguments);
						
						// delete _proto[i];
						// this[i] = 
						this[i] = (function(name, fn){
								return function() {
									// 首先将执行方法的当前对象（子类的实例化对象）的_super属性保存到tmp变量里。
									// 这是非常必要的， 因为this永远指向当前正在被调用的对象。
									// 当C继承B，B继承A，而A\B\C均有一个dance方法且B\C的dance方法均使用了this._super来引用各自父类的方法时，下面这句操作就显得非常重要了。它使得在方法调用时，this._super永远指向“当前类”的父类的原型中的同名方法，从而避免this._super被随便改写。
									var tmp = self._super;
									
									// 然后将父类的原型中的同名方法赋值给this._super，以便子类的实例化对象可以在其执行name方法时通过this._super使用对应的父类原型中已经存在的方法
									// var _objK = new klass();
									// _objK._super = _superObj[name];
									
									console.log("SELF:" + self);
									self._super = _superObj[name];
									// fn.prototype._super = _superObj[name];
									var ret = fn.apply(self,arguments);
									// 执行创建子类时提供的函数，并通过arguments传入参数
									// var ret = fn.apply(this, arguments);
									
									// 将tmp里保存的_super属性重新赋值回this._super中
									self._super = tmp;

									// 返回函数的执行结果
									return ret;
								};
							})(i, this[i]);
						// this[i]._super = _superObj[i];
					}
				}else{
					this[i] = _superObj[i];
				}
			}
		}
	}

	c.prototype = _proto;
	// if(su){
	// 	c.prototype = new su();
	// 	c.prototype._super = new su();	
	// }

	return c;
};

var sup = function(){
	this.aa = "aa";
	this.getAA = function(){
		return "super " + this.aa;
	}
}

var a = Class(function () {
    this.dd = "dd";
	this.getAA = function () {
		console.log(this);
		console.log(this._super);
		console.log(this.getAA._super);
		return "hello " + this._super();
	}
},sup);
console.log("a:" + a);
console.log("a.prototype:" + a.prototype);
// console.log("a.dd" + a.prototype.dd);
console.log("a.dd:" + a.dd);
console.log("a.aa:" + a.aa);
var oa = new a();
console.log("oa:" + oa);
console.log("oa.aa:" + oa.aa);
console.log("oa.dd:" + oa.dd);
console.log("oa.getAA:" + oa.getAA);
oa.getAA();