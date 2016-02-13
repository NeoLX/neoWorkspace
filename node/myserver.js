
var express = require('express');
var fs = require('fs');
var util = require('util');
var events = require('events');
var app = express();
// var WEB_CONTENT_PATH = "/webcontent/";
// var webConf = {};
// var serverConf = {};

function MyServer() {

	this.webConf = {};
	this.serverConf = {};
	this.server = null;
	this.status = MyServer.Status.SERVER_CREATING;

	this.init = function(){
		this.on('getServerConfig', this.getServerConfigHandle);
		this.on('getWebConfig', this.getWebConfigHandle);	
		this.on('startServer', this.startServer);
		this.on('statusChange', this.statusChangeHandle);
	}

	this.statusChangeHandle = function(){
		switch(this.status){
				case MyServer.Status.SERVER_CREATING:
					break;
				case MyServer.Status.SERVER_INITING:
					this.emit('getServerConfig');break;
				case MyServer.Status.SERVER_CONFIG_READING:
					break;
				case MyServer.Status.SERVER_CONFIG_READY:
					this.emit('getWebConfig');break;
				case MyServer.Status.WEB_CONFIG_READING:
					break;
				case MyServer.Status.WEB_CONFIG_READY:
					this.emit('startServer');break;
				default:
					break;
			}
	}

	this.start = function(){
		this.setStatus(MyServer.Status.SERVER_INITING);
		// this.emit('statusChange');
	}

	this.setStatus = function(status){
		this.status = status;
		this.emit('statusChange');	
	}

	this.startServer = function(){
		console.log('SERVER_STARTING');

		var myserver = this;

		for(var web in this.webConf){
			app.get('/' + web, function (req, res) {
				   	res.sendFile(__dirname + myserver.serverConf.webcontent 
				   		+ '/' + web 
				   		+ '/' + myserver.webConf[web].webapp.default_page);
				});
		}

		app.use(express.static(this.serverConf.webcontent));

		var server = app.listen(this.serverConf.port, function () {

		  	var host = server.address().address;
		  	var port = server.address().port;

		  	console.log("应用实例，访问地址为 http://%s:%s", host, port);
		});

		this.server = server;
	}

	this.getServerConfigHandle = function(){
			console.log('GETTING_SERVER_CONFIG');
			var myserver = this;
			myserver.setStatus(MyServer.Status.SERVER_CONFIG_READING);
						
			fs.readFile(__dirname + '/server.json',
				function(err,data){
					if(err){
						console.log('[NO SUCH WEBCONFIG]' + err);
					}else{
						myserver.serverConf = JSON.parse(data);
						myserver.setStatus(MyServer.Status.SERVER_CONFIG_READY);
						// myserver.emit('getWebConfig');
					}
				});	
		}


	this.getWebConfigHandle = function(){
			console.log('GETTING_WEB_CONFIG');
			var myserver = this;
			myserver.setStatus(MyServer.Status.WEB_CONFIG_READING);

			fs.stat(__dirname + this.serverConf.webcontent,
				function(err, stat){
					if(err){
						console.log('[NO SUCH WEBCONTENT]' + err);
						myserver.setStatus(MyServer.Status.SERVER_START_ERROR);
					}else if(!stat.isDirectory()){					
						console.log('[WEBCONTENT IS NOT DIRECTORY]' + err);
						myserver.setStatus(MyServer.Status.SERVER_START_ERROR);
					}else{
						fs.readdir(__dirname + myserver.serverConf.webcontent,
							function(err, files){
								if(err){
									console.log('[READING WEBCONTENT DIRECTORY]' + err);
									myserver.setStatus(MyServer.Status.SERVER_START_ERROR);
								}else{					
									files.forEach(function(file){

										fs.stat(__dirname + myserver.serverConf.webcontent + '/' + file,

											function(err, stat){
												if(err){
													console.log('[NO SUCH WEBCONTENT]' + err);
													myserver.setStatus(MyServer.Status.SERVER_START_ERROR);
												}else if(stat.isDirectory()){					
										
													fs.readFile(__dirname + myserver.serverConf.webcontent + '/' + file + '/web.json',
														function(err,data){
															if(err){
																console.log('[NO SUCH WEBCONFIG IN (' 
																	+ __dirname + myserver.serverConf.webcontent +  + '/' + file + ')]' 
																	+ err);																
															}else{
																myserver.webConf[file] = JSON.parse(data);
																myserver.setStatus(MyServer.Status.WEB_CONFIG_READY);
															}
														});														
												}
											});
									});	
								}
							});
					}
				});

	}
}
util.inherits(MyServer,events.EventEmitter);

MyServer.getInstance = function(){
	return new MyServer();
}

MyServer.Status = {};
MyServer.Status.SERVER_CREATING = 000;
MyServer.Status.SERVER_INITING = 001;
MyServer.Status.SERVER_CONFIG_READING = 100;
MyServer.Status.SERVER_CONFIG_READY = 199;
MyServer.Status.WEB_CONFIG_READING = 200;
MyServer.Status.WEB_CONFIG_READY = 299;
MyServer.Status.SERVER_STARTING = 300;
MyServer.Status.SERVER_STARTED = 400;
MyServer.Status.SERVER_START_ERROR = 999;

var myserver = MyServer.getInstance();
myserver.init();
myserver.start();
