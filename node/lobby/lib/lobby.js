var fs = require('fs');
var util = require('util');
var events = require('events');
var http = require('http');
var router = require('./router');
// var app = express();

function Lobby(root) {

	if(!root || root.trim() == ""){
		console.log("[ROOT_DIC_ERROR]" + root);
		return;
	}else{
		this._rootDir = root;
		this.router = new router(this._rootDir);
	}

	// this.app = new connect();
	this.webConf = {};
	this.serverConf = {};
	this.server = null;
	this.status = Lobby.Status.SERVER_CREATING;

	this.init = function(){
		console.log("[SERVER_INITING]");
		this.on(Lobby.Handles.SERVER_INIT, this.serverInitHandle);
		this.on(Lobby.Handles.WEB_INIT, this.webInitHandle);
		this.on(Lobby.Handles.SERVER_START, this.startServerHandle);
		this.on(Lobby.Handles.SERVER_STATUS_CHANGE, this.statusChangeHandle);
	}

	this.statusChangeHandle = function(){
		switch(this.status){
				case Lobby.Status.SERVER_CREATING:
					this.emit(Lobby.Handles.SERVER_INIT);break;
				case Lobby.Status.SERVER_INITED:
					this.emit(Lobby.Handles.WEB_INIT);break;
				case Lobby.Status.WEB_INITED:
					this.emit(Lobby.Handles.SERVER_START);break;
				default:
					break;
			}
	}

	this.start = function(){
		this.setStatus(Lobby.Status.SERVER_CREATING);
		// this.emit('statusChange');
	}

	this.setStatus = function(status){
		this.status = status;
		this.emit(Lobby.Handles.SERVER_STATUS_CHANGE);	
	}

	this.setWebConfig = function(webname, config){
		this.webConf[webname] = config;
		// var myserver = this;
		// app.get('/' + webname, function (req, res) {
		// 	   	res.sendFile( + myserver.serverConf.webcontent 
		// 	   		+ '/' + webname 
		// 	   		+ '/' + myserver.webConf[webname].webapp.default_page);
		// 	});
	}

	this.onRequest = function(req, rsp){
		myserver.router.route(req,rep);
	}

	this.startServerHandle = function(){
		console.log('SERVER_STARTING');

		var myserver = this;

		// app.use(express.static(this.serverConf.webcontent));

		var server = http.createServer(function(req,rsp){
			myserver.router.route(req,rsp);
		})
							.listen(this.serverConf.port);

		console.log("应用实例，访问地址为 http://%s:%s", server.address());
		// var server = app.listen(this.serverConf.port, function () {

		//   	var host = server.address().address;
		//   	var port = server.address().port;

		// 			if(err){
		// 				console.log('[NO SUCH WEBCONTENT]' + err);
		// 				myserver.setStatus(Lobby.Status.SERVER_START_ERROR);
		// 			}else if(!stat.isDirectory()){					
		// 				console.log('[WEBCONTENT IS NOT DIRECTORY]' + err);
		// 				myserver.setStatus(Lobby.Status.SERVER_START_ERROR);
		// 			}else{
		// 				fs.readdir(__dirname + myserver.serverConf.webcontent,
		// });

		this.server = server;
	}

	this.serverInitHandle = function(){
		this.serverConf = require(this._rootDir + '/server.json');

		this.setStatus(Lobby.Status.SERVER_INITED);
	}

	this.findWebConfig = function(dir){

	}

	this.webInitHandle = function(){
			console.log('GETTING_WEB_CONFIG');
			var myserver = this;
			myserver.setStatus(Lobby.Status.WEB_CONFIG_READING);	

			fs.stat(myserver._rootDir,
				function(err, stat){
					if(err){
						console.log('[READING WEBCONTENT DIRECTORY ERROR]' + err);
					}else if(stat.isDirectory()){

						// console.log(myserver._rootDir);
						fs.readdir(myserver._rootDir,
							function(err, files){
								if(err){
									console.log('[READING WEBCONTENT DIRECTORY ERROR]' + err);
									myserver.setStatus(Lobby.Status.SERVER_START_ERROR);
								}else{					
									files.forEach(function(file){

										fs.stat(myserver._rootDir + '/' + file,

											function(err, stat){
												if(err){
													console.log('[NO SUCH WEBCONTENT]' + err);
													myserver.setStatus(Lobby.Status.SERVER_START_ERROR);
												}else if(stat.isDirectory()){					
													var wconf = require(myserver._rootDir + '/' + file + '/web.json');
													
													if(wconf){
														myserver.setWebConfig(file, wconf);
														myserver.router.setWebSite(file, wconf);
													}																									
												}
											});										
									});	
									myserver.setStatus(Lobby.Status.WEB_INITED);
								}
							});
					}
				});

	}
}
util.inherits(Lobby,events.EventEmitter);

Lobby.getInstance = function(){
	return new Lobby().init();
}

Lobby.Status = {};
Lobby.Status.SERVER_CREATING = 000;
Lobby.Status.SERVER_INITING = 100;
Lobby.Status.SERVER_INITED = 199;
Lobby.Status.WEB_INITING = 200;
Lobby.Status.WEB_CONFIG_READING = 210;
Lobby.Status.WEB_INITED = 299;
Lobby.Status.SERVER_STARTING = 300;
Lobby.Status.SERVER_STARTED = 400;
Lobby.Status.SERVER_START_ERROR = 999;

Lobby.Handles = {};
Lobby.Handles.SERVER_INIT = "SERVER_INIT";
Lobby.Handles.WEB_INIT = "WEB_INIT";
// Lobby.Handles.WEB_CONFIG_READING = "WEB_CONFIG_READING";
Lobby.Handles.SERVER_START = "SERVER_START";
Lobby.Handles.SERVER_STATUS_CHANGE = "SERVER_STATUS_CHANGE";

module.exports = Lobby;