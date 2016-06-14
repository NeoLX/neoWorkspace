//原子类A
function ObjectA(){
    var privateA = "aa";//私有变量，子类不可见
    this.protectB = "bb";//可继承变量，子类可见，可覆盖，父类不可使用子类重写后

    this.getA = function(){
        return privateA;
    }
    
    this.getB = function(){
        return this.protectB;
    }
    
    this.getC = function(){
        return this.publicC;
    }
};
ObjectA.prototype.publicC = "cc";

//子类B，继承A
function ObjectB() {
    
};
ObjectB.prototype = new ObjectA();//继承B

//测试子类B
var ob = new ObjectB();

//测试私有变量A
console.log("privateA:" + ob.privateA);
console.log("getA:" + ob.getA());