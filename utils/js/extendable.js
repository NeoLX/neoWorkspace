
var Class = function(klass,su){

	if(!klass
		|| typeof klass != 'function'){
		console.log("THIS IS NOT A FUNCTION");
		throw new execption();
	}

	var _super,_superObj;
	if(su && typeof su == 'function'){
		_super = su;
		_superObj = new su();
	}

	var _proto = new klass();

	var c = function(){

	}

	c.prototype = _proto;
	// if(su){
	// 	c.prototype = new su();
	// 	c.prototype._super = new su();	
	// }

	return c;
};
