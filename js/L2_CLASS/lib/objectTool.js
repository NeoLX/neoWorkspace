(function(){
    ObjectTool = {};

    ObjectTool.extend = function(obj, su){
        obj.prototype = new su();
        obj.prototype._super = obj.prototype;
    };
})();