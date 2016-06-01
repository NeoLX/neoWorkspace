
var Class = function(klass,su){

	if(!klass
		|| typeof klass != 'function'){
		alert("THIS IS NOT A FUNCTION");
		throw new execption();
	}

	var _super,_superObj;
	if(su && typeof su == 'function'){
		_super = su;
		_superObj = new su();
	}

	var _proto = new klass();

    console.log(_proto);

	var c = function(){

	}

	c.prototype = _proto;
	// if(su){
	// 	c.prototype = new su();
	// 	c.prototype._super = new su();	
	// }

	return c;
};

var a = Class(function(){
    this.dd = "dd";
            this.getAA = function(){
                return "hello " + this._super.getAA();
            }
});
console.log(a);
console.log(a.prototype);
console.log(a.prototype.dd);
console.log(a.dd);
var oa = new a();
console.log(oa);