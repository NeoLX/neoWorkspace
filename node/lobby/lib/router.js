
var events = require('events');
var url = require("url");
var connect = require('connect');
var util = require('util');
var serveStatic = require('serve-static');
var finalhandler = require('finalhandler');
var path = require('path');

var Router = function(root){

	if(!root || root.trim() == ""){
		console.log("[ROOT_DIC_ERROR]" + root);
		return;
	}else{
		console.log('[CREATE ROUTER ON %s]', root);
		this._root = root;
	}

	this.webConfigs = {};

	this.serve = serveStatic(root);

	this.route = function(req,rsp){
		console.log("[REQUEST URL]" + req.url);
		var pathstr = url.parse(req.url).pathname;
		
		if(path.extname(pathstr) === ''){
			var webconf = this.findWebSite(path.dirname(pathstr));
			if(webconf){
				req.url += '/' + webconf.webapp.default_page;
			}
		}

		var paths = pathstr.split(path.sep);

		var done = finalhandler(req, rsp);
		this.serve(req,rsp,done);
	};

	this.findWebSite = function(name){
		return this.webConfigs[name];
	}

	this.setWebSite = function(name, webconf){
		console.log("[ROUTER SET WEBSITE]:[" + name + "]" + webconf);
		this.webConfigs[name] = webconf;
	}

	this.on = function(req,rsp){
		console.log('[ONREQUEST]:' + url.parse(req.url));
		rsp.end("END");
	}

	this.on = function(){

	}
}
util.inherits(Router,events);


module.exports = Router;