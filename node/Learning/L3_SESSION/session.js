'use strict'
var crypto = require("crypto");

var SessionManager = function() {

    var _ssPool = new _sessionPool();

    this.init = function(app) {

        app.post("/createSession", function(req, res, next) {
            _createSession(req, res, next);
        });


        app.post("/getSession", function(req, res, next) {
            console.log(req.body);
            var ssid = req.body.ssid;
            var key = req.body.key;

            if (!ssid || ssid == undefined || ssid == "") {
                _createSession(req, res, next);
            } else {

                var s = _ssPool.get(ssid);
                var o = s.get(req.body.key);

                console.log(o);

                res.end(o);
            }

        });

        app.post("/setSession", function(req, res, next) {
            // console.log(req.body);
            var ssid = req.body.ssid;
            var key = req.body.key;
            var value = req.body.value;

            if (!ssid || ssid == undefined || ssid == "") {
                _createSession(req, res, next);

            } else {

                var s = _ssPool.get(ssid);
                if (!s) {
                    res.clearCookie("ssid");

                    s = createSession(req, res, next);
                }
                s.set(key, value);

                console.log(value);

                res.end();
            }
        });

        var _createSession = function(req, res, next) {
            var ssid = _ssPool.newSession(req.connection.remoteAddress);
            console.log("CREATE SSID:" + ssid);

            // res.cookie("ssid", ssid);

            res.end(ssid);

            return _ssPool.get(ssid);
        };
    };

}

var _sessionPool = function() {

    var pool = {};

    this.get = function(ssid) {
        return pool[ssid];
    };

    this.newSession = function(ip) {
        var date = (new Date()).getTime();
        var r = Math.round(Math.random() * 100000);

        var ssid = _sessionPool.createSsid(ip + date + r);
        var ss = new _session(ssid);
        pool[ssid] = ss;

        return ssid;
    };
};

_sessionPool.createSsid = function(keyword) {
    var hash = crypto.createHash("MD5");
    hash.update(keyword);
    var ssid = hash.digest("base64");

    ssid = ssid.replace(/;/g, 'A');
    ssid = ssid.replace(/,/g, 'B');
    ssid = ssid.replace(/=/g, 'C');
    ssid = ssid.replace(/\+/g, 'D');

    return ssid;
};

//session类
var _session = function(id) {

    this.id = id;
    this.store = {};

    this.set = function(key, value) {
        var self = this;

        console.log(this.store);

        self.store[key] = value;
    }

    this.get = function(key) {
        var self = this;

        console.log(this.store);
        return self.store[key];
    }
};

module.exports = new SessionManager();