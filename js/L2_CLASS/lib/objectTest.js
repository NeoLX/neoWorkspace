//原子类A
function ObjectA(){
    var privateA = "privA";//私有变量，子类不可见
    var privateB = "privB";//私有变量，子类不可见
    this.protectB = "bb";//可继承变量，子类可见，可覆盖，父类不可使用子类重写后

    this.showPrivate = function(){
        console.log("privA:" + privateA);
        console.log("privb:" + privateB);
    }

    this.getPrivateA = function(){
        return privateA;
    }
    this.getPrivateB = function(){
        return privateB;
    }
    
    this.getProtectB = function(){
        return this.protectB;
    }
    
    this.getProtectC = function() {
        return this.publicC;
    }
};
ObjectA.prototype.publicC = "cc";
ObjectA.prototype.getPublicC = function(){
    return this.publicC;
}
ObjectA.prototype.getPublicB = function () {
    return this.protectB;
}

//测试继承私有变量
function ObjectB() {
    var privateB = "newPrivB";
};
ObjectB.prototype = new ObjectA();//继承A

var ob = new ObjectB();
console.log("==========测试继承私有变量=================");
console.log("ob.privateA:" + ob.privateA);
console.log("ob.getPrivateA():" + ob.getPrivateA());
console.log("ob.privateB:" + ob.privateB);
console.log("ob.getPrivateB():" + ob.getPrivateB());
console.log("ob.showPrivate():" + ob.showPrivate());

//测试继承this变量
function ObjectC(){
    this.protectB = "new bb";//重写父类成员变量
}
ObjectC.prototype = new ObjectA();//继承A

var oc = new ObjectC();
console.log("==========测试继承this变量=================");
console.log("oc.protectB:" + oc.protectB);
console.log("oc.getProtectB():" + oc.getProtectB());//子类的this成员可被父类使用
console.log("oc.getPublicB():" + oc.getPublicB());//子类的this成员可被父类使用

//测试继承prototype变量
function ObjectD(){
    
}
ObjectD.prototype = new ObjectA();//继承A
ObjectD.prototype.publicC = "new cc";

var od = new ObjectD();
console.log("==========测试继承prototype变量=================");
console.log("od.publicC:" + od.publicC);
console.log("od.getProtectC():" + od.getProtectC());//子类重写的prototype成员可被父类使用
console.log("od.getPublicC():" + od.getPublicC());//子类重写的prototype成员可被父类使用

function ObjectE(){
    var privateA = 'new aa';
    this.protectB = 'new bb';
    this.getProtectB = function(){
        return this._super.getProtectB();
    }
}
ObjectTool.extend(ObjectE, ObjectA);

var oe = new ObjectE();
console.log("==========测试objectTool=================");
console.log("oe.privateA:" + oe.privateA);
console.log("oe.protectB:" + oe.protectB);
console.log("oe._super.protectB:" + oe._super.protectB);
console.log("oe.getProtectB:" + oe.getProtectB());
console.log("oe.publicC:" + oe.publicC);
console.log("oe.publicC:" + oe.publicC);
console.log("oe.publicC:" + oe.publicC);
