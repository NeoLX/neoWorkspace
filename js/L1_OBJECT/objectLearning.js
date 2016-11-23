
//封装对象类型
function klass() {
    var privParmA = "刘备";//私有变量，外部不可见，不可操作
    this.pubParmB = "曹操";//公有变量，外部可直接操作，可被继承

    //封装私有变量A
    this.getParmA = function () {
        return privParmA;
    }

    this.setParmA = function (arg) {
        privParmA = arg;
    }

    this.saySth = function(){
        console.log(`${this.pubParmB}收拾了${privParmA},然后又收拾了${this.pubParmC}`);
    }
}
klass.prototype.pubParmC = "孙权";

//实例化klass
var obj = new klass();
console.log(`===========开始测试klass实例化==============`);
console.log(`展示私有变量A：${obj.privParmA}`);
console.log(`展示通过封装的私有变量A：${obj.getParmA()}`);
console.log(`展示公有变量B：${obj.pubParmB}`);
console.log(`展示公有变量C：${obj.pubParmC}`);
console.log(`使用公有函数saySth`);
obj.saySth();
obj.setParmA("关羽");//修改私有变量A
console.log(`修改后私有变量A：${obj.getParmA()}`);
obj.pubParmB = "曹丕";//修改公有变量B
console.log(`修改后公有变量B：${obj.pubParmB}`);
obj.pubParmC = "周瑜";//修改公有变量C
console.log(`修改后公有变量C：${obj.pubParmC}`);
console.log(`===========结束测试klass实例化==============`);

//对象继承
function subKlass(){
    klass.call(this);//使用超类klass
}
subKlass.prototype = new klass();
//实例化subKlass
var subObj = new subKlass();
console.log(`===========开始测试subKlass实例化==============`);
console.log(`展示私有变量A：${subObj.privParmA}`);
console.log(`展示通过封装的私有变量A：${subObj.getParmA()}`);
console.log(`展示公有变量B：${subObj.pubParmB}`);
console.log(`展示公有变量C：${subObj.pubParmC} --- (必须通过subKlass.prototype = new klass();绑定原型对象，否则不可用)`);
console.log(`使用公有函数saySth`);
subObj.saySth();
subObj.setParmA("关羽");//修改私有变量A
console.log(`修改后私有变量A：${subObj.getParmA()}`);
subObj.pubParmB = "曹丕";//修改公有变量B
console.log(`修改后公有变量B：${subObj.pubParmB}`);
console.log(`展示原型对象中公有变量B：${subObj.__proto__.pubParmB}`);
subObj.pubParmC = "周瑜";//修改公有变量C
console.log(`修改后公有变量C：${subObj.pubParmC}`);
console.log(`展示原型对象中公有变量C：${subObj.__proto__.pubParmC}`);
console.log(`可见修改子类实例中变量，并不影响原型对象中对象值`);
console.log(`再次使用公有函数saySth`);
subObj.saySth();
console.log(`===========结束测试subKlass实例化==============`);
