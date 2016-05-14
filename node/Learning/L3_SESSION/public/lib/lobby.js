(function($){
    
    var session = function(scope){
        var _data = {};
        
        this.id = null;
        
        switch(scope){
            case scope.LOCAL: 
                this.ininLocalSession();
                break;
            case scope.PAGE: 
                this.initPageSession();
                break;
            case scope.SERVER: 
                this.initServerSession();
                break;
            default: break;
        }
        
        this.set = function(key, value){
            _data[key] = value;  
        }
        
        this.get = function(key){
            return _data[key];
        }
        
        this.clear = function(){
            _data = {};
        }
        
        this.ininLocalSession = function (){
            alert("create local session");
        }
        
        this.ininPageSession = function (){
            
            alert("create page session");
        }
        
        this.ininServerSession = function (){
            
            alert("create server session");
        }
    };
    
    $.session = {
        _init:function(){
            alert("init local session");
            // window.sessionStorage.localData = new session(scope.LOCAL);
            
            $.ajax({
                url:"/createSession",
                async:false,
                type:"POST",
                success:function(data,status){
                    alert("ssid:" + data);
                    window.sessionStorage.ssid = data;
                }
            });
            
            // alert(window.sessionStorage.localData);
        },
        get:function(key){
            if(!window.sessionStorage.ssid || window.sessionStorage.ssid == "undefined"){
                this._init();
            }
            
            var _ssData;
            
            $.ajax({
                url:"/getSession",
                async:false,
                data:{
                    ssid:window.sessionStorage.ssid,
                    key:key
                },
                type:"POST",
                success:function(data,status){
                    alert("GET_SS_DATA:" + data);
                    alert("GET_SS_STATUS:" + status);
                    _ssData = data;
                }
            });
               
            
            return _ssData;
        },
        
        set:function(key,value){
            if(!window.sessionStorage.ssid || window.sessionStorage.ssid == "undefined"){
                this._init();
            }
            
            $.ajax({
                url:"/setSession",
                async:false,
                data:{
                    ssid:window.sessionStorage.ssid,
                    key:key,
                    value:value
                },
                type:"POST",
                success:function(data,status){
                    
                }
            });
        }
    }
    
    $.servSession = {
        _init:function(){
            
        }
    }
})(jQuery);

// var lobby = {
//     session:{
//         get:function(){
            
//         }
//     }
// }

// var session = function(scope){
//     this.scope = scope;
//     this.ssid = null;
//     var self = this;
    
//     if(this.scope == session.scope.GLOBEL){
//         // $(window).session = this;
//     }
    
//     alert("SSID:" + this.ssid);
    
//     $.post("/hello",
//         {
//             name:"lobby"
//         },
//         function(data,status){
//             self.ssid = data;
//         }
//     );
// }

scope = {};
scope.LOCAL = 1;
scope.PAGE = 2;
scope.SERVER = 3;