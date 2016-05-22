var Class = function(klass){

	var c = function(){
		klass.call(this);
	}
	c.prototype = new klass();
	c.prototype._super = new klass();

	return c;
};
// })();
