var express = require('express');
var router = express.Router();
var fs= require('fs');
var path= require('path');

/* GET home page. */
router.get('/sidebardata', function(req, res, next) {
	var config=require('../appConfig');
	var directories = Object.keys(config.directories).map(function(el){return {name: el}});
	res.send(directories);
});

/* GET home page. */
router.get('/fileContents', function(req, res, next) {
	var _path= req.query.path;
		
	var contents= fs.readFileSync(_path);
	res.send(contents);
});

router.get('/dirData/:dirname', function(req, res, next) {
	var config=require('../appConfig');
	var dirName= req.params.dirname,
		_path = config.directories[dirName];
		console.log(_path);
	if(_path){
		fs.readdir(_path, function(err, items) {
			var actualItems = [];
			console.log(items);
			
			if(!(items && items.length)){
				res.sendStatus(404);
				return;
			}

			for (var i=0; i<items.length; i++) {
				if(!fs.lstatSync(path.join(_path, items[i])).isDirectory()){
					actualItems.push({
						name: items[i],
						fullpath: path.join(_path, items[i]),
						contents: ''
					});
				}
			}
			
		res.send(actualItems);
			
		});
	}else{
		res.sendStatus(404);
		
	}
	
});




module.exports = router;
